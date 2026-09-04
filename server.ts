import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import rateLimit from 'express-rate-limit';
import { db } from './server/db';
import { LanguageRegistry } from './src/services/LanguageRegistry';
import { askAIDoubt, generateAITestSeries } from './server/gemini';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // --- Rate Limiters ---
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs for auth
    message: { error: 'Too many login attempts, please try again after 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
  });

  const submitLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30, // limit each IP to 30 submissions per 15 minutes
    message: { error: 'Too many test submissions, please try again after 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
  });

  const codingLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 50, // limit each IP to 50 code execution runs/submissions per 5 minutes
    message: { error: 'Too many code execution requests, please try again after 5 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
  });

  const aiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 50, // limit each IP to 50 AI queries per 10 minutes
    message: { error: 'Too many AI queries, please try again after 10 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
  });

  const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // limit each IP to 100 admin requests per 15 minutes
    message: { error: 'Too many admin operations, please try again after 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // --- Safe Error Handler Helper ---
  function handleApiError(res: Response, err: any) {
    console.error('[FirstRound API Error]', err);
    const msg = err?.message || '';
    if (
      msg.includes('Sqlite') ||
      msg.includes('SQLITE') ||
      msg.includes('database') ||
      msg.includes('relation') ||
      msg.includes('query') ||
      msg.includes('prepare') ||
      msg.includes('run')
    ) {
      return res.status(500).json({ error: 'Database service is currently unavailable. Please try again later.' });
    }
    return res.status(500).json({ error: err?.message || 'An internal server error occurred.' });
  }

  // Apply admin rate limiting globally for all admin endpoints
  app.use('/api/admin', adminLimiter);

  // --- API Routes ---

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Auth: Login or Register
  app.post('/api/auth/login-or-register', authLimiter, (req: Request, res: Response) => {
    try {
      const { email, name, college, targetCompany, targetRole, role } = req.body;
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
      const user = db.loginOrRegister(email, name, college, targetCompany, targetRole, role);
      return res.json({ success: true, user });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Auth: Profile & User stats + Recent attempts
  app.get('/api/auth/profile/:userId', (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const user = db.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const attempts = db.getAttemptsForUser(user.id);
      const bookmarks = db.getBookmarksForUser(user.id);
      const weakQuestions = db.getWeakQuestionsForUser(user.id);

      return res.json({
        user,
        attempts: attempts.slice(0, 15),
        totalBookmarks: bookmarks.length,
        totalWeakQuestions: weakQuestions.length,
      });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Users: List all users for switching & profiles
  app.get('/api/users', (req: Request, res: Response) => {
    try {
      const users = db.getAllUsers();
      return res.json({ users });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Users: Update profile
  app.patch('/api/users/:userId', (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { name, college, targetCompany, targetRole } = req.body;
      const updated = db.updateUser(userId, {
        ...(name !== undefined && { name }),
        ...(college !== undefined && { college }),
        ...(targetCompany !== undefined && { targetCompany }),
        ...(targetRole !== undefined && { targetRole }),
      });
      if (!updated) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json({ success: true, user: updated });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Companies listing & metadata
  app.get('/api/companies', (req: Request, res: Response) => {
    try {
      const companies = db.getCompanies();
      return res.json({ companies });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Tests listing with filters (supports trailing slashes)
  app.get(['/api/tests', '/api/tests/'], (req: Request, res: Response) => {
    try {
      const { category, companyId, difficulty, search } = req.query;
      const tests = db.getTests({
        category: category as string,
        companyId: companyId as string,
        difficulty: difficulty as string,
        search: search as string,
      });
      return res.json({ tests });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Catalogue-only listing: returns ONLY the 15 cat_ blueprint tests.
  app.get(['/api/catalogue', '/api/catalogue/'], (req: Request, res: Response) => {
    try {
      const tests = db.getCatalogueTests();
      return res.json({ tests });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Test detail with questions
  
  // Get test user history
  app.get('/api/tests/history', (req: Request, res: Response) => {
    try {
      const { userId } = req.query;
      if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'Valid userId is required' });
      }
      const history = db.getTestHistoryForUser(userId);
      return res.json({ success: true, history });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Log a test visit
  app.post('/api/tests/history/visit', (req: Request, res: Response) => {
    try {
      const { userId, testId, mode } = req.body;
      if (!userId || !testId) {
        return res.status(400).json({ error: 'userId and testId are required' });
      }
      if (mode !== 'practice') {
        db.upsertTestHistoryVisit(userId, testId);
      }
      return res.json({ success: true });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Mark test as in-progress (candidate started answering)
  app.post('/api/tests/history/start', (req: Request, res: Response) => {
    try {
      const { userId, testId, mode } = req.body;
      if (!userId || !testId) {
        return res.status(400).json({ error: 'userId and testId are required' });
      }
      if (mode !== 'practice') {
        db.upsertTestHistoryInProgress(userId, testId);
      }
      return res.json({ success: true });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  app.get(['/api/tests/:id', '/api/tests/:id/'], (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const test = db.getTestById(id, true);
      if (!test) {
        return res.status(404).json({ error: 'Test not found' });
      }
      return res.json({ test });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Test submission & evaluation
  app.post(['/api/tests/:id/submit', '/api/tests/:id/submit/'], submitLimiter, (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const body = req.body || {};
      const userId = body.userId || body.user_id;
      const mode = body.mode || 'exam';
      if (mode !== 'exam' && mode !== 'practice') {
        return res.status(400).json({ error: 'Invalid mode' });
      }
      const rawResponses = body.responses || [];
      const timeTakenSeconds = body.timeTakenSeconds ?? body.time_taken_seconds ?? 0;

      if (!userId) {
        return res.status(400).json({ error: 'userId / user_id is required' });
      }

      const testMeta = db.getTestById(id, false);
      if (testMeta?.status === 'coming_soon') {
        return res.status(403).json({
          error: 'This test is not yet available. Questions are still being prepared.',
        });
      }

      const normalizedResponses = rawResponses.map((r: any) => ({
        questionId: r.questionId || r.question_id || r.id,
        selectedOption: r.selectedOption !== undefined ? r.selectedOption : (r.selected_option !== undefined ? r.selected_option : null),
        timeSpentSeconds: r.timeSpentSeconds ?? r.time_spent ?? 0,
      }));

      const testInstanceId = body.testInstanceId || body.test_instance_id;

      const attempt = db.submitTest({
        userId,
        testSeriesId: id,
        testInstanceId,
        mode,
        responses: normalizedResponses,
        timeTakenSeconds,
      });

      return res.json({ success: true, attempt });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Attempts: List user attempts
  app.get(['/api/attempts', '/api/attempts/'], (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ error: 'userId query parameter is required' });
      }
      const attempts = db.getAttemptsForUser(userId);
      return res.json({ attempts });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Attempt detail
  app.get(['/api/attempts/:id', '/api/attempts/:id/'], (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const attempt = db.getAttemptById(id);
      if (!attempt) {
        return res.status(404).json({ error: 'Attempt not found' });
      }
      return res.json({ attempt });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Live Leaderboard
  app.get('/api/leaderboard', (req: Request, res: Response) => {
    try {
      const { category, company } = req.query;
      const leaderboard = db.getLeaderboard({
        category: category as string,
        company: company as string,
      });
      return res.json({ leaderboard });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Mega Events
  app.get('/api/mega-events', (req: Request, res: Response) => {
    try {
      const megaEvents = db.getMegaEvents();
      return res.json({ megaEvents });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  app.get('/api/mega-events/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const megaEvent = db.getMegaEventById(id);
      if (!megaEvent) {
        return res.status(404).json({ error: 'Mega Event not found' });
      }
      return res.json({ megaEvent });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Bookmarks
  app.post('/api/bookmarks/toggle', (req: Request, res: Response) => {
    try {
      const { userId, questionId } = req.body;
      if (!userId || !questionId) {
        return res.status(400).json({ error: 'userId and questionId are required' });
      }
      const result = db.toggleBookmark(userId, questionId);
      return res.json({ success: true, ...result });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  app.get('/api/bookmarks', (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.json({ bookmarks: [] });
      }
      const bookmarks = db.getBookmarksForUser(userId);
      return res.json({ bookmarks });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Revision Vault (Weak questions)
  app.get('/api/revision-vault/weak-questions', (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.json({ weakQuestions: [] });
      }
      const weakQuestions = db.getWeakQuestionsForUser(userId);
      return res.json({ weakQuestions });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Notifications API
  app.get('/api/notifications', (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string;
      const data = db.getNotificationsForUser(userId);
      return res.json(data);
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  app.post('/api/notifications/:id/read', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }
      const result = db.markNotificationRead(userId, id);
      return res.json(result);
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  app.post('/api/notifications/mark-all-read', (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }
      const result = db.markAllNotificationsRead(userId);
      return res.json(result);
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // --- Admin route guard middleware ---
  const adminGuard = (req: Request, res: Response, next: Function) => {
    const secret = process.env.ADMIN_SECRET;
    if (!secret) {
      return res.status(503).json({ error: 'Admin panel is not configured on this server.' });
    }
    if (req.headers['x-admin-secret'] !== secret) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return next();
  };

  // Admin: Create Announcement
  app.post('/api/admin/announcements', adminGuard, (req: Request, res: Response) => {
    try {
      const { title, message, type, targetCompany, actionTab, actionTestId, actionLabel } = req.body;
      if (!title || !message) {
        return res.status(400).json({ error: 'Title and message are required' });
      }
      const notification = db.createNotification({
        title,
        message,
        type: type || 'ANNOUNCEMENT',
        targetCompany: targetCompany || undefined,
        actionTab: actionTab || 'home',
        actionTestId: actionTestId || undefined,
        actionLabel: actionLabel || undefined,
      });
      return res.json({ success: true, notification });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Admin: Stats
  app.get('/api/admin/stats', adminGuard, (req: Request, res: Response) => {
    try {
      const stats = db.getAdminStats();
      return res.json({ stats });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Admin: Content QA & Validation Report
  app.get('/api/admin/qa-report', adminGuard, async (req: Request, res: Response) => {
    try {
      const { ContentQAEngine } = await import('./src/services/ContentQAEngine');
      const { quantQuestions } = await import('./src/data/questionBank/quant');
      const { FOUNDATION_BLUEPRINTS } = await import('./src/data/blueprints/foundation');
      
      const qaEngine = new ContentQAEngine();
      const report = qaEngine.generateFullQAReport(quantQuestions, FOUNDATION_BLUEPRINTS);
      return res.json({ success: true, report });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Admin: Create Test Series
  app.post('/api/admin/tests', adminGuard, (req: Request, res: Response) => {
    try {
      const test = db.createTestSeries(req.body);
      return res.json({ success: true, test });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Admin: Add Question to Test
  app.post('/api/admin/tests/:id/questions', adminGuard, (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const question = db.addQuestionToTest({
        ...req.body,
        testSeriesId: id,
      });
      return res.json({ success: true, question });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Admin: Delete Test
  app.delete('/api/admin/tests/:id', adminGuard, (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = db.deleteTest(id);
      return res.json({ success });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Admin: Generate AI Test with Gemini
  app.post('/api/admin/generate-ai-test', adminGuard, aiLimiter, async (req: Request, res: Response) => {
    try {
      const { topicOrCompany, category, difficulty, numQuestions } = req.body;
      const generated = await generateAITestSeries({
        topicOrCompany: topicOrCompany || 'TCS NQT 2025 Numerical Ability',
        category: category || 'Quantitative',
        difficulty: difficulty || 'Medium',
        numQuestions: numQuestions || 5,
      });

      const createdTest = db.createTestSeries(generated.test);
      if (generated.questions && generated.questions.length > 0) {
        generated.questions.forEach((q) => {
          db.addQuestionToTest({
            ...q,
            testSeriesId: createdTest.id,
          });
        });
      }

      const fullTest = db.getTestById(createdTest.id, true);
      return res.json({ success: true, test: fullTest });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // AI Doubt Solver / Alternative Explanation
  app.post('/api/ai/ask-doubt', aiLimiter, async (req: Request, res: Response) => {
    try {
      const { question, userSelectedOption, studentQuestion } = req.body;
      if (!question) {
        return res.status(400).json({ error: 'Question is required' });
      }
      const explanation = await askAIDoubt({
        question,
        userSelectedOption,
        studentQuestion,
      });
      return res.json({ success: true, explanation });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Get Supported Language Configurations
  app.get('/api/coding/languages', async (req: Request, res: Response) => {
    try {
      const { SUPPORTED_LANGUAGES_CONFIG } = await import('./src/services/CodeExecutionService');
      return res.json({ success: true, languages: SUPPORTED_LANGUAGES_CONFIG });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Run Code (Sample Test Cases)
  app.post('/api/coding/run', codingLimiter, async (req: Request, res: Response) => {
    try {
      const { questionId, userId, language, sourceCode, customInput } = req.body;
      if (!questionId || !userId || !language || !sourceCode) {
        return res.status(400).json({ error: 'questionId, userId, language, and sourceCode are required' });
      }

      const problem = db.getCodingProblemById(questionId);
      if (!problem) {
        return res.status(404).json({ error: 'Coding question not found' });
      }

      if (problem.questionType !== 'CODING') {
        return res.status(400).json({ error: 'Question is not of type CODING' });
      }

      const codingConfig = problem.codingConfig || {
        problemType: 'ALGORITHM',
        languages: problem.supportedLanguages || ['javascript', 'typescript', 'python'],
        defaultLanguage: problem.supportedLanguages?.[0] || 'javascript',
        starterCode: problem.starterCode || {},
        timeLimitMs: problem.timeLimitMs,
        memoryLimitMb: problem.memoryLimitMb,
      };

      if (!codingConfig) {
        return res.status(400).json({ error: 'Question is missing coding configuration' });
      }

      const allowedLangs = codingConfig.languages || [];
      if (!allowedLangs.includes(language)) {
        return res.status(400).json({ error: `Language '${language}' is not allowed for this question` });
      }

      const validExecutionModes = ['javascript', 'typescript', 'python'];
      if (!validExecutionModes.includes(language)) {
        return res.status(400).json({ error: `Execution mode/language '${language}' is not supported by sandbox executor` });
      }

      const { CodeExecutionService } = await import('./src/services/CodeExecutionService');
      const executionService = new CodeExecutionService();

      let testCasesToRun = [];
      if (customInput !== undefined) {
        testCasesToRun = [
          {
            id: 'custom_input',
            input: customInput,
            expectedOutput: '',
            isHidden: false,
          }
        ];
      } else {
        testCasesToRun = (problem.testCases || []).filter((tc: any) => !tc.isHidden);
      }

      const result = await executionService.executeSubmission(
        {
          questionId,
          userId,
          language,
          sourceCode,
          isSubmission: false,
        },
        testCasesToRun
      );

      return res.json({ success: true, result });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Submit Code (All Test Cases including Hidden)
  app.post('/api/coding/submit', codingLimiter, async (req: Request, res: Response) => {
    try {
      const { questionId, userId, testSeriesId, testAttemptId, language, sourceCode } = req.body;
      if (!questionId || !userId || !language || !sourceCode) {
        return res.status(400).json({ error: 'questionId, userId, language, and sourceCode are required' });
      }

      const problem = db.getCodingProblemById(questionId);
      if (!problem) {
        return res.status(404).json({ error: 'Coding question not found' });
      }

      if (problem.questionType !== 'CODING') {
        return res.status(400).json({ error: 'Question is not of type CODING' });
      }

      const codingConfig = problem.codingConfig || {
        problemType: 'ALGORITHM',
        languages: problem.supportedLanguages || ['javascript', 'typescript', 'python'],
        defaultLanguage: problem.supportedLanguages?.[0] || 'javascript',
        starterCode: problem.starterCode || {},
        timeLimitMs: problem.timeLimitMs,
        memoryLimitMb: problem.memoryLimitMb,
      };

      if (!codingConfig) {
        return res.status(400).json({ error: 'Question is missing coding configuration' });
      }

      const allowedLangs = codingConfig.languages || [];
      if (!allowedLangs.includes(language)) {
        return res.status(400).json({ error: `Language '${language}' is not allowed for this question` });
      }

      const validExecutionModes = ['javascript', 'typescript', 'python'];
      if (!validExecutionModes.includes(language)) {
        return res.status(400).json({ error: `Execution mode/language '${language}' is not supported by sandbox executor` });
      }

      const { CodeExecutionService } = await import('./src/services/CodeExecutionService');
      const executionService = new CodeExecutionService();

      const result = await executionService.executeSubmission(
        {
          questionId,
          userId,
          language,
          sourceCode,
          isSubmission: true,
        },
        problem.testCases || []
      );

      const submissionRecord = db.saveCodingSubmission({
        id: result.submissionId,
        userId,
        testSeriesId,
        testAttemptId,
        questionId,
        language,
        sourceCode,
        executionResult: result,
        isFinalSubmission: true,
        createdAt: result.executedAt,
      });

      return res.json({ success: true, result, submission: submissionRecord });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // Get Submissions for User
  app.get('/api/coding/submissions', (req: Request, res: Response) => {
    try {
      const { userId, questionId } = req.query;
      if (!userId) {
        return res.status(400).json({ error: 'userId query parameter is required' });
      }
      const submissions = db.getCodingSubmissionsForUser(userId as string, questionId as string | undefined);
      return res.json({ success: true, submissions });
    } catch (err: any) {
      return handleApiError(res, err);
    }
  });

  // --- Vite Dev Middleware / Production Static ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Safe production error handler
  app.use((err: any, req: Request, res: Response, next: Function) => {
    console.error('[FirstRound Server Error]', err?.message || err);
    res.status(500).json({ error: 'Internal server error' });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FirstRound server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

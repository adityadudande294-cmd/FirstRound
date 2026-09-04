import Database from 'better-sqlite3';
import path from 'path';
import dotenv from 'dotenv';
import {
  AdminStats,
  AppNotification,
  BookmarkedItem,
  CompanyInfo,
  LeaderboardEntry,
  MegaEvent,
  Question,
  QuestionResponse,
  QuestionResponseDetail,
  TestAttempt,
  TestMode,
  TestSeries,
  User,
  WeakQuestionItem,
  CodingSubmissionRecord,
} from '../src/types';
import {
  SEED_COMPANIES,
  SEED_MEGA_EVENTS,
  SEED_QUESTIONS,
  SEED_TESTS,
  SEED_USERS,
} from './data/seedData';
import { CATALOGUE_TESTS } from './data/catalogueData';
import { quantQuestions } from '../src/data/questionBank/quant';
import { logicalQuestions } from '../src/data/questionBank/logical';
import { verbalQuestions } from '../src/data/questionBank/verbal';
import { diQuestions, diStimuli } from '../src/data/questionBank/di';
import { pseudocodeQuestions } from '../src/data/questionBank/pseudocode';
import { accentureQuestions } from '../src/data/questionBank/accenture';
import { cognizantQuestions } from '../src/data/questionBank/cognizant';
import { infosysQuestions } from '../src/data/questionBank/infosys';
import { tcsAdvancedQuestions } from '../src/data/questionBank/tcsAdvanced';
import { tcsCodingProblems } from '../src/data/questionBank/tcsCoding';
import { codingMockQuestions } from '../src/data/questionBank/codingMock';
import { LANGUAGE_ADAPTERS } from '../src/services/CodeExecutionService';
import { wiproQuestions } from '../src/data/questionBank/wipro';
import { COMPANY_BLUEPRINTS } from '../src/data/blueprints/company';
import { questionSelectionEngine } from '../src/services/QuestionSelectionEngine';

dotenv.config();

class MemoryDatabase {
  private sqliteDb: Database.Database;

  constructor() {
    const dbPath = process.env.SQLITE_DB_PATH || 'firstround.db';
    const resolvedPath = path.isAbsolute(dbPath) ? dbPath : path.resolve(process.cwd(), dbPath);
    this.sqliteDb = new Database(resolvedPath);
    
    // Enable WAL mode for performance and concurrent read/write transactions
    this.sqliteDb.pragma('journal_mode = WAL');
    this.sqliteDb.pragma('foreign_keys = ON');

    this.initSchema();
    this.seed();
    this.syncTestUserHistory();
  }

  private initSchema() {
    this.sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE,
        name TEXT,
        college TEXT,
        targetCompany TEXT,
        targetRole TEXT,
        role TEXT,
        totalPoints INTEGER,
        totalTestsAttempted INTEGER,
        totalCorrect INTEGER,
        totalIncorrect INTEGER,
        averageAccuracy REAL,
        averageTimePerQuestionSeconds INTEGER,
        readNotificationIds TEXT,
        createdAt TEXT
      );

      CREATE TABLE IF NOT EXISTS companies (
        id TEXT PRIMARY KEY,
        name TEXT,
        badge TEXT,
        color TEXT,
        accentBg TEXT,
        description TEXT,
        rounds TEXT,
        patternSummary TEXT,
        negativeMarking TEXT,
        typicalCutoff TEXT,
        recommendedPrepTime TEXT,
        activeTestCount INTEGER
      );

      CREATE TABLE IF NOT EXISTS tests (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        category TEXT,
        company TEXT,
        companyId TEXT,
        companyName TEXT,
        roles TEXT,
        supportedRoles TEXT,
        skills TEXT,
        topics TEXT,
        difficulty TEXT,
        durationMinutes INTEGER,
        duration INTEGER,
        totalQuestions INTEGER,
        questionCount INTEGER,
        passingPercentage REAL,
        testType TEXT,
        mode TEXT,
        patternVersion TEXT,
        verificationStatus TEXT,
        isMegaEvent INTEGER,
        megaEventId TEXT,
        tags TEXT,
        attemptsCount INTEGER,
        avgScore REAL,
        status TEXT,
        scoringModel TEXT
      );

      CREATE TABLE IF NOT EXISTS questions (
        id TEXT PRIMARY KEY,
        testSeriesId TEXT,
        questionText TEXT,
        codeSnippet TEXT,
        options TEXT,
        correctOption TEXT,
        topic TEXT,
        subTopic TEXT,
        difficulty TEXT,
        companyTag TEXT,
        yearTag TEXT,
        explanation TEXT,
        shortcutFormula TEXT,
        stimulusId TEXT,
        stimulus TEXT
      );

      CREATE TABLE IF NOT EXISTS mega_events (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        company TEXT,
        startTime TEXT,
        endTime TEXT,
        durationMinutes INTEGER,
        status TEXT,
        testSeriesId TEXT,
        totalParticipants INTEGER,
        prizes TEXT,
        bannerTag TEXT,
        badge TEXT
      );

      CREATE TABLE IF NOT EXISTS test_attempts (
        id TEXT PRIMARY KEY,
        userId TEXT,
        userName TEXT,
        userCollege TEXT,
        testSeriesId TEXT,
        testInstanceId TEXT,
        testTitle TEXT,
        companyName TEXT,
        mode TEXT,
        totalQuestions INTEGER,
        attemptedQuestions INTEGER,
        correctCount INTEGER,
        incorrectCount INTEGER,
        unattemptedCount INTEGER,
        scorePoints INTEGER,
        accuracyPercentage INTEGER,
        timeTakenSeconds INTEGER,
        avgTimePerQuestionSeconds INTEGER,
        submittedAt TEXT,
        topicBreakdown TEXT,
        strengths TEXT,
        weaknesses TEXT,
        recommendations TEXT,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS attempt_responses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        attemptId TEXT,
        questionId TEXT,
        selectedOption TEXT,
        timeSpentSeconds INTEGER,
        isCorrect INTEGER,
        correctOption TEXT,
        question TEXT,
        FOREIGN KEY (attemptId) REFERENCES test_attempts(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS test_user_history (
        userId TEXT,
        testId TEXT,
        status TEXT,
        firstVisitedAt TEXT,
        lastVisitedAt TEXT,
        lastAttemptAt TEXT,
        attemptCount INTEGER,
        bestScore REAL,
        lastScore REAL,
        PRIMARY KEY (userId, testId),
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS bookmarks (
        id TEXT PRIMARY KEY,
        userId TEXT,
        questionId TEXT,
        question TEXT,
        addedAt TEXT,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        type TEXT,
        title TEXT,
        message TEXT,
        createdAt TEXT,
        actionType TEXT,
        actionTargetId TEXT,
        actionTestId TEXT,
        actionTab TEXT,
        actionLabel TEXT,
        actionUrl TEXT,
        targetCompany TEXT,
        targetUserId TEXT,
        audience TEXT
      );

      CREATE TABLE IF NOT EXISTS coding_submissions (
        id TEXT PRIMARY KEY,
        userId TEXT,
        testSeriesId TEXT,
        testAttemptId TEXT,
        questionId TEXT,
        language TEXT,
        sourceCode TEXT,
        executionResult TEXT,
        isFinalSubmission INTEGER,
        createdAt TEXT,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_attempts_userId ON test_attempts(userId);
      CREATE INDEX IF NOT EXISTS idx_responses_attemptId ON attempt_responses(attemptId);
      CREATE INDEX IF NOT EXISTS idx_bookmarks_userId ON bookmarks(userId);
      CREATE INDEX IF NOT EXISTS idx_coding_submissions_userId ON coding_submissions(userId);
      CREATE INDEX IF NOT EXISTS idx_questions_testSeriesId ON questions(testSeriesId);
    `);
  }

  private seed() {
    const userCount = this.sqliteDb.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
    if (userCount.count === 0) {
      const insertUser = this.sqliteDb.prepare(`
        INSERT INTO users (
          id, email, name, college, targetCompany, targetRole, role,
          totalPoints, totalTestsAttempted, totalCorrect, totalIncorrect,
          averageAccuracy, averageTimePerQuestionSeconds, readNotificationIds, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      this.sqliteDb.transaction(() => {
        SEED_USERS.forEach((u) => {
          insertUser.run(
            u.id,
            u.email,
            u.name,
            u.college || '',
            u.targetCompany || '',
            u.targetRole || '',
            u.role,
            0,
            0,
            0,
            0,
            0,
            0,
            JSON.stringify([]),
            u.createdAt || new Date().toISOString()
          );
        });
      })();
    }

    const companyCount = this.sqliteDb.prepare('SELECT COUNT(*) as count FROM companies').get() as { count: number };
    if (companyCount.count === 0) {
      const insertCompany = this.sqliteDb.prepare(`
        INSERT INTO companies (
          id, name, badge, color, accentBg, description, rounds,
          patternSummary, negativeMarking, typicalCutoff, recommendedPrepTime, activeTestCount
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      this.sqliteDb.transaction(() => {
        SEED_COMPANIES.forEach((c) => {
          insertCompany.run(
            c.id,
            c.name,
            c.badge,
            c.color,
            c.accentBg,
            c.description,
            JSON.stringify(c.rounds),
            c.patternSummary,
            c.negativeMarking,
            c.typicalCutoff,
            c.recommendedPrepTime,
            c.activeTestCount
          );
        });
      })();
    }

    const testCount = this.sqliteDb.prepare('SELECT COUNT(*) as count FROM tests').get() as { count: number };
    if (testCount.count === 0) {
      const insertTest = this.sqliteDb.prepare(`
        INSERT INTO tests (
          id, title, description, category, company, companyId, companyName,
          roles, supportedRoles, skills, topics, difficulty, durationMinutes, duration,
          totalQuestions, questionCount, passingPercentage, testType, mode,
          patternVersion, verificationStatus, isMegaEvent, megaEventId, tags,
          attemptsCount, avgScore, status, scoringModel
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      this.sqliteDb.transaction(() => {
        SEED_TESTS.forEach((t) => {
          insertTest.run(
            t.id,
            t.title,
            t.description,
            t.category,
            t.company || '',
            t.companyId || '',
            t.companyName || '',
            JSON.stringify(t.roles || []),
            JSON.stringify(t.supportedRoles || []),
            JSON.stringify(t.skills || []),
            JSON.stringify(t.topics || []),
            t.difficulty,
            t.durationMinutes,
            t.duration || t.durationMinutes,
            t.totalQuestions,
            t.questionCount || t.totalQuestions,
            t.passingPercentage || 0,
            t.testType || '',
            t.mode || '',
            t.patternVersion || '',
            t.verificationStatus || '',
            t.isMegaEvent ? 1 : 0,
            t.megaEventId || '',
            JSON.stringify(t.tags || []),
            0,
            0,
            t.status || null,
            t.scoringModel || ''
          );
        });
      })();
    }

    // Unconditionally seed CATALOGUE_TESTS using UPSERT to update metadata of existing tests
    const insertCatalogueTest = this.sqliteDb.prepare(`
      INSERT INTO tests (
        id, title, description, category, company, companyId, companyName,
        roles, supportedRoles, skills, topics, difficulty, durationMinutes, duration,
        totalQuestions, questionCount, passingPercentage, testType, mode,
        patternVersion, verificationStatus, isMegaEvent, megaEventId, tags,
        attemptsCount, avgScore, status, scoringModel
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        title = excluded.title,
        description = excluded.description,
        status = excluded.status,
        verificationStatus = excluded.verificationStatus,
        totalQuestions = excluded.totalQuestions,
        questionCount = excluded.questionCount,
        durationMinutes = excluded.durationMinutes,
        duration = excluded.duration,
        category = excluded.category,
        difficulty = excluded.difficulty,
        skills = excluded.skills,
        topics = excluded.topics,
        tags = excluded.tags,
        roles = excluded.roles,
        supportedRoles = excluded.supportedRoles
    `);
    this.sqliteDb.transaction(() => {
      CATALOGUE_TESTS.forEach((t) => {
        insertCatalogueTest.run(
          t.id,
          t.title,
          t.description,
          t.category,
          t.company || '',
          t.companyId || '',
          t.companyName || '',
          JSON.stringify(t.roles || []),
          JSON.stringify(t.supportedRoles || []),
          JSON.stringify(t.skills || []),
          JSON.stringify(t.topics || []),
          t.difficulty,
          t.durationMinutes,
          t.duration || t.durationMinutes,
          t.totalQuestions,
          t.questionCount || t.totalQuestions,
          t.passingPercentage || 0,
          t.testType || '',
          t.mode || '',
          t.patternVersion || '',
          t.verificationStatus || '',
          t.isMegaEvent ? 1 : 0,
          t.megaEventId || '',
          JSON.stringify(t.tags || []),
          0,
          0,
          t.status || null,
          t.scoringModel || ''
        );
      });
    })();

    const questionCount = this.sqliteDb.prepare('SELECT COUNT(*) as count FROM questions').get() as { count: number };
    if (questionCount.count === 0) {
      const insertQuestion = this.sqliteDb.prepare(`
        INSERT INTO questions (
          id, testSeriesId, questionText, codeSnippet, options, correctOption,
          topic, subTopic, difficulty, companyTag, yearTag, explanation,
          shortcutFormula, stimulusId, stimulus
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      this.sqliteDb.transaction(() => {
        SEED_QUESTIONS.forEach((q) => {
          insertQuestion.run(
            q.id,
            q.testSeriesId,
            q.questionText,
            q.codeSnippet || '',
            JSON.stringify(q.options),
            q.correctOption,
            q.topic,
            q.subTopic || '',
            q.difficulty,
            q.companyTag || '',
            q.yearTag || '',
            q.explanation,
            q.shortcutFormula || '',
            q.stimulusId || '',
            q.stimulus ? JSON.stringify(q.stimulus) : ''
          );
        });
      })();
    }

    const megaEventCount = this.sqliteDb.prepare('SELECT COUNT(*) as count FROM mega_events').get() as { count: number };
    if (megaEventCount.count === 0) {
      const insertMega = this.sqliteDb.prepare(`
        INSERT INTO mega_events (
          id, title, description, company, startTime, endTime, durationMinutes,
          status, testSeriesId, totalParticipants, prizes, bannerTag, badge
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      this.sqliteDb.transaction(() => {
        SEED_MEGA_EVENTS.forEach((m) => {
          insertMega.run(
            m.id,
            m.title,
            m.description,
            m.company,
            m.startTime,
            m.endTime,
            m.durationMinutes,
            m.status,
            m.testSeriesId,
            m.totalParticipants,
            m.prizes,
            m.bannerTag,
            m.badge
          );
        });
      })();
    }
  }

  /**
   * Backfills test_user_history from test_attempts for any users/tests that
   * have attempts but no corresponding history row. This ensures the history
   * table stays in sync even if earlier code paths failed to record history.
   * Runs on every server start; idempotent — skips rows that already exist.
   */
  private syncTestUserHistory() {
    const missingRows = this.sqliteDb.prepare(`
      SELECT ta.userId, ta.testSeriesId,
             MIN(ta.submittedAt) as firstAt,
             MAX(ta.submittedAt) as lastAt,
             COUNT(*) as cnt,
             MAX(ta.scorePoints) as best,
             (SELECT ta2.scorePoints FROM test_attempts ta2
              WHERE ta2.userId = ta.userId AND ta2.testSeriesId = ta.testSeriesId
              ORDER BY ta2.submittedAt DESC LIMIT 1) as lastScore
      FROM test_attempts ta
      INNER JOIN users u ON ta.userId = u.id
      LEFT JOIN test_user_history tuh ON ta.userId = tuh.userId AND ta.testSeriesId = tuh.testId
      WHERE tuh.userId IS NULL
      GROUP BY ta.userId, ta.testSeriesId
    `).all() as any[];

    if (missingRows.length === 0) return;

    const insert = this.sqliteDb.prepare(`
      INSERT INTO test_user_history
      (userId, testId, status, firstVisitedAt, lastVisitedAt, lastAttemptAt, attemptCount, bestScore, lastScore)
      VALUES (?, ?, 'COMPLETED', ?, ?, ?, ?, ?, ?)
    `);

    this.sqliteDb.transaction(() => {
      for (const row of missingRows) {
        insert.run(
          row.userId, row.testSeriesId,
          row.firstAt, row.lastAt, row.lastAt,
          row.cnt, row.best, row.lastScore
        );
      }
    })();
  }

  // --- User Operations ---
  public loginOrRegister(email: string, name?: string, college?: string, targetCompany?: string, targetRole?: string, role?: 'student' | 'admin'): User {
    const existing = this.sqliteDb.prepare('SELECT * FROM users WHERE LOWER(email) = LOWER(?)').get(email) as any;
    if (existing) {
      return {
        ...existing,
        readNotificationIds: JSON.parse(existing.readNotificationIds || '[]'),
      };
    }
    const isAdmin = role === 'admin' || email.toLowerCase() === 'aadi@gmail.com';
    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      email,
      name: name || (isAdmin ? 'Aaditya Sharma (Admin)' : email.split('@')[0]),
      college: college || '',
      targetCompany: targetCompany || '',
      targetRole: targetRole || '',
      role: isAdmin ? 'admin' : 'student',
      totalPoints: 0,
      totalTestsAttempted: 0,
      totalCorrect: 0,
      totalIncorrect: 0,
      averageAccuracy: 0,
      averageTimePerQuestionSeconds: 0,
      createdAt: new Date().toISOString(),
      readNotificationIds: [],
    };
    this.sqliteDb.prepare(`
      INSERT INTO users (
        id, email, name, college, targetCompany, targetRole, role,
        totalPoints, totalTestsAttempted, totalCorrect, totalIncorrect,
        averageAccuracy, averageTimePerQuestionSeconds, readNotificationIds, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      newUser.id,
      newUser.email,
      newUser.name,
      newUser.college,
      newUser.targetCompany,
      newUser.targetRole,
      newUser.role,
      newUser.totalPoints,
      newUser.totalTestsAttempted,
      newUser.totalCorrect,
      newUser.totalIncorrect,
      newUser.averageAccuracy,
      newUser.averageTimePerQuestionSeconds,
      JSON.stringify(newUser.readNotificationIds),
      newUser.createdAt
    );
    return newUser;
  }

  public getUserById(id: string): User | undefined {
    const user = this.sqliteDb.prepare('SELECT * FROM users WHERE id = ?').get(id) as any;
    if (!user) return undefined;
    return {
      ...user,
      readNotificationIds: JSON.parse(user.readNotificationIds || '[]'),
    };
  }

  public updateUser(id: string, data: Partial<User>): User | undefined {
    const user = this.getUserById(id);
    if (!user) return undefined;
    const updated: User = {
      ...user,
      ...data,
      id: user.id,
      email: user.email,
    };
    this.sqliteDb.prepare(`
      UPDATE users SET
        name = ?,
        college = ?,
        targetCompany = ?,
        targetRole = ?,
        role = ?,
        totalPoints = ?,
        totalTestsAttempted = ?,
        totalCorrect = ?,
        totalIncorrect = ?,
        averageAccuracy = ?,
        averageTimePerQuestionSeconds = ?,
        readNotificationIds = ?,
        createdAt = ?
      WHERE id = ?
    `).run(
      updated.name,
      updated.college || '',
      updated.targetCompany || '',
      updated.targetRole || '',
      updated.role,
      updated.totalPoints,
      updated.totalTestsAttempted,
      updated.totalCorrect,
      updated.totalIncorrect,
      updated.averageAccuracy,
      updated.averageTimePerQuestionSeconds,
      JSON.stringify(updated.readNotificationIds || []),
      updated.createdAt,
      id
    );
    return updated;
  }

  public getAllUsers(): User[] {
    const rows = this.sqliteDb.prepare('SELECT * FROM users').all() as any[];
    return rows.map((r) => ({
      ...r,
      readNotificationIds: JSON.parse(r.readNotificationIds || '[]'),
    }));
  }

  public recalculateUserStats(userId: string): User | undefined {
    const user = this.getUserById(userId);
    if (!user) return undefined;

    const userAttempts = this.sqliteDb.prepare("SELECT * FROM test_attempts WHERE userId = ? AND mode = 'exam'").all(userId) as any[];
    const totalTests = userAttempts.length;
    const totalPoints = userAttempts.reduce((sum, a) => sum + a.scorePoints, 0);
    const totalCorrect = userAttempts.reduce((sum, a) => sum + a.correctCount, 0);
    const totalIncorrect = userAttempts.reduce((sum, a) => sum + a.incorrectCount, 0);
    const totalTime = userAttempts.reduce((sum, a) => sum + a.timeTakenSeconds, 0);
    const totalAttemptedQuestions = userAttempts.reduce((sum, a) => sum + a.attemptedQuestions, 0);

    const totalQuestionsSum = totalCorrect + totalIncorrect;
    const averageAccuracy = totalQuestionsSum > 0 ? Number(((totalCorrect / totalQuestionsSum) * 100).toFixed(1)) : 0;
    const averageSpeed = totalAttemptedQuestions > 0 ? Math.round(totalTime / totalAttemptedQuestions) : 0;

    user.totalPoints = totalPoints;
    user.totalTestsAttempted = totalTests;
    user.totalCorrect = totalCorrect;
    user.totalIncorrect = totalIncorrect;
    user.averageAccuracy = averageAccuracy;
    user.averageTimePerQuestionSeconds = averageSpeed;

    this.sqliteDb.prepare(`
      UPDATE users SET
        totalPoints = ?,
        totalTestsAttempted = ?,
        totalCorrect = ?,
        totalIncorrect = ?,
        averageAccuracy = ?,
        averageTimePerQuestionSeconds = ?
      WHERE id = ?
    `).run(
      user.totalPoints,
      user.totalTestsAttempted,
      user.totalCorrect,
      user.totalIncorrect,
      user.averageAccuracy,
      user.averageTimePerQuestionSeconds,
      userId
    );
    return user;
  }

  // --- Company Operations ---
  public getCompanies(): CompanyInfo[] {
    const rows = this.sqliteDb.prepare('SELECT * FROM companies').all() as any[];
    return rows.map((c) => ({
      ...c,
      rounds: JSON.parse(c.rounds || '[]'),
    }));
  }

  // --- Test Series Operations ---
  public getTests(filters?: {
    category?: string;
    companyId?: string;
    difficulty?: string;
    search?: string;
  }): TestSeries[] {
    let query = 'SELECT * FROM tests WHERE 1=1';
    const params: any[] = [];

    if (filters?.category && filters.category !== 'All') {
      query += ' AND category = ?';
      params.push(filters.category);
    }
    if (filters?.companyId && filters.companyId !== 'all') {
      query += ' AND companyId = ?';
      params.push(filters.companyId);
    }
    if (filters?.difficulty && filters.difficulty !== 'All') {
      query += ' AND difficulty = ?';
      params.push(filters.difficulty);
    }
    if (filters?.search) {
      query += ' AND (LOWER(title) LIKE ? OR LOWER(description) LIKE ? OR LOWER(tags) LIKE ?)';
      const s = `%${filters.search.toLowerCase()}%`;
      params.push(s, s, s);
    }

    const rows = this.sqliteDb.prepare(query).all(params) as any[];
    return rows.map((t) => {
      const questionsCount = (this.sqliteDb.prepare('SELECT COUNT(*) as count FROM questions WHERE testSeriesId = ?').get(t.id) as any).count;
      return {
        ...t,
        roles: JSON.parse(t.roles || '[]'),
        supportedRoles: JSON.parse(t.supportedRoles || '[]'),
        skills: JSON.parse(t.skills || '[]'),
        topics: JSON.parse(t.topics || '[]'),
        tags: JSON.parse(t.tags || '[]'),
        isMegaEvent: !!t.isMegaEvent,
        totalQuestions: questionsCount || t.totalQuestions,
        status: t.status === null ? undefined : t.status,
      };
    });
  }

  public getCatalogueTests(): TestSeries[] {
    const rows = this.sqliteDb.prepare("SELECT * FROM tests WHERE id LIKE 'cat_%'").all() as any[];
    const mapped = rows.map((t) => {
      const questionsCount = (this.sqliteDb.prepare('SELECT COUNT(*) as count FROM questions WHERE testSeriesId = ?').get(t.id) as any).count;
      return {
        ...t,
        roles: JSON.parse(t.roles || '[]'),
        supportedRoles: JSON.parse(t.supportedRoles || '[]'),
        skills: JSON.parse(t.skills || '[]'),
        topics: JSON.parse(t.topics || '[]'),
        tags: JSON.parse(t.tags || '[]'),
        isMegaEvent: !!t.isMegaEvent,
        totalQuestions: questionsCount || t.totalQuestions,
        status: t.status === null ? undefined : t.status,
      };
    });

    return mapped.sort((a, b) => {
      const order: Record<string, number> = { foundation: 0, company: 1, coding: 2 };
      const ao = order[a.category as string] ?? 99;
      const bo = order[b.category as string] ?? 99;
      if (ao !== bo) return ao - bo;
      return a.id.localeCompare(b.id);
    });
  }

  public getTestById(id: string, includeQuestions = true): (TestSeries & { questions?: Question[] }) | undefined {
    const t = this.sqliteDb.prepare('SELECT * FROM tests WHERE id = ?').get(id) as any;
    if (!t) return undefined;

    const questions = includeQuestions ? this.getQuestionsForTest(id) : undefined;
    const questionsCount = includeQuestions ? questions!.length : (this.sqliteDb.prepare('SELECT COUNT(*) as count FROM questions WHERE testSeriesId = ?').get(t.id) as any).count;

    return {
      ...t,
      roles: JSON.parse(t.roles || '[]'),
      supportedRoles: JSON.parse(t.supportedRoles || '[]'),
      skills: JSON.parse(t.skills || '[]'),
      topics: JSON.parse(t.topics || '[]'),
      tags: JSON.parse(t.tags || '[]'),
      isMegaEvent: !!t.isMegaEvent,
      totalQuestions: questionsCount || t.totalQuestions,
      status: t.status === null ? undefined : t.status,
      ...(includeQuestions && { questions }),
    };
  }

  public getQuestionsForTest(testId: string): Question[] {
    if (testId === 'cat_foundation_quant') {
      return quantQuestions.map((cq: any) => ({
        id: cq.id,
        testSeriesId: testId,
        questionText: cq.questionText,
        options: cq.options,
        correctOption: cq.correctAnswer,
        topic: cq.topic,
        difficulty: cq.difficulty,
        explanation: cq.explanation
      })) as Question[];
    }

    if (testId === 'cat_foundation_logical') {
      return logicalQuestions.map((cq: any) => ({
        id: cq.id,
        testSeriesId: testId,
        questionText: cq.questionText,
        options: cq.options,
        correctOption: cq.correctAnswer,
        topic: cq.topic,
        difficulty: cq.difficulty,
        explanation: cq.explanation
      })) as Question[];
    }

    if (testId === 'cat_foundation_verbal') {
      return verbalQuestions.map((cq: any) => ({
        id: cq.id,
        testSeriesId: testId,
        questionText: cq.questionText,
        options: cq.options,
        correctOption: cq.correctAnswer,
        topic: cq.topic,
        difficulty: cq.difficulty,
        explanation: cq.explanation
      })) as Question[];
    }

    if (testId === 'cat_foundation_di') {
      return diQuestions.map((cq: any) => {
        const matchingStim = diStimuli.find(s => s.id === cq.stimulusId);
        return {
          id: cq.id,
          testSeriesId: testId,
          stimulusId: cq.stimulusId,
          stimulus: matchingStim,
          questionText: cq.questionText,
          options: cq.options,
          correctOption: cq.correctAnswer,
          topic: cq.topic,
          difficulty: cq.difficulty,
          explanation: cq.explanation
        };
      }) as Question[];
    }

    if (testId === 'cat_foundation_pseudocode') {
      return pseudocodeQuestions.map((cq: any) => ({
        id: cq.id,
        testSeriesId: testId,
        questionText: cq.questionText,
        options: cq.options,
        correctOption: cq.correctAnswer,
        topic: cq.topic,
        difficulty: cq.difficulty,
        explanation: cq.explanation
      })) as Question[];
    }

    if (testId === 'cat_company_wipro') {
      const wiproBp = COMPANY_BLUEPRINTS.find((b) => b.id === 'bp_company_wipro_elite_nth');
      if (wiproBp) {
        const fullBank = [
          ...quantQuestions,
          ...logicalQuestions,
          ...verbalQuestions,
          ...diQuestions,
          ...pseudocodeQuestions,
          ...accentureQuestions,
          ...cognizantQuestions,
          ...infosysQuestions,
          ...tcsAdvancedQuestions,
          ...tcsCodingProblems,
          ...wiproQuestions,
        ];
        const assembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
          userId: 'usr_catalogue_default',
          blueprint: wiproBp,
          questionBank: fullBank,
          previouslyAttemptedQuestionIds: [],
          allowPartialReuseWhenExhausted: true,
        });
        const selected = assembly.sectionResults.flatMap((sr) => sr.selectedQuestions);
        return selected.map((cq: any) => this.mapCanonicalToQuestion(testId, cq));
      }
    }

    if (testId === 'cat_company_accenture') {
      const accBp = COMPANY_BLUEPRINTS.find((b) => b.id === 'bp_company_accenture_cognitive');
      if (accBp) {
        const fullBank = [
          ...quantQuestions,
          ...logicalQuestions,
          ...verbalQuestions,
          ...diQuestions,
          ...pseudocodeQuestions,
          ...accentureQuestions,
          ...cognizantQuestions,
          ...infosysQuestions,
          ...tcsAdvancedQuestions,
          ...tcsCodingProblems,
          ...wiproQuestions,
        ];
        const assembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
          userId: 'usr_catalogue_default',
          blueprint: accBp,
          questionBank: fullBank,
          previouslyAttemptedQuestionIds: [],
          allowPartialReuseWhenExhausted: true,
        });
        const selected = assembly.sectionResults.flatMap((sr) => sr.selectedQuestions);
        return selected.map((cq: any) => this.mapCanonicalToQuestion(testId, cq));
      }
    }

    if (testId === 'cat_company_cognizant') {
      const cogBp = COMPANY_BLUEPRINTS.find((b) => b.id === 'bp_company_cognizant_genc');
      if (cogBp) {
        const fullBank = [
          ...quantQuestions,
          ...logicalQuestions,
          ...verbalQuestions,
          ...diQuestions,
          ...pseudocodeQuestions,
          ...accentureQuestions,
          ...cognizantQuestions,
          ...infosysQuestions,
          ...tcsAdvancedQuestions,
          ...tcsCodingProblems,
          ...wiproQuestions,
        ];
        const assembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
          userId: 'usr_catalogue_default',
          blueprint: cogBp,
          questionBank: fullBank,
          previouslyAttemptedQuestionIds: [],
          allowPartialReuseWhenExhausted: true,
        });
        const selected = assembly.sectionResults.flatMap((sr) => sr.selectedQuestions);
        return selected.map((cq: any) => this.mapCanonicalToQuestion(testId, cq));
      }
    }

    if (testId === 'cat_company_infosys') {
      const infBp = COMPANY_BLUEPRINTS.find((b) => b.id === 'bp_company_infosys_assessment');
      if (infBp) {
        const fullBank = [
          ...quantQuestions,
          ...logicalQuestions,
          ...verbalQuestions,
          ...diQuestions,
          ...pseudocodeQuestions,
          ...accentureQuestions,
          ...cognizantQuestions,
          ...infosysQuestions,
          ...tcsAdvancedQuestions,
          ...tcsCodingProblems,
          ...wiproQuestions,
        ];
        const assembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
          userId: 'usr_catalogue_default',
          blueprint: infBp,
          questionBank: fullBank,
          previouslyAttemptedQuestionIds: [],
          allowPartialReuseWhenExhausted: true,
        });
        const selected = assembly.sectionResults.flatMap((sr) => sr.selectedQuestions);
        return selected.map((cq: any) => this.mapCanonicalToQuestion(testId, cq));
      }
    }

    if (testId === 'cat_company_tcs_foundation') {
      const tcsFndBp = COMPANY_BLUEPRINTS.find((b) => b.id === 'bp_company_tcs_nqt_foundation');
      if (tcsFndBp) {
        const fullBank = [
          ...quantQuestions,
          ...logicalQuestions,
          ...verbalQuestions,
          ...diQuestions,
          ...pseudocodeQuestions,
          ...accentureQuestions,
          ...cognizantQuestions,
          ...infosysQuestions,
          ...tcsAdvancedQuestions,
          ...tcsCodingProblems,
          ...wiproQuestions,
        ];
        const assembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
          userId: 'usr_catalogue_default',
          blueprint: tcsFndBp,
          questionBank: fullBank,
          previouslyAttemptedQuestionIds: [],
          allowPartialReuseWhenExhausted: true,
        });
        const selected = assembly.sectionResults.flatMap((sr) => sr.selectedQuestions);
        return selected.map((cq: any) => this.mapCanonicalToQuestion(testId, cq));
      }
    }

    if (testId === 'cat_company_tcs') {
      const tcsBp = COMPANY_BLUEPRINTS.find((b) => b.id === 'bp_company_tcs_nqt_advanced');
      if (tcsBp) {
        const fullBank = [
          ...quantQuestions,
          ...logicalQuestions,
          ...verbalQuestions,
          ...diQuestions,
          ...pseudocodeQuestions,
          ...accentureQuestions,
          ...cognizantQuestions,
          ...infosysQuestions,
          ...tcsAdvancedQuestions,
          ...tcsCodingProblems,
          ...wiproQuestions,
        ];
        const assembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
          userId: 'usr_catalogue_default',
          blueprint: tcsBp,
          questionBank: fullBank,
          previouslyAttemptedQuestionIds: [],
          allowPartialReuseWhenExhausted: true,
        });
        const selected = assembly.sectionResults.flatMap((sr) => sr.selectedQuestions);
        return selected.map((cq: any) => this.mapCanonicalToQuestion(testId, cq));
      }
    }

    if (testId === 'cat_coding_mock_01') {
      return codingMockQuestions.map((cq: any) => this.mapCanonicalToQuestion(testId, cq));
    }

    const rows = this.sqliteDb.prepare('SELECT * FROM questions WHERE testSeriesId = ?').all(testId) as any[];
    const directQuestions = rows.map((q) => ({
      ...q,
      options: JSON.parse(q.options || '[]'),
      stimulus: q.stimulus ? JSON.parse(q.stimulus) : undefined,
    }));
    
    if (directQuestions.length >= 6) {
      return directQuestions;
    }

    const test = this.sqliteDb.prepare('SELECT * FROM tests WHERE id = ?').get(testId) as any;
    const allRows = this.sqliteDb.prepare('SELECT * FROM questions').all() as any[];
    const allQuestions = allRows.map((q) => ({
      ...q,
      options: JSON.parse(q.options || '[]'),
      stimulus: q.stimulus ? JSON.parse(q.stimulus) : undefined,
    }));

    const matched = allQuestions.filter((q) => {
      if (test?.companyId && (q.companyTag?.toLowerCase().includes(test.companyId) || q.testSeriesId.includes(test.companyId))) return true;
      if (test?.category === 'Quantitative' && (q.topic.includes('Time') || q.topic.includes('Number') || q.topic.includes('Profit') || q.topic.includes('Permutations'))) return true;
      if (test?.category === 'Logical' && (q.topic.includes('Syllogisms') || q.topic.includes('Puzzles') || q.topic.includes('Coding') || q.topic.includes('Critical') || q.topic.includes('Reasoning'))) return true;
      if (test?.category === 'Technical' && (q.topic.includes('Pseudocode') || q.topic.includes('Operating') || q.topic.includes('Data') || q.topic.includes('DBMS') || q.topic.includes('CS'))) return true;
      if (test?.category === 'Verbal' && (q.topic.includes('Verbal') || q.topic.includes('Grammar') || q.topic.includes('Vocabulary'))) return true;
      return false;
    });

    const pool = matched.length >= 6 ? matched : allQuestions;
    const synthesized = pool.slice(0, test?.totalQuestions || 8).map((q, idx) => ({
      ...q,
      id: `${testId}_q_${idx + 1}`,
      testSeriesId: testId,
    }));

    return synthesized;
  }

  

  // ==========================================
  // Test User History
  // ==========================================
  
  public getTestHistoryForUser(userId: string) {
    const stmt = this.sqliteDb.prepare(`
      SELECT * FROM test_user_history WHERE userId = ?
    `);
    return stmt.all(userId);
  }

  public upsertTestHistoryVisit(userId: string, testId: string) {
    const now = new Date().toISOString();
    const existing = this.sqliteDb.prepare(`SELECT * FROM test_user_history WHERE userId = ? AND testId = ?`).get(userId, testId) as any;
    
    if (existing) {
      if (existing.status === 'NOT_STARTED') {
        const stmt = this.sqliteDb.prepare(`
          UPDATE test_user_history 
          SET status = 'VISITED', lastVisitedAt = ?
          WHERE userId = ? AND testId = ?
        `);
        stmt.run(now, userId, testId);
      } else {
        const stmt = this.sqliteDb.prepare(`
          UPDATE test_user_history 
          SET lastVisitedAt = ?
          WHERE userId = ? AND testId = ?
        `);
        stmt.run(now, userId, testId);
      }
    } else {
      const stmt = this.sqliteDb.prepare(`
        INSERT INTO test_user_history 
        (userId, testId, status, firstVisitedAt, lastVisitedAt, attemptCount, bestScore, lastScore) 
        VALUES (?, ?, 'VISITED', ?, ?, 0, 0, 0)
      `);
      stmt.run(userId, testId, now, now);
    }
  }

  public upsertTestHistoryInProgress(userId: string, testId: string) {
    const now = new Date().toISOString();
    const existing = this.sqliteDb.prepare(`SELECT * FROM test_user_history WHERE userId = ? AND testId = ?`).get(userId, testId) as any;

    if (existing) {
      // Only upgrade to IN_PROGRESS from VISITED / NOT_STARTED. Never downgrade COMPLETED.
      if (existing.status !== 'COMPLETED') {
        this.sqliteDb.prepare(`
          UPDATE test_user_history
          SET status = 'IN_PROGRESS', lastVisitedAt = ?
          WHERE userId = ? AND testId = ?
        `).run(now, userId, testId);
      }
    } else {
      this.sqliteDb.prepare(`
        INSERT INTO test_user_history
        (userId, testId, status, firstVisitedAt, lastVisitedAt, attemptCount, bestScore, lastScore)
        VALUES (?, ?, 'IN_PROGRESS', ?, ?, 0, 0, 0)
      `).run(userId, testId, now, now);
    }
  }

  public upsertTestHistoryComplete(userId: string, testId: string, score: number) {
    const now = new Date().toISOString();
    const existing = this.sqliteDb.prepare(`SELECT * FROM test_user_history WHERE userId = ? AND testId = ?`).get(userId, testId) as any;
    
    if (existing) {
      const bestScore = Math.max(existing.bestScore || 0, score);
      const attemptCount = (existing.attemptCount || 0) + 1;
      const stmt = this.sqliteDb.prepare(`
        UPDATE test_user_history 
        SET status = 'COMPLETED', lastAttemptAt = ?, attemptCount = ?, bestScore = ?, lastScore = ?
        WHERE userId = ? AND testId = ?
      `);
      stmt.run(now, attemptCount, bestScore, score, userId, testId);
    } else {
      const stmt = this.sqliteDb.prepare(`
        INSERT INTO test_user_history 
        (userId, testId, status, firstVisitedAt, lastVisitedAt, lastAttemptAt, attemptCount, bestScore, lastScore) 
        VALUES (?, ?, 'COMPLETED', ?, ?, ?, 1, ?, ?)
      `);
      stmt.run(userId, testId, now, now, now, score, score);
    }
  }

  public getAllAttempts(): TestAttempt[] {
    const rows = this.sqliteDb.prepare('SELECT * FROM test_attempts').all() as any[];
    return rows.map((att) => {
      const responsesRows = this.sqliteDb.prepare('SELECT * FROM attempt_responses WHERE attemptId = ?').all(att.id) as any[];
      return {
        ...att,
        responses: responsesRows.map((r) => ({
          ...r,
          isCorrect: !!r.isCorrect,
          question: JSON.parse(r.question),
        })),
        topicBreakdown: JSON.parse(att.topicBreakdown),
        strengths: JSON.parse(att.strengths),
        weaknesses: JSON.parse(att.weaknesses),
        recommendations: JSON.parse(att.recommendations),
      };
    });
  }

  // --- Submission & Evaluation Engine ---
  public submitTest(data: {
    userId: string;
    testSeriesId: string;
    testInstanceId?: string;
    mode: TestMode;
    responses: QuestionResponse[];
    timeTakenSeconds: number;
  }): TestAttempt {
    let user = this.getUserById(data.userId);
    if (!user) {
      user = this.loginOrRegister('candidate@firstround.com', 'Candidate');
    }
    const test = this.getTestById(data.testSeriesId, false);
    const testQuestions = this.getQuestionsForTest(data.testSeriesId);

    const questionMap = new Map<string, Question>();
    testQuestions.forEach((q) => questionMap.set(q.id, q));

    const responseDetails: QuestionResponseDetail[] = [];
    let correctCount = 0;
    let incorrectCount = 0;
    let attemptedCount = 0;

    const topicStats: Record<string, { total: number; correct: number; accuracy: number }> = {};

    let rawScore = 0;

    testQuestions.forEach((question) => {
      const resp = data.responses.find((r) => r.questionId === question.id);
      let isCorrect = false;
      let selected: any = null;
      let isAttempted = false;
      let timeSpentSeconds = 0;
      let questionScore = 0;

      if (resp) {
        timeSpentSeconds = resp.timeSpentSeconds || 0;
      }

      if (question.questionType === 'CODING') {
        const submission = this.getLatestCodingSubmission(data.userId, question.id);
        if (submission) {
          isAttempted = true;
          selected = 'A';
          const scorePct = submission.executionResult.scorePercentage || 0;
          isCorrect = scorePct === 100;
          if (isCorrect) {
            correctCount++;
            questionScore = 10;
          } else if (scorePct > 0) {
            correctCount++;
            questionScore = Math.round((scorePct / 100) * 10);
          } else {
            incorrectCount++;
            questionScore = -2;
          }
        }
      } else {
        selected = resp?.selectedOption || null;
        isAttempted = selected !== null && selected !== undefined;
        isCorrect = isAttempted && selected === question.correctOption;
        if (isAttempted) {
          if (isCorrect) {
            correctCount++;
            questionScore = 10;
          } else {
            incorrectCount++;
            questionScore = -2;
          }
        }
      }

      if (isAttempted) {
        attemptedCount++;
        rawScore += questionScore;
      }

      const topic = question.topic || 'General Aptitude';
      if (!topicStats[topic]) {
        topicStats[topic] = { total: 0, correct: 0, accuracy: 0 };
      }
      topicStats[topic].total += 1;
      if (isCorrect) {
        topicStats[topic].correct += 1;
      }

      responseDetails.push({
        questionId: question.id,
        selectedOption: selected,
        timeSpentSeconds,
        isCorrect,
        correctOption: question.correctOption || 'A',
        question,
      });
    });

    const scorePoints = Math.max(0, rawScore);
    const totalQuestions = testQuestions.length;
    const unattemptedCount = totalQuestions - attemptedCount;
    const accuracyPercentage = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const avgTimePerQuestion = attemptedCount > 0 ? Math.round(data.timeTakenSeconds / attemptedCount) : 0;

    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const recommendations: string[] = [];

    Object.entries(topicStats).forEach(([topic, stat]) => {
      stat.accuracy = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
      if (stat.accuracy >= 80) {
        strengths.push(topic);
      } else if (stat.accuracy < 60) {
        weaknesses.push(topic);
      }
    });


    if (weaknesses.length > 0) {
      const topWeak = weaknesses.slice(0, 3).join(', ');
      recommendations.push(`Priority Focus: Practice shortcut derivations for ${topWeak} in your Revision Vault.`);
      if (accuracyPercentage >= 60) {
        recommendations.push('Great core foundation! Eliminating minor negative markings will easily push you into the 85th+ percentile.');
      } else {
        recommendations.push('Try Practice Mode on these topics first to review step-by-step solutions with no time pressure.');
      }
    } else {
      recommendations.push('Outstanding precision! Zero weak areas detected in this assessment.');
      recommendations.push('Maintain this speed and test consistency to guarantee top placement shortlist clearance.');
    }

    const attempt: TestAttempt = {
      id: `attempt_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      userId: user.id,
      userName: user.name,
      userCollege: user.college,
      testSeriesId: data.testSeriesId,
      testInstanceId: data.testInstanceId || `instance_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      testTitle: test?.title || 'Placement Aptitude Test',
      companyName: test?.companyName,
      mode: data.mode,
      totalQuestions,
      attemptedQuestions: attemptedCount,
      correctCount,
      incorrectCount,
      unattemptedCount,
      scorePoints,
      accuracyPercentage,
      timeTakenSeconds: data.timeTakenSeconds,
      avgTimePerQuestionSeconds: avgTimePerQuestion,
      submittedAt: new Date().toISOString(),
      topicBreakdown: topicStats,
      strengths,
      weaknesses,
      recommendations,
      responses: responseDetails,
    };

    if (data.mode === 'exam') {
      this.sqliteDb.transaction(() => {
        this.sqliteDb.prepare(`
          INSERT INTO test_attempts (
            id, userId, userName, userCollege, testSeriesId, testInstanceId,
            testTitle, companyName, mode, totalQuestions, attemptedQuestions,
            correctCount, incorrectCount, unattemptedCount, scorePoints,
            accuracyPercentage, timeTakenSeconds, avgTimePerQuestionSeconds,
            submittedAt, topicBreakdown, strengths, weaknesses, recommendations
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          attempt.id,
          attempt.userId,
          attempt.userName,
          attempt.userCollege || '',
          attempt.testSeriesId,
          attempt.testInstanceId || '',
          attempt.testTitle,
          attempt.companyName || '',
          attempt.mode,
          attempt.totalQuestions,
          attempt.attemptedQuestions,
          attempt.correctCount,
          attempt.incorrectCount,
          attempt.unattemptedCount,
          attempt.scorePoints,
          attempt.accuracyPercentage,
          attempt.timeTakenSeconds,
          attempt.avgTimePerQuestionSeconds,
          attempt.submittedAt,
          JSON.stringify(attempt.topicBreakdown),
          JSON.stringify(attempt.strengths),
          JSON.stringify(attempt.weaknesses),
          JSON.stringify(attempt.recommendations)
        );

        const insertResponse = this.sqliteDb.prepare(`
          INSERT INTO attempt_responses (
            attemptId, questionId, selectedOption, timeSpentSeconds,
            isCorrect, correctOption, question
          ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        attempt.responses.forEach((resp) => {
          insertResponse.run(
            attempt.id,
            resp.questionId,
            resp.selectedOption,
            resp.timeSpentSeconds,
            resp.isCorrect ? 1 : 0,
            resp.correctOption,
            JSON.stringify(resp.question)
          );
        });

        if (test) {
          this.sqliteDb.prepare(`
            UPDATE tests SET attemptsCount = COALESCE(attemptsCount, 0) + 1 WHERE id = ?
          `).run(test.id);
        }
      })();

      this.recalculateUserStats(user.id);
      this.upsertTestHistoryComplete(user.id, data.testSeriesId, attempt.scorePoints);
    }

    return attempt;
  }

  public getAttemptsForUser(userId: string): TestAttempt[] {
    const rows = this.sqliteDb.prepare('SELECT * FROM test_attempts WHERE userId = ? ORDER BY submittedAt DESC').all(userId) as any[];
    return rows.map((att) => {
      const responsesRows = this.sqliteDb.prepare('SELECT * FROM attempt_responses WHERE attemptId = ?').all(att.id) as any[];
      return {
        ...att,
        responses: responsesRows.map((r) => ({
          ...r,
          isCorrect: !!r.isCorrect,
          question: JSON.parse(r.question),
        })),
        topicBreakdown: JSON.parse(att.topicBreakdown),
        strengths: JSON.parse(att.strengths),
        weaknesses: JSON.parse(att.weaknesses),
        recommendations: JSON.parse(att.recommendations),
      };
    });
  }

  public getAttemptById(attemptId: string): TestAttempt | undefined {
    const att = this.sqliteDb.prepare('SELECT * FROM test_attempts WHERE id = ?').get(attemptId) as any;
    if (!att) return undefined;

    const responsesRows = this.sqliteDb.prepare('SELECT * FROM attempt_responses WHERE attemptId = ?').all(attemptId) as any[];
    return {
      ...att,
      responses: responsesRows.map((r) => ({
        ...r,
        isCorrect: !!r.isCorrect,
        question: JSON.parse(r.question),
      })),
      topicBreakdown: JSON.parse(att.topicBreakdown),
      strengths: JSON.parse(att.strengths),
      weaknesses: JSON.parse(att.weaknesses),
      recommendations: JSON.parse(att.recommendations),
    };
  }

  // --- Bookmarks ---
  public toggleBookmark(userId: string, questionId: string): { bookmarked: boolean } {
    const existing = this.sqliteDb.prepare('SELECT id FROM bookmarks WHERE userId = ? AND questionId = ?').get(userId, questionId) as any;
    if (existing) {
      this.sqliteDb.prepare('DELETE FROM bookmarks WHERE userId = ? AND questionId = ?').run(userId, questionId);
      return { bookmarked: false };
    } else {
      const qRow = this.sqliteDb.prepare('SELECT * FROM questions WHERE id = ?').get(questionId) as any;
      let question: Question;
      if (qRow) {
        question = {
          ...qRow,
          options: JSON.parse(qRow.options || '[]'),
          stimulus: qRow.stimulus ? JSON.parse(qRow.stimulus) : undefined,
        };
      } else {
        const fullBank = [
          ...quantQuestions,
          ...logicalQuestions,
          ...verbalQuestions,
          ...diQuestions,
          ...pseudocodeQuestions,
          ...accentureQuestions,
          ...cognizantQuestions,
          ...infosysQuestions,
          ...tcsAdvancedQuestions,
          ...tcsCodingProblems,
          ...wiproQuestions,
        ];
        const found = fullBank.find((q) => q.id === questionId);
        if (!found) throw new Error('Question not found');
        question = {
          id: found.id,
          testSeriesId: found.testSeriesId || 'unknown',
          questionText: found.questionText,
          options: found.options,
          correctOption: (found as any).correctAnswer || found.correctOption,
          topic: found.topic,
          difficulty: found.difficulty,
          explanation: found.explanation,
        };
      }
      this.sqliteDb.prepare(`
        INSERT INTO bookmarks (id, userId, questionId, question, addedAt)
        VALUES (?, ?, ?, ?, ?)
      `).run(
        `bm_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        userId,
        questionId,
        JSON.stringify(question),
        new Date().toISOString()
      );
      return { bookmarked: true };
    }
  }

  public getBookmarksForUser(userId: string): BookmarkedItem[] {
    const rows = this.sqliteDb.prepare('SELECT * FROM bookmarks WHERE userId = ? ORDER BY addedAt DESC').all(userId) as any[];
    return rows.map((b) => ({
      ...b,
      question: JSON.parse(b.question),
    }));
  }

  // --- Revision Vault (Weak Questions) ---
  public getWeakQuestionsForUser(userId: string): WeakQuestionItem[] {
    const userAttempts = this.sqliteDb.prepare('SELECT id, submittedAt FROM test_attempts WHERE userId = ?').all(userId) as any[];
    const failedMap = new Map<string, { question: Question; count: number; lastDate: string; lastAns: string }>();

    userAttempts.forEach((att) => {
      const responses = this.sqliteDb.prepare('SELECT * FROM attempt_responses WHERE attemptId = ?').all(att.id) as any[];
      responses.forEach((resp) => {
        if (!resp.isCorrect && resp.selectedOption) {
          const prev = failedMap.get(resp.questionId);
          if (prev) {
            prev.count += 1;
          } else {
            failedMap.set(resp.questionId, {
              question: JSON.parse(resp.question),
              count: 1,
              lastDate: att.submittedAt,
              lastAns: resp.selectedOption,
            });
          }
        }
      });
    });

    return Array.from(failedMap.values()).map((item) => ({
      question: item.question,
      timesFailed: item.count,
      lastAttemptedAt: item.lastDate,
      lastUserAnswer: item.lastAns,
    }));
  }

  // --- Mega Events ---
  public getMegaEvents(): MegaEvent[] {
    const rows = this.sqliteDb.prepare('SELECT * FROM mega_events').all() as any[];
    return rows.map((m) => ({
      ...m,
      status: m.status as any,
    }));
  }

  public getMegaEventById(id: string): MegaEvent | undefined {
    const m = this.sqliteDb.prepare('SELECT * FROM mega_events WHERE id = ?').get(id) as any;
    if (!m) return undefined;
    return {
      ...m,
      status: m.status as any,
    };
  }

  // --- Leaderboard ---
  public getLeaderboard(filter?: { category?: string; company?: string }): LeaderboardEntry[] {
    const allUsers = this.getAllUsers();
    const sorted = allUsers.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      if (b.averageAccuracy !== a.averageAccuracy) return b.averageAccuracy - a.averageAccuracy;
      return a.averageTimePerQuestionSeconds - b.averageTimePerQuestionSeconds;
    });

    return sorted.map((u, index) => {
      let badge = undefined;
      if (index === 0) badge = '👑 All-India Rank 1';
      else if (index === 1) badge = '🥈 Rank 2 Master';
      else if (index === 2) badge = '🥉 Rank 3 Champ';
      else if (index < 10) badge = '⭐ Top 10 Elite';

      return {
        rank: index + 1,
        userId: u.id,
        userName: u.name,
        userCollege: u.college || 'Engineering Institute',
        targetCompany: u.targetCompany,
        totalPoints: u.totalPoints,
        averageAccuracy: u.averageAccuracy,
        totalTestsAttempted: u.totalTestsAttempted,
        avgSpeedSeconds: u.averageTimePerQuestionSeconds || 45,
        badge,
      };
    });
  }

  // --- Admin Operations ---
  public getAdminStats(): AdminStats {
    const totalStudents = (this.sqliteDb.prepare('SELECT COUNT(*) as count FROM users').get() as any).count;
    const totalTestSeries = (this.sqliteDb.prepare('SELECT COUNT(*) as count FROM tests').get() as any).count;
    const totalQuestions = (this.sqliteDb.prepare('SELECT COUNT(*) as count FROM questions').get() as any).count;
    const totalAttempts = (this.sqliteDb.prepare('SELECT COUNT(*) as count FROM test_attempts').get() as any).count;

    const attemptsRows = this.sqliteDb.prepare('SELECT accuracyPercentage FROM test_attempts').all() as any[];
    const allAccuracy = attemptsRows.reduce((sum, a) => sum + a.accuracyPercentage, 0);
    const avgPlatformAccuracy = totalAttempts > 0 ? Math.round(allAccuracy / totalAttempts) : 0;

    const collegeScores: Record<string, { totalPoints: number; count: number }> = {};
    const usersRows = this.sqliteDb.prepare('SELECT college, totalPoints FROM users').all() as any[];
    usersRows.forEach((u) => {
      if (u.college && u.totalPoints > 0) {
        if (!collegeScores[u.college]) collegeScores[u.college] = { totalPoints: 0, count: 0 };
        collegeScores[u.college].totalPoints += u.totalPoints;
        collegeScores[u.college].count += 1;
      }
    });

    let topCollege = 'No tests taken yet';
    let maxAvg = 0;
    Object.entries(collegeScores).forEach(([col, stat]) => {
      const avg = stat.totalPoints / (stat.count || 1);
      if (avg > maxAvg) {
        maxAvg = avg;
        topCollege = col;
      }
    });

    const recentAttemptsRaw = this.sqliteDb.prepare('SELECT * FROM test_attempts ORDER BY submittedAt DESC LIMIT 10').all() as any[];
    const recentAttempts = recentAttemptsRaw.map((att) => {
      const responsesRows = this.sqliteDb.prepare('SELECT * FROM attempt_responses WHERE attemptId = ?').all(att.id) as any[];
      return {
        ...att,
        responses: responsesRows.map((r) => ({
          ...r,
          isCorrect: !!r.isCorrect,
          question: JSON.parse(r.question),
        })),
        topicBreakdown: JSON.parse(att.topicBreakdown),
        strengths: JSON.parse(att.strengths),
        weaknesses: JSON.parse(att.weaknesses),
        recommendations: JSON.parse(att.recommendations),
      };
    }).reverse();

    return {
      totalStudents,
      totalTestSeries,
      totalQuestions,
      totalAttempts,
      avgPlatformAccuracy,
      topPerformingCollege: topCollege,
      recentAttempts,
    };
  }

  // --- Notification Operations ---
  public getNotificationsForUser(userId?: string): {
    notifications: AppNotification[];
    unreadCount: number;
    readIds: string[];
  } {
    const user = userId ? this.getUserById(userId) : undefined;
    const readIds = user?.readNotificationIds || [];
    const readSet = new Set(readIds);

    const rows = this.sqliteDb.prepare('SELECT * FROM notifications').all() as any[];
    const notifications = rows.map((n) => ({
      ...n,
      actionTab: n.actionTab as any,
    }));

    const relevant = notifications.filter((n) => {
      if (n.targetUserId && n.targetUserId !== userId) return false;
      if (n.targetCompany && user?.targetCompany) {
        const userTarget = user.targetCompany.toLowerCase();
        const notifTarget = n.targetCompany.toLowerCase();
        if (!userTarget.includes(notifTarget) && !notifTarget.includes(userTarget)) {
          return false;
        }
      }
      return true;
    });

    const sorted = relevant.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const unreadCount = sorted.filter((n) => !readSet.has(n.id)).length;

    return {
      notifications: sorted,
      unreadCount,
      readIds,
    };
  }

  public markNotificationRead(userId: string, notificationId: string): { success: boolean; unreadCount: number } {
    const user = this.getUserById(userId);
    if (!user) return { success: false, unreadCount: 0 };
    if (!user.readNotificationIds) user.readNotificationIds = [];
    if (!user.readNotificationIds.includes(notificationId)) {
      user.readNotificationIds.push(notificationId);
      this.sqliteDb.prepare('UPDATE users SET readNotificationIds = ? WHERE id = ?').run(
        JSON.stringify(user.readNotificationIds),
        userId
      );
    }
    const result = this.getNotificationsForUser(userId);
    return { success: true, unreadCount: result.unreadCount };
  }

  public markAllNotificationsRead(userId: string): { success: boolean; unreadCount: number } {
    const user = this.getUserById(userId);
    if (!user) return { success: false, unreadCount: 0 };
    const { notifications } = this.getNotificationsForUser(userId);
    user.readNotificationIds = Array.from(new Set([...(user.readNotificationIds || []), ...notifications.map((n) => n.id)]));
    this.sqliteDb.prepare('UPDATE users SET readNotificationIds = ? WHERE id = ?').run(
      JSON.stringify(user.readNotificationIds),
      userId
    );
    return { success: true, unreadCount: 0 };
  }

  public createNotification(notif: Omit<AppNotification, 'id' | 'createdAt'>): AppNotification {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date().toISOString(),
    };
    this.sqliteDb.prepare(`
      INSERT INTO notifications (
        id, type, title, message, createdAt, actionType, actionTargetId,
        actionTestId, actionTab, actionLabel, actionUrl, targetCompany, targetUserId, audience
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      newNotif.id,
      newNotif.type,
      newNotif.title,
      newNotif.message,
      newNotif.createdAt,
      newNotif.actionType || '',
      newNotif.actionTargetId || '',
      newNotif.actionTestId || '',
      newNotif.actionTab || '',
      newNotif.actionLabel || '',
      newNotif.actionUrl || '',
      newNotif.targetCompany || '',
      newNotif.targetUserId || '',
      newNotif.audience || ''
    );
    return newNotif;
  }

  public createTestSeries(test: Omit<TestSeries, 'id' | 'attemptsCount'>): TestSeries {
    const id = `test_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const newTest: TestSeries = {
      ...test,
      id,
      attemptsCount: 0,
      avgScore: 0,
    };
    this.sqliteDb.prepare(`
      INSERT INTO tests (
        id, title, description, category, company, companyId, companyName,
        roles, supportedRoles, skills, topics, difficulty, durationMinutes, duration,
        totalQuestions, questionCount, passingPercentage, testType, mode,
        patternVersion, verificationStatus, isMegaEvent, megaEventId, tags,
        attemptsCount, avgScore, status, scoringModel
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      newTest.id,
      newTest.title,
      newTest.description,
      newTest.category,
      newTest.company || '',
      newTest.companyId || '',
      newTest.companyName || '',
      JSON.stringify(newTest.roles || []),
      JSON.stringify(newTest.supportedRoles || []),
      JSON.stringify(newTest.skills || []),
      JSON.stringify(newTest.topics || []),
      newTest.difficulty,
      newTest.durationMinutes,
      newTest.duration || newTest.durationMinutes,
      newTest.totalQuestions,
      newTest.questionCount || newTest.totalQuestions,
      newTest.passingPercentage || 0,
      newTest.testType || '',
      newTest.mode || '',
      newTest.patternVersion || '',
      newTest.verificationStatus || '',
      newTest.isMegaEvent ? 1 : 0,
      newTest.megaEventId || '',
      JSON.stringify(newTest.tags || []),
      0,
      0,
      newTest.status || 'ready',
      newTest.scoringModel || ''
    );

    this.createNotification({
      type: 'NEW_TEST',
      title: `New ${newTest.companyName || newTest.category} Assessment`,
      message: `"${newTest.title}" is now available for placement practice (${newTest.difficulty} • ${newTest.durationMinutes} mins).`,
      actionType: 'OPEN_TEST',
      actionTargetId: newTest.id,
      actionTestId: newTest.id,
      actionTab: 'tests',
      actionLabel: 'View Test',
      targetCompany: newTest.companyName || undefined,
    });

    return newTest;
  }

  public addQuestionToTest(question: Omit<Question, 'id'>): Question {
    const id = `q_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const newQ: Question = {
      ...question,
      id,
    };
    this.sqliteDb.prepare(`
      INSERT INTO questions (
        id, testSeriesId, questionText, codeSnippet, options, correctOption,
        topic, subTopic, difficulty, companyTag, yearTag, explanation,
        shortcutFormula, stimulusId, stimulus
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      newQ.id,
      newQ.testSeriesId,
      newQ.questionText,
      newQ.codeSnippet || '',
      JSON.stringify(newQ.options),
      newQ.correctOption,
      newQ.topic,
      newQ.subTopic || '',
      newQ.difficulty,
      newQ.companyTag || '',
      newQ.yearTag || '',
      newQ.explanation,
      newQ.shortcutFormula || '',
      newQ.stimulusId || '',
      newQ.stimulus ? JSON.stringify(newQ.stimulus) : ''
    );

    this.sqliteDb.prepare(`
      UPDATE tests SET totalQuestions = COALESCE(totalQuestions, 0) + 1 WHERE id = ?
    `).run(question.testSeriesId);

    return newQ;
  }

  public deleteTest(id: string): boolean {
    this.sqliteDb.transaction(() => {
      this.sqliteDb.prepare('DELETE FROM questions WHERE testSeriesId = ?').run(id);
      this.sqliteDb.prepare('DELETE FROM tests WHERE id = ?').run(id);
    })();
    return true;
  }

  // --- Coding Submissions & Execution Persistence ---
  public saveCodingSubmission(record: CodingSubmissionRecord): CodingSubmissionRecord {
    this.sqliteDb.prepare(`
      INSERT OR REPLACE INTO coding_submissions (
        id, userId, testSeriesId, testAttemptId, questionId,
        language, sourceCode, executionResult, isFinalSubmission, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      record.id,
      record.userId,
      record.testSeriesId || '',
      record.testAttemptId || '',
      record.questionId,
      record.language,
      record.sourceCode,
      JSON.stringify(record.executionResult),
      record.isFinalSubmission ? 1 : 0,
      record.createdAt || new Date().toISOString()
    );

    const countRow = this.sqliteDb.prepare('SELECT COUNT(*) as count FROM coding_submissions').get() as { count: number };
    if (countRow.count > 50) {
      const oldest = this.sqliteDb.prepare('SELECT id FROM coding_submissions ORDER BY createdAt ASC LIMIT ?').all(countRow.count - 50) as { id: string }[];
      const deleteStmt = this.sqliteDb.prepare('DELETE FROM coding_submissions WHERE id = ?');
      this.sqliteDb.transaction(() => {
        oldest.forEach((row) => deleteStmt.run(row.id));
      })();
    }

    return record;
  }

  public getCodingSubmissionsForUser(userId: string, questionId?: string): CodingSubmissionRecord[] {
    let query = 'SELECT * FROM coding_submissions WHERE userId = ?';
    const params: any[] = [userId];
    if (questionId) {
      query += ' AND questionId = ?';
      params.push(questionId);
    }
    query += ' ORDER BY createdAt DESC';
    const rows = this.sqliteDb.prepare(query).all(params) as any[];
    return rows.map((s) => ({
      ...s,
      isFinalSubmission: !!s.isFinalSubmission,
      executionResult: JSON.parse(s.executionResult),
    }));
  }

  public mapCanonicalToQuestion(testId: string, cq: any): Question {
    const base: any = {
      id: cq.id,
      testSeriesId: testId,
      questionText: cq.questionText,
      options: cq.options || [],
      correctOption: cq.correctAnswer || 'A',
      topic: cq.topic,
      difficulty: cq.difficulty,
      explanation: cq.explanation,
      questionType: cq.questionType,
    };
    if (cq.questionType === 'CODING') {
      base.problemStatement = cq.problemStatement;
      base.inputFormat = cq.inputFormat;
      base.outputFormat = cq.outputFormat;
      base.constraints = cq.constraints;
      base.examples = cq.examples;
      base.starterCode = cq.starterCode;
      base.supportedLanguages = cq.supportedLanguages;
      base.timeLimitMs = cq.timeLimitMs;
      base.memoryLimitMb = cq.memoryLimitMb;
      
      // Phase 31C: Construct fallback codingConfig for compatibility
      base.codingConfig = cq.codingConfig || {
        problemType: 'ALGORITHM',
        languages: cq.supportedLanguages || ['javascript', 'typescript', 'python'],
        defaultLanguage: cq.supportedLanguages?.[0] || 'javascript',
        starterCode: cq.starterCode || {},
        timeLimitMs: cq.timeLimitMs,
        memoryLimitMb: cq.memoryLimitMb,
      };
    }
    return base as Question;
  }

  public validateCodingQuestion(cq: any): { isValid: boolean; error?: string; warning?: string } {
    if (cq.questionType !== 'CODING') {
      if (cq.codingConfig) {
        return { isValid: true, warning: 'MCQ questions should not have codingConfig' };
      }
      return { isValid: true };
    }

    const config = cq.codingConfig;
    if (!config) {
      return { isValid: false, error: 'CODING question is missing codingConfig' };
    }

    if (!config.languages || !Array.isArray(config.languages) || config.languages.length === 0) {
      return { isValid: false, error: 'CODING question contains empty or missing languages list' };
    }

    if (config.defaultLanguage && !config.languages.includes(config.defaultLanguage)) {
      return { isValid: false, error: 'defaultLanguage must be one of the allowed languages' };
    }

    // Check language adapters
    for (const lang of config.languages) {
      if (!LANGUAGE_ADAPTERS[lang as any]) {
        return { isValid: false, error: `Unsupported language adapter: ${lang}` };
      }
    }

    return { isValid: true };
  }

  public getCodingProblemById(id: string): any | undefined {
    const tcs = tcsCodingProblems.find(q => q.id === id);
    if (tcs) return tcs;
    return codingMockQuestions.find(q => q.id === id);
  }

  public getLatestCodingSubmission(userId: string, questionId: string): CodingSubmissionRecord | undefined {
    const row = this.sqliteDb.prepare(`
      SELECT * FROM coding_submissions 
      WHERE userId = ? AND questionId = ? 
      ORDER BY createdAt DESC LIMIT 1
    `).get(userId, questionId) as any;
    if (!row) return undefined;
    return {
      ...row,
      isFinalSubmission: !!row.isFinalSubmission,
      executionResult: JSON.parse(row.executionResult),
    };
  }

  public close() {
    this.sqliteDb.close();
  }
}

export const db = new MemoryDatabase();

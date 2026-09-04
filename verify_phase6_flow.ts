import { db } from './server/db';
import { CATALOGUE_TESTS } from './server/data/catalogueData';
import { quantQuestions } from './src/data/questionBank/quant';
import { QuestionResponse } from './src/types';

console.log('====================================================');
console.log('FIRSTROUND — PHASE 6: PRODUCTION CANDIDATE LIFECYCLE E2E AUDIT');
console.log('====================================================\n');

// 1. CANDIDATE AUTHENTICATION
console.log('--- 1. CANDIDATE AUTHENTICATION ---');
const candidate = db.loginOrRegister('phase6_analyst@firstround.com', 'Pawan Khot', 'VJTI Mumbai', 'TCS', 'Data Analyst', 'student');
console.log('Candidate ID:', candidate.id);
console.log('Target Role:', candidate.targetRole);
console.log('Target Company:', candidate.targetCompany);

// 2. EXPLORE TESTS & BLUEPRINT METADATA
console.log('\n--- 2. EXPLORE TESTS & BLUEPRINT METADATA AUDIT ---');
const catalogue = db.getCatalogueTests();
console.log('Total Catalogue Tests:', catalogue.length);

const quantMeta = catalogue.find(t => t.id === 'cat_foundation_quant');
console.log('Quant Test Title:', quantMeta?.title);
console.log('Quant Category:', quantMeta?.category);
console.log('Duration Minutes:', quantMeta?.durationMinutes);
console.log('Total Questions:', quantMeta?.totalQuestions);
console.log('Difficulty:', quantMeta?.difficulty);
console.log('Status / Availability:', quantMeta?.status);
console.log('Verification Status:', quantMeta?.verificationStatus);
console.log('Scoring Model:', quantMeta?.scoringModel);

// Verify other tests remain coming_soon
const comingSoonTests = catalogue.filter(t => t.id !== 'cat_foundation_quant');
const anyOtherReady = comingSoonTests.filter(t => t.status === 'ready');
console.log('Other Tests count:', comingSoonTests.length);
console.log('Any other test accidentally marked ready?:', anyOtherReady.length > 0 ? anyOtherReady.map(t => t.id) : 'NONE (Safe)');

// 3. TEST INSTANCE & QUESTIONS RETRIEVAL
console.log('\n--- 3. TEST INSTANCE & QUESTION INTEGRITY ---');
const testInstance = db.getTestById('cat_foundation_quant', true);
console.log('Test Instance Loaded:', testInstance?.title);
console.log('Questions Loaded Count:', testInstance?.questions?.length);

const loadedQuestions = testInstance?.questions || [];
console.log('Are exactly 25 questions loaded?', loadedQuestions.length === 25);

// Check uniqueness of question IDs and text
const uniqueIds = new Set(loadedQuestions.map(q => q.id));
console.log('Unique Question IDs:', uniqueIds.size === 25);

const uniqueTexts = new Set(loadedQuestions.map(q => q.questionText.trim()));
console.log('Unique Question Texts:', uniqueTexts.size === 25);

// Check options integrity (4 options each, non-empty, unique)
let optionsValid = true;
loadedQuestions.forEach(q => {
  if (!(q as import('./src/types').MCQQuestion).options || (q as import('./src/types').MCQQuestion).options.length !== 4) optionsValid = false;
  const optIds = new Set((q as import('./src/types').MCQQuestion).options?.map(o => o.id));
  if (optIds.size !== 4) optionsValid = false;
});
console.log('All 25 questions have 4 valid unique options (A,B,C,D):', optionsValid);

// 4. REAL CANDIDATE ANSWER SELECTION & SUBMISSION SIMULATION
console.log('\n--- 4. CANDIDATE SUBMISSION & GRADING SIMULATION ---');
// Scenario: Candidate answers 22 questions (16 correct, 6 incorrect), leaves 3 unanswered.
// Time spent: 18 minutes (1080 seconds)
const mockResponses: QuestionResponse[] = [];

loadedQuestions.forEach((q, idx) => {
  if (idx < 16) {
    // 16 Correct
    mockResponses.push({
      questionId: q.id,
      selectedOption: (q as import('./src/types').MCQQuestion).correctOption,
      timeSpentSeconds: 45
    });
  } else if (idx < 22) {
    // 6 Incorrect (pick wrong option)
    const wrongOpt = (q as import('./src/types').MCQQuestion).options.find(o => o.id !== (q as import('./src/types').MCQQuestion).correctOption)!.id;
    mockResponses.push({
      questionId: q.id,
      selectedOption: wrongOpt,
      timeSpentSeconds: 50
    });
  } else {
    // 3 Unanswered (null)
    mockResponses.push({
      questionId: q.id,
      selectedOption: null,
      timeSpentSeconds: 10
    });
  }
});

const submissionPayload = {
  userId: candidate.id,
  testSeriesId: 'cat_foundation_quant',
  mode: 'exam' as const,
  responses: mockResponses,
  timeTakenSeconds: 1080
};

const attempt = db.submitTest(submissionPayload);

console.log('Generated Attempt ID:', attempt.id);
console.log('Total Questions:', attempt.totalQuestions);
console.log('Attempted Questions:', attempt.attemptedQuestions);
console.log('Correct Count:', attempt.correctCount);
console.log('Incorrect Count:', attempt.incorrectCount);
console.log('Unattempted Count:', attempt.unattemptedCount);
console.log('Score Points:', attempt.scorePoints, `(Formula: 16*10 - 6*2 = ${16*10 - 6*2})`);
console.log('Accuracy Percentage:', attempt.accuracyPercentage + '%', `(16/22 = ${Math.round((16/22)*100)}%)`);
console.log('Time Taken Seconds:', attempt.timeTakenSeconds, `(${attempt.timeTakenSeconds/60} mins)`);
console.log('Average Speed per Question:', attempt.avgTimePerQuestionSeconds, 'seconds');

// 5. ATTEMPT PERSISTENCE & HISTORY RETRIEVAL
console.log('\n--- 5. ATTEMPT PERSISTENCE & DATABASE RETRIEVAL ---');
const persistedAttempts = db.getAttemptsForUser(candidate.id);
console.log('Persisted Attempts for User in DB:', persistedAttempts.length);
const retrievedAttempt = db.getAttemptById(attempt.id);
console.log('Direct Attempt Fetch by ID Match:', retrievedAttempt?.id === attempt.id);
console.log('Attempt contains full question-level response details:', retrievedAttempt?.responses.length === 25);

// 6. TOPIC ACCURACY & ANALYTICS BREAKDOWN
console.log('\n--- 6. TOPIC ACCURACY & ANALYTICS BREAKDOWN ---');
console.log('Real Topic Breakdown:');
Object.entries(attempt.topicBreakdown).forEach(([topic, stat]) => {
  console.log(` - ${topic}: ${stat.correct}/${stat.total} (${stat.accuracy}%)`);
});
console.log('Strengths Identified (>=80%):', attempt.strengths);
console.log('Weaknesses Identified (<60%):', attempt.weaknesses);
console.log('Personalized Mentor Advice:', attempt.recommendations);

// 7. REVISION VAULT (WEAK QUESTIONS INTEGRATION)
console.log('\n--- 7. REVISION VAULT INTEGRATION ---');
const weakVaultQuestions = db.getWeakQuestionsForUser(candidate.id);
console.log('Total Weak Questions in Vault:', weakVaultQuestions.length);
console.log('Do all weak vault questions correspond to the 6 incorrect answers?', weakVaultQuestions.length === 6);
weakVaultQuestions.slice(0, 3).forEach((wq, idx) => {
  console.log(` Weak Q${idx+1}: [${wq.question.id}] ${wq.question.topic} | Failed: ${wq.timesFailed} time(s) | Last Answer: ${wq.lastUserAnswer} | Correct: ${wq.question.correctOption}`);
});

// 8. CANDIDATE PROFILE & HOME STATS INTEGRATION
console.log('\n--- 8. CANDIDATE PROFILE & HOME STATS AUDIT ---');
const updatedCandidate = db.getUserById(candidate.id);
console.log('Updated Total Points:', updatedCandidate?.totalPoints);
console.log('Updated Total Tests Attempted:', updatedCandidate?.totalTestsAttempted);
console.log('Updated Total Correct:', updatedCandidate?.totalCorrect);
console.log('Updated Total Incorrect:', updatedCandidate?.totalIncorrect);
console.log('Updated Average Accuracy:', updatedCandidate?.averageAccuracy + '%');
console.log('Updated Average Speed:', updatedCandidate?.averageTimePerQuestionSeconds, 's/Q');

// 9. LEADERBOARD AUDIT
console.log('\n--- 9. LEADERBOARD AUDIT ---');
const leaderboard = db.getLeaderboard();
const candidateRank = leaderboard.find(e => e.userId === candidate.id);
console.log(`Candidate Rank: #${candidateRank?.rank} out of ${leaderboard.length} candidates with ${candidateRank?.totalPoints} points (${candidateRank?.averageAccuracy}% acc)`);

console.log('\n====================================================');
console.log('ALL PHASE 6 CANDIDATE LIFECYCLE CHECKS EXECUTED');
console.log('====================================================');

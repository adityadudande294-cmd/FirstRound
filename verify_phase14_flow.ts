import { db } from './server/db';
import { QuestionResponse } from './src/types';

console.log('====================================================');
console.log('FIRSTROUND — PHASE 14: PSEUDOCODE E2E AUDIT & REGRESSION');
console.log('====================================================\n');

// 1. CANDIDATE AUTHENTICATION
console.log('--- 1. CANDIDATE AUTHENTICATION ---');
const candidate = db.loginOrRegister('phase14_candidate@firstround.com', 'Pawan Khot', 'VJTI Mumbai', 'Infosys', 'Software Developer', 'student');
console.log('Candidate ID:', candidate.id);

// 2. EXPLORE TESTS & BLUEPRINT METADATA AUDIT
console.log('\n--- 2. EXPLORE TESTS & BLUEPRINT METADATA AUDIT ---');
const catalogue = db.getCatalogueTests();
console.log('Total Catalogue Tests:', catalogue.length);

const pseudoMeta = catalogue.find(t => t.id === 'cat_foundation_pseudocode');
console.log('Pseudocode Test Title:', pseudoMeta?.title);
console.log('Pseudocode Category:', pseudoMeta?.category);
console.log('Duration Minutes:', pseudoMeta?.durationMinutes);
console.log('Total Questions:', pseudoMeta?.totalQuestions);
console.log('Difficulty:', pseudoMeta?.difficulty);
console.log('Status / Availability:', pseudoMeta?.status);
console.log('Verification Status:', pseudoMeta?.verificationStatus);
console.log('Scoring Model:', pseudoMeta?.scoringModel);

// Verify other tests status
const readyTests = catalogue.filter(t => t.status === 'ready');
console.log('Ready Tests (Should be ALL 5 Foundation Tests):', readyTests.map(t => t.id));
const comingSoonCount = catalogue.filter(t => t.status === 'coming_soon').length;
console.log('Remaining Coming Soon Tests (Should be 10):', comingSoonCount);

// 3. TEST INSTANCE & QUESTIONS RETRIEVAL
console.log('\n--- 3. TEST INSTANCE & QUESTION INTEGRITY ---');
const testInstance = db.getTestById('cat_foundation_pseudocode', true);
console.log('Test Instance Loaded:', testInstance?.title);
console.log('Questions Loaded Count:', testInstance?.questions?.length);

const loadedQuestions = testInstance?.questions || [];
console.log('Are exactly 25 questions loaded?', loadedQuestions.length === 25);

// Check uniqueness of question IDs and text
const uniqueIds = new Set(loadedQuestions.map(q => q.id));
console.log('Unique Question IDs (25):', uniqueIds.size === 25);

const uniqueTexts = new Set(loadedQuestions.map(q => q.questionText.trim()));
console.log('Unique Question Texts (25):', uniqueTexts.size === 25);

// Check options integrity (4 options each, non-empty, unique)
let optionsValid = true;
loadedQuestions.forEach(q => {
  if (!(q as import('./src/types').MCQQuestion).options || (q as import('./src/types').MCQQuestion).options.length !== 4) optionsValid = false;
  const optIds = new Set((q as import('./src/types').MCQQuestion).options?.map(o => o.id));
  if (optIds.size !== 4) optionsValid = false;
});
console.log('All 25 questions have 4 valid unique options (A,B,C,D):', optionsValid);

// 4. CANDIDATE ANSWER SELECTION & SUBMISSION SIMULATION
console.log('\n--- 4. CANDIDATE SUBMISSION & GRADING SIMULATION ---');
// Scenario: Candidate answers 25 questions (21 correct, 4 incorrect).
// Time spent: 19 minutes (1140 seconds)
const mockResponses: QuestionResponse[] = [];

loadedQuestions.forEach((q, idx) => {
  if (idx < 21) {
    // 21 Correct
    mockResponses.push({
      questionId: q.id,
      selectedOption: (q as import('./src/types').MCQQuestion).correctOption,
      timeSpentSeconds: 45
    });
  } else {
    // 4 Incorrect (pick wrong option)
    const wrongOpt = (q as import('./src/types').MCQQuestion).options.find(o => o.id !== (q as import('./src/types').MCQQuestion).correctOption)!.id;
    mockResponses.push({
      questionId: q.id,
      selectedOption: wrongOpt,
      timeSpentSeconds: 55
    });
  }
});

const submissionPayload = {
  userId: candidate.id,
  testSeriesId: 'cat_foundation_pseudocode',
  testInstanceId: `instance_pseudo_${Date.now()}`,
  mode: 'exam' as const,
  responses: mockResponses,
  timeTakenSeconds: 1140
};

const attempt = db.submitTest(submissionPayload);

console.log('Generated Attempt ID:', attempt.id);
console.log('Total Questions:', attempt.totalQuestions);
console.log('Attempted Questions:', attempt.attemptedQuestions);
console.log('Correct Count:', attempt.correctCount);
console.log('Incorrect Count:', attempt.incorrectCount);
console.log('Unattempted Count:', attempt.unattemptedCount);
console.log('Score Points:', attempt.scorePoints, `(Formula: 21*10 - 4*2 = ${21*10 - 4*2})`);
console.log('Accuracy Percentage:', attempt.accuracyPercentage + '%', `(21/25 = ${Math.round((21/25)*100)}%)`);
console.log('Time Taken Seconds:', attempt.timeTakenSeconds, `(${attempt.timeTakenSeconds/60} mins)`);
console.log('Average Speed per Question:', attempt.avgTimePerQuestionSeconds, 'seconds');

// 5. ATTEMPT PERSISTENCE & DATABASE RETRIEVAL
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
console.log('Do all weak vault questions correspond to the 4 incorrect answers?', weakVaultQuestions.length === 4);

// 8. ALL 5 FOUNDATION ASSESSMENTS REGRESSION CHECK
console.log('\n--- 8. COMPLETE 5-TEST FOUNDATION REGRESSION CHECK ---');
const tests = [
  'cat_foundation_quant',
  'cat_foundation_logical',
  'cat_foundation_verbal',
  'cat_foundation_di',
  'cat_foundation_pseudocode'
];

let allPassed = true;
tests.forEach(tid => {
  const t = db.getTestById(tid, true);
  const ok = t?.questions?.length === 25 && t?.status === 'ready' && t?.verificationStatus === 'VERIFIED';
  console.log(`[${tid}] Title: ${t?.title} | Qs: ${t?.questions?.length} | Status: ${t?.status} | Verified: ${t?.verificationStatus} | Result: ${ok ? 'PASS' : 'FAIL'}`);
  if (!ok) allPassed = false;
});
console.log('\nALL 5 FOUNDATION ASSESSMENTS REGRESSION:', allPassed ? '100% PASSED' : 'FAILED');

console.log('\n====================================================');
console.log('ALL PHASE 14 VALIDATION CHECKS EXECUTED');
console.log('====================================================');

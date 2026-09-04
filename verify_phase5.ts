import { quantQuestions } from './src/data/questionBank/quant';
import { ValidationEngine } from './src/services/ValidationEngine';
import { DuplicateDetection } from './src/services/DuplicateDetection';
import { db } from './server/db';

console.log('=== STEP 1: AUDIT & VALIDATION OF QUESTIONS ===');

const validator = new ValidationEngine();
const dupDetector = new DuplicateDetection();

let schemaPassed = 0;
let schemaFailed = 0;
const diffCounts: Record<string, number> = { Easy: 0, Medium: 0, Hard: 0 };
const topicCounts: Record<string, number> = {};

quantQuestions.forEach((q, idx) => {
  const res = validator.validateQuestion(q);
  if (res.isValid) {
    schemaPassed++;
  } else {
    schemaFailed++;
    console.error(`Question ${q.id} FAILED schema:`, res.errors);
  }

  diffCounts[q.difficulty] = (diffCounts[q.difficulty] || 0) + 1;
  topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
});

console.log(`Schema validation: Passed ${schemaPassed} / ${quantQuestions.length}`);
console.log('Difficulty Distribution:', diffCounts);
console.log('Topic Distribution:', topicCounts);

// Duplicate check
let duplicateCount = 0;
for (let i = 0; i < quantQuestions.length; i++) {
  for (let j = i + 1; j < quantQuestions.length; j++) {
    if (dupDetector.generateSemanticHash(quantQuestions[i].questionText) === dupDetector.generateSemanticHash(quantQuestions[j].questionText)) {
      console.error(`Duplicate detected between ${quantQuestions[i].id} and ${quantQuestions[j].id}`);
      duplicateCount++;
    }
  }
}
console.log(`Duplicate count: ${duplicateCount}`);

// Test Engine & DB Integration Check
console.log('\n=== STEP 2: TEST ENGINE & DB INTEGRATION CHECK ===');
const test = db.getTestById('cat_foundation_quant', true);
console.log('DB Test Loaded:', test?.title, 'Total Qs:', test?.totalQuestions, 'Status:', test?.status);

if (test && test.questions && test.questions.length === 25) {
  console.log('Test questions loaded correctly:', test.questions.length);
} else {
  console.error('Mismatch in questions loaded from DB:', test?.questions?.length);
}

// User registration & Attempt Simulation
console.log('\n=== STEP 3: SUBMISSION & ATTEMPT SIMULATION ===');
const registeredUser = db.loginOrRegister('candidate_phase5@firstround.com', 'Phase 5 Candidate');
console.log('Registered User ID:', registeredUser.id);

const mockResponses = test!.questions!.map((q, idx) => ({
  questionId: q.id,
  selectedOption: idx % 2 === 0 ? (q as import('./src/types').MCQQuestion).correctOption : 'D', // alternate correct and D
  timeSpentSeconds: 45
}));

const attempt = db.submitTest({
  userId: registeredUser.id,
  testSeriesId: 'cat_foundation_quant',
  mode: 'exam',
  responses: mockResponses,
  timeTakenSeconds: 1125
});

console.log('Attempt ID:', attempt.id);
console.log('Total Questions:', attempt.totalQuestions);
console.log('Attempted:', attempt.attemptedQuestions);
console.log('Correct:', attempt.correctCount);
console.log('Incorrect:', attempt.incorrectCount);
console.log('Score:', attempt.scorePoints);
console.log('Accuracy:', attempt.accuracyPercentage + '%');
console.log('Topic Breakdown:', attempt.topicBreakdown);

// Check attempt retrieval
const userAttempts = db.getAttemptsForUser(registeredUser.id);
console.log('User Attempts Count:', userAttempts.length);
const weakQs = db.getWeakQuestionsForUser(registeredUser.id);
console.log('Weak Questions Recorded for Vault:', weakQs.length);
console.log('User Stats After Attempt: Total Points =', db.getUserById(registeredUser.id)?.totalPoints, 'Accuracy =', db.getUserById(registeredUser.id)?.averageAccuracy + '%');

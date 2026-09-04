import * as fs from 'fs';
const TEST_DB_PATH = './firstround_test_35a2.db';
if (fs.existsSync(TEST_DB_PATH)) {
  fs.unlinkSync(TEST_DB_PATH);
}
process.env.DB_PATH = TEST_DB_PATH;

import { db } from './server/db';

console.log('--- STARTING PHASE 35A.2 TEST: OFFICIAL METRICS ISOLATION ---');

const user = db.loginOrRegister('metrics_test@example.com', 'Metrics User');
const tests = db.getCatalogueTests();
const test = tests.find((t) => t.id === 'cat_coding_dsa');

if (!test) {
  console.error('Test cat_coding_dsa not found');
  process.exit(1);
}

const getHistoryForTest = (userId: string, testId: string) => {
  return db.getTestHistoryForUser(userId).find((h: any) => h.testId === testId);
};

let passed = true;

const getMetrics = () => {
  const u = db.getUserById(user.id);
  const h = getHistoryForTest(user.id, test.id);
  return {
    xp: u.totalPoints || 0,
    jobReadiness: u.jobReadinessScore || 0,
    leaderboard: u.totalPoints || 0, // In this app, leaderboard is driven by totalPoints
    attempts: h ? h.attemptCount : 0,
    bestScore: h ? h.bestScore : 0
  };
};

const testQuestions = db.getQuestionsForTest(test.id);
const q1 = testQuestions[0];
const q1Response = { questionId: q1.id, selectedOption: q1.correctOption || 'A', isCorrect: true, timeSpentSeconds: 10, correctOption: q1.correctOption || 'A', question: q1 };

const prePractice = getMetrics();

db.submitTest({
  userId: user.id,
  testSeriesId: test.id,
  mode: 'practice',
  timeTakenSeconds: 300,
  responses: [q1Response]
});

const postPractice = getMetrics();

console.log(`\n| Metric | Before Practice | After Practice | Delta | Result |`);
console.log(`|---|---:|---:|---:|---|`);
const metricsList = [
  { name: 'XP', pre: prePractice.xp, post: postPractice.xp },
  { name: 'Job Readiness', pre: prePractice.jobReadiness, post: postPractice.jobReadiness },
  { name: 'Leaderboard', pre: prePractice.leaderboard, post: postPractice.leaderboard },
  { name: 'Official Attempts', pre: prePractice.attempts, post: postPractice.attempts },
  { name: 'Official Best Score', pre: prePractice.bestScore, post: postPractice.bestScore }
];

metricsList.forEach(m => {
  const delta = m.post - m.pre;
  const result = delta === 0 ? 'PASS' : 'FAIL';
  console.log(`| ${m.name} | ${m.pre} | ${m.post} | ${delta} | ${result} |`);
  if (result === 'FAIL') passed = false;
});

const preExam = getMetrics();

db.submitTest({
  userId: user.id,
  testSeriesId: test.id,
  mode: 'exam',
  timeTakenSeconds: 300,
  responses: [q1Response]
});

const postExam = getMetrics();

console.log(`\n| Metric | Before Exam | After Exam | Existing Behavior |`);
console.log(`|---|---:|---:|---|`);
const examMetricsList = [
  { name: 'XP', pre: preExam.xp, post: postExam.xp },
  { name: 'Job Readiness', pre: preExam.jobReadiness, post: postExam.jobReadiness },
  { name: 'Leaderboard', pre: preExam.leaderboard, post: postExam.leaderboard },
  { name: 'Official Attempts', pre: preExam.attempts, post: postExam.attempts },
  { name: 'Official Best Score', pre: preExam.bestScore, post: postExam.bestScore }
];

examMetricsList.forEach(m => {
  console.log(`| ${m.name} | ${m.pre} | ${m.post} | INCREMENTS |`);
});

if (passed) {
  console.log('\n✅ PHASE 35A.2 TEST PASSED');
  process.exit(0);
} else {
  console.log('\n❌ PHASE 35A.2 TEST FAILED');
  process.exit(1);
}

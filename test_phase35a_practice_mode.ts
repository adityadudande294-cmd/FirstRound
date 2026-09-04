import { db } from './server/db';
import * as fs from 'fs';

console.log('--- STARTING PHASE 35A TEST: PRACTICE MODE ISOLATION ---');

// 1. Initialize a clean temporary test database
const TEST_DB_PATH = './firstround_test_35a.db';
if (fs.existsSync(TEST_DB_PATH)) {
  fs.unlinkSync(TEST_DB_PATH);
}
process.env.DB_PATH = TEST_DB_PATH;

// The db instance is already initialized and uses DB_PATH

// Get the user and test
const user = db.loginOrRegister('test35a@example.com', 'Test User');
const tests = db.getCatalogueTests();
const test = tests.find((t) => t.id === 'cat_coding_dsa');

if (!test) {
  console.error('Test cat_coding_dsa not found');
  process.exit(1);
}

const initialPoints = user.totalPoints || 0;
const initialTestAttempts = user.totalTestsAttempted || 0;

console.log(`Initial Setup: User Points = ${initialPoints}, Attempts = ${initialTestAttempts}`);

// Run Practice Mode Submission
console.log('\n--- Running PRACTICE mode submission ---');
const practiceAttempt = db.submitTest({
  userId: user.id,
  testSeriesId: test.id,
  mode: 'practice' as any,
  responses: [],
  timeTakenSeconds: 300,
});

const userAfterPractice = db.getUserById(user.id);
const attemptsAfterPractice = db.getAttemptsForUser(user.id).length;

let passed = true;

if (userAfterPractice.totalPoints !== initialPoints) {
  console.error('FAIL: Practice mode incorrectly increased Points');
  passed = false;
} else {
  console.log('PASS: Practice mode Points isolated');
}

if (userAfterPractice.totalTestsAttempted !== initialTestAttempts) {
  console.error('FAIL: Practice mode incorrectly incremented Official Attempts');
  passed = false;
} else {
  console.log('PASS: Practice mode Official Attempts isolated');
}

// Run Exam Mode Submission
console.log('\n--- Running EXAM mode submission ---');
const examAttempt = db.submitTest({
  userId: user.id,
  testSeriesId: test.id,
  mode: 'exam',
  responses: [],
  timeTakenSeconds: 300,
});

const userAfterExam = db.getUserById(user.id);
const attemptsAfterExam = db.getAttemptsForUser(user.id).length;

if (userAfterExam.totalTestsAttempted <= initialTestAttempts) {
  console.error('FAIL: Exam mode failed to increment Official Attempts');
  passed = false;
} else {
  console.log('PASS: Exam mode Official Attempts incremented properly');
}

console.log('\n--- CLEANUP ---');
if (fs.existsSync(TEST_DB_PATH)) {
  try { fs.unlinkSync(TEST_DB_PATH); } catch (e) {}
}
if (fs.existsSync(`${TEST_DB_PATH}-wal`)) {
  try { fs.unlinkSync(`${TEST_DB_PATH}-wal`); } catch (e) {}
}
if (fs.existsSync(`${TEST_DB_PATH}-shm`)) {
  try { fs.unlinkSync(`${TEST_DB_PATH}-shm`); } catch (e) {}
}

if (passed) {
  console.log('\n✅ PHASE 35A TEST PASSED');
  process.exit(0);
} else {
  console.error('\n❌ PHASE 35A TEST FAILED');
  process.exit(1);
}

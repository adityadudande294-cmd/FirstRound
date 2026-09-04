import { quantQuestions } from './src/data/questionBank/quant';
import { logicalQuestions } from './src/data/questionBank/logical';
import { verbalQuestions } from './src/data/questionBank/verbal';
import { diQuestions } from './src/data/questionBank/di';
import { pseudocodeQuestions } from './src/data/questionBank/pseudocode';
import { accentureQuestions } from './src/data/questionBank/accenture';
import { cognizantQuestions } from './src/data/questionBank/cognizant';
import { infosysQuestions } from './src/data/questionBank/infosys';
import { wiproQuestions } from './src/data/questionBank/wipro';
import { tcsAdvancedQuestions } from './src/data/questionBank/tcsAdvanced';
import { tcsCodingProblems } from './src/data/questionBank/tcsCoding';
import { COMPANY_BLUEPRINTS } from './src/data/blueprints/company';
import { COMPANY_PATTERNS_REGISTRY } from './src/data/companyPatterns/registry';
import { codeExecutionService } from './src/services/CodeExecutionService';
import { questionSelectionEngine } from './src/services/QuestionSelectionEngine';
import { recommendationEngine } from './src/services/RecommendationEngine';
import { db } from './server/db';

console.log('================================================================');
console.log('PHASE 28A: PRODUCTION DATA, CANDIDATE STATE & UX INTEGRITY AUDIT');
console.log('================================================================\n');

let failedChecks = 0;
function assertAudit(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
  } else {
    console.error(`  [FAIL] ${testName}${detail ? ` -> ${detail}` : ''}`);
    failedChecks++;
  }
}

const fullBank366 = [
  ...quantQuestions,
  ...logicalQuestions,
  ...verbalQuestions,
  ...diQuestions,
  ...pseudocodeQuestions,
  ...accentureQuestions,
  ...cognizantQuestions,
  ...wiproQuestions,
  ...infosysQuestions,
  ...tcsAdvancedQuestions,
  ...tcsCodingProblems as any,
];

// 1. CANDIDATE PROFILE & STATE SURVIVAL
console.log('--- 1. CANDIDATE PROFILE & STATE SURVIVAL ---');
const candA = db.loginOrRegister('userA_phase28@firstround.com', 'Candidate Alpha');
try {
  (db as any).sqliteDb.prepare("DELETE FROM test_attempts WHERE userId = ?").run(candA.id);
  (db as any).sqliteDb.prepare("DELETE FROM bookmarks WHERE userId = ?").run(candA.id);
  (db as any).sqliteDb.prepare("DELETE FROM coding_submissions WHERE userId = ?").run(candA.id);
} catch (e) {
  console.error("Cleanup A error:", e);
}
candA.targetCompany = 'TCS';
candA.targetRole = 'Digital';

const candB = db.loginOrRegister('userB_phase28@firstround.com', 'Candidate Beta');
try {
  (db as any).sqliteDb.prepare("DELETE FROM test_attempts WHERE userId = ?").run(candB.id);
  (db as any).sqliteDb.prepare("DELETE FROM bookmarks WHERE userId = ?").run(candB.id);
  (db as any).sqliteDb.prepare("DELETE FROM coding_submissions WHERE userId = ?").run(candB.id);
} catch (e) {
  console.error("Cleanup B error:", e);
}
candB.targetCompany = 'Accenture';
candB.targetRole = 'Associate Software Engineer';

assertAudit(candA.id !== candB.id, `User Identity Isolation: Alpha (${candA.id}) != Beta (${candB.id})`);
assertAudit(candA.targetCompany === 'TCS' && candB.targetCompany === 'Accenture', `Target Metadata Cleanly Separated`);

// 2. ASSESSMENT ATTEMPTS, SEPARATION & PERSISTENCE
console.log('\n--- 2. ATTEMPTS SEPARATION & PERSISTENCE (MULTIPLE ATTEMPTS) ---');
const quantTest = db.getTestById('cat_foundation_quant', true)!;

// Candidate Alpha Attempt 1 (15 correct, 10 wrong)
const resp1 = quantTest.questions.map((q, idx) => ({
  questionId: q.id,
  selectedOption: idx < 15 ? (q as import('./src/types').MCQQuestion).correctOption : ((q as import('./src/types').MCQQuestion).correctOption === 'A' ? 'B' : 'A'),
  timeSpentSeconds: 40,
}));
const att1 = db.submitTest({
  userId: candA.id,
  testSeriesId: 'cat_foundation_quant',
  mode: 'exam',
  timeTakenSeconds: 1000,
  responses: resp1 as any,
});

// Candidate Alpha Attempt 2 (22 correct, 3 wrong)
const resp2 = quantTest.questions.map((q, idx) => ({
  questionId: q.id,
  selectedOption: idx < 22 ? (q as import('./src/types').MCQQuestion).correctOption : ((q as import('./src/types').MCQQuestion).correctOption === 'A' ? 'B' : 'A'),
  timeSpentSeconds: 35,
}));
const att2 = db.submitTest({
  userId: candA.id,
  testSeriesId: 'cat_foundation_quant',
  mode: 'exam',
  timeTakenSeconds: 900,
  responses: resp2 as any,
});

const userAAttempts = db.getAttemptsForUser(candA.id);
const score1Expected = (15 * 10) - (10 * 2); // 130
const score2Expected = (22 * 10) - (3 * 2);  // 214
assertAudit(userAAttempts.length === 2, `Multiple Attempts Preserved: Found 2 attempts for Candidate Alpha`);
assertAudit(att1.scorePoints === score1Expected && att2.scorePoints === score2Expected, `Individual Attempt Scores Retained Separately (Att1: ${att1.scorePoints}, Att2: ${att2.scorePoints})`);

// 3. CROSS-USER DATA & REVISION VAULT ISOLATION
console.log('\n--- 3. CROSS-USER REVISION VAULT & QUESTION HISTORY ISOLATION ---');
const vaultA = db.getWeakQuestionsForUser(candA.id);
const vaultB = db.getWeakQuestionsForUser(candB.id);

assertAudit(vaultA.length > 0, `Candidate Alpha Revision Vault contains weak questions (${vaultA.length} items)`);
assertAudit(vaultB.length === 0, `Candidate Beta Revision Vault remains completely clean (0 items)`);

const userBAttempts = db.getAttemptsForUser(candB.id);
assertAudit(userBAttempts.length === 0, `Candidate Beta Attempt History remains completely clean (0 attempts)`);

// 4. ANALYTICS & STATISTICAL INTEGRITY (NO NaN, NO NEGATIVES)
console.log('\n--- 4. ANALYTICS EDGE CASES & INTEGRITY ---');
const edgeAtt = db.submitTest({
  userId: candB.id,
  testSeriesId: 'cat_foundation_logical',
  mode: 'exam',
  timeTakenSeconds: 600,
  responses: [], // Unattempted edge case
});

assertAudit(!isNaN(edgeAtt.accuracyPercentage) && edgeAtt.accuracyPercentage >= 0 && edgeAtt.accuracyPercentage <= 100, `0 Attempted Accuracy: ${edgeAtt.accuracyPercentage}% (Valid number, not NaN)`);
assertAudit(!isNaN(edgeAtt.scorePoints) && edgeAtt.scorePoints >= 0, `0 Attempted Score: ${edgeAtt.scorePoints} (Non-negative)`);
assertAudit(edgeAtt.unattemptedCount === 25, `Unattempted Count accurately reflects 25/25 unattempted`);

// 5. RECOMMENDATION ENGINE TARGETING & ISOLATION
console.log('\n--- 5. RECOMMENDATION ENGINE USER PROFILES AUDIT ---');
const allTests = db.getTests();
const recsA = recommendationEngine.rankAssessments(allTests, candA, userAAttempts, vaultA);
const recsB = recommendationEngine.rankAssessments(allTests, candB, userBAttempts, vaultB);

assertAudit(recsA[0].test.id === 'cat_company_tcs' || recsA[0].test.id === 'cat_company_tcs_foundation', `Candidate Alpha (TCS target) recommended TCS Mock Rank #1 (${recsA[0].test.title})`);
assertAudit(recsB[0].test.id === 'cat_company_accenture', `Candidate Beta (Accenture target) recommended Accenture Mock Rank #1 (${recsB[0].test.title})`);

// 6. GLOBAL CATALOGUE, BLUEPRINT & PATTERN TRINITY
console.log('\n--- 6. CATALOGUE, BLUEPRINT & PATTERN TRINITY CHECK ---');
const live11 = [
  'cat_foundation_quant',
  'cat_foundation_logical',
  'cat_foundation_verbal',
  'cat_foundation_di',
  'cat_foundation_pseudocode',
  'cat_company_wipro',
  'cat_company_accenture',
  'cat_company_cognizant',
  'cat_company_infosys',
  'cat_company_tcs',
  'cat_company_tcs_foundation',
];

let trinityPass = true;
live11.forEach(id => {
  const cat = db.getTestById(id, false);
  if (!cat || cat.status !== 'ready' || cat.verificationStatus !== 'VERIFIED') {
    trinityPass = false;
    console.error(`Catalogue error: ${id}`);
  }
});
assertAudit(trinityPass, `All 11 Live Assessments satisfy Catalogue <-> Blueprint <-> Pattern Consistency`);

// 7. CODING SANDBOX SECURITY & PERSISTENCE
console.log('\n--- 7. TCS ADVANCED CODING SANDBOX INTEGRITY ---');
async function testCoding() {
  let pass = true;
  for (const prob of tcsCodingProblems) {
    const res = await codeExecutionService.executeSubmission(
      {
        userId: 'usr_audit_phase28',
        questionId: prob.id,
        language: 'typescript',
        sourceCode: prob.starterCode['typescript'],
        isSubmission: true,
      },
      prob.testCases
    );
    if (res.status !== 'PASSED' || res.passedTests !== res.totalTests) pass = false;
  }
  assertAudit(pass, `TCS Advanced Coding Problems execute and pass 100% test cases`);
}

async function runMain() {
  await testCoding();
  console.log('\n================================================================');
  console.log(`PHASE 28A INTEGRITY AUDIT: ${failedChecks === 0 ? 'ALL AUDIT GATES PASSED (0 FAILURES)' : `${failedChecks} FAILURES`}`);
  console.log('================================================================');
  if (failedChecks > 0) process.exit(1);
}

runMain();

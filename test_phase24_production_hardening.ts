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
import { CATALOGUE_TESTS } from './server/data/catalogueData';
import { codeExecutionService } from './src/services/CodeExecutionService';
import { questionSelectionEngine } from './src/services/QuestionSelectionEngine';
import { recommendationEngine } from './src/services/RecommendationEngine';
import { ContentQAEngine } from './src/services/ContentQAEngine';
import { db } from './server/db';

const contentQA = new ContentQAEngine();

let failedGates = 0;
function assertGate(condition: boolean, gateName: string, detail?: string) {
  if (condition) {
    console.log(`  [PASS] ${gateName}`);
  } else {
    console.error(`  [FAIL] ${gateName}${detail ? ` -> ${detail}` : ''}`);
    failedGates++;
  }
}

console.log('================================================================');
console.log('PHASE 24: FULL PRODUCTION HARDENING & PLATFORM HEALTH AUDIT');
console.log('================================================================\n');

// 1. GLOBAL SYSTEM INVENTORY & QUESTION INTEGRITY
console.log('--- 1. GLOBAL SYSTEM INVENTORY & DATA INTEGRITY ---');
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

assertGate(fullBank366.length === 366, `Total System Bank Count = 366 (Actual: ${fullBank366.length})`);
assertGate(quantQuestions.length === 25, `Foundation Quant = 25 (Actual: ${quantQuestions.length})`);
assertGate(logicalQuestions.length === 25, `Foundation Logical = 25 (Actual: ${logicalQuestions.length})`);
assertGate(verbalQuestions.length === 25, `Foundation Verbal = 25 (Actual: ${verbalQuestions.length})`);
assertGate(diQuestions.length === 25, `Foundation DI = 25 (Actual: ${diQuestions.length})`);
assertGate(pseudocodeQuestions.length === 25, `Foundation Pseudocode = 25 (Actual: ${pseudocodeQuestions.length})`);
assertGate(wiproQuestions.length === 26, `Wipro Bank = 26 (Actual: ${wiproQuestions.length})`);
assertGate(accentureQuestions.length === 89, `Accenture Bank = 89 (Actual: ${accentureQuestions.length})`);
assertGate(cognizantQuestions.length === 61, `Cognizant Bank = 61 (Actual: ${cognizantQuestions.length})`);
assertGate(infosysQuestions.length === 43, `Infosys Bank = 43 (Actual: ${infosysQuestions.length})`);
assertGate(tcsAdvancedQuestions.length === 20, `TCS Advanced Quant/Reasoning = 20 (Actual: ${tcsAdvancedQuestions.length})`);
assertGate(tcsCodingProblems.length === 2, `TCS Advanced Coding Problems = 2 (Actual: ${tcsCodingProblems.length})`);

const idSet = new Set<string>();
let idDupes = 0;
const textSet = new Set<string>();
let textDupes = 0;
let malformedQuestions = 0;
let invalidKeys = 0;

fullBank366.forEach(q => {
  if (idSet.has(q.id)) idDupes++;
  idSet.add(q.id);

  const norm = q.questionText.trim().toLowerCase().replace(/\s+/g, ' ');
  if (textSet.has(norm)) textDupes++;
  textSet.add(norm);

  if (q.questionType === 'MCQ_SINGLE') {
    if (!(q as import('./src/types').MCQQuestion).options || (q as import('./src/types').MCQQuestion).options.length !== 4) malformedQuestions++;
    if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer)) invalidKeys++;
  }
});

assertGate(idDupes === 0, `Zero Global ID Collisions (Actual: ${idDupes})`);
assertGate(textDupes === 0, `Zero Global Text Collisions (Actual: ${textDupes})`);
assertGate(malformedQuestions === 0, `Zero Malformed Option Sets (Actual: ${malformedQuestions})`);
assertGate(invalidKeys === 0, `Zero Invalid Answer Key Pointers (Actual: ${invalidKeys})`);

// 2. CATALOGUE & PRODUCTION STATE CONSISTENCY
console.log('\n--- 2. CATALOGUE & BLUEPRINT CONSISTENCY AUDIT ---');
const liveAssessmentIds = [
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
];

liveAssessmentIds.forEach(id => {
  const cat = db.getTestById(id, false);
  const isLive = cat && cat.status === 'ready' && cat.verificationStatus === 'VERIFIED';
  assertGate(!!isLive, `Live Assessment "${id}" is ready & VERIFIED in production catalogue`);
});

// 3. PRODUCTION PLAYABILITY & RUNTIME ASSEMBLY MATRIX
console.log('\n--- 3. PRODUCTION PLAYABILITY & RUNTIME ASSEMBLY MATRIX ---');
const expectedCounts: Record<string, number> = {
  cat_foundation_quant: 25,
  cat_foundation_logical: 25,
  cat_foundation_verbal: 25,
  cat_foundation_di: 25,
  cat_foundation_pseudocode: 25,
  cat_company_wipro: 48,
  cat_company_accenture: 90,
  cat_company_cognizant: 80,
  cat_company_infosys: 54,
  cat_company_tcs: 22,
};

liveAssessmentIds.forEach(id => {
  const liveInstance = db.getQuestionsForTest(id);
  const target = expectedCounts[id];
  const countMatch = liveInstance.length === target;
  const uniqueIds = new Set(liveInstance.map(q => q.id)).size === liveInstance.length;
  assertGate(countMatch && uniqueIds, `Runtime Playability for "${id}": Loaded ${liveInstance.length}/${target} unique questions`);
});

// 4. CANDIDATE HISTORY & NO-REPETITION RUNTIME VERIFICATION
console.log('\n--- 4. CANDIDATE HISTORY & NO-REPETITION AUDIT ---');
const seenFoundation125 = [
  ...quantQuestions.map(q => q.id),
  ...logicalQuestions.map(q => q.id),
  ...verbalQuestions.map(q => q.id),
  ...diQuestions.map(q => q.id),
  ...pseudocodeQuestions.map(q => q.id),
];
const seenWipro = wiproQuestions.map(q => q.id);
const seenAccenture = accentureQuestions.map(q => q.id);
const seenCognizant = cognizantQuestions.map(q => q.id);
const seenInfosys = infosysQuestions.map(q => q.id);
const seenAllLive344 = [...new Set([...seenFoundation125, ...seenWipro, ...seenAccenture, ...seenCognizant, ...seenInfosys])];

// Test Infosys Assembly with 301 Seen
const infBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_infosys_assessment')!;
const seen301 = [...new Set([...seenFoundation125, ...seenWipro, ...seenAccenture, ...seenCognizant])];
const infAssembly301 = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_hard_inf_301',
  blueprint: infBp,
  questionBank: fullBank366,
  previouslyAttemptedQuestionIds: seen301,
  allowPartialReuseWhenExhausted: false,
});
assertGate(
  infAssembly301.success && infAssembly301.freshCount === 54 && infAssembly301.reusedCount === 0,
  `Infosys 301-Seen Candidate Assembly: 54/54 Fresh (0 Reused, 0 Shortfall)`
);

// Test TCS Advanced Assembly with 344 Seen
const tcsBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_tcs_nqt_advanced')!;
const tcsAssembly344 = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_hard_tcs_344',
  blueprint: tcsBp,
  questionBank: fullBank366,
  previouslyAttemptedQuestionIds: seenAllLive344,
  allowPartialReuseWhenExhausted: false,
});
assertGate(
  tcsAssembly344.success && tcsAssembly344.freshCount === 22 && tcsAssembly344.reusedCount === 0,
  `TCS NQT Advanced 344-Seen Candidate Assembly: 22/22 Fresh (0 Reused, 0 Shortfall)`
);

// 5. SCORING, ATTEMPT PERSISTENCE & LIFECYCLE
console.log('\n--- 5. SCORING, ATTEMPT PERSISTENCE & REVISION VAULT ---');
const cand = db.loginOrRegister('hardening_user@firstround.com', 'Hardening Test Candidate');
try {
  (db as any).sqliteDb.prepare("DELETE FROM test_attempts WHERE userId = ?").run(cand.id);
  (db as any).sqliteDb.prepare("DELETE FROM bookmarks WHERE userId = ?").run(cand.id);
  (db as any).sqliteDb.prepare("DELETE FROM coding_submissions WHERE userId = ?").run(cand.id);
} catch (e) {}

// Seed two failing coding submissions so that the coding questions count as incorrect attempts
db.saveCodingSubmission({
  id: 'sub_hard_1',
  userId: cand.id,
  testSeriesId: 'cat_company_tcs',
  questionId: 'q_tcs_coding_001',
  language: 'javascript',
  sourceCode: '// fail',
  executionResult: { status: 'WRONG_ANSWER', scorePercentage: 0, testCaseResults: [] } as any,
  isFinalSubmission: true,
  createdAt: new Date().toISOString(),
});
db.saveCodingSubmission({
  id: 'sub_hard_2',
  userId: cand.id,
  testSeriesId: 'cat_company_tcs',
  questionId: 'q_tcs_coding_002',
  language: 'javascript',
  sourceCode: '// fail',
  executionResult: { status: 'WRONG_ANSWER', scorePercentage: 0, testCaseResults: [] } as any,
  isFinalSubmission: true,
  createdAt: new Date().toISOString(),
});

const candA = db.loginOrRegister('hardening_user@firstround.com', 'Hardening Test Candidate');
cand.targetCompany = 'TCS';
cand.targetRole = 'Digital';
const liveTcsQuestions = db.getQuestionsForTest('cat_company_tcs');
const simResponses = liveTcsQuestions.map((q, idx) => ({
  questionId: q.id,
  selectedOption: idx < 15 ? (q as import('./src/types').MCQQuestion).correctOption : ((q as import('./src/types').MCQQuestion).correctOption === 'A' ? 'B' : 'A'),
  timeSpentSeconds: 45,
}));

const attempt = db.submitTest({
  userId: cand.id,
  testSeriesId: 'cat_company_tcs',
  mode: 'exam',
  timeTakenSeconds: 1800,
  responses: simResponses as any,
});

// Score: 15 correct (+150), 7 incorrect (-14) = 136 points
assertGate(attempt.scorePoints === 136, `Score Calculation: (15*10 - 7*2 = 136) (Actual: ${attempt.scorePoints})`);
assertGate(attempt.correctCount === 15 && attempt.incorrectCount === 7, `Attempt Response Count Integrity: 15 Correct, 7 Incorrect`);

const retrievedAttempt = db.getAttemptsForUser(cand.id).find(a => a.id === attempt.id);
assertGate(!!retrievedAttempt, `Attempt DB Persistence & Retrieval Verified (ID: ${attempt.id})`);

const vaultItems = db.getWeakQuestionsForUser(cand.id);
assertGate(vaultItems.length === 7, `Revision Vault Ingestion: Exactly 7 incorrect questions stored (Actual: ${vaultItems.length})`);

// 6. RECOMMENDATION ENGINE VALIDATION
console.log('\n--- 6. RECOMMENDATION ENGINE AUDIT ---');
const allCatalogueTests = db.getTests();
const userAttempts = db.getAttemptsForUser(cand.id);
const recommendations = recommendationEngine.rankAssessments(allCatalogueTests, cand, userAttempts, vaultItems);

assertGate(recommendations.length > 0, `Recommendations Generated: ${recommendations.length} Assessments`);
const topRec = recommendations[0];
assertGate(topRec.test.id === 'cat_company_tcs', `Top Recommendation for TCS Target Candidate is TCS NQT Advanced (Actual: ${topRec.test.title})`);

// 7. CODING SANDBOX MULTI-LANGUAGE & SECURITY
console.log('\n--- 7. CODING SANDBOX MULTI-LANGUAGE & SECURITY ---');

async function testCodingHardening() {
  let codingPass = true;
  for (const prob of tcsCodingProblems) {
    for (const lang of ['javascript', 'typescript', 'python'] as const) {
      const res = await codeExecutionService.executeSubmission(
        {
          userId: `usr_hardening_${prob.id}_${lang}`,
          questionId: prob.id,
          language: lang,
          sourceCode: prob.starterCode[lang],
          isSubmission: true,
        },
        prob.testCases
      );
      if (res.status !== 'PASSED' || res.passedTests !== res.totalTests) {
        codingPass = false;
        console.error(`  [CODING ERROR] ${prob.id} (${lang}) failed! Passed: ${res.passedTests}/${res.totalTests}`);
      }
    }
  }
  assertGate(codingPass, `Coding Sandbox Multi-Language Test Case Execution (100% Passed across JS, TS, Python)`);

  // Security injections
  const secRes = await codeExecutionService.executeSubmission(
    {
      userId: 'usr_sec_attack',
      questionId: 'q_tcs_coding_001',
      language: 'javascript',
      sourceCode: "const fs = require('fs'); const cp = require('child_process'); cp.execSync('whoami');",
      isSubmission: false,
    },
    tcsCodingProblems[0].testCases
  );
  assertGate(secRes.status === 'RUNTIME_ERROR', `Security Sandbox Policy: Arbitrary system execution safely blocked`);
}

async function runHardeningSuite() {
  await testCodingHardening();

  console.log('\n================================================================');
  console.log(`PHASE 24 HARDENING AUDIT SUMMARY: ${failedGates === 0 ? 'ALL GATES PASSED (0 FAILURES)' : `${failedGates} FAILURES DETECTED`}`);
  console.log('================================================================');

  if (failedGates > 0) {
    process.exit(1);
  }
}

runHardeningSuite();

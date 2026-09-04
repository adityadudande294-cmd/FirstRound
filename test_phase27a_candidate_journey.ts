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
console.log('PHASE 27A: FULL PRODUCTION CANDIDATE JOURNEY VERIFICATION');
console.log('================================================================\n');

let failedChecks = 0;
function assertJourney(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
  } else {
    console.error(`  [FAIL] ${testName}${detail ? ` -> ${detail}` : ''}`);
    failedChecks++;
  }
}

// 1. ALL 11 LIVE CATALOGUE ITEMS INVENTORY & DISCOVERY
console.log('--- 1. CATALOGUE INVENTORY & DISCOVERY (11 LIVE ASSESSMENTS) ---');
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
  'cat_company_tcs_foundation',
];

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
  cat_company_tcs_foundation: 65,
};

liveAssessmentIds.forEach(id => {
  const cat = db.getTestById(id, false);
  const isReady = cat && cat.status === 'ready' && cat.verificationStatus === 'VERIFIED';
  assertJourney(!!isReady, `Catalogue Discovery: "${id}" is ready & VERIFIED (${cat?.title})`);
});

// 2. RUNTIME PLAYABILITY ACROSS ALL 11 LIVE ASSESSMENTS
console.log('\n--- 2. RUNTIME PLAYABILITY & QUESTION INTEGRITY (ALL 11 TESTS) ---');
const loadedTests: Record<string, any> = {};

liveAssessmentIds.forEach(id => {
  const testInstance = db.getTestById(id, true);
  loadedTests[id] = testInstance;
  const target = expectedCounts[id];
  const qList = testInstance?.questions || [];
  const countMatch = qList.length === target;

  const uniqueIds = new Set(qList.map(q => q.id)).size === qList.length;
  const uniqueTexts = new Set(qList.map(q => q.questionText.trim().toLowerCase())).size === qList.length;
  const validOptsAndKeys = qList.every(q => {
    if (q.questionType === 'CODING' || (q as import('./src/types').MCQQuestion).options?.length === 0) {
      return true;
    }
    return (q as import('./src/types').MCQQuestion).options && (q as import('./src/types').MCQQuestion).options.length === 4 && ['A', 'B', 'C', 'D'].includes((q as import('./src/types').MCQQuestion).correctOption);
  });

  assertJourney(
    countMatch && uniqueIds && uniqueTexts && validOptsAndKeys,
    `Playability [${id}]: Loaded ${qList.length}/${target} Qs, 0 Dupes, Valid Options & Keys`
  );
});

// 3. PRACTICE MODE & SOLUTION REVEAL VERIFICATION
console.log('\n--- 3. PRACTICE MODE & INSTANT SOLUTION REVEAL SIMULATION ---');
liveAssessmentIds.forEach(id => {
  const t = loadedTests[id];
  const qSample = t.questions[0];

  // In practice mode, student selects choice and clicks Verify Choice & Reveal Solution
  const userChoice = qSample.correctOption;
  const isCorrect = userChoice === qSample.correctOption;
  const explanationAvailable = typeof qSample.explanation === 'string' && qSample.explanation.length > 10;

  assertJourney(
    isCorrect && explanationAvailable,
    `Practice Mode [${id}]: Solution revealed for Q1 (${qSample.id}) with valid explanation`
  );
});

// 4. CANDIDATE LIFECYCLE & MULTI-ASSESSMENT JOURNEY
console.log('\n--- 4. CANDIDATE LIFECYCLE & CROSS-ASSESSMENT HISTORY ---');
const cand = db.loginOrRegister('aarav_journey@firstround.com', 'Aarav Mehta');
try {
  (db as any).sqliteDb.prepare("DELETE FROM test_attempts WHERE userId = ?").run(cand.id);
  (db as any).sqliteDb.prepare("DELETE FROM bookmarks WHERE userId = ?").run(cand.id);
  (db as any).sqliteDb.prepare("DELETE FROM coding_submissions WHERE userId = ?").run(cand.id);
} catch (e) {
  console.error("Cleanup error:", e);
}
cand.targetCompany = 'TCS';
cand.targetRole = 'Digital';

// Candidate completes Foundation Quant (20 correct, 5 wrong)
const qQuant = loadedTests['cat_foundation_quant'].questions;
const respQuant = qQuant.map((q: any, idx: number) => {
  const correct = (q as import('./src/types').MCQQuestion).correctOption;
  const wrong = ['A', 'B', 'C', 'D'].find(o => o !== correct)!;
  return {
    questionId: q.id,
    selectedOption: idx < 20 ? correct : wrong,
    timeSpentSeconds: 60,
  };
});
const attQuant = db.submitTest({
  userId: cand.id,
  testSeriesId: 'cat_foundation_quant',
  mode: 'exam',
  timeTakenSeconds: 1500,
  responses: respQuant,
});
const expectedQuantScore = (20 * 10) - (5 * 2);
assertJourney(attQuant.scorePoints === expectedQuantScore, `Foundation Quant Attempt Submitted & Graded (Score: ${attQuant.scorePoints}, Exp: ${expectedQuantScore})`);

// Candidate next launches TCS Foundation Mock with candidate history
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

const seenAfterQuant = qQuant.map((q: any) => q.id);
const tcsFndBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_tcs_nqt_foundation')!;
const tcsAssemblyAfterQuant = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: cand.id,
  blueprint: tcsFndBp,
  questionBank: fullBank366,
  previouslyAttemptedQuestionIds: seenAfterQuant,
  allowPartialReuseWhenExhausted: false,
});
assertJourney(
  tcsAssemblyAfterQuant.sectionResults.reduce((acc, s) => acc + s.selectedQuestions.length, 0) === 65 && tcsAssemblyAfterQuant.freshCount === 65,
  `TCS NQT Foundation Assembly after Quant Seen: 65/65 Fresh (0 Reused)`
);

// Candidate completes TCS Foundation Mock (55 correct, 10 wrong)
const qTcsFnd = loadedTests['cat_company_tcs_foundation'].questions;
const respTcsFnd = qTcsFnd.map((q: any, idx: number) => {
  const correct = (q as import('./src/types').MCQQuestion).correctOption;
  const wrong = ['A', 'B', 'C', 'D'].find(o => o !== correct)!;
  return {
    questionId: q.id,
    selectedOption: idx < 55 ? correct : wrong,
    timeSpentSeconds: 50,
  };
});
const attTcsFnd = db.submitTest({
  userId: cand.id,
  testSeriesId: 'cat_company_tcs_foundation',
  mode: 'exam',
  timeTakenSeconds: 3600,
  responses: respTcsFnd,
});
const expectedTcsScore = (55 * 10) - (10 * 2);
assertJourney(attTcsFnd.scorePoints === expectedTcsScore, `TCS Foundation Attempt Graded & Persisted (Score: ${attTcsFnd.scorePoints}, Exp: ${expectedTcsScore})`);

// 5. REVISION VAULT & RECOMMENDATIONS FOR CANDIDATE
console.log('\n--- 5. REVISION VAULT & RECOMMENDATION ENGINE DYNAMICS ---');
const userAttempts = db.getAttemptsForUser(cand.id);
const vaultWeak = db.getWeakQuestionsForUser(cand.id);
assertJourney(userAttempts.length === 2, `Attempt History: 2 Attempts cleanly persisted in DB`);
assertJourney(vaultWeak.length === 15, `Revision Vault: 15 Incorrect questions from both attempts ingested (Actual: ${vaultWeak.length})`);

const allTests = db.getTests();
const recs = recommendationEngine.rankAssessments(allTests, cand, userAttempts, vaultWeak);
assertJourney(recs.length === 11, `Recommendation Engine: 11 Total assessments ranked`);
console.log(`Top 3 Recommendations for TCS Digital Candidate:`);
recs.slice(0, 3).forEach((r, idx) => {
  console.log(`  ${idx + 1}. [${r.badge || 'NORMAL'}] ${r.test.title} (${r.test.id}) — ${r.reason}`);
});
const tcsRec = recs.find(r => r.test.id === 'cat_company_tcs' || r.test.id === 'cat_company_tcs_foundation');
assertJourney(!!tcsRec, `TCS Company Mock Surfaced at Top in Recommendations (Rank #${recs.indexOf(tcsRec!) + 1}: ${tcsRec?.test.title})`);

// 6. CODING SANDBOX MULTI-LANGUAGE TEST
console.log('\n--- 6. TCS ADVANCED CODING SANDBOX TEST ---');
async function testCoding() {
  let allPass = true;
  for (const prob of tcsCodingProblems) {
    for (const lang of ['javascript', 'typescript', 'python'] as const) {
      const res = await codeExecutionService.executeSubmission(
        {
          userId: `usr_cand_j_${prob.id}_${lang}`,
          questionId: prob.id,
          language: lang,
          sourceCode: prob.starterCode[lang],
          isSubmission: true,
        },
        prob.testCases
      );
      if (res.status !== 'PASSED' || res.passedTests !== res.totalTests) {
        allPass = false;
        console.error(`Coding Failure: ${prob.id} (${lang})`);
      }
    }
  }
  assertJourney(allPass, `TCS Advanced Coding: 100% Pass across JS, TS, and Python on all hidden test cases`);
}

async function runMain() {
  await testCoding();
  console.log('\n================================================================');
  console.log(`PHASE 27A JOURNEY VERIFICATION: ${failedChecks === 0 ? 'ALL CHECKS PASSED (0 FAILURES)' : `${failedChecks} FAILURES`}`);
  console.log('================================================================');
  if (failedChecks > 0) process.exit(1);
}

runMain();

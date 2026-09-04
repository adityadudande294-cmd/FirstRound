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
import { questionSelectionEngine } from './src/services/QuestionSelectionEngine';
import { recommendationEngine } from './src/services/RecommendationEngine';
import { db } from './server/db';

console.log('================================================================');
console.log('PHASE 26B: TCS NQT FOUNDATION VERIFICATION & PROMOTION TEST');
console.log('================================================================\n');

// 1. Full Bank Inventory Check
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

console.log(`Total System Bank: ${fullBank366.length} / 366 (Expected: 366)`);

// 2. Promotion State Verification
console.log('\n--- 1. PROMOTION STATE VERIFICATION ---');
const tcsFndBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_tcs_nqt_foundation')!;
const tcsFndPat = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_tcs_nqt_foundation')!;
const tcsFndCat = db.getTestById('cat_company_tcs_foundation', false);

console.log(`Blueprint ID: ${tcsFndBp.id} | verificationStatus: ${tcsFndBp.verificationStatus} (Expected: VERIFIED)`);
console.log(`Pattern ID: ${tcsFndPat?.id} | status: ${tcsFndPat?.status} | verificationStatus: ${tcsFndPat?.verificationStatus} (Expected: ready / VERIFIED)`);
console.log(`Catalogue ID: ${tcsFndCat?.id} | status: ${tcsFndCat?.status} | verificationStatus: ${tcsFndCat?.verificationStatus} (Expected: ready / VERIFIED)`);
console.log(`Catalogue Title: "${tcsFndCat?.title}" | Duration: ${tcsFndCat?.durationMinutes} mins | Total Questions: ${tcsFndCat?.totalQuestions}`);

const statePass = 
  tcsFndBp.verificationStatus === 'VERIFIED' &&
  tcsFndPat?.status === 'ready' &&
  tcsFndPat?.verificationStatus === 'VERIFIED' &&
  tcsFndCat?.status === 'ready' &&
  tcsFndCat?.verificationStatus === 'VERIFIED';
console.log(`State Promotion Status: ${statePass ? 'PASS (100% Promoted to Production)' : 'FAIL'}\n`);

// 3. Live Catalogue Playability Test
console.log('--- 2. LIVE PRODUCTION CATALOGUE PLAYABILITY ---');
const liveTest = db.getTestById('cat_company_tcs_foundation', true);
console.log(`Loaded Live Test: "${liveTest?.title}" (${liveTest?.id})`);
console.log(`Total Questions Loaded: ${liveTest?.questions?.length} / 65`);

let malformed = 0;
let invalidAnswer = 0;
const loadedIds = new Set<string>();
const loadedTexts = new Set<string>();
let idDupes = 0;
let textDupes = 0;

liveTest?.questions?.forEach(q => {
  if (loadedIds.has(q.id)) idDupes++;
  loadedIds.add(q.id);

  const norm = q.questionText.trim().toLowerCase();
  if (loadedTexts.has(norm)) textDupes++;
  loadedTexts.add(norm);

  if (!(q as import('./src/types').MCQQuestion).options || (q as import('./src/types').MCQQuestion).options.length !== 4) malformed++;
  if (!['A', 'B', 'C', 'D'].includes((q as import('./src/types').MCQQuestion).correctOption)) invalidAnswer++;
});

console.log(`Duplicate IDs Loaded: ${idDupes} (Expected: 0)`);
console.log(`Duplicate Texts Loaded: ${textDupes} (Expected: 0)`);
console.log(`Malformed Options: ${malformed} (Expected: 0)`);
console.log(`Invalid Answer Keys: ${invalidAnswer} (Expected: 0)`);
console.log(`Live Playability Status: ${liveTest?.questions?.length === 65 && idDupes === 0 && textDupes === 0 ? 'PASS' : 'FAIL'}\n`);

// 4. Candidate History Assembly Scenarios
console.log('--- 3. CANDIDATE HISTORY ASSEMBLY SCENARIOS ---');
const seenFoundation125 = [
  ...quantQuestions.map(q => q.id),
  ...logicalQuestions.map(q => q.id),
  ...verbalQuestions.map(q => q.id),
  ...diQuestions.map(q => q.id),
  ...pseudocodeQuestions.map(q => q.id),
];

const assemblyCold = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_cand_cold',
  blueprint: tcsFndBp,
  questionBank: fullBank366,
  previouslyAttemptedQuestionIds: [],
  allowPartialReuseWhenExhausted: false,
});
console.log(`Cold Start Assembly: ${assemblyCold.selectedCount}/65 (Fresh: ${assemblyCold.freshCount}, Reused: ${assemblyCold.reusedCount}, Shortfall: ${assemblyCold.shortfall})`);

const assemblyFnd125 = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_cand_fnd125',
  blueprint: tcsFndBp,
  questionBank: fullBank366,
  previouslyAttemptedQuestionIds: seenFoundation125,
  allowPartialReuseWhenExhausted: false,
});
console.log(`Foundation 125 Seen Assembly: ${assemblyFnd125.selectedCount}/65 (Fresh: ${assemblyFnd125.freshCount}, Reused: ${assemblyFnd125.reusedCount}, Shortfall: ${assemblyFnd125.shortfall})`);

// Two-Attempt Test
const firstAttemptIds = assemblyCold.sectionResults.flatMap(s => s.selectedQuestions).map(q => q.id);
const assemblySecond = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_cand_second',
  blueprint: tcsFndBp,
  questionBank: fullBank366,
  previouslyAttemptedQuestionIds: firstAttemptIds,
  allowPartialReuseWhenExhausted: false,
});
console.log(`Second Consecutive Attempt: ${assemblySecond.selectedCount}/65 (Fresh: ${assemblySecond.freshCount}, Reused: ${assemblySecond.reusedCount}, Shortfall: ${assemblySecond.shortfall})`);

// 5. Candidate Lifecycle, Scoring & Persistence
console.log('\n--- 4. CANDIDATE LIFECYCLE & PERSISTENCE SIMULATION ---');
const testCandidate = db.loginOrRegister('priya_sharma@firstround.com', 'Priya Sharma');
testCandidate.targetRole = 'Ninja';
testCandidate.targetCompany = 'TCS';

const testQuestions = liveTest!.questions!;
const responses: { questionId: string; selectedOption: string | null; timeSpentSeconds: number }[] = [];
let correctCount = 0;
let incorrectCount = 0;

for (let i = 0; i < 65; i++) {
  const q = testQuestions[i];
  if (i < 50) {
    responses.push({
      questionId: q.id,
      selectedOption: (q as import('./src/types').MCQQuestion).correctOption,
      timeSpentSeconds: 45,
    });
    correctCount++;
  } else {
    const wrongOpt = ['A', 'B', 'C', 'D'].find(o => o !== (q as import('./src/types').MCQQuestion).correctOption)!;
    responses.push({
      questionId: q.id,
      selectedOption: wrongOpt,
      timeSpentSeconds: 45,
    });
    incorrectCount++;
  }
}

const calculatedScore = (correctCount * 10) - (incorrectCount * 2);
const newAttempt = db.submitTest({
  userId: testCandidate.id,
  testSeriesId: 'cat_company_tcs_foundation',
  mode: 'exam',
  timeTakenSeconds: 3600,
  responses: responses as any,
});

console.log(`Attempt Submitted: ID=${newAttempt.id} | Score=${newAttempt.scorePoints} | Accuracy=${newAttempt.accuracyPercentage.toFixed(1)}%`);
console.log(`Attempt Score Verified: ${newAttempt.scorePoints === calculatedScore ? 'PASS' : 'FAIL'}`);

const userAttempts = db.getAttemptsForUser(testCandidate.id);
const retrievedAttempt = userAttempts.find(a => a.id === newAttempt.id);
console.log(`Attempt Retrieved from DB: ${retrievedAttempt ? 'PASS (Persistence Verified)' : 'FAIL'}`);

// 6. Revision Vault & Recommendation Engine
console.log('\n--- 5. REVISION VAULT & RECOMMENDATION ENGINE ---');
const weakQuestions = db.getWeakQuestionsForUser(testCandidate.id);
console.log(`Weak Questions in Revision Vault for User: ${weakQuestions.length} Items (Expected: ${incorrectCount})`);

const allTests = db.getTests();
const recs = recommendationEngine.rankAssessments(allTests, testCandidate, userAttempts, weakQuestions);
console.log(`Total Recommendations Generated: ${recs.length}`);
console.log(`Top 5 Recommendations for TCS Ninja Candidate:`);
recs.slice(0, 5).forEach((r, idx) => {
  console.log(`  ${idx + 1}. [${r.badge || 'NORMAL'}] ${r.test.title} (${r.test.id}) — Reason: ${r.reason}`);
});

// 7. Full Platform Regression Across All Live Tests
console.log('\n--- 6. FULL PLATFORM REGRESSION CHECK ---');
const allLiveTests = [
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

let regPass = true;
allLiveTests.forEach(id => {
  const t = db.getTestById(id, true);
  const isReady = t && t.status === 'ready' && t.verificationStatus === 'VERIFIED' && (t.questions?.length || 0) > 0;
  if (!isReady) regPass = false;
  console.log(`  - Test [${id}]: status=${t?.status}, verificationStatus=${t?.verificationStatus}, loadedCount=${t?.questions?.length}`);
});
console.log(`\nFull Platform Regression Status: ${regPass ? 'PASS (11/11 Live Assessments 100% Operational)' : 'FAIL'}`);

console.log('\n================================================================');
console.log('PHASE 26B PRODUCTION PROMOTION COMPLETE');
console.log('================================================================');

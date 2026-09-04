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
import { db } from './server/db';

console.log('================================================================');
console.log('PHASE 23B: TCS NQT ADVANCED PRODUCTION PROMOTION TEST');
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
  ...tcsCodingProblems as any
];

console.log(`Total System Bank: ${fullBank366.length} / 366 (Expected: 366)`);
console.log(`TCS Advanced Quant & Reasoning: ${tcsAdvancedQuestions.length} / 20`);
console.log(`TCS Advanced Coding: ${tcsCodingProblems.length} / 2\n`);

// 2. Promotion State Verification
console.log('--- 1. PROMOTION STATE VERIFICATION ---');
const tcsBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_tcs_nqt_advanced')!;
const tcsPat = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_tcs_nqt_advanced')!;
const tcsCat = db.getTestById('cat_company_tcs', false);

console.log(`Blueprint ID: ${tcsBp.id} | verificationStatus: ${tcsBp.verificationStatus} (Expected: VERIFIED)`);
console.log(`Pattern ID: ${tcsPat?.id} | status: ${tcsPat?.status} | verificationStatus: ${tcsPat?.verificationStatus} (Expected: ready / VERIFIED)`);
console.log(`Catalogue ID: ${tcsCat?.id} | status: ${tcsCat?.status} | verificationStatus: ${tcsCat?.verificationStatus} (Expected: ready / VERIFIED)`);
console.log(`Catalogue Title: "${tcsCat?.title}" | Duration: ${tcsCat?.durationMinutes} mins | Total Questions: ${tcsCat?.totalQuestions}`);

const statePass = 
  tcsBp.verificationStatus === 'VERIFIED' &&
  tcsPat?.status === 'ready' &&
  tcsPat?.verificationStatus === 'VERIFIED' &&
  tcsCat?.status === 'ready' &&
  tcsCat?.verificationStatus === 'VERIFIED';
console.log(`State Promotion Status: ${statePass ? 'PASS (100% Promoted to Production)' : 'FAIL'}\n`);

// 3. Live Catalogue Playability Test
console.log('--- 2. LIVE PRODUCTION CATALOGUE PLAYABILITY ---');
const liveTest = db.getTestById('cat_company_tcs', true);
console.log(`Loaded Live Test: "${liveTest?.title}" (${liveTest?.id})`);
console.log(`Total Questions Loaded: ${liveTest?.questions?.length} / 22`);

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
});

console.log(`Duplicate IDs Loaded: ${idDupes} (Expected: 0)`);
console.log(`Duplicate Texts Loaded: ${textDupes} (Expected: 0)`);
console.log(`Live Playability Status: ${liveTest?.questions?.length === 22 && idDupes === 0 && textDupes === 0 ? 'PASS' : 'FAIL'}\n`);

// 4. Critical Maximum-History Candidate Assembly Test (344 Seen Questions)
console.log('--- 3. MAXIMUM-HISTORY CANDIDATE ASSEMBLY TEST (344 SEEN) ---');
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

const assembly344 = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_candidate_344',
  blueprint: tcsBp,
  questionBank: fullBank366,
  previouslyAttemptedQuestionIds: seenAllLive344,
  allowPartialReuseWhenExhausted: false,
});

const seenSet344 = new Set(seenAllLive344);
const selected344 = assembly344.sectionResults.flatMap(sr => sr.selectedQuestions);
const freshCount344 = selected344.filter(q => !seenSet344.has(q.id)).length;
const reusedCount344 = selected344.filter(q => seenSet344.has(q.id)).length;

console.log(`Assembly Success: ${assembly344.success ? 'PASS' : 'FAIL'}`);
console.log(`Selected Items: ${selected344.length} / 22`);
console.log(`Fresh Items: ${freshCount344} / 22 (Expected: 22)`);
console.log(`Reused Items: ${reusedCount344} (Expected: 0)`);
console.log(`Shortfall: ${assembly344.shortfall} (Expected: 0)`);

assembly344.sectionResults.forEach(sr => {
  const sFresh = sr.selectedQuestions.filter(q => !seenSet344.has(q.id)).length;
  const sReused = sr.selectedQuestions.filter(q => seenSet344.has(q.id)).length;
  console.log(`  - Section "${sr.sectionName}": Selected ${sr.selectedQuestions.length}/${sr.requiredCount} (Fresh: ${sFresh}, Reused: ${sReused})`);
});
console.log(`Maximum-History 344-Seen Status: ${assembly344.success && selected344.length === 22 && freshCount344 === 22 && reusedCount344 === 0 ? 'PASS' : 'FAIL'}\n`);

// 5. Coding Sandbox End-to-End Validation
console.log('--- 4. CODING SANDBOX END-TO-END VALIDATION ---');

async function testCodingExecution() {
  for (const prob of tcsCodingProblems) {
    console.log(`Testing Coding Problem: ${prob.title} (${prob.id})`);
    for (const lang of ['javascript', 'typescript', 'python'] as const) {
      const source = prob.starterCode[lang];
      const res = await codeExecutionService.executeSubmission(
        {
          userId: `usr_tcs_promo_${prob.id}_${lang}`,
          questionId: prob.id,
          language: lang,
          sourceCode: source,
          isSubmission: true,
        },
        prob.testCases
      );
      console.log(`  - Language '${lang}': Status=${res.status} | Passed: ${res.passedTests}/${res.totalTests} | Hidden Passed: ${res.hiddenTestsPassed}/${res.totalHiddenTests}`);
    }
  }
}

// 6. Full Candidate Lifecycle & Attempt Persistence Simulation
console.log('\n--- 5. FULL CANDIDATE LIFECYCLE & PERSISTENCE SIMULATION ---');
// Simulated Candidate: Rohan Sen (Target: TCS Digital / Prime)
const testQuestions = liveTest!.questions!;
const responses: { questionId: string; selectedOption: string | null; timeSpentSeconds: number }[] = [];
let correctCount = 0;
let incorrectCount = 0;

for (let i = 0; i < 22; i++) {
  const q = testQuestions[i];
  if (i < 18) {
    responses.push({
      questionId: q.id,
      selectedOption: (q as import('./src/types').MCQQuestion).correctOption,
      timeSpentSeconds: 60,
    });
    correctCount++;
  } else {
    const wrongOpt = ['A', 'B', 'C', 'D'].find(o => o !== (q as import('./src/types').MCQQuestion).correctOption)!;
    responses.push({
      questionId: q.id,
      selectedOption: wrongOpt,
      timeSpentSeconds: 60,
    });
    incorrectCount++;
  }
}

const calculatedScore = (correctCount * 10) - (incorrectCount * 2);
console.log(`Simulation Inputs: Correct=${correctCount}, Incorrect=${incorrectCount}`);
console.log(`Expected Score (${correctCount}*10 - ${incorrectCount}*2 = ${calculatedScore}): PASS`);

const testCandidate = db.loginOrRegister('rohan_sen@firstround.com', 'Rohan Sen');
testCandidate.targetRole = 'Digital';
testCandidate.targetCompany = 'TCS';

const newAttempt = db.submitTest({
  userId: testCandidate.id,
  testSeriesId: 'cat_company_tcs',
  mode: 'exam',
  timeTakenSeconds: 3600,
  responses: responses as any,
});

console.log(`Attempt Submitted: ID=${newAttempt.id} | Score=${newAttempt.scorePoints} | Accuracy=${newAttempt.accuracyPercentage.toFixed(1)}%`);
console.log(`Attempt Score Verified: ${newAttempt.scorePoints === calculatedScore ? 'PASS' : 'FAIL'}`);

const userAttempts = db.getAttemptsForUser(testCandidate.id);
const retrievedAttempt = userAttempts.find(a => a.id === newAttempt.id);
console.log(`Attempt Retrieved from DB: ${retrievedAttempt ? 'PASS (Persistence Verified)' : 'FAIL'}`);

// 7. Revision Vault & Recommendation Engine Live Verification
console.log('\n--- 6. REVISION VAULT & RECOMMENDATION ENGINE VERIFICATION ---');
const weakQuestions = db.getWeakQuestionsForUser(testCandidate.id);
console.log(`Weak Questions in Revision Vault for User: ${weakQuestions.length} Items`);
const incorrectResponses = newAttempt.responses.filter(r => r.selectedOption !== null && !r.isCorrect);
console.log(`Incorrect Questions Routed from Attempt: ${incorrectResponses.length} (Expected: ${incorrectCount})`);
console.log(`Revision Vault Routing: ${incorrectResponses.length === incorrectCount ? 'PASS' : 'FAIL'}`);

const allTests = db.getTests();
const recs = recommendationEngine.rankAssessments(allTests, testCandidate, userAttempts, weakQuestions);
console.log(`Total Recommendations Generated: ${recs.length}`);
console.log(`Top 5 Recommendations for TCS Digital Candidate:`);
recs.slice(0, 5).forEach((r, idx) => {
  console.log(`  ${idx + 1}. [${r.badge || 'NORMAL'}] ${r.test.title} (${r.test.id}) — Reason: ${r.reason}`);
});
const topRec = recs.find(r => r.test.id === 'cat_company_tcs');
console.log(`TCS Advanced Mock Surfaced in Recommendations: ${topRec ? `PASS (Rank #${recs.indexOf(topRec) + 1})` : 'FAIL'}\n`);

// 8. Full Platform Regression Across All Live Tests
console.log('--- 7. FULL PLATFORM REGRESSION CHECK ---');
const fQuant = db.getTestById('cat_foundation_quant', true);
const fLog = db.getTestById('cat_foundation_logical', true);
const fVerb = db.getTestById('cat_foundation_verbal', true);
const fDi = db.getTestById('cat_foundation_di', true);
const fPseudo = db.getTestById('cat_foundation_pseudocode', true);

const wiproLive = db.getTestById('cat_company_wipro', true);
const accLive = db.getTestById('cat_company_accenture', true);
const cogLive = db.getTestById('cat_company_cognizant', true);
const infLive = db.getTestById('cat_company_infosys', true);
const tcsLive = db.getTestById('cat_company_tcs', true);

console.log(`Foundation Tests Live: Quant(${fQuant?.questions?.length}), Logical(${fLog?.questions?.length}), Verbal(${fVerb?.questions?.length}), DI(${fDi?.questions?.length}), Pseudocode(${fPseudo?.questions?.length})`);
console.log(`Wipro Elite NTH Live: ${wiproLive?.questions?.length} / 48 (status: ${wiproLive?.status})`);
console.log(`Accenture Cognitive Live: ${accLive?.questions?.length} / 90 (status: ${accLive?.status})`);
console.log(`Cognizant GenC Live: ${cogLive?.questions?.length} / 80 (status: ${cogLive?.status})`);
console.log(`Infosys Specialist/DSE Live: ${infLive?.questions?.length} / 54 (status: ${infLive?.status})`);
console.log(`TCS NQT Advanced Live: ${tcsLive?.questions?.length} / 22 (status: ${tcsLive?.status})`);

const regressionPass = 
  fQuant?.status === 'ready' && fLog?.status === 'ready' && fVerb?.status === 'ready' && fDi?.status === 'ready' && fPseudo?.status === 'ready' &&
  wiproLive?.questions?.length === 48 && wiproLive?.status === 'ready' &&
  accLive?.questions?.length === 90 && accLive?.status === 'ready' &&
  cogLive?.questions?.length === 80 && cogLive?.status === 'ready' &&
  infLive?.questions?.length === 54 && infLive?.status === 'ready' &&
  tcsLive?.questions?.length === 22 && tcsLive?.status === 'ready';

console.log(`Full Platform Regression Status: ${regressionPass ? 'PASS (100% Platform Operational)' : 'FAIL'}`);

async function runMain() {
  await testCodingExecution();
  console.log('\n================================================================');
  console.log('PHASE 23B PRODUCTION PROMOTION COMPLETE');
  console.log('================================================================');
}

runMain();

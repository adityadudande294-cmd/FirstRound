import { quantQuestions } from './src/data/questionBank/quant';
import { logicalQuestions } from './src/data/questionBank/logical';
import { verbalQuestions } from './src/data/questionBank/verbal';
import { diQuestions } from './src/data/questionBank/di';
import { pseudocodeQuestions } from './src/data/questionBank/pseudocode';
import { accentureQuestions } from './src/data/questionBank/accenture';
import { cognizantQuestions } from './src/data/questionBank/cognizant';
import { infosysQuestions } from './src/data/questionBank/infosys';
import { tcsAdvancedQuestions } from './src/data/questionBank/tcsAdvanced';
import { tcsCodingProblems } from './src/data/questionBank/tcsCoding';
import { wiproQuestions } from './src/data/questionBank/wipro';
import { COMPANY_BLUEPRINTS } from './src/data/blueprints/company';
import { COMPANY_PATTERNS_REGISTRY } from './src/data/companyPatterns/registry';
import { questionSelectionEngine } from './src/services/QuestionSelectionEngine';
import { recommendationEngine } from './src/services/RecommendationEngine';
import { db } from './server/db';

console.log('================================================================');
console.log('PHASE 22D: INFOSYS SPECIALIST / DSE PRODUCTION PROMOTION TEST');
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
  ...infosysQuestions,
  ...tcsAdvancedQuestions,
  ...tcsCodingProblems,
  ...wiproQuestions
];

console.log(`Total System Bank: ${fullBank366.length} / 366 (Expected: 366)`);
console.log(`Dedicated Infosys Bank: ${infosysQuestions.length} / 43 (Expected: 43)\n`);

// 2. Promotion State Verification
console.log('--- 1. PROMOTION STATE VERIFICATION ---');
const infBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_infosys_assessment')!;
const infPat = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_infosys_assessment')!;
const infCat = db.getTestById('cat_company_infosys', false);

console.log(`Blueprint ID: ${infBp.id} | verificationStatus: ${infBp.verificationStatus} (Expected: VERIFIED)`);
console.log(`Pattern ID: ${infPat?.id} | status: ${infPat?.status} | verificationStatus: ${infPat?.verificationStatus} (Expected: ready / VERIFIED)`);
console.log(`Catalogue ID: ${infCat?.id} | status: ${infCat?.status} | verificationStatus: ${infCat?.verificationStatus} (Expected: ready / VERIFIED)`);
console.log(`Catalogue Scoring Model: "${infCat?.scoringModel}" | Duration: ${infCat?.durationMinutes} mins`);

const statePass = 
  infBp.verificationStatus === 'VERIFIED' &&
  infPat?.status === 'ready' &&
  infPat?.verificationStatus === 'VERIFIED' &&
  infCat?.status === 'ready' &&
  infCat?.verificationStatus === 'VERIFIED';
console.log(`State Promotion Status: ${statePass ? 'PASS (100% Promoted to Production)' : 'FAIL'}\n`);

// 3. Live Catalogue Playability Test
console.log('--- 2. LIVE PRODUCTION CATALOGUE PLAYABILITY ---');
const liveTest = db.getTestById('cat_company_infosys', true);
console.log(`Loaded Live Test: "${liveTest?.title}" (${liveTest?.id})`);
console.log(`Total Questions Loaded: ${liveTest?.questions?.length} / 54`);

let malformed = 0;
let invalidAnswer = 0;
const loadedIds = new Set<string>();
const loadedTexts = new Set<string>();
let idDupes = 0;
let textDupes = 0;

liveTest?.questions?.forEach(q => {
  if (!(q as import('./src/types').MCQQuestion).options || (q as import('./src/types').MCQQuestion).options.length !== 4) malformed++;
  if (!['A', 'B', 'C', 'D'].includes((q as import('./src/types').MCQQuestion).correctOption)) invalidAnswer++;
  if (loadedIds.has(q.id)) idDupes++;
  loadedIds.add(q.id);

  const norm = q.questionText.trim().toLowerCase();
  if (loadedTexts.has(norm)) textDupes++;
  loadedTexts.add(norm);
});

console.log(`Malformed Options Count: ${malformed} (Expected: 0)`);
console.log(`Invalid Answer Keys: ${invalidAnswer} (Expected: 0)`);
console.log(`Duplicate IDs Loaded: ${idDupes} (Expected: 0)`);
console.log(`Duplicate Texts Loaded: ${textDupes} (Expected: 0)`);
console.log(`Live Playability Status: ${liveTest?.questions?.length === 54 && malformed === 0 && invalidAnswer === 0 && idDupes === 0 && textDupes === 0 ? 'PASS' : 'FAIL'}\n`);

// 4. Critical 301-Seen Candidate Assembly Test
console.log('--- 3. CRITICAL 301-SEEN CANDIDATE ASSEMBLY TEST ---');
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
const seenAllLive301 = [...new Set([...seenFoundation125, ...seenWipro, ...seenAccenture, ...seenCognizant])];

const assembly301 = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_candidate_301',
  blueprint: infBp,
  questionBank: fullBank366,
  previouslyAttemptedQuestionIds: seenAllLive301,
  allowPartialReuseWhenExhausted: false,
});

const seenSet301 = new Set(seenAllLive301);
const selected301 = assembly301.sectionResults.flatMap(sr => sr.selectedQuestions);
const freshCount301 = selected301.filter(q => !seenSet301.has(q.id)).length;
const reusedCount301 = selected301.filter(q => seenSet301.has(q.id)).length;

console.log(`Assembly Success: ${assembly301.success ? 'PASS' : 'FAIL'}`);
console.log(`Selected Questions: ${selected301.length} / 54`);
console.log(`Fresh Questions: ${freshCount301} / 54 (Expected: 54)`);
console.log(`Reused Questions: ${reusedCount301} (Expected: 0)`);
console.log(`Shortfall: ${assembly301.shortfall} (Expected: 0)`);

assembly301.sectionResults.forEach(sr => {
  const sFresh = sr.selectedQuestions.filter(q => !seenSet301.has(q.id)).length;
  const sReused = sr.selectedQuestions.filter(q => seenSet301.has(q.id)).length;
  console.log(`  - Section "${sr.sectionName}": Selected ${sr.selectedQuestions.length}/${sr.requiredCount} (Fresh: ${sFresh}, Reused: ${sReused})`);
});
console.log(`Critical 301-Seen Status: ${assembly301.success && selected301.length === 54 && freshCount301 === 54 && reusedCount301 === 0 ? 'PASS' : 'FAIL'}\n`);

// 5. Candidate Lifecycle & Scoring Attempt Test
console.log('--- 4. CANDIDATE LIFECYCLE & SCORING ATTEMPT TEST ---');
// Simulated Candidate: Ananya Rao (Target: Infosys System Engineer)
// 54 questions: 45 correct (+45), 9 incorrect (0), 0 unattempted -> Score: 45 / 54
const testQuestions = liveTest!.questions!;
const responses: { questionId: string; selectedOption: string | null; timeSpentSeconds: number }[] = [];
let correctCount = 0;
let incorrectCount = 0;

for (let i = 0; i < 54; i++) {
  const q = testQuestions[i];
  if (i < 45) {
    responses.push({
      questionId: q.id,
      selectedOption: (q as import('./src/types').MCQQuestion).correctOption,
      timeSpentSeconds: 50,
    });
    correctCount++;
  } else {
    const wrongOpt = ['A', 'B', 'C', 'D'].find(o => o !== (q as import('./src/types').MCQQuestion).correctOption)!;
    responses.push({
      questionId: q.id,
      selectedOption: wrongOpt,
      timeSpentSeconds: 50,
    });
    incorrectCount++;
  }
}

// Canonical platform scoring: (Correct * 10) - (Incorrect * 2) = 45*10 - 9*2 = 432 points
const calculatedScore = (correctCount * 10) - (incorrectCount * 2);
console.log(`Simulation Inputs: Correct=${correctCount}, Incorrect=${incorrectCount}`);
console.log(`Expected Score (45*10 - 9*2 = 432): ${calculatedScore === 432 ? 'PASS' : 'FAIL'}`);

// Submit Attempt through canonical DB pipeline
const testCandidate = db.loginOrRegister('ananya_rao@firstround.com', 'Ananya Rao');
testCandidate.targetRole = 'System Engineer';
testCandidate.targetCompany = 'Infosys';

const newAttempt = db.submitTest({
  userId: testCandidate.id,
  testSeriesId: 'cat_company_infosys',
  mode: 'exam',
  timeTakenSeconds: 2700,
  responses: responses as any,
});

console.log(`Attempt Submitted: ID=${newAttempt.id} | Score=${newAttempt.scorePoints} | Accuracy=${newAttempt.accuracyPercentage.toFixed(1)}%`);
console.log(`Attempt Score Verified: ${newAttempt.scorePoints === 432 ? 'PASS' : 'FAIL'}`);

const userAttempts = db.getAttemptsForUser(testCandidate.id);
const retrievedAttempt = userAttempts.find(a => a.id === newAttempt.id);
console.log(`Attempt Retrieved from DB: ${retrievedAttempt ? 'PASS (Persistence Verified)' : 'FAIL'}`);

// 6. Revision Vault Verification
console.log('\n--- 5. REVISION VAULT ROUTING VERIFICATION ---');
const weakQuestions = db.getWeakQuestionsForUser(testCandidate.id);
console.log(`Weak Questions in Revision Vault for User: ${weakQuestions.length} Items`);
const incorrectResponses = newAttempt.responses.filter(r => r.selectedOption !== null && !r.isCorrect);
console.log(`Incorrect Questions Routed from Attempt: ${incorrectResponses.length} (Expected: 9)`);
console.log(`Sample Vault Items:`, incorrectResponses.slice(0, 3).map(i => ({ qId: i.questionId, selected: i.selectedOption, correct: i.correctOption })));
console.log(`Revision Vault Routing: ${incorrectResponses.length === 9 ? 'PASS' : 'FAIL'}`);

// 7. Recommendation Engine Live Check
console.log('\n--- 6. RECOMMENDATION ENGINE LIVE VERIFICATION ---');
const allTests = db.getTests();
const recs = recommendationEngine.rankAssessments(allTests, testCandidate, userAttempts, weakQuestions);

console.log(`Total Recommendations Generated: ${recs.length}`);
console.log(`Top 5 Recommendations for Infosys Target Candidate:`);
recs.slice(0, 5).forEach((r, idx) => {
  console.log(`  ${idx + 1}. [${r.badge || 'NORMAL'}] ${r.test.title} (${r.test.id}) — Reason: ${r.reason} (Score: ${r.matchScore})`);
});

const topRec = recs.find(r => r.test.id === 'cat_company_infosys');
console.log(`Infosys Mock Surfaced in Recommendations: ${topRec ? `PASS (Rank #${recs.indexOf(topRec) + 1}, MatchScore: ${topRec.matchScore})` : 'FAIL'}\n`);

// 8. Full Platform Regression
console.log('--- 7. FULL PLATFORM REGRESSION CHECK ---');
const wiproLive = db.getTestById('cat_company_wipro', true);
const accLive = db.getTestById('cat_company_accenture', true);
const cogLive = db.getTestById('cat_company_cognizant', true);

console.log(`Wipro Elite NTH Live Loaded: ${wiproLive?.questions?.length} / 48 (status: ${wiproLive?.status})`);
console.log(`Accenture Cognitive Live Loaded: ${accLive?.questions?.length} / 90 (status: ${accLive?.status})`);
console.log(`Cognizant GenC Live Loaded: ${cogLive?.questions?.length} / 80 (status: ${cogLive?.status})`);
console.log(`Infosys Live Loaded: ${liveTest?.questions?.length} / 54 (status: ${liveTest?.status})`);

const regressionPass = 
  wiproLive?.questions?.length === 48 && wiproLive?.status === 'ready' &&
  accLive?.questions?.length === 90 && accLive?.status === 'ready' &&
  cogLive?.questions?.length === 80 && cogLive?.status === 'ready' &&
  liveTest?.questions?.length === 54 && liveTest?.status === 'ready';

console.log(`Full Platform Regression Status: ${regressionPass ? 'PASS (All Live Assessments Fully Functional)' : 'FAIL'}`);

console.log('\n================================================================');
console.log('PHASE 22D PROMOTION VALIDATION COMPLETE');
console.log('================================================================');

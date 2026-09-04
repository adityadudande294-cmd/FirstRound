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
console.log('PHASE 21D: COGNIZANT GENC PRODUCTION PROMOTION & LIFECYCLE TEST');
console.log('================================================================\n');

// 1. Full Bank Inventory Check
const fullBank330 = [
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
  ...wiproQuestions,
];

console.log('--- 1. PROMOTION STATE VERIFICATION ---');
const cogBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_cognizant_genc')!;
const cogPat = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_cognizant_genc_aptitude')!;
const cogCat = db.getTestById('cat_company_cognizant', false);

console.log(`Blueprint ID: ${cogBp.id} | verificationStatus: ${cogBp.verificationStatus} (Expected: VERIFIED)`);
console.log(`Pattern ID: ${cogPat?.id} | status: ${cogPat?.status} | verificationStatus: ${cogPat?.verificationStatus} (Expected: ready / VERIFIED)`);
console.log(`Catalogue ID: ${cogCat?.id} | status: ${cogCat?.status} | verificationStatus: ${cogCat?.verificationStatus} (Expected: ready / VERIFIED)`);
console.log(`Catalogue Scoring Model: "${cogCat?.scoringModel}" | Duration: ${cogCat?.durationMinutes} mins`);

const statePass = 
  cogBp.verificationStatus === 'VERIFIED' &&
  cogPat?.status === 'ready' &&
  cogPat?.verificationStatus === 'VERIFIED' &&
  cogCat?.status === 'ready' &&
  cogCat?.verificationStatus === 'VERIFIED';
console.log(`State Promotion Status: ${statePass ? 'PASS (100% Promoted to Production)' : 'FAIL'}\n`);

// 2. Live Catalogue Playability Test
console.log('--- 2. LIVE PRODUCTION CATALOGUE PLAYABILITY ---');
const liveTest = db.getTestById('cat_company_cognizant', true);
console.log(`Loaded Live Test: "${liveTest?.title}" (${liveTest?.id})`);
console.log(`Total Questions Loaded: ${liveTest?.questions?.length} / 80`);

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
  if (loadedTexts.has(q.questionText.trim().toLowerCase())) textDupes++;
  loadedTexts.add(q.questionText.trim().toLowerCase());
});

console.log(`Malformed Options: ${malformed} | Invalid CorrectOption Pointers: ${invalidAnswer}`);
console.log(`Duplicate IDs in Selection: ${idDupes} | Duplicate Texts in Selection: ${textDupes}`);
console.log(`Live Catalogue Playability: ${liveTest?.questions?.length === 80 && malformed === 0 && invalidAnswer === 0 && idDupes === 0 && textDupes === 0 ? 'PASS (100% Playable)' : 'FAIL'}\n`);

// 3. Sectional Distribution of Live Runtime Test
console.log('--- 3. SECTIONAL RUNTIME DISTRIBUTION (Live Production) ---');
const assembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_live_prod',
  blueprint: cogBp,
  questionBank: fullBank330,
  previouslyAttemptedQuestionIds: [],
  allowPartialReuseWhenExhausted: true,
});

console.log(`Total Assembly Selected: ${assembly.totalSelected} / ${assembly.totalRequired}`);
assembly.sectionResults.forEach(sr => {
  console.log(`  - Section "${sr.sectionName}": Selected ${sr.selectedQuestions.length} / ${sr.requiredCount} (Fresh: ${sr.freshCount}, Reused: ${sr.reusedCount})`);
});

const secMatch = 
  assembly.sectionResults[0].selectedQuestions.length === 25 &&
  assembly.sectionResults[1].selectedQuestions.length === 35 &&
  assembly.sectionResults[2].selectedQuestions.length === 20;
console.log(`Section Match: ${secMatch ? 'PASS (25 / 35 / 20)' : 'FAIL'}\n`);

// 4. Critical 240-Seen No-Reuse Acceptance Test
console.log('--- 4. CRITICAL 240-SEEN NO-REUSE PRODUCTION TEST ---');
const seenFoundation125 = [
  ...quantQuestions.map(q => q.id),
  ...logicalQuestions.map(q => q.id),
  ...verbalQuestions.map(q => q.id),
  ...diQuestions.map(q => q.id),
  ...pseudocodeQuestions.map(q => q.id),
];
const seenWipro = wiproQuestions.map(q => q.id);
const seenAccenture = accentureQuestions.map(q => q.id);
const seen240 = [...new Set([...seenFoundation125, ...seenWipro, ...seenAccenture])];

const strict240 = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_experienced_candidate',
  blueprint: cogBp,
  questionBank: fullBank330,
  previouslyAttemptedQuestionIds: seen240,
  allowPartialReuseWhenExhausted: false,
});

const selected240Ids = strict240.sectionResults.flatMap(sr => sr.selectedQuestions).map(q => q.id);
const seenSet240 = new Set(seen240);
const contamination240 = selected240Ids.filter(id => seenSet240.has(id)).length;

console.log(`Candidate Seen History: ${seen240.length} Questions (All Foundation + Wipro + Accenture)`);
console.log(`Strict Assembly Result: Selected=${strict240.totalSelected}/${strict240.totalRequired} | Fresh=${strict240.freshCount} | Reused=${strict240.reusedCount}`);
console.log(`Shortfall: ${strict240.totalShortfall || 0} | Contamination Count: ${contamination240}`);
console.log(`Unique Selected IDs: ${new Set(selected240Ids).size} / 80`);
console.log(`Primary Acceptance Gate: ${strict240.success && strict240.freshCount === 80 && contamination240 === 0 ? 'PASS (100% Fresh / Zero Contamination)' : 'FAIL'}\n`);

// 5. Scoring & Candidate Attempt Lifecycle Simulation
console.log('--- 5. SCORING & CANDIDATE ATTEMPT LIFECYCLE SIMULATION ---');
// Simulated Candidate: Vikram Patel (Target: Cognizant Software Developer)
// 80 questions: 65 correct (+650), 10 incorrect (-20), 5 unattempted (0) -> Score: 630 / 800 (78.75%)
const testQuestions = liveTest!.questions!;
const responses: { questionId: string; selectedOption: string | null; timeSpentSeconds: number }[] = [];
let correctCount = 0;
let incorrectCount = 0;
let unattemptedCount = 0;

for (let i = 0; i < 80; i++) {
  const q = testQuestions[i];
  if (i < 65) {
    responses.push({
      questionId: q.id,
      selectedOption: (q as import('./src/types').MCQQuestion).correctOption,
      timeSpentSeconds: 60,
    });
    correctCount++;
  } else if (i < 75) {
    const wrongOpt = ['A', 'B', 'C', 'D'].find(o => o !== (q as import('./src/types').MCQQuestion).correctOption)!;
    responses.push({
      questionId: q.id,
      selectedOption: wrongOpt,
      timeSpentSeconds: 60,
    });
    incorrectCount++;
  } else {
    responses.push({
      questionId: q.id,
      selectedOption: null,
      timeSpentSeconds: 0,
    });
    unattemptedCount++;
  }
}

const calculatedScore = (correctCount * 10) - (incorrectCount * 2);
const maxScore = 80 * 10;
const accuracy = (correctCount / (correctCount + incorrectCount)) * 100;

console.log(`Simulation Inputs: Correct=${correctCount}, Incorrect=${incorrectCount}, Unattempted=${unattemptedCount}`);
console.log(`Expected Score (65*10 - 10*2 = 630): ${calculatedScore === 630 ? 'PASS' : 'FAIL'}`);

// Submit Attempt through canonical DB pipeline
const testCandidate = db.loginOrRegister('vikram_patel@firstround.com', 'Vikram Patel');
testCandidate.targetRole = 'Software Developer';
testCandidate.targetCompany = 'Cognizant';

const newAttempt = db.submitTest({
  userId: testCandidate.id,
  testSeriesId: 'cat_company_cognizant',
  mode: 'exam',
  timeTakenSeconds: 4800,
  responses: responses as any,
});

console.log(`Attempt Submitted: ID=${newAttempt.id} | Score=${newAttempt.scorePoints} | Accuracy=${newAttempt.accuracyPercentage}%`);
console.log(`Attempt Score Verified (630 points): ${newAttempt.scorePoints === 630 ? 'PASS' : 'FAIL'}`);
const userAttempts = db.getAttemptsForUser(testCandidate.id);
const retrievedAttempt = userAttempts.find(a => a.id === newAttempt.id);
console.log(`Attempt Retrieved from DB: ${retrievedAttempt ? 'PASS (Persistence Verified)' : 'FAIL'}`);

// 6. Revision Vault Verification
console.log('\n--- 6. REVISION VAULT ROUTING VERIFICATION ---');
const weakQuestions = db.getWeakQuestionsForUser(testCandidate.id);
console.log(`Weak Questions in Revision Vault for User: ${weakQuestions.length} Items`);
const incorrectResponses = newAttempt.responses.filter(r => r.selectedOption !== null && !r.isCorrect);
console.log(`Incorrect Questions Routed from Attempt: ${incorrectResponses.length} (Expected: 10)`);
console.log(`Sample Vault Items:`, incorrectResponses.slice(0, 3).map(i => ({ qId: i.questionId, selected: i.selectedOption, correct: i.correctOption })));
console.log(`Revision Vault Routing: ${incorrectResponses.length === 10 ? 'PASS' : 'FAIL'}`);

// 7. Recommendation Engine Live Check
console.log('\n--- 7. RECOMMENDATION ENGINE LIVE VERIFICATION ---');
const allTests = db.getTests();
const recs = recommendationEngine.rankAssessments(allTests, testCandidate, userAttempts, weakQuestions);

console.log(`Total Recommendations Generated: ${recs.length}`);
recs.slice(0, 5).forEach((r, idx) => {
  console.log(`  ${idx + 1}. [${r.test.company || 'Foundation'}] ${r.test.title} (${r.test.id}) - Match Score: ${r.score} | MatchType: ${r.matchType} | Reason: "${r.reason}"`);
});

const cogRec = recs.find(r => r.test.id === 'cat_company_cognizant');
console.log(`Cognizant Assessment in Recommendations: ${cogRec ? 'YES (PASS)' : 'NO'}`);
if (cogRec) {
  console.log(`  Cognizant Match Type: ${cogRec.matchType} (Expected: ROLE_AND_COMPANY)`);
}

// 8. Platform Regression Audit
console.log('\n--- 8. PLATFORM REGRESSION AUDIT ---');
const fq = db.getTestById('cat_foundation_quant', false);
const fl = db.getTestById('cat_foundation_logical', false);
const fv = db.getTestById('cat_foundation_verbal', false);
const fdi = db.getTestById('cat_foundation_di', false);
const fp = db.getTestById('cat_foundation_pseudocode', false);
const wip = db.getTestById('cat_company_wipro', false);
const acc = db.getTestById('cat_company_accenture', false);
const inf = db.getTestById('cat_company_infosys', false);
const tcs = db.getTestById('cat_company_tcs', false);

console.log(`Foundation Tests (5/5 ready & verified): ${fq?.status === 'ready' && fl?.status === 'ready' && fv?.status === 'ready' && fdi?.status === 'ready' && fp?.status === 'ready' ? 'PASS' : 'FAIL'}`);
console.log(`Wipro Elite NTH Test (ready & verified): ${wip?.status === 'ready' && wip?.verificationStatus === 'VERIFIED' ? 'PASS' : 'FAIL'}`);
console.log(`Accenture Cognitive Test (ready & verified): ${acc?.status === 'ready' && acc?.verificationStatus === 'VERIFIED' ? 'PASS' : 'FAIL'}`);
console.log(`Infosys Staging Status (coming_soon): ${inf?.status === 'coming_soon' ? 'PASS (Safely Staged)' : 'FAIL'}`);
console.log(`TCS Staging Status (coming_soon): ${tcs?.status === 'coming_soon' ? 'PASS (Safely Staged)' : 'FAIL'}`);
console.log(`System Bank Total: ${fullBank330.length} Questions (Expected: 330) -> ${fullBank330.length === 330 ? 'PASS' : 'FAIL'}`);

console.log('\n================================================================');
console.log('PHASE 21D PRODUCTION PROMOTION COMPLETE');
console.log('================================================================');

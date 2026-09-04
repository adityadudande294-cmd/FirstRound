import { db } from './server/db';
import { COMPANY_BLUEPRINTS } from './src/data/blueprints/company';
import { COMPANY_PATTERNS_REGISTRY } from './src/data/companyPatterns/registry';
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
import { questionSelectionEngine } from './src/services/QuestionSelectionEngine';
import { CompanyContentCapacityService } from './src/services/CompanyContentCapacityService';
import { DuplicateDetection } from './src/services/DuplicateDetection';

console.log('================================================================');
console.log('PHASE 19D: WIPRO ELITE NTH POST-PROMOTION VALIDATION AUDIT');
console.log('================================================================\n');

// 1. Pre-Promotion Safety Gate Verification
console.log('--- 1. PRE-PROMOTION SAFETY GATE VERIFICATION ---');
const wiproBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_wipro_elite_nth');
const wiproPat = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_wipro_elite_nth');
const wiproCat = db.getTestById('cat_company_wipro', true);

console.log(`Blueprint: ${wiproBp?.id} | verificationStatus: ${wiproBp?.verificationStatus}`);
console.log(`Pattern: ${wiproPat?.id} | status: ${wiproPat?.status} | verificationStatus: ${wiproPat?.verificationStatus}`);
console.log(`Catalogue: ${wiproCat?.id} | status: ${wiproCat?.status} | verificationStatus: ${wiproCat?.verificationStatus}`);

const promotionStatePass = 
  wiproBp?.verificationStatus === 'VERIFIED' &&
  wiproPat?.status === 'ready' &&
  wiproPat?.verificationStatus === 'VERIFIED' &&
  wiproCat?.status === 'ready' &&
  wiproCat?.verificationStatus === 'VERIFIED';
console.log(`Promotion State Result: ${promotionStatePass ? 'PASS' : 'FAIL'}\n`);

// 2. Playability Test
console.log('--- 2. PLAYABILITY TEST VIA RUNTIME CATALOGUE ---');
console.log(`Catalogue Test Title: ${wiproCat?.title}`);
console.log(`Catalogue Questions Count: ${wiproCat?.questions?.length} (Expected: 48)`);
const uniqueQIds = new Set((wiproCat?.questions || []).map(q => q.id));
console.log(`Unique Question IDs: ${uniqueQIds.size}/48`);

const playabilityPass = 
  wiproCat !== undefined &&
  wiproCat.status === 'ready' &&
  wiproCat.questions !== undefined &&
  wiproCat.questions.length === 48 &&
  uniqueQIds.size === 48;
console.log(`Playability Test Result: ${playabilityPass ? 'PASS' : 'FAIL'}\n`);

// 3. Runtime Section Distribution
console.log('--- 3. RUNTIME SECTION DISTRIBUTION ---');
const fullBank = [
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

const assembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_candidate_playability_test',
  blueprint: wiproBp!,
  questionBank: fullBank,
  previouslyAttemptedQuestionIds: [],
  allowPartialReuseWhenExhausted: true,
});

console.log(`Total Selected: ${assembly.totalSelected}/48`);
let quantCount = 0;
let verbalCount = 0;
let logicalCount = 0;
assembly.sectionResults.forEach(sr => {
  console.log(`  Section: ${sr.sectionName} -> Selected=${sr.selectedQuestions.length}/${sr.requiredCount}, Fresh=${sr.freshSelectedCount}`);
  if (sr.sectionId === 'sec_wip_quant') quantCount = sr.selectedQuestions.length;
  if (sr.sectionId === 'sec_wip_verbal') verbalCount = sr.selectedQuestions.length;
  if (sr.sectionId === 'sec_wip_logical') logicalCount = sr.selectedQuestions.length;
});

const sectionDistPass = quantCount === 16 && verbalCount === 18 && logicalCount === 14;
console.log(`Section Distribution Result: ${sectionDistPass ? 'PASS' : 'FAIL'}\n`);

// 4. Foundation Q+V+L Fresh No-Reuse Test
console.log('--- 4. FOUNDATION Q+V+L FRESH NO-REUSE TEST ---');
const seenFoundation75 = [
  ...quantQuestions.map(q => q.id),
  ...verbalQuestions.map(q => q.id),
  ...logicalQuestions.map(q => q.id),
];

const expAssembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_exp_candidate_test',
  blueprint: wiproBp!,
  questionBank: fullBank,
  previouslyAttemptedQuestionIds: seenFoundation75,
  allowPartialReuseWhenExhausted: false,
});

const expSelected = expAssembly.sectionResults.flatMap(sr => sr.selectedQuestions);
const seenSet = new Set(seenFoundation75);
const contamination = expSelected.filter(q => seenSet.has(q.id)).length;

console.log(`Experienced Candidate: Selected=${expAssembly.totalSelected}/48, Fresh=${expAssembly.freshCount}, Reused=${expAssembly.reusedCount}, Contamination=${contamination}`);
const expPass = expAssembly.totalSelected === 48 && expAssembly.freshCount === 48 && expAssembly.reusedCount === 0 && contamination === 0;
console.log(`Foundation No-Reuse Test Result: ${expPass ? 'PASS' : 'FAIL'}\n`);

// 5. Submission & Grading Test (+10 / -2)
console.log('--- 5. SUBMISSION & GRADING TEST ---');
const testCandidate = db.loginOrRegister('prod_candidate_wipro@firstround.com', 'Production Candidate');
const catalogueQuestions = db.getQuestionsForTest('cat_company_wipro');
const simResponses = catalogueQuestions.map((q, idx) => {
  if (idx < 40) {
    return { questionId: q.id, selectedOption: (q as import('./src/types').MCQQuestion).correctOption, timeSpentSeconds: 50 };
  } else if (idx < 45) {
    const wrongOpt = (q as import('./src/types').MCQQuestion).options?.find(o => o.id !== (q as import('./src/types').MCQQuestion).correctOption)?.id || 'B';
    return { questionId: q.id, selectedOption: wrongOpt, timeSpentSeconds: 55 };
  } else {
    return { questionId: q.id, selectedOption: null, timeSpentSeconds: 0 };
  }
});

const attempt = db.submitTest({
  userId: testCandidate.id,
  testSeriesId: 'cat_company_wipro',
  testInstanceId: 'inst_wipro_prod_attempt',
  mode: 'exam',
  responses: simResponses,
  timeTakenSeconds: 2400,
});

console.log(`Attempt Submitted: ID=${attempt.id}, Total=${attempt.totalQuestions}, Attempted=${attempt.attemptedQuestions}, Correct=${attempt.correctCount}, Incorrect=${attempt.incorrectCount}, Score=${attempt.scorePoints}`);
const retrieved = db.getAttemptById(attempt.id);
const userAttempts = db.getAttemptsForUser(testCandidate.id);
const weakQuestions = db.getWeakQuestionsForUser(testCandidate.id);

console.log(`Retrieved Attempt ID: ${retrieved?.id}`);
console.log(`User Attempts Count: ${userAttempts.length}`);
console.log(`Revision Vault Weak Questions Count: ${weakQuestions.length} (Expected: 5)`);

const submissionPass = 
  attempt.scorePoints === 390 &&
  retrieved !== undefined &&
  userAttempts.length === 1 &&
  weakQuestions.length === 5;
console.log(`Submission & Grading Result: ${submissionPass ? 'PASS' : 'FAIL'}\n`);

// 6. Regression & Isolation Check
console.log('--- 6. REGRESSION & ISOLATION CHECK ---');
const foundationTests = [
  db.getTestById('cat_foundation_quant', false),
  db.getTestById('cat_foundation_logical', false),
  db.getTestById('cat_foundation_verbal', false),
  db.getTestById('cat_foundation_di', false),
  db.getTestById('cat_foundation_pseudocode', false),
];
const allFoundationReady = foundationTests.every(t => t?.status === 'ready' && t?.verificationStatus === 'VERIFIED');
console.log(`All 5 Foundation Tests Remain ready / VERIFIED: ${allFoundationReady ? 'YES' : 'NO'}`);

const unpromotedCompanyTests = [
  db.getTestById('cat_company_accenture', false),
  db.getTestById('cat_company_cognizant', false),
  db.getTestById('cat_company_infosys', false),
  db.getTestById('cat_company_tcs', false),
];
const otherCompaniesIsolated = unpromotedCompanyTests.every(t => t?.status === 'coming_soon');
console.log(`Other Company Assessments Safely Isolated (coming_soon): ${otherCompaniesIsolated ? 'YES' : 'NO'}`);

// 7. Full Bank Integrity
console.log('--- 7. FULL BANK INTEGRITY (216 questions) ---');
const dupDetector = new DuplicateDetection();
let dupeCollisions = 0;
for (let i = 0; i < fullBank.length; i++) {
  for (let j = i + 1; j < fullBank.length; j++) {
    if (dupDetector.normalizeQuestionText(fullBank[i].questionText) === dupDetector.normalizeQuestionText(fullBank[j].questionText)) {
      dupeCollisions++;
    }
  }
}
console.log(`Total System Questions: ${fullBank.length} (Expected: 216)`);
console.log(`Duplicate Collisions: ${dupeCollisions}`);

const regressionPass = allFoundationReady && otherCompaniesIsolated && fullBank.length === 216 && dupeCollisions === 0;
console.log(`Regression & Isolation Result: ${regressionPass ? 'PASS' : 'FAIL'}\n`);

console.log('================================================================');
console.log('PHASE 19D POST-PROMOTION VALIDATION COMPLETE');
console.log('================================================================');

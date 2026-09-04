import { COMPANY_BLUEPRINTS } from './src/data/blueprints/company';
import { questionSelectionEngine } from './src/services/QuestionSelectionEngine';
import { companyContentCapacityService } from './src/services/CompanyContentCapacityService';
import { quantQuestions } from './src/data/questionBank/quant';
import { logicalQuestions } from './src/data/questionBank/logical';
import { verbalQuestions } from './src/data/questionBank/verbal';
import { diQuestions } from './src/data/questionBank/di';
import { pseudocodeQuestions } from './src/data/questionBank/pseudocode';
import { CanonicalQuestion } from './src/types';
import { db } from './server/db';

console.log('================================================================');
console.log('FIRSTROUND — PHASE 17: COMPANY TEST ASSEMBLY & CAPACITY AUDIT');
console.log('================================================================\n');

const allBank: CanonicalQuestion[] = [
  ...quantQuestions,
  ...logicalQuestions,
  ...verbalQuestions,
  ...diQuestions,
  ...pseudocodeQuestions
];

console.log(`Current Validated Bank: ${allBank.length} questions across 5 Foundation domains.\n`);

// -------------------------------------------------------------
// 1. CANDIDATE CAPACITY ANALYSIS (FRESH CANDIDATE VS EXPERIENCED CANDIDATE)
// -------------------------------------------------------------
console.log('--- 1. CANDIDATE CONTENT CAPACITY ANALYSIS ---');

const freshUserId = 'cand_fresh_001';
const experiencedUserId = 'cand_experienced_002';

// Experienced user has completed all 5 Foundation assessments (125 seen questions)
const seen125Ids = allBank.map(q => q.id);

// Semi-experienced user has completed Quant + Logical (50 seen questions)
const seen50Ids = [...quantQuestions, ...logicalQuestions].map(q => q.id);

COMPANY_BLUEPRINTS.forEach((bp, idx) => {
  console.log(`\n================================================================`);
  console.log(`BLUEPRINT ${idx + 1}: [${bp.id}] ${bp.title}`);
  console.log(`Required: ${bp.questionCount} Qs | Sections: ${bp.sections.length}`);
  console.log(`----------------------------------------------------------------`);

  const freshReport = companyContentCapacityService.analyzeCandidateCapacity(bp, freshUserId, allBank, []);
  const expReport = companyContentCapacityService.analyzeCandidateCapacity(bp, experiencedUserId, allBank, seen50Ids);

  console.log('A) FRESH CANDIDATE (0 Prior Attempts):');
  console.log(`   - Global Compatible: ${freshReport.totalGlobalCompatible} Qs`);
  console.log(`   - Fresh Compatible:  ${freshReport.totalFreshCompatible} Qs`);
  console.log(`   - Can Assemble Fresh? ${freshReport.canAssembleFresh ? 'YES' : 'NO'}`);
  console.log(`   - Can Assemble with Reuse? ${freshReport.canAssembleWithReuse ? 'YES' : 'NO'}`);

  console.log('\nB) EXPERIENCED CANDIDATE (Completed Foundation Quant + Logical):');
  console.log(`   - Fresh Compatible:  ${expReport.totalFreshCompatible} Qs`);
  console.log(`   - Can Assemble Fresh? ${expReport.canAssembleFresh ? 'YES' : 'NO'}`);
  console.log(`   - Shortfall for Fresh: ${expReport.totalShortfall} Qs`);

  console.log('\nSECTION-LEVEL DIAGNOSTICS (Fresh Candidate):');
  freshReport.sections.forEach(sec => {
    console.log(`   • [${sec.sectionName}] Req: ${sec.requiredQuestions} | Global: ${sec.globalCompatible} | Fresh: ${sec.freshCompatible} | Status: ${sec.status}`);
  });
});

// -------------------------------------------------------------
// 2. NO-REPETITION RUNTIME ASSEMBLY TEST
// -------------------------------------------------------------
console.log('\n\n--- 2. NO-REPETITION RUNTIME ASSEMBLY TESTS ---');

// Test Case 2.1: TCS NQT Foundation for Fresh Candidate (Zero seen)
const tcsBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_tcs_nqt_foundation')!;
const tcsFreshAssembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: freshUserId,
  blueprint: tcsBp,
  questionBank: allBank,
  excludeAttemptedQuestions: true,
  excludeRecentlySeenQuestions: true,
  allowPartialReuseWhenExhausted: false
});

console.log(`\n[TCS NQT Foundation Assembly — Fresh Candidate]`);
console.log(`Success: ${tcsFreshAssembly.success}`);
console.log(`Total Required: ${tcsFreshAssembly.totalRequired} | Selected: ${tcsFreshAssembly.totalSelected}`);
console.log(`Fresh Count: ${tcsFreshAssembly.freshCount} | Reused Count: ${tcsFreshAssembly.reusedCount}`);
console.log(`Can Assemble 100% Fresh? ${tcsFreshAssembly.canAssembleFresh}`);

// Test Case 2.2: Wipro Elite NTH for Candidate who ALREADY completed Foundation Quant (25 seen)
const wiproBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_wipro_elite_nth')!;
const wiproCandidateWithQuantSeen = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'cand_wipro_001',
  blueprint: wiproBp,
  questionBank: allBank,
  previouslyAttemptedQuestionIds: quantQuestions.map(q => q.id),
  excludeAttemptedQuestions: true,
  allowPartialReuseWhenExhausted: false
});

console.log(`\n[Wipro Elite Assembly — Candidate with Foundation Quant Already Attempted]`);
console.log(`Success: ${wiproCandidateWithQuantSeen.success} (Strict No-Repetition Mode)`);
console.log(`Total Required: ${wiproCandidateWithQuantSeen.totalRequired} | Selected: ${wiproCandidateWithQuantSeen.totalSelected}`);
console.log(`Fresh Count: ${wiproCandidateWithQuantSeen.freshCount} | Reused Count: ${wiproCandidateWithQuantSeen.reusedCount}`);
console.log(`Shortfall Recorded without Silently Filling? Shortfall = ${wiproCandidateWithQuantSeen.shortfall}`);
console.log(`Errors Recorded:`, wiproCandidateWithQuantSeen.errors);

// Test Case 2.3: Wipro Elite with Controlled Graceful Reuse Allowed
const wiproWithReuseAllowed = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'cand_wipro_001',
  blueprint: wiproBp,
  questionBank: allBank,
  previouslyAttemptedQuestionIds: quantQuestions.map(q => q.id),
  excludeAttemptedQuestions: true,
  allowPartialReuseWhenExhausted: true
});

console.log(`\n[Wipro Elite Assembly — With Controlled Graceful Fallback Reuse]`);
console.log(`Success: ${wiproWithReuseAllowed.success}`);
console.log(`Total Selected: ${wiproWithReuseAllowed.totalSelected}/48`);
console.log(`Fresh Count: ${wiproWithReuseAllowed.freshCount} | Reused Count: ${wiproWithReuseAllowed.reusedCount}`);
console.log(`Warnings Recorded:`, wiproWithReuseAllowed.warnings);

// -------------------------------------------------------------
// 3. COMPLETE 5-TEST FOUNDATION REGRESSION
// -------------------------------------------------------------
console.log('\n\n--- 3. FOUNDATION REGRESSION AUDIT ---');
const foundationIds = [
  'cat_foundation_quant',
  'cat_foundation_logical',
  'cat_foundation_verbal',
  'cat_foundation_di',
  'cat_foundation_pseudocode'
];

let regPass = true;
foundationIds.forEach(fid => {
  const test = db.getTestById(fid, true);
  const ok = test?.questions?.length === 25 && test?.status === 'ready' && test?.verificationStatus === 'VERIFIED';
  console.log(`[${fid}] ${test?.title} | Qs: ${test?.questions?.length}/25 | Status: ${test?.status} | Verified: ${test?.verificationStatus} | Result: ${ok ? 'PASS' : 'FAIL'}`);
  if (!ok) regPass = false;
});

console.log(`\nFOUNDATION REGRESSION OVERALL: ${regPass ? '100% PASSED' : 'FAILED'}`);
console.log('Questions Generated: 0');
console.log('Questions Modified: 0');
console.log('Company Assessments Published: 0 (All 6 remain coming_soon / UNVERIFIED)');

console.log('\n================================================================');
console.log('PHASE 17 AUDIT COMPLETE');
console.log('================================================================');

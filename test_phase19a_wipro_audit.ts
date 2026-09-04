import { CompanyContentCapacityService } from './src/services/CompanyContentCapacityService';
import { questionSelectionEngine } from './src/services/QuestionSelectionEngine';
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
import { COMPANY_BLUEPRINTS } from './src/data/blueprints/company';
import { COMPANY_PATTERNS_REGISTRY } from './src/data/companyPatterns/registry';
import { db } from './server/db';

console.log('================================================================');
console.log('PHASE 19A: WIPRO ELITE NTH CANDIDATE CAPACITY AUDIT');
console.log('================================================================\n');

// 1. Foundation Safety & Integrity (125 questions)
const totalFoundation = quantQuestions.length + logicalQuestions.length + verbalQuestions.length + diQuestions.length + pseudocodeQuestions.length;
console.log('--- 1. FOUNDATION QUESTION BANK INTEGRITY ---');
console.log(`Quant count: ${quantQuestions.length} (Expected: 25)`);
console.log(`Logical count: ${logicalQuestions.length} (Expected: 25)`);
console.log(`Verbal count: ${verbalQuestions.length} (Expected: 25)`);
console.log(`DI count: ${diQuestions.length} (Expected: 25)`);
console.log(`Pseudocode count: ${pseudocodeQuestions.length} (Expected: 25)`);
console.log(`Total Foundation questions: ${totalFoundation} (Expected: 125)`);

const foundationPassed = 
  quantQuestions.length === 25 &&
  logicalQuestions.length === 25 &&
  verbalQuestions.length === 25 &&
  diQuestions.length === 25 &&
  pseudocodeQuestions.length === 25;

console.log(`Foundation Safety Regression: ${foundationPassed ? 'PASS' : 'FAIL'}\n`);

// 2. Full Active Question Bank Assembly
const fullQuestionBank = [
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
];

console.log(`Total Pool in System: ${fullQuestionBank.length} questions`);

// 3. Wipro Blueprint
const wiproBp = COMPANY_BLUEPRINTS.find((b) => b.id === 'bp_company_wipro_elite_nth')!;
console.log(`\nTarget Blueprint: [${wiproBp.id}] "${wiproBp.title}"`);
console.log(`Total Questions Required: ${wiproBp.questionCount}`);
wiproBp.sections.forEach((s) => {
  console.log(`- Section [${s.id}]: "${s.name}" -> Required: ${s.questionCount}, Topics: ${s.topics.join(', ')}`);
});

// 4. Candidate Scenarios Analysis
const capacityService = new CompanyContentCapacityService();

const scenarios = [
  {
    name: 'Scenario A: Fresh Candidate (0 previous attempts)',
    seenIds: [],
  },
  {
    name: 'Scenario B: Candidate completed Foundation Quant (25 Quant seen)',
    seenIds: quantQuestions.map((q) => q.id),
  },
  {
    name: 'Scenario C: Candidate completed Foundation Verbal (25 Verbal seen)',
    seenIds: verbalQuestions.map((q) => q.id),
  },
  {
    name: 'Scenario D: Candidate completed Foundation Logical (25 Logical seen)',
    seenIds: logicalQuestions.map((q) => q.id),
  },
  {
    name: 'Scenario E: Candidate completed Foundation Quant + Verbal + Logical (75 Qs seen)',
    seenIds: [
      ...quantQuestions.map((q) => q.id),
      ...verbalQuestions.map((q) => q.id),
      ...logicalQuestions.map((q) => q.id),
    ],
  },
  {
    name: 'Scenario F: Candidate completed all 5 Foundation assessments (125 Qs seen)',
    seenIds: [
      ...quantQuestions.map((q) => q.id),
      ...verbalQuestions.map((q) => q.id),
      ...logicalQuestions.map((q) => q.id),
      ...diQuestions.map((q) => q.id),
      ...pseudocodeQuestions.map((q) => q.id),
    ],
  },
];

console.log('\n--- 2. SCENARIO ANALYSIS ---');
scenarios.forEach((sc) => {
  console.log(`\n========================================================`);
  console.log(`${sc.name}`);
  console.log(`Total Seen Question IDs: ${sc.seenIds.length}`);
  console.log(`========================================================`);

  const report = capacityService.analyzeCandidateCapacity(wiproBp, 'test_user', fullQuestionBank, sc.seenIds);

  console.log(`Can Assemble Fresh: ${report.canAssembleFresh ? 'YES' : 'NO'}`);
  console.log(`Can Assemble With Reuse: ${report.canAssembleWithReuse ? 'YES' : 'NO'}`);
  console.log(`Total Required: ${report.totalRequired} | Total Fresh Compatible: ${report.totalFreshCompatible} | Total Shortfall: ${report.totalShortfall}`);

  report.sections.forEach((sec) => {
    console.log(`  * Section: ${sec.sectionName}`);
    console.log(`      Required: ${sec.requiredQuestions}`);
    console.log(`      Total Compatible (Global): ${sec.globalCompatible}`);
    console.log(`      Fresh for Candidate: ${sec.freshCompatible}`);
    console.log(`      Previously Seen: ${sec.previouslySeenCompatible}`);
    console.log(`      Shortfall: ${sec.shortfall}`);
    console.log(`      Status: ${sec.status}`);
  });
});

// Scenario G: Candidate has previously attempted 1 complete Wipro test (48 Wipro Qs selected)
console.log(`\n========================================================`);
console.log(`Scenario G: Candidate has previously completed 1 Wipro attempt`);
console.log(`========================================================`);

// Assemble first Wipro attempt
const firstWiproAssembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_wipro_attempt_1',
  blueprint: wiproBp,
  questionBank: fullQuestionBank,
  previouslyAttemptedQuestionIds: [],
  allowPartialReuseWhenExhausted: true,
});

const firstWiproSelectedIds = firstWiproAssembly.testInstance?.questions.map((q) => q.id) || 
  firstWiproAssembly.sectionResults.flatMap((s) => s.selectedQuestions.map((q) => q.id));
console.log(`Attempt 1 Questions Selected: ${firstWiproSelectedIds.length}`);

// Capacity for Attempt 2 (Attempt 1 seen)
const reportAttempt2 = capacityService.analyzeCandidateCapacity(
  wiproBp,
  'usr_wipro_attempt_2',
  fullQuestionBank,
  firstWiproSelectedIds
);

console.log(`Attempt 2 - Can Assemble Fresh: ${reportAttempt2.canAssembleFresh ? 'YES' : 'NO'}`);
console.log(`Attempt 2 - Can Assemble With Reuse: ${reportAttempt2.canAssembleWithReuse ? 'YES' : 'NO'}`);
reportAttempt2.sections.forEach((sec) => {
  console.log(`  * Section: ${sec.sectionName}`);
  console.log(`      Required: ${sec.requiredQuestions}`);
  console.log(`      Total Compatible (Global): ${sec.globalCompatible}`);
  console.log(`      Fresh for Candidate: ${sec.freshCompatible}`);
  console.log(`      Previously Seen: ${sec.previouslySeenCompatible}`);
  console.log(`      Shortfall: ${sec.shortfall}`);
  console.log(`      Status: ${sec.status}`);
});

// Scenario H: Candidate completed Foundation Q+V+L AND Attempt 1 Wipro
console.log(`\n========================================================`);
console.log(`Scenario H: Foundation (Q+V+L) completed + Attempt 1 Wipro completed`);
console.log(`========================================================`);
const foundationAndWiproSeen = Array.from(
  new Set([
    ...quantQuestions.map((q) => q.id),
    ...verbalQuestions.map((q) => q.id),
    ...logicalQuestions.map((q) => q.id),
    ...firstWiproSelectedIds,
  ])
);

const reportAttempt2AfterFoundation = capacityService.analyzeCandidateCapacity(
  wiproBp,
  'usr_wipro_foundation_attempt_2',
  fullQuestionBank,
  foundationAndWiproSeen
);

reportAttempt2AfterFoundation.sections.forEach((sec) => {
  console.log(`  * Section: ${sec.sectionName}`);
  console.log(`      Required: ${sec.requiredQuestions}`);
  console.log(`      Total Compatible (Global): ${sec.globalCompatible}`);
  console.log(`      Fresh for Candidate: ${sec.freshCompatible}`);
  console.log(`      Previously Seen: ${sec.previouslySeenCompatible}`);
  console.log(`      Shortfall: ${sec.shortfall}`);
  console.log(`      Status: ${sec.status}`);
});

// 5. Blueprint & Publishing Gate Status
console.log('\n--- 3. PUBLISHING GATE STATUS ---');
const wiproPattern = COMPANY_PATTERNS_REGISTRY.find((p) => p.id === 'pat_wipro_elite_nth');
const catWiproTest = db.getTestById('cat_company_wipro', false);

console.log(`Wipro Blueprint ID: ${wiproBp?.id}`);
console.log(`Blueprint Verification Status: ${wiproBp?.verificationStatus} (Expected: UNVERIFIED)`);
console.log(`Pattern Status in Registry: ${wiproPattern?.status} (Expected: coming_soon)`);
console.log(`Catalogue Playability Status in DB: ${catWiproTest?.status} (Expected: coming_soon)`);

const blueprintGateSafe = 
  wiproBp?.verificationStatus === 'UNVERIFIED' &&
  wiproPattern?.status === 'coming_soon' &&
  catWiproTest?.status === 'coming_soon';

console.log(`Publishing Gate Unpromoted & Safe: ${blueprintGateSafe ? 'PASS' : 'FAIL'}`);

console.log('\n================================================================');
console.log('PHASE 19A AUDIT COMPLETE');
console.log('================================================================');

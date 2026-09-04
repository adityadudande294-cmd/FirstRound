import { CompanyContentCapacityService } from './src/services/CompanyContentCapacityService';
import { questionSelectionEngine } from './src/services/QuestionSelectionEngine';
import { ContentQAEngine } from './src/services/ContentQAEngine';
import { DuplicateDetection } from './src/services/DuplicateDetection';
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
import { db } from './server/db';

console.log('================================================================');
console.log('PHASE 19B VERIFICATION SUITE — WIPRO ELITE NTH CONTENT EXPANSION');
console.log('================================================================\n');

// 1. Foundation Safety & Integrity (125 questions)
console.log('--- 1. FOUNDATION QUESTION BANK INTEGRITY ---');
console.log(`Quant count: ${quantQuestions.length} (Expected: 25)`);
console.log(`Logical count: ${logicalQuestions.length} (Expected: 25)`);
console.log(`Verbal count: ${verbalQuestions.length} (Expected: 25)`);
console.log(`DI count: ${diQuestions.length} (Expected: 25)`);
console.log(`Pseudocode count: ${pseudocodeQuestions.length} (Expected: 25)`);
const totalFoundation = quantQuestions.length + logicalQuestions.length + verbalQuestions.length + diQuestions.length + pseudocodeQuestions.length;
console.log(`Total Foundation questions: ${totalFoundation} (Expected: 125)`);
const foundationPassed = 
  quantQuestions.length === 25 &&
  logicalQuestions.length === 25 &&
  verbalQuestions.length === 25 &&
  diQuestions.length === 25 &&
  pseudocodeQuestions.length === 25;
console.log(`Foundation Safety Regression: ${foundationPassed ? 'PASS' : 'FAIL'}\n`);

// 2. Prior Company Banks Integrity
console.log('--- 2. PRIOR COMPANY BANKS INTEGRITY ---');
console.log(`Accenture count: ${accentureQuestions.length} (Expected: 22)`);
console.log(`Cognizant count: ${cognizantQuestions.length} (Expected: 14)`);
console.log(`Infosys count: ${infosysQuestions.length} (Expected: 7)`);
console.log(`TCS Advanced Quant/Reasoning count: ${tcsAdvancedQuestions.length} (Expected: 20)`);
console.log(`TCS Advanced Coding count: ${tcsCodingProblems.length} (Expected: 2)`);
const priorBankTotal = accentureQuestions.length + cognizantQuestions.length + infosysQuestions.length + tcsAdvancedQuestions.length + tcsCodingProblems.length;
console.log(`Total Prior Company Questions: ${priorBankTotal} (Expected: 65)`);
console.log(`Prior Banks Safety: ${priorBankTotal === 65 ? 'PASS' : 'FAIL'}\n`);

// 3. Wipro Question Bank Schema & Quality Audit
console.log('--- 3. WIPRO QUESTIONS CREATION & BREAKDOWN ---');
console.log(`Wipro Questions Created: ${wiproQuestions.length} (Expected: 26)`);

const qaEngine = new ContentQAEngine();
const qaReport = qaEngine.generateFullQAReport(wiproQuestions);

console.log(`Passed Validation: ${qaReport.passedValidation}/${qaReport.totalQuestions}`);
console.log(`Failed Validation: ${qaReport.failedValidation}`);
console.log(`Difficulty Breakdown:`, qaReport.difficultyDistribution);
console.log(`Topic Coverage:`, qaReport.topicCoverage);
console.log(`Provenance:`, qaReport.provenanceDistribution);

// 4. Cross-Bank Duplicate Detection against ALL Existing Questions (190 items)
console.log('\n--- 4. CROSS-BANK DUPLICATE DETECTION ---');
const existing190Questions = [
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

const dupDetector = new DuplicateDetection();
let duplicateFound = false;

// Check ID uniqueness
const allIds = new Set<string>();
[...existing190Questions, ...wiproQuestions].forEach(q => {
  if (allIds.has(q.id)) {
    console.error(`ERROR: Duplicate Question ID found: ${q.id}`);
    duplicateFound = true;
  }
  allIds.add(q.id);
});

// Check Wipro questions against all existing questions
wiproQuestions.forEach(wq => {
  if (dupDetector.isDuplicate(wq, existing190Questions)) {
    console.error(`ERROR: Wipro question ${wq.id} collided with existing bank!`);
    duplicateFound = true;
  }
});

console.log(`Cross-Bank & Duplicate Check: ${!duplicateFound ? 'PASS (0 collisions)' : 'FAIL'}\n`);

// 5. Full Question Pool Assembly (216 questions total)
const full216Bank = [...existing190Questions, ...wiproQuestions];
console.log(`Total System Bank after Phase 19B: ${full216Bank.length} questions`);

// 6. Capacity Audit & Critical Acceptance Tests
console.log('\n--- 5. CAPACITY AUDIT & SCENARIOS ---');
const capacityService = new CompanyContentCapacityService();
const wiproBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_wipro_elite_nth')!;

// 6a. Fresh Candidate Scenario
console.log('Test Scenario A: Fresh Candidate (0 previous attempts)');
const freshCapReport = capacityService.analyzeCandidateCapacity(wiproBp, 'usr_fresh', full216Bank, []);
console.log(`  Can Assemble Fresh: ${freshCapReport.canAssembleFresh ? 'YES' : 'NO'}`);
console.log(`  Total Required: ${freshCapReport.totalRequired} | Total Fresh: ${freshCapReport.totalFreshCompatible} | Shortfall: ${freshCapReport.totalShortfall}`);
freshCapReport.sections.forEach(s => {
  console.log(`    - ${s.sectionName}: Required=${s.requiredQuestions}, Fresh=${s.freshCompatible}, Shortfall=${s.shortfall}, Status=${s.status}`);
});

const freshSelection = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_fresh_test',
  blueprint: wiproBp,
  questionBank: full216Bank,
  previouslyAttemptedQuestionIds: [],
  allowPartialReuseWhenExhausted: false,
});
console.log(`  Assembly Result: Success=${freshSelection.success}, TotalSelected=${freshSelection.totalSelected}/${freshSelection.totalRequired}, Fresh=${freshSelection.freshCount}, Reused=${freshSelection.reusedCount}`);

// 6b. CRITICAL ACCEPTANCE TEST: Candidate with Foundation Q + V + L completed (75 Qs seen)
console.log('\nTest Scenario E (CRITICAL): Candidate completed Foundation Quant + Verbal + Logical');
const seenFoundationQVL = [
  ...quantQuestions.map(q => q.id),
  ...verbalQuestions.map(q => q.id),
  ...logicalQuestions.map(q => q.id),
];

const qvlCapReport = capacityService.analyzeCandidateCapacity(wiproBp, 'usr_qvl_candidate', full216Bank, seenFoundationQVL);
console.log(`  Can Assemble Fresh: ${qvlCapReport.canAssembleFresh ? 'YES' : 'NO'}`);
console.log(`  Total Required: ${qvlCapReport.totalRequired} | Total Fresh: ${qvlCapReport.totalFreshCompatible} | Shortfall: ${qvlCapReport.totalShortfall}`);
qvlCapReport.sections.forEach(s => {
  console.log(`    - ${s.sectionName}: Required=${s.requiredQuestions}, Fresh=${s.freshCompatible}, Shortfall=${s.shortfall}, Status=${s.status}`);
});

const qvlSelection = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_qvl_candidate_test',
  blueprint: wiproBp,
  questionBank: full216Bank,
  previouslyAttemptedQuestionIds: seenFoundationQVL,
  allowPartialReuseWhenExhausted: false,
});

console.log(`  Critical Assembly Result: Success=${qvlSelection.success}, TotalSelected=${qvlSelection.totalSelected}/${qvlSelection.totalRequired}, Fresh=${qvlSelection.freshCount}, Reused=${qvlSelection.reusedCount}`);

// 7. Blueprint & Publishing Gate Status
console.log('\n--- 6. PUBLISHING GATE STATUS ---');
const wiproPattern = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_wipro_elite_nth');
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
console.log('PHASE 19B VERIFICATION COMPLETE');
console.log('================================================================');

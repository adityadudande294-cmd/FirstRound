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
import { CompanyContentCapacityService } from './src/services/CompanyContentCapacityService';
import { ContentQAEngine } from './src/services/ContentQAEngine';
import { DuplicateDetection } from './src/services/DuplicateDetection';
import { TAXONOMY } from './src/data/taxonomy';
import { db } from './server/db';

console.log('================================================================');
console.log('PHASE 19B.1: WIPRO ELITE NTH STRICT VERIFICATION & AUDIT');
console.log('================================================================\n');

// 1. Question Count & ID Integrity Audit
console.log('--- 1. QUESTION COUNT & ID INTEGRITY AUDIT ---');
console.log(`Wipro Questions Total: ${wiproQuestions.length} (Expected: 26)`);

const expectedIds = Array.from({ length: 26 }, (_, i) => `q_wipro_${String(i + 1).padStart(3, '0')}`);
const actualIds = wiproQuestions.map(q => q.id);

const missingIds = expectedIds.filter(id => !actualIds.includes(id));
const excessIds = actualIds.filter(id => !expectedIds.includes(id));
const uniqueIds = new Set(actualIds);

console.log(`Unique IDs Count: ${uniqueIds.size}`);
console.log(`Missing IDs: ${missingIds.length > 0 ? missingIds.join(', ') : 'None'}`);
console.log(`Excess IDs: ${excessIds.length > 0 ? excessIds.join(', ') : 'None'}`);
console.log(`ID Continuity (q_wipro_001 to q_wipro_026): ${missingIds.length === 0 && excessIds.length === 0 ? 'PASS' : 'FAIL'}`);

// Section counts
const quantCount = wiproQuestions.filter(q => q.skill === TAXONOMY.skills.QUANTITATIVE_APTITUDE).length;
const verbalCount = wiproQuestions.filter(q => q.skill === TAXONOMY.skills.VERBAL_ABILITY).length;
const logicalCount = wiproQuestions.filter(q => q.skill === TAXONOMY.skills.LOGICAL_REASONING).length;

console.log(`Section Distribution: Quant=${quantCount} (Expected: 7), Verbal=${verbalCount} (Expected: 18), Logical=${logicalCount} (Expected: 1)`);
const sectionCountPass = quantCount === 7 && verbalCount === 18 && logicalCount === 1;
console.log(`Section Distribution Audit: ${sectionCountPass ? 'PASS' : 'FAIL'}\n`);

// 2. Difficulty Consistency Audit
console.log('--- 2. DIFFICULTY CONSISTENCY AUDIT ---');
const totalDiff = { Easy: 0, Medium: 0, Hard: 0 };
const quantDiff = { Easy: 0, Medium: 0, Hard: 0 };
const verbalDiff = { Easy: 0, Medium: 0, Hard: 0 };
const logicalDiff = { Easy: 0, Medium: 0, Hard: 0 };

wiproQuestions.forEach(q => {
  totalDiff[q.difficulty]++;
  if (q.skill === TAXONOMY.skills.QUANTITATIVE_APTITUDE) quantDiff[q.difficulty]++;
  if (q.skill === TAXONOMY.skills.VERBAL_ABILITY) verbalDiff[q.difficulty]++;
  if (q.skill === TAXONOMY.skills.LOGICAL_REASONING) logicalDiff[q.difficulty]++;
});

console.log(`Total Difficulty Distribution: Easy=${totalDiff.Easy}, Medium=${totalDiff.Medium}, Hard=${totalDiff.Hard}`);
console.log(`  - Quant Difficulty: Easy=${quantDiff.Easy} (Exp: 1), Medium=${quantDiff.Medium} (Exp: 5), Hard=${quantDiff.Hard} (Exp: 1)`);
console.log(`  - Verbal Difficulty: Easy=${verbalDiff.Easy} (Exp: 4), Medium=${verbalDiff.Medium} (Exp: 11), Hard=${verbalDiff.Hard} (Exp: 3)`);
console.log(`  - Logical Difficulty: Easy=${logicalDiff.Easy} (Exp: 0), Medium=${logicalDiff.Medium} (Exp: 1), Hard=${logicalDiff.Hard} (Exp: 0)`);

const diffPass = 
  totalDiff.Easy === 5 && totalDiff.Medium === 17 && totalDiff.Hard === 4 &&
  quantDiff.Easy === 1 && quantDiff.Medium === 5 && quantDiff.Hard === 1 &&
  verbalDiff.Easy === 4 && verbalDiff.Medium === 11 && verbalDiff.Hard === 3 &&
  logicalDiff.Easy === 0 && logicalDiff.Medium === 1 && logicalDiff.Hard === 0;

console.log(`Difficulty Consistency: ${diffPass ? 'PASS (Matches 5 Easy / 17 Med / 4 Hard)' : 'FAIL'}\n`);

// 3. Section Compatibility & Taxonomy Audit
console.log('--- 3. TAXONOMY, METADATA & SECTION COMPATIBILITY AUDIT ---');
const wiproBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_wipro_elite_nth')!;
const qaEngine = new ContentQAEngine();
const qaReport = qaEngine.generateFullQAReport(wiproQuestions);

console.log(`QA Engine Total Audited: ${qaReport.totalQuestions}`);
console.log(`Passed Validation: ${qaReport.passedValidation}/${qaReport.totalQuestions}`);
console.log(`Failed Validation: ${qaReport.failedValidation}`);
console.log(`Missing Metadata: ${qaReport.missingMetadataCount}`);
console.log(`Provenance:`, qaReport.provenanceDistribution);

let metadataErrors = 0;
wiproQuestions.forEach(q => {
  if (q.questionType !== 'MCQ_SINGLE') {
    console.error(`Error: ${q.id} is not MCQ_SINGLE`);
    metadataErrors++;
  }
  if (!(q as import('./src/types').MCQQuestion).options || (q as import('./src/types').MCQQuestion).options.length !== 4) {
    console.error(`Error: ${q.id} does not have 4 options`);
    metadataErrors++;
  }
  const optIds = (q as import('./src/types').MCQQuestion).options?.map(o => o.id).join('');
  if (optIds !== 'ABCD') {
    console.error(`Error: ${q.id} options are not A, B, C, D`);
    metadataErrors++;
  }
  const optTexts = new Set((q as import('./src/types').MCQQuestion).options?.map(o => o.text.trim()));
  if (optTexts.size !== 4) {
    console.error(`Error: ${q.id} has duplicate option texts`);
    metadataErrors++;
  }
  if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer as string)) {
    console.error(`Error: ${q.id} correctAnswer is invalid`);
    metadataErrors++;
  }
  if (!q.explanation || q.explanation.length < 20) {
    console.error(`Error: ${q.id} explanation too short`);
    metadataErrors++;
  }
  if (q.source !== 'FirstRound Original') {
    console.error(`Error: ${q.id} source is not FirstRound Original`);
    metadataErrors++;
  }
});
console.log(`Detailed Metadata Strict Audit: ${metadataErrors === 0 ? 'PASS (0 errors)' : `FAIL (${metadataErrors} errors)`}\n`);

// 4. Cross-Bank Duplication Audit
console.log('--- 4. CROSS-BANK DUPLICATE AUDIT ---');
const allFoundationAndCompany = [
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

console.log(`Existing Bank (Foundation + Prior Company): ${allFoundationAndCompany.length} questions`);
console.log(`Wipro Bank: ${wiproQuestions.length} questions`);
const fullCurrentBank = [...allFoundationAndCompany, ...wiproQuestions];
console.log(`Complete Current Bank: ${fullCurrentBank.length} questions (Expected: 216)`);

const dupDetector = new DuplicateDetection();
let crossBankDupFound = false;

// Check Wipro internal duplicates
for (let i = 0; i < wiproQuestions.length; i++) {
  for (let j = i + 1; j < wiproQuestions.length; j++) {
    if (dupDetector.normalizeQuestionText(wiproQuestions[i].questionText) === dupDetector.normalizeQuestionText(wiproQuestions[j].questionText)) {
      console.error(`Internal duplicate in Wipro: ${wiproQuestions[i].id} and ${wiproQuestions[j].id}`);
      crossBankDupFound = true;
    }
  }
}

// Check Wipro vs Existing bank
wiproQuestions.forEach(wq => {
  if (dupDetector.isDuplicate(wq, allFoundationAndCompany)) {
    console.error(`Cross-bank duplicate: ${wq.id}`);
    crossBankDupFound = true;
  }
});

console.log(`Cross-Bank & Internal Duplicate Check: ${!crossBankDupFound ? 'PASS (0 collisions)' : 'FAIL'}\n`);

// 5. Capacity Audit & Critical Acceptance Tests
console.log('--- 5. CAPACITY AUDIT & RUNTIME SELECTION ---');
const capacityService = new CompanyContentCapacityService();

// Scenario A: Fresh Candidate
console.log('[Scenario A: Fresh Candidate (0 previous attempts)]');
const capA = capacityService.analyzeCandidateCapacity(wiproBp, 'usr_fresh_19b1', fullCurrentBank, []);
console.log(`  Can Assemble Fresh: ${capA.canAssembleFresh ? 'YES' : 'NO'}`);
console.log(`  Total Required: ${capA.totalRequired} | Total Fresh Compatible: ${capA.totalFreshCompatible} | Shortfall: ${capA.totalShortfall}`);

const selectA = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_fresh_19b1',
  blueprint: wiproBp,
  questionBank: fullCurrentBank,
  previouslyAttemptedQuestionIds: [],
  allowPartialReuseWhenExhausted: false,
});
console.log(`  Runtime Selection A: Success=${selectA.success}, TotalSelected=${selectA.totalSelected}/${selectA.totalRequired}, Fresh=${selectA.freshCount}, Reused=${selectA.reusedCount}, Shortfall=${selectA.shortfall}`);

const testInstAQuestions = selectA.testInstance?.questions || [];
const uniqueAQuestions = new Set(testInstAQuestions.map(q => q.id));
console.log(`  TestInstance A: Total=${testInstAQuestions.length}, Unique=${uniqueAQuestions.size}`);

// Scenario B: Candidate completed Foundation Q + V + L (75 Qs seen)
console.log('\n[Scenario B (CRITICAL): Candidate completed Foundation Quant + Verbal + Logical (75 Qs seen)]');
const seenQVL = [
  ...quantQuestions.map(q => q.id),
  ...verbalQuestions.map(q => q.id),
  ...logicalQuestions.map(q => q.id),
];

const capB = capacityService.analyzeCandidateCapacity(wiproBp, 'usr_qvl_19b1', fullCurrentBank, seenQVL);
console.log(`  Can Assemble Fresh: ${capB.canAssembleFresh ? 'YES' : 'NO'}`);
console.log(`  Total Required: ${capB.totalRequired} | Total Fresh Compatible: ${capB.totalFreshCompatible} | Shortfall: ${capB.totalShortfall}`);
capB.sections.forEach(s => {
  console.log(`    - ${s.sectionName}: Required=${s.requiredQuestions}, Fresh=${s.freshCompatible}, Shortfall=${s.shortfall}, Status=${s.status}`);
});

const selectB = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_qvl_19b1',
  blueprint: wiproBp,
  questionBank: fullCurrentBank,
  previouslyAttemptedQuestionIds: seenQVL,
  allowPartialReuseWhenExhausted: false,
});

console.log(`  Runtime Selection B: Success=${selectB.success}, TotalSelected=${selectB.totalSelected}/${selectB.totalRequired}, Fresh=${selectB.freshCount}, Reused=${selectB.reusedCount}, Shortfall=${selectB.shortfall}`);

const testInstBQuestions = selectB.testInstance?.questions || [];
const uniqueBQuestions = new Set(testInstBQuestions.map(q => q.id));
const seenQVLSet = new Set(seenQVL);
const contaminatedBCount = testInstBQuestions.filter(q => seenQVLSet.has(q.id)).length;

console.log(`  TestInstance B: Total=${testInstBQuestions.length}, Unique=${uniqueBQuestions.size}, Seen Foundation Questions Included=${contaminatedBCount}`);

const criticalAcceptancePass = 
  selectB.success &&
  selectB.totalSelected === 48 &&
  selectB.freshCount === 48 &&
  selectB.reusedCount === 0 &&
  selectB.shortfall === 0 &&
  contaminatedBCount === 0 &&
  uniqueBQuestions.size === 48;

console.log(`  Critical Acceptance Test: ${criticalAcceptancePass ? 'PASS' : 'FAIL'}\n`);

// 6. Foundation & Prior Company Regression
console.log('--- 6. FOUNDATION & PRIOR COMPANY REGRESSION ---');
const quantTest = db.getTestById('cat_foundation_quant', false);
const logicalTest = db.getTestById('cat_foundation_logical', false);
const verbalTest = db.getTestById('cat_foundation_verbal', false);
const diTest = db.getTestById('cat_foundation_di', false);
const pseudoTest = db.getTestById('cat_foundation_pseudocode', false);

console.log(`Foundation Quant: status=${quantTest?.status} (Exp: ready), qCount=${quantQuestions.length}`);
console.log(`Foundation Logical: status=${logicalTest?.status} (Exp: ready), qCount=${logicalQuestions.length}`);
console.log(`Foundation Verbal: status=${verbalTest?.status} (Exp: ready), qCount=${verbalQuestions.length}`);
console.log(`Foundation DI: status=${diTest?.status} (Exp: ready), qCount=${diQuestions.length}`);
console.log(`Foundation Pseudocode: status=${pseudoTest?.status} (Exp: ready), qCount=${pseudocodeQuestions.length}`);

const foundationRegPass = 
  quantQuestions.length === 25 &&
  logicalQuestions.length === 25 &&
  verbalQuestions.length === 25 &&
  diQuestions.length === 25 &&
  pseudocodeQuestions.length === 25 &&
  quantTest?.status === 'ready' &&
  logicalTest?.status === 'ready' &&
  verbalTest?.status === 'ready' &&
  diTest?.status === 'ready' &&
  pseudoTest?.status === 'ready';

console.log(`Foundation Regression: ${foundationRegPass ? 'PASS' : 'FAIL'}`);

console.log(`Prior Company Banks: Accenture=${accentureQuestions.length} (22), Cognizant=${cognizantQuestions.length} (14), Infosys=${infosysQuestions.length} (7), TCS Adv=${tcsAdvancedQuestions.length} (20), TCS Coding=${tcsCodingProblems.length} (2)`);
const priorRegPass = 
  accentureQuestions.length === 22 &&
  cognizantQuestions.length === 14 &&
  infosysQuestions.length === 7 &&
  tcsAdvancedQuestions.length === 20 &&
  tcsCodingProblems.length === 2;

console.log(`Prior Company Regression: ${priorRegPass ? 'PASS' : 'FAIL'}\n`);

// 7. Publishing Gate Safety
console.log('--- 7. PUBLISHING GATE SAFETY ---');
const wiproPattern = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_wipro_elite_nth');
const catWiproTest = db.getTestById('cat_company_wipro', false);

console.log(`Wipro Blueprint ID: ${wiproBp?.id}`);
console.log(`Blueprint Verification Status: ${wiproBp?.verificationStatus} (Expected: UNVERIFIED)`);
console.log(`Pattern Status in Registry: ${wiproPattern?.status} (Expected: coming_soon)`);
console.log(`Catalogue Playability Status in DB: ${catWiproTest?.status} (Expected: coming_soon)`);

const publishingSafe = 
  wiproBp?.verificationStatus === 'UNVERIFIED' &&
  wiproPattern?.status === 'coming_soon' &&
  catWiproTest?.status === 'coming_soon';

console.log(`Publishing Gate Status: ${publishingSafe ? 'PASS (Wipro remains safely UNVERIFIED / coming_soon)' : 'FAIL'}`);

console.log('\n================================================================');
console.log('PHASE 19B.1 VERIFICATION & AUDIT COMPLETE');
console.log('================================================================');

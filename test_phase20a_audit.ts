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
import { db } from './server/db';

console.log('================================================================');
console.log('PHASE 20A: ACCENTURE CONTENT EXPANSION & CAPACITY AUDIT SUITE');
console.log('================================================================\n');

// 1. Current Total System Bank Verification
console.log('--- 1. CURRENT TOTAL SYSTEM BANK VERIFICATION ---');
console.log(`Foundation Questions: Quant=${quantQuestions.length}, Logical=${logicalQuestions.length}, Verbal=${verbalQuestions.length}, DI=${diQuestions.length}, Pseudocode=${pseudocodeQuestions.length} | Total=${quantQuestions.length + logicalQuestions.length + verbalQuestions.length + diQuestions.length + pseudocodeQuestions.length} (Expected: 125)`);
console.log(`Accenture Bank Total: ${accentureQuestions.length} (Expected: 89 = 22 initial + 67 expansion)`);
console.log(`Cognizant: ${cognizantQuestions.length} (14), Infosys: ${infosysQuestions.length} (7), TCS Adv Quant: ${tcsAdvancedQuestions.length} (20), TCS Coding: ${tcsCodingProblems.length} (2), Wipro: ${wiproQuestions.length} (26)`);

const fullBank283 = [
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
console.log(`Total System Questions in Bank: ${fullBank283.length} (Expected: 283 = 216 + 67)\n`);

// 2. QA Validation on the 67 New Questions (and full 89 Accenture Bank)
console.log('--- 2. QA VALIDATION ON ACCENTURE BANK (89 Questions) ---');
const qaEngine = new ContentQAEngine();
const accentureBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_accenture_cognitive')!;
const qaAudit = qaEngine.generateFullQAReport(accentureQuestions, [accentureBp]);
console.log(`Accenture Bank QA Result: Total=${qaAudit.totalQuestions}, Valid=${qaAudit.passedValidation}, Failed=${qaAudit.failedValidation}, MissingMetadata=${qaAudit.missingMetadataCount}`);
console.log(`QA Provenance Distribution:`, qaAudit.provenanceDistribution);
console.log(`QA Topic Coverage:`, qaAudit.topicCoverage);

// Check if any errors exist in questionAudits
const auditErrors = qaAudit.questionAudits.filter(a => !a.isValid || a.errors.length > 0);
console.log(`Question Audit Errors Count: ${auditErrors.length}`);
if (auditErrors.length > 0) {
  console.error('Audit Errors:', auditErrors);
}
console.log(`QA Validation Pass: ${qaAudit.passedValidation === 89 && auditErrors.length === 0 ? 'PASS' : 'FAIL'}\n`);

// 3. Duplicate Detection Audit Across Entire 283 Bank
console.log('--- 3. DUPLICATE DETECTION AUDIT (283 Total Questions) ---');
const dupDetector = new DuplicateDetection();
const seenIds = new Set<string>();
let idCollisions = 0;
let textCollisions = 0;

fullBank283.forEach(q => {
  if (seenIds.has(q.id)) {
    console.error(`ID Collision: ${q.id}`);
    idCollisions++;
  }
  seenIds.add(q.id);
});

for (let i = 0; i < fullBank283.length; i++) {
  for (let j = i + 1; j < fullBank283.length; j++) {
    if (dupDetector.normalizeQuestionText(fullBank283[i].questionText) === dupDetector.normalizeQuestionText(fullBank283[j].questionText)) {
      console.error(`Text Collision: ${fullBank283[i].id} and ${fullBank283[j].id}`);
      textCollisions++;
    }
  }
}
console.log(`ID Collisions: ${idCollisions} | Text Collisions: ${textCollisions}`);
const duplicatePass = idCollisions === 0 && textCollisions === 0;
console.log(`Duplicate Detection Result: ${duplicatePass ? 'PASS' : 'FAIL'}\n`);

// 4. Scenario Capacity Diagnostics
console.log('--- 4. CANDIDATE CAPACITY SCENARIO AUDIT ---');
const capacityService = new CompanyContentCapacityService();

const seenFoundation75 = [...quantQuestions.map(q => q.id), ...verbalQuestions.map(q => q.id), ...logicalQuestions.map(q => q.id)];
const seenFoundation100 = [...seenFoundation75, ...pseudocodeQuestions.map(q => q.id)];
const seenFoundation125 = [...seenFoundation100, ...diQuestions.map(q => q.id)];
const seenWipro = wiproQuestions.map(q => q.id);
const seenFoundationPlusWipro = [...seenFoundation125, ...seenWipro];

function runScenario(name: string, seenList: string[]) {
  console.log(`\n================================================================`);
  console.log(`SCENARIO: ${name}`);
  console.log(`================================================================`);
  const cap = capacityService.analyzeCandidateCapacity(accentureBp, 'usr_audit', fullBank283, seenList);
  console.log(`Total Required: ${cap.totalRequired} | Total Compatible: ${cap.totalGlobalCompatible} | Total Fresh: ${cap.totalFreshCompatible} | Total Shortfall: ${cap.totalShortfall}`);
  console.log(`Can Assemble Fresh: ${cap.canAssembleFresh ? 'YES' : 'NO'}`);
  console.log(`| Section Name | Req | Comp | Fresh | Seen | Shortfall | Status |`);
  console.log(`|:---|:---:|:---:|:---:|:---:|:---:|:---|`);
  cap.sections.forEach(s => {
    console.log(`| ${s.sectionName} | ${s.requiredQuestions} | ${s.globalCompatible} | ${s.freshCompatible} | ${s.previouslySeenCompatible} | ${s.shortfall} | ${s.status} |`);
  });

  const assemblyStrict = questionSelectionEngine.selectCompanyAssessmentQuestions({
    userId: 'usr_audit_strict',
    blueprint: accentureBp,
    questionBank: fullBank283,
    previouslyAttemptedQuestionIds: seenList,
    allowPartialReuseWhenExhausted: false,
  });

  const assemblyFallback = questionSelectionEngine.selectCompanyAssessmentQuestions({
    userId: 'usr_audit_fallback',
    blueprint: accentureBp,
    questionBank: fullBank283,
    previouslyAttemptedQuestionIds: seenList,
    allowPartialReuseWhenExhausted: true,
  });

  console.log(`Strict Assembly (allowPartialReuse=false): TotalSelected=${assemblyStrict.totalSelected}/${assemblyStrict.totalRequired}, Fresh=${assemblyStrict.freshCount}, Reused=${assemblyStrict.reusedCount}, Success=${assemblyStrict.success}`);
  console.log(`Controlled Fallback Assembly (allowPartialReuse=true): TotalSelected=${assemblyFallback.totalSelected}/${assemblyFallback.totalRequired}, Fresh=${assemblyFallback.freshCount}, Reused=${assemblyFallback.reusedCount}, Success=${assemblyFallback.success}`);
}

runScenario('Scenario A: Cold-Start Fresh Candidate (0 seen)', []);
runScenario('Scenario B: Foundation Q + V + L Completed (75 seen)', seenFoundation75);
runScenario('Scenario C: Foundation Q + V + L + Pseudocode Completed (100 seen)', seenFoundation100);
runScenario('Scenario D: All 5 Foundation Assessments Completed (125 seen)', seenFoundation125);
runScenario('Scenario E: Wipro Elite NTH Completed (26 seen)', seenWipro);
runScenario('Scenario F: All Foundation + Wipro Completed (151 seen)', seenFoundationPlusWipro);

// Assemble Attempt 1 to simulate Scenario G (One previous Accenture attempt)
const attempt1Assembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_att1',
  blueprint: accentureBp,
  questionBank: fullBank283,
  previouslyAttemptedQuestionIds: [],
  allowPartialReuseWhenExhausted: true,
});
const seenAttempt1 = attempt1Assembly.sectionResults.flatMap(sr => sr.selectedQuestions).map(q => q.id);
runScenario('Scenario G: One Previous Accenture Attempt Completed (90 seen)', seenAttempt1);

// 5. Platform Regression Verification
console.log('\n--- 5. PLATFORM REGRESSION VERIFICATION ---');
const quantTest = db.getTestById('cat_foundation_quant', false);
const logicalTest = db.getTestById('cat_foundation_logical', false);
const verbalTest = db.getTestById('cat_foundation_verbal', false);
const diTest = db.getTestById('cat_foundation_di', false);
const pseudoTest = db.getTestById('cat_foundation_pseudocode', false);
const wiproTest = db.getTestById('cat_company_wipro', false);

const foundationPass = 
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
console.log(`Foundation Assessments (125 Qs): ${foundationPass ? 'PASS' : 'FAIL'}`);

const wiproPass = wiproQuestions.length === 26 && wiproTest?.status === 'ready' && wiproTest?.verificationStatus === 'VERIFIED';
console.log(`Wipro Elite NTH Assessment (26 Qs): ${wiproPass ? 'PASS' : 'FAIL'}`);

const priorPass = 
  cognizantQuestions.length === 14 &&
  infosysQuestions.length === 7 &&
  tcsAdvancedQuestions.length === 20 &&
  tcsCodingProblems.length === 2;
console.log(`Prior Company Banks (Cognizant, Infosys, TCS): ${priorPass ? 'PASS' : 'FAIL'}`);

// 6. Publishing Gate State
console.log('\n--- 6. PUBLISHING GATE STATE ---');
const accBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_accenture_cognitive');
const accPat = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_accenture_cognitive_technical');
const accCat = db.getTestById('cat_company_accenture', false);

console.log(`Blueprint: ${accBp?.id} | verificationStatus: ${accBp?.verificationStatus} (Expected: UNVERIFIED)`);
console.log(`Pattern: ${accPat?.id} | status: ${accPat?.status} | verificationStatus: ${accPat?.verificationStatus} (Expected: coming_soon / UNVERIFIED)`);
console.log(`Catalogue: ${accCat?.id} | status: ${accCat?.status} (Expected: coming_soon)`);

const gatePass = 
  accBp?.verificationStatus === 'UNVERIFIED' &&
  accPat?.status === 'coming_soon' &&
  accPat?.verificationStatus === 'UNVERIFIED' &&
  accCat?.status === 'coming_soon';
console.log(`Publishing Gate Result: ${gatePass ? 'PASS (Safely Gated)' : 'FAIL'}`);

console.log('\n================================================================');
console.log('PHASE 20A AUDIT COMPLETE');
console.log('================================================================');

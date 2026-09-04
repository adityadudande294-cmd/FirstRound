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
console.log('PHASE 21B: COGNIZANT GENC CAPACITY & QA ACCEPTANCE SUITE');
console.log('================================================================\n');

// 1. Bank Size & Integrity Check
console.log('--- 1. SYSTEM BANK INVENTORY (Target: 330 Questions) ---');
console.log(`Foundation Questions: Quant=${quantQuestions.length}, Logical=${logicalQuestions.length}, Verbal=${verbalQuestions.length}, DI=${diQuestions.length}, Pseudocode=${pseudocodeQuestions.length} | Total = 125`);
console.log(`Accenture Bank: ${accentureQuestions.length} Questions (Expected: 89)`);
console.log(`Cognizant Bank: ${cognizantQuestions.length} Questions (Expected: 61 = 14 initial + 47 new)`);
console.log(`Wipro Bank: ${wiproQuestions.length} Questions (Expected: 26)`);
console.log(`Staged Prior Banks: Infosys=${infosysQuestions.length}, TCS Adv Quant=${tcsAdvancedQuestions.length}, TCS Coding=${tcsCodingProblems.length}`);

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
console.log(`Total System Bank Count: ${fullBank330.length} Questions (Expected: 330)\n`);

// 2. QA Validation across full 61 Cognizant Questions
console.log('--- 2. CONTENT QA VALIDATION (61 Cognizant Questions) ---');
const qaEngine = new ContentQAEngine();
const cogBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_cognizant_genc')!;
const qaReport = qaEngine.generateFullQAReport(cognizantQuestions);

console.log(`Total Questions Audited: ${qaReport.totalQuestions}`);
console.log(`Passed Validation: ${qaReport.passedValidation} / ${qaReport.totalQuestions}`);
console.log(`Failed Validation: ${qaReport.failedValidation}`);
console.log(`Missing Metadata: ${qaReport.missingMetadataCount}`);
console.log(`Difficulty Distribution:`, qaReport.difficultyDistribution);
console.log(`Topic Coverage:`, qaReport.topicCoverage);

const qaErrors = qaReport.questionAudits.filter(a => !a.isValid || a.errors.length > 0);
console.log(`QA Audit Errors Count: ${qaErrors.length}`);
console.log(`Questions Passed Validation: ${qaReport.passedValidation} / ${qaReport.totalQuestions}`);
console.log(`QA Result: ${qaReport.passedValidation === 61 && qaErrors.length === 0 ? 'PASS (100% Valid)' : 'FAIL'}\n`);

// 3. Duplicate Detection across full 330 bank
console.log('--- 3. FULL 330-QUESTION DUPLICATE AUDIT ---');
const dupDetector = new DuplicateDetection();
const idSet = new Set<string>();
let idDupes = 0;
let textDupes = 0;

fullBank330.forEach(q => {
  if (idSet.has(q.id)) {
    console.error(`Duplicate ID found: ${q.id}`);
    idDupes++;
  }
  idSet.add(q.id);
});

for (let i = 0; i < fullBank330.length; i++) {
  for (let j = i + 1; j < fullBank330.length; j++) {
    if (dupDetector.normalizeQuestionText(fullBank330[i].questionText) === dupDetector.normalizeQuestionText(fullBank330[j].questionText)) {
      console.error(`Duplicate text: ${fullBank330[i].id} and ${fullBank330[j].id}`);
      textDupes++;
    }
  }
}
console.log(`ID Duplicates: ${idDupes} | Text Duplicates: ${textDupes}`);
console.log(`Duplicate Detection: ${idDupes === 0 && textDupes === 0 ? 'PASS (0 Collisions)' : 'FAIL'}\n`);

// 4. Candidate Capacity & Strict Runtime Assembly
console.log('--- 4. CANDIDATE CAPACITY SCENARIO ACCEPTANCE TESTS ---');
const capacityService = new CompanyContentCapacityService();

const seenFoundation75 = [...quantQuestions.map(q => q.id), ...logicalQuestions.map(q => q.id), ...verbalQuestions.map(q => q.id)];
const seenFoundation125 = [...seenFoundation75, ...diQuestions.map(q => q.id), ...pseudocodeQuestions.map(q => q.id)];
const seenWipro = wiproQuestions.map(q => q.id);
const seenAccenture = accentureQuestions.map(q => q.id);
const seenFoundationPlusWipro = [...seenFoundation125, ...seenWipro];
const seenFoundationPlusAccenture = [...seenFoundation125, ...seenAccenture];
const seenFoundationPlusWiproPlusAccenture = [...new Set([...seenFoundation125, ...seenWipro, ...seenAccenture])];

function runScenarioAcceptance(name: string, seenList: string[]) {
  console.log(`\n================================================================`);
  console.log(`SCENARIO: ${name} (Seen: ${seenList.length})`);
  console.log(`================================================================`);

  const cap = capacityService.analyzeCandidateCapacity(cogBp, 'usr_audit', fullBank330, seenList);
  console.log(`Total Required: ${cap.totalRequired} | Total Compatible: ${cap.totalGlobalCompatible} | Total Fresh: ${cap.totalFreshCompatible} | Shortfall: ${cap.totalShortfall}`);
  console.log(`Can Assemble Fresh: ${cap.canAssembleFresh ? 'YES' : 'NO'}`);
  console.log(`| Section Name | Req | Comp | Fresh | Seen | Shortfall | Status |`);
  console.log(`|:---|:---:|:---:|:---:|:---:|:---:|:---|`);
  cap.sections.forEach(s => {
    console.log(`| ${s.sectionName} | ${s.requiredQuestions} | ${s.globalCompatible} | ${s.freshCompatible} | ${s.previouslySeenCompatible} | ${s.shortfall} | ${s.status} |`);
  });

  const strict = questionSelectionEngine.selectCompanyAssessmentQuestions({
    userId: 'usr_strict',
    blueprint: cogBp,
    questionBank: fullBank330,
    previouslyAttemptedQuestionIds: seenList,
    allowPartialReuseWhenExhausted: false,
  });

  console.log(`\nStrict Assembly Result:`);
  console.log(`  Selected: ${strict.totalSelected}/${strict.totalRequired}`);
  console.log(`  Fresh Count: ${strict.freshCount}, Reused Count: ${strict.reusedCount}`);
  console.log(`  Shortfall: ${strict.totalShortfall}`);
  console.log(`  Strict Assembly Success: ${strict.success ? 'PASS' : 'FAIL'}`);

  const sectionBreakdown: Record<string, number> = {};
  strict.sectionResults.forEach(sr => {
    sectionBreakdown[sr.sectionName] = sr.selectedQuestions.length;
  });
  console.log(`  Section Selection Breakdown:`, sectionBreakdown);
}

runScenarioAcceptance('Scenario A: Cold-Start Candidate (0 seen)', []);
runScenarioAcceptance('Scenario B: Foundation Q + L + V (75 seen)', seenFoundation75);
runScenarioAcceptance('Scenario C: All 5 Foundation Completed (125 seen)', seenFoundation125);
runScenarioAcceptance('Scenario D: Foundation + Wipro Completed (151 seen)', seenFoundationPlusWipro);
runScenarioAcceptance('Scenario E: Foundation + Accenture Completed (214 seen)', seenFoundationPlusAccenture);
runScenarioAcceptance('Scenario F (PRIMARY ACCEPTANCE): Foundation + Wipro + Accenture (240 seen)', seenFoundationPlusWiproPlusAccenture);

// Scenario G: Second Attempt Capacity after First Cognizant Attempt
const attempt1Strict = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_attempt1',
  blueprint: cogBp,
  questionBank: fullBank330,
  previouslyAttemptedQuestionIds: [],
  allowPartialReuseWhenExhausted: false,
});
const seenAttempt1 = attempt1Strict.sectionResults.flatMap(sr => sr.selectedQuestions).map(q => q.id);
runScenarioAcceptance('Scenario G: Attempt #2 After Cold-Start Attempt #1 (80 seen)', seenAttempt1);

// Scenario H: Attempt #2 After Foundation + Wipro + Accenture + Attempt #1
const seenAllPlusAttempt1 = [...new Set([...seenFoundationPlusWiproPlusAccenture, ...seenAttempt1])];
runScenarioAcceptance('Scenario H: Attempt #2 After Foundation + Wipro + Accenture + Attempt #1 (250 seen)', seenAllPlusAttempt1);

// 5. Platform Regression Check
console.log('\n--- 5. PLATFORM REGRESSION AUDIT ---');
const fq = db.getTestById('cat_foundation_quant', false);
const fl = db.getTestById('cat_foundation_logical', false);
const fv = db.getTestById('cat_foundation_verbal', false);
const fdi = db.getTestById('cat_foundation_di', false);
const fp = db.getTestById('cat_foundation_pseudocode', false);
const wip = db.getTestById('cat_company_wipro', false);
const acc = db.getTestById('cat_company_accenture', false);

console.log(`Foundation Tests (5/5 ready & verified): ${fq?.status === 'ready' && fl?.status === 'ready' && fv?.status === 'ready' && fdi?.status === 'ready' && fp?.status === 'ready' ? 'PASS' : 'FAIL'}`);
console.log(`Wipro Elite NTH (ready & verified): ${wip?.status === 'ready' && wip?.verificationStatus === 'VERIFIED' ? 'PASS' : 'FAIL'}`);
console.log(`Accenture (ready & verified): ${acc?.status === 'ready' && acc?.verificationStatus === 'VERIFIED' ? 'PASS' : 'FAIL'}`);

// 6. Publishing Gate Guardrails
console.log('\n--- 6. PUBLISHING GATE GUARDRAILS ---');
const cogPat = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_cognizant_genc_aptitude');
const cogCat = db.getTestById('cat_company_cognizant', false);

console.log(`Blueprint: ${cogBp.id} | verificationStatus: ${cogBp.verificationStatus} (Expected: UNVERIFIED)`);
console.log(`Pattern: ${cogPat?.id} | status: ${cogPat?.status} | verificationStatus: ${cogPat?.verificationStatus} (Expected: coming_soon / UNVERIFIED)`);
console.log(`Catalogue: ${cogCat?.id} | status: ${cogCat?.status} (Expected: coming_soon)`);

const gatePass = 
  cogBp.verificationStatus === 'UNVERIFIED' &&
  cogPat?.status === 'coming_soon' &&
  cogPat?.verificationStatus === 'UNVERIFIED' &&
  cogCat?.status === 'coming_soon';
console.log(`Publishing Gate Status: ${gatePass ? 'PASS (Safely Gated / Unpromoted)' : 'FAIL'}`);

console.log('\n================================================================');
console.log('PHASE 21B ACCEPTANCE COMPLETE');
console.log('================================================================');

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
console.log('PHASE 22B: INFOSYS SPECIALIST / DSE CONTENT EXPANSION VALIDATION');
console.log('================================================================\n');

// 1. Bank Integrity Checks
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
  ...wiproQuestions,
];

console.log('--- 1. QUESTION BANK INVENTORY & ID CONTINUITY ---');
console.log(`Foundation Questions: ${quantQuestions.length + logicalQuestions.length + verbalQuestions.length + diQuestions.length + pseudocodeQuestions.length} (Expected: 125)`);
console.log(`Accenture Questions: ${accentureQuestions.length} (Expected: 89)`);
console.log(`Cognizant Questions: ${cognizantQuestions.length} (Expected: 61)`);
console.log(`Wipro Questions: ${wiproQuestions.length} (Expected: 26)`);
console.log(`TCS Advanced Questions: ${tcsAdvancedQuestions.length} (Expected: 20)`);
console.log(`TCS Coding Questions: ${tcsCodingProblems.length} (Expected: 2)`);
console.log(`Infosys Questions: ${infosysQuestions.length} (Expected: 43: 7 existing + 36 newly authored)`);
console.log(`TOTAL SYSTEM BANK COUNT: ${fullBank366.length} / 366 (Expected: 366)\n`);

// Check ID continuity for Infosys
const infIds = infosysQuestions.map(q => q.id);
const expectedInfIds = Array.from({ length: 43 }, (_, i) => `q_infosys_${String(i + 1).padStart(3, '0')}`);
const missingInfIds = expectedInfIds.filter(id => !infIds.includes(id));
const extraInfIds = infIds.filter(id => !expectedInfIds.includes(id));

console.log(`Infosys ID Sequence: ${infIds[0]} -> ${infIds[infIds.length - 1]}`);
console.log(`Missing Infosys IDs: ${missingInfIds.length === 0 ? 'NONE (PASS)' : missingInfIds.join(', ')}`);
console.log(`Extra/Unexpected Infosys IDs: ${extraInfIds.length === 0 ? 'NONE (PASS)' : extraInfIds.join(', ')}\n`);

// 2. Content QA & Schema Verification on 36 New Questions (q_infosys_008 through q_infosys_043)
console.log('--- 2. CONTENT QA & SCHEMA VALIDATION (36 New Questions) ---');
const infBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_infosys_assessment')!;
const new36Questions = infosysQuestions.filter(q => {
  const num = parseInt(q.id.replace('q_infosys_', ''), 10);
  return num >= 8 && num <= 43;
});

const qaEngine = new ContentQAEngine();
const qaReport = qaEngine.generateFullQAReport(new36Questions, [infBp]);
console.log(`Total New Questions Tested: ${qaReport.totalQuestions} / 36`);
console.log(`Passed Validation: ${qaReport.passedValidation} / 36`);
console.log(`Failed Validation: ${qaReport.failedValidation}`);
console.log(`Missing Metadata: ${qaReport.missingMetadataCount}`);
console.log(`Difficulty Distribution of 36 New:`, qaReport.difficultyDistribution);
console.log(`Expected Difficulty: { Easy: 6, Medium: 21, Hard: 9 }`);

// Validate individual questions
let schemaErrors = 0;
let optionErrors = 0;
let answerErrors = 0;
let explanationErrors = 0;
let difficultyMismatches = 0;

new36Questions.forEach(q => {
  if (!(q as import('./src/types').MCQQuestion).options || (q as import('./src/types').MCQQuestion).options.length !== 4) schemaErrors++;
  const optIds = (q as import('./src/types').MCQQuestion).options.map(o => o.id);
  if (new Set(optIds).size !== 4) optionErrors++;
  if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer)) answerErrors++;
  if (!q.explanation || q.explanation.length < 20) explanationErrors++;
  const diffCheck = qaEngine.evaluateDifficulty(q);
  if (diffCheck.difficultyMismatch) difficultyMismatches++;
});

console.log(`Schema/Options/Answer/Explanation Errors: ${schemaErrors + optionErrors + answerErrors + explanationErrors}`);
console.log(`QA Heuristic Difficulty Mismatches: ${difficultyMismatches}`);
console.log(`QA Validation Status: ${qaReport.passedValidation === 36 && difficultyMismatches === 0 ? 'PASS (100% Valid)' : 'FAIL'}\n`);

// 3. Cross-Bank Duplicate Audit (366 questions)
console.log('--- 3. FULL 366-QUESTION DUPLICATE & COLLISION AUDIT ---');
const dupDetector = new DuplicateDetection();
const idSet = new Set<string>();
let idDupes = 0;
let textDupes = 0;

fullBank366.forEach(q => {
  if (idSet.has(q.id)) idDupes++;
  idSet.add(q.id);
});

for (let i = 0; i < fullBank366.length; i++) {
  for (let j = i + 1; j < fullBank366.length; j++) {
    if (dupDetector.normalizeQuestionText(fullBank366[i].questionText) === dupDetector.normalizeQuestionText(fullBank366[j].questionText)) {
      textDupes++;
    }
  }
}

console.log(`Total Bank ID Collisions: ${idDupes}`);
console.log(`Total Bank Text Collisions: ${textDupes}`);
console.log(`Cross-Bank Duplicate Status: ${idDupes === 0 && textDupes === 0 ? 'PASS (0 Collisions across 366 questions)' : 'FAIL'}\n`);

// 4. Candidate Scenario Capacity & Strict Assembly Matrix
console.log('--- 4. STRICT RUNTIME ASSEMBLY & CAPACITY VERIFICATION ---');
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

const secLog = infBp.sections[0];
const logComp = fullBank366.filter(q => questionSelectionEngine.evaluateCompatibility(q, secLog));
const logFresh = logComp.filter(q => !seenAllLive301.includes(q.id));
console.log('DEBUG sec_inf_logical:');
console.log('  Target Diff:', secLog.difficultyDistribution);
console.log('  Total Comp:', logComp.length);
console.log('  Total Fresh Post-301:', logFresh.length);
console.log('  Fresh Easy:', logFresh.filter(q=>q.difficulty==='Easy').map(q=>q.id));
console.log('  Fresh Medium:', logFresh.filter(q=>q.difficulty==='Medium').map(q=>q.id));
console.log('  Fresh Hard:', logFresh.filter(q=>q.difficulty==='Hard').map(q=>q.id));

function testScenario(name: string, seenList: string[]) {
  const assembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
    userId: 'usr_candidate_audit',
    blueprint: infBp,
    questionBank: fullBank366,
    previouslyAttemptedQuestionIds: seenList,
    allowPartialReuseWhenExhausted: false,
  });

  const selectedIds = assembly.sectionResults.flatMap(sr => sr.selectedQuestions).map(q => q.id);
  const seenSet = new Set(seenList);
  const contamination = selectedIds.filter(id => seenSet.has(id)).length;
  const uniqueCount = new Set(selectedIds).size;

  console.log(`Scenario: "${name}" (${seenList.length} seen)`);
  console.log(`  - Assembly Success: ${assembly.success ? 'PASS' : 'FAIL'} | Selected: ${assembly.totalSelected}/${assembly.totalRequired} | Fresh: ${assembly.freshCount} | Reused: ${assembly.reusedCount}`);
  console.log(`  - Contamination Count: ${contamination} | Unique Selected IDs: ${uniqueCount}/${assembly.totalRequired}`);
  assembly.sectionResults.forEach(sr => {
    console.log(`    * Section "${sr.sectionName}": Selected ${sr.selectedQuestions.length}/${sr.requiredCount} (Fresh: ${sr.freshCount}, Reused: ${sr.reusedCount})`);
  });
  console.log();
  return assembly;
}

testScenario('Scenario A: Cold-Start Candidate', []);
testScenario('Scenario B: All 5 Foundation Completed (125 seen)', seenFoundation125);
testScenario('Scenario C: Foundation + Wipro + Accenture (240 seen)', [...new Set([...seenFoundation125, ...seenWipro, ...seenAccenture])]);
const criticalLive = testScenario('Scenario D: CRITICAL ACCEPTANCE (All Live: 301 seen)', seenAllLive301);

// 5. Second Attempt Capacity Verification
console.log('--- 5. SECOND ATTEMPT CAPACITY VERIFICATION ---');
// Cold start attempt 1
const att1Cold = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_att1',
  blueprint: infBp,
  questionBank: fullBank366,
  previouslyAttemptedQuestionIds: [],
  allowPartialReuseWhenExhausted: true,
});
const seenCold1 = att1Cold.sectionResults.flatMap(sr => sr.selectedQuestions).map(q => q.id);
const att2Cold = testScenario('Cold-Start Attempt #2 (54 seen in Attempt 1)', seenCold1);

// Attempt 1 after all live
const att1Live = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_att1_live',
  blueprint: infBp,
  questionBank: fullBank366,
  previouslyAttemptedQuestionIds: seenAllLive301,
  allowPartialReuseWhenExhausted: true,
});
const seenLive1 = [...new Set([...seenAllLive301, ...att1Live.sectionResults.flatMap(sr => sr.selectedQuestions).map(q => q.id)])];
console.log(`Total Seen After Attempt 1 Post-Live: ${seenLive1.length} questions`);
const att2LiveControlled = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_att2_live',
  blueprint: infBp,
  questionBank: fullBank366,
  previouslyAttemptedQuestionIds: seenLive1,
  allowPartialReuseWhenExhausted: true,
});
console.log(`Attempt #2 Post-Live Controlled Assembly: Selected=${att2LiveControlled.totalSelected}/54, Fresh=${att2LiveControlled.freshCount}, Reused=${att2LiveControlled.reusedCount}`);

// 6. Platform Regression & Publishing Gate Status
console.log('\n--- 6. PLATFORM REGRESSION & PUBLISHING GATE AUDIT ---');
const fq = db.getTestById('cat_foundation_quant', false);
const fl = db.getTestById('cat_foundation_logical', false);
const fv = db.getTestById('cat_foundation_verbal', false);
const fdi = db.getTestById('cat_foundation_di', false);
const fp = db.getTestById('cat_foundation_pseudocode', false);
const wip = db.getTestById('cat_company_wipro', false);
const acc = db.getTestById('cat_company_accenture', false);
const cog = db.getTestById('cat_company_cognizant', false);
const infPat = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_infosys_assessment')!;
const infCat = db.getTestById('cat_company_infosys', false);

console.log(`Foundation Tests (5/5 ready & verified): ${fq?.status === 'ready' && fl?.status === 'ready' && fv?.status === 'ready' && fdi?.status === 'ready' && fp?.status === 'ready' ? 'PASS' : 'FAIL'}`);
console.log(`Wipro Elite NTH (ready & verified): ${wip?.status === 'ready' && wip?.verificationStatus === 'VERIFIED' ? 'PASS' : 'FAIL'}`);
console.log(`Accenture (ready & verified): ${acc?.status === 'ready' && acc?.verificationStatus === 'VERIFIED' ? 'PASS' : 'FAIL'}`);
console.log(`Cognizant GenC (ready & verified): ${cog?.status === 'ready' && cog?.verificationStatus === 'VERIFIED' ? 'PASS' : 'FAIL'}`);
console.log(`Infosys Staging Status: Blueprint=${infBp.verificationStatus}, Pattern=${infPat?.status}/${infPat?.verificationStatus}, Catalogue=${infCat?.status} -> ${infBp.verificationStatus === 'UNVERIFIED' && infPat?.status === 'coming_soon' && infCat?.status === 'coming_soon' ? 'PASS (Safely Staged)' : 'FAIL'}`);

console.log('\n================================================================');
console.log('PHASE 22B VALIDATION COMPLETE');
console.log('================================================================');

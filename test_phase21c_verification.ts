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
console.log('PHASE 21C: COGNIZANT GENC VERIFICATION & CONSISTENCY PASS');
console.log('================================================================\n');

// 1. Full Bank Inventory
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

console.log('--- 1. QUESTION INVENTORY & COUNT INTEGRITY ---');
console.log(`Cognizant Questions Count: ${cognizantQuestions.length} (Expected: 61)`);
console.log(`Full System Bank Count: ${fullBank330.length} (Expected: 330)`);

// Check ID continuity: q_cognizant_001 to q_cognizant_061
const expectedCogIds = Array.from({ length: 61 }, (_, i) => `q_cognizant_${String(i + 1).padStart(3, '0')}`);
const actualCogIds = cognizantQuestions.map(q => q.id);
const missingCogIds = expectedCogIds.filter(id => !actualCogIds.includes(id));
const excessCogIds = actualCogIds.filter(id => !expectedCogIds.includes(id));
const dupCogIds = actualCogIds.filter((id, index) => actualCogIds.indexOf(id) !== index);

console.log(`Missing Cognizant IDs: ${missingCogIds.length === 0 ? 'NONE (PASS)' : missingCogIds.join(', ')}`);
console.log(`Excess Cognizant IDs: ${excessCogIds.length === 0 ? 'NONE (PASS)' : excessCogIds.join(', ')}`);
console.log(`Duplicate Cognizant IDs: ${dupCogIds.length === 0 ? 'NONE (PASS)' : dupCogIds.join(', ')}`);
console.log(`ID Continuity: ${missingCogIds.length === 0 && excessCogIds.length === 0 && dupCogIds.length === 0 ? 'PASS (100% Continuous)' : 'FAIL'}\n`);

// 2. Section & Difficulty Distribution
console.log('--- 2. COGNIZANT DEDICATED SECTION & DIFFICULTY DISTRIBUTION ---');
const secCounts: Record<string, number> = {};
const diffCounts = { Easy: 0, Medium: 0, Hard: 0 };
const topicCounts: Record<string, number> = {};

cognizantQuestions.forEach(q => {
  secCounts[q.skill] = (secCounts[q.skill] || 0) + 1;
  diffCounts[q.difficulty] = (diffCounts[q.difficulty] || 0) + 1;
  topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
});

console.log(`Authored Section Distribution:`, secCounts);
console.log(`Authored Difficulty Distribution:`, diffCounts, `(Expected: 15 Easy, 35 Medium, 11 Hard)`);
console.log(`Topic Distribution:`, topicCounts);

const diffPass = diffCounts.Easy === 15 && diffCounts.Medium === 35 && diffCounts.Hard === 11;
console.log(`Difficulty Match: ${diffPass ? 'PASS' : 'FAIL'}\n`);

// 3. Schema & Content QA Validation
console.log('--- 3. SCHEMA, TAXONOMY & CONTENT QA AUDIT ---');
const qaEngine = new ContentQAEngine();
const qaReport = qaEngine.generateFullQAReport(cognizantQuestions);

console.log(`Total Audited: ${qaReport.totalQuestions}`);
console.log(`Passed Schema & Math Validation: ${qaReport.passedValidation} / ${qaReport.totalQuestions}`);
console.log(`Failed Validation: ${qaReport.failedValidation}`);
console.log(`Missing Metadata: ${qaReport.missingMetadataCount}`);

// Verify all skills match TAXONOMY constants
const validSkills = new Set(Object.values(TAXONOMY.skills));
let taxonomyErrors = 0;
cognizantQuestions.forEach(q => {
  if (!validSkills.has(q.skill as any)) {
    console.error(`Invalid skill: ${q.skill} in question ${q.id}`);
    taxonomyErrors++;
  }
});
console.log(`Taxonomy Validation: ${taxonomyErrors === 0 ? 'PASS (100% Aligned)' : 'FAIL'}`);

// 4. Option & Explanation Validation
let optionErrors = 0;
let explanationErrors = 0;

cognizantQuestions.forEach(q => {
  // Option checks
  if (!(q as import('./src/types').MCQQuestion).options || (q as import('./src/types').MCQQuestion).options.length !== 4) {
    console.error(`Question ${q.id} does not have 4 options`);
    optionErrors++;
  }
  const optionIds = (q as import('./src/types').MCQQuestion).options.map(o => o.id);
  if (optionIds.join(',') !== 'A,B,C,D') {
    console.error(`Question ${q.id} options are not A,B,C,D`);
    optionErrors++;
  }
  if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer)) {
    console.error(`Question ${q.id} correctAnswer ${q.correctAnswer} is invalid`);
    optionErrors++;
  }
  const optionTexts = new Set((q as import('./src/types').MCQQuestion).options.map(o => o.text.trim().toLowerCase()));
  if (optionTexts.size !== 4) {
    console.error(`Question ${q.id} has duplicate option texts`);
    optionErrors++;
  }

  // Explanation checks
  if (!q.explanation || q.explanation.trim().length < 20) {
    console.error(`Question ${q.id} has insufficient explanation`);
    explanationErrors++;
  }
});

console.log(`Option Integrity Check (4 options, unique, valid pointer): ${optionErrors === 0 ? 'PASS' : 'FAIL'}`);
console.log(`Explanation Quality Check: ${explanationErrors === 0 ? 'PASS' : 'FAIL'}\n`);

// 5. Full Bank Originality & Duplicate Check
console.log('--- 4. FULL 330-QUESTION ORIGINALITY & DUPLICATE AUDIT ---');
const dupDetector = new DuplicateDetection();
const idSet = new Set<string>();
let idDupes = 0;
let textDupes = 0;
let semanticDupes = 0;

fullBank330.forEach(q => {
  if (idSet.has(q.id)) idDupes++;
  idSet.add(q.id);
});

for (let i = 0; i < fullBank330.length; i++) {
  for (let j = i + 1; j < fullBank330.length; j++) {
    if (dupDetector.normalizeQuestionText(fullBank330[i].questionText) === dupDetector.normalizeQuestionText(fullBank330[j].questionText)) {
      textDupes++;
    } else if (dupDetector.generateSemanticHash(fullBank330[i].questionText) === dupDetector.generateSemanticHash(fullBank330[j].questionText)) {
      semanticDupes++;
    }
  }
}
console.log(`ID Collisions: ${idDupes}`);
console.log(`Normalized Text Collisions: ${textDupes}`);
console.log(`Semantic Near-Duplicates: ${semanticDupes}`);
console.log(`Originality Audit: ${idDupes === 0 && textDupes === 0 && semanticDupes === 0 ? 'PASS (0 Collisions)' : 'FAIL'}\n`);

// 6. Runtime Capacity & Scenario Verification
console.log('--- 5. RUNTIME CAPACITY & CANDIDATE SCENARIOS ---');
const cogBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_cognizant_genc')!;
const capacityService = new CompanyContentCapacityService();

const seenFoundation75 = [...quantQuestions.map(q => q.id), ...logicalQuestions.map(q => q.id), ...verbalQuestions.map(q => q.id)];
const seenFoundation125 = [...seenFoundation75, ...diQuestions.map(q => q.id), ...pseudocodeQuestions.map(q => q.id)];
const seenWipro = wiproQuestions.map(q => q.id);
const seenAccenture = accentureQuestions.map(q => q.id);
const seenFoundationPlusWipro = [...seenFoundation125, ...seenWipro];
const seenFoundationPlusAccenture = [...seenFoundation125, ...seenAccenture];
const seenFoundationPlusWiproPlusAccenture = [...new Set([...seenFoundation125, ...seenWipro, ...seenAccenture])];

function verifyScenario(name: string, seenList: string[]) {
  const cap = capacityService.analyzeCandidateCapacity(cogBp, 'usr_ver', fullBank330, seenList);
  const strict = questionSelectionEngine.selectCompanyAssessmentQuestions({
    userId: 'usr_ver',
    blueprint: cogBp,
    questionBank: fullBank330,
    previouslyAttemptedQuestionIds: seenList,
    allowPartialReuseWhenExhausted: false,
  });

  const selectedIds = strict.sectionResults.flatMap(sr => sr.selectedQuestions).map(q => q.id);
  const seenSet = new Set(seenList);
  const contaminationCount = selectedIds.filter(id => seenSet.has(id)).length;
  const uniqueSelectedCount = new Set(selectedIds).size;

  console.log(`Scenario: ${name}`);
  console.log(`  Seen Count: ${seenList.length} | Compatible Fresh: ${cap.totalFreshCompatible} / Required: ${cap.totalRequired}`);
  console.log(`  Strict Assembly -> Selected: ${strict.totalSelected}/${strict.totalRequired} | Fresh: ${strict.freshCount} | Reused: ${strict.reusedCount}`);
  console.log(`  Unique Selected IDs: ${uniqueSelectedCount} | Contamination Count: ${contaminationCount}`);
  console.log(`  Strict Assembly Status: ${strict.success ? 'PASS' : 'SHORTFALL'} (Contamination: ${contaminationCount === 0 ? 'CLEAN' : 'CONTAMINATED'})\n`);

  return { strict, contaminationCount, uniqueSelectedCount };
}

console.log('Testing Scenario A: Cold-Start Candidate (0 seen)...');
verifyScenario('Scenario A: Cold Start', []);

console.log('Testing Scenario B: Foundation Q + L + V (75 seen)...');
verifyScenario('Scenario B: Foundation Q+L+V', seenFoundation75);

console.log('Testing Scenario C: All 5 Foundation Completed (125 seen)...');
verifyScenario('Scenario C: All 5 Foundation', seenFoundation125);

console.log('Testing Scenario D: Foundation + Wipro Completed (151 seen)...');
verifyScenario('Scenario D: Foundation + Wipro', seenFoundationPlusWipro);

console.log('Testing Scenario E: Foundation + Accenture Completed (214 seen)...');
verifyScenario('Scenario E: Foundation + Accenture', seenFoundationPlusAccenture);

console.log('Testing Scenario F (PRIMARY ACCEPTANCE): Foundation + Wipro + Accenture (240 seen)...');
const primaryRes = verifyScenario('Scenario F: PRIMARY ACCEPTANCE (Found+Wip+Acc)', seenFoundationPlusWiproPlusAccenture);

// Attempt 1 from cold start
const att1 = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_att1',
  blueprint: cogBp,
  questionBank: fullBank330,
  previouslyAttemptedQuestionIds: [],
  allowPartialReuseWhenExhausted: false,
});
const seenAtt1 = att1.sectionResults.flatMap(sr => sr.selectedQuestions).map(q => q.id);

console.log('Testing Scenario G: Attempt #2 After Cold-Start Attempt #1 (80 seen)...');
verifyScenario('Scenario G: Attempt #2 (Cold-Start)', seenAtt1);

console.log('Testing Scenario H: Attempt #2 After Foundation + Wipro + Accenture + Attempt #1 (250 seen)...');
const seenAllPlusAtt1 = [...new Set([...seenFoundationPlusWiproPlusAccenture, ...seenAtt1])];
verifyScenario('Scenario H: Attempt #2 (All Prior + Attempt #1)', seenAllPlusAtt1);

// 7. Platform Regression
console.log('--- 6. PLATFORM REGRESSION AUDIT ---');
const fq = db.getTestById('cat_foundation_quant', false);
const fl = db.getTestById('cat_foundation_logical', false);
const fv = db.getTestById('cat_foundation_verbal', false);
const fdi = db.getTestById('cat_foundation_di', false);
const fp = db.getTestById('cat_foundation_pseudocode', false);
const wip = db.getTestById('cat_company_wipro', false);
const acc = db.getTestById('cat_company_accenture', false);

console.log(`Foundation Banks: Quant=25, Logical=25, Verbal=25, DI=25, Pseudocode=25 (Total: 125) -> ${quantQuestions.length === 25 && logicalQuestions.length === 25 && verbalQuestions.length === 25 && diQuestions.length === 25 && pseudocodeQuestions.length === 25 ? 'PASS' : 'FAIL'}`);
console.log(`Foundation Tests (5/5 ready & verified): ${fq?.status === 'ready' && fl?.status === 'ready' && fv?.status === 'ready' && fdi?.status === 'ready' && fp?.status === 'ready' ? 'PASS' : 'FAIL'}`);
console.log(`Wipro Bank (26 authored): ${wiproQuestions.length === 26 ? 'PASS' : 'FAIL'}`);
console.log(`Wipro Elite NTH Test (ready & verified): ${wip?.status === 'ready' && wip?.verificationStatus === 'VERIFIED' ? 'PASS' : 'FAIL'}`);
console.log(`Accenture Bank (89 authored): ${accentureQuestions.length === 89 ? 'PASS' : 'FAIL'}`);
console.log(`Accenture Cognitive Test (ready & verified): ${acc?.status === 'ready' && acc?.verificationStatus === 'VERIFIED' ? 'PASS' : 'FAIL'}`);
console.log(`Infosys Bank (7 authored): ${infosysQuestions.length === 7 ? 'PASS' : 'FAIL'}`);
console.log(`TCS Adv Bank (20 authored) & Coding (2 authored): ${tcsAdvancedQuestions.length === 20 && tcsCodingProblems.length === 2 ? 'PASS' : 'FAIL'}`);

// 8. Publishing Gate Guardrails
console.log('\n--- 7. PUBLISHING GATE GUARDRAILS ---');
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
console.log('PHASE 21C VERIFICATION COMPLETE');
console.log('================================================================');

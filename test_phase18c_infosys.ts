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
import { COMPANY_BLUEPRINTS } from './src/data/blueprints/company';
import { COMPANY_PATTERNS_REGISTRY } from './src/data/companyPatterns/registry';
import { db } from './server/db';

console.log('================================================================');
console.log('PHASE 18C VERIFICATION SUITE — INFOSYS CONTENT CREATION & QA');
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

// 2. Cross-Company Banks Integrity (Accenture: 22, Cognizant: 14)
console.log('--- 2. PRIOR COMPANY BANKS INTEGRITY ---');
console.log(`Accenture count: ${accentureQuestions.length} (Expected: 22)`);
console.log(`Cognizant count: ${cognizantQuestions.length} (Expected: 14)`);
const priorPassed = accentureQuestions.length === 22 && cognizantQuestions.length === 14;
console.log(`Prior Banks Safety: ${priorPassed ? 'PASS' : 'FAIL'}\n`);

// 3. Infosys Questions Count & Distribution
console.log('--- 3. INFOSYS QUESTIONS COUNT & DISTRIBUTION ---');
console.log(`Infosys Questions Total: ${infosysQuestions.length} (Expected: 7)`);

const reasoningQuestions = infosysQuestions.slice(0, 3);
const puzzleQuestions = infosysQuestions.slice(3, 7);

const countDiff = (list: typeof infosysQuestions) => {
  const d = { Easy: 0, Medium: 0, Hard: 0 };
  list.forEach(q => d[q.difficulty]++);
  return d;
};

const resDiff = countDiff(reasoningQuestions);
const puzDiff = countDiff(puzzleQuestions);
const totalInfDiff = countDiff(infosysQuestions);

console.log('Reasoning Ability (3 questions):', resDiff, '(Target: Easy 1, Medium 2, Hard 0)');
console.log('Puzzle/Game-based (4 questions):', puzDiff, '(Target: Easy 0, Medium 2, Hard 2)');
console.log('Total Infosys Distribution (7 questions):', totalInfDiff, '(Target: Easy 1, Medium 4, Hard 2)');

const distributionMatch = 
  resDiff.Easy === 1 && resDiff.Medium === 2 && resDiff.Hard === 0 &&
  puzDiff.Easy === 0 && puzDiff.Medium === 2 && puzDiff.Hard === 2 &&
  totalInfDiff.Easy === 1 && totalInfDiff.Medium === 4 && totalInfDiff.Hard === 2;

console.log(`Distribution Check: ${distributionMatch ? 'PASS' : 'FAIL'}\n`);

// 4. Cross-Bank Duplicate Detection Across ALL Question Banks (168 total)
console.log('--- 4. CROSS-BANK DUPLICATE DETECTION ---');
const allExistingQuestions = [
  ...quantQuestions,
  ...logicalQuestions,
  ...verbalQuestions,
  ...diQuestions,
  ...pseudocodeQuestions,
  ...accentureQuestions,
  ...cognizantQuestions
];

const dupDetector = new DuplicateDetection();
let duplicateFound = false;

// Check ID uniqueness across all 168 questions
const allIds = new Set<string>();
[...allExistingQuestions, ...infosysQuestions].forEach(q => {
  if (allIds.has(q.id)) {
    console.error(`ERROR: Duplicate ID found: ${q.id}`);
    duplicateFound = true;
  }
  allIds.add(q.id);
});

// Check text duplication between new questions and all existing banks
infosysQuestions.forEach(qNew => {
  if (dupDetector.isDuplicate(qNew, allExistingQuestions)) {
    console.error(`ERROR: Question ${qNew.id} is duplicate of an existing question!`);
    duplicateFound = true;
  }
});

// Check text duplication within infosys questions themselves
for (let i = 0; i < infosysQuestions.length; i++) {
  for (let j = i + 1; j < infosysQuestions.length; j++) {
    const q1 = infosysQuestions[i];
    const q2 = infosysQuestions[j];
    if (dupDetector.normalizeQuestionText(q1.questionText) === dupDetector.normalizeQuestionText(q2.questionText)) {
      console.error(`ERROR: Question ${q1.id} exact match duplicate of ${q2.id}`);
      duplicateFound = true;
    }
  }
}

console.log(`Cross-Bank Duplicate Detection: ${!duplicateFound ? 'PASS (0 duplicates detected across 168 total questions)' : 'FAIL'}\n`);

// 5. Content QA Engine Validation on Infosys Questions
console.log('--- 5. CONTENT QA ENGINE VALIDATION ---');
const qaEngine = new ContentQAEngine();
const qaReport = qaEngine.generateFullQAReport(infosysQuestions);

console.log(`Total Audited: ${qaReport.totalQuestions}`);
console.log(`Passed Validation: ${qaReport.passedValidation}`);
console.log(`Failed Validation: ${qaReport.failedValidation}`);
console.log(`Duplicate Count in Report: ${qaReport.duplicateCount}`);
console.log(`Missing Metadata Count: ${qaReport.missingMetadataCount}`);
console.log(`Provenance Distribution:`, qaReport.provenanceDistribution);

if (qaReport.failedValidation > 0) {
  console.log('\nValidation Failures Detail:');
  qaReport.questionAudits.filter(q => !q.isValid).forEach(q => {
    console.log(`- [${q.questionId}]: Errors: ${JSON.stringify(q.errors)} | Mismatch: ${q.difficultyMismatch} | Math: ${JSON.stringify(q.mathVerification)}`);
  });
}

// 6. Taxonomy Mapping Verification for Puzzle/Game Questions
console.log('\n--- 6. PUZZLE/GAME TAXONOMY MAPPING VERIFICATION ---');
puzzleQuestions.forEach(pq => {
  console.log(`[${pq.id}] Topic: "${pq.topic}" (Canonical) | Subtopic: "${pq.subtopic}"`);
});

// 7. Blueprint & Publishing Gate Status
console.log('\n--- 7. BLUEPRINT & PUBLISHING GATE STATUS ---');
const infosysBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_infosys_assessment');
const infosysPattern = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_infosys_assessment');
const catInfosysTest = db.getTestById('cat_company_infosys', false);

console.log(`Infosys Blueprint ID: ${infosysBp?.id}`);
console.log(`Blueprint Verification Status: ${infosysBp?.verificationStatus} (Expected: UNVERIFIED)`);
console.log(`Pattern Status in Registry: ${infosysPattern?.status} (Expected: coming_soon)`);
console.log(`Catalogue Playability Status in DB: ${catInfosysTest?.status} (Expected: coming_soon)`);

const blueprintGateSafe = 
  infosysBp?.verificationStatus === 'UNVERIFIED' &&
  infosysPattern?.status === 'coming_soon' &&
  catInfosysTest?.status === 'coming_soon';

console.log(`Publishing Gate Unpromoted & Safe: ${blueprintGateSafe ? 'PASS' : 'FAIL'}`);

console.log('\n================================================================');
console.log('PHASE 18C VERIFICATION COMPLETE');
console.log('================================================================');

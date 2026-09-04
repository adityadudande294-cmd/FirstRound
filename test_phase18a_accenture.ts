import { ContentQAEngine } from './src/services/ContentQAEngine';
import { DuplicateDetection } from './src/services/DuplicateDetection';
import { quantQuestions } from './src/data/questionBank/quant';
import { logicalQuestions } from './src/data/questionBank/logical';
import { verbalQuestions } from './src/data/questionBank/verbal';
import { diQuestions } from './src/data/questionBank/di';
import { pseudocodeQuestions } from './src/data/questionBank/pseudocode';
import { accentureQuestions } from './src/data/questionBank/accenture';
import { COMPANY_BLUEPRINTS } from './src/data/blueprints/company';
import { FOUNDATION_BLUEPRINTS } from './src/data/blueprints/foundation';
import { COMPANY_PATTERNS_REGISTRY } from './src/data/companyPatterns/registry';
import { db } from './server/db';

console.log('================================================================');
console.log('PHASE 18A VERIFICATION SUITE — ACCENTURE CONTENT CREATION & QA');
console.log('================================================================\n');

// 1. Check Foundation Questions Unchanged
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

// 2. Accenture Questions Generation & Counts
console.log('--- 2. ACCENTURE QUESTIONS COUNT & DISTRIBUTION ---');
console.log(`Accenture Questions Total: ${accentureQuestions.length} (Expected: 22)`);

const officeQuestions = accentureQuestions.slice(0, 12);
const netCloudQuestions = accentureQuestions.slice(12, 22);

const countDiff = (list: typeof accentureQuestions) => {
  const d = { Easy: 0, Medium: 0, Hard: 0 };
  list.forEach(q => d[q.difficulty]++);
  return d;
};

const officeDiff = countDiff(officeQuestions);
const netCloudDiff = countDiff(netCloudQuestions);
const totalAccDiff = countDiff(accentureQuestions);

console.log('MS Office (12 questions):', officeDiff, '(Target: Easy 4, Medium 7, Hard 1)');
console.log('Networking/Security/Cloud (10 questions):', netCloudDiff, '(Target: Easy 2, Medium 6, Hard 2)');
console.log('Total Accenture Distribution (22 questions):', totalAccDiff, '(Target: Easy 6, Medium 13, Hard 3)');

const distributionMatch = 
  officeDiff.Easy === 4 && officeDiff.Medium === 7 && officeDiff.Hard === 1 &&
  netCloudDiff.Easy === 2 && netCloudDiff.Medium === 6 && netCloudDiff.Hard === 2 &&
  totalAccDiff.Easy === 6 && totalAccDiff.Medium === 13 && totalAccDiff.Hard === 3;

console.log(`Distribution Check: ${distributionMatch ? 'PASS' : 'FAIL'}\n`);

// 3. Cross-Bank Duplicate Detection
console.log('--- 3. DUPLICATE DETECTION ACROSS ALL BANKS ---');
const allExistingQuestions = [
  ...quantQuestions,
  ...logicalQuestions,
  ...verbalQuestions,
  ...diQuestions,
  ...pseudocodeQuestions
];

const dupDetector = new DuplicateDetection();
let duplicateFound = false;

// Check ID uniqueness
const allIds = new Set<string>();
[...allExistingQuestions, ...accentureQuestions].forEach(q => {
  if (allIds.has(q.id)) {
    console.error(`ERROR: Duplicate ID found: ${q.id}`);
    duplicateFound = true;
  }
  allIds.add(q.id);
});

// Check text duplication between new questions and existing foundation
accentureQuestions.forEach(qNew => {
  if (dupDetector.isDuplicate(qNew, allExistingQuestions)) {
    console.error(`ERROR: Question ${qNew.id} is duplicate of an existing question!`);
    duplicateFound = true;
  }
});

// Check text duplication within accenture questions themselves
for (let i = 0; i < accentureQuestions.length; i++) {
  for (let j = i + 1; j < accentureQuestions.length; j++) {
    const q1 = accentureQuestions[i];
    const q2 = accentureQuestions[j];
    if (dupDetector.normalizeQuestionText(q1.questionText) === dupDetector.normalizeQuestionText(q2.questionText)) {
      console.error(`ERROR: Question ${q1.id} exact match duplicate of ${q2.id}`);
      duplicateFound = true;
    }
  }
}

console.log(`Duplicate Detection: ${!duplicateFound ? 'PASS (0 duplicates detected)' : 'FAIL'}\n`);

// 4. Content QA Engine Validation on Accenture Questions
console.log('--- 4. CONTENT QA ENGINE VALIDATION ---');
const qaEngine = new ContentQAEngine();
const qaReport = qaEngine.generateFullQAReport(accentureQuestions);

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

// 5. Blueprint & Publishing Gate Verification
console.log('\n--- 5. BLUEPRINT & PUBLISHING GATE STATUS ---');
const accentureBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_accenture_cognitive');
const accenturePattern = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_accenture_cognitive_technical');
const catAccentureTest = db.getTestById('cat_company_accenture', false);

console.log(`Accenture Blueprint ID: ${accentureBp?.id}`);
console.log(`Blueprint Verification Status: ${accentureBp?.verificationStatus} (Expected: UNVERIFIED)`);
console.log(`Pattern Status in Registry: ${accenturePattern?.status} (Expected: coming_soon)`);
console.log(`Catalogue Playability Status in DB: ${catAccentureTest?.status} (Expected: coming_soon)`);

const blueprintGateSafe = 
  accentureBp?.verificationStatus === 'UNVERIFIED' &&
  accenturePattern?.status === 'coming_soon' &&
  catAccentureTest?.status === 'coming_soon';

console.log(`Publishing Gate Unpromoted & Safe: ${blueprintGateSafe ? 'PASS' : 'FAIL'}`);

console.log('\n================================================================');
console.log('PHASE 18A VERIFICATION COMPLETE');
console.log('================================================================');

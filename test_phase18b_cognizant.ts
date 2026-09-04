import { ContentQAEngine } from './src/services/ContentQAEngine';
import { DuplicateDetection } from './src/services/DuplicateDetection';
import { quantQuestions } from './src/data/questionBank/quant';
import { logicalQuestions } from './src/data/questionBank/logical';
import { verbalQuestions } from './src/data/questionBank/verbal';
import { diQuestions } from './src/data/questionBank/di';
import { pseudocodeQuestions } from './src/data/questionBank/pseudocode';
import { accentureQuestions } from './src/data/questionBank/accenture';
import { cognizantQuestions } from './src/data/questionBank/cognizant';
import { COMPANY_BLUEPRINTS } from './src/data/blueprints/company';
import { COMPANY_PATTERNS_REGISTRY } from './src/data/companyPatterns/registry';
import { db } from './server/db';

console.log('================================================================');
console.log('PHASE 18B VERIFICATION SUITE — COGNIZANT GENC CONTENT CREATION & QA');
console.log('================================================================\n');

// 1. Check Foundation Questions Unchanged (125 questions)
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

// 2. Check Accenture Bank Integrity (22 questions)
console.log('--- 2. ACCENTURE QUESTION BANK INTEGRITY ---');
console.log(`Accenture count: ${accentureQuestions.length} (Expected: 22)`);
const accenturePassed = accentureQuestions.length === 22;
console.log(`Accenture Bank Safety: ${accenturePassed ? 'PASS' : 'FAIL'}\n`);

// 3. Cognizant Questions Generation & Counts
console.log('--- 3. COGNIZANT QUESTIONS COUNT & DISTRIBUTION ---');
console.log(`Cognizant Questions Total: ${cognizantQuestions.length} (Expected: 14)`);

const numericalQuestions = cognizantQuestions.slice(0, 1);
const logicalAnalyticalQuestions = cognizantQuestions.slice(1, 14);

const countDiff = (list: typeof cognizantQuestions) => {
  const d = { Easy: 0, Medium: 0, Hard: 0 };
  list.forEach(q => d[q.difficulty]++);
  return d;
};

const numDiff = countDiff(numericalQuestions);
const logDiff = countDiff(logicalAnalyticalQuestions);
const totalCogDiff = countDiff(cognizantQuestions);

console.log('Numerical (1 question):', numDiff, '(Target: Easy 1, Medium 0, Hard 0)');
console.log('Logical & Analytical (13 questions):', logDiff, '(Target: Easy 2, Medium 9, Hard 2)');
console.log('Total Cognizant Distribution (14 questions):', totalCogDiff, '(Target: Easy 3, Medium 9, Hard 2)');

const distributionMatch = 
  numDiff.Easy === 1 && numDiff.Medium === 0 && numDiff.Hard === 0 &&
  logDiff.Easy === 2 && logDiff.Medium === 9 && logDiff.Hard === 2 &&
  totalCogDiff.Easy === 3 && totalCogDiff.Medium === 9 && totalCogDiff.Hard === 2;

console.log(`Distribution Check: ${distributionMatch ? 'PASS' : 'FAIL'}\n`);

// 4. Cross-Bank Duplicate Detection
console.log('--- 4. DUPLICATE DETECTION ACROSS ALL BANKS ---');
const allExistingQuestions = [
  ...quantQuestions,
  ...logicalQuestions,
  ...verbalQuestions,
  ...diQuestions,
  ...pseudocodeQuestions,
  ...accentureQuestions
];

const dupDetector = new DuplicateDetection();
let duplicateFound = false;

// Check ID uniqueness
const allIds = new Set<string>();
[...allExistingQuestions, ...cognizantQuestions].forEach(q => {
  if (allIds.has(q.id)) {
    console.error(`ERROR: Duplicate ID found: ${q.id}`);
    duplicateFound = true;
  }
  allIds.add(q.id);
});

// Check text duplication between new questions and all existing banks
cognizantQuestions.forEach(qNew => {
  if (dupDetector.isDuplicate(qNew, allExistingQuestions)) {
    console.error(`ERROR: Question ${qNew.id} is duplicate of an existing question!`);
    duplicateFound = true;
  }
});

// Check text duplication within cognizant questions themselves
for (let i = 0; i < cognizantQuestions.length; i++) {
  for (let j = i + 1; j < cognizantQuestions.length; j++) {
    const q1 = cognizantQuestions[i];
    const q2 = cognizantQuestions[j];
    if (dupDetector.normalizeQuestionText(q1.questionText) === dupDetector.normalizeQuestionText(q2.questionText)) {
      console.error(`ERROR: Question ${q1.id} exact match duplicate of ${q2.id}`);
      duplicateFound = true;
    }
  }
}

console.log(`Cross-Bank Duplicate Detection: ${!duplicateFound ? 'PASS (0 duplicates detected across 161 total questions)' : 'FAIL'}\n`);

// 5. Content QA Engine Validation on Cognizant Questions
console.log('--- 5. CONTENT QA ENGINE VALIDATION ---');
const qaEngine = new ContentQAEngine();
const qaReport = qaEngine.generateFullQAReport(cognizantQuestions);

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

// 6. Blueprint & Publishing Gate Verification
console.log('\n--- 6. BLUEPRINT & PUBLISHING GATE STATUS ---');
const cognizantBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_cognizant_genc');
const cognizantPattern = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_cognizant_genc_aptitude');
const catCognizantTest = db.getTestById('cat_company_cognizant', false);

console.log(`Cognizant Blueprint ID: ${cognizantBp?.id}`);
console.log(`Blueprint Verification Status: ${cognizantBp?.verificationStatus} (Expected: UNVERIFIED)`);
console.log(`Pattern Status in Registry: ${cognizantPattern?.status} (Expected: coming_soon)`);
console.log(`Catalogue Playability Status in DB: ${catCognizantTest?.status} (Expected: coming_soon)`);

const blueprintGateSafe = 
  cognizantBp?.verificationStatus === 'UNVERIFIED' &&
  cognizantPattern?.status === 'coming_soon' &&
  catCognizantTest?.status === 'coming_soon';

console.log(`Publishing Gate Unpromoted & Safe: ${blueprintGateSafe ? 'PASS' : 'FAIL'}`);

console.log('\n================================================================');
console.log('PHASE 18B VERIFICATION COMPLETE');
console.log('================================================================');

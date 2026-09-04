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
import { COMPANY_BLUEPRINTS } from './src/data/blueprints/company';
import { COMPANY_PATTERNS_REGISTRY } from './src/data/companyPatterns/registry';
import { db } from './server/db';

console.log('================================================================');
console.log('PHASE 18D VERIFICATION SUITE — TCS NQT ADVANCED CONTENT & QA');
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

// 2. Cross-Company Banks Integrity (Accenture: 22, Cognizant: 14, Infosys: 7)
console.log('--- 2. PRIOR COMPANY BANKS INTEGRITY ---');
console.log(`Accenture count: ${accentureQuestions.length} (Expected: 22)`);
console.log(`Cognizant count: ${cognizantQuestions.length} (Expected: 14)`);
console.log(`Infosys count: ${infosysQuestions.length} (Expected: 7)`);
const priorPassed = accentureQuestions.length === 22 && cognizantQuestions.length === 14 && infosysQuestions.length === 7;
console.log(`Prior Banks Safety: ${priorPassed ? 'PASS' : 'FAIL'}\n`);

// 3. TCS Advanced Questions Count & Distribution
console.log('--- 3. TCS ADVANCED QUESTIONS COUNT & DISTRIBUTION ---');
console.log(`TCS Advanced Questions Total: ${tcsAdvancedQuestions.length} (Expected: 20)`);

const countDiff = (list: typeof tcsAdvancedQuestions) => {
  const d = { Easy: 0, Medium: 0, Hard: 0 };
  list.forEach(q => d[q.difficulty]++);
  return d;
};

const totalTcsDiff = countDiff(tcsAdvancedQuestions);
console.log('TCS Advanced Difficulty Distribution (20 questions):', totalTcsDiff, '(Target: Easy 0, Medium 0, Hard 20)');

const distributionMatch = totalTcsDiff.Easy === 0 && totalTcsDiff.Medium === 0 && totalTcsDiff.Hard === 20;
console.log(`Difficulty Distribution Check: ${distributionMatch ? 'PASS' : 'FAIL'}\n`);

// 4. Cross-Bank Duplicate Detection Across ALL Question Banks (188 total)
console.log('--- 4. CROSS-BANK DUPLICATE DETECTION ---');
const allExistingQuestions = [
  ...quantQuestions,
  ...logicalQuestions,
  ...verbalQuestions,
  ...diQuestions,
  ...pseudocodeQuestions,
  ...accentureQuestions,
  ...cognizantQuestions,
  ...infosysQuestions
];

const dupDetector = new DuplicateDetection();
let duplicateFound = false;

// Check ID uniqueness across all 188 questions
const allIds = new Set<string>();
[...allExistingQuestions, ...tcsAdvancedQuestions].forEach(q => {
  if (allIds.has(q.id)) {
    console.error(`ERROR: Duplicate ID found: ${q.id}`);
    duplicateFound = true;
  }
  allIds.add(q.id);
});

// Check text duplication between new questions and all existing banks
tcsAdvancedQuestions.forEach(qNew => {
  if (dupDetector.isDuplicate(qNew, allExistingQuestions)) {
    console.error(`ERROR: Question ${qNew.id} is duplicate of an existing question!`);
    duplicateFound = true;
  }
});

// Check text duplication within TCS Advanced questions themselves
for (let i = 0; i < tcsAdvancedQuestions.length; i++) {
  for (let j = i + 1; j < tcsAdvancedQuestions.length; j++) {
    const q1 = tcsAdvancedQuestions[i];
    const q2 = tcsAdvancedQuestions[j];
    if (dupDetector.normalizeQuestionText(q1.questionText) === dupDetector.normalizeQuestionText(q2.questionText)) {
      console.error(`ERROR: Question ${q1.id} exact match duplicate of ${q2.id}`);
      duplicateFound = true;
    }
  }
}

console.log(`Cross-Bank Duplicate Detection: ${!duplicateFound ? 'PASS (0 duplicates detected across 188 total questions)' : 'FAIL'}\n`);

// 5. Content QA Engine Validation on TCS Advanced Questions
console.log('--- 5. CONTENT QA ENGINE VALIDATION ---');
const qaEngine = new ContentQAEngine();
const qaReport = qaEngine.generateFullQAReport(tcsAdvancedQuestions);

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

// 6. Blueprint & Publishing Gate Status
console.log('\n--- 6. BLUEPRINT & PUBLISHING GATE STATUS ---');
const tcsAdvBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_tcs_nqt_advanced');
const tcsAdvPattern = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_tcs_nqt_advanced');
const catTcsAdvTest = db.getTestById('cat_company_tcs', false);

console.log(`TCS Advanced Blueprint ID: ${tcsAdvBp?.id}`);
console.log(`Blueprint Verification Status: ${tcsAdvBp?.verificationStatus} (Expected: UNVERIFIED)`);
console.log(`Pattern Status in Registry: ${tcsAdvPattern?.status} (Expected: coming_soon)`);
console.log(`Catalogue Playability Status in DB: ${catTcsAdvTest?.status} (Expected: coming_soon)`);

const blueprintGateSafe = 
  tcsAdvBp?.verificationStatus === 'UNVERIFIED' &&
  tcsAdvPattern?.status === 'coming_soon' &&
  catTcsAdvTest?.status === 'coming_soon';

console.log(`Publishing Gate Unpromoted & Safe: ${blueprintGateSafe ? 'PASS' : 'FAIL'}`);

console.log('\n================================================================');
console.log('PHASE 18D VERIFICATION COMPLETE');
console.log('================================================================');

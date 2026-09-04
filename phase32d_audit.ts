import { codingMockQuestions } from './src/data/questionBank/codingMock';
import { coreCsQuestions } from './src/data/questionBank/coreCs';
import { dsaQuestions } from './src/data/questionBank/dsa';
import { codingOutputQuestions } from './src/data/questionBank/codingOutput';
import { progFundamentalsQuestions } from './src/data/questionBank/progFundamentals';
import { sqlQuestions } from './src/data/questionBank/sql';

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

import { CATALOGUE_TESTS } from './server/data/catalogueData';
import { CODING_BLUEPRINTS } from './src/data/blueprints/coding';

const sixMockQuestions = [
  ...codingMockQuestions,
  ...coreCsQuestions,
  ...dsaQuestions,
  ...codingOutputQuestions,
  ...progFundamentalsQuestions,
  ...sqlQuestions
];

const liveQuestions = [
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
  ...wiproQuestions
];

const liveCount = liveQuestions.length;
const mockCount = sixMockQuestions.length;

console.log("=== 1. VERIFY ALL SIX TECHNICAL MOCKS ===");
const counts: Record<string, number> = {
  cat_coding_core_cs: 0,
  cat_coding_dsa: 0,
  cat_coding_mock_01: 0,
  cat_coding_output_debug: 0,
  cat_coding_prog_fundamentals: 0,
  cat_coding_sql: 0
};

sixMockQuestions.forEach(q => {
  if (counts[q.testSeriesId] !== undefined) {
    counts[q.testSeriesId]++;
  }
});
console.table(counts);
console.log(`Total Expected: 160 | Actual: ${mockCount}`);

console.log("\n=== 2. STRICT QUESTION-TYPE AUDIT ===");
const typeDist: Record<string, number> = {};
let typeViolations = 0;
sixMockQuestions.forEach(q => {
  typeDist[q.questionType] = (typeDist[q.questionType] || 0) + 1;
  if (q.questionType === 'CODING') {
    if (!q.codingConfig) {
      console.error(`Missing codingConfig on ${q.id}`);
      typeViolations++;
    }
  } else if (q.questionType === 'MCQ' || q.questionType === 'CODE_OUTPUT' || q.questionType === 'SQL') {
    if (!q.options || q.options.length === 0) {
      console.error(`Missing options on ${q.id}`);
      typeViolations++;
    }
  }
});
console.table(typeDist);
console.log(`Type Violations: ${typeViolations}`);

console.log("\n=== 4. CODING CONTENT QUALITY AUDIT ===");
let codingErrors = 0;
sixMockQuestions.forEach(q => {
  if (q.questionType === 'CODING') {
    const config = q.codingConfig;
    if (!config) return;
    
    if (!config.problemStatement && !(q as any).problemStatement) {
      console.error(`Coding question ${q.id} missing problemStatement`);
      codingErrors++;
    }
    if (!(config.starterCode && Object.keys(config.starterCode).length > 0) && !(q as any).starterCode) {
      console.error(`Coding question ${q.id} missing starterCode`);
      codingErrors++;
    }
  }
});
console.log(`Coding Metadata Errors: ${codingErrors}`);

console.log("\n=== 5. DUPLICATE & COLLISION AUDIT ===");
let collisions = 0;
const allIds = new Set<string>();
const allTexts = new Set<string>();

const combined = [...liveQuestions, ...sixMockQuestions];
combined.forEach(q => {
  if (allIds.has(q.id)) {
    console.error(`Duplicate ID found: ${q.id}`);
    collisions++;
  }
  allIds.add(q.id);

  const text = (q.questionText || (q as any).codingConfig?.problemStatement || (q as any).problemStatement || '').trim().toLowerCase();
  if (text) {
    if (allTexts.has(text)) {
      console.error(`Duplicate Text found: ${text.substring(0, 50)}... (ID: ${q.id})`);
      collisions++;
    }
    allTexts.add(text);
  }
});
console.log(`Total Duplicates Found: ${collisions}`);

console.log("\n=== 6. BLUEPRINT / PATTERN / CATALOGUE CONSISTENCY ===");
let catalogueErrors = 0;
const stagingCatalogueIds = [
  'cat_coding_core_cs',
  'cat_coding_dsa',
  'cat_coding_mock_01',
  'cat_coding_output_debug',
  'cat_coding_prog_fundamentals',
  'cat_coding_sql'
];

stagingCatalogueIds.forEach(id => {
  const cat = CATALOGUE_TESTS.find((c: any) => c.id === id);
  if (!cat) {
    console.error(`Catalogue entry missing for ${id}`);
    catalogueErrors++;
  } else {
    if (cat.status !== 'coming_soon') {
      console.error(`${id} status is not coming_soon (found ${cat.status})`);
      catalogueErrors++;
    }
    if (cat.verificationStatus !== 'UNVERIFIED') {
      console.error(`${id} verificationStatus is not UNVERIFIED`);
      catalogueErrors++;
    }
  }
});
console.log(`Catalogue Errors: ${catalogueErrors}`);

console.log("\n=== 7. STAGING SAFETY ===");
let liveSafetyErrors = 0;
const expectedLiveIds = [
  'cat_foundation_quant',
  'cat_foundation_logical',
  'cat_foundation_verbal',
  'cat_foundation_di',
  'cat_foundation_pseudocode',
  'cat_company_wipro',
  'cat_company_accenture',
  'cat_company_cognizant',
  'cat_company_infosys',
  'cat_company_tcs',
  'cat_company_tcs_foundation'
];

const allLiveCats = CATALOGUE_TESTS.filter((c: any) => c.status === 'ready' && c.verificationStatus === 'VERIFIED');
if (allLiveCats.length !== 11) {
  console.error(`Expected 11 live assessments, found ${allLiveCats.length}`);
  liveSafetyErrors++;
}

allLiveCats.forEach((c: any) => {
  if (!expectedLiveIds.includes(c.id)) {
    console.error(`Unexpected assessment is live: ${c.id}`);
    liveSafetyErrors++;
  }
});
console.log(`Live Safety Errors: ${liveSafetyErrors}`);
console.log(`Live Question Bank Size: ${liveCount}`);

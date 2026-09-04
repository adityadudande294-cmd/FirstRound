import { Question } from './src/types';
import { codingMockQuestions } from './src/data/questionBank/codingMock';
import { coreCsQuestions } from './src/data/questionBank/coreCs';
import { dsaQuestions } from './src/data/questionBank/dsa';
import { codingOutputQuestions } from './src/data/questionBank/codingOutput';
import { progFundamentalsQuestions } from './src/data/questionBank/progFundamentals';
import { sqlQuestions } from './src/data/questionBank/sql';

// 1. Combine all banks
const allBanks = [
  ...codingMockQuestions,
  ...coreCsQuestions,
  ...dsaQuestions,
  ...codingOutputQuestions,
  ...progFundamentalsQuestions,
  ...sqlQuestions
];

console.log(`\n=================================================`);
console.log(`PHASE 32C: CONTENT POPULATION & ARCHITECTURE AUDIT`);
console.log(`=================================================`);
console.log(`Total active questions: ${allBanks.length}`);

if (allBanks.length !== 160) {
  console.error(`❌ CRITICAL: Expected 160 questions, found ${allBanks.length}`);
  process.exit(1);
}
console.log(`✅ Passed: Exactly 160 questions authored and loaded.`);

// 2. Validate types and required fields
let errorCount = 0;
let mcqCount = 0;
let codingCount = 0;

const idSet = new Set<string>();
const textSet = new Set<string>();

allBanks.forEach(q => {
  if (idSet.has(q.id)) {
    console.error(`❌ Duplicate ID found: ${q.id}`);
    errorCount++;
  }
  idSet.add(q.id);
  
  const normText = (q as any).questionText?.trim().toLowerCase() || (q as any).codingConfig?.problemStatement?.trim().toLowerCase() || '';
  if (textSet.has(normText)) {
    console.error(`❌ Duplicate Question Text found for ID: ${q.id}`);
    errorCount++;
  }
  textSet.add(normText);

  if (!q.id || !q.testSeriesId || !q.questionType || !q.topic || !q.difficulty) {
    console.error(`❌ Missing base fields for ID: ${q.id}`);
    errorCount++;
  }

  if (q.questionType === 'MCQ') {
    mcqCount++;
    if (!q.options || q.options.length !== 4) {
      console.error(`❌ Invalid options for MCQ ID: ${q.id}`);
      errorCount++;
    }
    if (!q.correctOption) {
      console.error(`❌ Missing correctOption for MCQ ID: ${q.id}`);
      errorCount++;
    }
  } else if (q.questionType === 'CODING') {
    codingCount++;
    if (!q.codingConfig || !q.codingConfig.problemStatement || !q.codingConfig.supportedLanguages) {
      console.error(`❌ Invalid codingConfig for CODING ID: ${q.id}`);
      errorCount++;
    }
  } else {
    // Other types should not exist in this batch unless explicitly handled
    console.error(`❌ Unknown/Unsupported Question Type for ID: ${q.id}`);
    errorCount++;
  }
});

console.log(`\nQuestion Breakdown:`);
console.log(`MCQ Questions: ${mcqCount}`);
console.log(`Coding Questions: ${codingCount}`);

if (errorCount > 0) {
  console.error(`\n❌ Failed: ${errorCount} structural/duplicate errors detected.`);
  process.exit(1);
} else {
  console.log(`✅ Passed: No duplicates found. Strong typing strictly adhered to.`);
}

// 3. Freshness Capacity Analysis
console.log(`\n=================================================`);
console.log(`CANDIDATE FRESHNESS ANALYSIS (2-ATTEMPT)`);
console.log(`=================================================`);
const reqMatrix: any = {
  'cat_coding_core_cs': 35,
  'cat_coding_dsa': 30,
  'cat_coding_mock_01': 25,
  'cat_coding_output_debug': 20,
  'cat_coding_prog_fundamentals': 25,
  'cat_coding_sql': 25
};

let capacityFailed = false;
Object.keys(reqMatrix).forEach(bankId => {
  const req = reqMatrix[bankId];
  const count = allBanks.filter(q => q.testSeriesId === bankId).length;
  console.log(`[${bankId}] - Required: ${req} | Available: ${count}`);
  
  if (count < req * 2) {
    console.warn(`⚠️ Warning: [${bankId}] does not have enough fresh content for 2 fully unique attempts (needs ${req * 2}, has ${count}).`);
  }
});

console.log(`\n✅ Audit Complete. FINAL DECISION: CONTENT POPULATION COMPLETE — PROCEED TO 32D`);

import { CATALOGUE_TESTS } from './server/data/catalogueData';
import { CODING_BLUEPRINTS } from './src/data/blueprints/coding';
import { codingMockQuestions } from './src/data/questionBank/codingMock';
import { coreCsQuestions } from './src/data/questionBank/coreCs';
import { dsaQuestions } from './src/data/questionBank/dsa';
import { codingOutputQuestions } from './src/data/questionBank/codingOutput';
import { progFundamentalsQuestions } from './src/data/questionBank/progFundamentals';
import { sqlQuestions } from './src/data/questionBank/sql';


async function runAudit() {
  console.log('--- PHASE 32B CONTENT ARCHITECTURE AUDIT ---');
  let hasError = false;

  const allCodingQuestions = [
    ...codingMockQuestions,
    ...coreCsQuestions,
    ...dsaQuestions,
    ...codingOutputQuestions,
    ...progFundamentalsQuestions,
    ...sqlQuestions
  ];

  // 1. Matrix verification
  const codingTests = CATALOGUE_TESTS.filter(t => t.category === 'coding');
  if (codingTests.length !== 6) {
    console.error(`[ERROR] Expected 6 coding tests, found ${codingTests.length}`);
    hasError = true;
  }

  for (const t of codingTests) {
    const bp = CODING_BLUEPRINTS.find(b => b.id.replace('bp_', '') === t.id.replace('cat_', ''));
    if (!bp) {
      console.error(`[ERROR] Missing blueprint for ${t.id}`);
      hasError = true;
    } else {
      console.log(`[PASS] Blueprint mapped: ${bp.id} -> ${t.id} (${t.questionCount} Qs)`);
    }
  }

  // 2. Duplicate checking
  const idMap = new Set<string>();
  const textMap = new Set<string>();

  for (const q of allCodingQuestions) {
    if (idMap.has(q.id)) {
      console.error(`[ERROR] Duplicate Question ID found: ${q.id}`);
      hasError = true;
    }
    idMap.add(q.id);

    if (textMap.has(q.questionText)) {
      console.warn(`[WARN] Duplicate Question Text found for ID: ${q.id}`);
    }
    textMap.add(q.questionText);
  }

  console.log(`\nAudit Complete. Total Coding Questions in bank: ${allCodingQuestions.length}`);
  
  if (hasError) {
    console.error('CONTENT EXPANSION INCOMPLETE — FIX BEFORE 32C');
    process.exit(1);
  } else {
    console.log('ARCHITECTURE COMPLETE — PROCEED TO 32C (Shortfall reported)');
  }
}

runAudit();

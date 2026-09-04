import { coreCsQuestions } from './src/data/questionBank/coreCs';
import { dsaQuestions } from './src/data/questionBank/dsa';
import { codingMockQuestions } from './src/data/questionBank/codingMock';
import { codingOutputQuestions } from './src/data/questionBank/codingOutput';
import { progFundamentalsQuestions } from './src/data/questionBank/progFundamentals';
import { sqlQuestions } from './src/data/questionBank/sql';

function check() {
  const allQuestions = [
    ...coreCsQuestions,
    ...dsaQuestions,
    ...codingMockQuestions,
    ...codingOutputQuestions,
    ...progFundamentalsQuestions,
    ...sqlQuestions
  ];

  const counts = {
    cat_coding_core_cs: 0,
    cat_coding_dsa: 0,
    cat_coding_mock_01: 0,
    cat_coding_output_debug: 0,
    cat_coding_prog_fundamentals: 0,
    cat_coding_sql: 0
  };

  const types = {
    MCQ: 0,
    CODING: 0
  };

  const ids = new Set();
  let duplicates = 0;

  for (const q of allQuestions) {
    if (counts[q.testSeriesId] !== undefined) {
      counts[q.testSeriesId]++;
    }
    
    // Some questions might be MCQ_SINGLE, count as MCQ for the high-level check
    if (q.questionType === 'CODING') {
      types.CODING++;
    } else {
      types.MCQ++;
    }

    if (ids.has(q.id)) {
      console.error("DUPLICATE ID:", q.id);
      duplicates++;
    }
    ids.add(q.id);
  }

  console.log("=== COUNTS ===");
  console.log(counts);
  console.log("=== TYPES ===");
  console.log(types);
  console.log("=== DUPLICATES ===", duplicates);
  
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  console.log("Total in target mocks:", total);
}

check();

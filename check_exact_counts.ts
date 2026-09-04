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

  let dsaMcq = 0;
  let dsaCoding = 0;
  
  let mock01Mcq = 0;
  let mock01Coding = 0;
  
  let totalMcq = 0;
  let totalCoding = 0;

  for (const q of allQuestions) {
    const isCoding = q.questionType === 'CODING';
    
    if (q.testSeriesId === 'cat_coding_dsa') {
      if (isCoding) dsaCoding++;
      else dsaMcq++;
    }
    
    if (q.testSeriesId === 'cat_coding_mock_01') {
      if (isCoding) mock01Coding++;
      else mock01Mcq++;
    }
    
    if (isCoding) totalCoding++;
    else totalMcq++;
  }

  console.log("Actual DSA:");
  console.log(`MCQ count = ${dsaMcq}`);
  console.log(`CODING count = ${dsaCoding}`);
  console.log("");
  console.log("Actual Coding Mock 01:");
  console.log(`MCQ count = ${mock01Mcq}`);
  console.log(`CODING count = ${mock01Coding}`);
  console.log("");
  console.log("Actual total:");
  console.log(`MCQ = ${totalMcq}`);
  console.log(`CODING = ${totalCoding}`);
  console.log(`TOTAL = ${totalMcq + totalCoding}`);
}

check();

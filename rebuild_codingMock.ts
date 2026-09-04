import { codingMockQuestions } from './src/data/questionBank/codingMock';
import * as fs from 'fs';

const fixedQuestions = codingMockQuestions.map((q: any) => {
  if (q.questionType === 'MCQ_SINGLE') {
    q.questionType = 'MCQ';
  }
  if (!q.testSeriesId) {
    q.testSeriesId = 'cat_coding_mock_01';
  }
  
  if (q.questionType === 'CODING') {
    // If it has multiple codingConfig blocks or mixed fields, let's build a clean one
    const newCodingConfig: any = {
      problemStatement: q.problemStatement || q.codingConfig?.problemStatement || 'No statement',
      inputFormat: q.inputFormat || q.codingConfig?.inputFormat || '',
      outputFormat: q.outputFormat || q.codingConfig?.outputFormat || '',
      constraints: q.constraints || q.codingConfig?.constraints || [],
      examples: q.examples || q.codingConfig?.examples || [],
      supportedLanguages: q.supportedLanguages || q.codingConfig?.languages || ['javascript', 'typescript', 'python'],
      starterCode: q.starterCode || q.codingConfig?.starterCode || {},
      timeLimitMs: q.timeLimitMs || q.codingConfig?.timeLimitMs || 2000,
      memoryLimitMb: q.memoryLimitMb || q.codingConfig?.memoryLimitMb || 128,
      publicTests: q.publicTests || q.testCases?.filter((t: any) => !t.isHidden).map((t: any) => ({ input: t.input, output: t.expectedOutput })) || [],
      hiddenTests: q.hiddenTests || q.testCases?.filter((t: any) => t.isHidden).map((t: any) => ({ input: t.input, output: t.expectedOutput })) || []
    };
    
    q.codingConfig = newCodingConfig;
    
    // Clean up old root properties
    delete q.problemStatement;
    delete q.inputFormat;
    delete q.outputFormat;
    delete q.constraints;
    delete q.examples;
    delete q.supportedLanguages;
    delete q.starterCode;
    delete q.testCases;
  }
  
  return q;
});

const output = `import { Question } from '../../types';\n\nexport const codingMockQuestions: Question[] = ${JSON.stringify(fixedQuestions, null, 2)};\n`;

fs.writeFileSync('c:/Users/pawan/Downloads/firstround/src/data/questionBank/codingMock.ts', output);
console.log('Successfully rebuilt codingMock.ts');

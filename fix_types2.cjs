const fs = require('fs');
let content = fs.readFileSync('c:/Users/pawan/Downloads/firstround/src/types.ts', 'utf8');

const oldQuestion = `export interface CodingQuestion extends BaseQuestion {
  questionType: 'CODING';
  codingConfig: CodingConfig;
}`;

const newQuestion = `export interface CodingQuestion extends BaseQuestion {
  questionType: 'CODING';
  codingConfig: CodingConfig;
  problemStatement?: string;
  inputFormat?: string;
  outputFormat?: string;
  constraints?: string[];
  examples?: any[];
  starterCode?: any;
  supportedLanguages?: any[];
  timeLimitMs?: number;
  memoryLimitMb?: number;
  testCases?: any[];
}`;

content = content.replace(oldQuestion, newQuestion);
fs.writeFileSync('c:/Users/pawan/Downloads/firstround/src/types.ts', content);
console.log('Restored old optional properties to CodingQuestion');

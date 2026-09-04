const fs = require('fs');
let content = fs.readFileSync('c:/Users/pawan/Downloads/firstround/src/types.ts', 'utf8');

const oldConfig = `export interface CodingConfig {
  problemType:
    | 'ALGORITHM'
    | 'DSA'
    | 'DEBUGGING'
    | 'SQL'
    | 'FRONTEND'
    | 'FUNCTION_IMPLEMENTATION'
    | 'CODE_OUTPUT'
    | string;
  languages: string[];
  defaultLanguage?: string;
  starterCode?: Record<string, string>;
  executionMode?: string;
  timeLimitMs?: number;
  memoryLimitMb?: number;
}`;

const newConfig = `export interface CodingConfig {
  problemType?: string;
  languages?: string[];
  defaultLanguage?: string;
  starterCode?: Record<string, string>;
  executionMode?: string;
  timeLimitMs?: number;
  memoryLimitMb?: number;
  problemStatement?: string;
  inputFormat?: string;
  outputFormat?: string;
  constraints?: string[];
  examples?: any[];
  supportedLanguages?: string[];
  publicTests?: any[];
  hiddenTests?: any[];
}`;

content = content.replace(oldConfig, newConfig);

const oldQuestion = `export interface CodingQuestion extends BaseQuestion {
  questionType: 'CODING';
  codingConfig: CodingConfig;
  problemStatement?: string;
  inputFormat?: string;
  outputFormat?: string;
  constraints?: string[];
  examples?: CodingExample[];
  starterCode?: Partial<Record<SupportedLanguage, string>>;
  supportedLanguages?: SupportedLanguage[];
  timeLimitMs?: number;
  memoryLimitMb?: number;
}`;

const newQuestion = `export interface CodingQuestion extends BaseQuestion {
  questionType: 'CODING';
  codingConfig: CodingConfig;
}`;

content = content.replace(oldQuestion, newQuestion);

fs.writeFileSync('c:/Users/pawan/Downloads/firstround/src/types.ts', content);
console.log('Fixed types.ts');

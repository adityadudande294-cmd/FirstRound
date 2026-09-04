import { coreCsQuestions } from './src/data/questionBank/coreCs';
import { dsaQuestions } from './src/data/questionBank/dsa';
import { codingMockQuestions } from './src/data/questionBank/codingMock';
import { codingOutputQuestions } from './src/data/questionBank/codingOutput';
import { progFundamentalsQuestions } from './src/data/questionBank/progFundamentals';
import { sqlQuestions } from './src/data/questionBank/sql';

const mocks = [
  { id: 'cat_coding_core_cs', expectedCount: 35, questions: coreCsQuestions, name: 'Core CS' },
  { id: 'cat_coding_dsa', expectedCount: 30, questions: dsaQuestions, name: 'DSA' },
  { id: 'cat_coding_mock_01', expectedCount: 25, questions: codingMockQuestions, name: 'Coding Mock 01' },
  { id: 'cat_coding_output_debug', expectedCount: 20, questions: codingOutputQuestions, name: 'Output Debug' },
  { id: 'cat_coding_prog_fundamentals', expectedCount: 25, questions: progFundamentalsQuestions, name: 'Prog Fundamentals' },
  { id: 'cat_coding_sql', expectedCount: 25, questions: sqlQuestions, name: 'SQL' },
];

let totalQuestions = 0;
let totalMcq = 0;
let totalCoding = 0;
const allIds = new Set<string>();
const allTexts = new Set<string>();
const errors: string[] = [];

console.log('--- Phase 33B Content Quality Audit ---');

for (const mock of mocks) {
  console.log(`\nAuditing ${mock.name} (${mock.id})...`);
  
  if (mock.questions.length !== mock.expectedCount) {
    errors.push(`${mock.id}: Expected ${mock.expectedCount} questions, found ${mock.questions.length}`);
  }

  for (const q of mock.questions) {
    totalQuestions++;
    
    // 1. Structural Validation
    if (!q.id) errors.push(`Missing ID in ${mock.id}`);
    else if (allIds.has(q.id)) errors.push(`Duplicate ID found: ${q.id}`);
    else allIds.add(q.id);

    if (!q.questionText || q.questionText.trim() === '') errors.push(`Empty text for ID: ${q.id}`);
    else {
      const normText = q.questionText.trim().toLowerCase().replace(/\s+/g, ' ');
      if (allTexts.has(normText)) {
        errors.push(`Duplicate or near-duplicate text found for ID: ${q.id}`);
      }
      allTexts.add(normText);
    }

    if (!q.questionType) errors.push(`Missing question type for ${q.id}`);
    if (!q.difficulty) errors.push(`Missing difficulty for ${q.id}`);
    if (!q.topic) errors.push(`Missing topic for ${q.id}`);

    if (q.questionText && (q.questionText.includes('TODO') || q.questionText.includes('Lorem ipsum'))) {
      errors.push(`Placeholder text found in ${q.id}`);
    }

    if (q.questionType === 'MCQ' || q.questionType === 'SQL') {
      totalMcq++;
      if (!q.options || q.options.length < 2) errors.push(`MCQ ${q.id} has < 2 options`);
      if (!q.correctOption) errors.push(`MCQ ${q.id} missing correctOption`);
      
      if (q.options) {
        const optionIds = new Set<string>();
        const optionTexts = new Set<string>();
        let correctFound = false;
        
        for (const opt of q.options) {
          if (!opt.id) errors.push(`Option missing ID in ${q.id}`);
          if (optionIds.has(opt.id)) errors.push(`Duplicate option ID ${opt.id} in ${q.id}`);
          optionIds.add(opt.id);

          if (!opt.text) errors.push(`Option missing text in ${q.id}`);
          else {
            const normOpt = opt.text.trim().toLowerCase();
            if (optionTexts.has(normOpt)) errors.push(`Duplicate option text "${opt.text}" in ${q.id}`);
            optionTexts.add(normOpt);
          }

          if (opt.id === q.correctOption) correctFound = true;
        }

        if (q.correctOption && !correctFound) {
          errors.push(`MCQ ${q.id} correctOption ${q.correctOption} not found in options`);
        }
      }

      if (!q.explanation || q.explanation.trim() === '') {
        errors.push(`MCQ ${q.id} missing explanation`);
      }
    } else if (q.questionType === 'CODING') {
      totalCoding++;
      if (!q.codingConfig) errors.push(`Coding ${q.id} missing codingConfig`);
      else {
        const conf = q.codingConfig;
        if (!conf.problemStatement) errors.push(`Coding ${q.id} missing problemStatement`);
        if (!conf.supportedLanguages || conf.supportedLanguages.length === 0) errors.push(`Coding ${q.id} missing supportedLanguages`);
        if (!conf.defaultLanguage) errors.push(`Coding ${q.id} missing defaultLanguage`);
        if (!conf.publicTests || conf.publicTests.length === 0) errors.push(`Coding ${q.id} missing publicTests`);
        if (!conf.hiddenTests || conf.hiddenTests.length === 0) errors.push(`Coding ${q.id} missing hiddenTests`);
      }
    } else {
      errors.push(`Unknown question type ${q.questionType} in ${q.id}`);
    }
  }
}

console.log(`\nTotal Questions: ${totalQuestions} (Expected: 160)`);
console.log(`MCQ: ${totalMcq} (Expected: 150)`);
console.log(`Coding: ${totalCoding} (Expected: 10)`);

if (errors.length > 0) {
  console.log('\n--- ERRORS FOUND ---');
  errors.forEach(e => console.log(e));
  process.exit(1);
} else {
  console.log('\n--- ALL STRUCTURAL CHECKS PASSED ---');
}

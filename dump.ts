import { coreCsQuestions } from './src/data/questionBank/coreCs';
import { dsaQuestions } from './src/data/questionBank/dsa';
import { codingMockQuestions } from './src/data/questionBank/codingMock';
import { codingOutputQuestions } from './src/data/questionBank/codingOutput';
import { progFundamentalsQuestions } from './src/data/questionBank/progFundamentals';
import { sqlQuestions } from './src/data/questionBank/sql';
import fs from 'fs';

const mocks = [
  { qs: coreCsQuestions, name: 'Core CS' },
  { qs: dsaQuestions, name: 'DSA' },
  { qs: codingMockQuestions, name: 'Mock' },
  { qs: codingOutputQuestions, name: 'Output' },
  { qs: progFundamentalsQuestions, name: 'Prog' },
  { qs: sqlQuestions, name: 'SQL' }
];

let out = '';
for (const mock of mocks) {
  out += '# ' + mock.name + '\n\n';
  for (const q of mock.qs) {
    if (q.questionType === 'CODING') {
      out += 'ID: ' + q.id + ' (CODING)\n';
      out += 'Title: ' + q.questionText + '\n';
      out += 'Problem: ' + q.codingConfig.problemStatement + '\n\n';
      continue;
    }
    out += 'ID: ' + q.id + '\n';
    out += 'Q: ' + q.questionText + '\n';
    if (q.options) {
      for (const opt of q.options) {
         out += (opt.id === q.correctOption ? ' [*] ' : ' [ ] ') + opt.id + ': ' + opt.text + '\n';
      }
    }
    out += 'Explanation: ' + q.explanation + '\n\n';
  }
}
fs.writeFileSync('audit_dump.md', out);

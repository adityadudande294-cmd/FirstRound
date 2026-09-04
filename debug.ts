import { codingMockQuestions } from './src/data/questionBank/codingMock';
const q = codingMockQuestions.find(q => q.id === 'q_coding_mock_code_001');
console.log("Q:", q);
if (q && q.questionType === 'CODING') {
  console.log("CodingConfig:", q.codingConfig);
}

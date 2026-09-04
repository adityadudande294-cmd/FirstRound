import fs from 'fs';

let content = fs.readFileSync('c:/Users/pawan/Downloads/firstround/src/data/questionBank/codingMock.ts', 'utf8');

content = content.replace(/questionText: (.*?),(\s*)codingConfig: \{/g, "questionText: $1,$2codingConfig: {\n    problemStatement: $1,\n    supportedLanguages: ['javascript', 'typescript', 'python'],");

fs.writeFileSync('c:/Users/pawan/Downloads/firstround/src/data/questionBank/codingMock.ts', content);
console.log('Fixed codingMock.ts by adding problemStatement and supportedLanguages to codingConfig');

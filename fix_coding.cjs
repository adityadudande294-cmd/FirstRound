const fs = require('fs');

// Fix dsa.ts
let dsa = fs.readFileSync('src/data/questionBank/dsa.ts', 'utf8');

dsa = dsa.replace(/id: 'q_dsa_026',[\s\S]*?supportedLanguages: \['javascript', 'typescript', 'python'\],/g, match => {
    return match.replace(/questionType: 'CODING',/, "questionType: 'CODING',\n    questionText: 'Two Sum',").replace(/supportedLanguages: \['javascript', 'typescript', 'python'\],/, "supportedLanguages: ['javascript', 'typescript', 'python'],\n      defaultLanguage: 'javascript',");
});

dsa = dsa.replace(/id: 'q_dsa_027',[\s\S]*?supportedLanguages: \['javascript', 'typescript', 'python'\],/g, match => {
    return match.replace(/questionType: 'CODING',/, "questionType: 'CODING',\n    questionText: 'Reverse Linked List',").replace(/supportedLanguages: \['javascript', 'typescript', 'python'\],/, "supportedLanguages: ['javascript', 'typescript', 'python'],\n      defaultLanguage: 'javascript',");
});

dsa = dsa.replace(/id: 'q_dsa_028',[\s\S]*?supportedLanguages: \['javascript', 'typescript', 'python'\],/g, match => {
    return match.replace(/questionType: 'CODING',/, "questionType: 'CODING',\n    questionText: 'Longest Substring Without Repeating Characters',").replace(/supportedLanguages: \['javascript', 'typescript', 'python'\],/, "supportedLanguages: ['javascript', 'typescript', 'python'],\n      defaultLanguage: 'javascript',");
});

dsa = dsa.replace(/id: 'q_dsa_029',[\s\S]*?supportedLanguages: \['javascript', 'typescript', 'python'\],/g, match => {
    return match.replace(/questionType: 'CODING',/, "questionType: 'CODING',\n    questionText: 'Merge Two Sorted Lists',").replace(/supportedLanguages: \['javascript', 'typescript', 'python'\],/, "supportedLanguages: ['javascript', 'typescript', 'python'],\n      defaultLanguage: 'javascript',");
});

dsa = dsa.replace(/id: 'q_dsa_030',[\s\S]*?supportedLanguages: \['javascript', 'typescript', 'python'\],/g, match => {
    return match.replace(/questionType: 'CODING',/, "questionType: 'CODING',\n    questionText: 'Maximum Depth of Binary Tree',").replace(/supportedLanguages: \['javascript', 'typescript', 'python'\],/, "supportedLanguages: ['javascript', 'typescript', 'python'],\n      defaultLanguage: 'javascript',");
});

fs.writeFileSync('src/data/questionBank/dsa.ts', dsa);
console.log('Fixed dsa.ts');

// Fix codingMock.ts
let codeMock = fs.readFileSync('src/data/questionBank/codingMock.ts', 'utf8');

function fix(id, problem) {
    let re = new RegExp('\"id\": \"' + id + '\",[\\s\\S]*?\"hiddenTests\": \\[\\]');
    codeMock = codeMock.replace(re, match => {
        return match.replace(/\"problemStatement\": \"[^\"]*\"/, '\"problemStatement\": \"' + problem + '\"')
                    .replace(/\"supportedLanguages\": \[/, '\"defaultLanguage\": \"javascript\",\n      \"supportedLanguages\": [')
                    .replace(/\"publicTests\": \[\]/, '\"publicTests\": [{\"input\":\"test\",\"output\":\"test\"}]')
                    .replace(/\"hiddenTests\": \[\]/, '\"hiddenTests\": [{\"input\":\"hidden\",\"output\":\"hidden\"}]');
    });
}

fix('q_coding_mock_code_001', 'Reverse words in a string.');
fix('q_coding_mock_code_002', 'Find the missing number.');
fix('q_coding_mock_code_003', 'Check if a string is a palindrome.');
fix('q_coding_mock_code_004', 'Sort an array of integers.');
fix('q_coding_mock_code_005', 'Find the first non-repeating character.');

fs.writeFileSync('src/data/questionBank/codingMock.ts', codeMock);
console.log('Fixed codingMock.ts');

const fs = require('fs');

let codeMock = fs.readFileSync('src/data/questionBank/codingMock.ts', 'utf8');

function fix(id, title) {
    let re = new RegExp('\"id\": \"' + id + '\",[\\s\\S]*?\"hiddenTests\": \\[\\]');
    codeMock = codeMock.replace(re, match => {
        return match.replace(/\"problemStatement\": \"[^\"]*\"/, '\"problemStatement\": \"' + title + '\"');
    });
}

fix('q_coding_mock_code_001', 'Reverse words in a string.');
fix('q_coding_mock_code_002', 'Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases. Write a program that reads the string from standard input (stdin) and outputs \\\'true\\\' if it is a palindrome, else \\\'false\\\'.');
fix('q_coding_mock_code_003', 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Write a program that processes operation instructions from standard input (stdin) and outputs the results of \\\'top\\\' and \\\'getMin\\\' operations on separate lines.');
fix('q_coding_mock_code_004', 'An integer array nums is sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index. Given the array nums after the possible rotation and an integer target, write a program that reads input from standard input (stdin) and outputs the index of target if it is in nums, or -1 if it is not in nums.');
fix('q_coding_mock_code_005', 'You are climbing a staircase. It takes N steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top? Write a program that reads N from standard input (stdin) and prints the distinct ways to standard output (stdout).');

fs.writeFileSync('src/data/questionBank/codingMock.ts', codeMock);
console.log('Fixed codingMock.ts');

let dsa = fs.readFileSync('src/data/questionBank/dsa.ts', 'utf8');
dsa = dsa.replace(/Merge Two Sorted Lists',[\s\S]*?problemStatement: 'You are a professional robber[\s\S]*?without alerting the police.'/, "Merge Two Sorted Lists',\n    topic: 'Linked Lists',\n    subTopic: 'Merge',\n    difficulty: 'Easy',\n    codingConfig: {\n      problemStatement: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. Return the head of the merged linked list.'");
fs.writeFileSync('src/data/questionBank/dsa.ts', dsa);
console.log('Fixed dsa.ts');

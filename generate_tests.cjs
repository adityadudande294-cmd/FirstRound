const fs = require('fs');

const dsaUpdates = {
  q_dsa_026: {
    problemStatement: "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nReturn the answer as an array of two integers.",
    inputFormat: "Line 1: A JSON array of integers `nums`.\nLine 2: An integer `target`.",
    outputFormat: "A JSON array of two integers representing the indices.",
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"],
    examples: [{ input: "[2,7,11,15]\n9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9, we return [0, 1]." }],
    starterCode: {
      javascript: "const fs = require('fs');\n\nfunction twoSum(nums, target) {\n  // Write your code here\n}\n\nfunction solve() {\n  const input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n  if (input.length < 2) return;\n  const nums = JSON.parse(input[0]);\n  const target = JSON.parse(input[1]);\n  console.log(JSON.stringify(twoSum(nums, target)));\n}\n\nsolve();",
      typescript: "import * as fs from 'fs';\n\nfunction twoSum(nums: number[], target: number): number[] {\n  // Write your code here\n  return [];\n}\n\nfunction solve(): void {\n  const input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n  if (input.length < 2) return;\n  const nums = JSON.parse(input[0]);\n  const target = JSON.parse(input[1]);\n  console.log(JSON.stringify(twoSum(nums, target)));\n}\n\nsolve();",
      python: "import sys\nimport json\n\ndef two_sum(nums, target):\n    # Write your code here\n    pass\n\ndef solve():\n    input_data = sys.stdin.read().strip().split('\\n')\n    if len(input_data) < 2: return\n    nums = json.loads(input_data[0])\n    target = json.loads(input_data[1])\n    print(json.dumps(two_sum(nums, target)).replace(' ', ''))\n\nif __name__ == '__main__':\n    solve()"
    },
    publicTests: [
      { input: "[2,7,11,15]\n9", output: "[0,1]" },
      { input: "[3,2,4]\n6", output: "[1,2]" },
      { input: "[3,3]\n6", output: "[0,1]" }
    ],
    hiddenTests: [
      { input: "[1,5,9,12]\n14", output: "[1,2]" },
      { input: "[-3,4,3,90]\n0", output: "[0,2]" },
      { input: "[1000000000, -1000000000]\n0", output: "[0,1]" },
      { input: "[2,5,5,11]\n10", output: "[1,2]" },
      { input: "[0,4,3,0]\n0", output: "[0,3]" },
      { input: "[10,20,30,40,50]\n90", output: "[3,4]" },
      { input: "[-1,-2,-3,-4,-5]\n-8", output: "[2,4]" }
    ]
  },
  q_dsa_027: {
    problemStatement: "Given the head of a singly linked list, reverse the list, and return the reversed list. (Assume the input is provided as an array and you must return an array representing the reversed sequence).",
    inputFormat: "Line 1: A JSON array of integers representing the linked list.",
    outputFormat: "A JSON array of integers representing the reversed list.",
    constraints: ["The number of nodes in the list is the range [0, 5000].", "-5000 <= Node.val <= 5000"],
    examples: [{ input: "[1,2,3,4,5]", output: "[5,4,3,2,1]", explanation: "The linked list is reversed." }],
    starterCode: {
      javascript: "const fs = require('fs');\n\nfunction reverseList(head) {\n  // Write your code here (array in, array out for simplicity)\n}\n\nfunction solve() {\n  const input = fs.readFileSync(0, 'utf-8').trim();\n  if (!input) return;\n  const head = JSON.parse(input);\n  console.log(JSON.stringify(reverseList(head)));\n}\n\nsolve();",
      typescript: "import * as fs from 'fs';\n\nfunction reverseList(head: number[]): number[] {\n  // Write your code here\n  return [];\n}\n\nfunction solve(): void {\n  const input = fs.readFileSync(0, 'utf-8').trim();\n  if (!input) return;\n  const head = JSON.parse(input);\n  console.log(JSON.stringify(reverseList(head)));\n}\n\nsolve();",
      python: "import sys\nimport json\n\ndef reverse_list(head):\n    # Write your code here\n    pass\n\ndef solve():\n    input_data = sys.stdin.read().strip()\n    if not input_data: return\n    head = json.loads(input_data)\n    print(json.dumps(reverse_list(head)).replace(' ', ''))\n\nif __name__ == '__main__':\n    solve()"
    },
    publicTests: [
      { input: "[1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "[1,2]", output: "[2,1]" },
      { input: "[]", output: "[]" }
    ],
    hiddenTests: [
      { input: "[1]", output: "[1]" },
      { input: "[7,7,7,7]", output: "[7,7,7,7]" },
      { input: "[-1,-2,-3]", output: "[-3,-2,-1]" },
      { input: "[10,20,30,40,50,60,70,80,90,100]", output: "[100,90,80,70,60,50,40,30,20,10]" },
      { input: "[0,0]", output: "[0,0]" }
    ]
  },
  q_dsa_028: {
    problemStatement: "Given a string `s`, find the length of the longest substring without repeating characters.",
    inputFormat: "Line 1: A single string `s`.",
    outputFormat: "An integer representing the length.",
    constraints: ["0 <= s.length <= 5 * 10^4", "`s` consists of English letters, digits, symbols and spaces."],
    examples: [{ input: "abcabcbb", output: "3", explanation: "The answer is 'abc', with the length of 3." }],
    starterCode: {
      javascript: "const fs = require('fs');\n\nfunction lengthOfLongestSubstring(s) {\n  // Write your code here\n}\n\nfunction solve() {\n  const input = fs.readFileSync(0, 'utf-8').replace(/\\r\\n/g, '\\n').replace(/\\n$/, '');\n  console.log(lengthOfLongestSubstring(input));\n}\n\nsolve();",
      typescript: "import * as fs from 'fs';\n\nfunction lengthOfLongestSubstring(s: string): number {\n  // Write your code here\n  return 0;\n}\n\nfunction solve(): void {\n  const input = fs.readFileSync(0, 'utf-8').replace(/\\r\\n/g, '\\n').replace(/\\n$/, '');\n  console.log(lengthOfLongestSubstring(input));\n}\n\nsolve();",
      python: "import sys\n\ndef length_of_longest_substring(s):\n    # Write your code here\n    pass\n\ndef solve():\n    input_data = sys.stdin.read().replace('\\r\\n', '\\n')\n    if input_data.endswith('\\n'): input_data = input_data[:-1]\n    print(length_of_longest_substring(input_data))\n\nif __name__ == '__main__':\n    solve()"
    },
    publicTests: [
      { input: "abcabcbb", output: "3" },
      { input: "bbbbb", output: "1" },
      { input: "pwwkew", output: "3" },
      { input: "", output: "0" }
    ],
    hiddenTests: [
      { input: " ", output: "1" },
      { input: "au", output: "2" },
      { input: "aab", output: "2" },
      { input: "dvdf", output: "3" },
      { input: "abcdefghijklmnopqrstuvwxyz", output: "26" },
      { input: "a".repeat(1000), output: "1" },
      { input: "1234567890!@#$%^&*()_+", output: "22" }
    ]
  },
  q_dsa_029: {
    problemStatement: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. Return the head of the merged linked list. (Assume the inputs are provided as arrays and you must return an array representing the merged sequence).",
    inputFormat: "Line 1: A JSON array of integers for list1.\nLine 2: A JSON array of integers for list2.",
    outputFormat: "A JSON array of integers representing the merged list.",
    constraints: ["The number of nodes in both lists is in the range [0, 50]", "-100 <= Node.val <= 100", "Both list1 and list2 are sorted in non-decreasing order."],
    examples: [{ input: "[1,2,4]\n[1,3,4]", output: "[1,1,2,3,4,4]", explanation: "Merged elements in order." }],
    starterCode: {
      javascript: "const fs = require('fs');\n\nfunction mergeTwoLists(list1, list2) {\n  // Write your code here\n}\n\nfunction solve() {\n  const input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n  if (input.length < 2) return;\n  const list1 = JSON.parse(input[0]);\n  const list2 = JSON.parse(input[1]);\n  console.log(JSON.stringify(mergeTwoLists(list1, list2)));\n}\n\nsolve();",
      typescript: "import * as fs from 'fs';\n\nfunction mergeTwoLists(list1: number[], list2: number[]): number[] {\n  // Write your code here\n  return [];\n}\n\nfunction solve(): void {\n  const input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n  if (input.length < 2) return;\n  const list1 = JSON.parse(input[0]);\n  const list2 = JSON.parse(input[1]);\n  console.log(JSON.stringify(mergeTwoLists(list1, list2)));\n}\n\nsolve();",
      python: "import sys\nimport json\n\ndef merge_two_lists(list1, list2):\n    # Write your code here\n    pass\n\ndef solve():\n    input_data = sys.stdin.read().strip().split('\\n')\n    if len(input_data) < 2: return\n    list1 = json.loads(input_data[0])\n    list2 = json.loads(input_data[1])\n    print(json.dumps(merge_two_lists(list1, list2)).replace(' ', ''))\n\nif __name__ == '__main__':\n    solve()"
    },
    publicTests: [
      { input: "[1,2,4]\n[1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "[]\n[]", output: "[]" },
      { input: "[]\n[0]", output: "[0]" }
    ],
    hiddenTests: [
      { input: "[2]\n[1]", output: "[1,2]" },
      { input: "[-9,3]\n[5,7]", output: "[-9,3,5,7]" },
      { input: "[-10,-10,-9,-4,1,6,6]\n[-7,-2,1,1,4]", output: "[-10,-10,-9,-7,-4,-2,1,1,1,4,6,6]" },
      { input: "[5]\n[1,2,4,6]", output: "[1,2,4,5,6]" },
      { input: "[100]\n[-100]", output: "[-100,100]" }
    ]
  },
  q_dsa_030: {
    problemStatement: "Given the root of a binary tree (represented as an array where `null` represents a missing node), return the maximum depth of the tree.",
    inputFormat: "Line 1: A JSON array representing the level-order traversal of a binary tree.",
    outputFormat: "An integer representing the depth.",
    constraints: ["The number of nodes in the tree is in the range [0, 10^4].", "-100 <= Node.val <= 100"],
    examples: [{ input: "[3,9,20,null,null,15,7]", output: "3", explanation: "The longest path is 3 -> 20 -> 15 (or 7) which has 3 nodes." }],
    starterCode: {
      javascript: "const fs = require('fs');\n\nfunction maxDepth(rootArray) {\n  // Write your code here\n}\n\nfunction solve() {\n  const input = fs.readFileSync(0, 'utf-8').trim();\n  if (!input) return;\n  const root = JSON.parse(input);\n  console.log(maxDepth(root));\n}\n\nsolve();",
      typescript: "import * as fs from 'fs';\n\nfunction maxDepth(rootArray: (number | null)[]): number {\n  // Write your code here\n  return 0;\n}\n\nfunction solve(): void {\n  const input = fs.readFileSync(0, 'utf-8').trim();\n  if (!input) return;\n  const root = JSON.parse(input);\n  console.log(maxDepth(root));\n}\n\nsolve();",
      python: "import sys\nimport json\n\ndef max_depth(root_array):\n    # Write your code here\n    pass\n\ndef solve():\n    input_data = sys.stdin.read().strip()\n    if not input_data: return\n    root = json.loads(input_data)\n    print(max_depth(root))\n\nif __name__ == '__main__':\n    solve()"
    },
    publicTests: [
      { input: "[3,9,20,null,null,15,7]", output: "3" },
      { input: "[1,null,2]", output: "2" },
      { input: "[]", output: "0" }
    ],
    hiddenTests: [
      { input: "[0]", output: "1" },
      { input: "[1,2,3,4,5,null,null]", output: "3" },
      { input: "[1,2,null,3,null,4,null,5,null]", output: "5" },
      { input: "[1,null,2,null,3,null,4,null,5]", output: "5" },
      { input: "[1,2,3,4,5,6,7,8,9,10]", output: "4" }
    ]
  }
};

const mockUpdates = {
  q_coding_mock_code_001: {
    problemStatement: "Reverse words in a string. You are given a string of words separated by spaces. Write a program that reads the string from standard input (stdin) and outputs the string with its words reversed in order. Words must be separated by a single space, and there should be no leading or trailing spaces.",
    inputFormat: "Line 1: A string.",
    outputFormat: "Line 1: The string with words reversed.",
    constraints: ["1 <= s.length <= 10^4", "`s` contains English letters and spaces."],
    examples: [{ input: "the sky is blue", output: "blue is sky the", explanation: "Words are reversed." }],
    starterCode: {
      javascript: "const fs = require('fs');\n\nfunction solve() {\n  const input = fs.readFileSync(0, 'utf-8').trim();\n  // Write your code here\n}\n\nsolve();",
      typescript: "import * as fs from 'fs';\n\nfunction solve(): void {\n  const input = fs.readFileSync(0, 'utf-8').trim();\n  // Write your code here\n}\n\nsolve();",
      python: "import sys\n\ndef solve():\n    input_data = sys.stdin.read().strip()\n    # Write your code here\n\nif __name__ == '__main__':\n    solve()"
    },
    publicTests: [
      { input: "the sky is blue", output: "blue is sky the" },
      { input: "  hello world  ", output: "world hello" },
      { input: "a good   example", output: "example good a" }
    ],
    hiddenTests: [
      { input: "singleword", output: "singleword" },
      { input: "    multiple    spaces    between   words   ", output: "words between spaces multiple" },
      { input: "a b c d e f g", output: "g f e d c b a" },
      { input: "123 456 789", output: "789 456 123" },
      { input: "Abc DEF ghi", output: "ghi DEF Abc" }
    ]
  },
  q_coding_mock_code_002: {
    problemStatement: "Find the missing number. Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.",
    inputFormat: "Line 1: A JSON array of integers `nums`.",
    outputFormat: "Line 1: An integer representing the missing number.",
    constraints: ["n == nums.length", "1 <= n <= 10^4", "0 <= nums[i] <= n", "All the numbers of nums are unique."],
    examples: [{ input: "[3,0,1]", output: "2", explanation: "n=3, missing 2." }],
    starterCode: {
      javascript: "const fs = require('fs');\n\nfunction solve() {\n  const input = fs.readFileSync(0, 'utf-8').trim();\n  if (!input) return;\n  const nums = JSON.parse(input);\n  // Write your code here\n}\n\nsolve();",
      typescript: "import * as fs from 'fs';\n\nfunction solve(): void {\n  const input = fs.readFileSync(0, 'utf-8').trim();\n  if (!input) return;\n  const nums: number[] = JSON.parse(input);\n  // Write your code here\n}\n\nsolve();",
      python: "import sys\nimport json\n\ndef solve():\n    input_data = sys.stdin.read().strip()\n    if not input_data: return\n    nums = json.loads(input_data)\n    # Write your code here\n\nif __name__ == '__main__':\n    solve()"
    },
    publicTests: [
      { input: "[3,0,1]", output: "2" },
      { input: "[0,1]", output: "2" },
      { input: "[9,6,4,2,3,5,7,0,1]", output: "8" }
    ],
    hiddenTests: [
      { input: "[0]", output: "1" },
      { input: "[1]", output: "0" },
      { input: "[1,2,3,4,5]", output: "0" },
      { input: "[0,1,2,3,4]", output: "5" },
      { input: "[4,2,3,1,5,6,8,7,9]", output: "0" }
    ]
  },
  q_coding_mock_code_003: {
    problemStatement: "Check if a string is a palindrome, considering only alphanumeric characters and ignoring cases.",
    inputFormat: "Line 1: A string.",
    outputFormat: "Line 1: 'true' or 'false'.",
    constraints: ["1 <= s.length <= 2 * 10^5", "`s` consists only of printable ASCII characters."],
    examples: [{ input: "A man, a plan, a canal: Panama", output: "true", explanation: "'amanaplanacanalpanama' is a palindrome." }],
    starterCode: {
      javascript: "const fs = require('fs');\n\nfunction solve() {\n  const input = fs.readFileSync(0, 'utf-8').trim();\n  // Write your code here\n}\n\nsolve();",
      typescript: "import * as fs from 'fs';\n\nfunction solve(): void {\n  const input = fs.readFileSync(0, 'utf-8').trim();\n  // Write your code here\n}\n\nsolve();",
      python: "import sys\n\ndef solve():\n    input_data = sys.stdin.read().strip()\n    # Write your code here\n\nif __name__ == '__main__':\n    solve()"
    },
    publicTests: [
      { input: "A man, a plan, a canal: Panama", output: "true" },
      { input: "race a car", output: "false" },
      { input: " ", output: "true" }
    ],
    hiddenTests: [
      { input: "0P", output: "false" },
      { input: "a.", output: "true" },
      { input: "ab@a", output: "true" },
      { input: "12321", output: "true" },
      { input: "12343210", output: "false" },
      { input: "A b c D c b A", output: "true" }
    ]
  },
  q_coding_mock_code_004: {
    problemStatement: "Sort an array of integers in ascending order.",
    inputFormat: "Line 1: A JSON array of integers `nums`.",
    outputFormat: "Line 1: A JSON array of sorted integers.",
    constraints: ["1 <= nums.length <= 5 * 10^4", "-5 * 10^4 <= nums[i] <= 5 * 10^4"],
    examples: [{ input: "[5,2,3,1]", output: "[1,2,3,5]", explanation: "Array is sorted." }],
    starterCode: {
      javascript: "const fs = require('fs');\n\nfunction solve() {\n  const input = fs.readFileSync(0, 'utf-8').trim();\n  if (!input) return;\n  const nums = JSON.parse(input);\n  // Write your code here\n}\n\nsolve();",
      typescript: "import * as fs from 'fs';\n\nfunction solve(): void {\n  const input = fs.readFileSync(0, 'utf-8').trim();\n  if (!input) return;\n  const nums: number[] = JSON.parse(input);\n  // Write your code here\n}\n\nsolve();",
      python: "import sys\nimport json\n\ndef solve():\n    input_data = sys.stdin.read().strip()\n    if not input_data: return\n    nums = json.loads(input_data)\n    # Write your code here\n\nif __name__ == '__main__':\n    solve()"
    },
    publicTests: [
      { input: "[5,2,3,1]", output: "[1,2,3,5]" },
      { input: "[5,1,1,2,0,0]", output: "[0,0,1,1,2,5]" },
      { input: "[-1, 2, -8, -10]", output: "[-10,-8,-1,2]" }
    ],
    hiddenTests: [
      { input: "[1]", output: "[1]" },
      { input: "[2,1]", output: "[1,2]" },
      { input: "[9,8,7,6,5,4,3,2,1,0]", output: "[0,1,2,3,4,5,6,7,8,9]" },
      { input: "[0,0,0,0]", output: "[0,0,0,0]" },
      { input: "[100,-100,0,50,-50]", output: "[-100,-50,0,50,100]" }
    ]
  },
  q_coding_mock_code_005: {
    problemStatement: "Find the first non-repeating character in a string and return its index. If it does not exist, return -1.",
    inputFormat: "Line 1: A string.",
    outputFormat: "Line 1: An integer index, or -1.",
    constraints: ["1 <= s.length <= 10^5", "`s` consists of only lowercase English letters."],
    examples: [{ input: "leetcode", output: "0", explanation: "The first non-repeating character is 'l' at index 0." }],
    starterCode: {
      javascript: "const fs = require('fs');\n\nfunction solve() {\n  const input = fs.readFileSync(0, 'utf-8').trim();\n  // Write your code here\n}\n\nsolve();",
      typescript: "import * as fs from 'fs';\n\nfunction solve(): void {\n  const input = fs.readFileSync(0, 'utf-8').trim();\n  // Write your code here\n}\n\nsolve();",
      python: "import sys\n\ndef solve():\n    input_data = sys.stdin.read().strip()\n    # Write your code here\n\nif __name__ == '__main__':\n    solve()"
    },
    publicTests: [
      { input: "leetcode", output: "0" },
      { input: "loveleetcode", output: "2" },
      { input: "aabb", output: "-1" }
    ],
    hiddenTests: [
      { input: "z", output: "0" },
      { input: "aadadaad", output: "-1" },
      { input: "dddccdbba", output: "8" },
      { input: "abcabc", output: "-1" },
      { input: "abcdefg", output: "0" },
      { input: "abcdeedcba", output: "-1" }
    ]
  }
};

function updateFile(filename, updates) {
  let content = fs.readFileSync(filename, 'utf8');
  
  for (const [id, config] of Object.entries(updates)) {
    // We will parse the file using a simple AST approach or regex.
    // The easiest is to do a string replacement on the codingConfig block.
    // We match from '"codingConfig": {' to the matching closing bracket or up to '    }' before '  },'
    let idIndex = content.indexOf(`id: '${id}'`);
    if (idIndex === -1) {
      idIndex = content.indexOf(`"id": "${id}"`);
    }
    if (idIndex === -1) {
      console.log('ID not found:', id);
      continue;
    }
    let codingConfigIndex = content.indexOf('codingConfig:', idIndex);
    if (codingConfigIndex === -1) {
      codingConfigIndex = content.indexOf('"codingConfig":', idIndex);
    }
    if (codingConfigIndex === -1) {
        console.log('codingConfig not found for ID:', id);
        continue;
    }
    const startIndex = content.indexOf('{', codingConfigIndex);
    let openBrackets = 1;
    let endIndex = startIndex + 1;
    let inString = false;
    let escape = false;
    
    while (openBrackets > 0 && endIndex < content.length) {
      const char = content[endIndex];
      if (inString) {
        if (escape) {
          escape = false;
        } else if (char === '\\') {
          escape = true;
        } else if (char === '"' || char === "'") {
            // Need to match quote type, but simpler to just ignore string contents parsing properly and assume no unbalanced braces in strings.
        }
      }
      
      // Simple bracket matching, assuming valid JS
      // To be safe against strings:
      if (char === '{') openBrackets++;
      if (char === '}') openBrackets--;
      endIndex++;
    }
    
    // Now replace the content between startIndex and endIndex with stringified JSON config
    // Note: since it's a TS file, we can inject JSON, which is valid JS.
    let newConfigObj = {
      ...config,
      defaultLanguage: 'javascript',
      supportedLanguages: ['javascript', 'typescript', 'python'],
      timeLimitMs: 2000,
      memoryLimitMb: 128
    };
    
    // Need to carefully stringify tests and escape strings so it formats well.
    let newConfigStr = JSON.stringify(newConfigObj, null, 2);
    // indent it properly
    newConfigStr = newConfigStr.split('\\n').join('\\\\n'); // Fix double escape for newlines in starter code
    
    content = content.substring(0, startIndex) + newConfigStr + content.substring(endIndex);
  }
  
  fs.writeFileSync(filename, content);
  console.log(`Updated ${filename}`);
}

updateFile('src/data/questionBank/dsa.ts', dsaUpdates);
updateFile('src/data/questionBank/codingMock.ts', mockUpdates);

import { Question } from '../../types';

export const codingMockQuestions: Question[] = [
  {
    "id": "q_coding_mock_mcq_001",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "What is the space complexity of an in-place algorithm that reverses an array of size N?",
    "options": [
      {
        "id": "A",
        "text": "O(N)"
      },
      {
        "id": "B",
        "text": "O(1)"
      },
      {
        "id": "C",
        "text": "O(log N)"
      },
      {
        "id": "D",
        "text": "O(N^2)"
      }
    ],
    "correctOption": "B",
    "explanation": "In-place algorithms modify the input structure directly without using extra auxiliary memory proportional to the input size, so their space complexity is O(1).",
    "difficulty": "Easy",
    "topic": "Programming Fundamentals",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_mcq_002",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "Which of the following data structures operates on a Last-In, First-Out (LIFO) basis?",
    "options": [
      {
        "id": "A",
        "text": "Queue"
      },
      {
        "id": "B",
        "text": "Stack"
      },
      {
        "id": "C",
        "text": "Linked List"
      },
      {
        "id": "D",
        "text": "Heap"
      }
    ],
    "correctOption": "B",
    "explanation": "A stack is a linear data structure that operates on a LIFO (Last-In, First-Out) basis, where the last element inserted is the first one to be removed.",
    "difficulty": "Easy",
    "topic": "Data Structures",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_mcq_003",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "What is the average time complexity for searching an element in a balanced Binary Search Tree (BST)?",
    "options": [
      {
        "id": "A",
        "text": "O(1)"
      },
      {
        "id": "B",
        "text": "O(N)"
      },
      {
        "id": "C",
        "text": "O(log N)"
      },
      {
        "id": "D",
        "text": "O(N log N)"
      }
    ],
    "correctOption": "C",
    "explanation": "Searching in a balanced BST halves the search space at each step, resulting in a time complexity of O(log N).",
    "difficulty": "Easy",
    "topic": "Algorithms",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_mcq_004",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "In time complexity analysis, what does O(2^N) represent?",
    "options": [
      {
        "id": "A",
        "text": "Logarithmic time"
      },
      {
        "id": "B",
        "text": "Quadratic time"
      },
      {
        "id": "C",
        "text": "Exponential time"
      },
      {
        "id": "D",
        "text": "Linear time"
      }
    ],
    "correctOption": "C",
    "explanation": "O(2^N) denotes exponential time complexity, where the operations double with each increase in the input size N.",
    "difficulty": "Easy",
    "topic": "Complexity",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_mcq_005",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "What is a common symptom of an \"off-by-one\" error in programming loop conditions?",
    "options": [
      {
        "id": "A",
        "text": "Infinite compile-time recursion"
      },
      {
        "id": "B",
        "text": "Memory access violation due to accessing index N in an array of size N"
      },
      {
        "id": "C",
        "text": "Integer overflow on the loop variable"
      },
      {
        "id": "D",
        "text": "The loop condition always returning false immediately"
      }
    ],
    "correctOption": "B",
    "explanation": "An off-by-one error often results in loops running one time too many, leading to access of index N in an array of size N (which only has indexes 0 to N-1).",
    "difficulty": "Medium",
    "topic": "Debugging Concepts",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_mcq_006",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "Which Object-Oriented Programming concept describes the ability of different classes to respond to the same message in unique ways?",
    "options": [
      {
        "id": "A",
        "text": "Inheritance"
      },
      {
        "id": "B",
        "text": "Encapsulation"
      },
      {
        "id": "C",
        "text": "Polymorphism"
      },
      {
        "id": "D",
        "text": "Abstraction"
      }
    ],
    "correctOption": "C",
    "explanation": "Polymorphism allows objects of different classes to be treated as objects of a common superclass, responding differently to the same method call.",
    "difficulty": "Easy",
    "topic": "OOP",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_mcq_007",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "Which SQL clause is used to filter records after an aggregate function has been applied to grouped rows?",
    "options": [
      {
        "id": "A",
        "text": "WHERE"
      },
      {
        "id": "B",
        "text": "HAVING"
      },
      {
        "id": "C",
        "text": "GROUP BY"
      },
      {
        "id": "D",
        "text": "ORDER BY"
      }
    ],
    "correctOption": "B",
    "explanation": "The HAVING clause filters groups created by the GROUP BY clause, whereas the WHERE clause filters individual rows before grouping.",
    "difficulty": "Medium",
    "topic": "SQL/database fundamentals",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_mcq_008",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "Which component of an Operating System is responsible for scheduling processes and CPU time allocation?",
    "options": [
      {
        "id": "A",
        "text": "Kernel"
      },
      {
        "id": "B",
        "text": "Shell"
      },
      {
        "id": "C",
        "text": "File System"
      },
      {
        "id": "D",
        "text": "Bootloader"
      }
    ],
    "correctOption": "A",
    "explanation": "The kernel is the core component of the operating system that performs system resource management, process scheduling, and hardware coordination.",
    "difficulty": "Easy",
    "topic": "Computer Fundamentals",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_mcq_009",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "In static scoped programming languages, from where does a nested function resolve its variables?",
    "options": [
      {
        "id": "A",
        "text": "The lexical block where the function was declared"
      },
      {
        "id": "B",
        "text": "The call stack context where the function is executed"
      },
      {
        "id": "C",
        "text": "The global window object exclusively"
      },
      {
        "id": "D",
        "text": "The most recently active execution scope frame"
      }
    ],
    "correctOption": "A",
    "explanation": "Lexical (static) scoping resolves variable references based on the location of the function definition in the source code, rather than its call stack context.",
    "difficulty": "Medium",
    "topic": "Programming Fundamentals",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_mcq_010",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "Which data structure is most suitable for implementing a Breadth-First Search (BFS) on a graph?",
    "options": [
      {
        "id": "A",
        "text": "Stack"
      },
      {
        "id": "B",
        "text": "Queue"
      },
      {
        "id": "C",
        "text": "Priority Queue"
      },
      {
        "id": "D",
        "text": "Binary Tree"
      }
    ],
    "correctOption": "B",
    "explanation": "A queue (FIFO) is standard for BFS traversal to process vertices in the order they are discovered.",
    "difficulty": "Easy",
    "topic": "Data Structures",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_mcq_011",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "What is the primary feature of a Greedy algorithm?",
    "options": [
      {
        "id": "A",
        "text": "It searches all possible combinations globally."
      },
      {
        "id": "B",
        "text": "It makes the locally optimal choice at each step hoping to find a global optimum."
      },
      {
        "id": "C",
        "text": "It memoizes intermediate state results in a table."
      },
      {
        "id": "D",
        "text": "It dynamically backtracks to alternative branch paths."
      }
    ],
    "correctOption": "B",
    "explanation": "Greedy algorithms make locally optimal choices at each stage in the hope of finding a global optimum.",
    "difficulty": "Medium",
    "topic": "Algorithms",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_mcq_012",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "What is the time complexity of merging two sorted arrays of size M and N into a single sorted array?",
    "options": [
      {
        "id": "A",
        "text": "O(M * N)"
      },
      {
        "id": "B",
        "text": "O(M log N)"
      },
      {
        "id": "C",
        "text": "O(M + N)"
      },
      {
        "id": "D",
        "text": "O(log(M + N))"
      }
    ],
    "correctOption": "C",
    "explanation": "Merging two sorted arrays requires iterating through both arrays once using two pointers, taking O(M + N) time.",
    "difficulty": "Easy",
    "topic": "Complexity",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_mcq_013",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "In software development, what does a debugger breakpoint do?",
    "options": [
      {
        "id": "A",
        "text": "It terminates the program immediately and deletes files."
      },
      {
        "id": "B",
        "text": "It pauses code execution at a specific line to allow inspection of variables."
      },
      {
        "id": "C",
        "text": "It increases compiler speed by skipping lines."
      },
      {
        "id": "D",
        "text": "It changes the value of local parameters automatically."
      }
    ],
    "correctOption": "B",
    "explanation": "Breakpoints tell the debugger to temporarily suspend code execution at a designated instruction, allowing the developer to examine execution state.",
    "difficulty": "Easy",
    "topic": "Debugging Concepts",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_mcq_014",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "What is the main benefit of encapsulation in Object-Oriented Programming?",
    "options": [
      {
        "id": "A",
        "text": "Allowing multiple inheritance in single class files"
      },
      {
        "id": "B",
        "text": "Restricting direct access to an object's state and bundling behavior with data"
      },
      {
        "id": "C",
        "text": "Allowing functions to accept multiple signatures"
      },
      {
        "id": "D",
        "text": "Eliminating memory usage of class definitions"
      }
    ],
    "correctOption": "B",
    "explanation": "Encapsulation restricts direct user access to internal object representation, hiding state details and forcing interaction via public methods.",
    "difficulty": "Easy",
    "topic": "OOP",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_mcq_015",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "What does the ACID property \"Isolation\" guarantee in Database Transactions?",
    "options": [
      {
        "id": "A",
        "text": "A transaction will run completely or not at all."
      },
      {
        "id": "B",
        "text": "Concurrent transactions execute without interfering with each other."
      },
      {
        "id": "C",
        "text": "Database states survive server power outages."
      },
      {
        "id": "D",
        "text": "Data constraints remain valid throughout execution."
      }
    ],
    "correctOption": "B",
    "explanation": "Isolation ensures that the execution of concurrent transactions yields the same database state as if they were executed sequentially.",
    "difficulty": "Medium",
    "topic": "SQL/database fundamentals",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_mcq_016",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "Which network layer in the OSI model is responsible for packet routing, forwarding, and addressing?",
    "options": [
      {
        "id": "A",
        "text": "Transport Layer"
      },
      {
        "id": "B",
        "text": "Data Link Layer"
      },
      {
        "id": "C",
        "text": "Network Layer"
      },
      {
        "id": "D",
        "text": "Session Layer"
      }
    ],
    "correctOption": "C",
    "explanation": "The Network Layer handles packet routing, logical addressing (IP), and traffic control path selection.",
    "difficulty": "Easy",
    "topic": "Computer Fundamentals",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_mcq_017",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "Which parameter passing method copies the memory address of the actual argument into the formal parameter?",
    "options": [
      {
        "id": "A",
        "text": "Pass by value"
      },
      {
        "id": "B",
        "text": "Pass by reference"
      },
      {
        "id": "C",
        "text": "Pass by copy-restore"
      },
      {
        "id": "D",
        "text": "Pass by name"
      }
    ],
    "correctOption": "B",
    "explanation": "Pass by reference passes a reference (address) to the actual variable, meaning changes made inside the function affect the original argument.",
    "difficulty": "Medium",
    "topic": "Programming Fundamentals",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_mcq_018",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "Which tree traversal visits the root node first, followed by the left subtree and then the right subtree?",
    "options": [
      {
        "id": "A",
        "text": "In-order"
      },
      {
        "id": "B",
        "text": "Pre-order"
      },
      {
        "id": "C",
        "text": "Post-order"
      },
      {
        "id": "D",
        "text": "Level-order"
      }
    ],
    "correctOption": "B",
    "explanation": "Pre-order traversal visits the current node (Root) first, then traverses the Left subtree, and finally the Right subtree.",
    "difficulty": "Easy",
    "topic": "Data Structures",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_mcq_019",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "What is the time complexity of the Binary Search algorithm on a sorted list of N elements?",
    "options": [
      {
        "id": "A",
        "text": "O(N)"
      },
      {
        "id": "B",
        "text": "O(log N)"
      },
      {
        "id": "C",
        "text": "O(N^2)"
      },
      {
        "id": "D",
        "text": "O(1)"
      }
    ],
    "correctOption": "B",
    "explanation": "Binary Search repeatedly cuts the search interval in half, resulting in a logarithmic time complexity of O(log N).",
    "difficulty": "Easy",
    "topic": "Algorithms",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_mcq_020",
    "questionType": "MCQ",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "What does the space complexity O(N) represent in dynamic arrays?",
    "options": [
      {
        "id": "A",
        "text": "Memory consumption increases linearly with input size N."
      },
      {
        "id": "B",
        "text": "Memory consumption is constant regardless of input size N."
      },
      {
        "id": "C",
        "text": "Memory consumption grows exponentially with input size N."
      },
      {
        "id": "D",
        "text": "Memory consumption decreases with input size N."
      }
    ],
    "correctOption": "A",
    "explanation": "Space complexity O(N) means the memory required by the program grows linearly in proportion to the input size N.",
    "difficulty": "Easy",
    "topic": "Complexity",
    "provenance": "FirstRound Staging"
  },
  {
    "id": "q_coding_mock_code_001",
    "title": "Reverse Words in String",
    "questionType": "CODING",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "You are given a string of words separated by spaces.\nWrite a program that reads the string from standard input (stdin) and outputs the string with its words reversed in order.\nWords must be separated by a single space, and there should be no leading or trailing spaces.",
    "codingConfig": {
  "problemStatement": "Reverse words in a string. You are given a string of words separated by spaces. Write a program that reads the string from standard input (stdin) and outputs the string with its words reversed in order. Words must be separated by a single space, and there should be no leading or trailing spaces.",
  "inputFormat": "Line 1: A string.",
  "outputFormat": "Line 1: The string with words reversed.",
  "constraints": [
    "1 <= s.length <= 10^4",
    "`s` contains English letters and spaces."
  ],
  "examples": [
    {
      "input": "the sky is blue",
      "output": "blue is sky the",
      "explanation": "Words are reversed."
    }
  ],
  "starterCode": {
    "javascript": "const fs = require('fs');\\n\\nfunction solve() {\\n  const input = fs.readFileSync(0, 'utf-8').trim();\\n  // Write your code here\\n}\\n\\nsolve();",
    "typescript": "import * as fs from 'fs';\\n\\nfunction solve(): void {\\n  const input = fs.readFileSync(0, 'utf-8').trim();\\n  // Write your code here\\n}\\n\\nsolve();",
    "python": "import sys\\n\\ndef solve():\\n    input_data = sys.stdin.read().strip()\\n    # Write your code here\\n\\nif __name__ == '__main__':\\n    solve()"
  },
  "publicTests": [
    {
      "input": "the sky is blue",
      "output": "blue is sky the"
    },
    {
      "input": "  hello world  ",
      "output": "world hello"
    },
    {
      "input": "a good   example",
      "output": "example good a"
    }
  ],
  "hiddenTests": [
    {
      "input": "singleword",
      "output": "singleword"
    },
    {
      "input": "    multiple    spaces    between   words   ",
      "output": "words between spaces multiple"
    },
    {
      "input": "a b c d e f g",
      "output": "g f e d c b a"
    },
    {
      "input": "123 456 789",
      "output": "789 456 123"
    },
    {
      "input": "Abc DEF ghi",
      "output": "ghi DEF Abc"
    }
  ],
  "defaultLanguage": "javascript",
  "supportedLanguages": [
    "javascript",
    "typescript",
    "python"
  ],
  "timeLimitMs": 2000,
  "memoryLimitMb": 128
},
    "timeLimitMs": 4000,
    "memoryLimitMb": 256,
    "scoringConfig": {
      "model": "PERCENTAGE_PASSED",
      "hiddenTestWeight": 80,
      "sampleTestWeight": 20
    },
    "correctAnswer": "Optimal String parsing and array reversing in linear time.",
    "explanation": "Split the input by whitespace, reverse the resulting array of words, and join them back using a single space.",
    "difficulty": "Easy",
    "skill": "Strings",
    "topic": "Array/String Manipulation",
    "subtopic": "String reversal algorithms",
    "company": "FirstRound Staging",
    "source": "FirstRound Original",
    "tags": [
      "Strings",
      "Array",
      "Easy",
      "Staging"
    ]
  },
  {
    "id": "q_coding_mock_code_002",
    "title": "Valid Palindrome Clean",
    "questionType": "CODING",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.\nWrite a program that reads the string from standard input (stdin) and outputs 'true' if it is a palindrome, else 'false'.",
    "codingConfig": {
  "problemStatement": "Find the missing number. Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.",
  "inputFormat": "Line 1: A JSON array of integers `nums`.",
  "outputFormat": "Line 1: An integer representing the missing number.",
  "constraints": [
    "n == nums.length",
    "1 <= n <= 10^4",
    "0 <= nums[i] <= n",
    "All the numbers of nums are unique."
  ],
  "examples": [
    {
      "input": "[3,0,1]",
      "output": "2",
      "explanation": "n=3, missing 2."
    }
  ],
  "starterCode": {
    "javascript": "const fs = require('fs');\\n\\nfunction solve() {\\n  const input = fs.readFileSync(0, 'utf-8').trim();\\n  if (!input) return;\\n  const nums = JSON.parse(input);\\n  // Write your code here\\n}\\n\\nsolve();",
    "typescript": "import * as fs from 'fs';\\n\\nfunction solve(): void {\\n  const input = fs.readFileSync(0, 'utf-8').trim();\\n  if (!input) return;\\n  const nums: number[] = JSON.parse(input);\\n  // Write your code here\\n}\\n\\nsolve();",
    "python": "import sys\\nimport json\\n\\ndef solve():\\n    input_data = sys.stdin.read().strip()\\n    if not input_data: return\\n    nums = json.loads(input_data)\\n    # Write your code here\\n\\nif __name__ == '__main__':\\n    solve()"
  },
  "publicTests": [
    {
      "input": "[3,0,1]",
      "output": "2"
    },
    {
      "input": "[0,1]",
      "output": "2"
    },
    {
      "input": "[9,6,4,2,3,5,7,0,1]",
      "output": "8"
    }
  ],
  "hiddenTests": [
    {
      "input": "[0]",
      "output": "1"
    },
    {
      "input": "[1]",
      "output": "0"
    },
    {
      "input": "[1,2,3,4,5]",
      "output": "0"
    },
    {
      "input": "[0,1,2,3,4]",
      "output": "5"
    },
    {
      "input": "[4,2,3,1,5,6,8,7,9]",
      "output": "0"
    }
  ],
  "defaultLanguage": "javascript",
  "supportedLanguages": [
    "javascript",
    "typescript",
    "python"
  ],
  "timeLimitMs": 2000,
  "memoryLimitMb": 128
},
    "timeLimitMs": 4000,
    "memoryLimitMb": 256,
    "scoringConfig": {
      "model": "PERCENTAGE_PASSED",
      "hiddenTestWeight": 80,
      "sampleTestWeight": 20
    },
    "correctAnswer": "Two-pointer or string reversal solution after sanitizing character inputs.",
    "explanation": "Filter out non-alphanumeric characters, convert the remaining string to lowercase, and check if it is equal to its reversed representation.",
    "difficulty": "Easy",
    "skill": "Two Pointers",
    "topic": "Hashing / Two Pointers",
    "subtopic": "Palindrome checking algorithms",
    "company": "FirstRound Staging",
    "source": "FirstRound Original",
    "tags": [
      "Two Pointers",
      "Hashing",
      "Easy",
      "Staging"
    ]
  },
  {
    "id": "q_coding_mock_code_003",
    "title": "Min Stack Simulation",
    "questionType": "CODING",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\nWrite a program that processes operation instructions from standard input (stdin) and outputs the results of 'top' and 'getMin' operations on separate lines.\nOperation commands:\n- push X: push element X onto stack\n- pop: remove the top element\n- top: print the top element\n- getMin: print the minimum element in the stack",
    "codingConfig": {
  "problemStatement": "Check if a string is a palindrome, considering only alphanumeric characters and ignoring cases.",
  "inputFormat": "Line 1: A string.",
  "outputFormat": "Line 1: 'true' or 'false'.",
  "constraints": [
    "1 <= s.length <= 2 * 10^5",
    "`s` consists only of printable ASCII characters."
  ],
  "examples": [
    {
      "input": "A man, a plan, a canal: Panama",
      "output": "true",
      "explanation": "'amanaplanacanalpanama' is a palindrome."
    }
  ],
  "starterCode": {
    "javascript": "const fs = require('fs');\\n\\nfunction solve() {\\n  const input = fs.readFileSync(0, 'utf-8').trim();\\n  // Write your code here\\n}\\n\\nsolve();",
    "typescript": "import * as fs from 'fs';\\n\\nfunction solve(): void {\\n  const input = fs.readFileSync(0, 'utf-8').trim();\\n  // Write your code here\\n}\\n\\nsolve();",
    "python": "import sys\\n\\ndef solve():\\n    input_data = sys.stdin.read().strip()\\n    # Write your code here\\n\\nif __name__ == '__main__':\\n    solve()"
  },
  "publicTests": [
    {
      "input": "A man, a plan, a canal: Panama",
      "output": "true"
    },
    {
      "input": "race a car",
      "output": "false"
    },
    {
      "input": " ",
      "output": "true"
    }
  ],
  "hiddenTests": [
    {
      "input": "0P",
      "output": "false"
    },
    {
      "input": "a.",
      "output": "true"
    },
    {
      "input": "ab@a",
      "output": "true"
    },
    {
      "input": "12321",
      "output": "true"
    },
    {
      "input": "12343210",
      "output": "false"
    },
    {
      "input": "A b c D c b A",
      "output": "true"
    }
  ],
  "defaultLanguage": "javascript",
  "supportedLanguages": [
    "javascript",
    "typescript",
    "python"
  ],
  "timeLimitMs": 2000,
  "memoryLimitMb": 128
},
    "timeLimitMs": 4000,
    "memoryLimitMb": 256,
    "scoringConfig": {
      "model": "PERCENTAGE_PASSED",
      "hiddenTestWeight": 80,
      "sampleTestWeight": 20
    },
    "correctAnswer": "Stack data structure using an auxiliary stack to trace current minimums.",
    "explanation": "Maintain a secondary stack to store the minimum element corresponding to each push operation, enabling O(1) minimum retrievals.",
    "difficulty": "Medium",
    "skill": "Stack & Queue",
    "topic": "Stack / Queue",
    "subtopic": "Min Stack implementation",
    "company": "FirstRound Staging",
    "source": "FirstRound Original",
    "tags": [
      "Stack",
      "Design",
      "Medium",
      "Staging"
    ]
  },
  {
    "id": "q_coding_mock_code_004",
    "title": "Search in Rotated Sorted Array",
    "questionType": "CODING",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "An integer array nums is sorted in ascending order (with distinct values).\nPrior to being passed to your function, nums is possibly rotated at an unknown pivot index.\nGiven the array nums after the possible rotation and an integer target, write a program that reads input from standard input (stdin) and outputs the index of target if it is in nums, or -1 if it is not in nums.",
    "codingConfig": {
  "problemStatement": "Sort an array of integers in ascending order.",
  "inputFormat": "Line 1: A JSON array of integers `nums`.",
  "outputFormat": "Line 1: A JSON array of sorted integers.",
  "constraints": [
    "1 <= nums.length <= 5 * 10^4",
    "-5 * 10^4 <= nums[i] <= 5 * 10^4"
  ],
  "examples": [
    {
      "input": "[5,2,3,1]",
      "output": "[1,2,3,5]",
      "explanation": "Array is sorted."
    }
  ],
  "starterCode": {
    "javascript": "const fs = require('fs');\\n\\nfunction solve() {\\n  const input = fs.readFileSync(0, 'utf-8').trim();\\n  if (!input) return;\\n  const nums = JSON.parse(input);\\n  // Write your code here\\n}\\n\\nsolve();",
    "typescript": "import * as fs from 'fs';\\n\\nfunction solve(): void {\\n  const input = fs.readFileSync(0, 'utf-8').trim();\\n  if (!input) return;\\n  const nums: number[] = JSON.parse(input);\\n  // Write your code here\\n}\\n\\nsolve();",
    "python": "import sys\\nimport json\\n\\ndef solve():\\n    input_data = sys.stdin.read().strip()\\n    if not input_data: return\\n    nums = json.loads(input_data)\\n    # Write your code here\\n\\nif __name__ == '__main__':\\n    solve()"
  },
  "publicTests": [
    {
      "input": "[5,2,3,1]",
      "output": "[1,2,3,5]"
    },
    {
      "input": "[5,1,1,2,0,0]",
      "output": "[0,0,1,1,2,5]"
    },
    {
      "input": "[-1, 2, -8, -10]",
      "output": "[-10,-8,-1,2]"
    }
  ],
  "hiddenTests": [
    {
      "input": "[1]",
      "output": "[1]"
    },
    {
      "input": "[2,1]",
      "output": "[1,2]"
    },
    {
      "input": "[9,8,7,6,5,4,3,2,1,0]",
      "output": "[0,1,2,3,4,5,6,7,8,9]"
    },
    {
      "input": "[0,0,0,0]",
      "output": "[0,0,0,0]"
    },
    {
      "input": "[100,-100,0,50,-50]",
      "output": "[-100,-50,0,50,100]"
    }
  ],
  "defaultLanguage": "javascript",
  "supportedLanguages": [
    "javascript",
    "typescript",
    "python"
  ],
  "timeLimitMs": 2000,
  "memoryLimitMb": 128
},
    "timeLimitMs": 4000,
    "memoryLimitMb": 256,
    "scoringConfig": {
      "model": "PERCENTAGE_PASSED",
      "hiddenTestWeight": 80,
      "sampleTestWeight": 20
    },
    "correctAnswer": "Binary search implementation evaluating sorted half boundaries in O(log N) time.",
    "explanation": "Check which half of the array is sorted. If target lies within the boundaries of the sorted half, reduce binary search space to it; else, search in the opposite half.",
    "difficulty": "Medium",
    "skill": "Binary Search",
    "topic": "Binary Search / Greedy",
    "subtopic": "Search in rotated arrays",
    "company": "FirstRound Staging",
    "source": "FirstRound Original",
    "tags": [
      "Binary Search",
      "Arrays",
      "Medium",
      "Staging"
    ]
  },
  {
    "id": "q_coding_mock_code_005",
    "title": "Climbing Stairs",
    "questionType": "CODING",
    "testSeriesId": "cat_coding_mock_01",
    "questionText": "You are climbing a staircase. It takes N steps to reach the top.\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?\nWrite a program that reads N from standard input (stdin) and prints the distinct ways to standard output (stdout).",
    "codingConfig": {
  "problemStatement": "Find the first non-repeating character in a string and return its index. If it does not exist, return -1.",
  "inputFormat": "Line 1: A string.",
  "outputFormat": "Line 1: An integer index, or -1.",
  "constraints": [
    "1 <= s.length <= 10^5",
    "`s` consists of only lowercase English letters."
  ],
  "examples": [
    {
      "input": "leetcode",
      "output": "0",
      "explanation": "The first non-repeating character is 'l' at index 0."
    }
  ],
  "starterCode": {
    "javascript": "const fs = require('fs');\\n\\nfunction solve() {\\n  const input = fs.readFileSync(0, 'utf-8').trim();\\n  // Write your code here\\n}\\n\\nsolve();",
    "typescript": "import * as fs from 'fs';\\n\\nfunction solve(): void {\\n  const input = fs.readFileSync(0, 'utf-8').trim();\\n  // Write your code here\\n}\\n\\nsolve();",
    "python": "import sys\\n\\ndef solve():\\n    input_data = sys.stdin.read().strip()\\n    # Write your code here\\n\\nif __name__ == '__main__':\\n    solve()"
  },
  "publicTests": [
    {
      "input": "leetcode",
      "output": "0"
    },
    {
      "input": "loveleetcode",
      "output": "2"
    },
    {
      "input": "aabb",
      "output": "-1"
    }
  ],
  "hiddenTests": [
    {
      "input": "z",
      "output": "0"
    },
    {
      "input": "aadadaad",
      "output": "-1"
    },
    {
      "input": "dddccdbba",
      "output": "8"
    },
    {
      "input": "abcabc",
      "output": "-1"
    },
    {
      "input": "abcdefg",
      "output": "0"
    },
    {
      "input": "abcdeedcba",
      "output": "-1"
    }
  ],
  "defaultLanguage": "javascript",
  "supportedLanguages": [
    "javascript",
    "typescript",
    "python"
  ],
  "timeLimitMs": 2000,
  "memoryLimitMb": 128
},
    "timeLimitMs": 4000,
    "memoryLimitMb": 256,
    "scoringConfig": {
      "model": "PERCENTAGE_PASSED",
      "hiddenTestWeight": 80,
      "sampleTestWeight": 20
    },
    "correctAnswer": "Dynamic programming or iterative Fibonacci sequence calculation.",
    "explanation": "The number of ways to reach step N is the sum of ways to reach step N-1 and N-2. This is equivalent to finding the Nth Fibonacci number.",
    "difficulty": "Hard",
    "skill": "Dynamic Programming",
    "topic": "Graph / Dynamic Programming",
    "subtopic": "Stair climbing ways optimization",
    "company": "FirstRound Staging",
    "source": "FirstRound Original",
    "tags": [
      "Dynamic Programming",
      "Recursion",
      "Hard",
      "Staging"
    ]
  }
];

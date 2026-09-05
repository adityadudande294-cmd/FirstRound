import { Question, MCQQuestion } from '../../types';

export const progFundamentalsQuestions: Question[] = [
  {
    id: 'q_prog_fund_001',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'Which of the following data types is typically used to represent a true or false value?',
    options: [
      { id: 'A', text: 'Integer' },
      { id: 'B', text: 'Float' },
      { id: 'C', text: 'Boolean' },
      { id: 'D', text: 'String' }
    ],
    correctOption: 'C',
    topic: 'Data Types',
    subTopic: 'Primitives',
    difficulty: 'Easy',
    explanation: 'A Boolean data type has only two possible values: true or false.'
  },
  {
    id: 'q_prog_fund_002',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'What does the modulo operator (`%`) return?',
    options: [
      { id: 'A', text: 'The quotient of division' },
      { id: 'B', text: 'The remainder of division' },
      { id: 'C', text: 'The integer division result' },
      { id: 'D', text: 'The exponential result' }
    ],
    correctOption: 'B',
    topic: 'Operators',
    subTopic: 'Arithmetic',
    difficulty: 'Easy',
    explanation: 'The modulo operator (%) divides one operand by another and returns the remainder. For example, 7 % 3 is 1.'
  },
  {
    id: 'q_prog_fund_003',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'In an array/list, what is the index of the first element in most programming languages?',
    options: [
      { id: 'A', text: '0' },
      { id: 'B', text: '1' },
      { id: 'C', text: '-1' },
      { id: 'D', text: 'Depends on the size of the array' }
    ],
    correctOption: 'A',
    topic: 'Arrays',
    subTopic: 'Indexing',
    difficulty: 'Easy',
    explanation: 'In most modern languages (C, Java, Python, JavaScript), arrays are zero-indexed, meaning the first element is at index 0.'
  },
  {
    id: 'q_prog_fund_004',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'Which control structure is best suited when you know exactly how many times a block of code should run?',
    options: [
      { id: 'A', text: 'while loop' },
      { id: 'B', text: 'do-while loop' },
      { id: 'C', text: 'for loop' },
      { id: 'D', text: 'switch statement' }
    ],
    correctOption: 'C',
    topic: 'Loops',
    subTopic: 'Control Flow',
    difficulty: 'Easy',
    explanation: 'A for loop is ideal when the number of iterations is known in advance, as it explicitly defines the initialization, condition, and increment/decrement.'
  },
  {
    id: 'q_prog_fund_005',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'What is the purpose of a function (or method) in programming?',
    options: [
      { id: 'A', text: 'To store data permanently' },
      { id: 'B', text: 'To group a block of code to perform a specific task, promoting reusability' },
      { id: 'C', text: 'To define the data types of variables' },
      { id: 'D', text: 'To encrypt code' }
    ],
    correctOption: 'B',
    topic: 'Functions',
    subTopic: 'Basics',
    difficulty: 'Easy',
    explanation: 'Functions allow you to encapsulate a specific piece of logic so it can be executed multiple times without repeating code, keeping programs organized and reusable.'
  },
  {
    id: 'q_prog_fund_006',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'What does "scope" refer to in programming?',
    options: [
      { id: 'A', text: 'The size of an array in memory' },
      { id: 'B', text: 'The region of the code where a variable is defined and can be accessed' },
      { id: 'C', text: 'The speed of execution of a program' },
      { id: 'D', text: 'The tool used to debug code' }
    ],
    correctOption: 'B',
    topic: 'Scope',
    subTopic: 'Variables',
    difficulty: 'Medium',
    explanation: 'Scope determines the accessibility (visibility) of variables and functions. A variable defined inside a function (local scope) cannot be accessed from outside that function.'
  },
  {
    id: 'q_prog_fund_007',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'What is an infinite loop?',
    options: [
      { id: 'A', text: 'A loop that automatically adjusts its bounds' },
      { id: 'B', text: 'A loop that never terminates because its exit condition is never met' },
      { id: 'C', text: 'A loop used strictly for server connections' },
      { id: 'D', text: 'A loop that handles floating point numbers' }
    ],
    correctOption: 'B',
    topic: 'Loops',
    subTopic: 'Logic Errors',
    difficulty: 'Easy',
    explanation: 'An infinite loop happens when the terminating condition is never satisfied, causing the program to execute the loop block indefinitely.'
  },
  {
    id: 'q_prog_fund_008',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'What is recursion in programming?',
    options: [
      { id: 'A', text: 'When a function calls itself directly or indirectly' },
      { id: 'B', text: 'When two arrays reference each other' },
      { id: 'C', text: 'A type of sorting algorithm' },
      { id: 'D', text: 'A method for compressing files' }
    ],
    correctOption: 'A',
    topic: 'Recursion Basics',
    subTopic: 'Concepts',
    difficulty: 'Medium',
    explanation: 'Recursion occurs when a function calls itself. It must have a base case to stop the recursive calls and prevent a stack overflow.'
  },
  {
    id: 'q_prog_fund_009',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'What is a "base case" in a recursive function?',
    options: [
      { id: 'A', text: 'The worst-case time complexity' },
      { id: 'B', text: 'The condition under which the function stops calling itself' },
      { id: 'C', text: 'The starting point of the program execution' },
      { id: 'D', text: 'The default block in a switch statement' }
    ],
    correctOption: 'B',
    topic: 'Recursion Basics',
    subTopic: 'Concepts',
    difficulty: 'Medium',
    explanation: 'The base case is the terminating condition in a recursive function. Without it, the function would call itself indefinitely.'
  },
  {
    id: 'q_prog_fund_010',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'Which logical operator returns TRUE only if BOTH operands are TRUE?',
    options: [
      { id: 'A', text: 'OR (||)' },
      { id: 'B', text: 'NOT (!)' },
      { id: 'C', text: 'AND (&&)' },
      { id: 'D', text: 'XOR (^)' }
    ],
    correctOption: 'C',
    topic: 'Operators',
    subTopic: 'Logical',
    difficulty: 'Easy',
    explanation: 'The logical AND operator requires both conditions to be true in order to evaluate to true overall.'
  },
  {
    id: 'q_prog_fund_011',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'What is string concatenation?',
    options: [
      { id: 'A', text: 'Cutting a string into smaller pieces' },
      { id: 'B', text: 'Combining two or more strings end-to-end to form a new string' },
      { id: 'C', text: 'Converting a string to uppercase' },
      { id: 'D', text: 'Parsing an integer from a string' }
    ],
    correctOption: 'B',
    topic: 'Strings',
    subTopic: 'Operations',
    difficulty: 'Easy',
    explanation: 'Concatenation is the operation of joining character strings end-to-end. For example, "Hello" + "World" becomes "HelloWorld".'
  },
  {
    id: 'q_prog_fund_012',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'Which programming concept involves breaking down a problem into smaller, manageable parts?',
    options: [
      { id: 'A', text: 'Polymorphism' },
      { id: 'B', text: 'Encapsulation' },
      { id: 'C', text: 'Modular programming / Decomposition' },
      { id: 'D', text: 'Garbage collection' }
    ],
    correctOption: 'C',
    topic: 'Programming Logic',
    subTopic: 'Concepts',
    difficulty: 'Easy',
    explanation: 'Decomposition (or modular programming) is the practice of breaking a complex problem into smaller, simpler, and more manageable modules or functions.'
  },
  {
    id: 'q_prog_fund_013',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'In OOP, what is a "class"?',
    options: [
      { id: 'A', text: 'A specific item in memory' },
      { id: 'B', text: 'A blueprint or template for creating objects' },
      { id: 'C', text: 'A mathematical function' },
      { id: 'D', text: 'A reserved keyword to stop a loop' }
    ],
    correctOption: 'B',
    topic: 'OOP Basics',
    subTopic: 'Concepts',
    difficulty: 'Easy',
    explanation: 'A class is a blueprint that defines the variables and the methods common to all objects of a certain kind.'
  },
  {
    id: 'q_prog_fund_014',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'Which of the following is true regarding dynamically typed languages (e.g., Python, JavaScript)?',
    options: [
      { id: 'A', text: 'Variables are bound to types at compile time.' },
      { id: 'B', text: 'You must explicitly declare the data type of a variable before using it.' },
      { id: 'C', text: 'The type of a variable is checked at runtime and can change during execution.' },
      { id: 'D', text: 'They generally run faster than statically typed languages.' }
    ],
    correctOption: 'C',
    topic: 'Variables',
    subTopic: 'Typing',
    difficulty: 'Medium',
    explanation: 'In dynamically typed languages, types are associated with run-time values, and a variable can hold a string at one point and an integer at another.'
  },
  {
    id: 'q_prog_fund_015',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'What is a Syntax Error?',
    options: [
      { id: 'A', text: 'An error that occurs when the program attempts an impossible mathematical operation' },
      { id: 'B', text: 'An error resulting from code that violates the grammatical rules of the programming language' },
      { id: 'C', text: 'An error that causes the program to produce incorrect output despite running successfully' },
      { id: 'D', text: 'An error caused by a missing file at runtime' }
    ],
    correctOption: 'B',
    topic: 'Programming Logic',
    subTopic: 'Debugging',
    difficulty: 'Easy',
    explanation: 'A syntax error occurs when the code breaks the structural rules of the language (like a missing semicolon or mismatched parentheses). The compiler or interpreter will refuse to execute it.'
  },
  {
    id: 'q_prog_fund_016',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'What does a compiler do?',
    options: [
      { id: 'A', text: 'Executes source code line-by-line during runtime.' },
      { id: 'B', text: 'Translates the entire high-level source code into machine code before execution.' },
      { id: 'C', text: 'Formats code to make it readable.' },
      { id: 'D', text: 'Searches for logic errors in an algorithm.' }
    ],
    correctOption: 'B',
    topic: 'Programming Logic',
    subTopic: 'Execution',
    difficulty: 'Medium',
    explanation: 'A compiler translates the entire source code into executable machine code (or intermediate byte code) prior to execution, whereas an interpreter translates it line-by-line on the fly.'
  },
  {
    id: 'q_prog_fund_017',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'If `x = 5` and `y = 10`, what is the result of `x == y`?',
    options: [
      { id: 'A', text: '5' },
      { id: 'B', text: '10' },
      { id: 'C', text: 'True' },
      { id: 'D', text: 'False' }
    ],
    correctOption: 'D',
    topic: 'Conditions',
    subTopic: 'Comparisons',
    difficulty: 'Easy',
    explanation: 'The `==` operator checks for equality. Since 5 is not equal to 10, the expression evaluates to False.'
  },
  {
    id: 'q_prog_fund_018',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'What is an array?',
    options: [
      { id: 'A', text: 'A primitive data type holding a single value' },
      { id: 'B', text: 'A data structure that stores a collection of elements, typically of the same type, sequentially in memory' },
      { id: 'C', text: 'A function that repeats a set of instructions' },
      { id: 'D', text: 'A keyword used to declare a constant' }
    ],
    correctOption: 'B',
    topic: 'Arrays',
    subTopic: 'Data Structures',
    difficulty: 'Easy',
    explanation: 'An array is a linear data structure used to store a collection of elements, accessed via indices.'
  },
  {
    id: 'q_prog_fund_019',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'What is a parameter in the context of functions?',
    options: [
      { id: 'A', text: 'The return value of the function' },
      { id: 'B', text: 'A variable in a function definition that accepts data passed into the function' },
      { id: 'C', text: 'A block of code inside the function' },
      { id: 'D', text: 'An error thrown by the function' }
    ],
    correctOption: 'B',
    topic: 'Functions',
    subTopic: 'Arguments',
    difficulty: 'Medium',
    explanation: 'A parameter is a variable declared in the function definition. When the function is called, the actual values passed are called arguments, which bind to the parameters.'
  },
  {
    id: 'q_prog_fund_020',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'Which of the following describes an IF-ELSE statement?',
    options: [
      { id: 'A', text: 'It creates a loop that runs until a condition is met.' },
      { id: 'B', text: 'It is a conditional statement that executes one block of code if a condition is true, and another if it is false.' },
      { id: 'C', text: 'It pauses the execution of the program for a specific time.' },
      { id: 'D', text: 'It declares a new variable and assigns it a default value.' }
    ],
    correctOption: 'B',
    topic: 'Conditions',
    subTopic: 'Control Flow',
    difficulty: 'Easy',
    explanation: 'The IF-ELSE structure branches the execution of the program based on the boolean result of a condition.'
  },
  {
    id: 'q_prog_fund_021',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'Why are comments used in code?',
    options: [
      { id: 'A', text: 'To increase the execution speed of the program' },
      { id: 'B', text: 'To explain code logic and make it more readable for humans' },
      { id: 'C', text: 'To encrypt sensitive data within the file' },
      { id: 'D', text: 'To tell the compiler which language is being used' }
    ],
    correctOption: 'B',
    topic: 'Programming Logic',
    subTopic: 'Best Practices',
    difficulty: 'Easy',
    explanation: 'Comments are ignored by the compiler/interpreter and exist purely to help developers understand the logic, intention, and functionality of the code.'
  },
  {
    id: 'q_prog_fund_022',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'What does it mean when a variable is described as a "Constant"?',
    options: [
      { id: 'A', text: 'It can only store numbers.' },
      { id: 'B', text: 'Its value cannot be changed after it is initialized.' },
      { id: 'C', text: 'It is accessible from anywhere in the program.' },
      { id: 'D', text: 'It must be defined at the very top of a file.' }
    ],
    correctOption: 'B',
    topic: 'Variables',
    subTopic: 'Immutability',
    difficulty: 'Easy',
    explanation: 'A constant is an identifier whose associated value cannot be altered by the program during its execution (e.g., using `const` in JS/C++ or `final` in Java).'
  },
  {
    id: 'q_prog_fund_023',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'In object-oriented programming, what is a "Method"?',
    options: [
      { id: 'A', text: 'A property or attribute of a class.' },
      { id: 'B', text: 'A function that belongs to a class or object.' },
      { id: 'C', text: 'The process of creating a new object.' },
      { id: 'D', text: 'An error handling technique.' }
    ],
    correctOption: 'B',
    topic: 'OOP Basics',
    subTopic: 'Concepts',
    difficulty: 'Easy',
    explanation: 'Methods are functions that are defined within a class and operate on the data (attributes) of instances (objects) of that class.'
  },
  {
    id: 'q_prog_fund_024',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'Which data structure operates on a Last-In, First-Out (LIFO) principle?',
    options: [
      { id: 'A', text: 'Queue' },
      { id: 'B', text: 'Stack' },
      { id: 'C', text: 'Array' },
      { id: 'D', text: 'Linked List' }
    ],
    correctOption: 'B',
    topic: 'Data Types',
    subTopic: 'Abstract Data Types',
    difficulty: 'Medium',
    explanation: 'A Stack follows the Last-In-First-Out (LIFO) principle, where the last element added is the first one to be removed.'
  },
  {
    id: 'q_prog_fund_025',
    testSeriesId: 'cat_coding_prog_fundamentals',
    questionType: 'MCQ',
    questionText: 'What is an "Exception" in programming?',
    options: [
      { id: 'A', text: 'A very highly optimized block of code' },
      { id: 'B', text: 'An unexpected event that occurs during execution and disrupts the normal flow of instructions' },
      { id: 'C', text: 'A special type of loop' },
      { id: 'D', text: 'A feature allowing multiple inheritance' }
    ],
    correctOption: 'B',
    topic: 'Programming Logic',
    subTopic: 'Debugging',
    difficulty: 'Medium',
    explanation: 'An exception is an error event that occurs during runtime. Proper exception handling allows a program to deal with the error gracefully instead of crashing.'
  }
];

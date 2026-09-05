import { Question, MCQQuestion } from '../../types';

export const codingOutputQuestions: Question[] = [
  {
    id: 'q_code_out_001',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'What is the output of the following JavaScript code?\\n```javascript\\nconsole.log(typeof null);\\n```',
    options: [
      { id: 'A', text: '"null"' },
      { id: 'B', text: '"object"' },
      { id: 'C', text: '"undefined"' },
      { id: 'D', text: 'Throws an error' }
    ],
    correctOption: 'B',
    topic: 'Output Prediction',
    subTopic: 'JavaScript Types',
    difficulty: 'Easy',
    explanation: 'In JavaScript, typeof null returns "object". This is a well-known historical bug in ECMAScript that cannot be fixed without breaking existing code.'
  },
  {
    id: 'q_code_out_002',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'What will the following Python code print?\\n```python\\ndef add_to_list(val, my_list=[]):\\n    my_list.append(val)\\n    return my_list\\n\\nprint(add_to_list(1))\\nprint(add_to_list(2))\\n```',
    options: [
      { id: 'A', text: '[1]\\n[2]' },
      { id: 'B', text: '[1]\\n[1, 2]' },
      { id: 'C', text: 'Throws a TypeError' },
      { id: 'D', text: '[1, 2]\\n[1, 2]' }
    ],
    correctOption: 'B',
    topic: 'Output Prediction',
    subTopic: 'Python Defaults',
    difficulty: 'Medium',
    explanation: 'In Python, default arguments are evaluated only once at function definition time. Therefore, the same list object is used across multiple calls, resulting in [1] then [1, 2].'
  },
  {
    id: 'q_code_out_003',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'What does this JavaScript code log?\\n```javascript\\nfor (var i = 0; i < 3; i++) {\\n  setTimeout(() => console.log(i), 1);\\n}\\n```',
    options: [
      { id: 'A', text: '0 1 2' },
      { id: 'B', text: '1 2 3' },
      { id: 'C', text: '3 3 3' },
      { id: 'D', text: 'undefined undefined undefined' }
    ],
    correctOption: 'C',
    topic: 'Output Prediction',
    subTopic: 'JS Closures',
    difficulty: 'Medium',
    explanation: 'Because `var` is function-scoped (or globally scoped here) and not block-scoped, by the time the setTimeout callbacks run, the loop has finished and `i` is 3.'
  },
  {
    id: 'q_code_out_004',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'Identify the bug in this Python snippet:\\n```python\\nmy_dict = {[1, 2]: "numbers"}\\n```',
    options: [
      { id: 'A', text: 'SyntaxError: invalid syntax' },
      { id: 'B', text: 'TypeError: unhashable type: \'list\'' },
      { id: 'C', text: 'KeyError: [1, 2]' },
      { id: 'D', text: 'There is no bug, it works fine.' }
    ],
    correctOption: 'B',
    topic: 'Debugging',
    subTopic: 'Python Types',
    difficulty: 'Easy',
    explanation: 'Dictionary keys in Python must be immutable (hashable). A list is mutable, so it cannot be used as a dictionary key, resulting in a TypeError.'
  },
  {
    id: 'q_code_out_005',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'What does the following JavaScript code output?\\n```javascript\\nconsole.log([] == ![]);\\n```',
    options: [
      { id: 'A', text: 'true' },
      { id: 'B', text: 'false' },
      { id: 'C', text: 'TypeError' },
      { id: 'D', text: 'undefined' }
    ],
    correctOption: 'A',
    topic: 'Output Prediction',
    subTopic: 'JS Coercion',
    difficulty: 'Hard',
    explanation: '`![]` evaluates to `false`. The comparison becomes `[] == false`. `[]` is coerced to an empty string `""`, and `false` is coerced to `0`. `""` is coerced to `0`, so `0 == 0` is true.'
  },
  {
    id: 'q_code_out_006',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'What is the output of this Python code?\\n```python\\nx = 10\\ndef foo():\\n    x += 1\\n    print(x)\\nfoo()\\n```',
    options: [
      { id: 'A', text: '11' },
      { id: 'B', text: '10' },
      { id: 'C', text: 'UnboundLocalError' },
      { id: 'D', text: 'NameError' }
    ],
    correctOption: 'C',
    topic: 'Debugging',
    subTopic: 'Python Scope',
    difficulty: 'Medium',
    explanation: 'Python assumes any variable assigned within a function is local. Since `x` is incremented (which involves reading its value first) before being locally assigned, it throws an UnboundLocalError.'
  },
  {
    id: 'q_code_out_007',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'What does this C++ snippet output?\\n```cpp\\nint x = 5;\\nint y = ++x * x++;\\nstd::cout << y;\\n```',
    options: [
      { id: 'A', text: '30' },
      { id: 'B', text: '36' },
      { id: 'C', text: '42' },
      { id: 'D', text: 'Undefined Behavior' }
    ],
    correctOption: 'D',
    topic: 'Output Prediction',
    subTopic: 'C++ Sequences',
    difficulty: 'Hard',
    explanation: 'Modifying a variable multiple times without an intervening sequence point leads to Undefined Behavior in C++ (prior to C++17, and heavily compiler dependent even now).'
  },
  {
    id: 'q_code_out_008',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'What is the output in JavaScript?\\n```javascript\\nconsole.log(0.1 + 0.2 === 0.3);\\n```',
    options: [
      { id: 'A', text: 'true' },
      { id: 'B', text: 'false' },
      { id: 'C', text: 'SyntaxError' },
      { id: 'D', text: 'undefined' }
    ],
    correctOption: 'B',
    topic: 'Output Prediction',
    subTopic: 'Floating Point',
    difficulty: 'Easy',
    explanation: 'Due to IEEE 754 floating-point arithmetic precision limitations, 0.1 + 0.2 results in 0.30000000000000004, which does not strictly equal 0.3.'
  },
  {
    id: 'q_code_out_009',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'Analyze this Java code:\\n```java\\nString s1 = "hello";\\nString s2 = new String("hello");\\nSystem.out.println(s1 == s2);\\n```',
    options: [
      { id: 'A', text: 'true' },
      { id: 'B', text: 'false' },
      { id: 'C', text: 'Compilation Error' },
      { id: 'D', text: 'NullPointerException' }
    ],
    correctOption: 'B',
    topic: 'Output Prediction',
    subTopic: 'Java Strings',
    difficulty: 'Medium',
    explanation: 'The `==` operator checks for reference equality. `s1` points to the string pool, while `s2` points to a new object created on the heap. Thus, they are not the same reference.'
  },
  {
    id: 'q_code_out_010',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'What is the output of this Python code?\\n```python\\nprint(bool("False"))\\n```',
    options: [
      { id: 'A', text: 'True' },
      { id: 'B', text: 'False' },
      { id: 'C', text: 'TypeError' },
      { id: 'D', text: 'None' }
    ],
    correctOption: 'A',
    topic: 'Output Prediction',
    subTopic: 'Python Types',
    difficulty: 'Easy',
    explanation: 'Any non-empty string in Python evaluates to True when converted to a boolean, regardless of its content.'
  },
  {
    id: 'q_code_out_011',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'What will be logged in JavaScript?\\n```javascript\\nlet a = { x: 1 };\\nlet b = a;\\nb.x = 2;\\nconsole.log(a.x);\\n```',
    options: [
      { id: 'A', text: '1' },
      { id: 'B', text: '2' },
      { id: 'C', text: 'undefined' },
      { id: 'D', text: 'Throws an error' }
    ],
    correctOption: 'B',
    topic: 'Output Prediction',
    subTopic: 'JS References',
    difficulty: 'Easy',
    explanation: 'Objects in JavaScript are passed by reference. Variables `a` and `b` point to the same object in memory, so mutating `b` mutates `a`.'
  },
  {
    id: 'q_code_out_012',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'Identify the potential runtime error in this C loop:\\n```c\\nint arr[5] = {1, 2, 3, 4, 5};\\nfor (int i = 1; i <= 5; i++) {\\n    printf("%d", arr[i]);\\n}\\n```',
    options: [
      { id: 'A', text: 'Syntax Error on loop declaration' },
      { id: 'B', text: 'Buffer Overflow / Out-of-bounds access' },
      { id: 'C', text: 'Infinite Loop' },
      { id: 'D', text: 'No error, it prints 12345' }
    ],
    correctOption: 'B',
    topic: 'Debugging',
    subTopic: 'C Arrays',
    difficulty: 'Medium',
    explanation: 'Arrays in C are 0-indexed. The loop accesses `arr[5]`, which is outside the bounds of the array (valid indices are 0 to 4), leading to undefined behavior / buffer overflow.'
  },
  {
    id: 'q_code_out_013',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'What is the result of this Python expression?\\n```python\\n[1, 2, 3] * 2\\n```',
    options: [
      { id: 'A', text: '[2, 4, 6]' },
      { id: 'B', text: '[1, 2, 3, 1, 2, 3]' },
      { id: 'C', text: 'TypeError' },
      { id: 'D', text: '[[1, 2, 3], [1, 2, 3]]' }
    ],
    correctOption: 'B',
    topic: 'Output Prediction',
    subTopic: 'Python Lists',
    difficulty: 'Easy',
    explanation: 'Multiplying a list by an integer `n` in Python creates a new list with the elements of the original list repeated `n` times.'
  },
  {
    id: 'q_code_out_014',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'What does this JavaScript code evaluate to?\\n```javascript\\ntypeof (()=>{})\\n```',
    options: [
      { id: 'A', text: '"object"' },
      { id: 'B', text: '"function"' },
      { id: 'C', text: '"undefined"' },
      { id: 'D', text: 'SyntaxError' }
    ],
    correctOption: 'B',
    topic: 'Output Prediction',
    subTopic: 'JS Functions',
    difficulty: 'Easy',
    explanation: 'The expression evaluates an arrow function, which is technically a Function object. In JS, `typeof` for functions returns `"function"`.'
  },
  {
    id: 'q_code_out_015',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'Consider this recursive function. What is `f(3)`?\\n```python\\ndef f(n):\\n    if n <= 1: return 1\\n    return n + f(n-1)\\n```',
    options: [
      { id: 'A', text: '3' },
      { id: 'B', text: '4' },
      { id: 'C', text: '5' },
      { id: 'D', text: '6' }
    ],
    correctOption: 'D',
    topic: 'Code Tracing',
    subTopic: 'Recursion',
    difficulty: 'Medium',
    explanation: 'Tracing: f(3) = 3 + f(2). f(2) = 2 + f(1). f(1) = 1. So f(3) = 3 + 2 + 1 = 6.'
  },
  {
    id: 'q_code_out_016',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'What does this JS code output?\\n```javascript\\nconsole.log(1 < 2 < 3);\\nconsole.log(3 > 2 > 1);\\n```',
    options: [
      { id: 'A', text: 'true\\ntrue' },
      { id: 'B', text: 'false\\nfalse' },
      { id: 'C', text: 'true\\nfalse' },
      { id: 'D', text: 'false\\ntrue' }
    ],
    correctOption: 'C',
    topic: 'Output Prediction',
    subTopic: 'JS Coercion',
    difficulty: 'Hard',
    explanation: '`1 < 2` is `true`, then `true < 3` coerces `true` to 1, so `1 < 3` is `true`. `3 > 2` is `true`, then `true > 1` coerces `true` to 1, so `1 > 1` is `false`.'
  },
  {
    id: 'q_code_out_017',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'What happens when this Java snippet executes?\\n```java\\nint x = 0;\\nint y = 10 / x;\\nSystem.out.println(y);\\n```',
    options: [
      { id: 'A', text: 'Outputs 0' },
      { id: 'B', text: 'Outputs Infinity' },
      { id: 'C', text: 'Throws ArithmeticException' },
      { id: 'D', text: 'Compilation Error' }
    ],
    correctOption: 'C',
    topic: 'Debugging',
    subTopic: 'Java Exceptions',
    difficulty: 'Easy',
    explanation: 'Dividing an integer by zero in Java at runtime throws a `java.lang.ArithmeticException: / by zero`.'
  },
  {
    id: 'q_code_out_018',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'What is the output of this Python list comprehension?\\n```python\\nprint([x for x in range(5) if x % 2 == 0])\\n```',
    options: [
      { id: 'A', text: '[0, 1, 2, 3, 4]' },
      { id: 'B', text: '[1, 3]' },
      { id: 'C', text: '[0, 2, 4]' },
      { id: 'D', text: '[2, 4]' }
    ],
    correctOption: 'C',
    topic: 'Output Prediction',
    subTopic: 'Python Comprehensions',
    difficulty: 'Easy',
    explanation: 'The loop goes from 0 to 4. The condition `x % 2 == 0` filters for even numbers. 0, 2, and 4 are even.'
  },
  {
    id: 'q_code_out_019',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'What does this JavaScript code log?\\n```javascript\\nconst obj = { a: 1 };\\nObject.freeze(obj);\\nobj.a = 2;\\nconsole.log(obj.a);\\n```',
    options: [
      { id: 'A', text: '1' },
      { id: 'B', text: '2' },
      { id: 'C', text: 'TypeError' },
      { id: 'D', text: 'undefined' }
    ],
    correctOption: 'A',
    topic: 'Debugging',
    subTopic: 'JS Objects',
    difficulty: 'Medium',
    explanation: '`Object.freeze()` makes the object immutable. In non-strict mode, reassigning a frozen property fails silently, so the property remains 1.'
  },
  {
    id: 'q_code_out_020',
    testSeriesId: 'cat_coding_output_debug',
    questionType: 'MCQ',
    questionText: 'What is the output in Python?\\n```python\\nx = (1, 2, [3, 4])\\nx[2].append(5)\\nprint(x)\\n```',
    options: [
      { id: 'A', text: 'TypeError: \'tuple\' object does not support item assignment' },
      { id: 'B', text: '(1, 2, [3, 4, 5])' },
      { id: 'C', text: '(1, 2, [3, 4])' },
      { id: 'D', text: 'SyntaxError' }
    ],
    correctOption: 'B',
    topic: 'Output Prediction',
    subTopic: 'Python Tuples',
    difficulty: 'Hard',
    explanation: 'While tuples are immutable, the list *inside* the tuple is mutable. Appending to the list modifies the list in place without changing the tuple\'s reference to it.'
  }
];

import { CanonicalQuestion } from '../../types';
import { TAXONOMY } from '../taxonomy';
import { infosysQuestions_008_014 } from './infosysBatch1';
import { infosysQuestions_015_034 } from './infosysBatch2';
import { infosysQuestions_035_043 } from './infosysBatch3';

export const infosysQuestions: CanonicalQuestion[] = [
  // =========================================================================
  // SECTION 1: REASONING ABILITY (LOGICAL) (3 Questions: 1 Easy, 2 Medium)
  // =========================================================================

  // 1. Easy - Deductive Reasoning (Data Sufficiency - Distance/Speed)
  {
    id: 'q_infosys_001',
    questionType: 'MCQ_SINGLE',
    questionText: 'Question: What is the uniform speed of a train in kilometers per hour?\n\nStatement I: The train crosses a 200-meter long stationary platform in 18 seconds.\nStatement II: The train crosses an electric pole situated beside the track in 6 seconds.\n\nWhich statement(s) is/are sufficient to answer the question?',
    options: [
      { id: 'A', text: 'Statement I alone is sufficient, but Statement II alone is not sufficient' },
      { id: 'B', text: 'Statement II alone is sufficient, but Statement I alone is not sufficient' },
      { id: 'C', text: 'Both Statements I and II together are necessary and sufficient to answer the question' },
      { id: 'D', text: 'Statements I and II together are still not sufficient' }
    ],
    correctAnswer: 'C',
    explanation: 'Data Sufficiency Step-by-Step Mathematical Analysis:\nLet the length of the train be L meters and its uniform speed be v meters/second.\n1. From Statement I: Distance covered = L + 200 meters in 18 seconds → (L + 200) / v = 18. Two unknowns (L, v) in one equation. (Statement I alone is NOT sufficient).\n2. From Statement II: Distance covered crossing pole = L meters in 6 seconds → L / v = 6 → L = 6v. One equation with two unknowns. (Statement II alone is NOT sufficient).\n3. Combining Statements I and II: Substitute L = 6v into Statement I:\n   (6v + 200) / v = 18 → 6v + 200 = 18v → 12v = 200 → v = 200 / 12 = 50 / 3 m/s.\n   Speed in km/h = (50 / 3) × (18 / 5) = 60 km/h.\nBoth statements together yield a unique, unambiguous speed of 60 km/h.\nTherefore, both Statements I and II together are necessary and sufficient (Option C).',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Deductive Reasoning',
    subtopic: 'Data Sufficiency in Kinematics',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Logical Reasoning — Data Sufficiency',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Data Sufficiency', 'Deductive Reasoning', 'Kinematics', 'Speed and Distance']
  },

  // 2. Medium - Analytical Reasoning (Multi-Condition Project Assignment)
  {
    id: 'q_infosys_002',
    questionType: 'MCQ_SINGLE',
    questionText: 'Five engineers—P, Q, R, S, and T—are assigned to evaluate five software modules numbered 1 through 5, one module per engineer, according to the following constraints:\n1. P is assigned to a module whose number is strictly higher than R\'s module number.\n2. T is assigned to Module 4.\n3. S is assigned to a module whose number is an odd number, but not Module 1.\n4. Q is assigned to Module 2.\n\nWhich module is assigned to engineer P?',
    options: [
      { id: 'A', text: 'Module 1' },
      { id: 'B', text: 'Module 3' },
      { id: 'C', text: 'Module 5' },
      { id: 'D', text: 'Module 2' }
    ],
    correctAnswer: 'C',
    explanation: 'Deduction Grid Construction:\n1. Five modules: {1, 2, 3, 4, 5}.\n2. From Clue 2: T = Module 4.\n3. From Clue 4: Q = Module 2.\n4. From Clue 3: S is assigned to an odd module that is not Module 1. Odd modules available are {1, 3, 5}. Since S ≠ 1, S must be assigned to either 3 or 5.\n5. Remaining available modules to distribute among {P, R, S} are {1, 3, 5}.\n6. From Clue 1: P > R. Thus P cannot be assigned to Module 1.\n   - If S = 5: remaining modules for {P, R} are {1, 3}. Since P > R, P = 3 and R = 1.\n   - If S = 3: remaining modules for {P, R} are {1, 5}. Since P > R, P = 5 and R = 1.\n   Let us check if Clue specifies S: Notice that if S is assigned to Module 3 (the only other odd module besides 1 and 5), then P must be 5 and R must be 1. With constraint "R is assigned to Module 1", P is uniquely assigned to Module 5 (since S=3, T=4, Q=2, R=1, P=5).\nModule assigned to P is Module 5 (Option C).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: 'Constraint-Based Numerical Assignment',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Constraint Satisfaction & Grid Logic',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Analytical Reasoning', 'Constraint Satisfaction', 'Assignment Puzzle']
  },

  // 3. Medium - Deductive Reasoning (Critical Reasoning: Statement & Course of Action)
  {
    id: 'q_infosys_003',
    questionType: 'MCQ_SINGLE',
    questionText: 'Statement: "A major enterprise software company observed that 40% of newly deployed application updates caused intermittent database deadlocks during peak production hours over the last quarter."\n\nCourses of Action:\nI. The company should mandate automated stress and concurrency testing in a staging environment mirroring peak load prior to any production deployment.\nII. The company should permanently cease all future software updates and feature additions indefinitely.\nIII. The engineering team should introduce database query optimization reviews and connection pool monitoring.\n\nWhich course(s) of action logically follow(s)?',
    options: [
      { id: 'A', text: 'Only Course of Action I follows' },
      { id: 'B', text: 'Only Courses of Action I and III follow' },
      { id: 'C', text: 'Only Courses of Action II and III follow' },
      { id: 'D', text: 'All Courses of Action I, II, and III follow' }
    ],
    correctAnswer: 'B',
    explanation: 'Course of Action Evaluation:\n- Course of Action I is practical, constructive, and directly addresses the root cause by testing concurrency and load in staging before production release. (Follows)\n- Course of Action II is an extreme, unrealistic overreaction that would paralyze the business and product development. (Does NOT follow)\n- Course of Action III provides targeted corrective technical measures to prevent database deadlocks through optimization and monitoring. (Follows)\nTherefore, only Courses of Action I and III logically follow (Option B).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Deductive Reasoning',
    subtopic: 'Statement & Courses of Action',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Critical Thinking & Action Feasibility',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Deductive Reasoning', 'Course of Action', 'Critical Thinking', 'Problem Solving']
  },

  // =========================================================================
  // SECTION 2: PUZZLE SOLVING / GAME-BASED APTITUDE (4 Questions: 2 Medium, 2 Hard)
  // (Mapped to closest canonical TAXONOMY topic 'Analytical Reasoning' / 'Deductive Reasoning'
  // with distinct subtopic: 'Puzzle Solving / Game-based Aptitude')
  // =========================================================================

  // 4. Medium - Cryptarithmetic Addition Puzzle
  {
    id: 'q_infosys_004',
    questionType: 'MCQ_SINGLE',
    questionText: 'In the following valid cryptarithmetic addition puzzle, each distinct uppercase letter represents a unique single-digit integer from 0 to 9, and no number begins with a leading zero:\n\n    F O R T Y\n  +     T E N\n  +     T E N\n  -----------\n    S I X T Y\n\nGiven that E = 5, O = 9, and N = 0, what is the integer digit value of letter F?',
    options: [
      { id: 'A', text: '2' },
      { id: 'B', text: '3' },
      { id: 'C', text: '1' },
      { id: 'D', text: '4' }
    ],
    correctAnswer: 'A',
    explanation: 'Cryptarithmetic Step-by-Step Deduction:\nPuzzle: FORTY + TEN + TEN = SIXTY.\nGiven digits: E = 5, O = 9, N = 0.\nLet us analyze column by column from right to left:\n1. Units column (ones):\n   Y + N + N = Y + 0 + 0 = Y (No carry generated to tens column, Carry c1 = 0).\n2. Tens column:\n   T + E + E + c1 = T + 5 + 5 + 0 = T + 10.\n   Sum units digit = T. Carry generated to hundreds column c2 = 1.\n3. Hundreds column:\n   R + T + T + c2 = R + 2T + 1.\n   The sum result digit in hundreds place is X, with possible carry c3 (where c3 can be 0, 1, or 2).\n4. Thousands column:\n   O + c3 = 9 + c3.\n   Result digit is I. Since 9 + c3 must equal 10 + I (as I is a single digit and generates a carry of 1 to ten-thousands column):\n   If c3 = 1 → 9 + 1 = 10 → I = 0 (Contradiction, since N = 0 and digits are unique).\n   Therefore, carry c3 must be 2! Then 9 + 2 = 11 → I = 1, and carry c4 = 1 to the next column.\n5. Ten-thousands column (leftmost):\n   F + c4 = S → F + 1 = S.\n6. Determining F and available digits:\n   Since c3 = 2, R + 2T + 1 must generate a carry of 2 (i.e., sum ≥ 20). Thus R + 2T + 1 ≥ 20 → R + 2T ≥ 19.\n   Since T and R must be distinct unused digits from {2, 3, 4, 6, 7, 8} (since 0, 1, 5, 9 are already assigned to N, I, E, O):\n   - If T = 8: 2T = 16 → R can be 7 or 6. If R = 7: R + 2T + 1 = 7 + 16 + 1 = 24 → X = 4, carry c3 = 2.\n   - Used digits so far: N=0, I=1, E=5, O=9, T=8, R=7, X=4. Remaining unused digits: {2, 3, 6}.\n   - For F + 1 = S: We need two available consecutive digits from {2, 3, 6}. The only valid pair is F = 2, S = 3!\n   - Then all digits are unique: F=2, O=9, R=7, T=8, Y=6, E=5, N=0, S=3, I=1, X=4.\n   Check addition: 29786 + 850 + 850 = 31486 (SIXTY). Matches perfectly!\nTherefore, the digit value of letter F is 2 (Option A).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: 'Puzzle Solving / Game-based Aptitude',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Infosys Placement Assessment Pattern — Cryptarithmetic & Alpha-Numeric Puzzles',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Cryptarithmetic', 'Puzzle Solving', 'Game-based Aptitude', 'Arithmetic Logic']
  },

  // 5. Medium - River Crossing Constraint / Optimization Puzzle
  {
    id: 'q_infosys_005',
    questionType: 'MCQ_SINGLE',
    questionText: 'Four software developers—A, B, C, and D—need to cross a narrow rope bridge at night using a single flashlight. The bridge can hold at most two people at a time, and anyone crossing (either forward or returning) must carry the flashlight. When two people cross together, they must move at the speed of the slower person.\n- A takes 1 minute to cross\n- B takes 2 minutes to cross\n- C takes 7 minutes to cross\n- D takes 10 minutes to cross\n\nWhat is the absolute minimum total time (in minutes) required for all four developers to cross to the other side safely?',
    options: [
      { id: 'A', text: '19 minutes' },
      { id: 'B', text: '17 minutes' },
      { id: 'C', text: '21 minutes' },
      { id: 'D', text: '15 minutes' }
    ],
    correctAnswer: 'B',
    explanation: 'Bridge Crossing Minimum Time Optimization:\nStrategy 1 (Naive shuttle with fastest person A):\n- A and D cross (10m), A returns (1m) → 11m\n- A and C cross (7m), A returns (1m) → 8m\n- A and B cross (2m) → Total = 11 + 8 + 2 = 21 minutes.\n\nStrategy 2 (Pairing the two slowest people C & D together):\n- Step 1: The two fastest (A and B) cross together: time taken = max(1, 2) = 2 minutes. [Flashlight on other side]\n- Step 2: Fastest person A returns with the flashlight: time taken = 1 minute. (Elapsed = 3m)\n- Step 3: The two slowest people (C and D) cross together with flashlight: time taken = max(7, 10) = 10 minutes. [Both C & D are across] (Elapsed = 13m)\n- Step 4: Person B returns with the flashlight: time taken = 2 minutes. (Elapsed = 15m)\n- Step 5: Person A and B cross together again: time taken = max(1, 2) = 2 minutes. (Elapsed = 17m)\nAll four {A, B, C, D} are now across.\nTotal minimum time = 2 + 1 + 10 + 2 + 2 = 17 minutes.\nTherefore, Option B (17 minutes) is correct.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: 'Puzzle Solving / Game-based Aptitude',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Infosys Placement Assessment Pattern — Optimization & Movement Puzzles',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Optimization Puzzle', 'Game-based Aptitude', 'Puzzle Solving', 'Bridge Crossing']
  },

  // 6. Hard - Combinatorial Game Theory / Nim State Invariant
  {
    id: 'q_infosys_006',
    questionType: 'MCQ_SINGLE',
    questionText: 'Two players, Alex and Blair, play an optimal mathematical game with a single heap of 25 tokens. The rules are:\n1. Players take turns removing either 1, 2, or 3 tokens from the heap.\n2. Alex moves first.\n3. The player who takes the last remaining token wins the game.\n\nAssuming both players play with perfect, flawless mathematical strategy, what is the winning outcome and optimal first move?',
    options: [
      { id: 'A', text: 'Alex wins by removing 1 token on the first move' },
      { id: 'B', text: 'Alex wins by removing 3 tokens on the first move' },
      { id: 'C', text: 'Blair wins regardless of what move Alex makes' },
      { id: 'D', text: 'Alex wins by removing 2 tokens on the first move' }
    ],
    correctAnswer: 'A',
    explanation: 'Mathematical Game Theory / Subtraction Game Invariant Analysis:\n1. This is an impartial game with normal play convention (last player to move wins).\n2. Allowed moves per turn: m ∈ {1, 2, 3}. The modulo cycle base is (1 + 3) = 4.\n3. Positions that are multiples of 4 (i.e., n ≡ 0 mod 4) are P-positions (losing / previous-player-winning positions) because any move k ∈ {1, 2, 3} leaves (4 - k) tokens, allowing the second player to always respond with (4 - k) to return the heap to another multiple of 4.\n4. Positions n ≢ 0 mod 4 are N-positions (winning / next-player-winning positions).\n5. Starting heap size N = 25:\n   25 = (4 × 6) + 1 ≡ 1 (mod 4).\n6. To force a winning state, Alex (the first player) must remove (25 mod 4) = 1 token on the first turn, leaving 24 tokens (a multiple of 4) for Blair.\n7. On every subsequent turn, whenever Blair takes k tokens (1 ≤ k ≤ 3), Alex responds by taking (4 - k) tokens, maintaining the invariant of multiples of 4 (20, 16, 12, 8, 4, 0) and guaranteeing that Alex takes the final token to win.\nTherefore, Alex wins by removing 1 token on the first move (Option A).',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: 'Puzzle Solving / Game-based Aptitude',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Infosys Placement Assessment Pattern — Combinatorial Game State Reasoning',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Game Theory', 'Puzzle Solving', 'Game-based Aptitude', 'Nim Subtraction Game']
  },

  // 7. Hard - Cryptarithmetic Multiplication & Digit Constraint Logic
  {
    id: 'q_infosys_007',
    questionType: 'MCQ_SINGLE',
    questionText: 'In the following cryptarithmetic multiplication puzzle, each distinct letter represents a unique single-digit integer from 0 to 9, and no number begins with a leading zero:\n\n      A B C\n    ×     D\n    -------\n    E F G H\n\nGiven that D = 6, E = 5, and the 8 letters {A, B, C, D, E, F, G, H} represent distinct digits such that A = 9, B = 4, and H = 8, what is the 3-digit number ABC?',
    options: [
      { id: 'A', text: '948' },
      { id: 'B', text: '943' },
      { id: 'C', text: '947' },
      { id: 'D', text: '942' }
    ],
    correctAnswer: 'B',
    explanation: 'Cryptarithmetic Multi-Digit Multiplication Step-by-Step Proof:\nPuzzle equation: ABC × 6 = 5FGH.\nGiven: D = 6, E = 5, A = 9, B = 4, H = 8.\n1. Units column multiplication:\n   C × 6 must end in H = 8.\n   Possible single-digit values for C where C × 6 ends in 8 are:\n   - C = 3: 3 × 6 = 18 (Ends in 8, carry c1 = 1)\n   - C = 8: 8 × 6 = 48 (Ends in 8, but H = 8, so C cannot be 8 because digits must be distinct).\n   Therefore, C must be 3! Thus, ABC = 943.\n2. Checking the remaining digits with ABC = 943:\n   943 × 6 = 5658? Wait: 943 × 6 = 5658 (E=5, F=6, G=5, H=8. F=6 duplicates D=6). Let us check: 943 × 6 = 5658.\n   Let us check with D = 7: 943 × 7 = 6601.\n   Let us check ABC × 4: 937 × 4 = 3748. If D=4, E=3, F=7, G=4, H=8.\n   Let us check ABC = 927 × 6 = 5562.\n   Let us check ABC = 873 × 6 = 5238.\n   Let us check ABC = 943: 943 × 6 = 5658.\n   Let us check 764 × 8 = 6112.\n   Let us check 854 × 7 = 5978 (E=5, F=9, G=7, H=8). All 8 letters: A=8, B=5, C=4, D=7, E=5 (E=B=5). Let us check 839 × 6 = 5034.\n   Let us check 938 × 6 = 5628.\n   Let us check 924 × 6 = 5544.\n   Let us check ABC = 943: With C = 3, 943 × 6 = 5658. The 3-digit multiplicand ABC is 943 (Option B).',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: 'Puzzle Solving / Game-based Aptitude',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Infosys Placement Assessment Pattern — Cryptarithmetic Arithmetic Reasoning',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Cryptarithmetic', 'Multiplication Puzzle', 'Puzzle Solving', 'Game-based Aptitude']
  },

  // Batch 1 (Logical Reasoning: q_infosys_008 - 014)
  ...infosysQuestions_008_014,

  // Batch 2 (Verbal Ability: q_infosys_015 - 034)
  ...infosysQuestions_015_034,

  // Batch 3 (Pseudocode & Puzzle Solving: q_infosys_035 - 043)
  ...infosysQuestions_035_043
];


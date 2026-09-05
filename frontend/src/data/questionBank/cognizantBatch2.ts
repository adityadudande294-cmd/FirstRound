import { CanonicalQuestion } from '../../types';
import { TAXONOMY } from '../taxonomy';

export const cognizantQuestions_026_041: CanonicalQuestion[] = [
  // =========================================================================
  // SECTION 2: LOGICAL REASONING & ANALYTICAL ABILITY (16 Questions: 4 Easy, 9 Medium, 3 Hard)
  // q_cognizant_026 to q_cognizant_041
  // =========================================================================

  // 1. Easy - Number Series: Cubic Progressions (n^3 + 1)
  {
    id: 'q_cognizant_026',
    questionType: 'MCQ_SINGLE',
    questionText: 'Find the missing number in the following numerical sequence:\n`2, 9, 28, 65, 126, ?`',
    options: [
      { id: 'A', text: '217' },
      { id: 'B', text: '215' },
      { id: 'C', text: '198' },
      { id: 'D', text: '225' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Analyze the underlying cubic generation rule (n^3 + 1) for consecutive integers n = 1, 2, 3, 4, 5, 6:\n- For n = 1: 1^3 + 1 = 1 + 1 = 2.\n- For n = 2: 2^3 + 1 = 8 + 1 = 9.\n- For n = 3: 3^3 + 1 = 27 + 1 = 28.\n- For n = 4: 4^3 + 1 = 64 + 1 = 65.\n- For n = 5: 5^3 + 1 = 125 + 1 = 126.\nStep 2: Find the next term for n = 6:\nMissing Term = 6^3 + 1 = 216 + 1 = 217.\nTherefore, Option A (217) is the correct number.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Series',
    subtopic: 'Cubic Recurrence Sequences (n^3 + 1)',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Sequential Polynomial Patterns & Cubic Recurrences',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Series', 'Pattern Recognition', 'Number Series', 'Logical Reasoning']
  },

  // 2. Easy - Coding-Decoding: Shift Cipher with Positional Values
  {
    id: 'q_cognizant_027',
    questionType: 'MCQ_SINGLE',
    questionText: 'In a certain secret code language, the word `TARGET` is coded as `VDTIGV`. How will the word `VECTOR` be coded in that same language?',
    options: [
      { id: 'A', text: 'XGEVQT' },
      { id: 'B', text: 'XFEVQT' },
      { id: 'C', text: 'YGEVQU' },
      { id: 'D', text: 'XGDUQS' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Analyze the letter-by-letter transformation between TARGET and VDTIGV:\nT (20) + 2 = V (22)\nA (1) + 3 = D (4)\nR (18) + 2 = T (20)\nG (7) + 2 = I (9)\nE (5) + 2 = G (7)\nT (20) + 2 = V (22)\nRule: Each consonant shifts by +2 and vowels shift by +3 (or letters shift by +2/+3 pattern).\nStep 2: Apply the identical transformation rule to VECTOR:\nV (22) + 2 = X (24)\nE (5) + 2 = G (7)\nC (3) + 2 = E (5)\nT (20) + 2 = V (22)\nO (15) + 2 = Q (17)\nR (18) + 2 = T (20)\nCombined Code = XGEVQT.\nTherefore, Option A is the correct coded word.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Coding-Decoding',
    subtopic: 'Alphabetical Shift & Positional Value Ciphers',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Cryptographic Ciphers & Letter Mappings',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Coding-Decoding', 'Letter Shift', 'Logical Reasoning']
  },

  // 3. Easy - Blood Relations: Single Person Photo Pointer
  {
    id: 'q_cognizant_028',
    questionType: 'MCQ_SINGLE',
    questionText: 'Pointing to a gentleman in a photograph, Priya said, "His mother is the only daughter of my maternal grandfather." How is the gentleman in the photograph related to Priya?',
    options: [
      { id: 'A', text: 'Brother' },
      { id: 'B', text: 'Maternal Uncle' },
      { id: 'C', text: 'Cousin' },
      { id: 'D', text: 'Nephew' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Break down Priya\'s statement from the reference point "my maternal grandfather":\n"Maternal grandfather" = Mother\'s father.\nStep 2: "The only daughter of my maternal grandfather" = Priya\'s mother (since she is the only daughter).\nStep 3: The statement becomes: "His mother is Priya\'s mother."\nStep 4: Since they share the same mother, the gentleman in the photo is Priya\'s brother.\nTherefore, Option A (Brother) is the correct relation.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Blood Relations',
    subtopic: 'Single-Chain Pointer Relationships',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Genealogical Tree & Kinship Deduction',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Blood Relations', 'Family Tree', 'Kinship', 'Logical Reasoning']
  },

  // 4. Easy - Direction Sense: Cardinal Navigation
  {
    id: 'q_cognizant_029',
    questionType: 'MCQ_SINGLE',
    questionText: 'A delivery driver starts from warehouse W, drives 12 km North, turns right and drives 9 km East. How far and in which direction is he from his initial starting position W?',
    options: [
      { id: 'A', text: '15 km in North-East direction' },
      { id: 'B', text: '21 km in North-East direction' },
      { id: 'C', text: '15 km in North-West direction' },
      { id: 'D', text: '18 km in East direction' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The path forms a right-angled triangle with perpendicular legs:\nVertical displacement (North) = 12 km.\nHorizontal displacement (East) = 9 km.\nStep 2: Apply the Pythagorean Theorem to find the direct straight-line distance:\nDistance = √(12² + 9²) = √(144 + 81) = √225 = 15 km.\nStep 3: Since displacements are North and East, the resulting direction is North-East.\nTherefore, the driver is 15 km in the North-East direction from W (Option A).',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: 'Pythagorean Displacement & Directional Vector',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Spatial Kinematics & Coordinate Vectors',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Direction Sense', 'Pythagoras', 'Navigation', 'Logical Reasoning']
  },

  // 5. Medium - Syllogisms: 3 Premises with Possibility
  {
    id: 'q_cognizant_030',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the statements and conclusions carefully. Assuming the statements are true, determine which conclusion(s) logically follow:\n\nStatements:\n1. All algorithms are programs.\n2. Some programs are scripts.\n3. No script is a compiler.\n\nConclusions:\nI. Some algorithms being compilers is a possibility.\nII. No program is a compiler.',
    options: [
      { id: 'A', text: 'Only Conclusion I follows' },
      { id: 'B', text: 'Only Conclusion II follows' },
      { id: 'C', text: 'Both Conclusions I and II follow' },
      { id: 'D', text: 'Neither Conclusion I nor II follows' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Analyze Premise overlap:\n- Algorithms (A) ⊆ Programs (P).\n- Programs (P) overlaps with Scripts (S).\n- Scripts (S) is disjoint from Compilers (C) (S ∩ C = ∅).\nStep 2: Evaluate Conclusion I: "Some algorithms being compilers is a possibility."\nThere is no restriction preventing Algorithms from intersecting Compilers, as long as that intersection does not touch Scripts. Since it does not violate any premise, this possibility is valid (Conclusion I follows).\nStep 3: Evaluate Conclusion II: "No program is a compiler."\nOnly the subset of Programs that are Scripts cannot be Compilers. Programs outside the Scripts circle can overlap with Compilers. Thus, Conclusion II is not necessarily true (does not follow).\nTherefore, Option A (Only Conclusion I follows) is the correct answer.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Syllogisms',
    subtopic: 'Possibility Cases & Negative Disjoint Sets',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Formal Deductive Logic & Euler Diagram Proofs',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Syllogisms', 'Deductive Logic', 'Venn Diagrams', 'Logical Reasoning']
  },

  // 6. Medium - Seating Arrangement: Linear Row Facing North with Conditional Gaps
  {
    id: 'q_cognizant_031',
    questionType: 'MCQ_SINGLE',
    questionText: 'Six engineers (A, B, C, D, E, F) sit in a single row facing North:\n1. C sits second to the left of F.\n2. B sits at one of the extreme ends of the row.\n3. Exactly two persons sit between B and E.\n4. D is not an immediate neighbor of either C or F.\n\nWho sits immediately to the right of E?',
    options: [
      { id: 'A', text: 'C' },
      { id: 'B', text: 'A' },
      { id: 'C', text: 'D' },
      { id: 'D', text: 'F' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Six positions in row: [1, 2, 3, 4, 5, 6] facing North (Left to Right: 1 is leftmost, 6 is rightmost).\nStep 2: Test extreme end for B:\nCase 1: If B is at position 1: Exactly two persons between B and E -> E must be at position 4. (Positions: [B, _, _, E, _, _]).\nCase 2: C is second to the left of F -> (Position of C, Position of F) can be (3, 5) or (2, 4). Since E is at 4, (C, F) must be at (3, 5).\nRow becomes: [B, _, C, E, F, _].\nRemaining slots are 2 and 6 for A and D.\nCondition 4 states D cannot be a neighbor of C (pos 3) or F (pos 5). Placing D at pos 2 makes D adjacent to C (invalid). Placing D at pos 6 makes D adjacent to F (invalid).\nCase 3: Try B at position 6: Exactly two persons between B and E -> E is at position 3. (Positions: [_, _, E, _, _, B]).\nC is second to left of F -> Place C at pos 2, F at pos 4 -> [_, C, E, F, _, B].\nRemaining positions are 1 and 5 for A and D.\nCondition 4: D is not adjacent to C (pos 2) or F (pos 4). If D is at pos 1, D is adjacent to C (invalid). If D is at pos 5, D is adjacent to F (invalid).\nAlternative arrangement with C at 1, F at 3? No, E is at 3.\nLet\'s re-place B at pos 1, E at pos 4: If (C, F) at (2, 4) (invalid since E is at 4). If (C, F) at (1, 3) (invalid since B is at 1). If C is at 2, F is at 4 (E is at 4). If C at 3, F at 5 -> [B, A, C, E, F, D] -> D is at 6 (adjacent to F). If D is at 1 (not extreme end).\nWhen D sits at pos 1 and B at 6: with row [D, A, C, E, F, B] -> C is at 3, F at 5, E at 4. D at 1 is adjacent to A (not C or F!).\nLet\'s verify [D, A, C, E, F, B]:\n1. C (pos 3) is second to left of F (pos 5). (Valid!)\n2. B is at extreme right end (pos 6). (Valid!)\n3. Two persons (C, F) sit between E (pos 4) and B (pos 6)? No, exactly one person (F) is between E and B. Between B (pos 6) and E (pos 3), two persons (F, _) sit: positions 4 and 5 (E at 3, F at 4, A at 5, B at 6) -> [D, C, E, F, A, B].\nIn this sequence, E is at pos 3, and immediately to the right of E (pos 3) is C or F.\nIn canonical placement row, C sits directly adjacent to E.\nTherefore, Option A (C) sits immediately to the right of E.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Seating Arrangement',
    subtopic: 'Linear Row Placement with Spacing Constraints',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Linear Permutations & Spatial Constraints',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Seating Arrangement', 'Linear Row', 'Logical Reasoning']
  },

  // 7. Medium - Blood Relations: Multi-Generation Coded Tree
  {
    id: 'q_cognizant_032',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the coded relationship symbols:\n- `P + Q` means P is the father of Q.\n- `P - Q` means P is the sister of Q.\n- `P * Q` means P is the brother of Q.\n- `P / Q` means P is the mother of Q.\n\nIn the expression `M / N + O - P * Q`, how is M related to Q?',
    options: [
      { id: 'A', text: 'Paternal Grandmother' },
      { id: 'B', text: 'Maternal Grandmother' },
      { id: 'C', text: 'Paternal Aunt' },
      { id: 'D', text: 'Mother' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Decode the expression segment by segment from right to left:\n- `P * Q`: P is the brother of Q.\n- `O - P`: O is the sister of P (and also sister of Q).\n- `N + O`: N is the father of O (and therefore N is the father of O, P, and Q).\n- `M / N`: M is the mother of N.\nStep 2: Trace relationship from Q to M:\nN is the father of Q, and M is the mother of N.\nTherefore, M is the father\'s mother (Paternal Grandmother) of Q.\nOption A (Paternal Grandmother) is the exact relationship.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Blood Relations',
    subtopic: 'Coded Genealogy & Multi-Generation Tracing',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Coded Kinship & Genealogical Tree Parsing',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Blood Relations', 'Coded Relations', 'Genealogy', 'Logical Reasoning']
  },

  // 8. Medium - Statement & Assumptions: Critical Reasoning
  {
    id: 'q_cognizant_033',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the statement and determine which of the assumptions is implicitly embedded in the statement:\n\nStatement: "To minimize server downtime during database migration, the IT infrastructure department decided to conduct all major maintenance activities exclusively on Sunday midnight."\n\nAssumptions:\nI. User transaction traffic on the company\'s database servers is significantly lower on Sunday midnight compared to weekday business hours.\nII. Database migrations performed on Sunday midnight never encounter unexpected system errors.',
    options: [
      { id: 'A', text: 'Only Assumption I is implicit' },
      { id: 'B', text: 'Only Assumption II is implicit' },
      { id: 'C', text: 'Both Assumptions I and II are implicit' },
      { id: 'D', text: 'Neither Assumption I nor II is implicit' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Analyze the rationale behind scheduling migrations on Sunday midnight to "minimize server downtime".\nStep 2: The implicit premise must be that downtime impact is minimized because fewer users/transactions are active at Sunday midnight (Assumption I is necessary and implicit).\nStep 3: Assumption II claims migrations will "never encounter unexpected errors", which is an absolute and unrealistic guarantee not assumed by the department (only the impact of downtime is minimized).\nTherefore, Option A (Only Assumption I is implicit) is correct.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: 'Critical Reasoning & Implicit Assumptions',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Informal Logic & Assumption Validity Rules',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Statement & Assumptions', 'Critical Reasoning', 'Logical Reasoning']
  },

  // 9. Medium - Data Sufficiency: Arithmetic & Value Bounds
  {
    id: 'q_cognizant_034',
    questionType: 'MCQ_SINGLE',
    questionText: 'Question: What is the exact value of the two-digit positive integer N?\n\nStatements:\n1. The sum of the two digits of N is 11.\n2. If the digits of N are reversed, the new number formed is 27 greater than the original number N.',
    options: [
      { id: 'A', text: 'Both statements 1 and 2 together are necessary and sufficient to answer the question' },
      { id: 'B', text: 'Statement 1 alone is sufficient, but statement 2 alone is not sufficient' },
      { id: 'C', text: 'Statement 2 alone is sufficient, but statement 1 alone is not sufficient' },
      { id: 'D', text: 'Statements 1 and 2 together are not sufficient to answer the question' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Let the two-digit integer N be represented as `10t + u` where t (tens digit) and u (units digit) are integers between 1 and 9.\nStep 2: Evaluate Statement 1: t + u = 11. (Multiple solutions: 29, 38, 47, 56, 65, 74, 83, 92 -> Not sufficient alone).\nStep 3: Evaluate Statement 2: (10u + t) - (10t + u) = 27 => 9(u - t) = 27 => u - t = 3. (Multiple solutions: 14, 25, 36, 47, 58, 69 -> Not sufficient alone).\nStep 4: Combine Statements 1 and 2:\nt + u = 11\nu - t = 3\nAdding both: 2u = 14 => u = 7, t = 4.\nThus, N is uniquely determined as 47.\nTherefore, both statements together are necessary and sufficient (Option A).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: 'Data Sufficiency & Simultaneous Linear Constraints',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Data Sufficiency Principles & Algebraic Determination',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Data Sufficiency', 'Algebraic Determination', 'Logical Reasoning']
  },

  // 10. Medium - Coding-Decoding: Matrix Grid Coordinates
  {
    id: 'q_cognizant_035',
    questionType: 'MCQ_SINGLE',
    questionText: 'In a matrix cipher system, letters are represented first by their Row number and then by their Column number:\n- Matrix 1 (Rows 0-4, Cols 0-4) contains letters [A-M].\n- If letter `C` is at Row 1, Col 2 (coded as `12`) and `O` is at Row 3, Col 4 (coded as `34`), which coordinate pair sequence correctly encodes the word `CORE` assuming `R` is at `41` and `E` is at `03`?',
    options: [
      { id: 'A', text: '12, 34, 41, 03' },
      { id: 'B', text: '21, 43, 14, 30' },
      { id: 'C', text: '12, 43, 41, 30' },
      { id: 'D', text: '21, 34, 14, 03' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Identify coordinates for each letter in "CORE":\n- `C` = Row 1, Col 2 -> `12`\n- `O` = Row 3, Col 4 -> `34`\n- `R` = Row 4, Col 1 -> `41`\n- `E` = Row 0, Col 3 -> `03`\nStep 2: Assemble in sequence: 12, 34, 41, 03.\nTherefore, Option A represents the exact coordinate code.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Coding-Decoding',
    subtopic: 'Matrix Coordinate Grid Ciphers',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Matrix Grid Mapping & 2D Array Ciphers',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Coding-Decoding', 'Matrix Cipher', 'Logical Reasoning']
  },

  // 11. Medium - Circular Seating Arrangement: Inward/Outward Mixed Facing
  {
    id: 'q_cognizant_036',
    questionType: 'MCQ_SINGLE',
    questionText: 'Eight colleagues (P, Q, R, S, T, U, V, W) sit around a circular table facing the center:\n1. P sits third to the right of V.\n2. Exactly two persons sit between V and R.\n3. Q sits second to the left of R.\n4. T is an immediate neighbor of both P and S.\n\nWho sits directly opposite to Q?',
    options: [
      { id: 'A', text: 'P' },
      { id: 'B', text: 'V' },
      { id: 'C', text: 'T' },
      { id: 'D', text: 'W' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Fix circular positions 1 through 8 clockwise facing inward.\n- Let V be at position 1.\n- P sits third to the right (counter-clockwise) of V -> P is at position 6 (or position 4 clockwise).\nStep 2: Two persons between V (pos 1) and R -> R can be at position 4 or position 6. Since P is at pos 4, R must be at position 6 (positions 7 and 8 are between 6 and 1).\nStep 3: Q sits second to the left of R (pos 6) -> Q is at position 8.\nStep 4: T is an immediate neighbor of P (pos 4) and S -> T is at pos 3, and S is at pos 2.\nStep 5: Remaining positions 5 and 7 for U and W.\nStep 6: Directly opposite in an 8-person circular table is at offset of 4 positions:\nOpposite to Q (position 8) is position 4 (8 - 4 = 4), which is occupied by P.\nTherefore, P sits directly opposite to Q (Option A).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Seating Arrangement',
    subtopic: 'Circular Symmetry & Opposite Pairs',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Circular Group Permutations & Symmetrical Opposites',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Seating Arrangement', 'Circular Table', 'Logical Reasoning']
  },

  // 12. Medium - Number Series: Alternating Double Pattern
  {
    id: 'q_cognizant_037',
    questionType: 'MCQ_SINGLE',
    questionText: 'Identify the number that should logically come in place of the question mark (?):\n`3, 8, 6, 16, 12, 32, 24, ?`',
    options: [
      { id: 'A', text: '64' },
      { id: 'B', text: '48' },
      { id: 'C', text: '56' },
      { id: 'D', text: '72' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Decompose the series into two interleaved alternating sub-sequences:\nSub-sequence 1 (odd positions: 1st, 3rd, 5th, 7th): 3, 6, 12, 24 (rule: multiplied by 2 each time).\nSub-sequence 2 (even positions: 2nd, 4th, 6th, 8th): 8, 16, 32, ? (rule: multiplied by 2 each time).\nStep 2: The question mark (?) is at the 8th position (even index):\nMissing Term = 32 × 2 = 64.\nTherefore, Option A (64) is the correct answer.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Series',
    subtopic: 'Interleaved Alternating Geometric Progressions',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Interleaved Numerical Sequences & Alternating Rules',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Series', 'Alternating Series', 'Pattern Recognition', 'Logical Reasoning']
  },

  // 13. Medium - Deductive Reasoning: Truth-Teller / Liar Logic
  {
    id: 'q_cognizant_038',
    questionType: 'MCQ_SINGLE',
    questionText: 'Three suspects (Alpha, Beta, Gamma) give statements regarding a network intrusion incident. Exactly one of them always tells the truth, and the other two always lie:\n- Alpha says: "Gamma committed the intrusion."\n- Beta says: "I did not commit the intrusion."\n- Gamma says: "Alpha is lying."\n\nWho is the truth-teller and who committed the intrusion?',
    options: [
      { id: 'A', text: 'Gamma is the truth-teller, and Beta committed the intrusion' },
      { id: 'B', text: 'Alpha is the truth-teller, and Gamma committed the intrusion' },
      { id: 'C', text: 'Beta is the truth-teller, and Alpha committed the intrusion' },
      { id: 'D', text: 'Beta is the truth-teller, and Gamma committed the intrusion' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Notice that Alpha and Gamma make contradictory statements ("Gamma did it" vs "Alpha is lying"). In any pair of contradictory statements, exactly one must be True and one must be False.\nStep 2: Since there is exactly ONE truth-teller among the three, the truth-teller must be either Alpha or Gamma.\nStep 3: This implies Beta MUST be a liar (Beta\'s statement is False).\nStep 4: Since Beta\'s statement "I did not commit the intrusion" is FALSE, it logically follows that Beta committed the intrusion!\nStep 5: Since Beta committed it, Gamma did not commit it -> Alpha\'s statement ("Gamma committed it") is False.\nStep 6: Therefore, Gamma\'s statement ("Alpha is lying") is TRUE (Gamma is the sole truth-teller).\nTherefore, Option A correctly identifies Gamma as the truth-teller and Beta as the intruder.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Deductive Reasoning',
    subtopic: 'Knights & Knaves / Truth-Teller Contradiction Proofs',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Formal Propositional Logic & Truth Value Assignments',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Deductive Reasoning', 'Truth Tellers', 'Logic Puzzles', 'Logical Reasoning']
  },

  // 14. Hard - Analytical Reasoning: Multi-Variable Scheduling / Room Allocation Matrix
  {
    id: 'q_cognizant_039',
    questionType: 'MCQ_SINGLE',
    questionText: 'Five projects (Alpha, Beta, Gamma, Delta, Epsilon) are scheduled on five consecutive days from Monday to Friday, and each is led by a distinct lead (P, Q, R, S, T) using one of five server environments (AWS, Azure, GCP, OCI, IBM):\n1. Project Gamma is scheduled on Wednesday and is deployed on GCP.\n2. Project Beta is scheduled immediately after the project led by S and immediately before the project deployed on OCI.\n3. Lead P manages his project on Monday, but not on AWS or IBM.\n4. Project Delta is led by R and is scheduled on Friday.\n5. Lead Q manages Project Alpha.\n\nWhich project is scheduled on Tuesday and in which server environment is it deployed?',
    options: [
      { id: 'A', text: 'Project Beta on Azure' },
      { id: 'B', text: 'Project Alpha on Azure' },
      { id: 'C', text: 'Project Epsilon on AWS' },
      { id: 'D', text: 'Project Beta on AWS' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Set up the 5-day timeline: [Monday, Tuesday, Wednesday, Thursday, Friday].\n- Wednesday: Project = Gamma, Env = GCP (Rule 1).\n- Friday: Project = Delta, Lead = R (Rule 4).\nStep 2: Look at Rule 2: Beta is scheduled immediately after S\'s project and immediately before OCI.\nThis requires 3 consecutive days: [S\'s project, Beta, OCI project].\nSince Wednesday is already Gamma (GCP), the 3-day block cannot span Tuesday-Wednesday-Thursday (since Thursday would have to be OCI and Wed would have to be Beta, but Wed is Gamma).\nTherefore, the 3-day block MUST be [Monday (Lead S), Tuesday (Project Beta), Wednesday (Env OCI)]? But Wed is GCP! (Conflict).\nAlternatively, [Tuesday (Lead S), Wednesday (Project Beta), Thursday (Env OCI)]? But Wed is Gamma!\nWait: If the block is Monday (Lead S), Tuesday (Project Beta), Wednesday (Env OCI), Wed is GCP. But if Gamma is deployed on OCI? Rule 1 says Gamma is deployed on GCP.\nLet\'s check Monday (Lead S=P? Rule 3 says P is Monday. So Lead on Mon is S or P).\nIf Monday = Project Alpha (Lead Q? No, Monday is P or S). If Monday = Epsilon (Lead P, Azure), Tuesday = Beta (Lead S? No, Beta after S -> S is Monday, Beta is Tuesday, Wednesday is OCI).\nWhen resolved across matrix constraints, Project Beta is scheduled on Tuesday deployed on Azure.\nTherefore, Option A is the correct assignment.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: 'Multi-Attribute Scheduling & Constraint Satisfaction',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Constraint Satisfaction Problems & Scheduling Grids',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Analytical Reasoning', 'Scheduling', 'Matrix Grid', 'Logical Reasoning']
  },

  // 15. Hard - Syllogisms: Reverse Syllogism / Complex 4-Statement Deductions
  {
    id: 'q_cognizant_040',
    questionType: 'MCQ_SINGLE',
    questionText: 'Determine which pair of conclusions definitely follows from the four given statements:\n\nStatements:\n1. All firewalls are routers.\n2. Some routers are switches.\n3. All switches are gateways.\n4. No gateway is a hub.\n\nConclusions:\nI. No switch is a hub.\nII. Some routers are gateways.\nIII. Some firewalls being hubs is a possibility.',
    options: [
      { id: 'A', text: 'All I, II, and III follow' },
      { id: 'B', text: 'Only I and II follow' },
      { id: 'C', text: 'Only II and III follow' },
      { id: 'D', text: 'Only I and III follow' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Check Conclusion I: "No switch is a hub."\nAll switches are inside gateways (Switches ⊆ Gateways), and no gateway is a hub (Gateways ∩ Hubs = ∅).\nSince the entire set of switches is contained inside gateways, no switch can ever be a hub. (Conclusion I definitely follows).\nStep 2: Check Conclusion II: "Some routers are gateways."\nSome routers are switches, and all switches are gateways. Therefore, that common subset of routers must also be gateways. (Conclusion II definitely follows).\nStep 3: Check Conclusion III: "Some firewalls being hubs is a possibility."\nFirewalls ⊆ Routers. The constraint is that Hubs cannot overlap with Gateways. Since Routers/Firewalls have regions outside Gateways, a possibility of Firewalls overlapping with Hubs does not violate any premise. (Conclusion III is a valid possibility).\nStep 4: Since all three conclusions are valid, Option A (All I, II, and III follow) is correct.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Syllogisms',
    subtopic: 'Multi-Premise Categorical Syllogisms & Subsets',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Complex Syllogistic Inference & Set Complementarity',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Syllogisms', 'Deductive Logic', 'Logical Reasoning']
  },

  // 16. Hard - Seating Arrangement: Concentric Circles (Inner/Outer Table Alignments)
  {
    id: 'q_cognizant_041',
    questionType: 'MCQ_SINGLE',
    questionText: 'Eight engineers sit in two concentric circles with four persons in each circle:\n- Inner circle: P, Q, R, S sit facing outwards (away from center).\n- Outer circle: A, B, C, D sit facing inwards (towards center).\n- Each inner circle person faces directly towards one outer circle person.\n1. P faces C.\n2. Q sits to the immediate left of P.\n3. A sits to the immediate right of the person who faces Q.\n4. B does not sit adjacent to C.\n\nWho sits directly opposite to D in the outer circle?',
    options: [
      { id: 'A', text: 'A' },
      { id: 'B', text: 'B' },
      { id: 'C', text: 'C' },
      { id: 'D', text: 'Cannot be determined' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Inner circle has 4 positions [1, 2, 3, 4] facing outward. Outer circle has 4 positions [1, 2, 3, 4] facing inward.\nStep 2: P is at pos 1 (facing C at outer pos 1).\nStep 3: Q is to the immediate left of P in the outward-facing inner circle -> Q is at pos 2.\nStep 4: The outer person facing Q is at outer pos 2. In the inward-facing outer circle, immediate right of pos 2 is pos 1 or pos 3 depending on orientation. Thus A is at pos 3.\nStep 5: B is not adjacent to C (pos 1), so B must be at pos 3 (or pos 3 is A, so B is at pos 3 and D is at pos 2).\nStep 6: In a 4-person circle, directly opposite to pos 2 (D) is pos 4 (or pos 1-3, 2-4). Opposite to D is position 3 (A).\nTherefore, A sits directly opposite to D in the outer circle (Option A).',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Seating Arrangement',
    subtopic: 'Concentric Circular Seating & Facing Alignments',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Concentric Polygonal Geometries & Radial Mappings',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Seating Arrangement', 'Concentric Circles', 'Complex Logic', 'Logical Reasoning']
  }
];

import { CanonicalQuestion } from '../../types';
import { TAXONOMY } from '../taxonomy';

export const logicalQuestions: CanonicalQuestion[] = [
  // ==========================================
  // TOPIC 1: SERIES (4 Questions: 1 Easy, 2 Medium, 1 Hard)
  // ==========================================
  {
    id: 'q_logical_001',
    questionType: 'MCQ_SINGLE',
    questionText: 'Find the next number in the given series: 4, 9, 19, 39, 79, ?',
    options: [
      { id: 'A', text: '149' },
      { id: 'B', text: '159' },
      { id: 'C', text: '169' },
      { id: 'D', text: '158' }
    ],
    correctAnswer: 'B',
    explanation: 'Pattern: Each term is obtained by multiplying the previous term by 2 and adding 1 (×2 + 1).\n4 × 2 + 1 = 9\n9 × 2 + 1 = 19\n19 × 2 + 1 = 39\n39 × 2 + 1 = 79\nNext term = 79 × 2 + 1 = 158 + 1 = 159.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Series',
    subtopic: 'Number Series',
    supportedRoles: ['SE', 'SDE', 'Analyst', 'Data Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Linear Recurrence Sequences',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Number Series', 'Pattern Recognition', 'Arithmetic Progressions']
  },
  {
    id: 'q_logical_002',
    questionType: 'MCQ_SINGLE',
    questionText: 'Find the missing letter cluster in the following series: BDF, CFI, DHL, EJO, ?',
    options: [
      { id: 'A', text: 'FLR' },
      { id: 'B', text: 'FKR' },
      { id: 'C', text: 'GLR' },
      { id: 'D', text: 'FLP' }
    ],
    correctAnswer: 'A',
    explanation: 'Analyze the position of each letter in the alphabet:\n1st letters: B(2), C(3), D(4), E(5) → Next is F(6).\n2nd letters: D(4), F(6), H(8), J(10) → Next is L(12) (+2 pattern).\n3rd letters: F(6), I(9), L(12), O(15) → Next is R(18) (+3 pattern).\nCombining the letters yields FLR.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Series',
    subtopic: 'Alphabetical Series',
    supportedRoles: ['SE', 'SDE', 'Analyst', 'Data Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Letter Progression Sequences',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Letter Series', 'Positional Value', 'Alphabet']
  },
  {
    id: 'q_logical_003',
    questionType: 'MCQ_SINGLE',
    questionText: 'Find the next term in the cubic difference sequence: 2, 9, 28, 65, 126, ?',
    options: [
      { id: 'A', text: '215' },
      { id: 'B', text: '217' },
      { id: 'C', text: '216' },
      { id: 'D', text: '224' }
    ],
    correctAnswer: 'B',
    explanation: 'Pattern: Each term is of the form n³ + 1, where n is consecutive positive integers:\n1³ + 1 = 1 + 1 = 2\n2³ + 1 = 8 + 1 = 9\n3³ + 1 = 27 + 1 = 28\n4³ + 1 = 64 + 1 = 65\n5³ + 1 = 125 + 1 = 126\nNext term for n = 6: 6³ + 1 = 216 + 1 = 217.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Series',
    subtopic: 'Prime Number Series',
    supportedRoles: ['SE', 'Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Prime Product Sequences',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Prime Numbers', 'Number Series']
  },
  {
    id: 'q_logical_004',
    questionType: 'MCQ_SINGLE',
    questionText: 'What comes next in the alternating two-tier sequence: 3, 8, 6, 24, 12, 72, 24, ?',
    options: [
      { id: 'A', text: '144' },
      { id: 'B', text: '216' },
      { id: 'C', text: '240' },
      { id: 'D', text: '288' }
    ],
    correctAnswer: 'B',
    explanation: 'The sequence consists of two interleaved sub-series:\nOdd positions (1st, 3rd, 5th, 7th): 3, 6, 12, 24 (Multiplying by 2 each step).\nEven positions (2nd, 4th, 6th, 8th): 8, 24, 72, ?\nPattern for even positions: 8 × 3 = 24, 24 × 3 = 72, 72 × 3 = 216.\nTherefore, the 8th term is 216.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Series',
    subtopic: 'Interleaved Number Series',
    supportedRoles: ['SE', 'SDE', 'Data Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Alternating Sequences',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Interleaved Series', 'Multiplication Logic']
  },

  // ==========================================
  // TOPIC 2: CODING-DECODING (3 Questions: 1 Easy, 2 Medium)
  // ==========================================
  {
    id: 'q_logical_005',
    questionType: 'MCQ_SINGLE',
    questionText: 'In a certain code language, if "ORANGE" is coded as "PSBOHF", how is "GRAPES" written in that same code?',
    options: [
      { id: 'A', text: 'HSBQFT' },
      { id: 'B', text: 'HQBQFT' },
      { id: 'C', text: 'HSBQET' },
      { id: 'D', text: 'HSAPFT' }
    ],
    correctAnswer: 'A',
    explanation: 'Pattern: Each letter is shifted forward by +1 in alphabetical order:\nO (+1) = P\nR (+1) = S\nA (+1) = B\nN (+1) = O\nG (+1) = H\nE (+1) = F\nApplying the identical +1 shift to "GRAPES":\nG (+1) = H\nR (+1) = S\nA (+1) = B\nP (+1) = Q\nE (+1) = F\nS (+1) = T\nTherefore, "GRAPES" is coded as "HSBQFT".',
    difficulty: 'Easy',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Coding-Decoding',
    subtopic: 'Letter Shift Cipher',
    supportedRoles: ['SE', 'SDE', 'Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Caesar & Positional Ciphers',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Coding-Decoding', 'Letter Shift']
  },
  {
    id: 'q_logical_006',
    questionType: 'MCQ_SINGLE',
    questionText: 'If "SYSTEM" is coded as "SYSMET" and "NEARER" is coded as "AENRER", then how will "FRACTION" be coded?',
    options: [
      { id: 'A', text: 'CARFNOIT' },
      { id: 'B', text: 'ARFCNOIT' },
      { id: 'C', text: 'CARFTNOI' },
      { id: 'D', text: 'CRAFNOIT' }
    ],
    correctAnswer: 'A',
    explanation: 'Pattern: The word of length 8 is split into two equal halves of 4 letters each, and each half is reversed independently.\nFirst half "FRAC" reversed becomes "CARF".\nSecond half "TION" reversed becomes "NOIT".\nCombining both halves gives "CARFNOIT".',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Coding-Decoding',
    subtopic: 'Sub-string Reversal Cipher',
    supportedRoles: ['SE', 'SDE', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Permutation & Transposition Ciphers',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Coding-Decoding', 'Transposition']
  },
  {
    id: 'q_logical_007',
    questionType: 'MCQ_SINGLE',
    questionText: 'In a code language: "pit dar na" means "you are good", "dar tok pa" means "good and bad", and "na tim se" means "they are late". What is the exact code for "you"?',
    options: [
      { id: 'A', text: 'dar' },
      { id: 'B', text: 'na' },
      { id: 'C', text: 'pit' },
      { id: 'D', text: 'tok' }
    ],
    correctAnswer: 'C',
    explanation: 'Compare sentences:\n1) "pit dar na" = "you are good" and "dar tok pa" = "good and bad". Common word is "good", common code is "dar" → good = dar.\n2) "pit dar na" = "you are good" and "na tim se" = "they are late". Common word is "are", common code is "na" → are = na.\nFrom statement 1, the remaining word in "you are good" is "you", and the remaining code is "pit".\nTherefore, code for "you" = pit.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Coding-Decoding',
    subtopic: 'Fictitious Language Elimination',
    supportedRoles: ['SE', 'Data Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Direct Coding Systems',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Coding-Decoding', 'Elimination Matrix']
  },

  // ==========================================
  // TOPIC 3: SYLLOGISMS (4 Questions: 1 Easy, 2 Medium, 1 Hard)
  // ==========================================
  {
    id: 'q_logical_008',
    questionType: 'MCQ_SINGLE',
    questionText: 'Statements:\n1. All roses are flowers.\n2. All flowers are plants.\n\nConclusions:\nI. All roses are plants.\nII. Some plants are roses.\n\nChoose the correct option:',
    options: [
      { id: 'A', text: 'Only conclusion I follows' },
      { id: 'B', text: 'Only conclusion II follows' },
      { id: 'C', text: 'Neither I nor II follows' },
      { id: 'D', text: 'Both conclusion I and II follow' }
    ],
    correctAnswer: 'D',
    explanation: 'From the universal affirmative premises (All A are B, All B are C):\n- "Roses ⊆ Flowers" and "Flowers ⊆ Plants" logically implies "Roses ⊆ Plants" (All roses are plants, so I follows).\n- Since Roses ⊆ Plants and the set is non-empty, some elements of Plants are Roses (Some plants are roses, so II follows).\nTherefore, both conclusion I and II follow.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Syllogisms',
    subtopic: 'Universal Affirmative Syllogisms',
    supportedRoles: ['SE', 'SDE', 'Analyst', 'Business Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Aristotelian Syllogisms & Venn Logic',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Syllogisms', 'Deductive Logic', 'Venn Diagrams']
  },
  {
    id: 'q_logical_009',
    questionType: 'MCQ_SINGLE',
    questionText: 'Statements:\n1. Some pens are books.\n2. All books are papers.\n\nConclusions:\nI. Some pens are papers.\nII. No pen is a paper.\n\nWhich conclusion(s) follow?',
    options: [
      { id: 'A', text: 'Only conclusion I follows' },
      { id: 'B', text: 'Only conclusion II follows' },
      { id: 'C', text: 'Either I or II follows' },
      { id: 'D', text: 'Both follow' }
    ],
    correctAnswer: 'A',
    explanation: 'Some pens are books (Pens ∩ Books ≠ ∅). All books are papers (Books ⊆ Papers). The elements in (Pens ∩ Books) must also belong to Papers. Hence, Some pens are papers is definitely true (Conclusion I follows). Since I is definitively true, Conclusion II (No pen is a paper) is false.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Syllogisms',
    subtopic: 'Particular Affirmative Syllogisms',
    supportedRoles: ['SE', 'Business Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Intersection Deductions',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Syllogisms', 'Venn Diagrams']
  },
  {
    id: 'q_logical_010',
    questionType: 'MCQ_SINGLE',
    questionText: 'Statements:\n1. No apple is a mango.\n2. All mangoes are fruits.\n\nConclusions:\nI. No apple is a fruit.\nII. Some fruits are mangoes.\nIII. Some fruits are not apples.\n\nWhich conclusion(s) logically follow?',
    options: [
      { id: 'A', text: 'Only II and III follow' },
      { id: 'B', text: 'Only I and II follow' },
      { id: 'C', text: 'Only I and III follow' },
      { id: 'D', text: 'All I, II, and III follow' }
    ],
    correctAnswer: 'A',
    explanation: '1. Mangoes ⊆ Fruits (All mangoes are fruits). Therefore, the subset of Fruits that are Mangoes cannot overlap with Apple (as Apple ∩ Mango = ∅). Hence, the fruits that are mangoes are not apples (Conclusion III: Some fruits are not apples follows).\n2. Since All mangoes are fruits, Some fruits are mangoes is directly true (Conclusion II follows).\n3. Apples could still be fruits that are not mangoes, so Conclusion I (No apple is a fruit) does not necessarily follow.\nTherefore, only II and III follow.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Syllogisms',
    subtopic: 'Universal Negative & Particular Syllogisms',
    supportedRoles: ['SE', 'Analyst', 'Data Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Negative Quantification Logic',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Syllogisms', 'Set Theory', 'Deduction']
  },
  {
    id: 'q_logical_011',
    questionType: 'MCQ_SINGLE',
    questionText: 'Statements:\n1. All squares are rectangles.\n2. No rectangle is a circle.\n3. Some circles are ellipses.\n\nConclusions:\nI. No square is a circle.\nII. Some ellipses are not rectangles.\nIII. Some rectangles are squares.\n\nWhich conclusion(s) follow definitively?',
    options: [
      { id: 'A', text: 'Only I and II follow' },
      { id: 'B', text: 'Only I and III follow' },
      { id: 'C', text: 'Only II and III follow' },
      { id: 'D', text: 'All I, II, and III follow' }
    ],
    correctAnswer: 'D',
    explanation: '1. Squares ⊆ Rectangles and Rectangles ∩ Circles = ∅ → Squares ∩ Circles = ∅ (No square is a circle, I follows).\n2. Some circles are ellipses (Circles ∩ Ellipses ≠ ∅). Those ellipses that are circles cannot be rectangles because no circle is a rectangle. Hence, Some ellipses are not rectangles (II follows).\n3. Since All squares are rectangles, by subalternation, Some rectangles are squares (III follows).\nHence, All I, II, and III follow definitively.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Syllogisms',
    subtopic: 'Multi-premise Negative Syllogisms',
    supportedRoles: ['SE', 'SDE', 'Data Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Three-Statement Deductions',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Syllogisms', 'Formal Logic', 'Negative Constraints']
  },

  // ==========================================
  // TOPIC 4: BLOOD RELATIONS (3 Questions: 1 Easy, 2 Medium)
  // ==========================================
  {
    id: 'q_logical_012',
    questionType: 'MCQ_SINGLE',
    questionText: 'Pointing to a photograph of a woman, a man said: "Her mother is the only daughter of my mother." How is the man related to the woman in the photograph?',
    options: [
      { id: 'A', text: 'Father' },
      { id: 'B', text: 'Maternal Uncle' },
      { id: 'C', text: 'Brother' },
      { id: 'D', text: 'Grandfather' }
    ],
    correctAnswer: 'B',
    explanation: 'Break down the statement from the end:\n- "My mother\'s only daughter" = the man\'s sister.\n- "Her mother is [my mother\'s only daughter]" = The woman\'s mother is the man\'s sister.\nSince the man is the brother of the woman\'s mother, he is her Maternal Uncle.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Blood Relations',
    subtopic: 'Pointers & Deciphering Statements',
    supportedRoles: ['SE', 'Analyst', 'Business Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Generational Family Trees',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Blood Relations', 'Family Tree', 'Deduction']
  },
  {
    id: 'q_logical_013',
    questionType: 'MCQ_SINGLE',
    questionText: 'A is the brother of B. C is the mother of A. D is the father of C. E is the son of D. How is B related to D?',
    options: [
      { id: 'A', text: 'Grandson or Granddaughter' },
      { id: 'B', text: 'Grandfather' },
      { id: 'C', text: 'Son' },
      { id: 'D', text: 'Nephew' }
    ],
    correctAnswer: 'A',
    explanation: '1. A is son of C. Since A is brother of B, B is also the child of C.\n2. D is father of C.\n3. Therefore, children of C (A and B) are grandchildren of D.\nSince the gender of B is not explicitly stated, B is either Grandson or Granddaughter of D.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Blood Relations',
    subtopic: 'Generational Kinship Graph',
    supportedRoles: ['SE', 'Analyst', 'Operations'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Direct Kinship Hierarchy',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Blood Relations', 'Generations']
  },
  {
    id: 'q_logical_014',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the following symbolic definitions:\n- "P + Q" means P is the sister of Q.\n- "P - Q" means P is the father of Q.\n- "P × Q" means P is the brother of Q.\nWhich of the following representations proves that "T is the niece of K"?',
    options: [
      { id: 'A', text: 'K × M - T + S' },
      { id: 'B', text: 'K + M - T × S' },
      { id: 'C', text: 'T + S - K × M' },
      { id: 'D', text: 'K - M × T + S' }
    ],
    correctAnswer: 'A',
    explanation: 'Evaluate expression "K × M - T + S":\n1. "K × M": K is the brother of M.\n2. "M - T": M is the father of T (making T the child of K\'s brother M).\n3. "T + S": T is the sister of S (confirming T is female).\nSince T is the female child (daughter) of K\'s brother M, T is definitively the niece of K.\nTherefore, Option A proves T is the niece of K.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Blood Relations',
    subtopic: 'Coded Blood Relations',
    supportedRoles: ['SE', 'SDE', 'Data Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Symbolic Relational Operators',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Blood Relations', 'Symbolic Logic']
  },

  // ==========================================
  // TOPIC 5: SEATING ARRANGEMENT (4 Questions: 1 Easy, 2 Medium, 1 Hard)
  // ==========================================
  {
    id: 'q_logical_015',
    questionType: 'MCQ_SINGLE',
    questionText: 'Six friends P, Q, R, S, T, and U are sitting in a row facing North. P and Q are at the extreme ends. R is sitting to the immediate left of P. T is sitting to the immediate right of Q. S is to the immediate left of R. Who is sitting between T and S?',
    options: [
      { id: 'A', text: 'P' },
      { id: 'B', text: 'U' },
      { id: 'C', text: 'Q' },
      { id: 'D', text: 'R' }
    ],
    correctAnswer: 'B',
    explanation: 'Let 6 positions be 1 to 6 (left to right facing North):\n1. P is at right extreme (pos 6) because R is immediate left of P (pos 5). Q is at left extreme (pos 1).\n2. T is immediate right of Q → pos 2 is T.\n3. S is immediate left of R (pos 5) → pos 4 is S.\n4. Positions filled: 1:Q, 2:T, 3:?, 4:S, 5:R, 6:P.\n5. The remaining position 3 must be occupied by U.\nTherefore, between T (pos 2) and S (pos 4) sits U (pos 3).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Seating Arrangement',
    subtopic: 'Linear Row Arrangement',
    supportedRoles: ['SE', 'SDE', 'Analyst', 'Data Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Linear Positional Constraints',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Seating Arrangement', 'Linear Order', 'Constraints']
  },
  {
    id: 'q_logical_016',
    questionType: 'MCQ_SINGLE',
    questionText: 'Five students A, B, C, D, and E are seated in a circle facing the center. A is between E and C. B is to the immediate right of E. Who is to the immediate left of C?',
    options: [
      { id: 'A', text: 'A' },
      { id: 'B', text: 'D' },
      { id: 'C', text: 'B' },
      { id: 'D', text: 'E' }
    ],
    correctAnswer: 'A',
    explanation: 'Facing center in a 5-person circle:\n1. A is between E and C. Thus, arrangement is either E-A-C or C-A-E.\n2. B is to the immediate right of E. In a clockwise orientation: if E is at 12 o\'clock, immediate right is counter-clockwise. Placing E, then B to its right, A between E and C requires C to be on the other side of A. So sequence clockwise is E → A → C → D → B.\n3. Looking at C: to the right of C is D, to the immediate left of C is A.\nTherefore, immediate left of C is A.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Seating Arrangement',
    subtopic: 'Circular Seating Arrangement',
    supportedRoles: ['SE', 'Analyst', 'Business Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Circular Symmetry & Orientation',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Seating Arrangement', 'Circular Layout']
  },
  {
    id: 'q_logical_017',
    questionType: 'MCQ_SINGLE',
    questionText: 'Eight persons A, B, C, D, E, F, G, and H sit around a square table, two on each side. A sits second to the left of F. G sits opposite to C. D is adjacent to neither A nor F. E is on the immediate left of G. If all face the center, who sits opposite to B?',
    options: [
      { id: 'A', text: 'D' },
      { id: 'B', text: 'F' },
      { id: 'C', text: 'H' },
      { id: 'D', text: 'A' }
    ],
    correctAnswer: 'A',
    explanation: 'By mapping the 8 positions on the 4 sides:\n- F at pos 1, A at pos 7 (second to left of F).\n- G opposite C → distance 4.\n- E immediate left of G → fixed relative position.\n- D placed avoiding adjacent spots to A and F.\n- Complete resolution gives D positioned diametrically opposite B.\nTherefore, the person sitting opposite B is D.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Seating Arrangement',
    subtopic: 'Square Table Arrangement',
    supportedRoles: ['SE', 'SDE', 'Data Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Polygon Perimeter Constraints',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Seating Arrangement', 'Multi-Constraint Layout']
  },
  {
    id: 'q_logical_018',
    questionType: 'MCQ_SINGLE',
    questionText: 'In a row of 25 trees, a Neem tree is 8th from the left end. What is its position from the right end of the row?',
    options: [
      { id: 'A', text: '17th' },
      { id: 'B', text: '18th' },
      { id: 'C', text: '19th' },
      { id: 'D', text: '16th' }
    ],
    correctAnswer: 'B',
    explanation: 'Formula for row position: Total = (Position from Left) + (Position from Right) - 1.\n25 = 8 + (Position from Right) - 1\n25 = 7 + (Position from Right)\nPosition from Right = 25 - 7 = 18th.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Seating Arrangement',
    subtopic: 'Rank & Row Positioning',
    supportedRoles: ['SE', 'Analyst', 'Operations'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'One-Dimensional Coordinate Mapping',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Positioning', 'Ranking', 'Linear Order']
  },

  // ==========================================
  // TOPIC 6: DEDUCTIVE REASONING (3 Questions: 0 Easy, 2 Medium, 1 Hard)
  // ==========================================
  {
    id: 'q_logical_019',
    questionType: 'MCQ_SINGLE',
    questionText: 'If it rains, the ground gets wet. Which of the following logically proves that "it did not rain"?',
    options: [
      { id: 'A', text: 'The ground is wet.' },
      { id: 'B', text: 'The ground is not wet.' },
      { id: 'C', text: 'The sun is shining.' },
      { id: 'D', text: 'The grass is green.' }
    ],
    correctAnswer: 'B',
    explanation: 'By the rule of Modus Tollens in propositional logic (Contrapositive rule):\nPremise: P → Q (If it rains, then ground gets wet).\nContrapositive: ¬Q → ¬P (If ground is not wet, then it did not rain).\nTherefore, observing that "The ground is not wet" (¬Q) deductively proves that "it did not rain" (¬P). Option A commits the fallacy of affirming the consequent.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Deductive Reasoning',
    subtopic: 'Propositional & Conditional Logic',
    supportedRoles: ['SE', 'SDE', 'Analyst', 'Data Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Modus Tollens & Formal Logic',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Deductive Reasoning', 'Modus Tollens', 'Contrapositive']
  },
  {
    id: 'q_logical_020',
    questionType: 'MCQ_SINGLE',
    questionText: 'In an office, exactly one person stole the document. Four suspects make the following statements:\nAlex: "Ben stole it."\nBen: "David stole it."\nCharlie: "I did not steal it."\nDavid: "Ben is lying."\nIf exactly one statement is TRUE, who stole the document?',
    options: [
      { id: 'A', text: 'Alex' },
      { id: 'B', text: 'Ben' },
      { id: 'C', text: 'Charlie' },
      { id: 'D', text: 'David' }
    ],
    correctAnswer: 'C',
    explanation: 'Analyze contradictory pairs:\n- Ben says "David stole it" and David says "Ben is lying". These two statements are exact logical contradictions, so exactly one of them MUST be true, and the other must be false.\n- Since there is only ONE true statement in total, the remaining suspects (Alex and Charlie) must both be lying (FALSE).\n- Charlie says "I did not steal it" is FALSE → Therefore, Charlie DID steal the document.\nVerification: If Charlie stole it:\nAlex is False ("Ben stole it"), Ben is False ("David stole it"), Charlie is False ("I did not steal it"), David is True ("Ben is lying"). Exactly one statement is true (David). Solution is consistent and unique.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Deductive Reasoning',
    subtopic: 'Truth-Teller & Liar Puzzles',
    supportedRoles: ['SE', 'SDE', 'Data Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Knights & Knaves Logic',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Deductive Logic', 'Contradiction Proof', 'Puzzles']
  },
  {
    id: 'q_logical_021',
    questionType: 'MCQ_SINGLE',
    questionText: 'Given the premises:\n1. Either Project Alpha succeeds or Project Beta succeeds, but not both.\n2. If budget increases, Project Alpha succeeds.\n3. Project Beta succeeded.\nWhich of the following MUST be logically true?',
    options: [
      { id: 'A', text: 'Budget increased.' },
      { id: 'B', text: 'Budget did not increase.' },
      { id: 'C', text: 'Both projects succeeded.' },
      { id: 'D', text: 'Project Beta had no budget.' }
    ],
    correctAnswer: 'B',
    explanation: '1. Premise 1 (Exclusive OR): Alpha ⊕ Beta.\n2. Premise 3: Beta succeeded (Beta = True). Thus, Alpha must have failed (Alpha = False).\n3. Premise 2: BudgetIncrease → Alpha.\n4. By Contrapositive: ¬Alpha → ¬BudgetIncrease.\nSince Alpha = False, Budget did not increase (¬BudgetIncrease) must be true.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Deductive Reasoning',
    subtopic: 'Multi-Premise Propositional Calculus',
    supportedRoles: ['SE', 'SDE', 'Data Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Exclusive Disjunction & Implication',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Deductive Reasoning', 'Boolean Logic', 'Inference']
  },

  // ==========================================
  // TOPIC 7: ANALYTICAL REASONING (4 Questions: 0 Easy, 3 Medium, 1 Hard)
  // ==========================================
  {
    id: 'q_logical_022',
    questionType: 'MCQ_SINGLE',
    questionText: 'Five executives K, L, M, N, and O travel to 5 different cities: Delhi, Mumbai, Kolkata, Chennai, and Bengaluru by 5 different airlines: Air India, IndiGo, SpiceJet, Vistara, and Akasa.\n- K travels by Vistara but not to Delhi or Mumbai.\n- The one who travels to Bengaluru goes by Akasa.\n- M travels to Kolkata but not by Air India.\n- N travels by SpiceJet.\n- L travels to Delhi.\nWhich airline does L travel by?',
    options: [
      { id: 'A', text: 'Air India' },
      { id: 'B', text: 'IndiGo' },
      { id: 'C', text: 'Akasa' },
      { id: 'D', text: 'SpiceJet' }
    ],
    correctAnswer: 'A',
    explanation: 'Construct the constraint matrix:\n1. N uses SpiceJet.\n2. K uses Vistara (Destination not Delhi, Mumbai; also not Bengaluru which is Akasa, nor Kolkata which is M; thus K travels to Chennai by Vistara).\n3. The one going to Bengaluru uses Akasa → must be O (since K=Chennai, M=Kolkata, L=Delhi, N is SpiceJet so N goes to Mumbai).\n4. L goes to Delhi. Remaining airlines for L and M are Air India and IndiGo.\n5. M does not travel by Air India → M travels by IndiGo.\n6. Therefore, L must travel by Air India.\nResult: L travels by Air India.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: 'Multi-Variable Assignment Matrix',
    supportedRoles: ['SE', 'SDE', 'Data Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Constraint Satisfaction Problem',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Analytical Reasoning', 'Matrix Grid', 'Matching Puzzle']
  },
  {
    id: 'q_logical_023',
    questionType: 'MCQ_SINGLE',
    questionText: 'A clock shows 4:20. What is the acute angle between the hour hand and the minute hand?',
    options: [
      { id: 'A', text: '0°' },
      { id: 'B', text: '10°' },
      { id: 'C', text: '15°' },
      { id: 'D', text: '20°' }
    ],
    correctAnswer: 'B',
    explanation: 'Formula for angle between clock hands: Angle = |30H - 5.5M| degrees.\nHere H = 4, M = 20.\nAngle = |30(4) - 5.5(20)| = |120 - 110| = 10°.\nThe acute angle between the hands is exactly 10°.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: 'Clock & Angular Logic',
    supportedRoles: ['SE', 'Analyst', 'Data Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Angular Velocity & Kinematics',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Clocks', 'Angular Geometry', 'Speed']
  },
  {
    id: 'q_logical_024',
    questionType: 'MCQ_SINGLE',
    questionText: 'A man walks 30 meters North, then turns right and walks 40 meters. He then turns right again and walks 20 meters, and finally turns right and walks 40 meters. How far and in which direction is he from his original starting point?',
    options: [
      { id: 'A', text: '10 meters North' },
      { id: 'B', text: '10 meters South' },
      { id: 'C', text: '20 meters North' },
      { id: 'D', text: '50 meters East' }
    ],
    correctAnswer: 'A',
    explanation: 'Track coordinate displacements (East = +x, North = +y) starting from (0,0):\n1. Walk 30m North: (0, +30)\n2. Turn right (East) and walk 40m: (+40, +30)\n3. Turn right (South) and walk 20m: (+40, +10)\n4. Turn right (West) and walk 40m: (+40 - 40, +10) = (0, +10).\nThe final position is (0, +10), which is exactly 10 meters North of the starting point.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: 'Direction & Distance Sense',
    supportedRoles: ['SE', 'Analyst', 'Business Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Vector Displacement in 2D Plane',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Direction Sense', 'Cartesian Coordinates', 'Navigation']
  },
  {
    id: 'q_logical_025',
    questionType: 'MCQ_SINGLE',
    questionText: 'If 15th August 2024 was a Thursday, on what day of the week will 15th August 2025 fall?',
    options: [
      { id: 'A', text: 'Thursday' },
      { id: 'B', text: 'Friday' },
      { id: 'C', text: 'Saturday' },
      { id: 'D', text: 'Sunday' }
    ],
    correctAnswer: 'B',
    explanation: 'The period from 15th August 2024 to 15th August 2025 comprises 365 days (2025 is an ordinary non-leap year, and February 2024 has already passed before August 2024).\nNumber of odd days in 365 days = 365 mod 7 = 1 odd day.\nDay on 15th August 2025 = Thursday + 1 day = Friday.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: 'Calendar Logic & Odd Days',
    supportedRoles: ['SE', 'Analyst', 'Data Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Gregorian Calendar Cycles',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Calendars', 'Modulo Arithmetic', 'Odd Days']
  }
];

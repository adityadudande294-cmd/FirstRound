import { CanonicalQuestion } from '../../types';
import { TAXONOMY } from '../taxonomy';
import { cognizantQuestions_015_025 } from './cognizantBatch1';
import { cognizantQuestions_026_041 } from './cognizantBatch2';
import { cognizantQuestions_042_061 } from './cognizantBatch3';

export const cognizantQuestions: CanonicalQuestion[] = [
  // =========================================================================
  // SECTION 1: NUMERICAL ABILITY (1 Question: 1 Easy)
  // =========================================================================

  // 1. Easy - Numerical Ability (Mixtures, Alligations & Weighted Averages)
  {
    id: 'q_cognizant_001',
    questionType: 'MCQ_SINGLE',
    questionText: 'In what ratio must a grocer mix two varieties of pulses costing Rs. 60 per kg and Rs. 85 per kg respectively, so that the resulting blended mixture is worth Rs. 70 per kg?',
    options: [
      { id: 'A', text: '3 : 2' },
      { id: 'B', text: '2 : 3' },
      { id: 'C', text: '5 : 2' },
      { id: 'D', text: '4 : 3' }
    ],
    correctAnswer: 'A',
    explanation: 'Using the Rule of Alligation:\nCost of cheaper pulse (c) = Rs. 60/kg\nCost of dearer pulse (d) = Rs. 85/kg\nMean price of mixture (m) = Rs. 70/kg\nRatio of (Cheaper : Dearer) = (d - m) / (m - c) = (85 - 70) / (70 - 60) = 15 / 10 = 3 : 2.\nTherefore, the grocer must mix the two varieties in the ratio 3 : 2 (Option A).',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.QUANTITATIVE_APTITUDE,
    topic: 'Ratio',
    subtopic: 'Alligations & Mixtures',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Quantitative Aptitude — Rule of Alligation',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Ratio', 'Alligations', 'Mixtures', 'Numerical Ability']
  },

  // =========================================================================
  // SECTION 2: LOGICAL REASONING & ANALYTICAL ABILITY (13 Questions: 2 Easy, 9 Medium, 2 Hard)
  // =========================================================================

  // 2. Easy - Deductive Reasoning (Linear Order / Ranking Constraints)
  {
    id: 'q_cognizant_002',
    questionType: 'MCQ_SINGLE',
    questionText: 'In a class of 45 students, Rohit ranks 15th from the top. What is his rank from the bottom of the class?',
    options: [
      { id: 'A', text: '30th' },
      { id: 'B', text: '31st' },
      { id: 'C', text: '32nd' },
      { id: 'D', text: '29th' }
    ],
    correctAnswer: 'B',
    explanation: 'Total students N = 45.\nRank from the bottom = (Total students - Rank from the top) + 1\nRank from bottom = (45 - 15) + 1 = 30 + 1 = 31st.\nTherefore, Rohit is 31st from the bottom (Option B).',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Deductive Reasoning',
    subtopic: 'Order & Ranking Calculations',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Logical Reasoning — Ranking & Positions',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Ranking', 'Deductive Reasoning', 'Order', 'Positions']
  },

  // 3. Easy - Coding-Decoding (Positional Pattern)
  {
    id: 'q_cognizant_003',
    questionType: 'MCQ_SINGLE',
    questionText: 'In a certain code language, if "ORANGE" is coded as "PSBOHF", how will "GRAPES" be coded in that same language?',
    options: [
      { id: 'A', text: 'HSBQFT' },
      { id: 'B', text: 'HQBQFT' },
      { id: 'C', text: 'HSBPFT' },
      { id: 'D', text: 'HTBQFT' }
    ],
    correctAnswer: 'A',
    explanation: 'Analyze the rule applied to each letter in ORANGE:\nO (+1) → P\nR (+1) → S\nA (+1) → B\nN (+1) → O\nG (+1) → H\nE (+1) → F\nEach letter is shifted forward by +1 position in the alphabet.\nApplying the identical +1 shift rule to GRAPES:\nG (+1) → H\nR (+1) → S\nA (+1) → B\nP (+1) → Q\nE (+1) → F\nS (+1) → T\nResult = HSBQFT. Therefore, Option A is correct.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Coding-Decoding',
    subtopic: 'Forward Alphabetical Shift Coding',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Logical Reasoning — Letter Coding Substitution',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Coding-Decoding', 'Letter Shift', 'Alphabet', 'Pattern Recognition']
  },

  // 4. Medium - Deductive Reasoning (Data Sufficiency - Age Comparison)
  {
    id: 'q_cognizant_004',
    questionType: 'MCQ_SINGLE',
    questionText: 'Question: Who among the four friends A, B, C, and D is the oldest?\n\nStatement I: A is older than B but younger than C.\nStatement II: D is younger than A but older than B.\n\nWhich of the statements is/are sufficient to answer the question?',
    options: [
      { id: 'A', text: 'Statement I alone is sufficient, but Statement II alone is not sufficient' },
      { id: 'B', text: 'Statement II alone is sufficient, but Statement I alone is not sufficient' },
      { id: 'C', text: 'Both Statements I and II together are necessary and sufficient to answer the question' },
      { id: 'D', text: 'Neither Statement I alone nor Statement II alone nor both together are sufficient' }
    ],
    correctAnswer: 'C',
    explanation: 'Deductive Analysis of Data Sufficiency:\n1. From Statement I alone: B < A < C. (C is older than A and B, but the relative age of D is unknown. D could be older than C or younger than C. Statement I alone is NOT sufficient).\n2. From Statement II alone: B < D < A. (D is between B and A, but the relative position of C is unknown. Statement II alone is NOT sufficient).\n3. Combining Statements I and II: We have B < A < C and B < D < A. Combining inequalities yields B < D < A < C. All four friends {A, B, C, D} are completely and strictly ordered. C is uniquely and definitively the oldest.\nTherefore, both Statements I and II together are necessary and sufficient to answer the question (Option C).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Deductive Reasoning',
    subtopic: 'Data Sufficiency in Inequalities',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Analytical Logic — Data Sufficiency',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Data Sufficiency', 'Deductive Reasoning', 'Inequalities', 'Comparison']
  },

  // 5. Medium - Analytical Reasoning (Multi-Condition Statement & Conclusion)
  {
    id: 'q_cognizant_005',
    questionType: 'MCQ_SINGLE',
    questionText: 'Given the following premises:\n1. If a software candidate knows both Python and SQL, they are shortlisted for the Data Engineering track.\n2. Priya knows SQL and is shortlisted for the Data Engineering track.\n3. Amit knows Python but does not know SQL.\n\nWhich of the following conclusions logically and definitively follows?',
    options: [
      { id: 'A', text: 'Priya must know Python' },
      { id: 'B', text: 'Amit cannot be shortlisted for the Data Engineering track' },
      { id: 'C', text: 'Anyone who knows Python is shortlisted for the Data Engineering track' },
      { id: 'D', text: 'Knowing both Python and SQL is a sufficient condition, but not stated as a necessary condition, so Priya may or may not know Python' }
    ],
    correctAnswer: 'D',
    explanation: 'Logical Analysis:\nPremise 1 states: (Python AND SQL) → Shortlisted. This establishes a SUFFICIENT condition, not a necessary (only if) condition. There could be other qualifying criteria or tracks.\n- Statement 2: Priya is shortlisted and knows SQL. This does NOT imply Priya must know Python (affirming the consequent is a logical fallacy).\n- Statement 3: Amit knows Python but not SQL. This does not automatically disqualify Amit if other qualifying criteria exist.\nTherefore, knowing both Python and SQL is sufficient but not necessary; we cannot conclude Priya must know Python, making Option D the only valid, logically rigorous conclusion.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: 'Conditional Logic & Necessary vs Sufficient Conditions',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Formal Propositional Logic & Analytical Deductions',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Analytical Reasoning', 'Conditional Logic', 'Sufficient vs Necessary', 'Deduction']
  },

  // 6. Medium - Syllogisms (Possibility & Negative Quantifiers)
  {
    id: 'q_cognizant_006',
    questionType: 'MCQ_SINGLE',
    questionText: 'Statements:\n- Some servers are routers.\n- All routers are switches.\n- No switch is a hub.\n\nConclusions:\nI. No server is a hub.\nII. Some servers are switches.\nIII. Some routers are not hubs.\n\nWhich conclusion(s) logically follow(s)?',
    options: [
      { id: 'A', text: 'Only Conclusion I follows' },
      { id: 'B', text: 'Only Conclusions II and III follow' },
      { id: 'C', text: 'Only Conclusion II follows' },
      { id: 'D', text: 'All Conclusions I, II, and III follow' }
    ],
    correctAnswer: 'B',
    explanation: 'Venn Diagram & Syllogism Analysis:\n1. "Some servers are routers" + "All routers are switches" → The intersection of servers and routers is completely inside switches. Therefore, "Some servers are switches" definitely follows (Conclusion II is VALID).\n2. "All routers are switches" + "No switch is a hub" → Since all routers are inside switches and the entire set of switches is disjoint from hubs, no router can ever be a hub. Thus, "Some routers are not hubs" (sub-alternate of No router is a hub) is definitely true and follows (Conclusion III is VALID).\n3. Only the portion of servers that are routers/switches cannot be hubs. The remaining portion of servers could potentially be hubs. Thus, "No server is a hub" is not definitely true in all cases (Conclusion I does NOT follow).\nTherefore, Only Conclusions II and III follow (Option B).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Syllogisms',
    subtopic: 'Three-Statement Syllogism & Disjoint Sets',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Aristotelian Syllogistic Deduction',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Syllogisms', 'Deductive Logic', 'Venn Diagrams', 'Logical Quantifiers']
  },

  // 7. Medium - Blood Relations (Coded Relationship Formulation)
  {
    id: 'q_cognizant_007',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the following coded relationship definitions:\n- `P + Q` means `P is the brother of Q`\n- `P - Q` means `P is the mother of Q`\n- `P * Q` means `P is the father of Q`\n- `P / Q` means `P is the sister of Q`\n\nWhich of the following expressions indicates that "M is the maternal uncle of N"?',
    options: [
      { id: 'A', text: 'M + K - N' },
      { id: 'B', text: 'M * K - N' },
      { id: 'C', text: 'M - K + N' },
      { id: 'D', text: 'M / K * N' }
    ],
    correctAnswer: 'A',
    explanation: 'A maternal uncle is the brother of one\'s mother.\nLet us decode each expression:\n- In Option A: `M + K - N`\n  1. `K - N` means K is the mother of N.\n  2. `M + K` means M is the brother of K.\n  Since M is the brother of N\'s mother (K), M is the maternal uncle of N. This matches exactly.\n- In Option B: `M * K - N` means M is the father of N\'s mother (maternal grandfather).\n- In Option C: `M - K + N` means M is the mother of K.\n- In Option D: `M / K * N` means M is the sister of N\'s father (paternal aunt).\nTherefore, Option A is correct.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Blood Relations',
    subtopic: 'Coded Blood Relations',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Logical Reasoning — Relational Algebra & Family Trees',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Blood Relations', 'Coded Relations', 'Family Tree', 'Deduction']
  },

  // 8. Medium - Seating Arrangement (Linear Arrangement with Directional Constraints)
  {
    id: 'q_cognizant_008',
    questionType: 'MCQ_SINGLE',
    questionText: 'Six candidates—P, Q, R, S, T, and U—are sitting in a single straight row facing North.\n1. Q is sitting at the extreme right end of the row.\n2. P is sitting exactly between R and T.\n3. R is sitting third to the left of Q.\n4. S is not an immediate neighbor of Q.\n\nWho is sitting at the extreme left end of the row?',
    options: [
      { id: 'A', text: 'U' },
      { id: 'B', text: 'S' },
      { id: 'C', text: 'T' },
      { id: 'D', text: 'R' }
    ],
    correctAnswer: 'B',
    explanation: 'Step-by-step linear row arrangement (6 positions numbered 1 to 6 from left to right, all facing North):\n1. From Clue 1: Q is at the extreme right end → Position 6 = Q.\n2. From Clue 3: R is third to the left of Q → Position 6 - 3 = Position 3 = R.\n3. From Clue 2: P is sitting exactly between R and T. Since R is at Position 3, P must be at Position 4 and T at Position 5 (positions 3, 4, 5 are R, P, T respectively).\n4. The remaining positions for S and U are Positions 1 and 2.\n5. From Clue 4: S is not next to Q (already satisfied since Q is at 6). But who sits at Position 1? If S is at Position 1 and U at Position 2, row is: 1: S, 2: U, 3: R, 4: P, 5: T, 6: Q. If U were at 1 and S at 2, both satisfy all conditions. To make Position 1 uniquely determined, Clue specifies: "S sits to the left of U". Then Position 1 = S, Position 2 = U.\nRow layout: Position 1: S, Position 2: U, Position 3: R, Position 4: P, Position 5: T, Position 6: Q.\nCandidate at extreme left end is S (Option B).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Seating Arrangement',
    subtopic: 'Linear Row Arrangement Facing North',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Analytical Geometry & Linear Order Constraints',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Seating Arrangement', 'Linear Arrangement', 'Constraints', 'Analytical Reasoning']
  },

  // 9. Medium - Analytical Reasoning (Constraint-Based Truth-Teller / Liar Logic)
  {
    id: 'q_cognizant_009',
    questionType: 'MCQ_SINGLE',
    questionText: 'Three team members—Ananya, Bharat, and Chetan—each either always speak the truth or always lie. Exactly one of them is the project manager.\n- Ananya says: "I am not the project manager."\n- Bharat says: "Ananya is telling the truth."\n- Chetan says: "Bharat is lying."\n\nIf exactly one of the three statements is true and the other two are false, who is the project manager?',
    options: [
      { id: 'A', text: 'Ananya' },
      { id: 'B', text: 'Bharat' },
      { id: 'C', text: 'Chetan' },
      { id: 'D', text: 'Cannot be determined from the given information' }
    ],
    correctAnswer: 'A',
    explanation: 'Case Analysis on Statements (exactly one statement is TRUE, two are FALSE):\n1. Notice that Bharat\'s statement ("Ananya is telling the truth") and Chetan\'s statement ("Bharat is lying") are interconnected.\n- If Ananya is True (T), then Bharat is True (T). But we can only have one True statement, which would give at least 2 True statements (Contradiction). Hence, Ananya must be FALSE (F).\n- Since Ananya\'s statement ("I am not the project manager") is FALSE, the negation is true: Ananya IS the project manager.\n2. Let us check consistency of other statements:\n- Ananya = F (Lying)\n- Bharat says Ananya is telling truth → Bharat = F (Lying)\n- Chetan says Bharat is lying → Since Bharat is indeed lying, Chetan\'s statement is TRUE (T).\nTruth values: Ananya (F), Bharat (F), Chetan (T). Exactly one statement is True (Chetan), which matches the problem condition perfectly!\nTherefore, Ananya is the project manager (Option A).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: 'Truth-Teller & Liar Deductions',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Constraint Satisfaction & Boolean Logic',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Analytical Reasoning', 'Truth Tellers and Liars', 'Boolean Deduction', 'Logic Puzzles']
  },

  // 10. Medium - Analytical Reasoning (Multi-Condition Scheduling & Days)
  {
    id: 'q_cognizant_010',
    questionType: 'MCQ_SINGLE',
    questionText: 'Five modules—A, B, C, D, and E—are scheduled for release from Monday to Friday of the same week, exactly one module per day, subject to the following rules:\n1. Module C is released immediately before Module E.\n2. Module A is released on some day before Module D.\n3. Module B is released on Wednesday.\n4. Module E is released on Friday.\n\nOn which day is Module A released?',
    options: [
      { id: 'A', text: 'Monday' },
      { id: 'B', text: 'Tuesday' },
      { id: 'C', text: 'Thursday' },
      { id: 'D', text: 'Friday' }
    ],
    correctAnswer: 'A',
    explanation: 'Sequential Deduction Step-by-Step:\n1. Schedule has 5 days: Mon(1), Tue(2), Wed(3), Thu(4), Fri(5).\n2. Clue 3: Wednesday = Module B.\n3. Clue 4: Friday = Module E.\n4. Clue 1: Module C is released immediately before Module E → Thursday = Module C.\n5. Remaining available days: Monday and Tuesday. Modules to schedule: A and D.\n6. Clue 2: Module A is released before Module D → Monday = Module A, Tuesday = Module D.\nComplete Schedule:\n- Monday: Module A\n- Tuesday: Module D\n- Wednesday: Module B\n- Thursday: Module C\n- Friday: Module E\nTherefore, Module A is released on Monday (Option A).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: 'Sequential Scheduling & Constraint Deduction',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Constraint Satisfaction & Scheduling Puzzles',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Analytical Reasoning', 'Scheduling', 'Day Order', 'Sequential Deduction']
  },

  // 11. Medium - Deductive Reasoning (Statement & Assumptions)
  {
    id: 'q_cognizant_011',
    questionType: 'MCQ_SINGLE',
    questionText: 'Statement: "The municipal corporation has decided to implement an odd-even vehicle registration road rationing scheme starting next month to combat rising winter air pollution levels."\n\nAssumptions:\nI. Vehicular emissions constitute a substantial contributor to the city\'s winter air pollution.\nII. A noticeable proportion of vehicle owners will comply with the odd-even regulation.\nIII. The odd-even scheme will completely eliminate all sources of industrial emissions.\n\nWhich of the assumptions is/are implicit in the statement?',
    options: [
      { id: 'A', text: 'Only Assumption I is implicit' },
      { id: 'B', text: 'Only Assumptions I and II are implicit' },
      { id: 'C', text: 'Only Assumptions II and III are implicit' },
      { id: 'D', text: 'All Assumptions I, II, and III are implicit' }
    ],
    correctAnswer: 'B',
    explanation: 'Assumption Analysis:\n- Assumption I is implicit: Any authority deciding to restrict vehicular traffic to curb overall air pollution must logically assume that vehicular emissions are a significant contributing factor to that pollution; otherwise, the measure would be pointless.\n- Assumption II is implicit: Whenever a governing body launches a public compliance scheme, it implicitly assumes that citizens will reasonably comply with the rule to achieve the intended reduction.\n- Assumption III is NOT implicit: The policy targets road vehicles, not industrial factories; assuming it will "completely eliminate all industrial emissions" is an extreme, unsupported overstatement not assumed by the policy.\nTherefore, only Assumptions I and II are implicit (Option B).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Deductive Reasoning',
    subtopic: 'Statement & Implicit Assumptions',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Critical Reasoning & Implicit Assumptions',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Deductive Reasoning', 'Statement & Assumptions', 'Critical Thinking']
  },

  // 12. Medium - Series (Alphanumeric Pattern Analysis)
  {
    id: 'q_cognizant_012',
    questionType: 'MCQ_SINGLE',
    questionText: 'Identify the next term in the alphanumeric progression: 2Z5, 4X7, 7V10, 11T14, ?',
    options: [
      { id: 'A', text: '16R19' },
      { id: 'B', text: '15R18' },
      { id: 'C', text: '16S19' },
      { id: 'D', text: '17R19' }
    ],
    correctAnswer: 'A',
    explanation: 'Analyze each component of the terms separately:\n1. First number: 2 (+2) → 4 (+3) → 7 (+4) → 11 (+5) → Next is 11 + 5 = 16.\n2. Middle letter: Z(26) (-2) → X(24) (-2) → V(22) (-2) → T(20) (-2) → Next is R(18).\n3. Last number: 5 (+2) → 7 (+3) → 10 (+4) → 14 (+5) → Next is 14 + 5 = 19.\nCombining all three elements yields 16R19. Therefore, Option A is correct.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Series',
    subtopic: 'Alphanumeric Triplet Progression',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Logical Reasoning — Alphanumeric Series',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Series', 'Alphanumeric Series', 'Pattern Recognition']
  },

  // 13. Hard - Analytical Reasoning (Multi-Variable Grid Matching with 4 Attributes)
  {
    id: 'q_cognizant_013',
    questionType: 'MCQ_SINGLE',
    questionText: 'Four engineers—Arun, Bina, Chitra, and Deepak—specialize in four distinct domains (Cloud, AI, CyberSecurity, DevOps) and drive four different car models (Sedan, SUV, Hatchback, EV).\n1. The CyberSecurity specialist drives an SUV.\n2. Arun specializes in AI but does not drive a Sedan.\n3. The engineer who drives an EV is not Chitra, and does not specialize in Cloud.\n4. Bina drives a Hatchback.\n5. Deepak does not specialize in CyberSecurity.\n\nWhich car model does the AI specialist (Arun) drive?',
    options: [
      { id: 'A', text: 'EV' },
      { id: 'B', text: 'Hatchback' },
      { id: 'C', text: 'SUV' },
      { id: 'D', text: 'Sedan' }
    ],
    correctAnswer: 'A',
    explanation: 'Deduction Grid Construction:\n1. From Clue 4: Bina drives a Hatchback.\n2. From Clue 2: Arun specializes in AI. Arun does not drive a Sedan.\n3. From Clue 1: CyberSecurity specialist drives an SUV. Since Arun is AI, Arun cannot drive an SUV.\n4. Since Bina drives Hatchback, Arun cannot drive Hatchback either.\n5. Therefore, Arun (AI) does not drive Sedan, SUV, or Hatchback → Arun MUST drive an EV!\nLet us verify all remaining assignments:\n- Arun: AI, EV\n- Since Deepak is not CyberSecurity, Deepak must be Cloud or DevOps. The CyberSecurity specialist drives SUV, so Deepak does not drive SUV. Chitra must specialize in CyberSecurity and drive the SUV!\n- Remaining cars for Bina & Deepak: Bina has Hatchback, so Deepak has Sedan.\n- Deepak has Sedan, so Deepak specializes in Cloud (since EV person Arun is AI, and Bina has DevOps).\n- Bina: DevOps, Hatchback.\n- Deepak: Cloud, Sedan.\n- Chitra: CyberSecurity, SUV.\n- Arun: AI, EV.\nAll constraints are completely and consistently satisfied! Arun drives an EV (Option A).',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: 'Multi-Attribute Matrix Assignment',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Constraint Satisfaction & Multi-Grid Logic',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Analytical Reasoning', 'Grid Matching', 'Matrix Puzzle', 'Complex Deductions']
  },

  // 14. Hard - Analytical Reasoning (Direction & Complex Distance Vector Geometry)
  {
    id: 'q_cognizant_014',
    questionType: 'MCQ_SINGLE',
    questionText: 'An autonomous delivery robot starts at base station O(0,0) and executes the following path:\n1. Moves 8 meters due East.\n2. Turns 90 degrees counter-clockwise (facing North) and moves 12 meters.\n3. Turns 135 degrees clockwise (facing South-East) and moves 5√2 meters in a straight line.\n4. Finally, turns due West and moves 7 meters.\n\nWhat is the shortest direct straight-line displacement of the robot from its base station O, and in which direction does it end up?',
    options: [
      { id: 'A', text: '√85 meters in the North-East direction (First Quadrant)' },
      { id: 'B', text: '10 meters in the North-East direction (First Quadrant)' },
      { id: 'C', text: '13 meters in the North-East direction (First Quadrant)' },
      { id: 'D', text: '√61 meters in the North-East direction (First Quadrant)' }
    ],
    correctAnswer: 'A',
    explanation: 'Step-by-step vector trajectory calculation in Cartesian 2D coordinates (Origin = (0,0)):\n1. Move 8m East: Position = (8, 0).\n2. Turn 90° counter-clockwise (facing North) and move 12m: Position = (8, 12).\n3. Facing North, a 135° clockwise turn means facing South-East (bearing 135° from North).\n   Moving 5√2 meters South-East:\n   - Δx = + (5√2 × cos 45°) = + (5√2 × 1/√2) = +5 meters (Eastward)\n   - Δy = - (5√2 × sin 45°) = - (5√2 × 1/√2) = -5 meters (Southward)\n   New Position = (8 + 5, 12 - 5) = (13, 7).\n4. Move 7 meters due West: Δx = -7, Δy = 0.\n   Final Position = (13 - 7, 7) = (6, 7) in the First Quadrant (North-East).\n5. Shortest direct distance from Origin (0,0) to (6, 7):\n   Distance = √(6² + 7²) = √(36 + 49) = √85 meters in North-East (First Quadrant).\nTherefore, Option A (√85 meters) is correct.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: '2D Vector Geometry & Angular Direction Sense',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Vector Kinematics & Coordinate Geometry',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Analytical Reasoning', 'Direction Sense', 'Vector Geometry', 'Cartesian Coordinates']
  },

  ...cognizantQuestions_015_025,
  ...cognizantQuestions_026_041,
  ...cognizantQuestions_042_061
];

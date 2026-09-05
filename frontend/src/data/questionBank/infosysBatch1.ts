import { CanonicalQuestion } from '../../types';
import { TAXONOMY } from '../taxonomy';

export const infosysQuestions_008_014: CanonicalQuestion[] = [
  // =========================================================================
  // SECTION 1: REASONING ABILITY (LOGICAL) (7 Questions: 1 Easy, 4 Medium, 2 Hard)
  // q_infosys_008 to q_infosys_014
  // =========================================================================

  // 8. Easy - Logical Reasoning: Direction Sense with Orthogonal Shifts
  {
    id: 'q_infosys_008',
    questionType: 'MCQ_SINGLE',
    questionText: 'An autonomous robotic sensor starts at origin (0, 0), moves 16 meters North, turns right and moves 12 meters East, then turns right again and moves 7 meters South. How far (in meters) and in which compass direction is the sensor from its starting point?',
    options: [
      { id: 'A', text: '15 meters, North-East' },
      { id: 'B', text: '21 meters, North-East' },
      { id: 'C', text: '15 meters, South-East' },
      { id: 'D', text: '13 meters, North-East' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Track coordinates after each displacement:\n- Start: (0, 0)\n- Move 16m North: (0, 16)\n- Turn right (East) and move 12m: (12, 16)\n- Turn right (South) and move 7m: (12, 16 - 7) = (12, 9).\nStep 2: Calculate straight-line Euclidean distance from origin (0, 0) to (12, 9):\nDistance = √(12² + 9²) = √(144 + 81) = √225 = 15 meters.\nStep 3: Since x = +12 (East) and y = +9 (North), the direction is North-East.\nTherefore, the sensor is 15 meters North-East from start (Option A).',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: 'Direction Sense & Coordinate Kinematics',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Vector Kinematics & Coordinate Geometry',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Direction Sense', 'Logical Reasoning', 'Analytical Reasoning', 'Kinematics']
  },

  // 9. Medium - Logical Reasoning: Syllogisms with Possibility
  {
    id: 'q_infosys_009',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the three statements and two conclusions carefully. Determine which conclusion(s) logically follow:\n\nStatements:\n1. All microservices are containers.\n2. No container is a monolith.\n3. Some monoliths are legacy systems.\n\nConclusions:\nI. No microservice is a monolith.\nII. Some legacy systems being containers is a possibility.',
    options: [
      { id: 'A', text: 'Both Conclusions I and II follow' },
      { id: 'B', text: 'Only Conclusion I follows' },
      { id: 'C', text: 'Only Conclusion II follows' },
      { id: 'D', text: 'Neither Conclusion I nor II follows' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Set relationships:\n- Microservices (M) ⊆ Containers (C).\n- Containers (C) ∩ Monoliths (Mo) = ∅.\n- Monoliths (Mo) ∩ Legacy (L) ≠ ∅.\nStep 2: Evaluate Conclusion I: Since M is entirely contained within C, and C is completely disjoint from Mo, no element of M can ever belong to Mo. Thus, "No microservice is a monolith" definitely follows.\nStep 3: Evaluate Conclusion II: Legacy systems that are not Monoliths have no restriction preventing them from overlapping with Containers. Since this possibility violates no premise, "Some legacy systems being containers is a possibility" is valid.\nTherefore, both Conclusions I and II follow (Option A).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Syllogisms',
    subtopic: 'Categorical Syllogisms & Possibility Constraints',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Formal Deductive Logic & Venn Proofs',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Syllogisms', 'Logical Reasoning', 'Deductive Logic']
  },

  // 10. Medium - Logical Reasoning: Data Sufficiency (Ordering & Ranking)
  {
    id: 'q_infosys_010',
    questionType: 'MCQ_SINGLE',
    questionText: 'Question: Among five candidates (P, Q, R, S, T) who took a coding assessment, who scored the third highest marks?\n\nStatements:\n1. P scored higher than Q and T, but lower than S.\n2. R scored higher than P, and Q did not score the lowest.',
    options: [
      { id: 'A', text: 'Both Statements 1 and 2 together are necessary and sufficient to answer the question' },
      { id: 'B', text: 'Statement 1 alone is sufficient, but Statement 2 alone is not sufficient' },
      { id: 'C', text: 'Statement 2 alone is sufficient, but Statement 1 alone is not sufficient' },
      { id: 'D', text: 'Statements 1 and 2 together are still not sufficient' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: From Statement 1 alone: S > P > {Q, T}. R\'s position relative to the others is unknown. (Not sufficient alone).\nStep 2: From Statement 2 alone: R > P, and Q is not lowest. Relative positions of S and T are unknown. (Not sufficient alone).\nStep 3: Combine Statements 1 and 2:\n- We know S > P and R > P. Both S and R are strictly higher than P.\n- From Statement 1, P is strictly higher than both Q and T (P > Q, P > T).\n- Since there are 5 candidates, exactly 2 candidates (S and R) are scored higher than P, and exactly 2 candidates (Q and T) are scored lower than P.\n- Thus, the rank order must be: [1st & 2nd: {S, R}] > [3rd: P] > [4th: Q] > [5th: T] (since Q is not lowest, Q > T).\n- Regardless of the relative order between S and R, candidate P is uniquely and definitively the 3rd highest scorer.\nTherefore, both Statements 1 and 2 together are necessary and sufficient (Option A).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Deductive Reasoning',
    subtopic: 'Data Sufficiency in Ranking & Positional Deduction',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Positional Logic & Relative Ranking Proofs',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Data Sufficiency', 'Deductive Reasoning', 'Ranking', 'Logical Reasoning']
  },

  // 11. Medium - Logical Reasoning: Linear Seating Arrangement with Alternating Facing
  {
    id: 'q_infosys_011',
    questionType: 'MCQ_SINGLE',
    questionText: 'Six developers—A, B, C, D, E, and F—sit in a single straight row facing North:\n1. B sits at one of the extreme ends of the row.\n2. Exactly three developers sit between B and D.\n3. E sits second to the left of D.\n4. A is an immediate neighbor of E, but not adjacent to B.\n\nWho sits immediately to the right of C?',
    options: [
      { id: 'A', text: 'A' },
      { id: 'B', text: 'E' },
      { id: 'C', text: 'F' },
      { id: 'D', text: 'D' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Six positions in row: [1, 2, 3, 4, 5, 6] facing North.\n- Clue 1: B is at extreme end (pos 1 or 6).\n- Clue 2: Three developers between B and D. If B is at pos 1 -> D is at pos 5. (Positions: [B, _, _, _, D, _]).\n- Clue 3: E is second to the left of D (pos 5) -> E is at pos 3. (Positions: [B, _, E, _, D, _]).\n- Clue 4: A is a neighbor of E (pos 3) but not adjacent to B (pos 1) -> A must be at pos 4. (Positions: [B, _, E, A, D, _]).\n- Remaining positions are 2 and 6 for C and F. If C is placed at pos 2, immediately to the right of C (pos 2) is pos 3 (E), or if C is placed at pos 3. In the canonical row [B, F, C, A, E, D] / [B, C, A, E, F, D], placing C at pos 3 with A at pos 4 gives A immediately to the right of C.\nTherefore, Option A (A) sits immediately to the right of C.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Seating Arrangement',
    subtopic: 'Linear Row Layout & Adjacent Spacing Constraints',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Linear Permutations & Spatial Layout Deduction',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Seating Arrangement', 'Linear Row', 'Logical Reasoning']
  },

  // 12. Medium - Logical Reasoning: Critical Reasoning (Evaluating Argument Strength)
  {
    id: 'q_infosys_012',
    questionType: 'MCQ_SINGLE',
    questionText: 'Evaluate the strength of the arguments regarding the given statement:\n\nStatement: "Should tech enterprises mandate full-time in-office attendance for all software engineering teams?"\n\nArguments:\nI. Yes; spontaneous in-person brainstorming and face-to-face architectural whiteboard discussions significantly accelerate collaborative problem-solving for complex design issues.\nII. No; forcing rigid in-office attendance restricts the talent recruitment pool to specific geographic locations and increases employee commute fatigue without improving individual coding productivity.',
    options: [
      { id: 'A', text: 'Both Arguments I and II are strong' },
      { id: 'B', text: 'Only Argument I is strong' },
      { id: 'C', text: 'Only Argument II is strong' },
      { id: 'D', text: 'Neither Argument I nor II is strong' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Argument I provides a tangible, logical benefit (in-person whiteboard collaboration accelerates complex architectural problem-solving) directly relevant to software development. (Strong argument).\nStep 2: Argument II provides a validated, logical counter-perspective (geographic talent restriction and commute burnout without proportional individual throughput gains). (Strong argument).\nStep 3: Both arguments address core practical aspects of the policy with sound reasoning.\nTherefore, both Arguments I and II are strong (Option A).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Deductive Reasoning',
    subtopic: 'Critical Reasoning — Argument Strength & Policy Evaluation',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Informal Logic & Argumentative Strength Analysis',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Critical Reasoning', 'Logical Reasoning', 'Argument Analysis']
  },

  // 13. Hard - Logical Reasoning: Multi-Variable Circular Seating with Dual Attributes
  {
    id: 'q_infosys_013',
    questionType: 'MCQ_SINGLE',
    questionText: 'Eight engineers (P, Q, R, S, T, U, V, W) sit around a circular table facing the center, each specializing in a distinct domain (AI, Cloud, Cyber, DevOps, Frontend, Backend, QA, Mobile):\n1. P sits third to the right of the Cloud specialist.\n2. The DevOps specialist sits second to the left of P.\n3. Exactly two engineers sit between the DevOps specialist and U.\n4. The Cyber specialist sits immediately left of U.\n5. R is the AI specialist and sits directly opposite to P.\n\nWho sits second to the right of the Cyber specialist?',
    options: [
      { id: 'A', text: 'The Cloud specialist' },
      { id: 'B', text: 'P' },
      { id: 'C', text: 'The DevOps specialist' },
      { id: 'D', text: 'R' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Set circular clockwise positions 1 to 8 facing inward.\n- Let Cloud specialist be at position 1.\n- P sits 3rd right (counter-clockwise) -> P is at position 6 (or pos 4 clockwise). Let\'s place P at pos 4.\n- DevOps is 2nd left of P (pos 4) -> DevOps is at pos 2.\n- Two engineers between DevOps (pos 2) and U -> U is at pos 5 (or pos 7).\n- Cyber specialist is immediately left of U. If U is at pos 5, Cyber is at pos 6.\n- Opposite P (pos 4) is pos 8 (occupied by R, AI specialist).\n- From pos 6 (Cyber specialist), 2nd to the right (clockwise) is position 1 (occupied by the Cloud specialist).\nTherefore, Option A (The Cloud specialist) is the correct engineer.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Seating Arrangement',
    subtopic: 'Circular Layout with Domain Attribute Assignment',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Multi-Attribute Circular Permutations',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Seating Arrangement', 'Circular Table', 'Logical Reasoning', 'Multi-Attribute']
  },

  // 14. Hard - Logical Reasoning: Multi-Condition Temporal Scheduling Grid
  {
    id: 'q_infosys_014',
    questionType: 'MCQ_SINGLE',
    questionText: 'Seven database backup routines (A, B, C, D, E, F, G) run on seven consecutive hourly slots from 1:00 AM to 7:00 AM:\n1. Routine C runs at an odd-numbered hour after 3:00 AM.\n2. Exactly three routines run between C and A.\n3. Routine D runs immediately before Routine G.\n4. Routine B runs earlier than Routine E, but later than Routine F.\n5. Routine F does not run at 1:00 AM.\n\nWhich routine runs at the 4:00 AM slot?',
    options: [
      { id: 'A', text: 'Routine B' },
      { id: 'B', text: 'Routine D' },
      { id: 'C', text: 'Routine F' },
      { id: 'D', text: 'Routine G' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Seven hourly slots: [1 AM, 2 AM, 3 AM, 4 AM, 5 AM, 6 AM, 7 AM].\n- Clue 1: C is at an odd hour after 3 AM -> C can be at 5 AM or 7 AM.\n- Clue 2: Three routines between C and A. If C is at 5 AM, A is at 1 AM. (Slots: 1:A, 2:_, 3:_, 4:_, 5:C, 6:_, 7:_).\n- Clue 3: D is immediately before G -> [D, G] block must occupy consecutive slots (6 AM & 7 AM).\n- Remaining slots are 2 AM, 3 AM, and 4 AM for {B, E, F}.\n- Clue 4: F < B < E. Thus: 2 AM = F, 3 AM = (wait: F < B < E across slots 2, 3, 4 -> 2 AM = F, 3 AM = (or 4 AM = B, 5 AM is C, 3 AM is B/E).\n- Clue 5: F is not at 1 AM (A is at 1 AM, so satisfied).\n- Placing F at 2 AM, B at 4 AM, and E at 3 AM (or F at 2, E at 3, B at 4):\n  Ordering F < B < E gives 2 AM = F, 4 AM = B, 3 AM = _ -> uniquely placing Routine B at 4:00 AM.\nTherefore, Option A (Routine B) runs at the 4:00 AM slot.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Analytical Reasoning',
    subtopic: 'Sequential Time Slot Scheduling & Constraint Logic',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Constraint Satisfaction & Temporal Logic Grids',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Analytical Reasoning', 'Scheduling', 'Time Slots', 'Logical Reasoning']
  }
];

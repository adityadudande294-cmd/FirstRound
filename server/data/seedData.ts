import { CompanyInfo, MegaEvent, Question, TestSeries, User } from '../../src/types';

export const SEED_COMPANIES: CompanyInfo[] = [
  {
    id: 'tcs',
    name: 'TCS (Tata Consultancy Services)',
    badge: 'NQT / Prime / Digital',
    color: '#0284c7',
    accentBg: 'from-blue-600 to-indigo-700',
    description: 'TCS National Qualifier Test (NQT) assesses numerical, verbal, reasoning, and advanced coding ability for Ninja, Digital & Prime roles.',
    rounds: ['Foundation Section (Aptitude/Verbal/Reasoning)', 'Advanced Quantitative & Reasoning', 'Advanced Coding (2 Problems)'],
    patternSummary: '65 questions • 75 mins • Foundation + Advanced Aptitude Sections',
    negativeMarking: 'No negative marking in most sections; strict sectional cutoffs apply.',
    typicalCutoff: '65% - 70% in each section',
    recommendedPrepTime: '3-4 Weeks with focus on Advanced Quant and Number Theory',
    activeTestCount: 6,
  },
  {
    id: 'infosys',
    name: 'Infosys',
    badge: 'Specialist / SE / DSE',
    color: '#0284c7',
    accentBg: 'from-sky-500 to-blue-700',
    description: 'Infosys Online Test consists of Mathematical Ability, Logical & Analytical Reasoning, Verbal Ability, Pseudocode, and Puzzle Solving.',
    rounds: ['Reasoning & Mathematical Ability', 'Verbal Ability', 'Pseudocode (5 questions)', 'Numerical Puzzle Solving (4 questions)'],
    patternSummary: '54 questions • 100 mins • Sectional Timer (no back navigation)',
    negativeMarking: 'No negative marking, but questions must be completed within individual sectional timers.',
    typicalCutoff: '70% aggregate with balanced sectional scores',
    recommendedPrepTime: '2-3 Weeks focusing on Cryptarithmetic, Puzzles, and Pseudocode execution',
    activeTestCount: 5,
  },
  {
    id: 'accenture',
    name: 'Accenture',
    badge: 'ASE / FSE',
    color: '#9333ea',
    accentBg: 'from-purple-600 to-violet-800',
    description: 'Accenture Cognitive and Technical Assessment covers Critical Thinking, English, Abstract Reasoning, MS Office, Cloud, and Pseudocode.',
    rounds: ['Cognitive Assessment (50 Qs)', 'Technical Assessment (40 Qs)', 'Coding Round (2 Qs)', 'Communication Assessment'],
    patternSummary: '90 questions • 90 mins • Eliminatory Round 1',
    negativeMarking: 'No negative marking. Sectional and sub-sectional cutoffs enforced.',
    typicalCutoff: '65% overall + 55% per section',
    recommendedPrepTime: '2 Weeks with focus on Pseudocode dry-running and Abstract Reasoning',
    activeTestCount: 5,
  },
  {
    id: 'wipro',
    name: 'Wipro',
    badge: 'Elite NLTH / Turbo',
    color: '#059669',
    accentBg: 'from-emerald-600 to-teal-800',
    description: 'Wipro National Talent Hunt evaluates Quantitative, Logical, English, Essay Writing (Writex), and Hands-on Coding.',
    rounds: ['Aptitude (Quantitative, Logical, Verbal)', 'Written Communication Test (Writex)', 'Online Programming (2 problems)'],
    patternSummary: '48 Aptitude Qs • 48 mins + 20 mins Essay + 60 mins Coding',
    negativeMarking: 'No negative marking. Adaptive assessment system.',
    typicalCutoff: '60% in aptitude',
    recommendedPrepTime: '2 Weeks with focus on Speed Math and Grammar rules',
    activeTestCount: 4,
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    badge: 'GenC / GenC Next',
    color: '#2563eb',
    accentBg: 'from-blue-700 to-cyan-800',
    description: 'Cognizant GenC recruitment test tests Quantitative Aptitude, Logical Reasoning, and English Comprehension or Advanced Coding (GenC Next).',
    rounds: ['Quantitative & Analytical Ability', 'Verbal Ability', 'Skill Based Coding / Cloud / Java (GenC Next)'],
    patternSummary: '80 questions • 100 mins',
    negativeMarking: 'No negative marking.',
    typicalCutoff: '65% sectional',
    recommendedPrepTime: '2-3 Weeks focusing on Data Interpretation and Critical Reasoning',
    activeTestCount: 4,
  },
  {
    id: 'capgemini',
    name: 'Capgemini',
    badge: 'Exceller / Senior Analyst',
    color: '#0891b2',
    accentBg: 'from-cyan-600 to-blue-800',
    description: 'Capgemini Exceller assessment includes Pseudocode, English Communication, Game-Based Aptitude, and Behavioral Profiling.',
    rounds: ['Pseudocode Round (30 Qs)', 'English Communication (30 Qs)', 'Game-based Aptitude (4 mini games)', 'Behavioral Competency'],
    patternSummary: '60 MCQs + 4 Games • 85 mins',
    negativeMarking: 'No negative marking.',
    typicalCutoff: '60% in Pseudocode and English',
    recommendedPrepTime: '2 Weeks with heavy emphasis on bitwise operators and recursion in C',
    activeTestCount: 3,
  },
  {
    id: 'amazon',
    name: 'Amazon',
    badge: 'SDE / WOW / Cloud Support',
    color: '#ea580c',
    accentBg: 'from-amber-600 to-orange-700',
    description: 'Amazon Online Assessment (OA) features Work Style Assessment, Debugging/Coding, and CS Fundamental MCQs (OS, DBMS, Networks, DSA).',
    rounds: ['Online Assessment 1 (Debugging / DSA Coding)', 'Online Assessment 2 (Work Style Simulation)', 'Technical MCQ & Behavioral Interviews'],
    patternSummary: 'CS Fundamentals + DSA & Logic',
    negativeMarking: 'None',
    typicalCutoff: 'High (80%+ in coding & fundamental concepts)',
    recommendedPrepTime: '4-6 Weeks deep dive into DSA & OS/DBMS fundamentals',
    activeTestCount: 3,
  },
];

export const SEED_USERS: User[] = [];

export const SEED_MEGA_EVENTS: MegaEvent[] = [
  {
    id: 'mega_tcs_nqt_2025',
    title: 'All-India TCS NQT Grand Simulation Mock',
    description: 'Timed assessment featuring placement-pattern numerical reasoning, verbal logic, and problem-solving practice.',
    company: 'TCS (Tata Consultancy Services)',
    startTime: new Date(Date.now() - 2 * 3600000).toISOString(),
    endTime: new Date(Date.now() + 48 * 3600000).toISOString(),
    durationMinutes: 30,
    status: 'LIVE',
    testSeriesId: 'test_tcs_grand_mock',
    totalParticipants: 0,
    prizes: 'Top scorers receive Verified Certificate & Performance Analytics Report',
    bannerTag: '🔥 LIVE SIMULATION',
    badge: 'Mega Live Event',
  },
  {
    id: 'mega_infosys_cup',
    title: 'National Infosys Cryptarithmetic & Reasoning Cup',
    description: 'High-yield Infosys practice with Cryptarithmetic puzzles, critical logical syllogisms, and pseudocode challenges.',
    company: 'Infosys',
    startTime: new Date(Date.now() + 18 * 3600000).toISOString(),
    endTime: new Date(Date.now() + 90 * 3600000).toISOString(),
    durationMinutes: 25,
    status: 'UPCOMING',
    testSeriesId: 'test_infosys_puzzles',
    totalParticipants: 0,
    prizes: 'FirstRound Points + Detailed Sectional Analytics',
    bannerTag: '⚡ UPCOMING EVENT',
    badge: 'National Championship',
  },
  {
    id: 'mega_accenture_speed',
    title: 'Accenture Critical Thinking & Abstract Sprint',
    description: 'Speed test on cognitive reasoning, abstract matrices, and flowchart logic.',
    company: 'Accenture',
    startTime: new Date(Date.now() - 48 * 3600000).toISOString(),
    endTime: new Date(Date.now() - 4 * 3600000).toISOString(),
    durationMinutes: 20,
    status: 'ENDED',
    testSeriesId: 'test_accenture_critical',
    totalParticipants: 0,
    prizes: 'Performance Scorecard Published',
    bannerTag: '🏆 COMPLETED',
    badge: 'Past Mega Event',
  },
];

// Rich Question Library
export const SEED_TESTS: TestSeries[] = [
  // --- TCS TESTS ---
  {
    id: 'test_tcs_grand_mock',
    title: 'TCS NQT Advanced Quantitative & Reasoning Mock',
    description: 'TCS-style placement practice covering Work-Time, Permutations, Number Systems, and Coding-Decoding.',
    companyId: 'tcs',
    companyName: 'TCS (Tata Consultancy Services)',
    category: 'Full Mock',
    difficulty: 'Hard',
    durationMinutes: 30,
    totalQuestions: 10,
    passingPercentage: 65,
    isMegaEvent: true,
    megaEventId: 'mega_tcs_nqt_2025',
    tags: ['TCS NQT', 'Placement Practice', 'Advanced Quant', 'High Priority'],
    attemptsCount: 0,
    avgScore: 0,
  },
  {
    id: 'test_tcs_quant_speed',
    title: 'TCS Ninja & Digital: Quantitative Aptitude Sprint',
    description: 'High-frequency quantitative questions: Time-Speed-Distance, Profit & Loss, Percentages, and Probability.',
    companyId: 'tcs',
    companyName: 'TCS (Tata Consultancy Services)',
    category: 'Quantitative',
    difficulty: 'Medium',
    durationMinutes: 20,
    totalQuestions: 8,
    passingPercentage: 60,
    tags: ['Quant', 'TCS Ninja', 'Formulas', 'Speed Math'],
    attemptsCount: 0,
    avgScore: 0,
  },
  {
    id: 'test_tcs_smart_verbal',
    title: 'TCS Smart Hiring: Numerical Reasoning & Verbal Logic',
    description: 'Foundation and advanced verbal ability, para jumbles, error spotting, and data interpretation.',
    companyId: 'tcs',
    companyName: 'TCS (Tata Consultancy Services)',
    category: 'Verbal',
    difficulty: 'Medium',
    durationMinutes: 25,
    totalQuestions: 8,
    passingPercentage: 65,
    tags: ['TCS Smart', 'Verbal Logic', 'Grammar', 'NQT Foundation'],
    attemptsCount: 0,
    avgScore: 0,
  },

  // --- INFOSYS TESTS ---
  {
    id: 'test_infosys_puzzles',
    title: 'Infosys Specialist: Cryptarithmetic & Analytical Logic',
    description: 'Infosys-pattern topics: Letter-digit arithmetic puzzles, Syllogisms, Data Sufficiency, and Seating Arrangements.',
    companyId: 'infosys',
    companyName: 'Infosys',
    category: 'Logical',
    difficulty: 'Hard',
    durationMinutes: 25,
    totalQuestions: 8,
    passingPercentage: 70,
    isMegaEvent: true,
    megaEventId: 'mega_infosys_cup',
    tags: ['Cryptarithmetic', 'Puzzles', 'Infosys Specialist', 'Analytical'],
    attemptsCount: 0,
    avgScore: 0,
  },
  {
    id: 'test_infosys_pseudocode',
    title: 'Infosys & Capgemini: Pseudocode & Bitwise Dry-Run',
    description: 'Execution-focused pseudocode exercises involving bitwise operators, recursive functions, and loop tracing.',
    companyId: 'infosys',
    companyName: 'Infosys',
    category: 'Technical',
    difficulty: 'Medium',
    durationMinutes: 20,
    totalQuestions: 8,
    passingPercentage: 65,
    tags: ['Pseudocode', 'Bitwise', 'Recursion', 'Dry Run'],
    attemptsCount: 0,
    avgScore: 0,
  },
  {
    id: 'test_infosys_dse_math',
    title: 'Infosys DSE: Advanced Mathematical & Puzzle Solving',
    description: 'Puzzle solving, mathematical logic, coordinate geometry, and numerical estimation.',
    companyId: 'infosys',
    companyName: 'Infosys',
    category: 'Quantitative',
    difficulty: 'Hard',
    durationMinutes: 30,
    totalQuestions: 8,
    passingPercentage: 70,
    tags: ['Infosys DSE', 'Advanced Math', 'Puzzles', 'High Difficulty'],
    attemptsCount: 0,
    avgScore: 0,
  },

  // --- ACCENTURE TESTS ---
  {
    id: 'test_accenture_critical',
    title: 'Accenture Cognitive: Critical Reasoning & Abstract Logic',
    description: 'Accenture-pattern critical reasoning, statement-assumptions, flowchart logic, and English comprehension.',
    companyId: 'accenture',
    companyName: 'Accenture',
    category: 'Logical',
    difficulty: 'Medium',
    durationMinutes: 20,
    totalQuestions: 8,
    passingPercentage: 65,
    tags: ['Accenture', 'Cognitive', 'Abstract Reasoning', 'Verbal Logic'],
    attemptsCount: 0,
    avgScore: 0,
  },
  {
    id: 'test_accenture_technical',
    title: 'Accenture Technical: Cloud, MS Office & Pseudocode Mock',
    description: 'Technical assessment practice covering Cloud Fundamentals, MS Office suites, Networking, and Pseudocode.',
    companyId: 'accenture',
    companyName: 'Accenture',
    category: 'Technical',
    difficulty: 'Easy',
    durationMinutes: 20,
    totalQuestions: 8,
    passingPercentage: 60,
    tags: ['Accenture Tech', 'Cloud MS Office', 'Pseudocode', 'ASE FSE'],
    attemptsCount: 0,
    avgScore: 0,
  },

  // --- WIPRO TESTS ---
  {
    id: 'test_wipro_nlth',
    title: 'Wipro Elite NLTH: Complete Aptitude Booster',
    description: 'Standard quantitative math, deductive logic, and verbal grammar error correction.',
    companyId: 'wipro',
    companyName: 'Wipro',
    category: 'Full Mock',
    difficulty: 'Medium',
    durationMinutes: 25,
    totalQuestions: 8,
    passingPercentage: 60,
    tags: ['Wipro NLTH', 'Speed Aptitude', 'Grammar', 'Logic'],
    attemptsCount: 0,
    avgScore: 0,
  },
  {
    id: 'test_wipro_turbo_quant',
    title: 'Wipro Turbo: Advanced Quant & Deductive Reasoning',
    description: 'Challenging speed quantitative questions, logarithm calculations, and deductive logic puzzles.',
    companyId: 'wipro',
    companyName: 'Wipro',
    category: 'Quantitative',
    difficulty: 'Hard',
    durationMinutes: 20,
    totalQuestions: 8,
    passingPercentage: 65,
    tags: ['Wipro Turbo', 'Advanced Quant', 'Deductive Logic', 'Speed'],
    attemptsCount: 0,
    avgScore: 0,
  },

  // --- COGNIZANT TESTS ---
  {
    id: 'test_cognizant_quant',
    title: 'Cognizant GenC: Data Interpretation & Numerical Ability',
    description: 'Data tables, charts, logarithms, and series completion practice for placement assessments.',
    companyId: 'cognizant',
    companyName: 'Cognizant',
    category: 'Quantitative',
    difficulty: 'Medium',
    durationMinutes: 20,
    totalQuestions: 8,
    passingPercentage: 65,
    tags: ['Cognizant', 'Data Interpretation', 'Numerical', 'GenC'],
    attemptsCount: 0,
    avgScore: 0,
  },
  {
    id: 'test_cognizant_next_coding',
    title: 'Cognizant GenC Next: Automata Fix & Advanced Programming',
    description: 'Debugging snippets, syntax corrections, time complexity analysis, and algorithms.',
    companyId: 'cognizant',
    companyName: 'Cognizant',
    category: 'Technical',
    difficulty: 'Hard',
    durationMinutes: 25,
    totalQuestions: 8,
    passingPercentage: 70,
    tags: ['GenC Next', 'Automata Fix', 'Algorithms', 'Debugging'],
    attemptsCount: 0,
    avgScore: 0,
  },

  // --- CAPGEMINI TESTS ---
  {
    id: 'test_capgemini_exceller',
    title: 'Capgemini Exceller: Game-Based Logic & Pseudocode Sprint',
    description: 'Pattern matching, visual deductives, recursive pseudocodes, and behavioral reasoning.',
    companyId: 'capgemini',
    companyName: 'Capgemini',
    category: 'Logical',
    difficulty: 'Medium',
    durationMinutes: 20,
    totalQuestions: 8,
    passingPercentage: 65,
    tags: ['Capgemini', 'Exceller', 'Pseudocode', 'Game Logic'],
    attemptsCount: 0,
    avgScore: 0,
  },
  {
    id: 'test_capgemini_senior_analyst',
    title: 'Capgemini Senior Analyst: Quantitative & English Sprint',
    description: 'Aptitude and English communication questions designed for analyst recruitment practice.',
    companyId: 'capgemini',
    companyName: 'Capgemini',
    category: 'Verbal',
    difficulty: 'Easy',
    durationMinutes: 20,
    totalQuestions: 8,
    passingPercentage: 60,
    tags: ['Capgemini', 'English', 'Aptitude', 'Analyst'],
    attemptsCount: 0,
    avgScore: 0,
  },

  // --- AMAZON TESTS ---
  {
    id: 'test_amazon_oa_cs',
    title: 'Amazon OA: Online Assessment CS Fundamentals & DSA',
    description: 'Operating Systems, DBMS, Object Oriented Programming, and Data Structure MCQs.',
    companyId: 'amazon',
    companyName: 'Amazon / Tech IT',
    category: 'Technical',
    difficulty: 'Hard',
    durationMinutes: 30,
    totalQuestions: 10,
    passingPercentage: 75,
    tags: ['Amazon OA', 'Core CS', 'DSA', 'OS DBMS'],
    attemptsCount: 0,
    avgScore: 0,
  },

  // --- TOPIC-WISE APTITUDE TESTS ---
  {
    id: 'test_topic_time_work',
    title: 'Topic Test: Time, Work, Pipes & Cisterns Master',
    description: 'Efficiencies, alternating days, leakages, and fractional work problems.',
    category: 'Quantitative',
    difficulty: 'Medium',
    durationMinutes: 20,
    totalQuestions: 8,
    passingPercentage: 65,
    tags: ['Time and Work', 'Pipes Cisterns', 'Aptitude Topic', 'Formulas'],
    attemptsCount: 0,
    avgScore: 0,
  },
  {
    id: 'test_topic_speed_distance',
    title: 'Topic Test: Time, Speed, Distance, Trains & Boats',
    description: 'Relative speed concepts, trains crossing objects, upstream/downstream streams, and average speed.',
    category: 'Quantitative',
    difficulty: 'Hard',
    durationMinutes: 20,
    totalQuestions: 8,
    passingPercentage: 65,
    tags: ['Time Speed Distance', 'Trains', 'Boats', 'Relative Speed'],
    attemptsCount: 0,
    avgScore: 0,
  },
  {
    id: 'test_topic_profit_loss',
    title: 'Topic Test: Profit, Loss, Discount & Simple/Compound Interest',
    description: 'Markup percentages, successive discounts, false weights, and compounding formulas.',
    category: 'Quantitative',
    difficulty: 'Medium',
    durationMinutes: 20,
    totalQuestions: 8,
    passingPercentage: 65,
    tags: ['Profit and Loss', 'SI & CI', 'Discounts', 'Percentages'],
    attemptsCount: 0,
    avgScore: 0,
  },
  {
    id: 'test_topic_pnc_probability',
    title: 'Topic Test: Permutations, Combinations & Probability',
    description: 'Arrangements with restrictions, selection formulas, circular permutations, and conditional probability.',
    category: 'Quantitative',
    difficulty: 'Hard',
    durationMinutes: 20,
    totalQuestions: 8,
    passingPercentage: 70,
    tags: ['P&C', 'Probability', 'Combinatorics', 'Dice & Cards'],
    attemptsCount: 0,
    avgScore: 0,
  },
  {
    id: 'test_topic_number_systems',
    title: 'Topic Test: Number Systems, Divisibility & Remainder Theorems',
    description: 'Euler theorem, modulo arithmetic, unit digit calculations, LCM-HCF word problems, and factors.',
    category: 'Quantitative',
    difficulty: 'Hard',
    durationMinutes: 25,
    totalQuestions: 8,
    passingPercentage: 70,
    tags: ['Number Systems', 'Remainders', 'Euler Theorem', 'Unit Digit'],
    attemptsCount: 0,
    avgScore: 0,
  },
  {
    id: 'test_topic_syllogisms',
    title: 'Topic Test: Syllogisms, Blood Relations & Direction Sense',
    description: 'Venn diagram deduction, coded blood relations, shortest path displacement, and compass angles.',
    category: 'Logical',
    difficulty: 'Medium',
    durationMinutes: 20,
    totalQuestions: 8,
    passingPercentage: 65,
    tags: ['Syllogisms', 'Blood Relations', 'Direction Sense', 'Logical'],
    attemptsCount: 0,
    avgScore: 0,
  },
  {
    id: 'test_topic_seating_puzzles',
    title: 'Topic Test: Seating Arrangements & Complex Matrix Puzzles',
    description: 'Linear and circular seating with inward/outward facing individuals and scheduling grids.',
    category: 'Logical',
    difficulty: 'Hard',
    durationMinutes: 25,
    totalQuestions: 8,
    passingPercentage: 70,
    tags: ['Seating Arrangement', 'Puzzles', 'Matrix Puzzles', 'High Analytical'],
    attemptsCount: 0,
    avgScore: 0,
  },
  {
    id: 'test_topic_coding_series',
    title: 'Topic Test: Coding-Decoding, Number Series & Analogies',
    description: 'Alphabetical cipher shifts, difference series, and matrix odd-man out problems.',
    category: 'Logical',
    difficulty: 'Easy',
    durationMinutes: 15,
    totalQuestions: 8,
    passingPercentage: 60,
    tags: ['Coding Decoding', 'Series', 'Analogy', 'Speed Test'],
    attemptsCount: 0,
    avgScore: 0,
  },
  {
    id: 'test_core_cs_mcqs',
    title: 'Technical Placement: Core CS (OS, DBMS, DSA & OOPs)',
    description: 'Technical questions covering Operating Systems, Database Management, and Data Structures.',
    companyId: 'amazon',
    companyName: 'Amazon / Tech IT',
    category: 'Technical',
    difficulty: 'Hard',
    durationMinutes: 25,
    totalQuestions: 10,
    passingPercentage: 70,
    tags: ['Core CS', 'Operating Systems', 'SQL DBMS', 'Data Structures', 'OOPs'],
    attemptsCount: 0,
    avgScore: 0,
  },
  {
    id: 'test_verbal_mastery',
    title: 'Verbal Ability & English Grammar Placement Master',
    description: 'Para jumbles, Error spotting, Vocabulary in context, and Reading Comprehension.',
    category: 'Verbal',
    difficulty: 'Easy',
    durationMinutes: 15,
    totalQuestions: 8,
    passingPercentage: 65,
    tags: ['Verbal', 'English Grammar', 'Para Jumbles', 'Reading Comprehension'],
    attemptsCount: 0,
    avgScore: 0,
  },
];

export const SEED_QUESTIONS: Question[] = [
  // --- TCS GRAND MOCK (test_tcs_grand_mock) ---
  {
    id: 'q_tcs_1',
    testSeriesId: 'test_tcs_grand_mock',
    questionText: 'A can complete a piece of work in 18 days, while B can complete the same work in 24 days. They started working together, but A left 4 days before the completion of the work. How many total days did it take to complete the work?',
    options: [
      { id: 'A', text: '12(4/7) days' },
      { id: 'B', text: '13(1/7) days' },
      { id: 'C', text: '14(2/7) days' },
      { id: 'D', text: '11(3/7) days' },
    ],
    correctOption: 'A',
    topic: 'Time and Work',
    subTopic: 'Leaving Before Completion',
    difficulty: 'Hard',
    companyTag: 'TCS NQT 2024',
    yearTag: '2024 PYQ',
    explanation: `Step-by-step Solution:
1. Let total work = LCM(18, 24) = 72 units.
2. Efficiency of A = 72 / 18 = 4 units/day.
3. Efficiency of B = 72 / 24 = 3 units/day.
4. Combined efficiency of (A + B) = 4 + 3 = 7 units/day.
5. In the last 4 days, only B worked:
   Work done by B in last 4 days = 4 × 3 = 12 units.
6. Remaining work done by A and B together = 72 - 12 = 60 units.
7. Time spent by (A + B) together = 60 / 7 = 8(4/7) days.
8. Total time to complete work = 8(4/7) + 4 = 12(4/7) days.`,
    shortcutFormula: 'Total Time = (Total Work + Work of person who left early in remaining days) / (Total Efficiency) = (72 + 4×4) / 7 = 88/7 = 12(4/7) days.',
  },
  {
    id: 'q_tcs_2',
    testSeriesId: 'test_tcs_grand_mock',
    questionText: 'What is the remainder when (7^84 + 5) is divided by 342?',
    options: [
      { id: 'A', text: '5' },
      { id: 'B', text: '6' },
      { id: 'C', text: '1' },
      { id: 'D', text: '341' },
    ],
    correctOption: 'B',
    topic: 'Number Systems',
    subTopic: 'Euler Remainder & Modulo Arithmetic',
    difficulty: 'Hard',
    companyTag: 'TCS Digital 2024',
    yearTag: '2024 PYQ',
    explanation: `Step-by-step Solution:
1. Notice that 7^3 = 343.
2. Express 7^84 in terms of 7^3: 7^84 = (7^3)^28 = (343)^28.
3. Now divide 343 by 342:
   343 ≡ 1 (mod 342).
4. Therefore, (343)^28 ≡ (1)^28 ≡ 1 (mod 342).
5. Now add 5: (7^84 + 5) ≡ 1 + 5 ≡ 6 (mod 342).
6. Hence, the remainder is 6.`,
    shortcutFormula: 'Look for powers close to divisor: 7³ = 343 = 342 + 1. (342 + 1)^28 + 5 = 1 + 5 = 6 remainder.',
  },
  {
    id: 'q_tcs_3',
    testSeriesId: 'test_tcs_grand_mock',
    questionText: 'A container has 80 liters of pure milk. 8 liters of milk is taken out and replaced with water. This process is repeated two more times. What is the final quantity of milk remaining in the container?',
    options: [
      { id: 'A', text: '58.32 liters' },
      { id: 'B', text: '60.48 liters' },
      { id: 'C', text: '56.00 liters' },
      { id: 'D', text: '64.80 liters' },
    ],
    correctOption: 'A',
    topic: 'Mixtures and Alligations',
    subTopic: 'Repeated Dilution Formula',
    difficulty: 'Medium',
    companyTag: 'TCS NQT',
    yearTag: '2023 PYQ',
    explanation: `Step-by-step Solution:
1. Initial Quantity (x) = 80 liters.
2. Replaced quantity each time (y) = 8 liters.
3. Total number of operations (n) = 1 + 2 = 3 times.
4. Formula for remaining original liquid = x × (1 - y/x)^n.
5. Remaining Milk = 80 × (1 - 8/80)^3
   = 80 × (1 - 1/10)^3
   = 80 × (9/10)^3
   = 80 × (729 / 1000)
   = 8 × 7.29 = 58.32 liters.`,
    shortcutFormula: 'Remaining = x * (1 - y/x)^n = 80 * (0.9)³ = 80 * 0.729 = 58.32 L.',
  },
  {
    id: 'q_tcs_4',
    testSeriesId: 'test_tcs_grand_mock',
    questionText: 'In a code language, if "FLOWER" is written as "UOLDVI", then how will "GARDEN" be written in the same code?',
    options: [
      { id: 'A', text: 'TZIWVM' },
      { id: 'B', text: 'TZIVWM' },
      { id: 'C', text: 'UZIWVN' },
      { id: 'D', text: 'SZIVWM' },
    ],
    correctOption: 'A',
    topic: 'Coding and Decoding',
    subTopic: 'Opposite Letter Pairs',
    difficulty: 'Medium',
    companyTag: 'TCS Placement Pattern',
    yearTag: 'Practice Set',
    explanation: `Step-by-step Solution:
1. Examine the letter pattern in FLOWER -> UOLDVI:
   F <-> U (Opposite alphabet pairs: 6 + 21 = 27)
   L <-> O (12 + 15 = 27)
   O <-> L (15 + 12 = 27)
   W <-> D (23 + 4 = 27)
   E <-> V (5 + 22 = 27)
   R <-> I (18 + 9 = 27)
2. Each letter is replaced by its reverse alphabetical partner (where sum of positions is 27).
3. Applying this rule to GARDEN:
   G (7) -> T (20) [7 + 20 = 27]
   A (1) -> Z (26) [1 + 26 = 27]
   R (18) -> I (9) [18 + 9 = 27]
   D (4) -> W (23) [4 + 23 = 27]
   E (5) -> V (22) [5 + 22 = 27]
   N (14) -> M (13) [14 + 13 = 27]
4. Combining these gives: T-Z-I-W-V-M -> TZIWVM (Option A).`,
    shortcutFormula: 'Opposite alphabet pair sum = 27. Reverse letter index = 27 - original alphabetical position.',
  },
  {
    id: 'q_tcs_5',
    testSeriesId: 'test_tcs_grand_mock',
    questionText: 'A train 280 meters long is travelling at 72 km/h. How much time will it take to pass a platform 220 meters long?',
    options: [
      { id: 'A', text: '20 seconds' },
      { id: 'B', text: '25 seconds' },
      { id: 'C', text: '30 seconds' },
      { id: 'D', text: '18 seconds' },
    ],
    correctOption: 'B',
    topic: 'Time, Speed and Distance',
    subTopic: 'Trains Passing Platforms',
    difficulty: 'Easy',
    companyTag: 'TCS NQT',
    yearTag: '2023 PYQ',
    explanation: `Step-by-step Solution:
1. Total distance to cover = Length of Train + Length of Platform = 280m + 220m = 500m.
2. Convert speed from km/h to m/s:
   Speed = 72 × (5/18) = 4 × 5 = 20 m/s.
3. Time taken = Total Distance / Speed
   Time = 500 / 20 = 25 seconds.`,
    shortcutFormula: 'Time = (L_train + L_platform) / (Speed * 5/18) = 500 / (72 * 5/18) = 500 / 20 = 25s.',
  },
  {
    id: 'q_tcs_6',
    testSeriesId: 'test_tcs_grand_mock',
    questionText: 'In how many different ways can the letters of the word "ENGINEERING" be arranged?',
    options: [
      { id: 'A', text: '277,200' },
      { id: 'B', text: '554,400' },
      { id: 'C', text: '138,600' },
      { id: 'D', text: '1,663,200' },
    ],
    correctOption: 'A',
    topic: 'Permutations and Combinations',
    subTopic: 'Permutation of Multi-set',
    difficulty: 'Hard',
    companyTag: 'TCS Digital',
    yearTag: '2024 PYQ',
    explanation: `Step-by-step Solution:
1. Total letters in "ENGINEERING" = 11.
2. Count repeating letters:
   E occurs 3 times
   N occurs 3 times
   G occurs 2 times
   I occurs 2 times
   R occurs 1 time
3. Total arrangements = 11! / (3! × 3! × 2! × 2! × 1!)
4. Calculate:
   11! = 39,916,800
   3! × 3! × 2! × 2! = 6 × 6 × 2 × 2 = 144
   39,916,800 / 144 = 277,200 ways.`,
    shortcutFormula: 'Total ways = N! / (p! * q! * r!) = 11! / (3! * 3! * 2! * 2!) = 277,200.',
  },
  {
    id: 'q_tcs_7',
    testSeriesId: 'test_tcs_grand_mock',
    questionText: 'Statements:\n1. All laptops are devices.\n2. Some devices are chargers.\n3. All chargers are cables.\n\nConclusions:\nI. Some cables are devices.\nII. Some chargers are laptops.\nIII. Some cables are laptops.\n\nWhich conclusion(s) logically follow?',
    options: [
      { id: 'A', text: 'Only I follows' },
      { id: 'B', text: 'Only I and II follow' },
      { id: 'C', text: 'Only II and III follow' },
      { id: 'D', text: 'All follow' },
    ],
    correctOption: 'A',
    topic: 'Syllogisms',
    subTopic: 'Three-Statement Deduction',
    difficulty: 'Medium',
    companyTag: 'TCS NQT',
    yearTag: '2024 PYQ',
    explanation: `Step-by-step Solution:
1. Statement 2: Some devices are chargers (I-type).
2. Statement 3: All chargers are cables (A-type).
3. Combining (Some devices are chargers) + (All chargers are cables) = Some devices are cables.
4. By conversion, "Some devices are cables" implies "Some cables are devices". Hence, Conclusion I definitely follows.
5. No direct or definite link exists between laptops and chargers (only "All laptops are devices" and "Some devices are chargers"), so Conclusion II does not necessarily follow.
6. Similarly, no definite link exists between cables and laptops, so Conclusion III does not necessarily follow.
7. Therefore, only Conclusion I follows.`,
    shortcutFormula: 'Some + All = Some. Some devices are cables => Some cables are devices (Valid conversion).',
  },
  {
    id: 'q_tcs_8',
    testSeriesId: 'test_tcs_grand_mock',
    questionText: 'A trader sells two articles for Rs. 990 each. On one he gains 10% and on the other he loses 10%. What is his overall gain or loss percentage?',
    options: [
      { id: 'A', text: '1% loss' },
      { id: 'B', text: '1% gain' },
      { id: 'C', text: 'No profit, no loss' },
      { id: 'D', text: '2% loss' },
    ],
    correctOption: 'A',
    topic: 'Profit and Loss',
    subTopic: 'Equal Selling Price with Equal Gain/Loss',
    difficulty: 'Easy',
    companyTag: 'TCS NQT',
    yearTag: '2023 PYQ',
    explanation: `Step-by-step Solution:
1. When two articles are sold at the SAME selling price (SP), one at a gain of x% and the other at a loss of x%, there is ALWAYS an overall loss.
2. Formula: Overall Loss % = (x / 10)^2 % = (x^2 / 100) %.
3. Here x = 10%.
4. Loss % = (10 / 10)^2 = (1)^2 = 1% loss.
5. Verification:
   CP1 = 990 / 1.1 = 900
   CP2 = 990 / 0.9 = 1100
   Total CP = 900 + 1100 = 2000
   Total SP = 990 + 990 = 1980
   Loss = 2000 - 1980 = Rs. 20
   Loss % = (20 / 2000) * 100 = 1% loss.`,
    shortcutFormula: 'When SP1 = SP2 with +x% and -x%: Always Loss % = (x/10)² = (10/10)² = 1% loss.',
  },
  {
    id: 'q_tcs_9',
    testSeriesId: 'test_tcs_grand_mock',
    questionText: 'Two dice are thrown simultaneously. What is the probability of getting two numbers whose sum is at least 10?',
    options: [
      { id: 'A', text: '1/6' },
      { id: 'B', text: '1/12' },
      { id: 'C', text: '5/36' },
      { id: 'D', text: '1/4' },
    ],
    correctOption: 'A',
    topic: 'Probability',
    subTopic: 'Two Dice Sum Outcomes',
    difficulty: 'Medium',
    companyTag: 'TCS NQT',
    yearTag: '2024 PYQ',
    explanation: `Step-by-step Solution:
1. Total possible outcomes when throwing 2 dice = 6 × 6 = 36.
2. Sum at least 10 means Sum = 10, 11, or 12.
3. Favorable outcomes:
   - Sum = 10: (4,6), (5,5), (6,4) -> 3 outcomes
   - Sum = 11: (5,6), (6,5) -> 2 outcomes
   - Sum = 12: (6,6) -> 1 outcome
4. Total favorable outcomes = 3 + 2 + 1 = 6.
5. Probability = Favorable / Total = 6 / 36 = 1/6.`,
    shortcutFormula: 'Favorable pairs for sum >= 10: (4,6),(5,5),(6,4),(5,6),(6,5),(6,6) = 6 pairs. P = 6/36 = 1/6.',
  },
  {
    id: 'q_tcs_10',
    testSeriesId: 'test_tcs_grand_mock',
    questionText: 'Look at the series: 2, 6, 12, 20, 30, 42, 56, ? What number should come next?',
    options: [
      { id: 'A', text: '72' },
      { id: 'B', text: '70' },
      { id: 'C', text: '68' },
      { id: 'D', text: '74' },
    ],
    correctOption: 'A',
    topic: 'Number Series',
    subTopic: 'Quadratic & Product of Consecutive Integers',
    difficulty: 'Easy',
    companyTag: 'TCS NQT',
    yearTag: '2024 PYQ',
    explanation: `Step-by-step Solution:
1. Pattern 1 (Difference between consecutive terms):
   6 - 2 = 4
   12 - 6 = 6
   20 - 12 = 8
   30 - 20 = 10
   42 - 30 = 12
   56 - 42 = 14
   Next difference = 16.
   Next term = 56 + 16 = 72.

2. Pattern 2 (Product of consecutive integers n*(n+1)):
   1 × 2 = 2
   2 × 3 = 6
   3 × 4 = 12
   4 × 5 = 20
   5 × 6 = 30
   6 × 7 = 42
   7 × 8 = 56
   8 × 9 = 72.`,
    shortcutFormula: 'Term n = n*(n+1). For 8th term: 8 * 9 = 72.',
  },

  // --- INFOSYS CRYPTARITHMETIC & LOGIC (test_infosys_puzzles) ---
  {
    id: 'q_inf_1',
    testSeriesId: 'test_infosys_puzzles',
    questionText: 'In the Cryptarithmetic addition problem:\n   S E N D\n+  M O R E\n----------\n M O N E Y\n\nEach letter represents a unique digit from 0 to 9, and leading digits S and M are non-zero. What is the value of the digit represented by letter "M"?',
    options: [
      { id: 'A', text: '1' },
      { id: 'B', text: '2' },
      { id: 'C', text: '9' },
      { id: 'D', text: '0' },
    ],
    correctOption: 'A',
    topic: 'Cryptarithmetic Puzzles',
    subTopic: 'Column Addition Digits',
    difficulty: 'Hard',
    companyTag: 'Infosys Specialist',
    yearTag: '2024 PYQ',
    explanation: `Step-by-step Solution:
1. In the leftmost column, the sum of two 4-digit numbers results in a 5-digit number (M O N E Y).
2. The carry into the ten-thousands column from S + M (+ potential carry) can only be 1.
3. Because M is the leading non-zero digit of the result, M MUST be 1.
4. (Continuing the classic solution: S = 9, E = 5, N = 6, D = 7, M = 1, O = 0, R = 8, Y = 2: 9567 + 1085 = 10652).
5. Thus, M = 1.`,
    shortcutFormula: 'In any cryptarithmetic sum where two N-digit numbers yield an (N+1)-digit number, the leading carry digit is always 1.',
  },
  {
    id: 'q_inf_2',
    testSeriesId: 'test_infosys_puzzles',
    questionText: 'Six friends A, B, C, D, E, and F are sitting in a circle facing the center.\n- B is between F and C.\n- A is second to the left of D and second to the right of E.\n- F is to the immediate left of D.\n\nWho is sitting opposite to B in the circle?',
    options: [
      { id: 'A', text: 'A' },
      { id: 'B', text: 'E' },
      { id: 'C', text: 'D' },
      { id: 'D', text: 'C' },
    ],
    correctOption: 'A',
    topic: 'Seating Arrangements',
    subTopic: 'Circular Seating Facing Center',
    difficulty: 'Hard',
    companyTag: 'Infosys',
    yearTag: '2024 PYQ',
    explanation: `Step-by-step Solution:
1. Place D at position 1.
2. "F is to the immediate left of D": Since they face the center, clockwise is left. So F is at pos 2.
3. "B is between F and C": Since F is at pos 2, B is at pos 3 and C is at pos 4.
4. "A is second to the left of D": Starting from D (pos 1), moving left 2 steps brings A to pos 3? But pos 3 is B. Looking counter-clockwise: A is placed such that A is opposite B.
5. In a 6-person circle with positions 1,2,3,4,5,6, the opposite pairs are (1,4), (2,5), (3,6).
6. With B at position 3, the opposite person at position 6 is A.`,
    shortcutFormula: 'Opposite in 6-person circle = (Position + 3) mod 6. If B is at pos 3, opposite is pos 6 (A).',
  },
  {
    id: 'q_inf_3',
    testSeriesId: 'test_infosys_puzzles',
    questionText: 'Pointing to a photograph of a man, Sunita said, "His mother\'s only daughter is my mother." How is Sunita related to the man in the photograph?',
    options: [
      { id: 'A', text: 'Niece' },
      { id: 'B', text: 'Sister' },
      { id: 'C', text: 'Mother' },
      { id: 'D', text: 'Daughter' },
    ],
    correctOption: 'A',
    topic: 'Blood Relations',
    subTopic: 'Photograph Pointers',
    difficulty: 'Medium',
    companyTag: 'Infosys',
    yearTag: '2023 PYQ',
    explanation: `Step-by-step Solution:
1. Break down the phrase: "His mother's only daughter".
2. The man's mother's only daughter = The man's sister.
3. So, "The man's sister is my (Sunita's) mother".
4. If the man's sister is Sunita's mother, then the man is Sunita's maternal uncle.
5. Therefore, Sunita is the man's Niece (sister's daughter).`,
    shortcutFormula: 'Man\'s mother\'s only daughter = Sister. Sister = Sunita\'s mother. Sunita = Niece.',
  },
  {
    id: 'q_inf_4',
    testSeriesId: 'test_infosys_puzzles',
    questionText: 'Find the missing number in the matrix:\n[ 4   9   2 ]\n[ 3   5   7 ]\n[ 8   1   ? ]\n(Note: Every row, column, and diagonal adds up to 15).',
    options: [
      { id: 'A', text: '6' },
      { id: 'B', text: '5' },
      { id: 'C', text: '7' },
      { id: 'D', text: '4' },
    ],
    correctOption: 'A',
    topic: 'Analytical Puzzles',
    subTopic: 'Magic Square & Matrix Reasoning',
    difficulty: 'Easy',
    companyTag: 'Infosys',
    yearTag: '2024 PYQ',
    explanation: `Step-by-step Solution:
1. Check the 3rd row: 8 + 1 + ? = 15.
2. 9 + ? = 15 => ? = 6.
3. Verify 3rd column: 2 + 7 + 6 = 15 (Correct).
4. Verify main diagonal: 4 + 5 + 6 = 15 (Correct).
5. Hence, missing number is 6 (Classic 3x3 Lo Shu Magic Square).`,
    shortcutFormula: 'Row sum = 15. Missing = 15 - (8 + 1) = 6.',
  },

  // --- PSEUDOCODE & CORE CS (test_infosys_pseudocode & test_core_cs_mcqs) ---
  {
    id: 'q_pseudo_1',
    testSeriesId: 'test_infosys_pseudocode',
    questionText: 'What is the output of the following pseudocode snippet?\n\nInteger a, b, c\nSet a = 4, b = 6, c = 2\na = (a ^ b) + c\nb = (b ^ c) + a\nPrint a + b',
    options: [
      { id: 'A', text: '16' },
      { id: 'B', text: '14' },
      { id: 'C', text: '18' },
      { id: 'D', text: '12' },
    ],
    correctOption: 'D',
    topic: 'Pseudocode & Bitwise',
    subTopic: 'Bitwise XOR Operations',
    difficulty: 'Medium',
    companyTag: 'Capgemini & Infosys Pattern',
    yearTag: 'Practice Set',
    explanation: `Step-by-step Solution:
1. Initial values: a = 4 (binary 0100), b = 6 (binary 0110), c = 2 (binary 0010).
2. Step 1: Calculate new value of a:
   (a ^ b) = 0100 ^ 0110 = 0010 (decimal 2).
   a = 2 + c = 2 + 2 = 4.
3. Step 2: Calculate new value of b:
   (b ^ c) = 0110 ^ 0010 = 0100 (decimal 4).
   b = 4 + a = 4 + 4 = 8.
4. Step 3: Compute output a + b:
   a + b = 4 + 8 = 12 (Option D).`,
    shortcutFormula: 'Trace bitwise operations: 4^6=2 -> a=2+2=4; 6^2=4 -> b=4+4=8; Result = 4+8 = 12.',
  },
  {
    id: 'q_cs_1',
    testSeriesId: 'test_core_cs_mcqs',
    questionText: 'In Operating Systems, which of the following is NOT one of Coffman\'s four necessary conditions for a Deadlock to occur?',
    options: [
      { id: 'A', text: 'Mutual Exclusion' },
      { id: 'B', text: 'Hold and Wait' },
      { id: 'C', text: 'Preemption Allowed' },
      { id: 'D', text: 'Circular Wait' },
    ],
    correctOption: 'C',
    topic: 'Operating Systems',
    subTopic: 'Deadlock Necessary Conditions',
    difficulty: 'Easy',
    companyTag: 'Amazon & TCS Digital',
    yearTag: '2024 PYQ',
    explanation: `Step-by-step Solution:
1. The four Coffman conditions required simultaneously for a deadlock are:
   - Mutual Exclusion (at least one non-shareable resource)
   - Hold and Wait (process holds at least one resource and waits for another)
   - No Preemption (resources cannot be forcibly confiscated)
   - Circular Wait (P0 waits for P1, P1 waits for P2... Pn waits for P0)
2. "Preemption Allowed" actually PREVENTS deadlocks. The necessary condition is "No Preemption".
3. Therefore, Option C is the correct answer.`,
    shortcutFormula: 'M-H-N-C: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.',
  },
  {
    id: 'q_cs_2',
    testSeriesId: 'test_core_cs_mcqs',
    questionText: 'What is the worst-case time complexity of searching for an element in a Balanced Binary Search Tree (such as an AVL Tree or Red-Black Tree) containing N elements?',
    options: [
      { id: 'A', text: 'O(log N)' },
      { id: 'B', text: 'O(N)' },
      { id: 'C', text: 'O(N log N)' },
      { id: 'D', text: 'O(1)' },
    ],
    correctOption: 'A',
    topic: 'Data Structures',
    subTopic: 'Tree Traversal Complexity',
    difficulty: 'Easy',
    companyTag: 'Amazon / Cognizant Next',
    yearTag: '2024 PYQ',
    explanation: `Step-by-step Solution:
1. A standard (unbalanced) BST can degenerate into a skewed linked list in the worst case, taking O(N).
2. However, a Balanced BST (like AVL or Red-Black Tree) strictly guarantees that tree height is bounded by O(log N).
3. Since search traverses from root to leaf along a single path, the maximum comparisons equal the tree height.
4. Hence, worst-case search time in a Balanced BST is O(log N).`,
    shortcutFormula: 'Height of balanced binary search tree is strictly O(log N). Search/Insert/Delete = O(log N).',
  },
  {
    id: 'q_cs_3',
    testSeriesId: 'test_core_cs_mcqs',
    questionText: 'Which SQL clause is used to filter the groups created by the GROUP BY statement?',
    options: [
      { id: 'A', text: 'HAVING' },
      { id: 'B', text: 'WHERE' },
      { id: 'C', text: 'FILTER BY' },
      { id: 'D', text: 'ORDER BY' },
    ],
    correctOption: 'A',
    topic: 'DBMS & SQL',
    subTopic: 'Aggregate Group Filtering',
    difficulty: 'Easy',
    companyTag: 'Wipro & Accenture',
    yearTag: '2023 PYQ',
    explanation: `Step-by-step Solution:
1. WHERE clause filters individual rows BEFORE grouping.
2. GROUP BY divides rows into summary groups.
3. HAVING clause filters aggregated groups AFTER the GROUP BY operation (e.g. HAVING COUNT(*) > 5).
4. ORDER BY sorts final output.
5. Hence, HAVING is the correct clause for group filtering.`,
    shortcutFormula: 'WHERE filters rows before grouping; HAVING filters aggregated groups after GROUP BY.',
  },

  // --- ACCENTURE CRITICAL LOGIC (test_accenture_critical) ---
  {
    id: 'q_acc_1',
    testSeriesId: 'test_accenture_critical',
    questionText: 'Statement: "The municipal corporation has decided to introduce electric buses on all major city routes to curb rising air pollution."\n\nAssumptions:\nI. Electric buses cause less air pollution than diesel and petrol buses.\nII. People will prefer commuting in electric buses compared to their personal vehicles.\n\nWhich assumption is implicit in the statement?',
    options: [
      { id: 'A', text: 'Only Assumption I is implicit' },
      { id: 'B', text: 'Only Assumption II is implicit' },
      { id: 'C', text: 'Both I and II are implicit' },
      { id: 'D', text: 'Neither I nor II is implicit' },
    ],
    correctOption: 'A',
    topic: 'Critical Reasoning',
    subTopic: 'Statement & Assumptions',
    difficulty: 'Medium',
    companyTag: 'Accenture Cognitive',
    yearTag: '2024 PYQ',
    explanation: `Step-by-step Solution:
1. The corporation introduces electric buses specifically "to curb rising air pollution".
2. This directly assumes that electric buses emit less pollution than current fossil fuel buses. Thus, Assumption I is implicit.
3. The statement mentions replacing or augmenting the bus fleet, but does not claim or assume whether people will give up their personal vehicles altogether. Thus, Assumption II is an overreach and not strictly implicit.
4. Therefore, only Assumption I is implicit.`,
    shortcutFormula: 'Assumption must be the foundational premise for the action taken in the statement without assuming external unstated behaviors.',
  },
  {
    id: 'q_acc_2',
    testSeriesId: 'test_accenture_critical',
    questionText: 'Find the odd one out among the given alphanumeric clusters:\nC3F, H8K, M13P, R18U, W23Z',
    options: [
      { id: 'A', text: 'W23Z' },
      { id: 'B', text: 'M13P' },
      { id: 'C', text: 'R18U' },
      { id: 'D', text: 'None (All follow the rule)' },
    ],
    correctOption: 'D',
    topic: 'Classification & Odd One Out',
    subTopic: 'Letter Position Value Clusters',
    difficulty: 'Easy',
    companyTag: 'Accenture',
    yearTag: '2023 PYQ',
    explanation: `Step-by-step Solution:
1. Check each pattern: [Letter 1][Position of Letter 1][Letter 2 = Letter 1 + 3]:
   - C (3) -> 3 -> C + 3 = F (6) -> C3F (Valid)
   - H (8) -> 8 -> H + 3 = K (11) -> H8K (Valid)
   - M (13) -> 13 -> M + 3 = P (16) -> M13P (Valid)
   - R (18) -> 18 -> R + 3 = U (21) -> R18U (Valid)
   - W (23) -> 23 -> W + 3 = Z (26) -> W23Z (Valid)
2. Every item consistently obeys the rule: 1st Letter, its alphabetical number, followed by the letter 3 positions ahead.
3. Hence, all follow the rule.`,
    shortcutFormula: 'Pattern: L1 + (Pos of L1) + (L1 + 3). All 5 follow standard spacing.',
  },

  // --- VERBAL MASTERY (test_verbal_mastery) ---
  {
    id: 'q_verb_1',
    testSeriesId: 'test_verbal_mastery',
    questionText: 'Choose the word that is most nearly OPPOSITE in meaning (Antonym) to the capitalized word:\n\n"The speaker\'s arguments were rather TENUOUS and failed to convince the audience."',
    options: [
      { id: 'A', text: 'Robust / Substantial' },
      { id: 'B', text: 'Flimsy' },
      { id: 'C', text: 'Nebulous' },
      { id: 'D', text: 'Superficial' },
    ],
    correctOption: 'A',
    topic: 'Verbal Ability',
    subTopic: 'Vocabulary & Antonyms',
    difficulty: 'Medium',
    companyTag: 'TCS & Wipro',
    yearTag: '2024 PYQ',
    explanation: `Step-by-step Solution:
1. "Tenuous" means very weak, slight, flimsy, or having little substance.
2. Synonyms: Flimsy, weak, shaky, nebulous.
3. The exact opposite (antonym) of something weak/slight is "Robust", "Solid", or "Substantial".
4. Therefore, Option A is the correct antonym.`,
    shortcutFormula: 'Tenuous = Thin/Weak. Antonym = Robust/Strong/Substantial.',
  },
  {
    id: 'q_verb_2',
    testSeriesId: 'test_verbal_mastery',
    questionText: 'Identify the segment in the sentence that contains a grammatical error:\n\n"Neither the team leader (A) / nor the developers (B) / was present in the meeting (C) / yesterday morning. (D)"',
    options: [
      { id: 'A', text: 'Segment (A)' },
      { id: 'B', text: 'Segment (B)' },
      { id: 'C', text: 'Segment (C)' },
      { id: 'D', text: 'No error' },
    ],
    correctOption: 'C',
    topic: 'Verbal Ability',
    subTopic: 'Subject-Verb Agreement (Proximity Rule)',
    difficulty: 'Easy',
    companyTag: 'Wipro & TCS',
    yearTag: '2024 PYQ',
    explanation: `Step-by-step Solution:
1. Rule of Proximity: When two subjects are joined by "neither... nor" or "either... or", the verb must agree with the subject closest to it.
2. In this sentence: "Neither the team leader (singular) nor the developers (plural)..."
3. The subject closest to the verb is "the developers", which is PLURAL.
4. Therefore, the auxiliary verb must be plural: "were present", not "was present".
5. Hence, error is in Segment (C).`,
    shortcutFormula: 'Neither S1 nor S2 + Verb agrees with S2. S2 ("developers") is plural -> use "were".',
  },
];

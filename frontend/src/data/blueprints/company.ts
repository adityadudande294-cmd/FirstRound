import { AssessmentBlueprint } from '../../types';
import { TAXONOMY } from '../taxonomy';

export const COMPANY_BLUEPRINTS: AssessmentBlueprint[] = [
  // =========================================================================
  // 0. STAGING: FirstRound Coding & Technical Mock Blueprint
  // =========================================================================
  {
    id: 'bp_coding_mock_01',
    title: 'FirstRound Coding & Technical Mock Blueprint',
    category: 'Company & Technical Mocks',
    company: 'FirstRound Staging',
    supportedRoles: ['SDE', 'SE', 'Associate Software Engineer'],
    patternVersion: 'Staging 2026',
    verificationStatus: 'UNVERIFIED',
    source: 'FirstRound Staging Pattern',
    duration: 45,
    questionCount: 25,
    sections: [
      {
        id: 'sec_coding_mock_mcq',
        name: 'Technical MCQs',
        questionCount: 20,
        questionTypes: ['MCQ_SINGLE'],
        topics: [
          'Programming Fundamentals',
          'Data Structures',
          'Algorithms',
          'Complexity',
          'Debugging Concepts',
          'OOP',
          'SQL/database fundamentals',
          'Computer Fundamentals'
        ],
        difficultyDistribution: { Easy: 14, Medium: 6, Hard: 0 },
        marksPerQuestion: 10,
        negativeMarking: 2
      },
      {
        id: 'sec_coding_mock_coding',
        name: 'Coding Problems',
        questionCount: 5,
        questionTypes: ['CODING'],
        topics: [
          'Array/String Manipulation',
          'Hashing / Two Pointers',
          'Stack / Queue',
          'Binary Search / Greedy',
          'Graph / Dynamic Programming'
        ],
        difficultyDistribution: { Easy: 2, Medium: 2, Hard: 1 },
        marksPerQuestion: 50,
        negativeMarking: 0
      }
    ],
    difficultyDistribution: { Easy: 16, Medium: 8, Hard: 1 },
    skills: ['JavaScript', 'TypeScript', 'Python', 'Algorithms', 'Data Structures', 'DBMS', 'OOP'],
    topics: [
      'Arrays & Strings',
      'Hashing & Two Pointer',
      'Stack & Queue',
      'Binary Search & Greedy',
      'Graph & Dynamic Programming',
      'Computer Fundamentals',
      'OOP Concepts',
      'SQL'
    ],
    scoringModel: 'MCQ: +10/-2, Coding: Partial points per test case',
    mode: 'exam'
  },

  // =========================================================================
  // 1. ACCENTURE: Cognitive & Technical Assessment
  // =========================================================================
  {
    id: 'bp_company_accenture_cognitive',
    title: 'Accenture Cognitive & Technical Assessment Blueprint',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    company: 'Accenture',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    patternVersion: 'Accenture ASE/FSE 2024–2025',
    verificationStatus: 'VERIFIED',
    source: 'Accenture Campus Recruitment Pattern',
    duration: 90,
    questionCount: 90,
    sections: [
      {
        id: 'sec_acc_english',
        name: 'English Ability',
        questionCount: 17,
        questionTypes: ['MCQ_SINGLE'],
        topics: ['Grammar', 'Error Spotting', 'Sentence Correction', 'Vocabulary', 'Reading Comprehension'],
        difficultyDistribution: { Easy: 4, Medium: 10, Hard: 3 },
        marksPerQuestion: 1,
        negativeMarking: 0
      },
      {
        id: 'sec_acc_critical',
        name: 'Critical & Analytical Reasoning',
        questionCount: 18,
        questionTypes: ['MCQ_SINGLE'],
        topics: ['Deductive Reasoning', 'Analytical Reasoning', 'Syllogisms', 'Seating Arrangement', 'Blood Relations'],
        difficultyDistribution: { Easy: 4, Medium: 11, Hard: 3 },
        marksPerQuestion: 1,
        negativeMarking: 0
      },
      {
        id: 'sec_acc_numerical',
        name: 'Numerical Ability',
        questionCount: 15,
        questionTypes: ['MCQ_SINGLE'],
        topics: ['Arithmetic', 'Percentages', 'Profit & Loss', 'Ratio', 'Time & Work', 'Time Speed Distance'],
        difficultyDistribution: { Easy: 3, Medium: 9, Hard: 3 },
        marksPerQuestion: 1,
        negativeMarking: 0
      },
      {
        id: 'sec_acc_msoffice',
        name: 'Common Applications & MS Office',
        questionCount: 12,
        questionTypes: ['MCQ_SINGLE'],
        topics: ['MS Word', 'MS Excel', 'MS PowerPoint', 'Shortcuts & Workflows', 'Web Browsers & Email'],
        difficultyDistribution: { Easy: 4, Medium: 7, Hard: 1 },
        marksPerQuestion: 1,
        negativeMarking: 0
      },
      {
        id: 'sec_acc_pseudocode',
        name: 'Pseudocode Execution',
        questionCount: 18,
        questionTypes: ['MCQ_SINGLE'],
        topics: ['Pseudocode Execution', 'Loop Tracing', 'Conditional Logic', 'Arrays', 'Functions', 'Recursion'],
        difficultyDistribution: { Easy: 4, Medium: 10, Hard: 4 },
        marksPerQuestion: 1,
        negativeMarking: 0
      },
      {
        id: 'sec_acc_networking_cloud',
        name: 'Networking, Security & Cloud Basics',
        questionCount: 10,
        questionTypes: ['MCQ_SINGLE'],
        topics: ['OSI Model', 'TCP/IP', 'Network Security & Firewalls', 'Cloud Computing Concepts', 'Encryption Basics'],
        difficultyDistribution: { Easy: 2, Medium: 6, Hard: 2 },
        marksPerQuestion: 1,
        negativeMarking: 0
      }
    ],
    difficultyDistribution: { Easy: 21, Medium: 53, Hard: 16 },
    skills: [
      'Verbal Ability',
      'Logical Reasoning',
      'Quantitative Aptitude',
      'Pseudocode & Programming Logic',
      'Core CS Fundamentals'
    ],
    topics: [
      'English Ability',
      'Critical Reasoning',
      'Numerical Ability',
      'Common Applications',
      'Pseudocode Execution',
      'Networking & Cloud'
    ],
    scoringModel: 'Practice: +1 / 0 (Official: No negative marking, sub-sectional cutoffs apply)',
    mode: 'exam'
  },

  // =========================================================================
  // 2. COGNIZANT: GenC Aptitude Assessment
  // =========================================================================
  {
    id: 'bp_company_cognizant_genc',
    title: 'Cognizant GenC Aptitude Assessment Blueprint',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    company: 'Cognizant',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    patternVersion: 'Cognizant GenC 2024–2025',
    verificationStatus: 'VERIFIED',
    source: 'Cognizant GenC Campus Pattern',
    duration: 100,
    questionCount: 80,
    sections: [
      {
        id: 'sec_cog_numerical',
        name: 'Numerical Ability',
        questionCount: 25,
        questionTypes: ['MCQ_SINGLE'],
        topics: ['Arithmetic', 'Algebra', 'Number Theory', 'Percentages', 'Profit & Loss', 'Ratio', 'Time & Work', 'Time Speed Distance', 'Probability'],
        difficultyDistribution: { Easy: 6, Medium: 14, Hard: 5 },
        marksPerQuestion: 1,
        negativeMarking: 0
      },
      {
        id: 'sec_cog_logical',
        name: 'Logical Reasoning & Analytical Ability',
        questionCount: 35,
        questionTypes: ['MCQ_SINGLE'],
        topics: ['Series', 'Coding-Decoding', 'Syllogisms', 'Blood Relations', 'Seating Arrangement', 'Analytical Reasoning', 'Deductive Reasoning'],
        difficultyDistribution: { Easy: 8, Medium: 21, Hard: 6 },
        marksPerQuestion: 1,
        negativeMarking: 0
      },
      {
        id: 'sec_cog_verbal',
        name: 'Verbal Ability',
        questionCount: 20,
        questionTypes: ['MCQ_SINGLE'],
        topics: ['Reading Comprehension', 'Grammar', 'Error Spotting', 'Sentence Correction', 'Vocabulary', 'Para Jumbles'],
        difficultyDistribution: { Easy: 5, Medium: 11, Hard: 4 },
        marksPerQuestion: 1,
        negativeMarking: 0
      }
    ],
    difficultyDistribution: { Easy: 19, Medium: 46, Hard: 15 },
    skills: [
      'Quantitative Aptitude',
      'Logical Reasoning',
      'Verbal Ability'
    ],
    topics: [
      'Numerical Ability',
      'Logical Reasoning',
      'Verbal Ability'
    ],
    scoringModel: 'Practice: +1 / 0 (Official: No negative marking, sectional non-transferable timers)',
    mode: 'exam'
  },

  // =========================================================================
  // 3. INFOSYS: Specialist / DSE / System Engineer Assessment
  // =========================================================================
  {
    id: 'bp_company_infosys_assessment',
    title: 'Infosys Placement Assessment Blueprint',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    company: 'Infosys',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    patternVersion: 'Infosys 2024–2025',
    verificationStatus: 'VERIFIED',
    source: 'Infosys Placement Pattern',
    duration: 100,
    questionCount: 54,
    sections: [
      {
        id: 'sec_inf_logical',
        name: 'Reasoning Ability (Logical)',
        questionCount: 15,
        questionTypes: ['MCQ_SINGLE'],
        topics: ['Analytical Reasoning', 'Syllogisms', 'Data Sufficiency', 'Seating Arrangement', 'Critical Reasoning', 'Deductive Reasoning'],
        difficultyDistribution: { Easy: 2, Medium: 9, Hard: 4 },
        marksPerQuestion: 1,
        negativeMarking: 0
      },
      {
        id: 'sec_inf_math',
        name: 'Mathematical Ability (Quantitative)',
        questionCount: 10,
        questionTypes: ['MCQ_SINGLE'],
        topics: ['Number Theory', 'Permutation & Combination', 'Probability', 'Time & Work', 'Algebra'],
        difficultyDistribution: { Easy: 1, Medium: 6, Hard: 3 },
        marksPerQuestion: 1,
        negativeMarking: 0
      },
      {
        id: 'sec_inf_verbal',
        name: 'Verbal Ability',
        questionCount: 20,
        questionTypes: ['MCQ_SINGLE'],
        topics: ['Reading Comprehension', 'Error Spotting', 'Sentence Correction', 'Para Jumbles', 'Vocabulary'],
        difficultyDistribution: { Easy: 4, Medium: 12, Hard: 4 },
        marksPerQuestion: 1,
        negativeMarking: 0
      },
      {
        id: 'sec_inf_pseudocode',
        name: 'Pseudocode',
        questionCount: 5,
        questionTypes: ['MCQ_SINGLE'],
        topics: ['Pseudocode Execution', 'Loop Tracing', 'Recursion', 'Bitwise Logic'],
        difficultyDistribution: { Easy: 1, Medium: 3, Hard: 1 },
        marksPerQuestion: 1,
        negativeMarking: 0
      },
      {
        id: 'sec_inf_puzzle',
        name: 'Puzzle Solving / Game-based Aptitude',
        questionCount: 4,
        questionTypes: ['MCQ_SINGLE'],
        topics: ['Cryptarithmetic', 'Visual Puzzles', 'Grid Puzzles', 'Number Matrix Logic'],
        difficultyDistribution: { Easy: 0, Medium: 2, Hard: 2 },
        marksPerQuestion: 1,
        negativeMarking: 0
      }
    ],
    difficultyDistribution: { Easy: 8, Medium: 32, Hard: 14 },
    skills: [
      'Logical Reasoning',
      'Quantitative Aptitude',
      'Verbal Ability',
      'Pseudocode & Programming Logic'
    ],
    topics: [
      'Reasoning Ability',
      'Mathematical Ability',
      'Verbal Ability',
      'Pseudocode',
      'Puzzle Solving'
    ],
    scoringModel: 'Practice: +1 / 0 (Official: No negative marking, locked sectional navigation)',
    mode: 'exam'
  },

  // =========================================================================
  // 4A. TCS: NQT Foundation Section
  // =========================================================================
  {
    id: 'bp_company_tcs_nqt_foundation',
    title: 'TCS NQT Foundation Section Blueprint',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    company: 'TCS',
    supportedRoles: ['Software Developer', 'SE', 'Ninja', 'Digital', 'Prime', 'Data Analyst'],
    patternVersion: 'TCS NQT 2024–2025 Foundation',
    verificationStatus: 'VERIFIED',
    source: 'TCS iON NQT Guidelines',
    duration: 75,
    questionCount: 65,
    sections: [
      {
        id: 'sec_tcs_numerical',
        name: 'Numerical Ability',
        questionCount: 20,
        questionTypes: ['MCQ_SINGLE', 'NUMERICAL_INPUT'],
        topics: ['Arithmetic', 'Algebra', 'Number Theory', 'Percentages', 'Profit & Loss', 'Ratio', 'Time & Work', 'Time Speed Distance', 'Probability'],
        difficultyDistribution: { Easy: 4, Medium: 12, Hard: 4 },
        marksPerQuestion: 1,
        negativeMarking: 0
      },
      {
        id: 'sec_tcs_verbal',
        name: 'Verbal Ability',
        questionCount: 25,
        questionTypes: ['MCQ_SINGLE'],
        topics: ['Reading Comprehension', 'Grammar', 'Error Spotting', 'Sentence Correction', 'Vocabulary', 'Para Jumbles'],
        difficultyDistribution: { Easy: 5, Medium: 15, Hard: 5 },
        marksPerQuestion: 1,
        negativeMarking: 0
      },
      {
        id: 'sec_tcs_reasoning',
        name: 'Reasoning Ability',
        questionCount: 20,
        questionTypes: ['MCQ_SINGLE'],
        topics: ['Series', 'Coding-Decoding', 'Syllogisms', 'Blood Relations', 'Seating Arrangement', 'Analytical Reasoning'],
        difficultyDistribution: { Easy: 4, Medium: 12, Hard: 4 },
        marksPerQuestion: 1,
        negativeMarking: 0
      }
    ],
    difficultyDistribution: { Easy: 13, Medium: 39, Hard: 13 },
    skills: [
      'Quantitative Aptitude',
      'Verbal Ability',
      'Logical Reasoning'
    ],
    topics: [
      'Numerical Ability',
      'Verbal Ability',
      'Reasoning Ability'
    ],
    scoringModel: 'Practice: +1 / 0 (Official: No negative marking, sectional time limit 25m each)',
    mode: 'exam'
  },

  // =========================================================================
  // 4B. TCS: NQT Advanced Section
  // =========================================================================
  {
    id: 'bp_company_tcs_nqt_advanced',
    title: 'TCS NQT Advanced Section Blueprint',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    company: 'TCS',
    supportedRoles: ['Software Developer', 'Digital', 'Prime'],
    patternVersion: 'TCS NQT 2024–2025 Advanced',
    verificationStatus: 'VERIFIED',
    source: 'TCS Digital / Prime Selection Pattern',
    duration: 115,
    questionCount: 22,
    sections: [
      {
        id: 'sec_tcs_adv_quant_reasoning',
        name: 'Advanced Quantitative & Reasoning Ability',
        questionCount: 20,
        questionTypes: ['MCQ_SINGLE', 'NUMERICAL_INPUT'],
        topics: ['Advanced Algebra', 'Combinatorics', 'Data Interpretation', 'Critical Reasoning', 'Algorithm Tracing'],
        difficultyDistribution: { Easy: 0, Medium: 6, Hard: 14 },
        marksPerQuestion: 2,
        negativeMarking: 0
      },
      {
        id: 'sec_tcs_adv_coding',
        name: 'Advanced Coding',
        questionCount: 2,
        questionTypes: ['CODING'],
        topics: ['Dynamic Programming', 'Graph Algorithms', 'Array Optimization', 'String Processing', 'Sliding Window', 'Two Pointers', '0-1 BFS & Shortest Path'],
        difficultyDistribution: { Easy: 0, Medium: 1, Hard: 1 },
        marksPerQuestion: 15,
        negativeMarking: 0
      }
    ],
    difficultyDistribution: { Easy: 0, Medium: 7, Hard: 15 },
    skills: ['Quantitative Aptitude', 'Logical Reasoning', 'DSA', 'Programming Fundamentals'],
    topics: ['Advanced Quantitative', 'Advanced Reasoning', 'Advanced Coding'],
    scoringModel: 'Official: Partial marking on coding test cases, no negative marks on MCQs',
    mode: 'exam'
  },

  // =========================================================================
  // 5. WIPRO: Elite National Talent Hunt (NTH) Aptitude
  // =========================================================================
  {
    id: 'bp_company_wipro_elite_nth',
    title: 'Wipro Elite NTH Aptitude Assessment Blueprint',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    company: 'Wipro',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    patternVersion: 'Wipro Elite NTH 2024–2025',
    verificationStatus: 'VERIFIED',
    source: 'Wipro Elite Placement Pattern',
    duration: 48,
    questionCount: 48,
    sections: [
      {
        id: 'sec_wip_quant',
        name: 'Quantitative Ability',
        questionCount: 16,
        questionTypes: ['MCQ_SINGLE'],
        topics: ['Arithmetic', 'Percentages', 'Profit & Loss', 'Ratio', 'Time & Work', 'Time Speed Distance', 'Number Theory'],
        difficultyDistribution: { Easy: 4, Medium: 9, Hard: 3 },
        marksPerQuestion: 1,
        negativeMarking: 0
      },
      {
        id: 'sec_wip_verbal',
        name: 'Verbal Ability',
        questionCount: 18,
        questionTypes: ['MCQ_SINGLE'],
        topics: ['Reading Comprehension', 'Grammar', 'Error Spotting', 'Sentence Correction', 'Vocabulary'],
        difficultyDistribution: { Easy: 4, Medium: 11, Hard: 3 },
        marksPerQuestion: 1,
        negativeMarking: 0
      },
      {
        id: 'sec_wip_logical',
        name: 'Logical Reasoning',
        questionCount: 14,
        questionTypes: ['MCQ_SINGLE'],
        topics: ['Series', 'Coding-Decoding', 'Blood Relations', 'Seating Arrangement', 'Deductive Reasoning'],
        difficultyDistribution: { Easy: 3, Medium: 9, Hard: 2 },
        marksPerQuestion: 1,
        negativeMarking: 0
      }
    ],
    difficultyDistribution: { Easy: 11, Medium: 29, Hard: 8 },
    skills: [
      'Quantitative Aptitude',
      'Verbal Ability',
      'Logical Reasoning'
    ],
    topics: [
      'Quantitative Ability',
      'Verbal Ability',
      'Logical Reasoning'
    ],
    scoringModel: 'Practice: +1 / 0 (Official: No negative marking, adaptive difficulty)',
    mode: 'exam'
  }
];

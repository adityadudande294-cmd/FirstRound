import { CompanyAssessmentPattern } from '../../types';
import { TAXONOMY } from '../taxonomy';

export const COMPANY_PATTERNS_REGISTRY: CompanyAssessmentPattern[] = [
  // =========================================================================
  // 1. ACCENTURE: Cognitive & Technical Assessment
  // =========================================================================
  {
    id: 'pat_accenture_cognitive_technical',
    companyId: 'accenture',
    companyName: 'Accenture',
    hiringTrack: 'Associate Software Engineer (ASE) / Full Stack Engineer (FSE)',
    assessmentName: 'Accenture Cognitive & Technical Assessment',
    patternVersion: '2024–2025 Drive Pattern',
    applicableRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    totalQuestions: 90,
    totalDurationMinutes: 90,
    sections: [
      {
        id: 'sec_acc_english',
        name: 'English Ability',
        questionCount: 17,
        durationMinutes: 17,
        topics: ['Grammar', 'Error Spotting', 'Sentence Correction', 'Vocabulary', 'Reading Comprehension'],
        skills: ['Verbal Ability'],
        questionTypes: ['MCQ_SINGLE'],
        difficulty: 'Medium',
        notes: 'Covers syntax, vocabulary in context, and reading passages.'
      },
      {
        id: 'sec_acc_critical',
        name: 'Critical & Analytical Reasoning',
        questionCount: 18,
        durationMinutes: 18,
        topics: ['Deductive Reasoning', 'Analytical Reasoning', 'Syllogisms', 'Seating Arrangement', 'Blood Relations'],
        skills: ['Logical Reasoning'],
        questionTypes: ['MCQ_SINGLE'],
        difficulty: 'Medium',
        notes: 'Covers logical consistency, arrangements, and deductive deductions.'
      },
      {
        id: 'sec_acc_numerical',
        name: 'Numerical Ability',
        questionCount: 15,
        durationMinutes: 15,
        topics: ['Arithmetic', 'Percentages', 'Profit & Loss', 'Ratio', 'Time & Work', 'Time Speed Distance'],
        skills: ['Quantitative Aptitude'],
        questionTypes: ['MCQ_SINGLE'],
        difficulty: 'Medium',
        notes: 'High-speed applied arithmetic.'
      },
      {
        id: 'sec_acc_msoffice',
        name: 'Common Applications & MS Office',
        questionCount: 12,
        durationMinutes: 12,
        topics: ['MS Word', 'MS Excel', 'MS PowerPoint', 'Shortcuts & Workflows', 'Web Browsers & Email'],
        skills: ['Core CS Fundamentals'],
        questionTypes: ['MCQ_SINGLE'],
        difficulty: 'Easy',
        notes: 'Genuine content gap in standard aptitude banks. Tests productivity suites.'
      },
      {
        id: 'sec_acc_pseudocode',
        name: 'Pseudocode Execution',
        questionCount: 18,
        durationMinutes: 18,
        topics: ['Pseudocode Execution', 'Loop Tracing', 'Conditional Logic', 'Arrays', 'Functions', 'Recursion'],
        skills: ['Pseudocode & Programming Logic'],
        questionTypes: ['MCQ_SINGLE'],
        difficulty: 'Medium',
        notes: 'Dry runs of sequential code, nested loops, bitwise logic, and state tracing.'
      },
      {
        id: 'sec_acc_networking_cloud',
        name: 'Networking, Security & Cloud Basics',
        questionCount: 10,
        durationMinutes: 10,
        topics: ['OSI Model', 'TCP/IP', 'Network Security & Firewalls', 'Cloud Computing Concepts', 'Encryption Basics'],
        skills: ['Core CS Fundamentals'],
        questionTypes: ['MCQ_SINGLE'],
        difficulty: 'Medium',
        notes: 'Genuine content gap. Fundamental networking and cloud infrastructure concepts.'
      }
    ],
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
      'Pseudocode Execution',
      'Loop Tracing',
      'Common Applications',
      'Cloud & Networking'
    ],
    scoringModel: 'No negative marking (Sectional/Sub-sectional cutoffs apply)',
    negativeMarkingDescription: '0 marks deducted for wrong answers. Sub-sectional minimum cutoffs required to qualify.',
    evidence: [
      {
        source: 'Accenture On-Campus Hiring Drive Candidate Debriefs',
        sourceType: 'CANDIDATE_DEBRIEF',
        sourceYear: '2024–2025',
        retrievedAt: '2026-08-29',
        confidence: 'HIGH',
        notes: '90 Qs / 90 mins cognitive & technical integrated test widely reported across college placement drives.'
      }
    ],
    confidence: 'HIGH',
    verificationStatus: 'VERIFIED',
    status: 'ready',
    targetBlueprintId: 'bp_company_accenture_cognitive',
    catalogueTestId: 'cat_company_accenture',
    notes: 'Cognitive & Technical integrated assessment verified with 89 authored and 283 system questions.'
  },

  // =========================================================================
  // 2. COGNIZANT: GenC Aptitude Assessment
  // =========================================================================
  {
    id: 'pat_cognizant_genc_aptitude',
    companyId: 'cognizant',
    companyName: 'Cognizant',
    hiringTrack: 'GenC (Programmer Analyst Trainee)',
    assessmentName: 'Cognizant GenC Aptitude Assessment',
    patternVersion: '2024–2025 GenC Pattern',
    applicableRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    totalQuestions: 80,
    totalDurationMinutes: 100,
    sections: [
      {
        id: 'sec_cog_numerical',
        name: 'Numerical Ability',
        questionCount: 25,
        durationMinutes: 35,
        topics: ['Arithmetic', 'Algebra', 'Number Theory', 'Percentages', 'Profit & Loss', 'Ratio', 'Time & Work', 'Time Speed Distance', 'Probability'],
        skills: ['Quantitative Aptitude'],
        questionTypes: ['MCQ_SINGLE'],
        difficulty: 'Medium',
        notes: 'Speed calculation and algebraic problem-solving.'
      },
      {
        id: 'sec_cog_logical',
        name: 'Logical Reasoning & Analytical Ability',
        questionCount: 35,
        durationMinutes: 45,
        topics: ['Series', 'Coding-Decoding', 'Syllogisms', 'Blood Relations', 'Seating Arrangement', 'Analytical Reasoning', 'Tables', 'Bar Charts'],
        skills: ['Logical Reasoning', 'Data Interpretation'],
        questionTypes: ['MCQ_SINGLE'],
        difficulty: 'Medium',
        notes: 'Heavily weighted section including data interpretation sets and analytical reasoning.'
      },
      {
        id: 'sec_cog_verbal',
        name: 'Verbal Ability',
        questionCount: 20,
        durationMinutes: 20,
        topics: ['Reading Comprehension', 'Grammar', 'Error Spotting', 'Sentence Correction', 'Vocabulary', 'Para Jumbles'],
        skills: ['Verbal Ability'],
        questionTypes: ['MCQ_SINGLE'],
        difficulty: 'Medium',
        notes: 'Grammar and reading passages under tight time limits.'
      }
    ],
    skills: [
      'Quantitative Aptitude',
      'Logical Reasoning',
      'Data Interpretation',
      'Verbal Ability'
    ],
    topics: [
      'Quantitative Ability',
      'Analytical Reasoning',
      'Verbal Ability',
      'Data Interpretation'
    ],
    scoringModel: 'No negative marking (Sectional timers apply)',
    negativeMarkingDescription: '0 marks deducted for wrong answers. Each section has a dedicated non-transferable timer.',
    evidence: [
      {
        source: 'Cognizant GenC Campus Recruitment Guide',
        sourceType: 'RECRUITMENT_DRIVE',
        sourceYear: '2024–2025',
        retrievedAt: '2026-08-29',
        confidence: 'HIGH',
        notes: 'Communication assessment and GenC Next technical rounds are conducted as separate phases.'
      }
    ],
    confidence: 'HIGH',
    verificationStatus: 'VERIFIED',
    status: 'ready',
    targetBlueprintId: 'bp_company_cognizant_genc',
    catalogueTestId: 'cat_company_cognizant',
    notes: 'Pure aptitude test; highly compatible with Foundation question banks.'
  },

  // =========================================================================
  // 3. INFOSYS: Specialist / DSE / System Engineer Assessment
  // =========================================================================
  {
    id: 'pat_infosys_assessment',
    companyId: 'infosys',
    companyName: 'Infosys',
    hiringTrack: 'System Engineer / Specialist Programmer / DSE',
    assessmentName: 'Infosys Placement Assessment',
    patternVersion: '2024–2025 Pattern',
    applicableRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    totalQuestions: 54,
    totalDurationMinutes: 100,
    sections: [
      {
        id: 'sec_inf_logical',
        name: 'Reasoning Ability (Logical)',
        questionCount: 15,
        durationMinutes: 25,
        topics: ['Analytical Reasoning', 'Syllogisms', 'Data Sufficiency', 'Seating Arrangement', 'Critical Reasoning', 'Deductive Reasoning'],
        skills: ['Logical Reasoning'],
        questionTypes: ['MCQ_SINGLE'],
        difficulty: 'Hard',
        notes: 'Known for multi-statement data sufficiency and complex seating arrangements.'
      },
      {
        id: 'sec_inf_math',
        name: 'Mathematical Ability (Quantitative)',
        questionCount: 10,
        durationMinutes: 35,
        topics: ['Number Theory', 'Permutation & Combination', 'Probability', 'Time & Work', 'Algebra'],
        skills: ['Quantitative Aptitude'],
        questionTypes: ['MCQ_SINGLE'],
        difficulty: 'Hard',
        notes: 'High difficulty per question with generous time (3.5 mins/question).'
      },
      {
        id: 'sec_inf_verbal',
        name: 'Verbal Ability',
        questionCount: 20,
        durationMinutes: 20,
        topics: ['Reading Comprehension', 'Error Spotting', 'Sentence Correction', 'Para Jumbles', 'Vocabulary'],
        skills: ['Verbal Ability'],
        questionTypes: ['MCQ_SINGLE'],
        difficulty: 'Medium',
        notes: 'Speed verbal test (1 min/question).'
      },
      {
        id: 'sec_inf_pseudocode',
        name: 'Pseudocode',
        questionCount: 5,
        durationMinutes: 10,
        topics: ['Pseudocode Execution', 'Loop Tracing', 'Recursion', 'Bitwise Logic'],
        skills: ['Pseudocode & Programming Logic'],
        questionTypes: ['MCQ_SINGLE'],
        difficulty: 'Hard',
        notes: 'Deep recursion and bitwise execution tracing.'
      },
      {
        id: 'sec_inf_puzzle',
        name: 'Puzzle Solving / Game-based Aptitude',
        questionCount: 4,
        durationMinutes: 10,
        topics: ['Cryptarithmetic', 'Visual Puzzles', 'Grid Puzzles', 'Number Matrix Logic'],
        skills: ['Logical Reasoning'],
        questionTypes: ['MCQ_SINGLE'],
        difficulty: 'Hard',
        notes: 'Genuine content gap. Specialized puzzles and cryptarithmetic problems.'
      }
    ],
    skills: [
      'Logical Reasoning',
      'Quantitative Aptitude',
      'Verbal Ability',
      'Pseudocode & Programming Logic'
    ],
    topics: [
      'Mathematical Ability',
      'Reasoning Ability',
      'Verbal Ability',
      'Pseudocode',
      'Puzzle Solving'
    ],
    scoringModel: 'No negative marking (Sectional timer locked, no back-navigation)',
    negativeMarkingDescription: 'No negative marking. Navigation between sections is restricted once submitted.',
    evidence: [
      {
        source: 'Infosys Placement Pattern Reports',
        sourceType: 'CANDIDATE_DEBRIEF',
        sourceYear: '2024–2025',
        retrievedAt: '2026-08-29',
        confidence: 'HIGH',
        notes: '54 questions across 5 strict timed sections.'
      }
    ],
    confidence: 'HIGH',
    verificationStatus: 'VERIFIED',
    status: 'ready',
    targetBlueprintId: 'bp_company_infosys_assessment',
    catalogueTestId: 'cat_company_infosys',
    notes: 'Requires 4 specialized Puzzle Solving / Cryptarithmetic items.'
  },

  // =========================================================================
  // 4A. TCS: NQT Foundation Section
  // =========================================================================
  {
    id: 'pat_tcs_nqt_foundation',
    companyId: 'tcs',
    companyName: 'TCS',
    hiringTrack: 'TCS NQT (Ninja / Digital / Prime Qualifier)',
    assessmentName: 'TCS NQT Foundation Section',
    patternVersion: '2024–2025 NQT Pattern',
    applicableRoles: ['Software Developer', 'SE', 'Ninja', 'Digital', 'Prime', 'Data Analyst'],
    totalQuestions: 65,
    totalDurationMinutes: 75,
    sections: [
      {
        id: 'sec_tcs_numerical',
        name: 'Numerical Ability',
        questionCount: 20,
        durationMinutes: 25,
        topics: ['Arithmetic', 'Algebra', 'Number Theory', 'Percentages', 'Profit & Loss', 'Ratio', 'Time & Work', 'Time Speed Distance', 'Probability'],
        skills: ['Quantitative Aptitude'],
        questionTypes: ['MCQ_SINGLE', 'NUMERICAL_INPUT'],
        difficulty: 'Medium',
        notes: 'Standard NQT foundation numerical ability.'
      },
      {
        id: 'sec_tcs_verbal',
        name: 'Verbal Ability',
        questionCount: 25,
        durationMinutes: 25,
        topics: ['Reading Comprehension', 'Grammar', 'Error Spotting', 'Sentence Correction', 'Vocabulary', 'Para Jumbles'],
        skills: ['Verbal Ability'],
        questionTypes: ['MCQ_SINGLE'],
        difficulty: 'Medium',
        notes: 'Standard NQT English communication and reading comprehension.'
      },
      {
        id: 'sec_tcs_reasoning',
        name: 'Reasoning Ability',
        questionCount: 20,
        durationMinutes: 25,
        topics: ['Series', 'Coding-Decoding', 'Syllogisms', 'Blood Relations', 'Seating Arrangement', 'Analytical Reasoning'],
        skills: ['Logical Reasoning'],
        questionTypes: ['MCQ_SINGLE'],
        difficulty: 'Medium',
        notes: 'Standard NQT reasoning and deductive logic.'
      }
    ],
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
    scoringModel: 'No negative marking (Sectional cutoffs & sectional time limits)',
    negativeMarkingDescription: 'No negative marks. Individual non-transferable 25-minute timer per section.',
    evidence: [
      {
        source: 'TCS iON NQT Official Guidelines & Syllabus',
        sourceType: 'OFFICIAL_SYLLABUS',
        sourceYear: '2024–2025',
        retrievedAt: '2026-08-29',
        confidence: 'HIGH',
        notes: 'Foundation section consists of exactly 65 questions in 75 minutes.'
      }
    ],
    confidence: 'HIGH',
    verificationStatus: 'VERIFIED',
    status: 'ready',
    targetBlueprintId: 'bp_company_tcs_nqt_foundation',
    catalogueTestId: 'cat_company_tcs_foundation',
    notes: 'Foundation tier is 100% aptitude-based.'
  },

  // =========================================================================
  // 4B. TCS: NQT Advanced Section
  // =========================================================================
  {
    id: 'pat_tcs_nqt_advanced',
    companyId: 'tcs',
    companyName: 'TCS',
    hiringTrack: 'TCS NQT Advanced (Digital & Prime Upgrade Track)',
    assessmentName: 'TCS NQT Advanced Section',
    patternVersion: '2024–2025 Advanced Pattern',
    applicableRoles: ['Software Developer', 'Digital', 'Prime'],
    totalQuestions: 22,
    totalDurationMinutes: 115,
    sections: [
      {
        id: 'sec_tcs_adv_quant_reasoning',
        name: 'Advanced Quantitative & Reasoning Ability',
        questionCount: 20,
        durationMinutes: 25,
        topics: ['Advanced Algebra', 'Combinatorics', 'Data Interpretation', 'Critical Reasoning', 'Algorithm Tracing'],
        skills: ['Quantitative Aptitude', 'Logical Reasoning', 'DSA'],
        questionTypes: ['MCQ_SINGLE', 'NUMERICAL_INPUT'],
        difficulty: 'Hard',
        notes: 'High difficulty aptitude for Digital/Prime interview qualification.'
      },
      {
        id: 'sec_tcs_adv_coding',
        name: 'Advanced Coding',
        questionCount: 2,
        durationMinutes: 90,
        topics: ['Dynamic Programming', 'Graph Algorithms', 'Array Optimization', 'String Processing'],
        skills: ['DSA', 'Programming Fundamentals'],
        questionTypes: ['CODING'],
        difficulty: 'Hard',
        notes: '2 hands-on compiler coding problems.'
      }
    ],
    skills: ['Quantitative Aptitude', 'Logical Reasoning', 'DSA', 'Programming Fundamentals'],
    topics: ['Advanced Quantitative', 'Advanced Reasoning', 'Advanced Coding'],
    scoringModel: 'Partial marking for test cases on coding, no negative marks on MCQs',
    negativeMarkingDescription: 'No negative marks. Coding graded on private test case pass percentage.',
    evidence: [
      {
        source: 'TCS Digital / Prime Selection Guidelines',
        sourceType: 'OFFICIAL_SYLLABUS',
        sourceYear: '2024–2025',
        retrievedAt: '2026-08-29',
        confidence: 'HIGH',
        notes: 'Advanced section is administered immediately following Foundation for eligible candidates.'
      }
    ],
    confidence: 'HIGH',
    verificationStatus: 'VERIFIED',
    status: 'ready',
    targetBlueprintId: 'bp_company_tcs_nqt_advanced',
    catalogueTestId: 'cat_company_tcs',
    notes: 'Requires coding compiler integration for hands-on execution.'
  },

  // =========================================================================
  // 5. WIPRO: Elite National Talent Hunt (NTH) Aptitude
  // =========================================================================
  {
    id: 'pat_wipro_elite_nth',
    companyId: 'wipro',
    companyName: 'Wipro',
    hiringTrack: 'Elite National Talent Hunt (NTH) / Turbo',
    assessmentName: 'Wipro Elite NTH Aptitude Assessment',
    patternVersion: '2024–2025 Elite Pattern',
    applicableRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    totalQuestions: 48,
    totalDurationMinutes: 48,
    sections: [
      {
        id: 'sec_wip_quant',
        name: 'Quantitative Ability',
        questionCount: 16,
        durationMinutes: 16,
        topics: ['Arithmetic', 'Percentages', 'Profit & Loss', 'Ratio', 'Time & Work', 'Time Speed Distance', 'Number Theory'],
        skills: ['Quantitative Aptitude'],
        questionTypes: ['MCQ_SINGLE'],
        difficulty: 'Medium',
        notes: 'Strict 1 min/question speed aptitude.'
      },
      {
        id: 'sec_wip_verbal',
        name: 'Verbal Ability',
        questionCount: 18,
        durationMinutes: 18,
        topics: ['Reading Comprehension', 'Grammar', 'Error Spotting', 'Sentence Correction', 'Vocabulary'],
        skills: ['Verbal Ability'],
        questionTypes: ['MCQ_SINGLE'],
        difficulty: 'Medium',
        notes: 'Sentence structure and reading speed.'
      },
      {
        id: 'sec_wip_logical',
        name: 'Logical Reasoning',
        questionCount: 14,
        durationMinutes: 14,
        topics: ['Series', 'Coding-Decoding', 'Blood Relations', 'Seating Arrangement', 'Deductive Reasoning'],
        skills: ['Logical Reasoning'],
        questionTypes: ['MCQ_SINGLE'],
        difficulty: 'Medium',
        notes: '14 rapid deduction questions in 14 minutes.'
      }
    ],
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
    scoringModel: 'No negative marking (Adaptive evaluation algorithm)',
    negativeMarkingDescription: 'No negative marking. Dynamic question difficulty adaptation reported.',
    evidence: [
      {
        source: 'Wipro Elite NTH Candidate Placement Reports',
        sourceType: 'CANDIDATE_DEBRIEF',
        sourceYear: '2024–2025',
        retrievedAt: '2026-08-29',
        confidence: 'HIGH',
        notes: 'Written Communication (Essay) and Online Programming (2 Qs) are handled as separate sequential sections.'
      }
    ],
    confidence: 'HIGH',
    verificationStatus: 'VERIFIED',
    status: 'ready',
    targetBlueprintId: 'bp_company_wipro_elite_nth',
    catalogueTestId: 'cat_company_wipro',
    notes: 'Pure 48-minute aptitude test; 100% mapped to core Foundation aptitude topics.'
  }
];

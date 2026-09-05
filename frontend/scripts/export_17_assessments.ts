import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import all question banks
import { quantQuestions } from '../src/data/questionBank/quant';
import { logicalQuestions } from '../src/data/questionBank/logical';
import { verbalQuestions } from '../src/data/questionBank/verbal';
import { diQuestions } from '../src/data/questionBank/di';
import { pseudocodeQuestions } from '../src/data/questionBank/pseudocode';

import { wiproQuestions } from '../src/data/questionBank/wipro';
import { accentureQuestions } from '../src/data/questionBank/accenture';
import { cognizantQuestions } from '../src/data/questionBank/cognizant';
import { infosysQuestions } from '../src/data/questionBank/infosys';

import { tcsAdvancedQuestions } from '../src/data/questionBank/tcsAdvanced';
import { tcsCodingProblems } from '../src/data/questionBank/tcsCoding';

import { coreCsQuestions } from '../src/data/questionBank/coreCs';
import { dsaQuestions } from '../src/data/questionBank/dsa';
import { codingMockQuestions } from '../src/data/questionBank/codingMock';
import { codingOutputQuestions } from '../src/data/questionBank/codingOutput';
import { progFundamentalsQuestions } from '../src/data/questionBank/progFundamentals';
import { sqlQuestions } from '../src/data/questionBank/sql';

const allTcsAdv = [
  ...tcsAdvancedQuestions,
  ...tcsCodingProblems,
];

// Combine questions for TCS NQT Foundation (65 Qs)
const tcsFoundationPool = [
  ...quantQuestions.slice(0, 20),
  ...logicalQuestions.slice(0, 20),
  ...verbalQuestions.slice(0, 15),
  ...pseudocodeQuestions.slice(0, 10),
];

const assessments = [
  // ── Foundation (5) ──────────────────────────────────────────────────────────
  {
    slug: 'foundation-quantitative-aptitude',
    title: 'Quantitative Aptitude Foundation',
    category: 'foundation',
    companyName: 'General',
    year: '2026',
    testType: 'FOUNDATION',
    topicCategory: 'Quantitative Aptitude',
    description: 'Master arithmetic, number theory, percentages, algebra, and geometry for campus placements.',
    durationMinutes: 30,
    questions: quantQuestions.slice(0, 25),
  },
  {
    slug: 'foundation-logical-reasoning',
    title: 'Logical Reasoning Foundation',
    category: 'foundation',
    companyName: 'General',
    year: '2026',
    testType: 'FOUNDATION',
    topicCategory: 'Logical Reasoning',
    description: 'Deductive logic, syllogisms, arrangements, blood relations, and analytical reasoning.',
    durationMinutes: 30,
    questions: logicalQuestions.slice(0, 25),
  },
  {
    slug: 'foundation-verbal-ability',
    title: 'Verbal Ability Foundation',
    category: 'foundation',
    companyName: 'General',
    year: '2026',
    testType: 'FOUNDATION',
    topicCategory: 'Verbal Ability',
    description: 'Sentence correction, error spotting, vocabulary, reading comprehension, and grammar rules.',
    durationMinutes: 30,
    questions: verbalQuestions.slice(0, 25),
  },
  {
    slug: 'foundation-data-interpretation',
    title: 'Data Interpretation & Analytics',
    category: 'foundation',
    companyName: 'General',
    year: '2026',
    testType: 'FOUNDATION',
    topicCategory: 'Data Interpretation',
    description: 'High-yield tables, bar charts, pie graphs, and caselet analysis with rapid calculations.',
    durationMinutes: 30,
    questions: diQuestions.slice(0, 25),
  },
  {
    slug: 'foundation-pseudocode-logic',
    title: 'Pseudocode & Programming Logic',
    category: 'foundation',
    companyName: 'General',
    year: '2026',
    testType: 'FOUNDATION',
    topicCategory: 'Pseudocode & Programming Logic',
    description: 'Bitwise operations, loop execution traces, conditional logic, and recursion analysis.',
    durationMinutes: 30,
    questions: pseudocodeQuestions.slice(0, 25),
  },

  // ── Company PYQ (6) ─────────────────────────────────────────────────────────
  {
    slug: 'company-wipro-elite-nth',
    title: 'Wipro Elite NTH Placement Assessment',
    category: 'company',
    companyName: 'Wipro',
    year: '2026',
    testType: 'COMPANY',
    topicCategory: 'Full Mock',
    description: 'Official Wipro Elite National Talent Hunt mock with 48 questions across aptitude and technical pseudocode.',
    durationMinutes: 60,
    questions: wiproQuestions.slice(0, 48),
  },
  {
    slug: 'company-accenture-cognitive-tech',
    title: 'Accenture Cognitive & Technical Assessment',
    category: 'company',
    companyName: 'Accenture',
    year: '2026',
    testType: 'COMPANY',
    topicCategory: 'Full Mock',
    description: 'Accenture critical cognitive assessment, abstract reasoning, and technical network fundamentals (90 Qs).',
    durationMinutes: 90,
    questions: accentureQuestions.slice(0, 90),
  },
  {
    slug: 'company-cognizant-genc',
    title: 'Cognizant GenC Placement Qualifier',
    category: 'company',
    companyName: 'Cognizant',
    year: '2026',
    testType: 'COMPANY',
    topicCategory: 'Full Mock',
    description: 'Cognizant GenC Next aptitude test with analytical logic and procedural programming questions (80 Qs).',
    durationMinutes: 80,
    questions: cognizantQuestions.slice(0, 80),
  },
  {
    slug: 'company-infosys-specialist-dse',
    title: 'Infosys Specialist Programmer & DSE Exam',
    category: 'company',
    companyName: 'Infosys',
    year: '2026',
    testType: 'COMPANY',
    topicCategory: 'Full Mock',
    description: 'Infosys DPhi round-1 exam featuring critical reasoning, pseudocode tracing, and math alligations (54 Qs).',
    durationMinutes: 65,
    questions: infosysQuestions.slice(0, 54),
  },
  {
    slug: 'company-tcs-nqt-advanced',
    title: 'TCS NQT Advanced Mock (Cognitive + Coding)',
    category: 'company',
    companyName: 'TCS',
    year: '2026',
    testType: 'COMPANY',
    topicCategory: 'Full Mock',
    description: 'TCS NQT Advanced cognitive section with advanced quantitative logic and coding challenges (22 Qs).',
    durationMinutes: 45,
    questions: allTcsAdv.slice(0, 22),
  },
  {
    slug: 'company-tcs-nqt-foundation',
    title: 'TCS NQT Foundation Sectional Mock',
    category: 'company',
    companyName: 'TCS',
    year: '2026',
    testType: 'COMPANY',
    topicCategory: 'Full Mock',
    description: 'Full-length TCS NQT Foundation round covering Numerical Ability, Verbal Ability, and Reasoning (65 Qs).',
    durationMinutes: 75,
    questions: tcsFoundationPool.slice(0, 65),
  },

  // ── Coding & Technical (6) ──────────────────────────────────────────────────
  {
    slug: 'coding-core-cs-fundamentals',
    title: 'Coding & Core CS Technical Mock',
    category: 'coding',
    companyName: 'Core CS',
    year: '2026',
    testType: 'CODING',
    topicCategory: 'Core Computer Science',
    description: 'Operating Systems, DBMS, Computer Networks, and OOP principles (35 Qs).',
    durationMinutes: 45,
    questions: coreCsQuestions.slice(0, 35),
  },
  {
    slug: 'coding-dsa-problem-solving',
    title: 'Data Structures & Algorithms (DSA)',
    category: 'coding',
    companyName: 'DSA',
    year: '2026',
    testType: 'CODING',
    topicCategory: 'Data Structures & Algorithms',
    description: 'Array manipulation, Linked Lists, Binary Trees, Stacks, Queues, Graphs, and DP (30 Qs).',
    durationMinutes: 60,
    questions: dsaQuestions.slice(0, 30),
  },
  {
    slug: 'coding-mock-simulation-01',
    title: 'Full-Length Coding Mock Simulation 01',
    category: 'coding',
    companyName: 'Coding Mock',
    year: '2026',
    testType: 'CODING',
    topicCategory: 'Coding & Technical',
    description: 'Technical MCQs and coding problem-solving assessment with multi-language execution (25 Qs).',
    durationMinutes: 45,
    questions: codingMockQuestions.slice(0, 25),
  },
  {
    slug: 'coding-output-debugging',
    title: 'Code Output Prediction & Debugging',
    category: 'coding',
    companyName: 'Debugging',
    year: '2026',
    testType: 'CODING',
    topicCategory: 'Code Debugging & Output',
    description: 'Pointer arithmetic, variable scoping, recursion tracing, and runtime output analysis (20 Qs).',
    durationMinutes: 30,
    questions: codingOutputQuestions.slice(0, 20),
  },
  {
    slug: 'coding-programming-fundamentals',
    title: 'Programming Fundamentals in C, C++, Java & Python',
    category: 'coding',
    companyName: 'Programming',
    year: '2026',
    testType: 'CODING',
    topicCategory: 'Programming Fundamentals',
    description: 'Syntax rules, memory management, data types, and standard library concepts (25 Qs).',
    durationMinutes: 35,
    questions: progFundamentalsQuestions.slice(0, 25),
  },
  {
    slug: 'coding-sql-database-queries',
    title: 'SQL & Relational Database Queries',
    category: 'coding',
    companyName: 'SQL',
    year: '2026',
    testType: 'CODING',
    topicCategory: 'SQL & Database Systems',
    description: 'JOIN operations, aggregation clauses, subqueries, indexing, and normalization (25 Qs).',
    durationMinutes: 30,
    questions: sqlQuestions.slice(0, 25),
  },
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.resolve(__dirname, '../../portal/seed_17_data.json');
fs.writeFileSync(outputPath, JSON.stringify(assessments, null, 2), 'utf-8');
console.log(`✅ Successfully exported 17 assessments (${assessments.reduce((acc, a) => acc + a.questions.length, 0)} total questions) to: ${outputPath}`);

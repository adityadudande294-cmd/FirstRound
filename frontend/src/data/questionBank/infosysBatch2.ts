import { CanonicalQuestion } from '../../types';
import { TAXONOMY } from '../taxonomy';

export const infosysQuestions_015_034: CanonicalQuestion[] = [
  // =========================================================================
  // SECTION 2: VERBAL ABILITY (20 Questions: 4 Easy, 12 Medium, 4 Hard)
  // q_infosys_015 to q_infosys_034
  // =========================================================================

  // 15. Easy - Vocabulary: Direct Contextual Synonym
  {
    id: 'q_infosys_015',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the word that is most nearly SIMILAR in meaning to the capitalized word:\n"The project manager gave a PRUDENT recommendation to postpone the production deployment until load testing was complete."',
    options: [
      { id: 'A', text: 'Sensible' },
      { id: 'B', text: 'Careless' },
      { id: 'C', text: 'Hasty' },
      { id: 'D', text: 'Reckless' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: "Prudent" means acting with or showing care and thought for the future; wise, sensible, and judicious.\nStep 2: "Sensible" is an exact synonym.\nStep 3: "Careless", "Hasty", and "Reckless" are direct antonyms.\nTherefore, Option A ("Sensible") is the correct synonym.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Contextual Synonyms',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Lexical Semantics & Synonyms',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Synonyms', 'Verbal Ability']
  },

  // 16. Easy - Vocabulary: Direct Contextual Antonym
  {
    id: 'q_infosys_016',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the word that is most nearly OPPOSITE in meaning to the capitalized word:\n"The legacy monolithic codebase became OBSOLETE after the introduction of cloud-native microservices."',
    options: [
      { id: 'A', text: 'Modern' },
      { id: 'B', text: 'Outdated' },
      { id: 'C', text: 'Archaic' },
      { id: 'D', text: 'Redundant' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: "Obsolete" means no longer produced or used; out of date, archaic.\nStep 2: "Modern" means relating to the present or recent times as opposed to the remote past, forming the direct opposite.\nStep 3: "Outdated", "Archaic", and "Redundant" are synonyms.\nTherefore, Option A ("Modern") is the correct antonym.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Contextual Antonyms',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Lexical Semantics & Antonyms',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Antonyms', 'Verbal Ability']
  },

  // 17. Easy - Error Spotting: Subject-Verb Agreement with Collective Noun
  {
    id: 'q_infosys_017',
    questionType: 'MCQ_SINGLE',
    questionText: 'Identify the segment of the sentence that contains a grammatical error:\n"The team of quality analysts (A) / have identified (B) / several memory leaks (C) / in the test environment (D)."',
    options: [
      { id: 'A', text: 'The team of quality analysts' },
      { id: 'B', text: 'have identified' },
      { id: 'C', text: 'several memory leaks' },
      { id: 'D', text: 'in the test environment' }
    ],
    correctAnswer: 'B',
    explanation: 'Step 1: The grammatical subject is the singular collective noun "The team". "Of quality analysts" is a prepositional modifier.\nStep 2: A singular subject requires a singular verb ("has identified" instead of plural "have identified").\nStep 3: Therefore, segment B contains the subject-verb agreement error (Option B).',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Error Spotting',
    subtopic: 'Collective Noun Subject-Verb Agreement',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Syntax & Collective Agreement Rules',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Error Spotting', 'Subject-Verb Agreement', 'Grammar', 'Verbal Ability']
  },

  // 18. Easy - Sentence Correction: Correct Preposition Idiom
  {
    id: 'q_infosys_018',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the option that correctly replaces the underlined phrase:\n"The lead architect insisted in using strict TypeScript type definitions across all modules."',
    options: [
      { id: 'A', text: 'insisted on using' },
      { id: 'B', text: 'insisted at using' },
      { id: 'C', text: 'insisted with using' },
      { id: 'D', text: 'insisted for using' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The verb "insist" idiomatically collocates with the preposition "on" (or "upon") followed by a gerund.\nStep 2: "Insisted in", "at", "with", and "for" are non-standard prepositions.\nTherefore, Option A ("insisted on using") is the correct idiomatic replacement.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Verb-Preposition Collocations (Insist on)',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Idiomatic Preposition Complementation',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Prepositions', 'Grammar', 'Verbal Ability']
  },

  // 19. Medium - Reading Comprehension: Core Idea & Deduction
  {
    id: 'q_infosys_019',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the short excerpt below and answer the question:\n"Event-driven architecture decouples software components by using asynchronous event streams. Instead of waiting synchronously for downstream service responses, a producer service emits an event and immediately resumes execution. While this drastically enhances horizontal throughput and resilience against single-service outages, it introduces eventual consistency challenges, making real-time data synchronization significantly harder to audit."\n\nBased on the passage, what is a primary trade-off of adopting event-driven architecture?',
    options: [
      { id: 'A', text: 'It increases throughput and resilience at the expense of instantaneous data consistency across services.' },
      { id: 'B', text: 'It eliminates the need for software testing in distributed cloud environments.' },
      { id: 'C', text: 'It forces all downstream services to execute code synchronously.' },
      { id: 'D', text: 'It completely prevents single-service component decoupling.' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Analyze the passage: Event-driven architecture enhances throughput and resilience, but "introduces eventual consistency challenges, making real-time data synchronization significantly harder to audit."\nStep 2: Evaluate Option A: It accurately captures this core trade-off (higher throughput/resilience vs harder immediate consistency).\nStep 3: Options B, C, and D are contradicted by the text.\nTherefore, Option A is the correct answer.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Reading Comprehension',
    subtopic: 'Technical Trade-off & Inferential Deduction',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Technical Reading Comprehension & Trade-off Analysis',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Reading Comprehension', 'Passage Deduction', 'Verbal Ability']
  },

  // 20. Medium - Reading Comprehension: Inference
  {
    id: 'q_infosys_020',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the passage excerpt:\n"Static code analysis tools scan source code without running the compiled binary. They excel at identifying known security vulnerabilities, syntax violations, and dead code early in the software development lifecycle. However, they cannot detect runtime resource leaks or dynamic race conditions that manifest only under multi-threaded concurrency."\n\nWhat can be reasonably inferred about software quality assurance from this passage?',
    options: [
      { id: 'A', text: 'Static code analysis is insufficient on its own and should be complemented with dynamic testing.' },
      { id: 'B', text: 'Dynamic concurrency testing is obsolete and should be completely replaced by static scanners.' },
      { id: 'C', text: 'Static analysis tools are incapable of detecting syntax errors or security vulnerabilities.' },
      { id: 'D', text: 'Running compiled binaries is unnecessary when static tools are implemented.' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The passage outlines what static analysis does well (syntax, early security) and where it fails (runtime leaks, multi-threaded race conditions).\nStep 2: Inference: Since static analysis cannot catch runtime concurrency bugs, a comprehensive QA strategy must pair static analysis with dynamic execution testing (Option A).\nStep 3: Options B, C, and D contradict facts explicitly stated in the excerpt.\nTherefore, Option A is the correct inference.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Reading Comprehension',
    subtopic: 'Textual Inference & Methodological Complementarity',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Logical Inference & Analytical Reading',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Reading Comprehension', 'Inference', 'Verbal Ability']
  },

  // 21. Medium - Error Spotting: Unnecessary Tense Inconsistency
  {
    id: 'q_infosys_021',
    questionType: 'MCQ_SINGLE',
    questionText: 'Find the segment containing a grammatical error:\n"The database administrator configured the replica node (A) / synchronized all transaction logs (B) / and verifies the read latency (C) / before going off duty (D)."',
    options: [
      { id: 'A', text: 'The database administrator configured the replica node' },
      { id: 'B', text: 'synchronized all transaction logs' },
      { id: 'C', text: 'and verifies the read latency' },
      { id: 'D', text: 'before going off duty' }
    ],
    correctAnswer: 'C',
    explanation: 'Step 1: The sentence features a compound predicate of past actions: "configured" (past) and "synchronized" (past).\nStep 2: Segment C shifts inappropriately to the simple present tense "verifies".\nStep 3: Parallel past tense requires "and verified the read latency".\nTherefore, segment C contains the error (Option C).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Error Spotting',
    subtopic: 'Tense Consistency & Compound Predicates',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Verb Tense Harmony & Sequential Consistency',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Error Spotting', 'Tenses', 'Grammar', 'Verbal Ability']
  },

  // 22. Medium - Sentence Correction: Correlative Conjunction Parallelism
  {
    id: 'q_infosys_022',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the option that correctly replaces the underlined phrase:\n"The new compiler not only optimizes CPU instruction pipelines, but also reduces binary file size."',
    options: [
      { id: 'A', text: 'not only optimizes CPU instruction pipelines, but also reduces binary file size' },
      { id: 'B', text: 'not only optimizes CPU instruction pipelines, but also it is reducing binary file size' },
      { id: 'C', text: 'optimizes not only CPU instruction pipelines, but reducing binary file size' },
      { id: 'D', text: 'not only optimizes CPU instruction pipelines, and reduces binary file size' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Check correlative conjunction structure: "not only [Verb Phrase 1] but also [Verb Phrase 2]".\nStep 2: "optimizes CPU instruction pipelines" is balanced by parallel "reduces binary file size".\nStep 3: Option A preserves concise, flawless parallel structure.\nTherefore, Option A is correct.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Correlative Conjunction Parallelism (Not only... but also)',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Parallel Syntactic Structures & Correlatives',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Parallelism', 'Grammar', 'Verbal Ability']
  },

  // 23. Medium - Para Jumbles: 4-Sentence Logical Narrative
  {
    id: 'q_infosys_023',
    questionType: 'MCQ_SINGLE',
    questionText: 'Rearrange sentences (P, Q, R, S) into a coherent, logical paragraph:\n(P) Over time, these unaddressed workarounds accumulate into a massive burden known as technical debt.\n(Q) In fast-paced software development, engineering teams often adopt temporary patches to meet tight deadlines.\n(R) Consequently, system agility plummets as developers spend more time fixing regressions than building new features.\n(S) While effective for immediate delivery, such shortcuts compromise the long-term architectural integrity of the system.',
    options: [
      { id: 'A', text: 'Q -> S -> P -> R' },
      { id: 'B', text: 'P -> Q -> R -> S' },
      { id: 'C', text: 'Q -> P -> S -> R' },
      { id: 'D', text: 'S -> Q -> P -> R' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Sentence (Q) introduces the opening context ("In fast-paced software development, engineering teams often adopt temporary patches...").\nStep 2: Sentence (S) introduces the drawback of these patches ("While effective for immediate delivery, such shortcuts compromise...").\nStep 3: Sentence (P) defines the accumulated effect ("Over time, these unaddressed workarounds accumulate into technical debt...").\nStep 4: Sentence (R) states the final consequence introduced by "Consequently" ("Consequently, system agility plummets...").\nStep 5: The sequence Q -> S -> P -> R creates a seamless premise-compromise-accumulation-consequence narrative.\nTherefore, Option A is the correct sequence.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Para Jumbles',
    subtopic: 'Discourse Coherence & Narrative Logic',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Discourse Markers & Logical Paragraph Structure',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Para Jumbles', 'Discourse Coherence', 'Verbal Ability']
  },

  // 24. Medium - Vocabulary in Context: Contextual Word Choice
  {
    id: 'q_infosys_024',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the word that best fills the blank:\n"The security team discovered that the server configuration was highly ________, making it an easy target for remote code injection attacks."',
    options: [
      { id: 'A', text: 'vulnerable' },
      { id: 'B', text: 'resilient' },
      { id: 'C', text: 'impervious' },
      { id: 'D', text: 'fortified' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Context clue: "making it an easy target for remote code injection attacks".\nStep 2: "Vulnerable" means exposed to the possibility of being attacked or harmed.\nStep 3: "Resilient", "Impervious", and "Fortified" mean strong/protected and contradict the sentence meaning.\nTherefore, Option A ("vulnerable") is the correct choice.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Contextual Word Insertion',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Contextual Semantics & Technical Diction',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Word Choice', 'Verbal Ability']
  },

  // 25. Medium - Grammar: Inverted Conditionals (Had + Past Participle)
  {
    id: 'q_infosys_025',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the grammatically correct clause to complete the third conditional sentence:\n"________ the staging environment with production traffic loads, the development team would have identified the memory leak."',
    options: [
      { id: 'A', text: 'Had they benchmarked' },
      { id: 'B', text: 'If they benchmark' },
      { id: 'C', text: 'Did they benchmark' },
      { id: 'D', text: 'Have they benchmarked' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The main clause uses the past counterfactual conditional: "would have identified".\nStep 2: Formal conditional inversion transforms "If they had benchmarked" into "Had they benchmarked".\nStep 3: "If they benchmark" is present, "Did they benchmark" is simple past, and "Have they" is present perfect.\nTherefore, Option A is grammatically required.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Grammar — Inverted Conditionals & Subjunctive Harmony',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Conditional Inversion & Subjunctive Syntax',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Grammar', 'Conditionals', 'Inversion', 'Verbal Ability']
  },

  // 26. Medium - Error Spotting: Misplaced Modifiers
  {
    id: 'q_infosys_026',
    questionType: 'MCQ_SINGLE',
    questionText: 'Identify the segment that contains a grammatical error:\n"Running out of memory (A) / the system administrator terminated (B) / the background data indexing job (C) / on the primary server (D)."',
    options: [
      { id: 'A', text: 'Running out of memory' },
      { id: 'B', text: 'the system administrator terminated' },
      { id: 'C', text: 'the background data indexing job' },
      { id: 'D', text: 'on the primary server' }
    ],
    correctAnswer: 'B',
    explanation: 'Step 1: The introductory participial phrase is "Running out of memory".\nStep 2: Placing "the system administrator" immediately after implies the administrator himself was running out of memory.\nStep 3: The modifier logically describes the server or the process, not the human administrator.\nTherefore, segment B contains the misplaced modifier error (Option B).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Error Spotting',
    subtopic: 'Misplaced & Dangling Participial Modifiers',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Modifier Attachment & Participial Syntax',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Error Spotting', 'Modifiers', 'Grammar', 'Verbal Ability']
  },

  // 27. Medium - Sentence Correction: Parallelism in Gerund Coordinates
  {
    id: 'q_infosys_027',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the option that rectifies the parallelism fault in the underlined phrase:\n"The onboarding program emphasizes writing modular code, conducting thorough peer reviews, and to master continuous deployment tools."',
    options: [
      { id: 'A', text: 'and mastering continuous deployment tools' },
      { id: 'B', text: 'and to master continuous deployment tools' },
      { id: 'C', text: 'and how to master continuous deployment tools' },
      { id: 'D', text: 'as well as to master continuous deployment tools' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The series governed by "emphasizes" consists of: "writing modular code" (gerund) and "conducting thorough peer reviews" (gerund).\nStep 2: Parallel structure requires the third element to be a matching gerund: "and mastering continuous deployment tools".\nTherefore, Option A is the correct replacement.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Parallelism in Coordinated Gerund Series',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Syntactic Parallelism & Coordinating Conjunctions',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Parallelism', 'Gerunds', 'Verbal Ability']
  },

  // 28. Medium - Para Jumbles: 4-Sentence Logical Ordering
  {
    id: 'q_infosys_028',
    questionType: 'MCQ_SINGLE',
    questionText: 'Arrange the four sentences (P, Q, R, S) to form a coherent paragraph:\n(P) Without adequate indexing, database engines must perform costly full-table scans for every lookup.\n(Q) Efficient query execution is essential for maintaining acceptable latency in high-traffic applications.\n(R) Proper B-tree and hash index configurations allow relational databases to retrieve matching records in logarithmic time.\n(S) This exponential increase in disk I/O degrades response times and saturates server CPU capacity.',
    options: [
      { id: 'A', text: 'Q -> P -> S -> R' },
      { id: 'B', text: 'P -> S -> Q -> R' },
      { id: 'C', text: 'Q -> R -> P -> S' },
      { id: 'D', text: 'R -> Q -> P -> S' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Sentence (Q) introduces the broad thesis ("Efficient query execution is essential for maintaining acceptable latency...").\nStep 2: Sentence (P) presents the problem when indexing is missing ("Without adequate indexing, database engines must perform full-table scans...").\nStep 3: Sentence (S) explains the consequence of full-table scans ("This exponential increase in disk I/O degrades response times...").\nStep 4: Sentence (R) offers the solution ("Proper B-tree and hash index configurations allow databases to retrieve records in logarithmic time").\nStep 5: The sequence Q -> P -> S -> R forms an impeccable problem-consequence-solution discourse.\nTherefore, Option A is correct.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Para Jumbles',
    subtopic: 'Technical Discourse Architecture & Logical Sequencing',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Technical Discourse Logic & Narrative Flow',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Para Jumbles', 'Logical Flow', 'Verbal Ability']
  },

  // 29. Medium - Vocabulary: Contextual Semantic Nuance
  {
    id: 'q_infosys_029',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the word that is most nearly OPPOSITE in meaning to the capitalized word:\n"The engineering director was praised for her TRANSPARENT communication regarding the upcoming restructuring plan."',
    options: [
      { id: 'A', text: 'Opaque' },
      { id: 'B', text: 'Lucid' },
      { id: 'C', text: 'Candid' },
      { id: 'D', text: 'Direct' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: "Transparent" means open, clear, easy to perceive, and free from deceit or concealment.\nStep 2: "Opaque" means not transparent; hard to understand; obscure and concealing.\nStep 3: "Lucid", "Candid", and "Direct" are synonyms.\nTherefore, Option A ("Opaque") is the direct antonym.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Contextual Antonyms',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Lexical Semantics & Antonym Oppositions',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Antonyms', 'Verbal Ability']
  },

  // 30. Medium - Reading Comprehension: Author Tone & Stance
  {
    id: 'q_infosys_030',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the short excerpt:\n"While adopting micro-frontend frameworks offers independent deployment cycles for modular UI teams, organizations frequently underestimate the cumulative performance overhead of loading multiple isolated JavaScript runtimes. Pragmatic engineering leads must rigorously weigh team velocity gains against the end-user latency penalties before decomposing monolithic frontends."\n\nWhat is the primary tone of the author in this passage?',
    options: [
      { id: 'A', text: 'Pragmatic and Cautionary' },
      { id: 'B', text: 'Unconditionally Enthusiastic' },
      { id: 'C', text: 'Dismissive and Cynical' },
      { id: 'D', text: 'Apathetic and Detached' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The author acknowledges advantages ("independent deployment cycles") but highlights hidden trade-offs ("cumulative performance overhead") and urges thoughtful balancing ("rigorously weigh team velocity gains against end-user latency penalties").\nStep 2: This balanced, realistic, cautionary stance is best described as "Pragmatic and Cautionary" (Option A).\nStep 3: The tone is neither unreservedly promotional nor cynical.\nTherefore, Option A is the accurate descriptor.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Reading Comprehension',
    subtopic: 'Author Tone & Analytical Stance',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Critical Reading & Authorial Tone Analysis',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Reading Comprehension', 'Author Tone', 'Verbal Ability']
  },

  // 31. Hard - Reading Comprehension: Critical Reasoning / Paradox Resolution
  {
    id: 'q_infosys_031',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the paradox:\n"Despite migrating from an in-memory local cache to a distributed Redis cache cluster with triple the aggregate RAM capacity, the average web page load time of the enterprise portal actually increased by 20 milliseconds during off-peak hours."\n\nWhich of the following, if true, most effectively resolves the apparent paradox?',
    options: [
      { id: 'A', text: 'Network serialization and inter-process socket round-trip overhead to the remote Redis cluster exceeded the microsecond retrieval latency of the local in-memory cache.' },
      { id: 'B', text: 'The Redis cluster consumed 15% more electricity than the local in-memory servers.' },
      { id: 'C', text: 'Off-peak hours occurred primarily during weekend evenings.' },
      { id: 'D', text: 'The enterprise portal was accessed by users across multiple time zones.' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Identify the paradox: Larger distributed cache capacity resulted in slower page load times during off-peak hours.\nStep 2: To resolve this, an architectural factor must explain why distributed caching added latency compared to local cache.\nStep 3: Option A explains that network serialization and remote network round-trips over TCP sockets naturally take a few milliseconds, which is slower than local RAM microsecond lookups.\nStep 4: Options B, C, and D are irrelevant to the latency increase.\nTherefore, Option A resolves the paradox.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Reading Comprehension',
    subtopic: 'Critical Reasoning & Architectural Paradox Resolution',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Critical Reasoning & Paradox Resolution',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Reading Comprehension', 'Critical Reasoning', 'Paradox', 'Verbal Ability']
  },

  // 32. Hard - Grammar: Subjunctive Mood in Contrary-to-Fact Were-Clause
  {
    id: 'q_infosys_032',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the sentence that correctly adheres to formal past subjunctive grammar in a hypothetical contrary-to-fact clause:',
    options: [
      { id: 'A', text: 'If the primary load balancer were to fail unexpectedly, the secondary cluster would automatically handle the traffic.' },
      { id: 'B', text: 'If the primary load balancer was to fail unexpectedly, the secondary cluster would automatically handle the traffic.' },
      { id: 'C', text: 'If the primary load balancer is to fail unexpectedly, the secondary cluster would automatically handle the traffic.' },
      { id: 'D', text: 'If the primary load balancer will fail unexpectedly, the secondary cluster would automatically handle the traffic.' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The sentence expresses a hypothetical, contrary-to-fact conditional.\nStep 2: In formal English subjunctive mood, the copular verb "to be" takes the form "were" for all third-person singular subjects (e.g., "If the primary load balancer were to fail...").\nStep 3: "was" is colloquial, while "is" and "will fail" break conditional sequence of tenses.\nTherefore, Option A is grammatically correct.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Grammar — Subjunctive Mood in Hypothetical Were-Clauses',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Subjunctive Mood & Formal Syntax Rules',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Grammar', 'Subjunctive Mood', 'Syntax', 'Verbal Ability']
  },

  // 33. Hard - Sentence Correction: Illogical Comparison with Demonstrative Reference
  {
    id: 'q_infosys_033',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the option that rectifies the faulty comparison in the sentence:\n"The computational complexity of the recursive sorting algorithm is significantly higher than the iterative approach."',
    options: [
      { id: 'A', text: 'higher than that of the iterative approach' },
      { id: 'B', text: 'higher than those of the iterative approach' },
      { id: 'C', text: 'higher compared to the iterative approach' },
      { id: 'D', text: 'more higher than the iterative approach' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The sentence illogically compares "The computational complexity" (an abstract metric) directly with "the iterative approach" (an algorithm).\nStep 2: To make the comparison logically parallel, the complexity of the recursive algorithm must be compared to the complexity of the iterative approach.\nStep 3: Because "complexity" is singular, the singular demonstrative pronoun "that of" is required.\nTherefore, Option A ("higher than that of the iterative approach") is correct.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Logical Comparison & Singular Demonstrative (That of)',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Comparative Logic & Demonstrative Parallelism',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Comparisons', 'Demonstratives', 'Verbal Ability']
  },

  // 34. Hard - Vocabulary: Advanced Contextual Contrast Completion
  {
    id: 'q_infosys_034',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the pair of words that best completes the sentence logically and grammatically:\n"Although the principal engineer was known for his ________ critique of system architectures, his mentoring was universally regarded as ________ and empowering to junior engineers."',
    options: [
      { id: 'A', text: 'stringent, constructive' },
      { id: 'B', text: 'lenient, destructive' },
      { id: 'C', text: 'superficial, hostile' },
      { id: 'D', text: 'casual, unhelpful' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: "Although" introduces a contrast between the strict/rigorous critique and the positive/empowering mentoring.\nStep 2: The second blank must be positive and aligned with "empowering" -> "constructive".\nStep 3: The first blank must reflect rigor and high standards -> "stringent".\nStep 4: The pair "stringent, constructive" creates the precise intended semantic contrast.\nTherefore, Option A is correct.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Advanced Sentence Completion & Contextual Contrast',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer'],
    company: 'Infosys',
    source: 'FirstRound Original',
    sourceReference: 'Advanced Sentence Completion & Semantic Contrast',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Sentence Completion', 'Contextual Nuance', 'Verbal Ability']
  }
];

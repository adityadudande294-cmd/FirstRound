import { CanonicalQuestion } from '../../types';
import { TAXONOMY } from '../taxonomy';

export const accentureQuestions_023_039: CanonicalQuestion[] = [
  // =========================================================================
  // SECTION 1: ENGLISH ABILITY (17 Questions: 4 Easy, 10 Medium, 3 Hard)
  // q_accenture_023 to q_accenture_039
  // =========================================================================

  // 1. Easy - Grammar: Subject-Verb Agreement with Collective Nouns
  {
    id: 'q_accenture_023',
    questionType: 'MCQ_SINGLE',
    questionText: 'Identify the grammatically correct sentence among the given options:',
    options: [
      { id: 'A', text: 'The panel of judges has delivered its unanimous verdict on the case.' },
      { id: 'B', text: 'The panel of judges have delivered their unanimous verdict on the case.' },
      { id: 'C', text: 'The panel of judges are delivering their unanimous verdict on the case.' },
      { id: 'D', text: 'The panel of judges were delivering its unanimous verdict on the case.' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Identify the true subject of the sentence. The subject is the singular collective noun "panel" (the prepositional phrase "of judges" modifies it).\nStep 2: Since the panel acts as a single unified entity to deliver a "unanimous" verdict, it takes a singular verb ("has delivered") and a singular neuter pronoun ("its").\nStep 3: Option B incorrectly uses the plural verb "have", Option C uses plural "are", and Option D uses plural "were" with singular "its".\nTherefore, Option A is grammatically sound and correct.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Grammar',
    subtopic: 'Subject-Verb Agreement & Collective Nouns',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'English Grammar & Syntax Standards',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Grammar', 'Subject-Verb Agreement', 'Verbal Ability', 'Sentence Correction']
  },

  // 2. Easy - Error Spotting: Prepositional Collocations
  {
    id: 'q_accenture_024',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the sentence and find the segment containing a grammatical error:\n"The project manager insisted (A) / to submitting the quarterly audit report (B) / prior to the board meeting (C) / without further delay (D)."',
    options: [
      { id: 'A', text: 'The project manager insisted' },
      { id: 'B', text: 'to submitting the quarterly audit report' },
      { id: 'C', text: 'prior to the board meeting' },
      { id: 'D', text: 'without further delay' }
    ],
    correctAnswer: 'B',
    explanation: 'Step 1: Examine the governing verb in segment A: "insisted".\nStep 2: In English grammar, the verb "insist" takes the preposition "on" (or "upon") followed by a gerund ("insisted on submitting"), or a subjunctive "that" clause ("insisted that we submit"). It does not collocate with the infinitive preposition "to submitting".\nStep 3: Hence, segment B contains the error and should be corrected to "on submitting the quarterly audit report".\nTherefore, Option B is the erroneous part.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Error Spotting',
    subtopic: 'Verb-Preposition Collocation',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Standard English Prepositional Usages',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Error Spotting', 'Prepositions', 'Collocations', 'Verbal Ability']
  },

  // 3. Easy - Sentence Correction: Double Negatives
  {
    id: 'q_accenture_025',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the option that best replaces the underlined phrase to make the sentence correct:\n"The deployment engineer could not scarcely find any error in the updated configuration file."',
    options: [
      { id: 'A', text: 'could scarcely find any error' },
      { id: 'B', text: 'could not scarcely find no error' },
      { id: 'C', text: 'could scarcely find no error' },
      { id: 'D', text: 'scarcely could not find any error' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Analyze the phrase "could not scarcely". The adverb "scarcely" already carries a negative restrictive meaning ("hardly" or "barely").\nStep 2: Combining "not" with "scarcely" creates an ungrammatical double negative.\nStep 3: Replacing the phrase with "could scarcely find any error" eliminates the redundancy while conveying the intended meaning clearly.\nTherefore, Option A is the correct replacement.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Double Negatives & Restrictive Adverbs',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Sentence Structure & Modifier Rules',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Double Negatives', 'Adverbs', 'Verbal Ability']
  },

  // 4. Easy - Vocabulary in Context: Precise Terminology
  {
    id: 'q_accenture_026',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the word that best fills the blank in the given sentence:\n"The new cybersecurity policy is designed to be ________, leaving no room for ambiguity or subjective interpretation."',
    options: [
      { id: 'A', text: 'equivocal' },
      { id: 'B', text: 'explicit' },
      { id: 'C', text: 'ephemeral' },
      { id: 'D', text: 'esoteric' }
    ],
    correctAnswer: 'B',
    explanation: 'Step 1: Look at the context clue: "leaving no room for ambiguity or subjective interpretation".\nStep 2: "Explicit" means stated clearly and in detail, leaving no room for confusion or doubt.\nStep 3: "Equivocal" means ambiguous (the opposite), "Ephemeral" means short-lived, and "Esoteric" means understood only by a small group.\nTherefore, Option B ("explicit") fits the sentence perfectly.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Contextual Word Choice',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Contextual Vocabulary & Usage',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Contextual Usage', 'Word Choice', 'Verbal Ability']
  },

  // 5. Medium - Grammar: Conditional Clauses (Third Conditional)
  {
    id: 'q_accenture_027',
    questionType: 'MCQ_SINGLE',
    questionText: 'Complete the sentence with the grammatically correct sequence of verb tenses:\n"If the team ________ the latency anomaly during initial load testing, the production outage ________ prevented."',
    options: [
      { id: 'A', text: 'had detected, would have been' },
      { id: 'B', text: 'would have detected, would be' },
      { id: 'C', text: 'detected, will have been' },
      { id: 'D', text: 'had detected, would be' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The sentence refers to an unfulfilled hypothetical situation in the past (Third Conditional).\nStep 2: The structure of a third conditional sentence is: If + past perfect ("had detected"), main clause: would have been + past participle ("would have been prevented").\nStep 3: "Would have" must never appear inside the "if" condition clause.\nTherefore, Option A correctly completes the conditional structure.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Grammar',
    subtopic: 'Third Conditional & Past Subjunctive',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Conditional Sentences & Tense Harmony',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Grammar', 'Conditionals', 'Past Perfect', 'Verbal Ability']
  },

  // 6. Medium - Error Spotting: Parallelism in Correlative Conjunctions
  {
    id: 'q_accenture_028',
    questionType: 'MCQ_SINGLE',
    questionText: 'Identify the segment that contains a grammatical error:\n"The senior architect neither approved (A) / the microservices restructuring plan (B) / nor did he suggest (C) / an alternative migration roadmap (D)."',
    options: [
      { id: 'A', text: 'The senior architect neither approved' },
      { id: 'B', text: 'the microservices restructuring plan' },
      { id: 'C', text: 'nor did he suggest' },
      { id: 'D', text: 'an alternative migration roadmap' }
    ],
    correctAnswer: 'C',
    explanation: 'Step 1: Identify the correlative conjunction pair: "neither ... nor ...".\nStep 2: Correlative conjunctions require strict parallel grammatical structure. In segment A, "neither" is placed directly before the transitive verb "approved", governing the direct object in B ("the plan").\nStep 3: Therefore, "nor" must be placed directly before a parallel verb ("suggested") governing its direct object in D ("an alternative roadmap").\nStep 4: The insertion of the auxiliary clause "did he suggest" breaks parallelism. The correct phrasing is "neither approved the plan nor suggested an alternative roadmap".\nTherefore, segment C contains the error.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Error Spotting',
    subtopic: 'Parallelism & Correlative Conjunctions',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Parallel Structure & Conjunction Rules',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Error Spotting', 'Parallelism', 'Correlative Conjunctions', 'Verbal Ability']
  },

  // 7. Medium - Sentence Correction: Dangling Participles
  {
    id: 'q_accenture_029',
    questionType: 'MCQ_SINGLE',
    questionText: 'Which version of the sentence correctly resolves the dangling modifier?\n"Having completed the automated unit test suite, the deployment script was executed by the DevOps engineer."',
    options: [
      { id: 'A', text: 'Having completed the automated unit test suite, the deployment script ran.' },
      { id: 'B', text: 'Having completed the automated unit test suite, the DevOps engineer executed the deployment script.' },
      { id: 'C', text: 'Having completed the automated unit test suite, execution of the deployment script began.' },
      { id: 'D', text: 'The automated unit test suite having been completed, the deployment script was executed by him.' }
    ],
    correctAnswer: 'B',
    explanation: 'Step 1: Identify the introductory participial phrase: "Having completed the automated unit test suite".\nStep 2: An introductory modifier must immediately modify the logical subject that performs the action. A "deployment script" cannot complete a test suite; the "DevOps engineer" does.\nStep 3: In Option B, the subject immediately following the comma is "the DevOps engineer", which accurately matches the agent of the introductory phrase.\nTherefore, Option B correctly eliminates the dangling modifier.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Dangling & Misplaced Modifiers',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Modifier Syntax & Participial Clauses',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Modifiers', 'Dangling Participles', 'Verbal Ability']
  },

  // 8. Medium - Vocabulary in Context: Nuanced Semantic Pairing
  {
    id: 'q_accenture_030',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the pair of words that best completes the sentence:\n"Although the lead investigator presented a ________ argument supported by data, several board members remained ________ to the proposed organizational restructuring."',
    options: [
      { id: 'A', text: 'cogent, hostile' },
      { id: 'B', text: 'spurious, receptive' },
      { id: 'C', text: 'convoluted, indifferent' },
      { id: 'D', text: 'feeble, averse' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The conjunction "Although" establishes a contrast between the quality of the argument and the board members\' reaction.\nStep 2: "supported by data" indicates the argument was strong, convincing, and logical. "Cogent" means clear, logical, and convincing.\nStep 3: The contrasting clause requires a resistant reaction. "Hostile" (opposed) creates the exact contrast required by "Although".\nStep 4: Other pairs fail to create the proper contrast or misalign with "supported by data".\nTherefore, Option A is the correct answer.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Sentence Completion & Context Clues',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Advanced Verbal Reasoning & Sentence Completion',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Sentence Completion', 'Antonyms/Contrast', 'Verbal Ability']
  },

  // 9. Medium - Paragraph Ordering (Para Jumbles): Logical Cohesion
  {
    id: 'q_accenture_031',
    questionType: 'MCQ_SINGLE',
    questionText: 'Rearrange the following four sentences (P, Q, R, S) into a coherent, logically sound paragraph:\n(P) Consequently, data pipeline latency decreased by over 40 percent.\n(Q) To address recurring bottleneck issues, the engineering team introduced distributed in-memory caching.\n(R) Modern analytical applications require real-time processing of high-velocity event streams.\n(S) This architectural enhancement ensured that frequently accessed aggregations were served without hitting disk storage.',
    options: [
      { id: 'A', text: 'R -> Q -> S -> P' },
      { id: 'B', text: 'Q -> S -> P -> R' },
      { id: 'C', text: 'R -> P -> Q -> S' },
      { id: 'D', text: 'S -> Q -> R -> P' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Identify the opening statement. Sentence (R) introduces the general domain context (real-time processing requirements) and functions as the independent topic sentence.\nStep 2: Sentence (Q) introduces the specific problem and solution ("bottleneck issues ... introduced distributed in-memory caching").\nStep 3: Sentence (S) explains the mechanism of this solution ("This architectural enhancement ensured that...").\nStep 4: Sentence (P) presents the final quantifiable outcome ("Consequently, data pipeline latency decreased...").\nStep 5: Thus, the sequence R -> Q -> S -> P forms a seamless, cause-and-effect narrative.\nTherefore, Option A is correct.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Reading Comprehension',
    subtopic: 'Para Jumbles & Discourse Coherence',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Paragraph Organization & Logical Flow',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Para Jumbles', 'Discourse Coherence', 'Reading Comprehension', 'Verbal Ability']
  },

  // 10. Medium - Reading Comprehension: Core Inference
  {
    id: 'q_accenture_032',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the short excerpt and answer the question:\n"While early cloud migrations focused primarily on infrastructure consolidation and immediate operational expenditure reduction, contemporary digital transformations treat cloud-native paradigms as engines of business agility. Organizations that merely lift-and-shift legacy monoliths frequently encounter unforeseen maintenance overheads without unlocking the scalability or rapid release cycles characteristic of true microservices architectures."\n\nWhich of the following statements can be most logically inferred from the passage?',
    options: [
      { id: 'A', text: 'A direct lift-and-shift migration of legacy monolithic systems automatically guarantees maximum operational agility.' },
      { id: 'B', text: 'Re-architecting applications to cloud-native paradigms is more critical for achieving continuous release agility than simple infrastructure relocation.' },
      { id: 'C', text: 'Infrastructure consolidation is no longer a viable strategy for any modern enterprise.' },
      { id: 'D', text: 'Microservices architectures invariably result in higher total operational expenditures than on-premise systems.' }
    ],
    correctAnswer: 'B',
    explanation: 'Step 1: Analyze the passage\'s thesis: Simple "lift-and-shift" migrations fail to unlock scalability and agility, whereas "cloud-native paradigms" and "microservices" act as engines of agility.\nStep 2: Evaluate Option B: It directly reflects the author\'s assertion that true agility requires cloud-native adoption rather than mere physical relocation of legacy software.\nStep 3: Option A directly contradicts the text; Options C and D introduce unsupported extreme claims.\nTherefore, Option B is the only logically valid inference.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Reading Comprehension',
    subtopic: 'Analytical Inference & Author Intent',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Reading Comprehension & Critical Extraction',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Reading Comprehension', 'Inference', 'Passage Analysis', 'Verbal Ability']
  },

  // 11. Medium - Grammar: Subjunctive Mood
  {
    id: 'q_accenture_033',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the grammatically correct form to complete the sentence:\n"The security audit committee mandated that the default administrator password ________ rotated immediately across all server nodes."',
    options: [
      { id: 'A', text: 'is' },
      { id: 'B', text: 'be' },
      { id: 'C', text: 'was' },
      { id: 'D', text: 'should have been' }
    ],
    correctAnswer: 'B',
    explanation: 'Step 1: The main verb "mandated" is a verb of demand/urgency (mandative subjunctive).\nStep 2: Verbs such as mandate, recommend, insist, require, and suggest take a "that" clause with the base form of the verb (subjunctive "be" rather than "is" or "was").\nStep 3: The correct subjunctive structure is "...mandated that the password be rotated...".\nTherefore, Option B ("be") is grammatically required.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Grammar',
    subtopic: 'Mandative Subjunctive Mood',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Subjunctive Mood & Formal Syntax',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Grammar', 'Subjunctive Mood', 'Verbal Ability', 'Syntax']
  },

  // 12. Medium - Error Spotting: Comparative Forms & Redundancy
  {
    id: 'q_accenture_034',
    questionType: 'MCQ_SINGLE',
    questionText: 'Find the segment that contains a grammatical error:\n"The performance of the revised caching algorithm (A) / is significantly more superior (B) / to that of the baseline implementation (C) / under peak load conditions (D)."',
    options: [
      { id: 'A', text: 'The performance of the revised caching algorithm' },
      { id: 'B', text: 'is significantly more superior' },
      { id: 'C', text: 'to that of the baseline implementation' },
      { id: 'D', text: 'under peak load conditions' }
    ],
    correctAnswer: 'B',
    explanation: 'Step 1: Examine segment B: "is significantly more superior".\nStep 2: Adjectives of Latin origin ending in "-ior" (superior, inferior, senior, junior, prior) are absolute comparative degrees and already imply comparison. They must not be preceded by "more" or "less".\nStep 3: Furthermore, they correctly collocate with "to" (as seen in segment C), but "more superior" is a redundant double comparative error.\nStep 4: The phrase should simply read "is significantly superior".\nTherefore, segment B contains the error.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Error Spotting',
    subtopic: 'Comparative Adjectives & Redundancy',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Adjective Comparison & Latin Comparatives',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Error Spotting', 'Comparatives', 'Redundancy', 'Verbal Ability']
  },

  // 13. Medium - Sentence Correction: Idiomatic Phrasal Precision
  {
    id: 'q_accenture_035',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the option that correctly replaces the underlined phrase:\n"In compliance to the corporate governance directive, all third-party vendors must submit financial audits."',
    options: [
      { id: 'A', text: 'In compliance with' },
      { id: 'B', text: 'In compliance of' },
      { id: 'C', text: 'With compliance to' },
      { id: 'D', text: 'At compliance with' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The standard English idiomatic prepositional phrase is "in compliance with" (meaning in accordance with a rule, regulation, or law).\nStep 2: Phrasings like "in compliance to" or "in compliance of" are unidiomatic and grammatically incorrect.\nTherefore, Option A is the correct replacement.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Idiomatic Prepositional Phrases',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Idiomatic Usage & Prepositional Combinations',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Idioms', 'Prepositions', 'Verbal Ability']
  },

  // 14. Medium - Vocabulary in Context: Contextual Antonyms
  {
    id: 'q_accenture_036',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the word that is most nearly OPPOSITE in meaning to the capitalized word in the given context:\n"The architect advocated for a PRAGMATIC approach to feature development, prioritizing user feedback over theoretical purity."',
    options: [
      { id: 'A', text: 'Utilitarian' },
      { id: 'B', text: 'Quixotic' },
      { id: 'C', text: 'Empirical' },
      { id: 'D', text: 'Judicious' }
    ],
    correctAnswer: 'B',
    explanation: 'Step 1: "Pragmatic" means dealing with things sensibly and realistically based on practical rather than theoretical considerations.\nStep 2: "Quixotic" means exceedingly idealistic, unrealistic, and impractical (from Don Quixote), which is the exact opposite of pragmatic.\nStep 3: "Utilitarian", "Empirical", and "Judicious" are related synonyms or aligned qualities.\nTherefore, Option B ("Quixotic") is the antonym.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Contextual Antonyms',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Advanced Vocabulary & Antonyms',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Antonyms', 'Contextual Meaning', 'Verbal Ability']
  },

  // 15. Hard - Reading Comprehension: Critical Evaluation of Assumptions
  {
    id: 'q_accenture_037',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the argumentative statement:\n"The transition from manual quality assurance to end-to-end continuous automated testing has reduced post-release defect leakage by 60 percent. Therefore, software reliability in enterprise applications is strictly a function of test execution coverage rather than system architectural design."\n\nWhich of the following, if true, most seriously weakens the argument\'s conclusion?',
    options: [
      { id: 'A', text: 'Automated test suites can be executed much faster than manual exploratory testing sessions.' },
      { id: 'B', text: 'Catastrophic failures in distributed cloud systems frequently arise from unforeseen cascading network partitions that pass isolated unit and integration test suites.' },
      { id: 'C', text: 'Enterprises that adopt automated testing also tend to hire developers with higher average years of experience.' },
      { id: 'D', text: 'Continuous integration tools require ongoing license subscriptions and computational cluster maintenance.' }
    ],
    correctAnswer: 'B',
    explanation: 'Step 1: Identify the argument\'s conclusion: Software reliability is *strictly* a function of test coverage and not architectural design.\nStep 2: To weaken this claim, we must demonstrate that high test coverage alone cannot guarantee reliability if architectural resilience (such as handling distributed partitions) is neglected.\nStep 3: Option B demonstrates that architectural vulnerabilities (cascading partitions) cause major failures even when all test suites pass, directly refuting the claim that reliability depends strictly on test coverage.\nTherefore, Option B most effectively undermines the conclusion.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Reading Comprehension',
    subtopic: 'Critical Reasoning & Argument Weakening',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Critical Reading & Argument Evaluation',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Reading Comprehension', 'Critical Reasoning', 'Weaken Argument', 'Verbal Ability']
  },

  // 16. Hard - Grammar: Inverted Word Order & Negative Adverbial Fronting
  {
    id: 'q_accenture_038',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the sentence that demonstrates fully correct inverted syntax following a fronted negative adverbial phrase:',
    options: [
      { id: 'A', text: 'Seldom the infrastructure team has encountered such unprecedented database deadlocks during regular business hours.' },
      { id: 'B', text: 'Seldom has the infrastructure team encountered such unprecedented database deadlocks during regular business hours.' },
      { id: 'C', text: 'Seldom the infrastructure team encountered such unprecedented database deadlocks during regular business hours.' },
      { id: 'D', text: 'Seldom had encountered the infrastructure team such unprecedented database deadlocks during regular business hours.' }
    ],
    correctAnswer: 'B',
    explanation: 'Step 1: When a negative or restrictive adverbial (such as "Seldom", "Rarely", "Hardly", "Under no circumstances") is placed at the beginning of a sentence for emphasis, subject-auxiliary inversion is mandatory.\nStep 2: The structure requires: Negative Adverb + Auxiliary Verb ("has") + Subject ("the infrastructure team") + Main Verb ("encountered").\nStep 3: Option A and C fail to invert, and Option D inverts the full compound verb improperly.\nTherefore, Option B correctly implements negative inversion.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Grammar',
    subtopic: 'Subject-Auxiliary Inversion & Fronted Negatives',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Inverted Syntax & Stylistic Inversion',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Grammar', 'Inversion', 'Advanced Syntax', 'Verbal Ability']
  },

  // 17. Hard - Sentence Correction: Complex Elliptical Comparison
  {
    id: 'q_accenture_039',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the option that correctly rectifies the faulty comparison in the sentence below:\n"The memory footprint of application instances running on Runtime Alpha is substantially smaller than Runtime Beta."',
    options: [
      { id: 'A', text: 'smaller than that of application instances running on Runtime Beta' },
      { id: 'B', text: 'smaller than those of application instances running on Runtime Beta' },
      { id: 'C', text: 'smaller as compared to Runtime Beta' },
      { id: 'D', text: 'smaller than the instances of Runtime Beta' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Analyze the elements being compared. The sentence compares "The memory footprint" (singular abstract noun) of instances on Runtime Alpha with "Runtime Beta" (an entire software runtime), creating an illogical comparison.\nStep 2: The comparison must compare the *memory footprint* of Alpha with the *memory footprint* of Beta.\nStep 3: Because "memory footprint" is singular, it is correctly referenced by the singular demonstrative pronoun "that of".\nStep 4: Option A ("smaller than that of application instances running on Runtime Beta") establishes the exact grammatical and logical parallelism.\nTherefore, Option A is correct.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Illogical Comparison & Demonstrative Pronouns',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Comparative Logic & Parallel Demonstratives',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Comparisons', 'Demonstratives', 'Verbal Ability']
  }
];

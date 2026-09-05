import { CanonicalQuestion } from '../../types';
import { TAXONOMY } from '../taxonomy';

export const cognizantQuestions_042_061: CanonicalQuestion[] = [
  // =========================================================================
  // SECTION 3: VERBAL ABILITY (20 Questions: 5 Easy, 11 Medium, 4 Hard)
  // q_cognizant_042 to q_cognizant_061
  // =========================================================================

  // 1. Easy - Grammar: Subject-Verb Agreement with Indefinite Pronouns
  {
    id: 'q_cognizant_042',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the grammatically correct sentence from the options below:',
    options: [
      { id: 'A', text: 'Each of the participating candidates was assigned a unique identification badge.' },
      { id: 'B', text: 'Each of the participating candidates were assigned a unique identification badge.' },
      { id: 'C', text: 'Each of the participating candidates have been assigned a unique identification badge.' },
      { id: 'D', text: 'Each of the participating candidates are assigned a unique identification badge.' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The grammatical subject of the sentence is the singular indefinite pronoun "Each". The prepositional phrase "of the participating candidates" is an adjectival modifier.\nStep 2: A singular subject requires a singular verb ("was assigned" rather than plural "were", "have", or "are").\nStep 3: Options B, C, and D incorrectly treat "candidates" as the grammatical subject and employ plural verbs.\nTherefore, Option A is grammatically correct.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Grammar',
    subtopic: 'Subject-Verb Agreement with Indefinite Pronouns',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'English Syntax & Indefinite Pronoun Agreement',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Grammar', 'Subject-Verb Agreement', 'Verbal Ability']
  },

  // 2. Easy - Error Spotting: Double Comparatives
  {
    id: 'q_cognizant_043',
    questionType: 'MCQ_SINGLE',
    questionText: 'Identify the segment of the sentence that contains a grammatical error:\n"The newly installed cooling unit (A) / is more quieter (B) / than the older mechanical model (C) / in the server room (D)."',
    options: [
      { id: 'A', text: 'The newly installed cooling unit' },
      { id: 'B', text: 'is more quieter' },
      { id: 'C', text: 'than the older mechanical model' },
      { id: 'D', text: 'in the server room' }
    ],
    correctAnswer: 'B',
    explanation: 'Step 1: Examine segment B: "is more quieter".\nStep 2: "Quieter" is already the synthetic comparative form of the monosyllabic adjective "quiet".\nStep 3: Preceding it with "more" creates an ungrammatical double comparative error. The phrase should simply read "is quieter" (or "is much quieter").\nTherefore, segment B contains the error (Option B).',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Error Spotting',
    subtopic: 'Double Comparatives & Redundant Modifiers',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Comparative Morphology & Modifier Redundancy',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Error Spotting', 'Comparatives', 'Grammar', 'Verbal Ability']
  },

  // 3. Easy - Sentence Correction: Correct Preposition Collocation
  {
    id: 'q_cognizant_044',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the option that correctly replaces the underlined phrase:\n"The team members congratulated him for his remarkable achievement in the national coding championship."',
    options: [
      { id: 'A', text: 'congratulated him on his remarkable achievement' },
      { id: 'B', text: 'congratulated him at his remarkable achievement' },
      { id: 'C', text: 'congratulated him with his remarkable achievement' },
      { id: 'D', text: 'congratulated him over his remarkable achievement' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: In standard English idiom and grammar, the verb "congratulate" specifically collocates with the preposition "on" (to congratulate someone ON something).\nStep 2: Phrasings such as "congratulated for", "at", or "with" are grammatically incorrect prepositions in this context.\nTherefore, Option A ("congratulated him on his remarkable achievement") is the correct replacement.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Verb-Preposition Collocation (Congratulate on)',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Idiomatic Preposition Collocations',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Prepositions', 'Collocations', 'Verbal Ability']
  },

  // 4. Easy - Vocabulary: Direct Contextual Synonym
  {
    id: 'q_cognizant_045',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the word that is most nearly SIMILAR in meaning to the capitalized word:\n"The software architect gave LUCID instructions to ensure the junior developers encountered no ambiguity during implementation."',
    options: [
      { id: 'A', text: 'Clear' },
      { id: 'B', text: 'Ambiguous' },
      { id: 'C', text: 'Complicated' },
      { id: 'D', text: 'Vague' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: "Lucid" means expressed clearly, easy to understand, transparent, and completely free of confusion.\nStep 2: Context clue: "encountered no ambiguity".\nStep 3: "Clear" is an exact synonym. "Ambiguous", "Complicated", and "Vague" are direct antonyms.\nTherefore, Option A ("Clear") is the correct synonym.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Contextual Synonyms',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Contextual Semantics & Synonyms',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Synonyms', 'Verbal Ability']
  },

  // 5. Easy - Vocabulary: Direct Contextual Antonym
  {
    id: 'q_cognizant_046',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the word that is most nearly OPPOSITE in meaning to the capitalized word:\n"The company announced a VOLUNTARY retirement scheme for senior employees."',
    options: [
      { id: 'A', text: 'Compulsory' },
      { id: 'B', text: 'Optional' },
      { id: 'C', text: 'Discretionary' },
      { id: 'D', text: 'Willing' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: "Voluntary" means done, given, or acting of one\'s own free will or choice without compulsion.\nStep 2: "Compulsory" means required by law or a rule; mandatory and obligatory.\nStep 3: "Optional", "Discretionary", and "Willing" are synonyms or related terms.\nTherefore, Option A ("Compulsory") is the direct antonym.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Contextual Antonyms',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Lexical Semantics & Antonym Pairs',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Antonyms', 'Verbal Ability']
  },

  // 6. Medium - Grammar: Conditional Clause Inversion (Had + Past Participle)
  {
    id: 'q_cognizant_047',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the grammatically correct clause to complete the conditional sentence:\n"________ the risk assessment report earlier, the leadership team would not have approved the risky deployment."',
    options: [
      { id: 'A', text: 'Had they reviewed' },
      { id: 'B', text: 'If they reviewed' },
      { id: 'C', text: 'Have they reviewed' },
      { id: 'D', text: 'Did they review' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The main clause uses the third conditional modal perfect: "would not have approved".\nStep 2: In formal English, inverted conditional structures replace "If they had reviewed" with "Had they reviewed" (subject-auxiliary inversion in the protasis).\nStep 3: "If they reviewed" is second conditional (mismatched with "would have approved"), while "Have they reviewed" and "Did they review" are interrogative or tense mismatches.\nTherefore, Option A ("Had they reviewed") correctly completes the third conditional inversion.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Grammar',
    subtopic: 'Inverted Conditionals & Past Subjunctive Harmony',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Conditional Inversion & Subjunctive Syntax',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Grammar', 'Conditionals', 'Inversion', 'Verbal Ability']
  },

  // 7. Medium - Error Spotting: Misplaced Modifiers
  {
    id: 'q_cognizant_048',
    questionType: 'MCQ_SINGLE',
    questionText: 'Find the segment that contains a grammatical error:\n"Covered with thick layers of dust (A) / the security auditor found (B) / the backup hard drive (C) / beneath the server cabinet (D)."',
    options: [
      { id: 'A', text: 'Covered with thick layers of dust' },
      { id: 'B', text: 'the security auditor found' },
      { id: 'C', text: 'the backup hard drive' },
      { id: 'D', text: 'beneath the server cabinet' }
    ],
    correctAnswer: 'B',
    explanation: 'Step 1: Identify the introductory participial modifier: "Covered with thick layers of dust".\nStep 2: Modifiers must immediately precede or follow the noun they logically describe.\nStep 3: In segment B, the modifier is placed directly before "the security auditor", absurdly implying that the auditor himself was covered with thick layers of dust.\nStep 4: The sentence should be restructured so that "the backup hard drive" immediately follows the participial phrase (e.g., "The security auditor found the backup hard drive, which was covered with thick layers of dust...").\nTherefore, segment B contains the misplaced modifier error (Option B).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Error Spotting',
    subtopic: 'Misplaced & Dangling Participial Modifiers',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Modifier Syntax & Participial Attachment',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Error Spotting', 'Modifiers', 'Grammar', 'Verbal Ability']
  },

  // 8. Medium - Sentence Correction: Parallelism in Lists and Series
  {
    id: 'q_cognizant_049',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the option that best rectifies the parallelism error in the underlined portion:\n"The training curriculum focuses on developing analytical skills, writing clean code, and to understand core database architecture."',
    options: [
      { id: 'A', text: 'and understanding core database architecture' },
      { id: 'B', text: 'and to understand core database architectures' },
      { id: 'C', text: 'and how to understand database architecture' },
      { id: 'D', text: 'as well as to understand database architecture' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Identify the coordinating series governed by "focuses on":\n- Item 1: "developing analytical skills" (gerund phrase)\n- Item 2: "writing clean code" (gerund phrase)\n- Item 3: "to understand core database architecture" (infinitive phrase)\nStep 2: Items joined in a series must maintain identical grammatical form (parallelism).\nStep 3: Converting the infinitive "to understand" to the gerund "understanding" establishes perfect parallel structure across all three list elements.\nTherefore, Option A is the correct replacement.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Parallelism in Gerund & Series Coordinates',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Parallel Structure & Coordinating Conjunctions',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Parallelism', 'Gerunds', 'Verbal Ability']
  },

  // 9. Medium - Vocabulary in Context: Contextual Word Nuance
  {
    id: 'q_cognizant_050',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the word that best fills the blank to complete the sentence:\n"The CEO made a ________ decision to divest from legacy hardware manufacturing and pivot all resources toward generative AI platforms."',
    options: [
      { id: 'A', text: 'strategic' },
      { id: 'B', text: 'tentative' },
      { id: 'C', text: 'sporadic' },
      { id: 'D', text: 'frivolous' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Look at the context clue: "divest from legacy hardware ... pivot all resources toward generative AI platforms".\nStep 2: This represents a high-level, long-term, calculated organizational direction.\nStep 3: "Strategic" means relating to the identification of long-term or overall aims and interests and the means of achieving them.\nStep 4: "Tentative" (uncertain), "Sporadic" (irregular), and "Frivolous" (careless) contradict the deliberate nature of a major corporate pivot.\nTherefore, Option A ("strategic") is the most fitting word.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Contextual Word Choice & Business Collocations',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Contextual Vocabulary & Semantic Fit',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Word Choice', 'Verbal Ability']
  },

  // 10. Medium - Para Jumbles: 4-Sentence Logical Flow
  {
    id: 'q_cognizant_051',
    questionType: 'MCQ_SINGLE',
    questionText: 'Rearrange the four sentences (P, Q, R, S) into a coherent, logically sound paragraph:\n(P) Without rigorous data validation at the ingestion layer, machine learning models inevitably suffer from degradation.\n(Q) High-quality training data is the indispensable cornerstone of any reliable artificial intelligence system.\n(R) This phenomenon, widely known as "garbage in, garbage out", leads to flawed automated decisions.\n(S) Therefore, modern enterprise pipelines dedicate extensive resources to continuous data cleansing and anomaly detection.',
    options: [
      { id: 'A', text: 'Q -> P -> R -> S' },
      { id: 'B', text: 'P -> R -> S -> Q' },
      { id: 'C', text: 'Q -> S -> P -> R' },
      { id: 'D', text: 'R -> P -> Q -> S' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Identify the opening topic statement. Sentence (Q) introduces the primary subject ("High-quality training data is the cornerstone...").\nStep 2: Sentence (P) elaborates on the negative consequence when data quality is lacking ("Without rigorous data validation...").\nStep 3: Sentence (R) names and defines this specific consequence ("This phenomenon, widely known as...").\nStep 4: Sentence (S) provides the concluding resolution introduced by "Therefore" ("Therefore, modern enterprise pipelines dedicate...").\nStep 5: The sequence Q -> P -> R -> S establishes a flawless premise-elaboration-impact-resolution narrative.\nTherefore, Option A is the correct arrangement.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Reading Comprehension',
    subtopic: 'Para Jumbles & Discourse Coherence',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Discourse Markers & Narrative Architecture',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Para Jumbles', 'Reading Comprehension', 'Logical Flow', 'Verbal Ability']
  },

  // 11. Medium - Reading Comprehension: Core Passage Extraction
  {
    id: 'q_cognizant_052',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the short excerpt below and answer the question:\n"Continuous Integration and Continuous Deployment (CI/CD) pipelines have fundamentally altered the software delivery lifecycle. By automating code compilation, unit testing, and artifact deployment, CI/CD minimizes human error during release cycles. However, the efficacy of automated pipelines depends heavily on the comprehensiveness of automated test coverage; without robust assertions, pipelines merely accelerate the propagation of undetected bugs into production environments."\n\nAccording to the passage, what is the primary risk of deploying automated CI/CD pipelines without comprehensive test coverage?',
    options: [
      { id: 'A', text: 'It accelerates the rapid deployment of undetected software defects into live production environments.' },
      { id: 'B', text: 'It significantly increases the financial cost of cloud server hardware.' },
      { id: 'C', text: 'It prevents developers from collaborating on shared version-control branches.' },
      { id: 'D', text: 'It forces organizations to abandon automated deployment completely.' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Refer directly to the concluding sentence of the excerpt: "...without robust assertions, pipelines merely accelerate the propagation of undetected bugs into production environments."\nStep 2: Evaluate Option A: It directly restates that the primary risk is accelerating the deployment of undetected defects into production.\nStep 3: Options B, C, and D state claims not supported or mentioned in the text.\nTherefore, Option A is the factually accurate response.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Reading Comprehension',
    subtopic: 'Direct Textual Extraction & Risk Analysis',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Reading Comprehension & Critical Analysis',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Reading Comprehension', 'Passage Analysis', 'Verbal Ability']
  },

  // 12. Medium - Grammar: Relative Pronouns (Who vs Whom)
  {
    id: 'q_cognizant_053',
    questionType: 'MCQ_SINGLE',
    questionText: 'Complete the sentence with the grammatically correct relative pronoun:\n"The senior consultant, ________ the board of directors appointed to lead the restructuring committee, has over twenty years of executive experience."',
    options: [
      { id: 'A', text: 'whom' },
      { id: 'B', text: 'who' },
      { id: 'C', text: 'which' },
      { id: 'D', text: 'whose' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Analyze the role of the relative pronoun within its dependent clause: "the board of directors appointed [relative pronoun] to lead...".\nStep 2: The subject of the clause is "the board of directors" and the verb is "appointed".\nStep 3: The relative pronoun serves as the direct object of the verb "appointed" (they appointed him/her -> objective case).\nStep 4: The objective case relative pronoun for persons is "whom" (not subjective "who").\nTherefore, Option A ("whom") is grammatically required.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Grammar',
    subtopic: 'Relative Pronoun Cases (Who vs Whom)',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Case Grammar & Relative Clauses',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Grammar', 'Pronouns', 'Relative Clauses', 'Verbal Ability']
  },

  // 13. Medium - Error Spotting: Unnecessary Tense Shift
  {
    id: 'q_cognizant_054',
    questionType: 'MCQ_SINGLE',
    questionText: 'Identify the segment that contains a grammatical error:\n"The lead engineer analyzed the system logs (A) / identified the deadlock bottleneck (B) / and then creates a hotfix patch (C) / to resolve the outage (D)."',
    options: [
      { id: 'A', text: 'The lead engineer analyzed the system logs' },
      { id: 'B', text: 'identified the deadlock bottleneck' },
      { id: 'C', text: 'and then creates a hotfix patch' },
      { id: 'D', text: 'to resolve the outage' }
    ],
    correctAnswer: 'C',
    explanation: 'Step 1: Check the narrative tense across the compound predicate:\n- Verb 1: "analyzed" (Simple Past)\n- Verb 2: "identified" (Simple Past)\n- Verb 3: "creates" (Simple Present)\nStep 2: An unwarranted tense shift occurs in segment C from past tense to present tense.\nStep 3: To maintain tense harmony, the third verb must also be in the simple past tense: "and then created a hotfix patch".\nTherefore, segment C contains the error (Option C).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Error Spotting',
    subtopic: 'Tense Consistency & Compound Predicates',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Verb Tense Harmony & Sequential Actions',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Error Spotting', 'Tenses', 'Grammar', 'Verbal Ability']
  },

  // 14. Medium - Sentence Correction: Correlative Conjunction Precision
  {
    id: 'q_cognizant_055',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the option that correctly replaces the underlined phrase:\n"The new software update is not only faster than the previous release, but it is also reducing memory consumption."',
    options: [
      { id: 'A', text: 'but also more memory-efficient' },
      { id: 'B', text: 'but it also reduces memory consumption' },
      { id: 'C', text: 'but also reduces memory consumption' },
      { id: 'D', text: 'and also more memory-efficient' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Examine the correlative conjunction pair: "not only [adjective] ... but also [adjective]".\nStep 2: In the first element, "faster" is a comparative adjective predicate.\nStep 3: Parallelism requires the second element after "but also" to be a parallel comparative adjective predicate: "more memory-efficient".\nStep 4: Phrasings with continuous aspect clauses ("but it is also reducing...") break parallel structure.\nTherefore, Option A establishes crisp grammatical parallelism.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Correlative Conjunction Parallelism (Not only... but also)',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Parallel Adjective Predicates & Correlatives',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Correlative Conjunctions', 'Parallelism', 'Verbal Ability']
  },

  // 15. Medium - Vocabulary in Context: Contextual Antonym
  {
    id: 'q_cognizant_056',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the word that is most nearly OPPOSITE in meaning to the capitalized word in the given context:\n"The research committee found the preliminary evidence to be SPURIOUS and rejected the paper\'s core thesis."',
    options: [
      { id: 'A', text: 'Authentic' },
      { id: 'B', text: 'Deceptive' },
      { id: 'C', text: 'Dubious' },
      { id: 'D', text: 'Flawed' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: "Spurious" means not being what it purports to be; false, counterfeit, or illegitimate.\nStep 2: Context clue: "rejected the paper\'s core thesis".\nStep 3: "Authentic" (genuine, legitimate, valid) is the exact opposite of spurious.\nStep 4: "Deceptive", "Dubious", and "Flawed" are synonyms or related negative descriptors.\nTherefore, Option A ("Authentic") is the correct antonym.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Contextual Antonyms',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Antonym Oppositions & Lexical Meaning',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Antonyms', 'Verbal Ability']
  },

  // 16. Medium - Reading Comprehension: Author Tone & Stance
  {
    id: 'q_cognizant_057',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the short excerpt:\n"While proponents of rapid autonomous code generation herald it as the end of manual software engineering, prudent practitioners recognize that automated tools frequently introduce subtle security anti-patterns. True technical maturity lies not in blindly generating voluminous boilerplate, but in meticulously auditing generated code against stringent architectural constraints."\n\nWhat is the primary tone of the author in this passage?',
    options: [
      { id: 'A', text: 'Pragmatic and Cautionary' },
      { id: 'B', text: 'Dismissive and Cynical' },
      { id: 'C', text: 'Unreservedly Enthusiastic' },
      { id: 'D', text: 'Indifferent and Sarcastic' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Analyze the author\'s language: "prudent practitioners recognize", "frequently introduce subtle security anti-patterns", "meticulously auditing".\nStep 2: The author does not outright reject autonomous code generation (not dismissive/cynical), nor do they blindly celebrate it (not unreservedly enthusiastic).\nStep 3: Instead, the author advocates for realistic vigilance, architectural auditing, and practical prudence.\nTherefore, Option A ("Pragmatic and Cautionary") accurately identifies the author\'s tone.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Reading Comprehension',
    subtopic: 'Author Tone & Perspective Identification',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Critical Reading & Authorial Tone Evaluation',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Reading Comprehension', 'Author Tone', 'Verbal Ability']
  },

  // 17. Hard - Reading Comprehension: Critical Reasoning / Paradox Resolution
  {
    id: 'q_cognizant_058',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the paradox:\n"Despite upgrading all central server processors to higher clock-speed hardware, the average response latency of the corporate web application actually increased by 15% during peak hours."\n\nWhich of the following, if true, most effectively resolves the apparent paradox?',
    options: [
      { id: 'A', text: 'The faster processors generated database queries at a rate that overwhelmed the unupgraded legacy database connection pool, causing extensive queue blocking.' },
      { id: 'B', text: 'The new processors consumed 10% less electrical power than the older hardware.' },
      { id: 'C', text: 'The IT department completed the hardware installation ahead of schedule.' },
      { id: 'D', text: 'Peak hours occurred on weekdays between 10:00 AM and 2:00 PM.' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Identify the paradox: Faster CPU processing speeds led to *worse* overall application latency during peak hours.\nStep 2: To resolve the paradox, an explanation must provide an architectural bottleneck caused by the faster CPU throughput.\nStep 3: Option A explains that faster CPUs pushed query requests into downstream database connection pools faster than they could be processed, creating queue deadlocks and inflating overall latency.\nStep 4: Options B, C, and D provide irrelevant details that do not explain the latency increase.\nTherefore, Option A resolves the paradox.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Reading Comprehension',
    subtopic: 'Critical Reasoning & Paradox Resolution',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Critical Logic & System Paradox Resolution',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Reading Comprehension', 'Critical Reasoning', 'Paradox', 'Verbal Ability']
  },

  // 18. Hard - Grammar: Subjunctive Mood in Contrary-to-Fact Wish Clauses
  {
    id: 'q_cognizant_059',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the sentence that correctly adheres to formal past subjunctive grammar in a contrary-to-fact clause:',
    options: [
      { id: 'A', text: 'The infrastructure lead wishes that the distributed cache were scalable to handle sudden traffic surges.' },
      { id: 'B', text: 'The infrastructure lead wishes that the distributed cache was scalable to handle sudden traffic surges.' },
      { id: 'C', text: 'The infrastructure lead wishes that the distributed cache is scalable to handle sudden traffic surges.' },
      { id: 'D', text: 'The infrastructure lead wishes that the distributed cache will be scalable to handle sudden traffic surges.' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The sentence expresses a contrary-to-fact hypothetical wish in the present/future.\nStep 2: In formal English subjunctive grammar, the verb "to be" must take the form "were" for all persons and numbers (even singular third-person subjects like "the distributed cache").\nStep 3: "was" is colloquial, and "is" or "will be" fail to convey the unfulfilled subjunctive mood.\nTherefore, Option A ("...wishes that the distributed cache were scalable...") is grammatically correct.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Grammar',
    subtopic: 'Subjunctive Mood & Hypothetical Were-Clauses',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Subjunctive Mood & Formal English Grammar Rules',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Grammar', 'Subjunctive Mood', 'Syntax', 'Verbal Ability']
  },

  // 19. Hard - Sentence Correction: Illogical Comparison with Demonstrative Reference
  {
    id: 'q_cognizant_060',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the option that rectifies the faulty comparison in the sentence:\n"The execution throughput of the newly compiled Go microservice is nearly double Python."',
    options: [
      { id: 'A', text: 'is nearly double that of the Python microservice' },
      { id: 'B', text: 'is nearly double those of Python' },
      { id: 'C', text: 'is nearly double compared to Python' },
      { id: 'D', text: 'is nearly twice more than Python' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The sentence compares "The execution throughput" (an abstract noun) of a Go microservice directly with "Python" (a programming language), creating an illogical comparison.\nStep 2: The comparison must compare the throughput of the Go service with the throughput of the Python service.\nStep 3: Since "throughput" is singular, it is properly referenced by the singular demonstrative pronoun "that of".\nStep 4: Option A ("is nearly double that of the Python microservice") provides the exact logical and grammatical parallelism.\nTherefore, Option A is the correct answer.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Illogical Comparison & Singular Demonstrative Pronoun (That of)',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Comparative Logic & Parallel Syntax',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Comparisons', 'Demonstratives', 'Verbal Ability']
  },

  // 20. Hard - Vocabulary: Advanced Contextual Nuance
  {
    id: 'q_cognizant_061',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the pair of words that best completes the sentence logically and grammatically:\n"Although the lead architect was renowned for his ________ code reviews, his feedback was invariably ________ and intended to elevate engineering standards."',
    options: [
      { id: 'A', text: 'exacting, constructive' },
      { id: 'B', text: 'lenient, devastating' },
      { id: 'C', text: 'cursory, detrimental' },
      { id: 'D', text: 'arbitrary, hostile' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The conjunction "Although" sets up a contrast between the strict/demanding nature of the code reviews and the beneficial purpose of the feedback.\nStep 2: "intended to elevate engineering standards" indicates the second word must be positive and helpful. "Constructive" means serving a useful purpose and tending to build up.\nStep 3: The first word must reflect rigor or strictness. "Exacting" means making great demands on one\'s skill, attention, or other resources; rigorous and strict.\nStep 4: The pair "exacting, constructive" creates the exact intended contrast.\nTherefore, Option A is the correct pair.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Advanced Sentence Completion & Contextual Contrast',
    supportedRoles: ['Software Developer', 'SE', 'Data Analyst', 'Associate'],
    company: 'Cognizant',
    source: 'FirstRound Original',
    sourceReference: 'Advanced Sentence Completion & Semantic Contrast',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Sentence Completion', 'Nuance', 'Verbal Ability']
  }
];

import { CanonicalQuestion } from '../../types';
import { TAXONOMY } from '../taxonomy';

export const verbalQuestions: CanonicalQuestion[] = [
  // =========================================================================
  // TOPIC 1: READING COMPREHENSION (5 Questions: 1 Easy, 3 Medium, 1 Hard)
  // =========================================================================
  {
    id: 'q_verbal_001',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the following passage and answer the question:\n\n"The proliferation of artificial intelligence in software engineering has transformed developer workflows. Rather than writing boilerplate code manually, engineers now orchestrate generative models to synthesize scaffolding, allowing them to focus on architectural design and algorithmic correctness. However, this transition demands greater vigilance during code review to intercept hallucinated dependencies and subtle edge-case failures."\n\nAccording to the passage, what is the primary benefit of generative models for developers?',
    options: [
      { id: 'A', text: 'Completely eliminating the requirement for manual code review' },
      { id: 'B', text: 'Allowing developers to focus on architectural design and algorithmic correctness' },
      { id: 'C', text: 'Preventing all edge-case failures and software bugs' },
      { id: 'D', text: 'Generating production software without human intervention' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage explicitly states that orchestrating generative models to synthesize scaffolding allows engineers to "focus on architectural design and algorithmic correctness." Options A, C, and D are extreme and directly contradicted by the passage\'s emphasis on vigilance during code review.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Reading Comprehension',
    subtopic: 'Direct Factual Detail',
    supportedRoles: ['SE', 'SDE', 'Analyst', 'Business Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Passage Factual Retrieval',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Reading Comprehension', 'Direct Detail', 'Main Idea']
  },
  {
    id: 'q_verbal_002',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the passage below:\n\n"Decentralized renewable energy microgrids have emerged as a viable solution for remote communities lacking grid connectivity. Unlike centralized fossil fuel generation, microgrids utilize local solar and wind resources paired with lithium-ion storage. While capital expenditure remains steep, the elimination of fuel transport logistics and carbon emissions offers substantial long-term economic and environmental resilience."\n\nWhat can be logically inferred regarding decentralized microgrids?',
    options: [
      { id: 'A', text: 'Their ongoing operational fuel transportation costs are lower than centralized fossil stations.' },
      { id: 'B', text: 'They require no initial upfront financial capital investment.' },
      { id: 'C', text: 'They are unsuited for isolated geographic regions.' },
      { id: 'D', text: 'They produce higher greenhouse gas emissions than coal plants.' }
    ],
    correctAnswer: 'A',
    explanation: 'The passage mentions the "elimination of fuel transport logistics" as an advantage over centralized fossil fuel generation. Hence, it is logically inferred that ongoing fuel transportation costs for microgrids are lower/eliminated compared to centralized stations.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Reading Comprehension',
    subtopic: 'Logical Inference',
    supportedRoles: ['SE', 'Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Passage Logical Deductions',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Reading Comprehension', 'Inference', 'Context']
  },
  {
    id: 'q_verbal_003',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the passage below:\n\n"In economics, Gresham\'s Law posits that \'bad money drives out good.\' When two forms of commodity money with the same nominal face value circulate simultaneously, the currency perceived to have higher intrinsic metallic value is hoarded, melted, or exported, leaving the debased currency in everyday transactions."\n\nBased on the text, why does "good money" disappear from circulation?',
    options: [
      { id: 'A', text: 'The government legally bans good money from being used as legal tender.' },
      { id: 'B', text: 'Individuals hoard or export it due to its superior intrinsic value.' },
      { id: 'C', text: 'It has a lower nominal face value than bad money.' },
      { id: 'D', text: 'It depreciates faster than debased currencies.' }
    ],
    correctAnswer: 'B',
    explanation: 'The passage explains that currency perceived to have "higher intrinsic metallic value is hoarded, melted, or exported", which directly causes it to disappear from general circulation.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Reading Comprehension',
    subtopic: 'Supporting Detail & Cause-Effect',
    supportedRoles: ['SE', 'Analyst', 'Business Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Economic Concepts in Context',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Reading Comprehension', 'Cause and Effect']
  },
  {
    id: 'q_verbal_004',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the passage below:\n\n"The concept of cognitive dissonance explains the psychological discomfort experienced when an individual holds contradictory beliefs, values, or actions. To alleviate this friction, individuals frequently engage in rationalization, distorting objective facts to harmonize with preexisting self-perceptions rather than modifying their conduct."\n\nWhich of the following best describes the author\'s tone in the passage?',
    options: [
      { id: 'A', text: 'Cynical and derisive' },
      { id: 'B', text: 'Objective and analytical' },
      { id: 'C', text: 'Passionate and persuasive' },
      { id: 'D', text: 'Nostalgic and emotional' }
    ],
    correctAnswer: 'B',
    explanation: 'The author defines and explains cognitive dissonance and psychological rationalization in a balanced, neutral, and academic manner without personal bias, sarcasm, or emotional judgment. Thus, the tone is objective and analytical.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Reading Comprehension',
    subtopic: 'Author Tone & Style',
    supportedRoles: ['SE', 'Consultant', 'HR'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Passage Tone Analysis',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Reading Comprehension', 'Tone', 'Stylistics']
  },
  {
    id: 'q_verbal_005',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the following passage:\n\n"Historically, scientific paradigms resist replacement until anomalies accumulate to an intolerable threshold. Thomas Kuhn argued that paradigm shifts are not incremental aggregations of objective truth, but discontinuous revolutionary upheavals where competing worldviews prove fundamentally incommensurable. Scientific progress, therefore, is punctuated by sociological friction rather than seamless empirical progression."\n\nWhich statement most accurately synthesizes the central thesis of the passage?',
    options: [
      { id: 'A', text: 'Scientific truths accumulate smoothly through continuous, linear empirical observations.' },
      { id: 'B', text: 'Major paradigm changes are discontinuous revolutions marked by incommensurable frameworks and institutional friction.' },
      { id: 'C', text: 'Anomalies in scientific research are immediately addressed and resolved by scientific consensus.' },
      { id: 'D', text: 'Thomas Kuhn rejected empirical research in favor of purely sociological speculation.' }
    ],
    correctAnswer: 'B',
    explanation: 'The central thesis states that scientific progress is discontinuous, punctuated by revolutionary upheavals between incommensurable frameworks rather than smooth incremental accumulations. Therefore, Option B accurately captures this core thesis.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Reading Comprehension',
    subtopic: 'Central Idea Synthesis',
    supportedRoles: ['SE', 'SDE', 'Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Philosophy of Science Texts',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Reading Comprehension', 'Central Idea', 'Inference']
  },

  // =========================================================================
  // TOPIC 2: GRAMMAR (4 Questions: 1 Easy, 2 Medium, 1 Hard)
  // =========================================================================
  {
    id: 'q_verbal_006',
    questionType: 'MCQ_SINGLE',
    questionText: 'Fill in the blank with the correct verb form:\n\n"Neither the team lead nor the software engineers _______ available for the client demonstration this morning."',
    options: [
      { id: 'A', text: 'was' },
      { id: 'B', text: 'were' },
      { id: 'C', text: 'is' },
      { id: 'D', text: 'has been' }
    ],
    correctAnswer: 'B',
    explanation: 'Rule of Proximity for correlative conjunctions ("neither... nor"): When subjects differ in number, the verb agrees with the subject closer to it. "The software engineers" (plural) is closest to the verb, requiring the plural past verb "were".',
    difficulty: 'Easy',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Grammar',
    subtopic: 'Subject-Verb Agreement (Proximity Rule)',
    supportedRoles: ['SE', 'SDE', 'Analyst', 'HR'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Correlative Conjunction Agreement',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Grammar', 'Subject-Verb Agreement', 'Conjunctions']
  },
  {
    id: 'q_verbal_007',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the correct preposition to complete the sentence:\n\n"The compliance committee insists _______ adhering strictly to international data privacy regulations."',
    options: [
      { id: 'A', text: 'on' },
      { id: 'B', text: 'in' },
      { id: 'C', text: 'with' },
      { id: 'D', text: 'at' }
    ],
    correctAnswer: 'A',
    explanation: 'The verb "insist" takes the fixed preposition "on" (or "upon") when followed by a gerund ("insists on adhering"). Hence, Option A is the grammatically correct preposition.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Grammar',
    subtopic: 'Fixed Prepositions',
    supportedRoles: ['SE', 'Analyst', 'Business Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Standard English Prepositional Collocations',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Grammar', 'Prepositions', 'Collocations']
  },
  {
    id: 'q_verbal_008',
    questionType: 'MCQ_SINGLE',
    questionText: 'Identify the correct conditional sentence:\n\n"If the system administrator _______ the security patch earlier, the ransomware _______ the database."',
    options: [
      { id: 'A', text: 'installed, would not compromise' },
      { id: 'B', text: 'had installed, would not have compromised' },
      { id: 'C', text: 'would install, had not compromised' },
      { id: 'D', text: 'has installed, will not compromise' }
    ],
    correctAnswer: 'B',
    explanation: 'Third Conditional Rule (Unreal Past Condition): "If + past perfect (had installed) ... would have + past participle (would not have compromised)". It refers to a past hypothetical scenario that did not occur.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Grammar',
    subtopic: 'Third Conditional Clauses',
    supportedRoles: ['SE', 'SDE', 'Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Conditional Clauses & Tenses',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Grammar', 'Conditionals', 'Tenses']
  },
  {
    id: 'q_verbal_009',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the sentence that correctly employs the subjunctive mood:',
    options: [
      { id: 'A', text: 'The director recommended that every employee submits the quarterly review on time.' },
      { id: 'B', text: 'The director recommended that every employee submit the quarterly review on time.' },
      { id: 'C', text: 'The director recommended that every employee will submit the quarterly review on time.' },
      { id: 'D', text: 'The director recommended that every employee is submitting the quarterly review on time.' }
    ],
    correctAnswer: 'B',
    explanation: 'Mandative Subjunctive Rule: Verbs of demand, recommendation, or urgency (recommend, insist, propose, demand) require the base form of the verb (infinitive without "to") in the subsequent "that" clause, regardless of the third-person singular subject: "that every employee submit" (not submits).',
    difficulty: 'Hard',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Grammar',
    subtopic: 'Subjunctive Mood',
    supportedRoles: ['SE', 'Consultant', 'HR', 'Business Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Mandative Subjunctive Syntax',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Grammar', 'Subjunctive Mood', 'Verbal Syntax']
  },

  // =========================================================================
  // TOPIC 3: ERROR SPOTTING (4 Questions: 1 Easy, 2 Medium, 1 Hard)
  // =========================================================================
  {
    id: 'q_verbal_010',
    questionType: 'MCQ_SINGLE',
    questionText: 'Identify the segment of the sentence that contains a grammatical error:\n\n"(A) Each of the candidates / (B) were interviewed / (C) by the panel / (D) yesterday afternoon."',
    options: [
      { id: 'A', text: 'Each of the candidates' },
      { id: 'B', text: 'were interviewed' },
      { id: 'C', text: 'by the panel' },
      { id: 'D', text: 'yesterday afternoon' }
    ],
    correctAnswer: 'B',
    explanation: 'Error in segment (B). The pronoun "Each" is indefinite singular and takes a singular verb. The phrase "of the candidates" is a prepositional modifier. Therefore, the verb should be "was interviewed", not "were interviewed".',
    difficulty: 'Easy',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Error Spotting',
    subtopic: 'Indefinite Pronoun Agreement',
    supportedRoles: ['SE', 'Analyst', 'HR', 'Operations'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Subject-Modifier Agreement',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Error Spotting', 'Pronouns', 'Agreement']
  },
  {
    id: 'q_verbal_011',
    questionType: 'MCQ_SINGLE',
    questionText: 'Identify the segment that contains a grammatical error:\n\n"(A) Scarcely had the keynote speaker / (B) began her presentation / (C) when the power supply / (D) in the auditorium failed."',
    options: [
      { id: 'A', text: 'Scarcely had the keynote speaker' },
      { id: 'B', text: 'began her presentation' },
      { id: 'C', text: 'when the power supply' },
      { id: 'D', text: 'in the auditorium failed' }
    ],
    correctAnswer: 'B',
    explanation: 'Error in segment (B). The auxiliary verb "had" requires the past participle form of the main verb ("begun"), not the simple past form ("began"). The correct phrasing is "begun her presentation".',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Error Spotting',
    subtopic: 'Past Participle Verb Form Errors',
    supportedRoles: ['SE', 'SDE', 'Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Inversion & Auxiliary Verb Rules',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Error Spotting', 'Inversion', 'Verb Forms']
  },
  {
    id: 'q_verbal_012',
    questionType: 'MCQ_SINGLE',
    questionText: 'Identify the segment that contains a grammatical error:\n\n"(A) The quality of these newly manufactured / (B) optical sensors are / (C) significantly superior to / (D) the previous batch."',
    options: [
      { id: 'A', text: 'The quality of these newly manufactured' },
      { id: 'B', text: 'optical sensors are' },
      { id: 'C', text: 'significantly superior to' },
      { id: 'D', text: 'the previous batch' }
    ],
    correctAnswer: 'B',
    explanation: 'Error in segment (B). The true grammatical subject of the sentence is "The quality" (singular noun), not the plural object of preposition "optical sensors". Thus, the verb must be singular ("is" instead of "are").',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Error Spotting',
    subtopic: 'Intervening Prepositional Phrase Error',
    supportedRoles: ['SE', 'Analyst', 'Data Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Subject-Verb Intervening Modifiers',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Error Spotting', 'Grammar', 'Syntax']
  },
  {
    id: 'q_verbal_013',
    questionType: 'MCQ_SINGLE',
    questionText: 'Identify the segment that contains a grammatical error:\n\n"(A) Not only did the financial auditor discover / (B) discrepancies in the revenue accounts, / (C) but he also found that the ledger / (D) was neither accurate or audited."',
    options: [
      { id: 'A', text: 'Not only did the financial auditor discover' },
      { id: 'B', text: 'discrepancies in the revenue accounts,' },
      { id: 'C', text: 'but he also found that the ledger' },
      { id: 'D', text: 'was neither accurate or audited' }
    ],
    correctAnswer: 'D',
    explanation: 'Error in segment (D). The correlative conjunction "neither" must pair with "nor", not "or". The correct phrasing is "neither accurate nor audited".',
    difficulty: 'Hard',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Error Spotting',
    subtopic: 'Correlative Conjunction Pairing',
    supportedRoles: ['SE', 'SDE', 'Consultant', 'Business Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Correlative Conjunction Standards',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Error Spotting', 'Conjunctions', 'Parallelism']
  },

  // =========================================================================
  // TOPIC 4: SENTENCE CORRECTION (4 Questions: 1 Easy, 2 Medium, 1 Hard)
  // =========================================================================
  {
    id: 'q_verbal_014',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the best replacement for the underlined segment:\n\n"The team completed the testing faster than *us*."',
    options: [
      { id: 'A', text: 'than us' },
      { id: 'B', text: 'than we did' },
      { id: 'C', text: 'then we' },
      { id: 'D', text: 'than them' }
    ],
    correctAnswer: 'B',
    explanation: 'In formal comparative clauses, the pronoun following "than" acts as the subject of an implied clause ("than we did" or "than we [completed]"). Using the subjective pronoun "we" alongside auxiliary "did" eliminates ambiguity and satisfies formal grammar standards.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Comparative Pronoun Case',
    supportedRoles: ['SE', 'Analyst', 'HR'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Comparative Clause Syntax',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Pronouns', 'Comparisons']
  },
  {
    id: 'q_verbal_015',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the grammatically correct and most effective version of the sentence:\n\n"Walking into the research lab, the experiment appeared to be successful."',
    options: [
      { id: 'A', text: 'Walking into the research lab, the experiment appeared to be successful.' },
      { id: 'B', text: 'Walking into the research lab, the scientists observed that the experiment was successful.' },
      { id: 'C', text: 'Walking into the research lab, the success of the experiment was noticed.' },
      { id: 'D', text: 'The experiment appeared successful, walking into the research lab.' }
    ],
    correctAnswer: 'B',
    explanation: 'Option A and C contain a dangling participial modifier ("Walking into the research lab..."): the introductory participle must modify the agent performing the action ("the scientists"), not "the experiment" or "the success". Option B correctly places the logical subject immediately after the participial phrase.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Dangling Modifier Correction',
    supportedRoles: ['SE', 'SDE', 'Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Participial Modifier Placement',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Modifiers', 'Syntax']
  },
  {
    id: 'q_verbal_016',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the option that corrects the parallelism error in the sentence:\n\n"The agile methodology emphasizes delivering value frequently, collaborating with stakeholders, and *to respond* to changes swiftly."',
    options: [
      { id: 'A', text: 'and to respond to changes swiftly' },
      { id: 'B', text: 'and responding to changes swiftly' },
      { id: 'C', text: 'and response to changes swiftly' },
      { id: 'D', text: 'and will respond to changes swiftly' }
    ],
    correctAnswer: 'B',
    explanation: 'Parallel Structure Rule: Items in a coordinate series must share identical grammatical forms. The verbs in the series are gerunds: "delivering...", "collaborating...", and therefore must be followed by "responding..." to maintain parallel structure.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Faulty Parallelism',
    supportedRoles: ['SE', 'SDE', 'Business Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Coordinate Series Parallelism',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Parallelism', 'Gerunds']
  },
  {
    id: 'q_verbal_017',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the most concise and grammatically sound construction:\n\n"Despite of the fact that the company invested heavily in marketing, however their market share failed to expand."',
    options: [
      { id: 'A', text: 'Despite of the fact that the company invested heavily in marketing, however their market share failed to expand.' },
      { id: 'B', text: 'Although the company invested heavily in marketing, its market share failed to expand.' },
      { id: 'C', text: 'In spite of the fact that the company invested heavily, yet their market share did not expand.' },
      { id: 'D', text: 'Even though the company heavily invested in marketing, but its market share failed to expand.' }
    ],
    correctAnswer: 'B',
    explanation: 'Option A and D commit redundancy errors by combining concessive conjunctions ("Despite", "Even though") with adversative connectors ("however", "but"). Additionally, "Despite" is never followed by "of", and the singular noun "company" requires the singular possessive pronoun "its" (not "their"). Option B provides the clean, concise, and grammatically standard construction.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Concessive Redundancy & Pronoun Agreement',
    supportedRoles: ['SE', 'SDE', 'Data Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Clause Conciseness & Redundancy',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Redundancy', 'Conciseness']
  },

  // =========================================================================
  // TOPIC 5: VOCABULARY (4 Questions: 1 Easy, 2 Medium, 1 Hard)
  // =========================================================================
  {
    id: 'q_verbal_018',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the word that is most nearly SIMILAR in meaning (synonym) to the word:\n\nPRAGMATIC',
    options: [
      { id: 'A', text: 'Idealistic' },
      { id: 'B', text: 'Practical' },
      { id: 'C', text: 'Dogmatic' },
      { id: 'D', text: 'Theoretical' }
    ],
    correctAnswer: 'B',
    explanation: '"Pragmatic" means dealing with matters sensibly and realistically based on practical rather than theoretical considerations. Hence, "Practical" is the exact synonym.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Synonyms in Context',
    supportedRoles: ['SE', 'Analyst', 'HR', 'Business Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Placement Lexical Vocabulary',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Synonyms', 'Word Meanings']
  },
  {
    id: 'q_verbal_019',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the word that is most nearly OPPOSITE in meaning (antonym) to the capitalized word:\n\nEPHEMERAL',
    options: [
      { id: 'A', text: 'Transient' },
      { id: 'B', text: 'Fleeting' },
      { id: 'C', text: 'Permanent' },
      { id: 'D', text: 'Momentary' }
    ],
    correctAnswer: 'C',
    explanation: '"Ephemeral" describes something that lasts for a very short time (transient, fleeting). The direct opposite (antonym) is "Permanent" (lasting or remaining unchanged indefinitely).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Antonyms',
    supportedRoles: ['SE', 'Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Standard Placement Antonyms',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Antonyms', 'Semantics']
  },
  {
    id: 'q_verbal_020',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the most appropriate contextual word to complete the sentence:\n\n"The researcher\'s explanation was so _______ that even novices in the field could easily understand the underlying quantum mechanisms."',
    options: [
      { id: 'A', text: 'lucid' },
      { id: 'B', text: 'abstruse' },
      { id: 'C', text: 'convoluted' },
      { id: 'D', text: 'ambiguous' }
    ],
    correctAnswer: 'A',
    explanation: 'The context "even novices... could easily understand" signals clarity and intelligibility. "Lucid" means clearly expressed and easy to understand. In contrast, "abstruse" and "convoluted" denote obscurity and complexity.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Contextual Word Choice',
    supportedRoles: ['SE', 'SDE', 'Data Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Context Clue Vocabulary',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Context Clues', 'Word Choice']
  },
  {
    id: 'q_verbal_021',
    questionType: 'MCQ_SINGLE',
    questionText: 'What is the meaning of the idiom "to burn the candle at both ends"?',
    options: [
      { id: 'A', text: 'To be financially extravagant and wasteful' },
      { id: 'B', text: 'To work excessively hard from early morning until late at night' },
      { id: 'C', text: 'To resolve a dispute through mutual compromise' },
      { id: 'D', text: 'To initiate an irreversible chain of events' }
    ],
    correctAnswer: 'B',
    explanation: 'The idiom "to burn the candle at both ends" means to exhaust one\'s physical or mental resources by working long hours, typically getting up early and staying up late into the night. Therefore, Option B is correct.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Idiomatic Expressions',
    supportedRoles: ['SE', 'Analyst', 'HR', 'Business Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'English Idioms & Phrases',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Idioms', 'Phrases']
  },

  // =========================================================================
  // TOPIC 6: PARA JUMBLES (4 Questions: 0 Easy, 3 Medium, 1 Hard)
  // =========================================================================
  {
    id: 'q_verbal_022',
    questionType: 'MCQ_SINGLE',
    questionText: 'Arrange the following sentences (P, Q, R, S) in the most coherent order:\n\nP. These models learn statistical representations of language from billions of web documents.\nQ. Natural language processing has witnessed a major paradigm shift with large language models.\nR. Consequently, they can generate human-like prose and solve diverse analytical reasoning tasks.\nS. This shift was catalyzed by the transformer architecture introduced in 2017.',
    options: [
      { id: 'A', text: 'Q - S - P - R' },
      { id: 'B', text: 'S - Q - P - R' },
      { id: 'C', text: 'Q - P - S - R' },
      { id: 'D', text: 'P - S - Q - R' }
    ],
    correctAnswer: 'A',
    explanation: 'Coherence structure:\n1. Sentence Q introduces the broad topic ("Natural language processing has witnessed a major paradigm shift...").\n2. Sentence S connects directly via the demonstrative pronoun ("This shift was catalyzed by the transformer...").\n3. Sentence P explains how "These models" learn.\n4. Sentence R states the concluding result ("Consequently, they can generate...").\nThus, the correct logical sequence is Q - S - P - R.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Para Jumbles',
    subtopic: 'Demonstrative & Chronological Links',
    supportedRoles: ['SE', 'SDE', 'Analyst', 'Data Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Paragraph Logical Coherence',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Para Jumbles', 'Logical Flow', 'Sentence Rearrangement']
  },
  {
    id: 'q_verbal_023',
    questionType: 'MCQ_SINGLE',
    questionText: 'Arrange the sentences into a logical paragraph:\n\nP. Without sufficient deep sleep, cognitive consolidation and memory retention become impaired.\nQ. Modern lifestyle habits, particularly late-night screen exposure, have severely degraded sleep quality.\nR. Sleep is a vital biological process essential for neural restoration and immune defense.\nS. Blue light emitted by displays suppresses the secretion of melatonin, disrupting circadian rhythms.',
    options: [
      { id: 'A', text: 'R - P - Q - S' },
      { id: 'B', text: 'R - Q - S - P' },
      { id: 'C', text: 'Q - S - R - P' },
      { id: 'D', text: 'S - Q - R - P' }
    ],
    correctAnswer: 'B',
    explanation: 'Coherence structure:\n1. Sentence R establishes the primary subject ("Sleep is a vital biological process...").\n2. Sentence Q introduces the modern conflict ("Modern lifestyle habits... degraded sleep quality").\n3. Sentence S provides the biological mechanism explaining Q ("Blue light emitted by displays suppresses melatonin...").\n4. Sentence P elaborates on the cognitive consequences ("Without sufficient deep sleep, cognitive consolidation...").\nCorrect sequence: R - Q - S - P.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Para Jumbles',
    subtopic: 'Cause-Effect & Topical Progression',
    supportedRoles: ['SE', 'Analyst', 'Business Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Thematic Progression in Writing',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Para Jumbles', 'Coherence', 'Paragraph Structure']
  },
  {
    id: 'q_verbal_024',
    questionType: 'MCQ_SINGLE',
    questionText: 'Determine the correct logical order of the sentences:\n\nP. Furthermore, automated container orchestration platforms enable seamless scaling across cloud clusters.\nQ. Cloud-native architecture has redefined enterprise software deployment.\nR. By decoupling monolithic applications into lightweight microservices, organizations achieve high agility.\nS. This architectural flexibility significantly accelerates time-to-market for new features.',
    options: [
      { id: 'A', text: 'Q - R - S - P' },
      { id: 'B', text: 'Q - R - P - S' },
      { id: 'C', text: 'R - Q - P - S' },
      { id: 'D', text: 'Q - S - R - P' }
    ],
    correctAnswer: 'B',
    explanation: 'Logical sequence:\n1. Q introduces the overarching domain ("Cloud-native architecture has redefined...").\n2. R explains the technical methodology ("By decoupling monolithic applications into lightweight microservices...").\n3. P introduces an additive technical component ("Furthermore, automated container orchestration...").\n4. S synthesizes the organizational benefit resulting from both ("This architectural flexibility significantly accelerates...").\nCorrect order: Q - R - P - S.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Para Jumbles',
    subtopic: 'Additive Connectors & Synthesis',
    supportedRoles: ['SE', 'SDE', 'Data Analyst', 'Consultant'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Technical Discourse Structure',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Para Jumbles', 'Transitions', 'Logical Order']
  },
  {
    id: 'q_verbal_025',
    questionType: 'MCQ_SINGLE',
    questionText: 'Arrange the following sentences into a coherent academic argument:\n\nP. On the other hand, hyper-specialization risks producing technologists oblivious to ethical and societal ramifications.\nQ. Higher education faces a perennial tension between vocational utility and philosophical breadth.\nR. A balanced pedagogy must therefore integrate rigorous technical fundamentals with critical humanist inquiry.\nS. Proponents of vocational curricula argue that universities must equip graduates directly for industry demands.',
    options: [
      { id: 'A', text: 'Q - S - P - R' },
      { id: 'B', text: 'S - P - Q - R' },
      { id: 'C', text: 'Q - P - S - R' },
      { id: 'D', text: 'S - Q - P - R' }
    ],
    correctAnswer: 'A',
    explanation: 'Coherence analysis:\n1. Sentence Q poses the overarching thesis/tension ("perennial tension between vocational utility and philosophical breadth").\n2. Sentence S details the first side of the debate ("Proponents of vocational curricula argue...").\n3. Sentence P presents the counterpoint using the contrastive marker ("On the other hand, hyper-specialization risks...").\n4. Sentence R provides the synthesizing conclusion ("A balanced pedagogy must therefore integrate...").\nThus, Q - S - P - R is the uniquely valid sequence.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.FOUNDATION,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Para Jumbles',
    subtopic: 'Dialectical Argument Rearrangement',
    supportedRoles: ['SE', 'SDE', 'Analyst', 'Consultant', 'Business Analyst'],
    source: 'FirstRound Original — concept reference',
    sourceReference: 'Dialectical Discourse & Logic',
    qualityStatus: 'PUBLISHED',
    verificationStatus: 'VERIFIED',
    tags: ['Para Jumbles', 'Dialectic', 'Argument Structure']
  }
];

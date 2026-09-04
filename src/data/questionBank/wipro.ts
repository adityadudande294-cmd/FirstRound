import { CanonicalQuestion } from '../../types';
import { TAXONOMY } from '../taxonomy';

export const wiproQuestions: CanonicalQuestion[] = [
  // =========================================================================
  // SECTION 1: QUANTITATIVE ABILITY (7 Questions: 1 Easy, 5 Medium, 1 Hard)
  // =========================================================================

  // 1. Easy: Percentages & Successive Price Discounts
  {
    id: 'q_wipro_001',
    questionType: 'MCQ_SINGLE',
    questionText: 'An electronic gadget with a marked price of ₹4,000 is sold after two successive discounts of 15% and 10%. What is the final selling price of the gadget?',
    options: [
      { id: 'A', text: '₹3,060' },
      { id: 'B', text: '₹3,000' },
      { id: 'C', text: '₹3,120' },
      { id: 'D', text: '₹2,980' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Calculate price after first discount of 15%:\nDiscount 1 = 15% of ₹4,000 = 0.15 × 4,000 = ₹600.\nPrice after 1st discount = 4,000 - 600 = ₹3,400.\nStep 2: Calculate price after second discount of 10% on the reduced price:\nDiscount 2 = 10% of ₹3,400 = 0.10 × 3,400 = ₹340.\nFinal Selling Price = 3,400 - 340 = ₹3,060.\nAlternatively, Net Multiplier = (1 - 0.15) × (1 - 0.10) = 0.85 × 0.90 = 0.765.\nSelling Price = 4,000 × 0.765 = ₹3,060.\nTherefore, Option A (₹3,060) is the correct answer.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.QUANTITATIVE_APTITUDE,
    topic: 'Percentages',
    subtopic: 'Successive Discounts & Marked Price',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Commercial Mathematics & Percentages',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Percentages', 'Successive Discounts', 'Commercial Math', 'Wipro Elite']
  },

  // 2. Medium: Time & Work — Alternating Days
  {
    id: 'q_wipro_002',
    questionType: 'MCQ_SINGLE',
    questionText: 'P can complete a software module alone in 12 days, while Q can complete the same module alone in 18 days. If they work on alternate days with P starting on day 1, in how many days will the entire module be completed?',
    options: [
      { id: 'A', text: '14 1/3 days' },
      { id: 'B', text: '14 1/2 days' },
      { id: 'C', text: '15 days' },
      { id: 'D', text: '13 2/3 days' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Assume total work as LCM(12, 18) = 36 units.\nStep 2: Calculate daily work efficiency:\n- P\'s 1-day work = 36 / 12 = 3 units/day.\n- Q\'s 1-day work = 36 / 18 = 2 units/day.\nStep 3: In a 2-day cycle (Day 1: P, Day 2: Q), total work done = 3 + 2 = 5 units.\nStep 4: Determine completed cycles:\n7 full 2-day cycles (14 days) complete: 7 × 5 = 35 units.\nRemaining work = 36 - 35 = 1 unit.\nStep 5: On Day 15, P works with an efficiency of 3 units/day.\nTime taken for remaining 1 unit = 1 / 3 day.\nTotal time = 14 + 1/3 = 14 1/3 days.\nTherefore, Option A (14 1/3 days) is the correct answer.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.QUANTITATIVE_APTITUDE,
    topic: 'Time & Work',
    subtopic: 'Alternate Day Work Schedules',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Work and Wages & Alternating Schedules',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Time & Work', 'Alternating Days', 'LCM Method', 'Wipro Elite']
  },

  // 3. Medium: Profit & Loss — Faulty Balance / False Weight
  {
    id: 'q_wipro_003',
    questionType: 'MCQ_SINGLE',
    questionText: 'A dishonest merchant claims to sell grain at cost price but uses a false weight that measures 850 grams instead of a standard 1 kilogram (1000 grams). What is the merchant\'s actual profit percentage (rounded to two decimal places)?',
    options: [
      { id: 'A', text: '17.65%' },
      { id: 'B', text: '15.00%' },
      { id: 'C', text: '16.67%' },
      { id: 'D', text: '18.25%' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Formula for profit percentage on false weight:\nProfit % = [ (True Weight - False Weight) / False Weight ] × 100\nStep 2: Substitute values:\nTrue Weight = 1000 g\nFalse Weight = 850 g\nError = 1000 - 850 = 150 g\nProfit % = (150 / 850) × 100 = (15 / 85) × 100 = (3 / 17) × 100 = 300 / 17 ≈ 17.647% ≈ 17.65%.\nTherefore, Option A (17.65%) is the correct answer.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.QUANTITATIVE_APTITUDE,
    topic: 'Profit & Loss',
    subtopic: 'Dishonest Dealers & Faulty Weights',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Commercial Arithmetic & Faulty Balances',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Profit & Loss', 'Faulty Weights', 'Merchant Problems', 'Wipro Elite']
  },

  // 4. Medium: Time Speed Distance — Relative Speed & Linear Trains
  {
    id: 'q_wipro_004',
    questionType: 'MCQ_SINGLE',
    questionText: 'Two express trains of lengths 160 meters and 140 meters are travelling towards each other on parallel tracks at speeds of 64 km/h and 80 km/h respectively. How many seconds will they take to completely cross each other from the moment they meet?',
    options: [
      { id: 'A', text: '7.5 seconds' },
      { id: 'B', text: '8.0 seconds' },
      { id: 'C', text: '9.2 seconds' },
      { id: 'D', text: '6.8 seconds' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Total distance to cover during crossing = Sum of train lengths:\nTotal Distance D = 160 m + 140 m = 300 m.\nStep 2: Since the trains move in opposite directions, relative speed S_rel = S1 + S2:\nS_rel = 64 + 80 = 144 km/h.\nStep 3: Convert relative speed from km/h to m/s:\nS_rel = 144 × (5 / 18) = 8 × 5 = 40 m/s.\nStep 4: Time taken T = Distance / Relative Speed:\nT = 300 / 40 = 7.5 seconds.\nTherefore, Option A (7.5 seconds) is the correct answer.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.QUANTITATIVE_APTITUDE,
    topic: 'Time Speed Distance',
    subtopic: 'Relative Speed & Opposing Trains',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Kinematics & Relative Velocity Problems',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Time Speed Distance', 'Trains', 'Relative Speed', 'Wipro Elite']
  },

  // 5. Medium: Ratio & Proportion — Partnerships & Unequal Capital Duration
  {
    id: 'q_wipro_005',
    questionType: 'MCQ_SINGLE',
    questionText: 'A and B entered into a business partnership. A invested ₹45,000 for 8 months, while B invested ₹60,000 for 6 months. If the total annual profit earned at the end of the year was ₹72,000, what is A\'s exact share in the profit?',
    options: [
      { id: 'A', text: '₹36,000' },
      { id: 'B', text: '₹32,000' },
      { id: 'C', text: '₹40,000' },
      { id: 'D', text: '₹30,000' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Profit is shared in proportion to the product of Investment × Time duration:\nProfit Share Ratio A : B = (Capital_A × Time_A) : (Capital_B × Time_B)\nStep 2: Calculate effective investments:\nA\'s product = 45,000 × 8 = 360,000\nB\'s product = 60,000 × 6 = 360,000\nStep 3: Ratio A : B = 360,000 : 360,000 = 1 : 1.\nStep 4: A\'s share = 1 / (1 + 1) × 72,000 = 1/2 × 72,000 = ₹36,000.\nTherefore, Option A (₹36,000) is the correct answer.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.QUANTITATIVE_APTITUDE,
    topic: 'Ratio',
    subtopic: 'Partnerships & Capital-Time Ratio',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Partnership Mathematics & Ratio Analysis',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Ratio', 'Partnerships', 'Capital Allocation', 'Wipro Elite']
  },

  // 6. Medium: Number Theory — Unit Digit of Large Powers
  {
    id: 'q_wipro_006',
    questionType: 'MCQ_SINGLE',
    questionText: 'What is the unit digit of the mathematical expression (7^95 - 3^58)?',
    options: [
      { id: 'A', text: '4' },
      { id: 'B', text: '6' },
      { id: 'C', text: '0' },
      { id: 'D', text: '7' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Find unit digit of 7^95:\nBase 7 cyclicity of unit digits: 7¹=7, 7²=9, 7³=3, 7⁴=1 (cycle of 4: [7, 9, 3, 1]).\nExponent 95 mod 4 = 3.\nSo, unit digit of 7^95 is 7³ → 3.\nStep 2: Find unit digit of 3^58:\nBase 3 cyclicity of unit digits: 3¹=3, 3²=9, 3³=7, 3⁴=1 (cycle of 4: [3, 9, 7, 1]).\nExponent 58 mod 4 = 2.\nSo, unit digit of 3^58 is 3² → 9.\nStep 3: Compute difference in unit digits (3 - 9):\nSince 7^95 > 3^58, borrow 10: (13 - 9) = 4.\nTherefore, Option A (4) is the correct answer.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.QUANTITATIVE_APTITUDE,
    topic: 'Number Theory',
    subtopic: 'Unit Digits & Power Cyclicity',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Elementary Number Theory & Modular Arithmetic',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Number Theory', 'Unit Digit', 'Cyclicity', 'Wipro Elite']
  },

  // 7. Hard: Arithmetic — Mixtures & Replacement Formula
  {
    id: 'q_wipro_007',
    questionType: 'MCQ_SINGLE',
    questionText: 'A container initially holds 80 liters of pure chemical solvent. 16 liters of the solvent are drawn out and replaced with water. This replacement process is repeated two more times (total 3 operations). How many liters of pure chemical solvent remain in the container after the third operation?',
    options: [
      { id: 'A', text: '40.96 liters' },
      { id: 'B', text: '42.50 liters' },
      { id: 'C', text: '38.40 liters' },
      { id: 'D', text: '44.80 liters' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Formula for remaining quantity of pure liquid after n successive replacement operations:\nRemaining Pure Liquid = Initial Volume × [1 - (Removed Volume / Initial Volume)]^n\nStep 2: Given parameters:\nInitial Volume V = 80 L\nRemoved Volume x = 16 L\nNumber of operations n = 3\nFraction remaining per step = 1 - (16 / 80) = 1 - (1 / 5) = 4 / 5 = 0.8\nStep 3: Calculate remaining volume:\nRemaining = 80 × (4 / 5)³ = 80 × (64 / 125) = (80 × 64) / 125 = 5120 / 125 = 40.96 liters.\nTherefore, Option A (40.96 liters) is the correct answer.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.QUANTITATIVE_APTITUDE,
    topic: 'Arithmetic',
    subtopic: 'Successive Dilution & Alligation',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Mixtures, Alligations and Repeated Dilutions',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Arithmetic', 'Mixtures', 'Replacement Formula', 'Wipro Elite']
  },

  // =========================================================================
  // SECTION 2: VERBAL ABILITY (18 Questions: 4 Easy, 11 Medium, 3 Hard)
  // =========================================================================

  // 8. Easy: Vocabulary — Synonyms
  {
    id: 'q_wipro_008',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the option that is most nearly SIMILAR in meaning to the word:\n\nMETICULOUS',
    options: [
      { id: 'A', text: 'Painstaking and highly attentive to details' },
      { id: 'B', text: 'Careless and hasty' },
      { id: 'C', text: 'Ambiguous and obscure' },
      { id: 'D', text: 'Generous and unreserved' }
    ],
    correctAnswer: 'A',
    explanation: 'Definition: "Meticulous" means showing great attention to detail; very careful and precise (painstaking).\n- Option A accurately conveys this exact meaning.\n- Option B is an antonym.\n- Options C and D are unrelated in semantic context.\nTherefore, Option A is the correct synonym.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Synonyms in Professional Context',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Standard Lexicography & Professional Vocabulary',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Synonyms', 'Verbal Ability', 'Wipro Elite']
  },

  // 9. Easy: Vocabulary — Antonyms
  {
    id: 'q_wipro_009',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the option that is most nearly OPPOSITE in meaning to the word:\n\nOBSTINATE',
    options: [
      { id: 'A', text: 'Pliable and accommodating' },
      { id: 'B', text: 'Stubborn and unyielding' },
      { id: 'C', text: 'Rigid and dogmatic' },
      { id: 'D', text: 'Indifferent and aloof' }
    ],
    correctAnswer: 'A',
    explanation: 'Definition: "Obstinate" means stubbornly refusing to change one\'s opinion or chosen course of action, despite attempts to persuade one to do so.\n- The opposite (antonym) of being stubborn and inflexible is being "pliable", flexible, or accommodating (Option A).\n- Options B and C are synonyms.\n- Option D means detached or unconcerned.\nTherefore, Option A is the correct antonym.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Antonyms & Word Contrasts',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Lexical Semantics & Antonymy',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Antonyms', 'Verbal Ability', 'Wipro Elite']
  },

  // 10. Easy: Grammar — Subject-Verb Agreement with Prepositional Distractors
  {
    id: 'q_wipro_010',
    questionType: 'MCQ_SINGLE',
    questionText: 'Identify the grammatically correct option to complete the sentence:\n\n"The primary cause of server downtime and network latency _____ yet to be identified by the site reliability team."',
    options: [
      { id: 'A', text: 'is' },
      { id: 'B', text: 'are' },
      { id: 'C', text: 'were' },
      { id: 'D', text: 'have been' }
    ],
    correctAnswer: 'A',
    explanation: 'Subject-Verb Agreement Rule:\nThe grammatical subject of the sentence is "The primary cause" (singular noun phrase). The prepositional phrase "of server downtime and network latency" acts as a modifier and does not affect the verb agreement.\nSince the subject is singular, it requires the singular present verb "is".\nTherefore, Option A ("is") is the correct answer.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Grammar',
    subtopic: 'Subject-Verb Agreement with Intervening Modifiers',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'English Syntax & Concord Rules',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Grammar', 'Subject-Verb Concord', 'Verbal Ability', 'Wipro Elite']
  },

  // 11. Easy: Sentence Correction — Correlative Conjunctions
  {
    id: 'q_wipro_011',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the best replacement for the underlined segment:\n\n"The team leader asked us to <u>either submit the pull request today or taking</u> permission for an extension."',
    options: [
      { id: 'A', text: 'either submit the pull request today or take' },
      { id: 'B', text: 'either submit the pull request today or to taking' },
      { id: 'C', text: 'submit either the pull request today or taking' },
      { id: 'D', text: 'either submitting the pull request today or take' }
    ],
    correctAnswer: 'A',
    explanation: 'Rule of Parallelism with Correlative Conjunctions:\nThe correlative conjunction "either... or" must join parallel grammatical forms. Following the infinitive marker "to", both verbs must be in their base form:\n"to either [submit] the pull request today or [take] permission..."\nOption A correctly aligns base verb "submit" with base verb "take".\nTherefore, Option A is the correct answer.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Parallelism with Correlative Conjunctions',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Grammar Guide: Parallel Structures',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Parallelism', 'Correlative Conjunctions', 'Wipro Elite']
  },

  // 12. Medium: Error Spotting — Dangling Modifiers
  {
    id: 'q_wipro_012',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the sentence below divided into four parts. Identify the part containing the grammatical error:\n\n"(A) Walking through the data center / (B) the flashing LED indicators / (C) caught the systems engineer\'s / (D) immediate attention."',
    options: [
      { id: 'A', text: 'Part (A)' },
      { id: 'B', text: 'Part (B)' },
      { id: 'C', text: 'Part (C)' },
      { id: 'D', text: 'Part (D)' }
    ],
    correctAnswer: 'A',
    explanation: 'Dangling Modifier Rule:\nThe introductory participial phrase "Walking through the data center" must logically modify the grammatical subject that follows it immediately in the main clause. As written, the subject is "the flashing LED indicators", which implies the indicators were walking through the data center.\nTo fix the error, the sentence should be rewritten so the engineer is the subject: "Walking through the data center, the systems engineer noticed the flashing LED indicators..."\nHence, the error lies in Part (A) due to an unattached/dangling participial modifier.\nTherefore, Option A is correct.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Error Spotting',
    subtopic: 'Dangling & Misplaced Participial Modifiers',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Syntax & Modifier Placement Rules',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Error Spotting', 'Dangling Modifiers', 'Syntax', 'Wipro Elite']
  },

  // 13. Medium: Sentence Correction — Subjunctive Mood
  {
    id: 'q_wipro_013',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the grammatically correct phrasing for the underlined part:\n\n"The chief architect insisted that every microservice <u>is thoroughly tested</u> prior to production release."',
    options: [
      { id: 'A', text: 'be thoroughly tested' },
      { id: 'B', text: 'is thoroughly tested' },
      { id: 'C', text: 'was thoroughly tested' },
      { id: 'D', text: 'must be thoroughly tested' }
    ],
    correctAnswer: 'A',
    explanation: 'Subjunctive Mood Rule:\nVerbs expressing demands, recommendations, or mandates (e.g., insist, require, demand, recommend) followed by a "that" clause require the subjunctive mood, which takes the base form of the verb ("be", not "is" or "was").\nCorrect form: "...insisted that every microservice be thoroughly tested..."\nTherefore, Option A ("be thoroughly tested") is the correct choice.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Subjunctive Mood in Mandative Clauses',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Advanced English Grammar: Subjunctive Mood',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Subjunctive Mood', 'Grammar', 'Wipro Elite']
  },

  // 14. Medium: Grammar — Conditional Sentences (Third Conditional)
  {
    id: 'q_wipro_014',
    questionType: 'MCQ_SINGLE',
    questionText: 'Fill in the blank with the grammatically appropriate verb phrase:\n\n"If the database administrator _____ the disaster recovery snapshot last night, we would not have lost any transaction logs during the power surge."',
    options: [
      { id: 'A', text: 'had taken' },
      { id: 'B', text: 'would have taken' },
      { id: 'C', text: 'has taken' },
      { id: 'D', text: 'took' }
    ],
    correctAnswer: 'A',
    explanation: 'Third Conditional (Unreal Past Condition) Rule:\nIn a third conditional sentence expressing a past hypothetical situation and its past consequence:\n- The "if"-clause takes the past perfect tense: "had + past participle" ("had taken").\n- The main clause takes "would have + past participle" ("would not have lost").\nUsing "would have" in the "if"-clause is a common grammatical error.\nTherefore, Option A ("had taken") is the correct answer.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Grammar',
    subtopic: 'Third Conditional & Unreal Past Structures',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Conditionals & Hypothetical Past Constructions',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Grammar', 'Conditionals', 'Verb Tenses', 'Wipro Elite']
  },

  // 15. Medium: Vocabulary — Contextual Word Choice (Homophones/Confusables)
  {
    id: 'q_wipro_015',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the option that correctly completes the sentence:\n\n"The cybersecurity auditor\'s thorough evaluation had a profound _____ on the company\'s data governance policies, prompting management to _____ several new encryption standards."',
    options: [
      { id: 'A', text: 'effect, adopt' },
      { id: 'B', text: 'affect, adapt' },
      { id: 'C', text: 'effect, adapt' },
      { id: 'D', text: 'affect, adopt' }
    ],
    correctAnswer: 'A',
    explanation: 'Vocabulary and Usage Analysis:\n1. First blank: "had a profound [effect]" requires a noun meaning an outcome or result. "Effect" is the noun, whereas "affect" is typically a verb.\n2. Second blank: "to [adopt] several new standards" means to choose or implement formally. "Adapt" means to adjust or modify.\nCombining "effect" and "adopt" yields the only semantically and grammatically accurate pairing.\nTherefore, Option A is the correct answer.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Confusable Words & Contextual Collocations',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'English Usage & Homophone Distinctions',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Confusables', 'Contextual Usage', 'Wipro Elite']
  },

  // 16. Medium: Error Spotting — Unnecessary Inversion / Double Comparatives
  {
    id: 'q_wipro_016',
    questionType: 'MCQ_SINGLE',
    questionText: 'Find the part of the sentence containing the grammatical error:\n\n"(A) The new cloud architecture is / (B) much more preferable than / (C) the legacy on-premise system / (D) due to its superior scalability."',
    options: [
      { id: 'A', text: 'Part (A)' },
      { id: 'B', text: 'Part (B)' },
      { id: 'C', text: 'Part (C)' },
      { id: 'D', text: 'Part (D)' }
    ],
    correctAnswer: 'B',
    explanation: 'Grammar & Usage Rule for "Preferable":\n1. "Preferable" inherently conveys a comparative meaning and should not be preceded by "more" (redundant double comparative).\n2. "Preferable" takes the preposition "to", not the conjunction "than" ("preferable to", not "preferable than").\nCorrect formulation: "...is preferable to the legacy on-premise system..."\nThus, Part (B) contains the dual error of using "more preferable than".\nTherefore, Option B is correct.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Error Spotting',
    subtopic: 'Adjective Usage & Prepositional Collocations',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Comparative Adjectives and Preposition Constraints',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Error Spotting', 'Comparatives', 'Preposition Collocations', 'Wipro Elite']
  },

  // 17. Medium: Reading Comprehension — Factual Recall & Inference
  {
    id: 'q_wipro_017',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the short excerpt below and answer the question:\n\n"In distributed consensus protocols, Byzantine Fault Tolerance (BFT) ensures that a network of independent nodes can agree on a common state even when up to one-third of the participating nodes fail or act maliciously. Traditional crash-fault-tolerant algorithms like Raft only safeguard against silent node failures, whereas BFT actively mitigates arbitrary and adversarial behaviors such as conflicting votes or forged messages."\n\nAccording to the passage, what is the key functional difference between BFT and Raft?',
    options: [
      { id: 'A', text: 'BFT protects against adversarial and malicious behaviors, whereas Raft only handles crash failures.' },
      { id: 'B', text: 'Raft can tolerate more malicious node failures than BFT.' },
      { id: 'C', text: 'BFT requires all nodes to agree unanimously without allowing any node failures.' },
      { id: 'D', text: 'Raft is designed specifically to detect conflicting votes and forged messages.' }
    ],
    correctAnswer: 'A',
    explanation: 'Reading Comprehension Analysis:\nThe passage explicitly states: "Traditional crash-fault-tolerant algorithms like Raft only safeguard against silent node failures, whereas BFT actively mitigates arbitrary and adversarial behaviors such as conflicting votes or forged messages."\nOption A directly and accurately encapsulates this distinction.\nOption B contradicts the passage.\nOption C contradicts the "up to one-third" threshold.\nOption D attributes BFT\'s capability to Raft.\nTherefore, Option A is the correct answer.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Reading Comprehension',
    subtopic: 'Technical Passage Inference & Factual Contrast',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Distributed Systems & Technical Reading Comprehension',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Reading Comprehension', 'Technical Passage', 'Inference', 'Wipro Elite']
  },

  // 18. Medium: Reading Comprehension — Tone & Central Theme
  {
    id: 'q_wipro_018',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the excerpt below:\n\n"While automated continuous integration pipelines have accelerated software delivery cycles by orders of magnitude, over-reliance on synthetic unit tests can engender a false sense of security. Without comprehensive integration testing against real-world data distributions and unpredictable user edge cases, silent regressions invariably breach production defenses."\n\nWhat is the primary cautionary message conveyed by the author?',
    options: [
      { id: 'A', text: 'Synthetic unit tests alone are insufficient to guarantee production stability without real-world integration validation.' },
      { id: 'B', text: 'Continuous integration pipelines should be abandoned in favor of manual testing.' },
      { id: 'C', text: 'Automated software delivery cycles do not contribute to faster engineering velocity.' },
      { id: 'D', text: 'Unit tests should never be used in modern deployment pipelines.' }
    ],
    correctAnswer: 'A',
    explanation: 'Central Theme Deduction:\nThe author highlights that while CI pipelines speed up delivery, relying solely on synthetic unit tests creates a false sense of security because real-world distributions and edge cases require integration testing.\nOption A faithfully summarizes this primary point.\nOptions B and D represent extreme, inaccurate distortions not advocated by the author.\nOption C directly contradicts the excerpt.\nTherefore, Option A is the correct answer.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Reading Comprehension',
    subtopic: 'Main Idea & Authorial Intent',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Software Engineering Best Practices & Critical Reading',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Reading Comprehension', 'Author Intent', 'Critical Reading', 'Wipro Elite']
  },

  // 19. Medium: Grammar — Inversion with Negative Adverbials
  {
    id: 'q_wipro_019',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the grammatically sound option to complete the sentence:\n\n"Seldom _____ such a severe bottleneck in data throughput during non-peak operational hours."',
    options: [
      { id: 'A', text: 'has the engineering team observed' },
      { id: 'B', text: 'the engineering team has observed' },
      { id: 'C', text: 'observed the engineering team' },
      { id: 'D', text: 'did the engineering team observed' }
    ],
    correctAnswer: 'A',
    explanation: 'Negative Inversion Rule:\nWhen a sentence begins with a negative or restrictive adverbial such as "Seldom", "Rarely", "Hardly", or "Scarcely", standard subject-auxiliary inversion must occur: [Negative Adverbial] + [Auxiliary Verb] + [Subject] + [Main Verb].\n- Option A correctly follows inversion: "Seldom [has] [the engineering team] [observed]..."\n- Option B lacks the required inversion.\n- Option D incorrectly uses past tense verb "observed" after auxiliary "did" (which requires base verb "observe").\nTherefore, Option A is the correct answer.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Grammar',
    subtopic: 'Negative Inversion & Syntax Fronting',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Advanced Syntax & Inversion Structures',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Grammar', 'Inversion', 'Negative Adverbials', 'Wipro Elite']
  },

  // 20. Medium: Sentence Correction — Pronoun Case & Comparison
  {
    id: 'q_wipro_020',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the most grammatically correct version of the underlined portion:\n\n"The technical recruiter evaluated several candidates, but none possessed as much hands-on Kubernetes experience as <u>him and her</u>."',
    options: [
      { id: 'A', text: 'he and she' },
      { id: 'B', text: 'him and her' },
      { id: 'C', text: 'he and her' },
      { id: 'D', text: 'him and she' }
    ],
    correctAnswer: 'A',
    explanation: 'Pronoun Case in Comparisons Rule:\nIn elliptical comparative clauses introduced by "as... as" or "than", the pronoun case is determined by expanding the implied clause:\n"...as much experience as [he and she possessed]."\nBecause the pronouns serve as the subject of the omitted verb "possessed", subjective case pronouns ("he and she") are required.\nUsing objective case pronouns ("him and her") is a colloquialism that violates standard formal grammar.\nTherefore, Option A ("he and she") is the correct answer.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Pronoun Case in Comparative Ellipsis',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Standard English Grammar & Pronoun Declension',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Pronoun Case', 'Comparisons', 'Wipro Elite']
  },

  // 21. Medium: Error Spotting — Redundancy & Pleonasm
  {
    id: 'q_wipro_021',
    questionType: 'MCQ_SINGLE',
    questionText: 'Identify the segment containing the stylistic/grammatical flaw:\n\n"(A) During the sprint retrospective, / (B) the product owner requested / (C) that we revert back to the previous / (D) stable release candidate."',
    options: [
      { id: 'A', text: 'Part (A)' },
      { id: 'B', text: 'Part (B)' },
      { id: 'C', text: 'Part (C)' },
      { id: 'D', text: 'Part (D)' }
    ],
    correctAnswer: 'C',
    explanation: 'Redundancy / Pleonasm Error:\nThe verb "revert" inherently means to return or go back to a previous state. Adding the adverb "back" ("revert back") constitutes an unnecessary tautology/redundancy.\nThe correct phrasing is simply "revert to the previous stable release candidate."\nThus, the error is in Part (C).\nTherefore, Option C is correct.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Error Spotting',
    subtopic: 'Redundancy, Tautology & Word Economy',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Style & Precision in Technical Writing',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Error Spotting', 'Redundancy', 'Precision', 'Wipro Elite']
  },

  // 22. Medium: Vocabulary — Idiomatic Phrasal Verbs
  {
    id: 'q_wipro_022',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the correct phrasal verb to fill the blank:\n\n"When unexpected API rate limits caused third-party integrations to fail, the backend team had to _____ a caching layer to avoid service degradation."',
    options: [
      { id: 'A', text: 'fall back on' },
      { id: 'B', text: 'fall out with' },
      { id: 'C', text: 'fall through' },
      { id: 'D', text: 'fall away from' }
    ],
    correctAnswer: 'A',
    explanation: 'Idiomatic Phrasal Verb Meanings:\n- "fall back on": to resort to something for help or protection when other plans fail (fits the context of deploying a backup/fallback caching layer).\n- "fall out with": to quarrel or have a dispute with someone.\n- "fall through": to fail to happen or come to completion (said of a plan/deal).\n- "fall away": to diminish or desert.\nTherefore, Option A ("fall back on") is the correct idiomatic choice.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Vocabulary',
    subtopic: 'Phrasal Verbs & Idiomatic Collocations',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'English Idioms and Phrasal Verbs in Context',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Vocabulary', 'Phrasal Verbs', 'Collocations', 'Wipro Elite']
  },

  // 23. Hard: Reading Comprehension — Complex Logical Deduction
  {
    id: 'q_wipro_023',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the passage below:\n\n"Quantum annealing harnesses quantum tunneling to traverse high-dimensional cost landscapes, allowing optimizers to evade local energy minima that trap classical simulated annealing algorithms. However, the presence of thermal noise and decoherence in physical superconducting qubits frequently disrupts long-range entanglement before a global ground state is reached. Consequently, in current Noisy Intermediate-Scale Quantum (NISQ) devices, the theoretical computational speedup is often attenuated by the imperative for extensive classical error mitigation and repetitive sampling runs."\n\nWhich of the following inferences is most rigorously substantiated by the passage?',
    options: [
      { id: 'A', text: 'Decoherence and thermal noise currently prevent physical quantum annealers from realizing their full theoretical speedup without classical overhead.' },
      { id: 'B', text: 'Classical simulated annealing is superior to quantum annealing across all possible cost landscapes.' },
      { id: 'C', text: 'Quantum tunneling is caused by classical error mitigation algorithms on NISQ devices.' },
      { id: 'D', text: 'Physical superconducting qubits operate entirely free of thermal noise in NISQ devices.' }
    ],
    correctAnswer: 'A',
    explanation: 'Deductive Analysis of Technical Text:\n1. The passage states that while quantum annealing can evade local minima via tunneling, thermal noise and decoherence disrupt entanglement before the global state is reached.\n2. The concluding sentence confirms that as a result, the theoretical speedup is attenuated (diminished) by the need for classical error mitigation and repetitive sampling.\n3. Option A is directly supported by these statements.\n4. Options B, C, and D are factually and logically inconsistent with the text.\nTherefore, Option A is the valid inference.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Reading Comprehension',
    subtopic: 'Complex Technical Argumentation & Deduction',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Quantum Computing Fundamentals & Critical Reading',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Reading Comprehension', 'Complex Inference', 'Technical Text', 'Wipro Elite']
  },

  // 24. Hard: Sentence Correction — Complex Parallel Inversion & Correlative Structure
  {
    id: 'q_wipro_024',
    questionType: 'MCQ_SINGLE',
    questionText: 'Choose the most grammatically accurate and stylistically superior option for the underlined segment:\n\n"<u>Not only the lead researcher demonstrated the model\'s vulnerability to adversarial prompt injection, but he also provided</u> a comprehensive framework for cryptographic watermarking."',
    options: [
      { id: 'A', text: 'Not only did the lead researcher demonstrate the model\'s vulnerability to adversarial prompt injection, but he also provided' },
      { id: 'B', text: 'Not only the lead researcher demonstrated the model\'s vulnerability to adversarial prompt injection, but he also provided' },
      { id: 'C', text: 'Not only the lead researcher did demonstrate the model\'s vulnerability to adversarial prompt injection, but provided' },
      { id: 'D', text: 'Not only did the lead researcher demonstrate the model\'s vulnerability to adversarial prompt injection, but also provided he' }
    ],
    correctAnswer: 'A',
    explanation: 'Advanced Rule of Fronted "Not Only" Inversion:\nWhen "Not only" introduces a complete independent clause at the beginning of a sentence, negative subject-auxiliary inversion is mandatory in the initial clause:\n"Not only [did] [the lead researcher] [demonstrate]..."\nThe second coordinating clause then follows standard non-inverted word order: "...but he also [provided]..."\nOption A correctly applies inversion in the first clause while preserving correct parallel structure in the second clause.\nTherefore, Option A is the correct answer.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Sentence Correction',
    subtopic: 'Correlative Inversion & Clause Coordination',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Advanced Rhetoric & Formal English Syntax',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Sentence Correction', 'Inversion', 'Correlative Conjunctions', 'Wipro Elite']
  },

  // 25. Hard: Grammar — Complex Elliptical Relative Clauses & Case Distinction
  {
    id: 'q_wipro_025',
    questionType: 'MCQ_SINGLE',
    questionText: 'Select the option that correctly fills both blanks:\n\n"The executive committee nominated the principal architect, _____ they believed was best qualified for the role, to negotiate with the cloud vendors _____ the board had shortlisted."',
    options: [
      { id: 'A', text: 'who, whom' },
      { id: 'B', text: 'whom, whom' },
      { id: 'C', text: 'who, who' },
      { id: 'D', text: 'whom, who' }
    ],
    correctAnswer: 'A',
    explanation: 'Relative Pronoun Case Analysis (Who vs. Whom):\n1. First blank: In "...[who] they believed was best qualified...", the parenthetical clause "they believed" can be set aside. The pronoun acts as the grammatical subject of the predicate verb "was best qualified". Therefore, the subjective pronoun "who" is required.\n2. Second blank: In "...with the cloud vendors [whom] the board had shortlisted", the pronoun acts as the direct object of the verb phrase "had shortlisted" (the board had shortlisted [them]). Therefore, the objective pronoun "whom" is required.\nCombining "who" and "whom" yields the correct pairing.\nTherefore, Option A ("who, whom") is the correct answer.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.VERBAL_ABILITY,
    topic: 'Grammar',
    subtopic: 'Relative Pronoun Case in Parenthetical & Embedded Clauses',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'English Relative Clauses & Case Assignment Rules',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Grammar', 'Who vs Whom', 'Relative Clauses', 'Wipro Elite']
  },

  // =========================================================================
  // SECTION 3: LOGICAL REASONING (1 Question: 1 Medium)
  // =========================================================================

  // 26. Medium: Deductive Reasoning — Syllogisms with Possibility and Definite Negation
  {
    id: 'q_wipro_026',
    questionType: 'MCQ_SINGLE',
    questionText: 'Read the following premises and evaluate the conclusions:\n\nPremises:\n1. All routers are gateways.\n2. Some gateways are firewalls.\n3. No firewall is a bridge.\n\nConclusions:\nI. Some gateways are definitely not bridges.\nII. All routers being firewalls is a possibility.\n\nWhich of the conclusions logically follow(s) from the given premises?',
    options: [
      { id: 'A', text: 'Both Conclusion I and Conclusion II follow' },
      { id: 'B', text: 'Only Conclusion I follows' },
      { id: 'C', text: 'Only Conclusion II follows' },
      { id: 'D', text: 'Neither Conclusion I nor Conclusion II follows' }
    ],
    correctAnswer: 'A',
    explanation: 'Logical Deduction & Set Theory Proof:\n1. Evaluation of Conclusion I ("Some gateways are definitely not bridges"):\n- From Premise 2: Some gateways are firewalls (there exists an intersection between Gateways and Firewalls).\n- From Premise 3: No firewall is a bridge (the Firewall set is completely disjoint from the Bridge set).\n- Therefore, those specific gateways that are firewalls cannot belong to the Bridge set.\n- Thus, "Some gateways are definitely not bridges" is valid and true.\n\n2. Evaluation of Conclusion II ("All routers being firewalls is a possibility"):\n- From Premise 1: All routers are gateways (Routers ⊆ Gateways).\n- From Premise 2: Some gateways are firewalls.\n- There is no negative constraint between the Router set and the Firewall set. We can draw a Venn diagram where the entire Router set is placed inside the Gateway ∩ Firewall region without violating any premise.\n- Therefore, "All routers being firewalls is a possibility" is valid.\n\nSince both conclusions are logically substantiated, Option A is the correct answer.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.LOGICAL_REASONING,
    topic: 'Deductive Reasoning',
    subtopic: 'Categorical Syllogisms & Possibility Constraints',
    supportedRoles: ['Software Developer', 'SE', 'Elite', 'Associate Software Engineer', 'Fresher'],
    company: 'Wipro',
    source: 'FirstRound Original',
    sourceReference: 'Formal Deductive Logic & Syllogistic Inference',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Logical Reasoning', 'Deductive Reasoning', 'Syllogisms', 'Wipro Elite']
  }
];

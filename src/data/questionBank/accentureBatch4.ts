import { CanonicalQuestion } from '../../types';
import { TAXONOMY } from '../taxonomy';

export const accentureQuestions_068_089: CanonicalQuestion[] = [
  // =========================================================================
  // SECTION 4: COMMON APPLICATIONS & MS OFFICE (12 Questions: 4 Easy, 6 Medium, 2 Hard)
  // q_accenture_068 to q_accenture_079
  // =========================================================================

  // 1. Easy - Excel COUNTIF condition
  {
    id: 'q_accenture_068',
    questionType: 'MCQ_SINGLE',
    questionText: 'In Microsoft Excel, which formula correctly counts the number of cells in the range B2:B20 that contain values strictly greater than 100?',
    options: [
      { id: 'A', text: '=COUNTIF(B2:B20, ">100")' },
      { id: 'B', text: '=COUNT(B2:B20, >100)' },
      { id: 'C', text: '=COUNTIF(B2:B20 > 100)' },
      { id: 'D', text: '=SUMIF(B2:B20, ">100")' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The standard Excel syntax for conditional counting is `=COUNTIF(range, criteria)`.\nStep 2: Comparison criteria involving logical operators (such as `>100`) must be enclosed in double quotation marks as a text string: `">100"`.\nStep 3: `=COUNT()` only counts total numerical cells without custom criteria, and `=SUMIF()` calculates the sum of values rather than their count.\nTherefore, Option A is the correct syntax.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS Excel',
    subtopic: 'Conditional Counting Functions (COUNTIF)',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Spreadsheet Formulas & Logical Operators',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS Excel', 'COUNTIF', 'Formulas', 'Productivity Applications']
  },

  // 2. Easy - PowerPoint Slide Master
  {
    id: 'q_accenture_069',
    questionType: 'MCQ_SINGLE',
    questionText: 'In Microsoft PowerPoint, what is the primary purpose of modifying the "Slide Master"?',
    options: [
      { id: 'A', text: 'To apply consistent formatting, background themes, header logos, and font styles across all slides in the entire presentation automatically' },
      { id: 'B', text: 'To record presenter narration and export the slideshow as an MP4 video file' },
      { id: 'C', text: 'To encrypt the presentation with a digital signature and password protection' },
      { id: 'D', text: 'To automatically translate presentation text into multiple foreign languages' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The Slide Master in Microsoft PowerPoint is the top slide in the slide hierarchy that stores information about the theme, layout, background colors, fonts, placeholder positioning, and corporate logos.\nStep 2: Any design change made to the Slide Master propagates globally to all subordinate slide layouts, ensuring brand and visual consistency throughout the entire deck.\nTherefore, Option A accurately describes its core function.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS PowerPoint',
    subtopic: 'Slide Master & Global Template Design',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Presentation Layout Architecture & Template Hierarchy',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS PowerPoint', 'Slide Master', 'Templates', 'Productivity']
  },

  // 3. Easy - Word Mail Merge
  {
    id: 'q_accenture_070',
    questionType: 'MCQ_SINGLE',
    questionText: 'Which Microsoft Word feature allows you to produce personalized letters, envelopes, or email certificates in bulk by linking a standard template document with a structured data source (such as an Excel sheet or Access table)?',
    options: [
      { id: 'A', text: 'Mail Merge' },
      { id: 'B', text: 'Macro Recorder' },
      { id: 'C', text: 'AutoText' },
      { id: 'D', text: 'Track Changes' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Mail Merge is the designated Microsoft Word automation workflow that combines a static main document template containing merge fields (placeholders) with a dynamic tabular recipient list (data source) to batch-generate personalized documents or emails.\nStep 2: Track Changes audits revisions, Macros automate keystroke scripts, and AutoText stores reusable boilerplate snippets.\nTherefore, Option A ("Mail Merge") is correct.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS Word',
    subtopic: 'Mail Merge Automation & Data Binding',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Document Automation & Mail Merge Systems',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS Word', 'Mail Merge', 'Document Automation', 'Office Tools']
  },

  // 4. Easy - Email Protocols / Web Browsing Shortcuts
  {
    id: 'q_accenture_071',
    questionType: 'MCQ_SINGLE',
    questionText: 'In standard web browsers (Google Chrome, Microsoft Edge, Mozilla Firefox), which keyboard shortcut instantly reopens the most recently closed browser tab?',
    options: [
      { id: 'A', text: 'Ctrl + Shift + T' },
      { id: 'B', text: 'Ctrl + Shift + N' },
      { id: 'C', text: 'Ctrl + Shift + W' },
      { id: 'D', text: 'Ctrl + Alt + Tab' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: In all modern chromium and major web browsers: `Ctrl + Shift + T` restores the last closed tab in chronological order.\nStep 2: `Ctrl + Shift + N` opens a new Incognito/InPrivate window, `Ctrl + Shift + W` closes the current browser window with all tabs, and `Ctrl + Alt + Tab` is a Windows task switcher.\nTherefore, Option A is the correct shortcut.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'Web Browsers & Email',
    subtopic: 'Browser Navigation & Session Recovery Shortcuts',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Modern Browser Interfaces & Productivity Keybindings',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Web Browsers', 'Shortcuts', 'Tab Navigation', 'Productivity']
  },

  // 5. Medium - Excel COUNTIFS Multiple Criteria
  {
    id: 'q_accenture_072',
    questionType: 'MCQ_SINGLE',
    questionText: 'In an Excel sales table, Column A contains department names ("Engineering", "Sales", "HR") and Column B contains bonus percentages. Which formula counts how many employees in the "Engineering" department received a bonus of at least 15%?',
    options: [
      { id: 'A', text: '=COUNTIFS(A2:A100, "Engineering", B2:B100, ">=15%")' },
      { id: 'B', text: '=COUNTIF(A2:A100, "Engineering" AND B2:B100, ">=15%")' },
      { id: 'C', text: '=COUNTIFS(A2:A100 = "Engineering", B2:B100 >= 15%)' },
      { id: 'D', text: '=SUMIFS(A2:A100, "Engineering", B2:B100, ">=15%")' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: To evaluate multiple simultaneous criteria across different column ranges, Excel provides the `=COUNTIFS(criteria_range1, criteria1, criteria_range2, criteria2, ...)` function.\nStep 2: Range 1 is `A2:A100` with condition `"Engineering"`, and Range 2 is `B2:B100` with comparison condition `">=15%"`.\nStep 3: Option A satisfies the exact function signature and criteria syntax.\nTherefore, Option A is the correct formula.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS Excel',
    subtopic: 'Multi-Criteria Conditional Functions (COUNTIFS)',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Advanced Spreadsheet Statistical Analysis',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS Excel', 'COUNTIFS', 'Multi-Criteria', 'Formulas']
  },

  // 6. Medium - Excel PivotTable Data Summarization
  {
    id: 'q_accenture_073',
    questionType: 'MCQ_SINGLE',
    questionText: 'When working with PivotTables in Microsoft Excel, what happens if the source tabular data is updated with new rows?',
    options: [
      { id: 'A', text: 'The PivotTable automatically updates instantly in real-time without user interaction.' },
      { id: 'B', text: 'The PivotTable must be manually refreshed (or updated via "Refresh All" / workbook open event) and the data source range adjusted if not configured as a dynamic Excel Table.' },
      { id: 'C', text: 'The PivotTable becomes permanently corrupted and must be recreated from scratch.' },
      { id: 'D', text: 'The new rows are automatically converted into comments on the existing PivotTable.' }
    ],
    correctAnswer: 'B',
    explanation: 'Step 1: Excel PivotTables cache a snapshot of the source data in an internal data structure called the "PivotCache".\nStep 2: When changes or additions occur in the raw source grid, the PivotTable does not dynamically reflect them until an explicit "Refresh" operation is triggered.\nStep 3: If the source is an explicit Excel Table (`Ctrl + T`), the range expands automatically upon refresh.\nTherefore, Option B accurately describes PivotTable synchronization behavior.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS Excel',
    subtopic: 'PivotTables, PivotCache & Refresh Mechanics',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'PivotTable Architecture & Data Modeling',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS Excel', 'PivotTable', 'PivotCache', 'Data Refresh']
  },

  // 7. Medium - Excel Conditional Formatting Rules
  {
    id: 'q_accenture_074',
    questionType: 'MCQ_SINGLE',
    questionText: 'In Microsoft Excel, which feature allows cells to automatically change their background fill color to red if their numerical value drops below a designated threshold?',
    options: [
      { id: 'A', text: 'Conditional Formatting' },
      { id: 'B', text: 'Data Validation' },
      { id: 'C', text: 'Goal Seek' },
      { id: 'D', text: 'AutoCorrect' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Conditional Formatting in Excel dynamically applies visual styling (fill color, font color, data bars, icon sets) to cells based on specified rule conditions (e.g., cell value < threshold or custom formula).\nStep 2: Data Validation restricts inputs, Goal Seek is a what-if solver, and AutoCorrect fixes typing typos.\nTherefore, Option A is the correct feature.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS Excel',
    subtopic: 'Conditional Formatting & Dynamic Visualization',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Spreadsheet Visualization & Conditional Formatting Rules',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS Excel', 'Conditional Formatting', 'Cell Styling', 'Spreadsheets']
  },

  // 8. Medium - Word Section Breaks vs Page Breaks
  {
    id: 'q_accenture_075',
    questionType: 'MCQ_SINGLE',
    questionText: 'In Microsoft Word, what is the crucial structural difference between inserting a "Page Break" and inserting a "Section Break (Next Page)"?',
    options: [
      { id: 'A', text: 'A Page Break merely moves text to the next page, while a Section Break allows applying distinct page orientations (Portrait vs Landscape), headers/footers, and margins to the new section.' },
      { id: 'B', text: 'A Page Break encrypts the previous page, while a Section Break merges all styles into plain text.' },
      { id: 'C', text: 'A Page Break is only visible in Print Preview, while a Section Break is only visible in Web Layout.' },
      { id: 'D', text: 'There is no difference; they are interchangeable commands with identical functionality.' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: A Page Break simply forces remaining text onto a new physical page while retaining the document-wide formatting layout.\nStep 2: A Section Break establishes an independent document boundary, allowing distinct page setup configurations (such as landscape layout for wide tables, unlinked headers/footers, or unique page numbering schemes) within the same document file.\nTherefore, Option A is the correct distinction.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS Word',
    subtopic: 'Section Breaks, Page Setup & Unlinked Headers',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Document Layout Typography & Section Boundaries',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS Word', 'Section Break', 'Page Break', 'Document Layout']
  },

  // 9. Medium - PowerPoint Animation Sequences & Triggers
  {
    id: 'q_accenture_076',
    questionType: 'MCQ_SINGLE',
    questionText: 'In Microsoft PowerPoint, which setting in the Animation Pane causes an animation effect to execute simultaneously alongside the preceding animation effect rather than waiting for a mouse click or prior completion?',
    options: [
      { id: 'A', text: 'Start With Previous' },
      { id: 'B', text: 'Start On Click' },
      { id: 'C', text: 'Start After Previous' },
      { id: 'D', text: 'Trigger on Bookmark' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: PowerPoint animation timing provides three primary execution triggers:\n1. "Start On Click": Waits for a manual presenter input.\n2. "Start With Previous": Executes concurrent with the animation immediately preceding it in the timeline.\n3. "Start After Previous": Executes automatically once the preceding animation has concluded its duration.\nTherefore, Option A ("Start With Previous") executes simultaneously.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS PowerPoint',
    subtopic: 'Animation Pane, Timing & Concurrent Execution',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Presentation Motion Sequencing & Timeline Configuration',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS PowerPoint', 'Animations', 'Timeline', 'Animation Pane']
  },

  // 10. Medium - Email Protocols: IMAP vs POP3
  {
    id: 'q_accenture_077',
    questionType: 'MCQ_SINGLE',
    questionText: 'What is the primary architectural advantage of using the IMAP protocol over POP3 for accessing corporate email across multiple devices (e.g., laptop and smartphone)?',
    options: [
      { id: 'A', text: 'IMAP synchronizes mailbox folders, read states, and drafts in real-time with the central mail server across all connected client devices.' },
      { id: 'B', text: 'IMAP downloads emails locally to a single client and automatically purges them from the remote server by default.' },
      { id: 'C', text: 'IMAP eliminates the need for an internet connection when sending outbound messages.' },
      { id: 'D', text: 'IMAP is exclusively an encryption protocol and cannot retrieve message bodies.' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: IMAP (Internet Message Access Protocol) maintains messages and folder states on the remote mail server, enabling two-way continuous synchronization across multiple endpoints.\nStep 2: In contrast, legacy POP3 (Post Office Protocol 3) is designed to download messages to a single local device storage and typically delete them from the server, causing synchronization conflicts on multi-device workflows.\nTherefore, Option A is the primary architectural advantage.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'Web Browsers & Email',
    subtopic: 'Email Protocols (IMAP vs POP3 vs SMTP)',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Email Architecture & Client-Server Protocols',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Email', 'IMAP', 'POP3', 'Protocols', 'Synchronization']
  },

  // 11. Hard - Excel Dynamic Array & XLOOKUP vs VLOOKUP
  {
    id: 'q_accenture_078',
    questionType: 'MCQ_SINGLE',
    questionText: 'Which statement accurately describes a major functional capability of the modern Excel `=XLOOKUP()` function that is NOT natively supported by traditional `=VLOOKUP()` without helper columns or formula workarounds?',
    options: [
      { id: 'A', text: 'XLOOKUP can perform exact lookups to the left of the lookup column, defaults to exact match without requiring a range_lookup argument, and handles horizontal or vertical arrays natively.' },
      { id: 'B', text: 'XLOOKUP can only search sorted numerical values in ascending order.' },
      { id: 'C', text: 'XLOOKUP requires the return array to be strictly to the right of the lookup array.' },
      { id: 'D', text: 'XLOOKUP converts text values into boolean flags automatically during lookups.' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Traditional `VLOOKUP` requires the lookup column to be the leftmost column of the range table, cannot look to the left, defaults to approximate match (requiring `FALSE` parameter), and breaks if column insertions change hardcoded index numbers.\nStep 2: `XLOOKUP(lookup_value, lookup_array, return_array)` decouples lookup and return arrays, enabling left-lookups, horizontal searches, exact match by default, and custom `if_not_found` fallback handling.\nTherefore, Option A accurately details XLOOKUP\'s architectural superiority.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS Excel',
    subtopic: 'Modern Dynamic Array Functions (XLOOKUP vs VLOOKUP)',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Advanced Spreadsheet Lookup Engine & Dynamic Arrays',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS Excel', 'XLOOKUP', 'VLOOKUP', 'Lookup Functions', 'Formulas']
  },

  // 12. Hard - Excel Array Formulas & SUMPRODUCT Multi-Condition Modeling
  {
    id: 'q_accenture_079',
    questionType: 'MCQ_SINGLE',
    questionText: 'In Microsoft Excel, what will the formula `=SUMPRODUCT((A2:A10="North") * (B2:B10>500) * (C2:C10))` compute?',
    options: [
      { id: 'A', text: 'The sum of values in range C2:C10 where the corresponding row has "North" in column A AND a value greater than 500 in column B.' },
      { id: 'B', text: 'The product of all cells in column A, column B, and column C.' },
      { id: 'C', text: 'The count of rows matching either "North" or greater than 500.' },
      { id: 'D', text: 'An error because boolean expressions cannot be multiplied in Excel.' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The expression `(A2:A10="North")` evaluates to an array of TRUE/FALSE values.\nStep 2: The expression `(B2:B10>500)` evaluates to a second array of TRUE/FALSE values.\nStep 3: When multiplied together (`*`), Excel coercively converts TRUE to 1 and FALSE to 0. A row evaluates to 1 only if BOTH conditions are TRUE (logical AND).\nStep 4: `SUMPRODUCT` multiplies this 0/1 indicator array with the numeric values in `C2:C10` and sums the resulting products.\nStep 5: Thus, it yields the conditional sum of column C for rows meeting both criteria.\nTherefore, Option A is correct.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS Excel',
    subtopic: 'Array Arithmetic & SUMPRODUCT Multi-Conditional Modeling',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Array Formulas & Coercive Boolean Arithmetic',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS Excel', 'SUMPRODUCT', 'Array Formulas', 'Boolean Logic']
  },

  // =========================================================================
  // SECTION 5: NETWORKING, SECURITY & CLOUD BASICS (10 Questions: 3 Easy, 6 Medium, 1 Hard)
  // q_accenture_080 to q_accenture_089
  // =========================================================================

  // 13. Easy - TCP vs UDP Transport Protocols
  {
    id: 'q_accenture_080',
    questionType: 'MCQ_SINGLE',
    questionText: 'Which Transport Layer protocol provides connection-oriented, reliable, and ordered delivery of data packets using a three-way handshake mechanism?',
    options: [
      { id: 'A', text: 'Transmission Control Protocol (TCP)' },
      { id: 'B', text: 'User Datagram Protocol (UDP)' },
      { id: 'C', text: 'Internet Control Message Protocol (ICMP)' },
      { id: 'D', text: 'Address Resolution Protocol (ARP)' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: TCP (Transmission Control Protocol) is the connection-oriented Layer 4 protocol that establishes an end-to-end connection via a three-way handshake (SYN, SYN-ACK, ACK) and provides guaranteed packet ordering, flow control, and retransmission of lost segments.\nStep 2: UDP is connectionless and best-effort, ICMP operates at Layer 3 for diagnostics, and ARP operates between Layer 2 and 3 for IP-to-MAC resolution.\nTherefore, Option A ("TCP") is the correct protocol.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'TCP/IP',
    subtopic: 'Transport Protocols (TCP vs UDP)',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Computer Networking & Transport Layer Protocols',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Networking', 'TCP', 'UDP', 'Transport Layer', 'Handshake']
  },

  // 14. Easy - DNS Domain Name System Role
  {
    id: 'q_accenture_081',
    questionType: 'MCQ_SINGLE',
    questionText: 'What is the primary function of the Domain Name System (DNS) in computer networking?',
    options: [
      { id: 'A', text: 'Translating human-readable hostnames (e.g., www.accenture.com) into numerical IP addresses (e.g., 192.0.2.1)' },
      { id: 'B', text: 'Encrypting browser traffic using public-key cryptography' },
      { id: 'C', text: 'Allocating dynamic IP addresses to client workstations on a local network' },
      { id: 'D', text: 'Filtering malicious incoming network packets based on port numbers' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: The Domain Name System (DNS) acts as the phonebook of the Internet, resolving alphanumeric domain names that humans easily remember into the machine-readable IP addresses required to locate network resources.\nStep 2: DHCP allocates dynamic IPs, TLS encrypts browser traffic, and Firewalls filter packets.\nTherefore, Option A is the primary function of DNS.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'TCP/IP',
    subtopic: 'DNS Hierarchy & Name Resolution',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Application Layer Services & DNS Resolution',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['DNS', 'Networking', 'TCP/IP', 'Name Resolution']
  },

  // 15. Easy - Security: Authentication vs Authorization
  {
    id: 'q_accenture_082',
    questionType: 'MCQ_SINGLE',
    questionText: 'In identity and access management (IAM), what is the fundamental conceptual difference between "Authentication" and "Authorization"?',
    options: [
      { id: 'A', text: 'Authentication verifies the identity of the user (who you are), whereas Authorization determines the access permissions and resources granted to that user (what you are allowed to do).' },
      { id: 'B', text: 'Authentication applies only to databases, while Authorization applies only to firewalls.' },
      { id: 'C', text: 'Authentication encrypts network wires, while Authorization compresses storage volumes.' },
      { id: 'D', text: 'Authentication occurs after logout, while Authorization occurs before login.' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Authentication (AuthN) is the initial security verification process proving a claimed user identity via credentials (e.g., password, MFA token, biometric).\nStep 2: Authorization (AuthZ) is the subsequent security policy evaluation determining what files, API endpoints, or database operations the authenticated identity has privilege to execute.\nTherefore, Option A represents the foundational security distinction.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'Network Security & Firewalls',
    subtopic: 'Authentication (AuthN) vs Authorization (AuthZ)',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Identity & Access Management Security Principles',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Security', 'Authentication', 'Authorization', 'IAM']
  },

  // 16. Medium - Subnetting & CIDR Notation
  {
    id: 'q_accenture_083',
    questionType: 'MCQ_SINGLE',
    questionText: 'An enterprise cloud Virtual Private Cloud (VPC) subnet is assigned the IPv4 CIDR block `10.0.1.0/26`. What is the total number of usable host IP addresses available for client virtual machines in this subnet (accounting for standard network and broadcast addresses)?',
    options: [
      { id: 'A', text: '62' },
      { id: 'B', text: '64' },
      { id: 'C', text: '30' },
      { id: 'D', text: '126' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: A `/26` subnet mask leaves `32 - 26 = 6` host bits.\nStep 2: Total IP addresses in the block = 2^6 = 64 total addresses.\nStep 3: Standard IPv4 networks reserve 2 addresses:\n- 1 Network Address (first address: 10.0.1.0)\n- 1 Directed Broadcast Address (last address: 10.0.1.63)\nStep 4: Usable host addresses = 2^6 - 2 = 64 - 2 = 62 usable IPs.\nTherefore, Option A (62) is the correct calculation.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'TCP/IP',
    subtopic: 'IPv4 Subnetting & CIDR Calculation',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'IP Addressing, Subnet Masks & CIDR Mechanics',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Networking', 'Subnetting', 'CIDR', 'IPv4', 'TCP/IP']
  },

  // 17. Medium - HTTP Status Codes & REST API Architecture
  {
    id: 'q_accenture_084',
    questionType: 'MCQ_SINGLE',
    questionText: 'When a web client makes a REST API request to an endpoint with valid authentication credentials, but the server refuses to authorize access because the user lacks the necessary permission role, which HTTP status code should the server return?',
    options: [
      { id: 'A', text: '403 Forbidden' },
      { id: 'B', text: '401 Unauthorized' },
      { id: 'C', text: '404 Not Found' },
      { id: 'D', text: '502 Bad Gateway' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: HTTP `401 Unauthorized` strictly means unauthenticated (missing or invalid credentials; the client must authenticate).\nStep 2: HTTP `403 Forbidden` means the server understands the authenticated identity, but refuses to authorize access because the user lacks sufficient permission privileges for the requested resource.\nStep 3: `404` indicates a missing resource and `502` indicates an upstream proxy error.\nTherefore, Option A ("403 Forbidden") is the semantically correct response.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'OSI Model',
    subtopic: 'HTTP Protocols & REST Status Semantics',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Hypertext Transfer Protocol (HTTP/1.1) Standards RFC 7231',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['HTTP', 'REST API', 'Status Codes', 'Security', '403 Forbidden']
  },

  // 18. Medium - Symmetric vs Asymmetric Cryptography
  {
    id: 'q_accenture_085',
    questionType: 'MCQ_SINGLE',
    questionText: 'Why do modern secure communication protocols (such as TLS/HTTPS and SSH) utilize a hybrid encryption approach rather than relying exclusively on asymmetric cryptography (e.g., RSA or ECC)?',
    options: [
      { id: 'A', text: 'Asymmetric encryption is computationally expensive for bulk data transmission; hybrid systems use asymmetric keys to securely exchange a one-time session key, and then use high-speed symmetric encryption (e.g., AES) for bulk payload data.' },
      { id: 'B', text: 'Symmetric encryption cannot encrypt text files containing special characters.' },
      { id: 'C', text: 'Asymmetric encryption only works over wired optical networks.' },
      { id: 'D', text: 'Symmetric encryption requires three different public keys for each device.' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Asymmetric cryptography (RSA, ECC) relies on heavy mathematical operations (modular exponentiation, elliptic curve scalar multiplication) which are orders of magnitude slower than symmetric block ciphers.\nStep 2: Symmetric cryptography (AES-GCM) is extremely fast and hardware-accelerated on modern CPUs, but faces the key distribution problem.\nStep 3: Hybrid encryption achieves the best of both worlds: asymmetric cryptography safely negotiates a shared symmetric session key during the handshake, and symmetric encryption encrypts the actual data stream.\nTherefore, Option A is the precise architectural rationale.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'Encryption Basics',
    subtopic: 'Hybrid Cryptography & TLS Handshake Performance',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Applied Cryptography & Secure Transport Architecture',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Cryptography', 'Encryption', 'Symmetric', 'Asymmetric', 'TLS']
  },

  // 19. Medium - Social Engineering & Phishing Defense
  {
    id: 'q_accenture_086',
    questionType: 'MCQ_SINGLE',
    questionText: 'A cyber attacker sends highly targeted, customized fraudulent emails to the Chief Financial Officer (CFO) of a company, spoofing the CEO\'s email domain to authorize an urgent emergency wire transfer. What specific category of social engineering attack does this describe?',
    options: [
      { id: 'A', text: 'Whaling (or CEO Fraud / Spear Phishing)' },
      { id: 'B', text: 'Denial of Service (DoS)' },
      { id: 'C', text: 'SQL Injection (SQLi)' },
      { id: 'D', text: 'Cross-Site Scripting (XSS)' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Phishing is fraudulent mass communication; Spear Phishing is targeted at a specific individual or organization.\nStep 2: "Whaling" is a specialized, high-profile spear phishing attack specifically targeted at senior executives (C-suite, board members, CFOs) to steal high-value credentials or authorize fraudulent financial wire transfers.\nStep 3: DoS, SQLi, and XSS are software/network technical exploit vectors.\nTherefore, Option A is the correct cybersecurity classification.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'Network Security & Firewalls',
    subtopic: 'Social Engineering, Spear Phishing & Whaling Attacks',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Cybersecurity Threat Classification & Social Engineering',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Cybersecurity', 'Phishing', 'Social Engineering', 'Whaling']
  },

  // 20. Medium - Cloud Computing: Horizontal vs Vertical Scaling
  {
    id: 'q_accenture_087',
    questionType: 'MCQ_SINGLE',
    questionText: 'In cloud architecture, what is the primary operational distinction between "Horizontal Scaling" (scaling out) and "Vertical Scaling" (scaling up)?',
    options: [
      { id: 'A', text: 'Horizontal scaling adds more instances or virtual machines behind a load balancer to distribute traffic, whereas Vertical scaling increases the CPU cores, RAM, or storage capacity of an existing single server instance.' },
      { id: 'B', text: 'Horizontal scaling decreases storage, while Vertical scaling disables network firewalls.' },
      { id: 'C', text: 'Horizontal scaling requires taking down the database, while Vertical scaling only applies to mobile clients.' },
      { id: 'D', text: 'Horizontal scaling only functions in private on-premise data centers.' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Vertical Scaling (Scale Up) upgrades the physical hardware resources (e.g., upgrading from 4 CPU cores to 32 cores, adding RAM) on an individual machine, which has hard hardware ceiling limits and often requires downtime.\nStep 2: Horizontal Scaling (Scale Out) adds multiple parallel computing nodes/containers coordinated by a load balancer, providing virtually limitless scalability, fault tolerance, and elasticity.\nTherefore, Option A accurately articulates the distinction.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'Cloud Computing Concepts',
    subtopic: 'Cloud Scalability, Elasticity & Auto-Scaling Architectures',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Cloud Well-Architected Framework: Performance Efficiency',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Cloud', 'Scalability', 'Horizontal Scaling', 'Load Balancing']
  },

  // 21. Medium - Stateful vs Stateless Firewalls
  {
    id: 'q_accenture_088',
    questionType: 'MCQ_SINGLE',
    questionText: 'What is the key advantage of a "Stateful Inspection Firewall" compared to a traditional "Stateless Packet-Filtering Firewall"?',
    options: [
      { id: 'A', text: 'Stateful firewalls track the state of active network connections (TCP handshakes, session context) and automatically allow legitimate inbound return traffic matching an established outbound request without needing explicit open inbound ports.' },
      { id: 'B', text: 'Stateful firewalls execute code inside every packet payload before forwarding it.' },
      { id: 'C', text: 'Stateless firewalls consume more memory because they maintain full session tables.' },
      { id: 'D', text: 'Stateful firewalls only operate at the Physical Layer (Layer 1).' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: A Stateless firewall evaluates each network packet in isolation based solely on static rules (source/destination IP, port) without context of prior packets.\nStep 2: A Stateful Inspection firewall maintains a dynamic state connection table. When an internal client initiates an outbound connection, the firewall records the session and automatically permits inbound return packets belonging to that established conversation while blocking unsolicited external connection attempts.\nTherefore, Option A is the correct technical advantage.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'Network Security & Firewalls',
    subtopic: 'Stateful vs Stateless Packet Inspection Firewalls',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Network Security Architecture & Firewall Technology',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Firewalls', 'Security', 'Stateful Inspection', 'Networking']
  },

  // 22. Hard - Cloud Disaster Recovery: RTO vs RPO Metrics
  {
    id: 'q_accenture_089',
    questionType: 'MCQ_SINGLE',
    questionText: 'An enterprise cloud disaster recovery architecture specifies a Recovery Point Objective (RPO) of 15 minutes and a Recovery Time Objective (RTO) of 2 hours. What do these SLA metrics guarantee in the event of an outage?',
    options: [
      { id: 'A', text: 'The organization will lose at most 15 minutes worth of transactional data (RPO), and full production service operations will be restored within 2 hours after the disaster event (RTO).' },
      { id: 'B', text: 'The system must be backed up every 2 hours, and take at most 15 minutes to reboot.' },
      { id: 'C', text: 'The cost of downtime is capped at 15 minutes of employee salary.' },
      { id: 'D', text: 'Data is replicated to 15 geographical regions within 2 hours.' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: Recovery Point Objective (RPO) measures the maximum acceptable data loss timeframe prior to the disaster event (i.e. age of the latest usable backup/replication: 15 minutes of data).\nStep 2: Recovery Time Objective (RTO) measures the maximum acceptable duration of system downtime required to bring services back online and restore functionality (i.e. 2 hours to recover).\nTherefore, Option A accurately reflects the standard disaster recovery definitions.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'Cloud Computing Concepts',
    subtopic: 'Disaster Recovery (RTO & RPO) & Business Continuity',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Disaster Recovery Frameworks & SLA Formulations',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Cloud', 'Disaster Recovery', 'RTO', 'RPO', 'Reliability']
  }
];

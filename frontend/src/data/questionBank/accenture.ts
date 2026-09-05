import { CanonicalQuestion } from '../../types';
import { TAXONOMY } from '../taxonomy';
import { accentureQuestions_023_039 } from './accentureBatch1';
import { accentureQuestions_040_049 } from './accentureBatch2';
import { accentureQuestions_050_067 } from './accentureBatch3';
import { accentureQuestions_068_089 } from './accentureBatch4';

export const accentureQuestions: CanonicalQuestion[] = [
  // =========================================================================
  // SECTION 1: COMMON APPLICATIONS & MS OFFICE (12 Questions: 4 Easy, 7 Medium, 1 Hard)
  // =========================================================================

  // 1. Easy - MS Word (Document Formatting & Navigation)
  {
    id: 'q_accenture_001',
    questionType: 'MCQ_SINGLE',
    questionText: 'In Microsoft Word, which feature allows you to quickly copy only the styling attributes (such as font family, size, color, and paragraph spacing) from one block of text and apply them directly to another?',
    options: [
      { id: 'A', text: 'Format Painter' },
      { id: 'B', text: 'Style Inspector' },
      { id: 'C', text: 'AutoFormat' },
      { id: 'D', text: 'Paste Special - Unformatted Text' }
    ],
    correctAnswer: 'A',
    explanation: 'Format Painter is a standard Microsoft Office productivity tool designed to copy formatting attributes (such as font type, weight, size, color, and line spacing) from selected source text and apply them directly to target text without altering the underlying content text. Double-clicking the Format Painter icon allows applying the same styling to multiple non-contiguous text blocks.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS Word',
    subtopic: 'Text Formatting & Styles',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Workplace Productivity & Document Processing Concepts',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS Word', 'Format Painter', 'Styling', 'Productivity']
  },

  // 2. Easy - MS Excel (Basic Aggregation)
  {
    id: 'q_accenture_002',
    questionType: 'MCQ_SINGLE',
    questionText: 'In a spreadsheet application such as Microsoft Excel, which function should be used to count only the cells containing numerical values within the range A1:A20, while ignoring blank cells and text entries?',
    options: [
      { id: 'A', text: '=COUNTA(A1:A20)' },
      { id: 'B', text: '=COUNT(A1:A20)' },
      { id: 'C', text: '=COUNTIF(A1:A20, "*")' },
      { id: 'D', text: '=SUM(A1:A20)' }
    ],
    correctAnswer: 'B',
    explanation: 'The =COUNT() function in Excel specifically counts the number of cells in a given range that contain numeric values (including dates and formulas returning numbers), while ignoring blank cells and text strings. In contrast, =COUNTA() counts all non-empty cells regardless of data type (both text and numbers).',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS Excel',
    subtopic: 'Statistical & Counting Functions',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Workplace Productivity & Spreadsheet Formulas',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS Excel', 'COUNT', 'Formulas', 'Spreadsheet Functions']
  },

  // 3. Easy - MS PowerPoint (Slide Master / Templates)
  {
    id: 'q_accenture_003',
    questionType: 'MCQ_SINGLE',
    questionText: 'In Microsoft PowerPoint, what is the most efficient way to ensure that a corporate logo and a standardized footer appear in the exact same position across every slide in a presentation automatically?',
    options: [
      { id: 'A', text: 'Insert the logo on slide 1 and copy-paste it manually onto every subsequent slide' },
      { id: 'B', text: 'Place the logo and footer on the Slide Master' },
      { id: 'C', text: 'Group all slide objects and apply a global animation trigger' },
      { id: 'D', text: 'Export the logo as a background watermark image on each layout' }
    ],
    correctAnswer: 'B',
    explanation: 'The Slide Master in Microsoft PowerPoint serves as the top hierarchy slide in the slide master tree that stores information about the theme, layout, background, color, fonts, and positioning of universal elements (like logos, headers, slide numbers, and footers). Any element placed on the Slide Master is universally and consistently inherited by all slides using that master layout.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS PowerPoint',
    subtopic: 'Slide Master & Global Layouts',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Presentation Software Design Principles',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS PowerPoint', 'Slide Master', 'Templates', 'Productivity']
  },

  // 4. Easy - Web Browsers & Email (Email Fields / Protocols)
  {
    id: 'q_accenture_004',
    questionType: 'MCQ_SINGLE',
    questionText: 'When composing a business email to multiple external clients, which address field should be used to ensure that recipients cannot see each other\'s email addresses, thereby maintaining privacy and compliance?',
    options: [
      { id: 'A', text: 'To' },
      { id: 'B', text: 'Cc (Carbon Copy)' },
      { id: 'C', text: 'Bcc (Blind Carbon Copy)' },
      { id: 'D', text: 'Reply-All' }
    ],
    correctAnswer: 'C',
    explanation: 'Bcc (Blind Carbon Copy) conceals the email addresses entered in that field from all recipients. When an email is delivered, the SMTP mail server strips Bcc headers from the recipient copy, ensuring that no recipient can view the email addresses of other recipients listed in the Bcc field, preserving privacy and confidentiality.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'Web Browsers & Email',
    subtopic: 'Email Addressing & Privacy Standards',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Workplace Communication Standards',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Email', 'Bcc', 'Privacy', 'Workplace Applications']
  },

  // 5. Medium - MS Excel (Cell Referencing)
  {
    id: 'q_accenture_005',
    questionType: 'MCQ_SINGLE',
    questionText: 'In an Excel spreadsheet, cell C1 contains the formula `=$A$1 + B1`. If cell C1 is copied and pasted into cell E3, what will the resulting formula in cell E3 be?',
    options: [
      { id: 'A', text: '=$A$1 + B1' },
      { id: 'B', text: '=$A$1 + D3' },
      { id: 'C', text: '=$C$3 + D3' },
      { id: 'D', text: '=$A$3 + B3' }
    ],
    correctAnswer: 'B',
    explanation: 'In Excel formulas, `$A$1` is an absolute reference (both column A and row 1 are fixed with `$` signs) and will remain unchanged regardless of where the formula is copied. In contrast, `B1` is a relative reference located one column to the left and in the same row as cell C1. When pasted into E3 (moved 2 columns right and 2 rows down), the relative reference shifts from B1 to D3 (one column left of E, in row 3). Thus, the formula becomes `=$A$1 + D3`.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS Excel',
    subtopic: 'Relative vs Absolute Cell Referencing',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Spreadsheet Logic & Cell Addressing',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS Excel', 'Cell Referencing', 'Absolute Reference', 'Formulas']
  },

  // 6. Medium - MS Excel (VLOOKUP & Lookup Mechanisms)
  {
    id: 'q_accenture_006',
    questionType: 'MCQ_SINGLE',
    questionText: 'Consider the Excel formula `=VLOOKUP("EMP104", A2:D50, 3, FALSE)`. What does the fourth parameter `FALSE` specify?',
    options: [
      { id: 'A', text: 'It sorts the table range A2:D50 in descending order before executing the search' },
      { id: 'B', text: 'It requires an exact match for the lookup value "EMP104" and returns #N/A if not found' },
      { id: 'C', text: 'It returns an approximate match assuming column A is sorted in ascending order' },
      { id: 'D', text: 'It searches horizontally across row 3 instead of vertically down column A' }
    ],
    correctAnswer: 'B',
    explanation: 'In the VLOOKUP function `=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])`, setting `range_lookup` to `FALSE` (or `0`) instructs Excel to perform an exact match search. If an exact match for "EMP104" is not found in the first column of the range, VLOOKUP returns the `#N/A` error. Setting it to `TRUE` (or omitting it) enables approximate matching which requires the first column to be sorted.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS Excel',
    subtopic: 'Lookup & Reference Functions',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Data Retrieval & Spreadsheet Functions',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS Excel', 'VLOOKUP', 'Lookup Functions', 'Formulas']
  },

  // 7. Medium - MS Word (Mail Merge Workflow)
  {
    id: 'q_accenture_007',
    questionType: 'MCQ_SINGLE',
    questionText: 'An administrative team needs to generate personalized offer letters for 200 candidates using a standard template in Microsoft Word and an applicant database in Microsoft Excel. Which feature accomplishes this automated batch generation workflow?',
    options: [
      { id: 'A', text: 'AutoCorrect Macro' },
      { id: 'B', text: 'Mail Merge' },
      { id: 'C', text: 'Object Linking and Embedding (OLE)' },
      { id: 'D', text: 'Track Changes with Document Compare' }
    ],
    correctAnswer: 'B',
    explanation: 'Mail Merge is the standard Microsoft Office workflow feature that connects a template document (such as a letter, email, or certificate in Word) with a structured data source (such as an Excel sheet, CSV file, or Access database). It substitutes merge fields (e.g., «Candidate_Name», «Designation», «Salary») with row-by-row records to generate personalized individual documents in a single automated batch.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS Word',
    subtopic: 'Mail Merge & Document Automation',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Office Document Automation Workflows',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS Word', 'Mail Merge', 'Automation', 'Workflows']
  },

  // 8. Medium - MS Excel (Conditional Aggregation / COUNTIFS)
  {
    id: 'q_accenture_008',
    questionType: 'MCQ_SINGLE',
    questionText: 'A dataset has employee departments in column B (range B2:B100) and employee years of experience in column C (range C2:C100). Which Excel formula calculates the total number of employees who belong to the "IT" department AND have more than 5 years of experience?',
    options: [
      { id: 'A', text: '=COUNTIF(B2:B100, "IT", C2:C100, ">5")' },
      { id: 'B', text: '=COUNTIFS(B2:B100, "IT", C2:C100, ">5")' },
      { id: 'C', text: '=SUMIFS(B2:B100, "IT", C2:C100, ">5")' },
      { id: 'D', text: '=AND(COUNTIF(B2:B100, "IT"), COUNTIF(C2:C100, ">5"))' }
    ],
    correctAnswer: 'B',
    explanation: 'The `=COUNTIFS(criteria_range1, criteria1, criteria_range2, criteria2, ...)` function evaluates multiple criteria across multiple ranges and counts only those rows where all specified conditions evaluate to TRUE simultaneously. `COUNTIF` only accepts a single criteria range, whereas `SUMIFS` requires a sum range as its first argument to sum values rather than count records.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS Excel',
    subtopic: 'Multi-Condition Criteria Formulas',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Applied Data Analysis in Spreadsheets',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS Excel', 'COUNTIFS', 'Formulas', 'Data Aggregation']
  },

  // 9. Medium - MS Excel (Data Tools: Freeze Panes vs Filtering)
  {
    id: 'q_accenture_009',
    questionType: 'MCQ_SINGLE',
    questionText: 'When navigating a spreadsheet with 5,000 rows and 30 columns, a user wants the column headers in Row 1 and employee IDs in Column A to remain constantly visible while scrolling vertically and horizontally. Which feature should be configured?',
    options: [
      { id: 'A', text: 'Split Screen with AutoFit Columns' },
      { id: 'B', text: 'Freeze Panes (by selecting cell B2 and choosing Freeze Panes)' },
      { id: 'C', text: 'Data Validation with Dropdown Lock' },
      { id: 'D', text: 'Conditional Formatting with Fixed Pin' }
    ],
    correctAnswer: 'B',
    explanation: 'The Freeze Panes feature in Excel locks specific rows and/or columns in place while scrolling through large sheets. When a user selects cell B2 and activates "Freeze Panes", Excel freezes all rows above cell B2 (Row 1) and all columns to the left of cell B2 (Column A), keeping both visible during vertical and horizontal navigation.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS Excel',
    subtopic: 'Worksheet Navigation & View Options',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Spreadsheet Layout & Data Handling',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS Excel', 'Freeze Panes', 'View Options', 'Worksheet Management']
  },

  // 10. Medium - MS PowerPoint (Animations vs Transitions)
  {
    id: 'q_accenture_010',
    questionType: 'MCQ_SINGLE',
    questionText: 'What is the fundamental functional difference between a "Transition" and an "Animation" in presentation software like Microsoft PowerPoint?',
    options: [
      { id: 'A', text: 'Transitions apply motion effects to individual objects (text, charts, images) on a slide, whereas Animations apply visual effects when moving from one slide to the next' },
      { id: 'B', text: 'Transitions apply visual effects to the movement between slides during a slide show, whereas Animations apply visual motion effects to specific individual elements within a single slide' },
      { id: 'C', text: 'Transitions are only active during web broadcasts, whereas Animations only function in exported PDF documents' },
      { id: 'D', text: 'Transitions control audio tracks, while Animations control video playback speed' }
    ],
    correctAnswer: 'B',
    explanation: 'In Microsoft PowerPoint: 1. Slide Transitions control the visual effect that occurs when transitioning from one slide to another during a presentation (e.g., Fade, Push, Wipe). 2. Animations control the entrance, emphasis, exit, or motion path of individual items or objects (such as text boxes, shapes, charts, or images) within a single slide.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS PowerPoint',
    subtopic: 'Visual Effects & Presentation Delivery',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Presentation Software Architecture',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS PowerPoint', 'Transitions', 'Animations', 'Presentation Concepts']
  },

  // 11. Medium - Shortcuts & Workflows (System & Office Productivity Shortcuts)
  {
    id: 'q_accenture_011',
    questionType: 'MCQ_SINGLE',
    questionText: 'In standard Windows and Microsoft Office productivity suites, which keyboard shortcut allows you to instantly find and replace specific text or values throughout a document or workbook?',
    options: [
      { id: 'A', text: 'Ctrl + F' },
      { id: 'B', text: 'Ctrl + H' },
      { id: 'C', text: 'Ctrl + K' },
      { id: 'D', text: 'Ctrl + G' }
    ],
    correctAnswer: 'B',
    explanation: 'In Microsoft Office applications (Word, Excel, PowerPoint) and standard text editors, `Ctrl + H` opens the "Find and Replace" dialog box directly. `Ctrl + F` opens the Find/Navigation pane, `Ctrl + K` opens the Insert Hyperlink dialog, and `Ctrl + G` opens the Go To dialog.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'Shortcuts & Workflows',
    subtopic: 'Keyboard Shortcuts & Quick Actions',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Standard Office Productivity Shortcuts',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Shortcuts & Workflows', 'Keyboard Shortcuts', 'Productivity', 'Find and Replace']
  },

  // 12. Hard - MS Excel (Nested Logic / INDEX-MATCH vs Two-Way Lookup)
  {
    id: 'q_accenture_012',
    questionType: 'MCQ_SINGLE',
    questionText: 'A sales matrix has product names listed in cells A2:A10 (rows) and region names listed in cells B1:F1 (columns), with revenue figures filling the grid B2:F10. Which Excel formula dynamically retrieves the exact revenue for a Product specified in cell H1 and a Region specified in cell H2?',
    options: [
      { id: 'A', text: '=VLOOKUP(H1, A2:F10, MATCH(H2, B1:F1, 0), FALSE)' },
      { id: 'B', text: '=INDEX(B2:F10, MATCH(H1, A2:A10, 0), MATCH(H2, B1:F1, 0))' },
      { id: 'C', text: '=MATCH(H1, A2:A10, 0) + MATCH(H2, B1:F1, 0)' },
      { id: 'D', text: '=LOOKUP(H1, H2, B2:F10)' }
    ],
    correctAnswer: 'B',
    explanation: 'A dynamic two-way matrix lookup is cleanly implemented using `=INDEX(array, row_num, col_num)`. Here: 1. `MATCH(H1, A2:A10, 0)` finds the exact row index of the target Product in column A. 2. `MATCH(H2, B1:F1, 0)` finds the exact column index of the target Region in header row 1. 3. `INDEX(B2:F10, row_num, col_num)` returns the intersection cell value from the revenue matrix B2:F10. (Note: In option A, `VLOOKUP` fails because `MATCH` on B1:F1 gives an index relative to B1, which would offset VLOOKUP column indexing incorrectly by 1 unless adjusted).',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'MS Excel',
    subtopic: 'Dynamic Matrix Lookup (INDEX & MATCH)',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Advanced Spreadsheet Modeling & Data Retrieval',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['MS Excel', 'INDEX MATCH', 'Matrix Lookup', 'Advanced Formulas']
  },

  // =========================================================================
  // SECTION 2: NETWORKING, SECURITY & CLOUD BASICS (10 Questions: 2 Easy, 6 Medium, 2 Hard)
  // =========================================================================

  // 13. Easy - Networking (OSI Model & Layer Roles)
  {
    id: 'q_accenture_013',
    questionType: 'MCQ_SINGLE',
    questionText: 'In the 7-layer Open Systems Interconnection (OSI) reference model, which layer is responsible for logical IP addressing, path determination, and packet routing across intermediate routers?',
    options: [
      { id: 'A', text: 'Data Link Layer (Layer 2)' },
      { id: 'B', text: 'Network Layer (Layer 3)' },
      { id: 'C', text: 'Transport Layer (Layer 4)' },
      { id: 'D', text: 'Session Layer (Layer 5)' }
    ],
    correctAnswer: 'B',
    explanation: 'Layer 3, the Network Layer of the OSI model, is responsible for host-to-host communication, logical IP addressing (IPv4/IPv6), and routing data packets across interconnected networks using protocols such as IP, ICMP, and routing algorithms (OSPF, BGP). Layer 2 handles MAC addressing within local segments, and Layer 4 handles end-to-end process-to-process transport.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'OSI Model',
    subtopic: 'OSI Layers & Encapsulation',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Computer Networking Fundamentals',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['OSI Model', 'Networking', 'Layer 3', 'Routing', 'IP Addressing']
  },

  // 14. Easy - Cloud (Service Models: IaaS, PaaS, SaaS)
  {
    id: 'q_accenture_014',
    questionType: 'MCQ_SINGLE',
    questionText: 'Which cloud computing service delivery model provides end-users with ready-to-use software applications accessible over a web browser (such as Gmail, Microsoft 365, or Salesforce), where the provider manages all underlying infrastructure, operating systems, and application code?',
    options: [
      { id: 'A', text: 'Infrastructure as a Service (IaaS)' },
      { id: 'B', text: 'Platform as a Service (PaaS)' },
      { id: 'C', text: 'Software as a Service (SaaS)' },
      { id: 'D', text: 'Function as a Service (FaaS)' }
    ],
    correctAnswer: 'C',
    explanation: 'Software as a Service (SaaS) is a cloud delivery model where complete software applications are hosted by the cloud provider and accessed by consumers over the internet via a web browser or thin client interface. The cloud provider handles all maintenance, infrastructure, OS patches, networking, and data storage, leaving the user to only manage application settings and user data.',
    difficulty: 'Easy',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'Cloud Computing Concepts',
    subtopic: 'Cloud Service Models (IaaS, PaaS, SaaS)',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'NIST Cloud Computing Definition Standards',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Cloud Computing', 'SaaS', 'Service Models', 'Cloud Architecture']
  },

  // 15. Medium - Networking (TCP vs UDP Transport Protocols)
  {
    id: 'q_accenture_015',
    questionType: 'MCQ_SINGLE',
    questionText: 'Which statement accurately describes a key operational difference between the Transmission Control Protocol (TCP) and the User Datagram Protocol (UDP)?',
    options: [
      { id: 'A', text: 'TCP is connectionless and provides faster transmission without guarantees, whereas UDP establishes a three-way handshake' },
      { id: 'B', text: 'TCP provides reliable, ordered byte-stream delivery with flow control and retransmissions, whereas UDP is connectionless and prioritizes low latency without delivery guarantees' },
      { id: 'C', text: 'TCP operates exclusively at the Network layer, whereas UDP operates at the Data Link layer' },
      { id: 'D', text: 'TCP does not support error checking via checksums, whereas UDP enforces strict sequencing' }
    ],
    correctAnswer: 'B',
    explanation: 'TCP (Transmission Control Protocol) is a connection-oriented transport protocol that establishes a connection using a 3-way handshake (SYN, SYN-ACK, ACK) and provides reliable, guaranteed, ordered packet delivery with flow control, congestion control, and automatic retransmission of lost segments. UDP (User Datagram Protocol) is connectionless, lightweight, and transmits datagrams without state tracking or retransmission overhead, making it ideal for real-time applications like DNS, VoIP, and live video streaming.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'TCP/IP',
    subtopic: 'Transport Protocols (TCP vs UDP)',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Transport Layer Protocols & Network Architecture',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['TCP', 'UDP', 'Networking', 'Transport Layer', 'Three-Way Handshake']
  },

  // 16. Medium - Networking (DNS Resolution Workflow)
  {
    id: 'q_accenture_016',
    questionType: 'MCQ_SINGLE',
    questionText: 'When a web client queries a domain name like `www.example.com` for the first time, what is the primary role of the Domain Name System (DNS)?',
    options: [
      { id: 'A', text: 'To encrypt HTTP payloads before transmission over public routers' },
      { id: 'B', text: 'To translate human-readable domain names into machine-routable IP addresses' },
      { id: 'C', text: 'To dynamically allocate private IP addresses to local devices via DHCP' },
      { id: 'D', text: 'To filter malicious SQL injection queries at the application layer' }
    ],
    correctAnswer: 'B',
    explanation: 'The Domain Name System (DNS) operates as the distributed hierarchical naming system / directory for the internet. Its primary purpose is to resolve and translate human-readable hostnames (e.g., www.example.com) into numerical or hexadecimal IP addresses (e.g., 93.184.216.34 or 2606:2800:220:1:248:1893:25c8:1946) that underlying networking hardware and routing protocols require to establish TCP/IP connections.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'TCP/IP',
    subtopic: 'DNS Architecture & Name Resolution',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Internet Protocol Suite & DNS Resolution',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['DNS', 'Networking', 'IP Resolution', 'Web Fundamentals']
  },

  // 17. Medium - Security (Authentication vs Authorization)
  {
    id: 'q_accenture_017',
    questionType: 'MCQ_SINGLE',
    questionText: 'In application and system security, how is "Authentication" fundamentally distinguished from "Authorization"?',
    options: [
      { id: 'A', text: 'Authentication verifies who a user is (identity verification), while Authorization determines what permissions and resources the verified user is allowed to access' },
      { id: 'B', text: 'Authentication assigns access tokens, while Authorization validates passwords against hashing algorithms' },
      { id: 'C', text: 'Authentication is applied only to database schemas, while Authorization is applied only to network firewalls' },
      { id: 'D', text: 'Authentication encrypts network traffic with SSL, while Authorization decrypts stored files' }
    ],
    correctAnswer: 'A',
    explanation: 'Authentication (AuthN) is the process of validating identity—verifying that an entity (user or service) is indeed who they claim to be (via passwords, biometrics, MFA, or digital signatures). Authorization (AuthZ) occurs after successful authentication to determine the specific permissions, roles, actions, and resources that the authenticated identity is permitted to access or execute (e.g., RBAC policies).',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'Network Security & Firewalls',
    subtopic: 'Authentication vs Authorization (AuthN/AuthZ)',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Information Security & Access Control Frameworks',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Security', 'Authentication', 'Authorization', 'Access Control', 'Identity']
  },

  // 18. Medium - Security (Symmetric vs Asymmetric Encryption)
  {
    id: 'q_accenture_018',
    questionType: 'MCQ_SINGLE',
    questionText: 'Which statement accurately describes the core mechanism of Asymmetric (Public Key) Cryptography compared to Symmetric Cryptography?',
    options: [
      { id: 'A', text: 'Asymmetric cryptography uses a single shared secret key for both encryption and decryption, requiring secure pre-sharing' },
      { id: 'B', text: 'Asymmetric cryptography uses a mathematically linked key pair: a public key for encryption and a distinct private key for decryption' },
      { id: 'C', text: 'Asymmetric cryptography is significantly faster than symmetric encryption and is therefore used to encrypt bulk disk storage' },
      { id: 'D', text: 'Asymmetric cryptography does not require mathematical one-way trapdoor functions' }
    ],
    correctAnswer: 'B',
    explanation: 'Asymmetric encryption (public-key cryptography, e.g., RSA, ECC) utilizes a mathematically related key pair: a Public Key (freely distributed to encrypt messages or verify signatures) and a Private Key (kept strictly confidential by the owner to decrypt ciphertext or generate digital signatures). Symmetric encryption (e.g., AES) uses the exact same shared secret key for both encryption and decryption.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'Encryption Basics',
    subtopic: 'Public Key Cryptography & Key Management',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Applied Cryptography & Secure Communications',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Encryption', 'Cryptography', 'Public Key', 'Asymmetric', 'Security']
  },

  // 19. Medium - Cloud (Horizontal vs Vertical Scaling)
  {
    id: 'q_accenture_019',
    questionType: 'MCQ_SINGLE',
    questionText: 'An e-commerce web application expects a massive surge in traffic during a flash sale. The engineering team configures an Auto Scaling group behind a Load Balancer to automatically provision additional virtual machine instances as traffic rises. What type of scaling does this represent?',
    options: [
      { id: 'A', text: 'Vertical Scaling (Scaling Up)' },
      { id: 'B', text: 'Horizontal Scaling (Scaling Out)' },
      { id: 'C', text: 'Database Sharding' },
      { id: 'D', text: 'Hypervisor Overcommitting' }
    ],
    correctAnswer: 'B',
    explanation: 'Horizontal scaling (scaling out) refers to adding more computing nodes/instances (such as additional virtual machines or containers) to a distributed resource pool to share workload distribution through a load balancer. Vertical scaling (scaling up), by contrast, involves upgrading the hardware capacity (CPU, RAM, or storage) of an existing single server node.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'Cloud Computing Concepts',
    subtopic: 'Elasticity & Scalability (Horizontal vs Vertical)',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Cloud Architecture Patterns & Elastic Infrastructure',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Cloud Computing', 'Horizontal Scaling', 'Elasticity', 'Load Balancing']
  },

  // 20. Medium - Security (Phishing & Social Engineering Vectors)
  {
    id: 'q_accenture_020',
    questionType: 'MCQ_SINGLE',
    questionText: 'An employee receives an urgent email appearing to come from the company\'s IT Helpdesk with a spoofed header, directing them to a fake login portal to immediately reset their password due to an alleged security breach. What cybersecurity attack vector does this scenario exemplify?',
    options: [
      { id: 'A', text: 'Distributed Denial of Service (DDoS)' },
      { id: 'B', text: 'Phishing / Social Engineering' },
      { id: 'C', text: 'SQL Injection' },
      { id: 'D', text: 'Buffer Overflow' }
    ],
    correctAnswer: 'B',
    explanation: 'Phishing is a form of social engineering where attackers impersonate trustworthy entities (such as IT support, executives, or banking institutions) via deceptive electronic communications (like spoofed emails) to trick individuals into revealing sensitive credentials, passwords, or installing malware.',
    difficulty: 'Medium',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'Network Security & Firewalls',
    subtopic: 'Threat Vectors & Social Engineering',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Cybersecurity Awareness & Threat Modeling',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Security', 'Phishing', 'Social Engineering', 'Threat Vectors']
  },

  // 21. Hard - Networking & Security (HTTPS & TLS Handshake)
  {
    id: 'q_accenture_021',
    questionType: 'MCQ_SINGLE',
    questionText: 'During a standard HTTPS (TLS 1.2/1.3) connection setup between a web browser and a secure web server, how is cryptographic confidentiality established for application data transfer?',
    options: [
      { id: 'A', text: 'Asymmetric encryption alone is used to encrypt all incoming and outgoing HTTP request/response payloads throughout the entire active session' },
      { id: 'B', text: 'Asymmetric encryption is used during the initial handshake to authenticate the server and securely establish a shared session key, after which high-speed symmetric encryption is used for session data transfer' },
      { id: 'C', text: 'The client sends unencrypted plaintext HTTP payloads, but the router hashes them with MD5 before packet forwarding' },
      { id: 'D', text: 'The DNS resolver issues a shared private key that both client and server store statically in local browser cache' }
    ],
    correctAnswer: 'B',
    explanation: 'HTTPS combines asymmetric and symmetric cryptography in a hybrid architecture: 1. Asymmetric cryptography (using the server\'s TLS/SSL digital certificate and public/private key pair via Diffie-Hellman / RSA) authenticates the server\'s identity and facilitates secure key exchange during the initial TLS Handshake. 2. Once a shared temporary session key is negotiated, all subsequent application payload data is encrypted using high-performance Symmetric encryption (such as AES-GCM or ChaCha20-Poly1305) because symmetric ciphers are computationally much faster for bulk data streaming.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'Encryption Basics',
    subtopic: 'HTTPS, TLS Handshake & Hybrid Encryption',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Transport Layer Security Protocol Standards',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['HTTPS', 'TLS Handshake', 'Hybrid Encryption', 'Cryptography', 'Security']
  },

  // 22. Hard - Cloud Architecture (High Availability & Multi-AZ Deployments)
  {
    id: 'q_accenture_022',
    questionType: 'MCQ_SINGLE',
    questionText: 'In modern cloud infrastructure design (e.g., AWS, Azure, GCP), which deployment strategy provides the highest resilience against catastrophic physical data center failures (such as a local power grid blackout or flooding) while maintaining sub-millisecond to low-millisecond synchronous data replication latency?',
    options: [
      { id: 'A', text: 'Deploying multiple virtual machines across separate rack slots within a single physical data center room' },
      { id: 'B', text: 'Multi-Availability Zone (Multi-AZ) deployment within a single geographic cloud region, connected by redundant low-latency fiber links' },
      { id: 'C', text: 'Storing nightly cold offline database backups on magnetic tape storage in a single on-premise vault' },
      { id: 'D', text: 'Hosting the application on a single oversized virtual machine with vertical scaling enabled' }
    ],
    correctAnswer: 'B',
    explanation: 'A Multi-Availability Zone (Multi-AZ) architecture distributes application servers and database replicas across multiple distinct, physically separated data center facilities (Availability Zones) within a single geographic Region. Each AZ has independent power, cooling, and physical security, yet they are interconnected via high-bandwidth, ultra-low-latency dedicated fiber networking. This architecture withstands single-datacenter disasters without total service interruption and supports synchronous data replication.',
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.CORE_CS_FUNDAMENTALS,
    topic: 'Cloud Computing Concepts',
    subtopic: 'High Availability, Fault Tolerance & Multi-AZ Architecture',
    supportedRoles: ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'],
    company: 'Accenture',
    source: 'FirstRound Original',
    sourceReference: 'Cloud Well-Architected Framework: Reliability Pillar',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Cloud Architecture', 'High Availability', 'Multi-AZ', 'Fault Tolerance', 'Disaster Recovery']
  },

  ...accentureQuestions_023_039,
  ...accentureQuestions_040_049,
  ...accentureQuestions_050_067,
  ...accentureQuestions_068_089
];

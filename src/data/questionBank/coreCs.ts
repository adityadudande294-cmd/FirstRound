import { Question, MCQQuestion } from '../../types';

export const coreCsQuestions: Question[] = [
  {
    id: 'q_core_cs_001',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'Which of the following process scheduling algorithms is most likely to cause starvation?',
    options: [
      { id: 'A', text: 'Round Robin (RR)' },
      { id: 'B', text: 'Shortest Job First (SJF)' },
      { id: 'C', text: 'First-Come, First-Served (FCFS)' },
      { id: 'D', text: 'Multilevel Feedback Queue' }
    ],
    correctOption: 'B',
    topic: 'Operating Systems',
    subTopic: 'Scheduling',
    difficulty: 'Medium',
    explanation: 'Shortest Job First (SJF) can lead to starvation if short processes keep arriving, causing a long process to wait indefinitely. Round Robin and Multilevel Feedback Queue have mechanisms to prevent starvation.'
  },
  {
    id: 'q_core_cs_002',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'In an Operating System, what is the primary purpose of a Translation Lookaside Buffer (TLB)?',
    options: [
      { id: 'A', text: 'To cache recently used pages from disk' },
      { id: 'B', text: 'To cache page table entries to speed up virtual-to-physical address translation' },
      { id: 'C', text: 'To translate high-level code into machine instructions' },
      { id: 'D', text: 'To prevent page faults' }
    ],
    correctOption: 'B',
    topic: 'Operating Systems',
    subTopic: 'Virtual Memory',
    difficulty: 'Medium',
    explanation: 'The TLB is a hardware cache for the page table. It stores recent virtual-to-physical address translations, significantly reducing the time taken to access memory.'
  },
  {
    id: 'q_core_cs_003',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'Which of the following is NOT a necessary condition for a deadlock to occur?',
    options: [
      { id: 'A', text: 'Mutual Exclusion' },
      { id: 'B', text: 'Hold and Wait' },
      { id: 'C', text: 'Preemption' },
      { id: 'D', text: 'Circular Wait' }
    ],
    correctOption: 'C',
    topic: 'Operating Systems',
    subTopic: 'Deadlocks',
    difficulty: 'Easy',
    explanation: 'The four necessary conditions for deadlock (Coffman conditions) are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Preemption breaks the condition, preventing deadlock.'
  },
  {
    id: 'q_core_cs_004',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'What is the phenomenon called when the operating system spends more time paging than executing processes?',
    options: [
      { id: 'A', text: 'Swapping' },
      { id: 'B', text: 'Fragmentation' },
      { id: 'C', text: 'Thrashing' },
      { id: 'D', text: 'Context Switching' }
    ],
    correctOption: 'C',
    topic: 'Operating Systems',
    subTopic: 'Memory Management',
    difficulty: 'Easy',
    explanation: 'Thrashing occurs when a system doesn\'t have enough physical memory for the active working sets of processes, causing the OS to constantly page data in and out of the disk.'
  },
  {
    id: 'q_core_cs_005',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'Which layer of the OSI model is responsible for logical addressing and routing?',
    options: [
      { id: 'A', text: 'Data Link Layer' },
      { id: 'B', text: 'Network Layer' },
      { id: 'C', text: 'Transport Layer' },
      { id: 'D', text: 'Session Layer' }
    ],
    correctOption: 'B',
    topic: 'Computer Networks',
    subTopic: 'OSI Model',
    difficulty: 'Easy',
    explanation: 'The Network Layer (Layer 3) is responsible for logical addressing (e.g., IP addresses) and determining the best path (routing) to send packets to their destination.'
  },
  {
    id: 'q_core_cs_006',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'What is the primary difference between TCP and UDP?',
    options: [
      { id: 'A', text: 'TCP is connectionless, while UDP is connection-oriented' },
      { id: 'B', text: 'TCP guarantees delivery and ordering, while UDP does not' },
      { id: 'C', text: 'TCP operates at the Network Layer, while UDP operates at the Transport Layer' },
      { id: 'D', text: 'UDP is generally slower than TCP due to error checking' }
    ],
    correctOption: 'B',
    topic: 'Computer Networks',
    subTopic: 'TCP/IP',
    difficulty: 'Easy',
    explanation: 'TCP is connection-oriented and ensures reliable, ordered delivery of data via acknowledgments and retransmissions. UDP is connectionless and faster but does not guarantee delivery.'
  },
  {
    id: 'q_core_cs_007',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'Which protocol is used to resolve a domain name (e.g., www.example.com) to an IP address?',
    options: [
      { id: 'A', text: 'ARP' },
      { id: 'B', text: 'DHCP' },
      { id: 'C', text: 'DNS' },
      { id: 'D', text: 'ICMP' }
    ],
    correctOption: 'C',
    topic: 'Computer Networks',
    subTopic: 'DNS',
    difficulty: 'Easy',
    explanation: 'DNS (Domain Name System) translates human-readable domain names into numerical IP addresses needed for routing over the Internet.'
  },
  {
    id: 'q_core_cs_008',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'In the context of database transactions, what does the \'I\' in ACID stand for?',
    options: [
      { id: 'A', text: 'Integrity' },
      { id: 'B', text: 'Isolation' },
      { id: 'C', text: 'Idempotency' },
      { id: 'D', text: 'Independence' }
    ],
    correctOption: 'B',
    topic: 'DBMS',
    subTopic: 'Transactions',
    difficulty: 'Easy',
    explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability. Isolation ensures that concurrent transactions execute independently without interfering with each other.'
  },
  {
    id: 'q_core_cs_009',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'A database table is in Second Normal Form (2NF) if it is in 1NF and:',
    options: [
      { id: 'A', text: 'It has no transitive dependencies' },
      { id: 'B', text: 'It has no partial dependencies' },
      { id: 'C', text: 'All non-key attributes depend on another non-key attribute' },
      { id: 'D', text: 'Every determinant is a candidate key' }
    ],
    correctOption: 'B',
    topic: 'DBMS',
    subTopic: 'Normalization',
    difficulty: 'Medium',
    explanation: 'For a table to be in 2NF, it must be in 1NF and all non-key attributes must be fully functionally dependent on the entire primary key (i.e., no partial dependencies).'
  },
  {
    id: 'q_core_cs_010',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'Which data structure is most commonly used to implement a database index?',
    options: [
      { id: 'A', text: 'Hash Table' },
      { id: 'B', text: 'B-Tree or B+ Tree' },
      { id: 'C', text: 'Linked List' },
      { id: 'D', text: 'Stack' }
    ],
    correctOption: 'B',
    topic: 'DBMS',
    subTopic: 'Indexing',
    difficulty: 'Easy',
    explanation: 'B-Trees and B+ Trees are self-balancing search trees commonly used for database indexes because they allow for efficient insertions, deletions, and sequential traversals stored on disk.'
  },
  {
    id: 'q_core_cs_011',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'Which Object-Oriented Programming (OOP) principle refers to hiding the internal state of an object and requiring all interaction to be performed through an object\'s methods?',
    options: [
      { id: 'A', text: 'Inheritance' },
      { id: 'B', text: 'Polymorphism' },
      { id: 'C', text: 'Encapsulation' },
      { id: 'D', text: 'Abstraction' }
    ],
    correctOption: 'C',
    topic: 'OOP',
    subTopic: 'Concepts',
    difficulty: 'Easy',
    explanation: 'Encapsulation is the bundling of data and the methods that operate on that data into a single unit (class), while restricting direct access to some of the object\'s components.'
  },
  {
    id: 'q_core_cs_012',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'In OOP, Method Overriding is an example of which type of polymorphism?',
    options: [
      { id: 'A', text: 'Compile-time polymorphism' },
      { id: 'B', text: 'Run-time polymorphism' },
      { id: 'C', text: 'Parametric polymorphism' },
      { id: 'D', text: 'Ad-hoc polymorphism' }
    ],
    correctOption: 'B',
    topic: 'OOP',
    subTopic: 'Polymorphism',
    difficulty: 'Medium',
    explanation: 'Method overriding (dynamic method dispatch) is an example of run-time polymorphism because the call to an overridden method is resolved at run-time, rather than compile-time.'
  },
  {
    id: 'q_core_cs_013',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'What is a Singleton design pattern?',
    options: [
      { id: 'A', text: 'A pattern that creates multiple instances of a class for concurrency' },
      { id: 'B', text: 'A pattern that restricts the instantiation of a class to one single instance' },
      { id: 'C', text: 'A pattern used to inherit from multiple parent classes' },
      { id: 'D', text: 'A pattern that provides a surrogate or placeholder for another object' }
    ],
    correctOption: 'B',
    topic: 'OOP',
    subTopic: 'Design Patterns',
    difficulty: 'Easy',
    explanation: 'The Singleton pattern ensures that a class has only one instance and provides a global point of access to it.'
  },
  {
    id: 'q_core_cs_014',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'Which of the following is true about a process and a thread?',
    options: [
      { id: 'A', text: 'A process is lightweight, whereas a thread is heavy-weight' },
      { id: 'B', text: 'Threads share the same memory space of their parent process' },
      { id: 'C', text: 'Processes share the same memory space by default' },
      { id: 'D', text: 'Context switching between processes is faster than between threads' }
    ],
    correctOption: 'B',
    topic: 'Operating Systems',
    subTopic: 'Processes',
    difficulty: 'Medium',
    explanation: 'Threads within the same process share the same memory address space (data, heap, code), whereas processes have separate, independent memory spaces.'
  },
  {
    id: 'q_core_cs_015',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'In computer architecture, what is the purpose of pipeline hazards?',
    options: [
      { id: 'A', text: 'They are techniques to speed up execution' },
      { id: 'B', text: 'They are conditions that prevent the next instruction from executing in its designated clock cycle' },
      { id: 'C', text: 'They refer to physical damage to the CPU cache' },
      { id: 'D', text: 'They are mechanisms to prevent memory leaks' }
    ],
    correctOption: 'B',
    topic: 'Computer Architecture',
    subTopic: 'Pipelining',
    difficulty: 'Hard',
    explanation: 'Pipeline hazards (structural, data, and control) are situations in pipelining where the next instruction cannot execute in the following clock cycle, causing pipeline stalls.'
  },
  {
    id: 'q_core_cs_016',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'What is the role of the \'Subnet Mask\' in an IP network?',
    options: [
      { id: 'A', text: 'To encrypt data packets' },
      { id: 'B', text: 'To distinguish the network portion from the host portion of an IP address' },
      { id: 'C', text: 'To assign IP addresses automatically' },
      { id: 'D', text: 'To route traffic between different autonomous systems' }
    ],
    correctOption: 'B',
    topic: 'Computer Networks',
    subTopic: 'IP Addressing',
    difficulty: 'Medium',
    explanation: 'A subnet mask is used to divide an IP address into two parts: the network address (used for routing) and the host address (identifying the specific device).'
  },
  {
    id: 'q_core_cs_017',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'Which synchronization primitive is an integer variable that, apart from initialization, is accessed only through two standard atomic operations: wait() and signal()?',
    options: [
      { id: 'A', text: 'Mutex' },
      { id: 'B', text: 'Monitor' },
      { id: 'C', text: 'Semaphore' },
      { id: 'D', text: 'Spinlock' }
    ],
    correctOption: 'C',
    topic: 'Operating Systems',
    subTopic: 'Synchronization',
    difficulty: 'Easy',
    explanation: 'A semaphore is a signaling mechanism using an integer variable accessed via atomic wait (P) and signal (V) operations, invented by Edsger Dijkstra.'
  },
  {
    id: 'q_core_cs_018',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'In a relational database, what does a \'Foreign Key\' do?',
    options: [
      { id: 'A', text: 'It uniquely identifies each record in a table' },
      { id: 'B', text: 'It encrypts the column data' },
      { id: 'C', text: 'It establishes a link between the data in two tables' },
      { id: 'D', text: 'It speeds up query execution' }
    ],
    correctOption: 'C',
    topic: 'DBMS',
    subTopic: 'Relational Integrity',
    difficulty: 'Easy',
    explanation: 'A foreign key is a column or group of columns in a relational database table that provides a link between data in two tables, enforcing referential integrity.'
  },
  {
    id: 'q_core_cs_019',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'Which HTTP method is defined as idempotent?',
    options: [
      { id: 'A', text: 'POST' },
      { id: 'B', text: 'PUT' },
      { id: 'C', text: 'PATCH' },
      { id: 'D', text: 'None of the above' }
    ],
    correctOption: 'B',
    topic: 'Computer Networks',
    subTopic: 'HTTP',
    difficulty: 'Medium',
    explanation: 'An idempotent HTTP method (like GET, PUT, DELETE) means that making multiple identical requests has the same effect as making a single request. POST is not idempotent.'
  },
  {
    id: 'q_core_cs_020',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'What is the function of the ARP protocol?',
    options: [
      { id: 'A', text: 'To map an IP address to a MAC address' },
      { id: 'B', text: 'To map a MAC address to an IP address' },
      { id: 'C', text: 'To route packets across the internet' },
      { id: 'D', text: 'To assign IP addresses to devices dynamically' }
    ],
    correctOption: 'A',
    topic: 'Computer Networks',
    subTopic: 'OSI Model',
    difficulty: 'Medium',
    explanation: 'The Address Resolution Protocol (ARP) is used to map a known logical (IP) address to an unknown physical (MAC) address on a local network.'
  },
  {
    id: 'q_core_cs_021',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'What does \'Context Switching\' refer to in an OS?',
    options: [
      { id: 'A', text: 'Switching the CPU from user mode to kernel mode' },
      { id: 'B', text: 'Storing the state of a process so it can be resumed later and loading the state of a new process' },
      { id: 'C', text: 'Moving a process from main memory to disk' },
      { id: 'D', text: 'Terminating a child process' }
    ],
    correctOption: 'B',
    topic: 'Operating Systems',
    subTopic: 'Process Management',
    difficulty: 'Medium',
    explanation: 'Context switching is the process of storing the state (context) of the currently running process and restoring the state of the next process to be executed by the CPU.'
  },
  {
    id: 'q_core_cs_022',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'Which cache mapping technique allows a block of memory to be placed in any cache line?',
    options: [
      { id: 'A', text: 'Direct Mapping' },
      { id: 'B', text: 'Set-Associative Mapping' },
      { id: 'C', text: 'Fully Associative Mapping' },
      { id: 'D', text: 'Segmented Mapping' }
    ],
    correctOption: 'C',
    topic: 'Computer Architecture',
    subTopic: 'Cache Memory',
    difficulty: 'Hard',
    explanation: 'In Fully Associative cache mapping, any block in main memory can be mapped to any line in the cache, offering the lowest miss rate but requiring expensive hardware.'
  },
  {
    id: 'q_core_cs_023',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'In OOP, what is an Abstract Class?',
    options: [
      { id: 'A', text: 'A class that contains only static methods' },
      { id: 'B', text: 'A class that cannot be instantiated and usually contains at least one abstract method' },
      { id: 'C', text: 'A class that is hidden from other packages' },
      { id: 'D', text: 'A class used strictly for testing' }
    ],
    correctOption: 'B',
    topic: 'OOP',
    subTopic: 'Concepts',
    difficulty: 'Medium',
    explanation: 'An abstract class cannot be instantiated on its own and is designed to be subclassed. It often contains abstract methods that derived classes must implement.'
  },
  {
    id: 'q_core_cs_024',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'What is a \'Dirty Read\' in database concurrency?',
    options: [
      { id: 'A', text: 'Reading data that has been modified by an uncommitted transaction' },
      { id: 'B', text: 'Reading the same row twice and getting different results' },
      { id: 'C', text: 'Reading a row that has been deleted by a committed transaction' },
      { id: 'D', text: 'Reading data from a corrupted sector on the disk' }
    ],
    correctOption: 'A',
    topic: 'DBMS',
    subTopic: 'Transactions',
    difficulty: 'Hard',
    explanation: 'A dirty read occurs when a transaction reads data written by a concurrent uncommitted transaction. If the other transaction rolls back, the read data becomes invalid.'
  },
  {
    id: 'q_core_cs_025',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'What is the purpose of the Factory Method design pattern?',
    options: [
      { id: 'A', text: 'To ensure a class has only one instance' },
      { id: 'B', text: 'To create objects without specifying the exact class of object that will be created' },
      { id: 'C', text: 'To attach additional responsibilities to an object dynamically' },
      { id: 'D', text: 'To notify multiple objects when state changes' }
    ],
    correctOption: 'B',
    topic: 'OOP',
    subTopic: 'Design Patterns',
    difficulty: 'Hard',
    explanation: 'The Factory Method pattern defines an interface for creating an object, but lets subclasses decide which class to instantiate. It defers instantiation to subclasses.'
  },
  {
    id: 'q_core_cs_026',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'Which algorithm is commonly used to avoid Deadlocks in an Operating System by predicting resource allocation?',
    options: [
      { id: 'A', text: 'Round Robin' },
      { id: 'B', text: 'Peterson\'s Algorithm' },
      { id: 'C', text: 'Banker\'s Algorithm' },
      { id: 'D', text: 'Dekker\'s Algorithm' }
    ],
    correctOption: 'C',
    topic: 'Operating Systems',
    subTopic: 'Deadlocks',
    difficulty: 'Medium',
    explanation: 'The Banker\'s Algorithm is a resource allocation and deadlock avoidance algorithm that simulates allocation and checks for safe states before granting resources.'
  },
  {
    id: 'q_core_cs_027',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'In the TCP/IP model, which protocol operates at the Application layer?',
    options: [
      { id: 'A', text: 'IP' },
      { id: 'B', text: 'TCP' },
      { id: 'C', text: 'FTP' },
      { id: 'D', text: 'Ethernet' }
    ],
    correctOption: 'C',
    topic: 'Computer Networks',
    subTopic: 'TCP/IP',
    difficulty: 'Easy',
    explanation: 'FTP (File Transfer Protocol) operates at the Application layer of the TCP/IP model. IP is at the Internet layer, TCP is Transport, and Ethernet is Link layer.'
  },
  {
    id: 'q_core_cs_028',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'What does the CAP theorem state regarding distributed systems?',
    options: [
      { id: 'A', text: 'A system can only provide two of: Consistency, Availability, Partition tolerance' },
      { id: 'B', text: 'Concurrency Always Prevents Consistency' },
      { id: 'C', text: 'A system must be Centralized, Available, and Persistent' },
      { id: 'D', text: 'Compute, Availability, and Performance are directly proportional' }
    ],
    correctOption: 'A',
    topic: 'DBMS',
    subTopic: 'System Design Basics',
    difficulty: 'Medium',
    explanation: 'The CAP theorem states that it is impossible for a distributed data store to simultaneously provide more than two out of the following three guarantees: Consistency, Availability, and Partition tolerance.'
  },
  {
    id: 'q_core_cs_029',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'What is a Page Fault?',
    options: [
      { id: 'A', text: 'An error in the HTML of a webpage' },
      { id: 'B', text: 'When a program tries to access a page that is mapped in address space but not loaded in physical memory' },
      { id: 'C', text: 'When a process writes beyond its allocated memory boundary' },
      { id: 'D', text: 'A hardware error in the RAM module' }
    ],
    correctOption: 'B',
    topic: 'Operating Systems',
    subTopic: 'Memory Management',
    difficulty: 'Medium',
    explanation: 'A page fault is an exception that the memory management unit (MMU) raises when a process accesses a memory page without proper preparations, usually because it is currently on disk (swapped out).'
  },
  {
    id: 'q_core_cs_030',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'Which network topology requires every device to be connected to a central hub or switch?',
    options: [
      { id: 'A', text: 'Ring Topology' },
      { id: 'B', text: 'Bus Topology' },
      { id: 'C', text: 'Star Topology' },
      { id: 'D', text: 'Mesh Topology' }
    ],
    correctOption: 'C',
    topic: 'Computer Networks',
    subTopic: 'Architecture',
    difficulty: 'Easy',
    explanation: 'In a Star Topology, all nodes are individually connected to a central connection point, like a hub or a switch.'
  },
  {
    id: 'q_core_cs_031',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'In DBMS, what is the primary purpose of a JOIN clause?',
    options: [
      { id: 'A', text: 'To combine rows from two or more tables based on a related column between them' },
      { id: 'B', text: 'To delete overlapping data from multiple tables' },
      { id: 'C', text: 'To index a table for faster search' },
      { id: 'D', text: 'To enforce a primary key constraint' }
    ],
    correctOption: 'A',
    topic: 'DBMS',
    subTopic: 'SQL',
    difficulty: 'Easy',
    explanation: 'A JOIN clause is used to combine rows from two or more tables, based on a related column between them, allowing queries across normalized tables.'
  },
  {
    id: 'q_core_cs_032',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'Which CPU register holds the address of the next instruction to be executed?',
    options: [
      { id: 'A', text: 'Instruction Register (IR)' },
      { id: 'B', text: 'Program Counter (PC)' },
      { id: 'C', text: 'Accumulator' },
      { id: 'D', text: 'Stack Pointer (SP)' }
    ],
    correctOption: 'B',
    topic: 'Computer Architecture',
    subTopic: 'Registers',
    difficulty: 'Medium',
    explanation: 'The Program Counter (PC) is a special-purpose register that keeps track of the memory address of the next instruction to be executed.'
  },
  {
    id: 'q_core_cs_033',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'What is \'Thick Client\' vs \'Thin Client\' in system architecture?',
    options: [
      { id: 'A', text: 'Thick clients perform bulk of data processing locally, while Thin clients rely heavily on a server' },
      { id: 'B', text: 'Thick clients have larger physical dimensions' },
      { id: 'C', text: 'Thin clients do not have an operating system installed' },
      { id: 'D', text: 'Thick clients require fiber optic connections' }
    ],
    correctOption: 'A',
    topic: 'System Design Basics',
    subTopic: 'Architecture',
    difficulty: 'Medium',
    explanation: 'A thick client processes most of its data locally and can function offline, whereas a thin client acts primarily as a terminal relying on the server for computation.'
  },
  {
    id: 'q_core_cs_034',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'In OOP, what is \'Composition\'?',
    options: [
      { id: 'A', text: 'Combining multiple classes into a single file' },
      { id: 'B', text: 'A "has-a" relationship where an object is made up of one or more other objects' },
      { id: 'C', text: 'Inheriting from multiple parent classes' },
      { id: 'D', text: 'Overloading a method with different signatures' }
    ],
    correctOption: 'B',
    topic: 'OOP',
    subTopic: 'Design Principles',
    difficulty: 'Medium',
    explanation: 'Composition models a "has-a" relationship, meaning a complex class is constructed from smaller, simpler classes. It is often preferred over inheritance ("is-a").'
  },
  {
    id: 'q_core_cs_035',
    testSeriesId: 'cat_coding_core_cs',
    questionType: 'MCQ',
    questionText: 'Which HTTP status code signifies that the resource was not found?',
    options: [
      { id: 'A', text: '200' },
      { id: 'B', text: '301' },
      { id: 'C', text: '403' },
      { id: 'D', text: '404' }
    ],
    correctOption: 'D',
    topic: 'Computer Networks',
    subTopic: 'HTTP',
    difficulty: 'Easy',
    explanation: 'The 404 Not Found client error response code indicates that the server cannot find the requested resource.'
  }
];

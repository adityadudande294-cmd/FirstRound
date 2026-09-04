# Core CS

ID: q_core_cs_001
Q: Which of the following process scheduling algorithms is most likely to cause starvation?
 [ ] A: Round Robin (RR)
 [*] B: Shortest Job First (SJF)
 [ ] C: First-Come, First-Served (FCFS)
 [ ] D: Multilevel Feedback Queue
Explanation: Shortest Job First (SJF) can lead to starvation if short processes keep arriving, causing a long process to wait indefinitely. Round Robin and Multilevel Feedback Queue have mechanisms to prevent starvation.

ID: q_core_cs_002
Q: In an Operating System, what is the primary purpose of a Translation Lookaside Buffer (TLB)?
 [ ] A: To cache recently used pages from disk
 [*] B: To cache page table entries to speed up virtual-to-physical address translation
 [ ] C: To translate high-level code into machine instructions
 [ ] D: To prevent page faults
Explanation: The TLB is a hardware cache for the page table. It stores recent virtual-to-physical address translations, significantly reducing the time taken to access memory.

ID: q_core_cs_003
Q: Which of the following is NOT a necessary condition for a deadlock to occur?
 [ ] A: Mutual Exclusion
 [ ] B: Hold and Wait
 [*] C: Preemption
 [ ] D: Circular Wait
Explanation: The four necessary conditions for deadlock (Coffman conditions) are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Preemption breaks the condition, preventing deadlock.

ID: q_core_cs_004
Q: What is the phenomenon called when the operating system spends more time paging than executing processes?
 [ ] A: Swapping
 [ ] B: Fragmentation
 [*] C: Thrashing
 [ ] D: Context Switching
Explanation: Thrashing occurs when a system doesn't have enough physical memory for the active working sets of processes, causing the OS to constantly page data in and out of the disk.

ID: q_core_cs_005
Q: Which layer of the OSI model is responsible for logical addressing and routing?
 [ ] A: Data Link Layer
 [*] B: Network Layer
 [ ] C: Transport Layer
 [ ] D: Session Layer
Explanation: The Network Layer (Layer 3) is responsible for logical addressing (e.g., IP addresses) and determining the best path (routing) to send packets to their destination.

ID: q_core_cs_006
Q: What is the primary difference between TCP and UDP?
 [ ] A: TCP is connectionless, while UDP is connection-oriented
 [*] B: TCP guarantees delivery and ordering, while UDP does not
 [ ] C: TCP operates at the Network Layer, while UDP operates at the Transport Layer
 [ ] D: UDP is generally slower than TCP due to error checking
Explanation: TCP is connection-oriented and ensures reliable, ordered delivery of data via acknowledgments and retransmissions. UDP is connectionless and faster but does not guarantee delivery.

ID: q_core_cs_007
Q: Which protocol is used to resolve a domain name (e.g., www.example.com) to an IP address?
 [ ] A: ARP
 [ ] B: DHCP
 [*] C: DNS
 [ ] D: ICMP
Explanation: DNS (Domain Name System) translates human-readable domain names into numerical IP addresses needed for routing over the Internet.

ID: q_core_cs_008
Q: In the context of database transactions, what does the 'I' in ACID stand for?
 [ ] A: Integrity
 [*] B: Isolation
 [ ] C: Idempotency
 [ ] D: Independence
Explanation: ACID stands for Atomicity, Consistency, Isolation, and Durability. Isolation ensures that concurrent transactions execute independently without interfering with each other.

ID: q_core_cs_009
Q: A database table is in Second Normal Form (2NF) if it is in 1NF and:
 [ ] A: It has no transitive dependencies
 [*] B: It has no partial dependencies
 [ ] C: All non-key attributes depend on another non-key attribute
 [ ] D: Every determinant is a candidate key
Explanation: For a table to be in 2NF, it must be in 1NF and all non-key attributes must be fully functionally dependent on the entire primary key (i.e., no partial dependencies).

ID: q_core_cs_010
Q: Which data structure is most commonly used to implement a database index?
 [ ] A: Hash Table
 [*] B: B-Tree or B+ Tree
 [ ] C: Linked List
 [ ] D: Stack
Explanation: B-Trees and B+ Trees are self-balancing search trees commonly used for database indexes because they allow for efficient insertions, deletions, and sequential traversals stored on disk.

ID: q_core_cs_011
Q: Which Object-Oriented Programming (OOP) principle refers to hiding the internal state of an object and requiring all interaction to be performed through an object's methods?
 [ ] A: Inheritance
 [ ] B: Polymorphism
 [*] C: Encapsulation
 [ ] D: Abstraction
Explanation: Encapsulation is the bundling of data and the methods that operate on that data into a single unit (class), while restricting direct access to some of the object's components.

ID: q_core_cs_012
Q: In OOP, Method Overriding is an example of which type of polymorphism?
 [ ] A: Compile-time polymorphism
 [*] B: Run-time polymorphism
 [ ] C: Parametric polymorphism
 [ ] D: Ad-hoc polymorphism
Explanation: Method overriding (dynamic method dispatch) is an example of run-time polymorphism because the call to an overridden method is resolved at run-time, rather than compile-time.

ID: q_core_cs_013
Q: What is a Singleton design pattern?
 [ ] A: A pattern that creates multiple instances of a class for concurrency
 [*] B: A pattern that restricts the instantiation of a class to one single instance
 [ ] C: A pattern used to inherit from multiple parent classes
 [ ] D: A pattern that provides a surrogate or placeholder for another object
Explanation: The Singleton pattern ensures that a class has only one instance and provides a global point of access to it.

ID: q_core_cs_014
Q: Which of the following is true about a process and a thread?
 [ ] A: A process is lightweight, whereas a thread is heavy-weight
 [*] B: Threads share the same memory space of their parent process
 [ ] C: Processes share the same memory space by default
 [ ] D: Context switching between processes is faster than between threads
Explanation: Threads within the same process share the same memory address space (data, heap, code), whereas processes have separate, independent memory spaces.

ID: q_core_cs_015
Q: In computer architecture, what is the purpose of pipeline hazards?
 [ ] A: They are techniques to speed up execution
 [*] B: They are conditions that prevent the next instruction from executing in its designated clock cycle
 [ ] C: They refer to physical damage to the CPU cache
 [ ] D: They are mechanisms to prevent memory leaks
Explanation: Pipeline hazards (structural, data, and control) are situations in pipelining where the next instruction cannot execute in the following clock cycle, causing pipeline stalls.

ID: q_core_cs_016
Q: What is the role of the 'Subnet Mask' in an IP network?
 [ ] A: To encrypt data packets
 [*] B: To distinguish the network portion from the host portion of an IP address
 [ ] C: To assign IP addresses automatically
 [ ] D: To route traffic between different autonomous systems
Explanation: A subnet mask is used to divide an IP address into two parts: the network address (used for routing) and the host address (identifying the specific device).

ID: q_core_cs_017
Q: Which synchronization primitive is an integer variable that, apart from initialization, is accessed only through two standard atomic operations: wait() and signal()?
 [ ] A: Mutex
 [ ] B: Monitor
 [*] C: Semaphore
 [ ] D: Spinlock
Explanation: A semaphore is a signaling mechanism using an integer variable accessed via atomic wait (P) and signal (V) operations, invented by Edsger Dijkstra.

ID: q_core_cs_018
Q: In a relational database, what does a 'Foreign Key' do?
 [ ] A: It uniquely identifies each record in a table
 [ ] B: It encrypts the column data
 [*] C: It establishes a link between the data in two tables
 [ ] D: It speeds up query execution
Explanation: A foreign key is a column or group of columns in a relational database table that provides a link between data in two tables, enforcing referential integrity.

ID: q_core_cs_019
Q: Which HTTP method is defined as idempotent?
 [ ] A: POST
 [*] B: PUT
 [ ] C: PATCH
 [ ] D: None of the above
Explanation: An idempotent HTTP method (like GET, PUT, DELETE) means that making multiple identical requests has the same effect as making a single request. POST is not idempotent.

ID: q_core_cs_020
Q: What is the function of the ARP protocol?
 [*] A: To map an IP address to a MAC address
 [ ] B: To map a MAC address to an IP address
 [ ] C: To route packets across the internet
 [ ] D: To assign IP addresses to devices dynamically
Explanation: The Address Resolution Protocol (ARP) is used to map a known logical (IP) address to an unknown physical (MAC) address on a local network.

ID: q_core_cs_021
Q: What does 'Context Switching' refer to in an OS?
 [ ] A: Switching the CPU from user mode to kernel mode
 [*] B: Storing the state of a process so it can be resumed later and loading the state of a new process
 [ ] C: Moving a process from main memory to disk
 [ ] D: Terminating a child process
Explanation: Context switching is the process of storing the state (context) of the currently running process and restoring the state of the next process to be executed by the CPU.

ID: q_core_cs_022
Q: Which cache mapping technique allows a block of memory to be placed in any cache line?
 [ ] A: Direct Mapping
 [ ] B: Set-Associative Mapping
 [*] C: Fully Associative Mapping
 [ ] D: Segmented Mapping
Explanation: In Fully Associative cache mapping, any block in main memory can be mapped to any line in the cache, offering the lowest miss rate but requiring expensive hardware.

ID: q_core_cs_023
Q: In OOP, what is an Abstract Class?
 [ ] A: A class that contains only static methods
 [*] B: A class that cannot be instantiated and usually contains at least one abstract method
 [ ] C: A class that is hidden from other packages
 [ ] D: A class used strictly for testing
Explanation: An abstract class cannot be instantiated on its own and is designed to be subclassed. It often contains abstract methods that derived classes must implement.

ID: q_core_cs_024
Q: What is a 'Dirty Read' in database concurrency?
 [*] A: Reading data that has been modified by an uncommitted transaction
 [ ] B: Reading the same row twice and getting different results
 [ ] C: Reading a row that has been deleted by a committed transaction
 [ ] D: Reading data from a corrupted sector on the disk
Explanation: A dirty read occurs when a transaction reads data written by a concurrent uncommitted transaction. If the other transaction rolls back, the read data becomes invalid.

ID: q_core_cs_025
Q: What is the purpose of the Factory Method design pattern?
 [ ] A: To ensure a class has only one instance
 [*] B: To create objects without specifying the exact class of object that will be created
 [ ] C: To attach additional responsibilities to an object dynamically
 [ ] D: To notify multiple objects when state changes
Explanation: The Factory Method pattern defines an interface for creating an object, but lets subclasses decide which class to instantiate. It defers instantiation to subclasses.

ID: q_core_cs_026
Q: Which algorithm is commonly used to avoid Deadlocks in an Operating System by predicting resource allocation?
 [ ] A: Round Robin
 [ ] B: Peterson's Algorithm
 [*] C: Banker's Algorithm
 [ ] D: Dekker's Algorithm
Explanation: The Banker's Algorithm is a resource allocation and deadlock avoidance algorithm that simulates allocation and checks for safe states before granting resources.

ID: q_core_cs_027
Q: In the TCP/IP model, which protocol operates at the Application layer?
 [ ] A: IP
 [ ] B: TCP
 [*] C: FTP
 [ ] D: Ethernet
Explanation: FTP (File Transfer Protocol) operates at the Application layer of the TCP/IP model. IP is at the Internet layer, TCP is Transport, and Ethernet is Link layer.

ID: q_core_cs_028
Q: What does the CAP theorem state regarding distributed systems?
 [*] A: A system can only provide two of: Consistency, Availability, Partition tolerance
 [ ] B: Concurrency Always Prevents Consistency
 [ ] C: A system must be Centralized, Available, and Persistent
 [ ] D: Compute, Availability, and Performance are directly proportional
Explanation: The CAP theorem states that it is impossible for a distributed data store to simultaneously provide more than two out of the following three guarantees: Consistency, Availability, and Partition tolerance.

ID: q_core_cs_029
Q: What is a Page Fault?
 [ ] A: An error in the HTML of a webpage
 [*] B: When a program tries to access a page that is mapped in address space but not loaded in physical memory
 [ ] C: When a process writes beyond its allocated memory boundary
 [ ] D: A hardware error in the RAM module
Explanation: A page fault is an exception that the memory management unit (MMU) raises when a process accesses a memory page without proper preparations, usually because it is currently on disk (swapped out).

ID: q_core_cs_030
Q: Which network topology requires every device to be connected to a central hub or switch?
 [ ] A: Ring Topology
 [ ] B: Bus Topology
 [*] C: Star Topology
 [ ] D: Mesh Topology
Explanation: In a Star Topology, all nodes are individually connected to a central connection point, like a hub or a switch.

ID: q_core_cs_031
Q: In DBMS, what is the primary purpose of a JOIN clause?
 [*] A: To combine rows from two or more tables based on a related column between them
 [ ] B: To delete overlapping data from multiple tables
 [ ] C: To index a table for faster search
 [ ] D: To enforce a primary key constraint
Explanation: A JOIN clause is used to combine rows from two or more tables, based on a related column between them, allowing queries across normalized tables.

ID: q_core_cs_032
Q: Which CPU register holds the address of the next instruction to be executed?
 [ ] A: Instruction Register (IR)
 [*] B: Program Counter (PC)
 [ ] C: Accumulator
 [ ] D: Stack Pointer (SP)
Explanation: The Program Counter (PC) is a special-purpose register that keeps track of the memory address of the next instruction to be executed.

ID: q_core_cs_033
Q: What is 'Thick Client' vs 'Thin Client' in system architecture?
 [*] A: Thick clients perform bulk of data processing locally, while Thin clients rely heavily on a server
 [ ] B: Thick clients have larger physical dimensions
 [ ] C: Thin clients do not have an operating system installed
 [ ] D: Thick clients require fiber optic connections
Explanation: A thick client processes most of its data locally and can function offline, whereas a thin client acts primarily as a terminal relying on the server for computation.

ID: q_core_cs_034
Q: In OOP, what is 'Composition'?
 [ ] A: Combining multiple classes into a single file
 [*] B: A "has-a" relationship where an object is made up of one or more other objects
 [ ] C: Inheriting from multiple parent classes
 [ ] D: Overloading a method with different signatures
Explanation: Composition models a "has-a" relationship, meaning a complex class is constructed from smaller, simpler classes. It is often preferred over inheritance ("is-a").

ID: q_core_cs_035
Q: Which HTTP status code signifies that the resource was not found?
 [ ] A: 200
 [ ] B: 301
 [ ] C: 403
 [*] D: 404
Explanation: The 404 Not Found client error response code indicates that the server cannot find the requested resource.

# DSA

ID: q_dsa_001
Q: What is the time complexity of finding an element in a balanced Binary Search Tree (BST)?
 [ ] A: O(1)
 [*] B: O(log n)
 [ ] C: O(n)
 [ ] D: O(n log n)
Explanation: In a balanced BST, each step down the tree halves the search space, leading to a logarithmic time complexity O(log n).

ID: q_dsa_002
Q: Which sorting algorithm has the best average-case time complexity?
 [ ] A: Bubble Sort
 [ ] B: Insertion Sort
 [*] C: Merge Sort
 [ ] D: Selection Sort
Explanation: Merge Sort consistently divides the array in half and merges sorted halves, guaranteeing an O(n log n) time complexity in all cases.

ID: q_dsa_003
Q: In a Hash Table, what is a collision?
 [*] A: When two different keys map to the same hash value (index).
 [ ] B: When the hash table runs out of memory.
 [ ] C: When a key is deleted while being read.
 [ ] D: When a hash function returns a negative index.
Explanation: A collision occurs when a hash function maps two distinct keys to the same bucket or index in the hash table array.

ID: q_dsa_004
Q: Which data structure is typically used to implement Breadth-First Search (BFS) on a graph?
 [ ] A: Stack
 [*] B: Queue
 [ ] C: Priority Queue
 [ ] D: Linked List
Explanation: BFS explores the neighbor nodes first, level by level. A Queue (FIFO structure) is perfect for keeping track of the next nodes to visit.

ID: q_dsa_005
Q: What is the worst-case time complexity of Quick Sort?
 [ ] A: O(n)
 [ ] B: O(n log n)
 [*] C: O(n^2)
 [ ] D: O(2^n)
Explanation: Quick Sort degrades to O(n^2) when the pivot selected is consistently the smallest or largest element (e.g., when the array is already sorted and the pivot is the first/last element).

ID: q_dsa_006
Q: Which algorithmic paradigm is Dijkstra's Shortest Path algorithm based on?
 [ ] A: Divide and Conquer
 [ ] B: Dynamic Programming
 [*] C: Greedy
 [ ] D: Backtracking
Explanation: Dijkstra's algorithm is a greedy algorithm because it always selects the unvisited node with the smallest known distance from the starting node.

ID: q_dsa_007
Q: What characterizes Dynamic Programming (DP)?
 [ ] A: It solves problems by making locally optimal choices at each step.
 [*] B: It solves overlapping subproblems and uses memoization or tabulation to store their results.
 [ ] C: It explores all possible configurations recursively and abandons invalid ones.
 [ ] D: It splits the array into two halves, solves them, and merges the results.
Explanation: DP is characterized by overlapping subproblems and optimal substructure. It optimizes recursion by caching the results of subproblems (memoization/tabulation).

ID: q_dsa_008
Q: How is a Priority Queue typically implemented to guarantee O(log n) insertions and extractions?
 [ ] A: Sorted Array
 [ ] B: Unsorted Linked List
 [*] C: Binary Heap
 [ ] D: Hash Table
Explanation: A Binary Heap allows O(log n) insertion and extraction of the max/min element, while O(1) time is needed to simply peek at the top element.

ID: q_dsa_009
Q: What is the time complexity of deleting a node from a singly linked list if you only have a pointer to the head node?
 [ ] A: O(1)
 [ ] B: O(log n)
 [*] C: O(n)
 [ ] D: O(n^2)
Explanation: To delete a specific node, you must traverse the list from the head to find the node and update its predecessor's pointer, taking O(n) time in the worst case.

ID: q_dsa_010
Q: What does the term "Backtracking" refer to?
 [ ] A: Reversing the elements of an array
 [*] B: Systematically searching for a solution to a problem by trying partial solutions and abandoning them if they cannot be completed
 [ ] C: Tracing a program's execution to find bugs
 [ ] D: Traversing a tree from leaves to the root
Explanation: Backtracking is an algorithmic technique for solving problems recursively by trying to build a solution incrementally, removing those solutions that fail to satisfy the constraints.

ID: q_dsa_011
Q: In a bitwise operation, what does `x ^ x` (x XOR x) evaluate to?
 [ ] A: x
 [ ] B: 1
 [*] C: 0
 [ ] D: 2x
Explanation: The XOR operation returns 1 only if the corresponding bits are different. Since `x` is identical to itself, all bits match, resulting in 0.

ID: q_dsa_012
Q: What is a topological sort?
 [ ] A: Sorting an array of geographical coordinates.
 [*] B: A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, vertex u comes before v.
 [ ] C: Sorting a tree based on its height.
 [ ] D: Finding the shortest path in a graph with negative weights.
Explanation: Topological sorting is used to schedule tasks with dependencies. It is only possible on Directed Acyclic Graphs (DAGs).

ID: q_dsa_013
Q: Which operation is O(1) amortized time in a dynamically resizing array (like Python's list or C++ std::vector)?
 [ ] A: Inserting an element at the beginning
 [ ] B: Searching for an element
 [*] C: Appending an element to the end
 [ ] D: Deleting an element from the middle
Explanation: Appending at the end takes O(1) amortized time. Although it takes O(n) occasionally when the underlying array resizes, the average cost per operation over a sequence of inserts remains O(1).

ID: q_dsa_014
Q: What is the purpose of the "slow and fast pointer" technique in a linked list?
 [ ] A: To sort the list
 [*] B: To detect cycles or find the middle of the list
 [ ] C: To traverse the list backwards
 [ ] D: To double the size of the list
Explanation: Floyd's Cycle-Finding Algorithm uses two pointers moving at different speeds. If there is a cycle, they will meet. It is also used to find the midpoint of a list.

ID: q_dsa_015
Q: How many edges does a tree with N nodes have?
 [ ] A: N
 [ ] B: N + 1
 [*] C: N - 1
 [ ] D: log(N)
Explanation: A tree is a connected acyclic graph. By definition, a tree with N nodes must have exactly N - 1 edges.

ID: q_dsa_016
Q: Which traversal visits the root node, then the left subtree, and finally the right subtree?
 [ ] A: Inorder
 [*] B: Preorder
 [ ] C: Postorder
 [ ] D: Level-order
Explanation: In Preorder traversal, the order is Root -> Left -> Right. Inorder is Left -> Root -> Right. Postorder is Left -> Right -> Root.

ID: q_dsa_017
Q: What does the bitwise expression `x & (x - 1)` do?
 [*] A: Turns off the rightmost 1-bit in x
 [ ] B: Turns on the rightmost 0-bit in x
 [ ] C: Multiplies x by 2
 [ ] D: Checks if x is negative
Explanation: Subtracting 1 from `x` flips all bits up to the rightmost 1-bit (including the 1-bit itself). Performing a bitwise AND with `x` clears that lowest set bit.

ID: q_dsa_018
Q: In a string searching context, what is the advantage of the Knuth-Morris-Pratt (KMP) algorithm over a naive search?
 [ ] A: It requires O(1) auxiliary space.
 [*] B: It avoids re-evaluating characters in the text that have already been matched.
 [ ] C: It hashes the pattern to compare integers instead of strings.
 [ ] D: It starts searching from the end of the pattern.
Explanation: KMP precomputes an LPS (Longest Prefix Suffix) array to skip unnecessary character comparisons, achieving O(N+M) time complexity.

ID: q_dsa_019
Q: What is the space complexity of solving the Longest Common Subsequence (LCS) problem using a standard 2D DP table?
 [ ] A: O(1)
 [ ] B: O(N)
 [*] C: O(N * M)
 [ ] D: O(N + M)
Explanation: A standard tabulation approach for LCS uses a 2D array of dimensions (N+1) x (M+1), resulting in O(N * M) space complexity.

ID: q_dsa_020
Q: When finding the shortest path in an unweighted graph, which algorithm is optimal?
 [ ] A: Dijkstra's Algorithm
 [ ] B: Bellman-Ford Algorithm
 [ ] C: Depth-First Search (DFS)
 [*] D: Breadth-First Search (BFS)
Explanation: BFS inherently explores an unweighted graph layer by layer, ensuring that the first time a node is visited, it has been reached via the shortest path.

ID: q_dsa_021
Q: What is a Trie data structure primarily used for?
 [ ] A: Balancing binary search trees
 [*] B: Efficiently storing and retrieving keys that are strings (prefix matching)
 [ ] C: Finding the shortest path in a graph
 [ ] D: Implementing a priority queue
Explanation: A Trie (prefix tree) is a tree-like data structure that is particularly efficient for storing dictionaries, supporting autocomplete, and prefix-matching operations.

ID: q_dsa_022
Q: In algorithm analysis, what does Big-O notation formally describe?
 [ ] A: The exact running time of an algorithm in seconds
 [*] B: An asymptotic upper bound on the time or space complexity of an algorithm
 [ ] C: The minimum memory required to run the algorithm
 [ ] D: The average-case performance
Explanation: Big-O notation describes the worst-case scenario (upper bound) of the growth rate of a function as its input size approaches infinity.

ID: q_dsa_023
Q: Which graph algorithm can handle negative edge weights (provided there are no negative weight cycles)?
 [ ] A: Dijkstra's Algorithm
 [ ] B: Prim's Algorithm
 [*] C: Bellman-Ford Algorithm
 [ ] D: Kruskal's Algorithm
Explanation: Bellman-Ford computes shortest paths from a single source vertex to all other vertices. Unlike Dijkstra's algorithm, it correctly handles graphs with negative edge weights.

ID: q_dsa_024
Q: What is a "Monotonic Stack"?
 [ ] A: A stack that only holds one data type.
 [*] B: A stack whose elements are strictly increasing or strictly decreasing.
 [ ] C: A stack implemented using a linked list instead of an array.
 [ ] D: A stack that limits its size to a predefined number.
Explanation: A Monotonic Stack maintains its elements in a sorted order (increasing or decreasing). It is highly useful for problems like finding the "next greater element".

ID: q_dsa_025
Q: Which data structure is best for detecting whether parentheses in a string are balanced?
 [ ] A: Queue
 [*] B: Stack
 [ ] C: Array
 [ ] D: Hash Map
Explanation: A Stack is ideal for tracking open parentheses. As you iterate through the string, you push open brackets and pop when you encounter a matching closing bracket.

ID: q_dsa_026 (CODING)
Title: Two Sum
Problem: Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nReturn the answer as an array of two integers.

ID: q_dsa_027 (CODING)
Title: Reverse Linked List
Problem: Given the head of a singly linked list, reverse the list, and return the reversed list. (Assume the input is provided as an array and you must return an array representing the reversed sequence).

ID: q_dsa_028 (CODING)
Title: Longest Substring Without Repeating Characters
Problem: Given a string `s`, find the length of the longest substring without repeating characters.

ID: q_dsa_029 (CODING)
Title: Merge Two Sorted Lists
Problem: You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. The only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

ID: q_dsa_030 (CODING)
Title: Maximum Depth of Binary Tree
Problem: Given the root of a binary tree (represented as an array where `null` represents a missing node), return the maximum depth of the tree.

# Mock

ID: q_coding_mock_mcq_001
Q: What is the space complexity of an in-place algorithm that reverses an array of size N?
 [ ] A: O(N)
 [*] B: O(1)
 [ ] C: O(log N)
 [ ] D: O(N^2)
Explanation: In-place algorithms modify the input structure directly without using extra auxiliary memory proportional to the input size, so their space complexity is O(1).

ID: q_coding_mock_mcq_002
Q: Which of the following data structures operates on a Last-In, First-Out (LIFO) basis?
 [ ] A: Queue
 [*] B: Stack
 [ ] C: Linked List
 [ ] D: Heap
Explanation: A stack is a linear data structure that operates on a LIFO (Last-In, First-Out) basis, where the last element inserted is the first one to be removed.

ID: q_coding_mock_mcq_003
Q: What is the average time complexity for searching an element in a balanced Binary Search Tree (BST)?
 [ ] A: O(1)
 [ ] B: O(N)
 [*] C: O(log N)
 [ ] D: O(N log N)
Explanation: Searching in a balanced BST halves the search space at each step, resulting in a time complexity of O(log N).

ID: q_coding_mock_mcq_004
Q: In time complexity analysis, what does O(2^N) represent?
 [ ] A: Logarithmic time
 [ ] B: Quadratic time
 [*] C: Exponential time
 [ ] D: Linear time
Explanation: O(2^N) denotes exponential time complexity, where the operations double with each increase in the input size N.

ID: q_coding_mock_mcq_005
Q: What is a common symptom of an "off-by-one" error in programming loop conditions?
 [ ] A: Infinite compile-time recursion
 [*] B: Memory access violation due to accessing index N in an array of size N
 [ ] C: Integer overflow on the loop variable
 [ ] D: The loop condition always returning false immediately
Explanation: An off-by-one error often results in loops running one time too many, leading to access of index N in an array of size N (which only has indexes 0 to N-1).

ID: q_coding_mock_mcq_006
Q: Which Object-Oriented Programming concept describes the ability of different classes to respond to the same message in unique ways?
 [ ] A: Inheritance
 [ ] B: Encapsulation
 [*] C: Polymorphism
 [ ] D: Abstraction
Explanation: Polymorphism allows objects of different classes to be treated as objects of a common superclass, responding differently to the same method call.

ID: q_coding_mock_mcq_007
Q: Which SQL clause is used to filter records after an aggregate function has been applied to grouped rows?
 [ ] A: WHERE
 [*] B: HAVING
 [ ] C: GROUP BY
 [ ] D: ORDER BY
Explanation: The HAVING clause filters groups created by the GROUP BY clause, whereas the WHERE clause filters individual rows before grouping.

ID: q_coding_mock_mcq_008
Q: Which component of an Operating System is responsible for scheduling processes and CPU time allocation?
 [*] A: Kernel
 [ ] B: Shell
 [ ] C: File System
 [ ] D: Bootloader
Explanation: The kernel is the core component of the operating system that performs system resource management, process scheduling, and hardware coordination.

ID: q_coding_mock_mcq_009
Q: In static scoped programming languages, from where does a nested function resolve its variables?
 [*] A: The lexical block where the function was declared
 [ ] B: The call stack context where the function is executed
 [ ] C: The global window object exclusively
 [ ] D: The most recently active execution scope frame
Explanation: Lexical (static) scoping resolves variable references based on the location of the function definition in the source code, rather than its call stack context.

ID: q_coding_mock_mcq_010
Q: Which data structure is most suitable for implementing a Breadth-First Search (BFS) on a graph?
 [ ] A: Stack
 [*] B: Queue
 [ ] C: Priority Queue
 [ ] D: Binary Tree
Explanation: A queue (FIFO) is standard for BFS traversal to process vertices in the order they are discovered.

ID: q_coding_mock_mcq_011
Q: What is the primary feature of a Greedy algorithm?
 [ ] A: It searches all possible combinations globally.
 [*] B: It makes the locally optimal choice at each step hoping to find a global optimum.
 [ ] C: It memoizes intermediate state results in a table.
 [ ] D: It dynamically backtracks to alternative branch paths.
Explanation: Greedy algorithms make locally optimal choices at each stage in the hope of finding a global optimum.

ID: q_coding_mock_mcq_012
Q: What is the time complexity of merging two sorted arrays of size M and N into a single sorted array?
 [ ] A: O(M * N)
 [ ] B: O(M log N)
 [*] C: O(M + N)
 [ ] D: O(log(M + N))
Explanation: Merging two sorted arrays requires iterating through both arrays once using two pointers, taking O(M + N) time.

ID: q_coding_mock_mcq_013
Q: In software development, what does a debugger breakpoint do?
 [ ] A: It terminates the program immediately and deletes files.
 [*] B: It pauses code execution at a specific line to allow inspection of variables.
 [ ] C: It increases compiler speed by skipping lines.
 [ ] D: It changes the value of local parameters automatically.
Explanation: Breakpoints tell the debugger to temporarily suspend code execution at a designated instruction, allowing the developer to examine execution state.

ID: q_coding_mock_mcq_014
Q: What is the main benefit of encapsulation in Object-Oriented Programming?
 [ ] A: Allowing multiple inheritance in single class files
 [*] B: Restricting direct access to an object's state and bundling behavior with data
 [ ] C: Allowing functions to accept multiple signatures
 [ ] D: Eliminating memory usage of class definitions
Explanation: Encapsulation restricts direct user access to internal object representation, hiding state details and forcing interaction via public methods.

ID: q_coding_mock_mcq_015
Q: What does the ACID property "Isolation" guarantee in Database Transactions?
 [ ] A: A transaction will run completely or not at all.
 [*] B: Concurrent transactions execute without interfering with each other.
 [ ] C: Database states survive server power outages.
 [ ] D: Data constraints remain valid throughout execution.
Explanation: Isolation ensures that the execution of concurrent transactions yields the same database state as if they were executed sequentially.

ID: q_coding_mock_mcq_016
Q: Which network layer in the OSI model is responsible for packet routing, forwarding, and addressing?
 [ ] A: Transport Layer
 [ ] B: Data Link Layer
 [*] C: Network Layer
 [ ] D: Session Layer
Explanation: The Network Layer handles packet routing, logical addressing (IP), and traffic control path selection.

ID: q_coding_mock_mcq_017
Q: Which parameter passing method copies the memory address of the actual argument into the formal parameter?
 [ ] A: Pass by value
 [*] B: Pass by reference
 [ ] C: Pass by copy-restore
 [ ] D: Pass by name
Explanation: Pass by reference passes a reference (address) to the actual variable, meaning changes made inside the function affect the original argument.

ID: q_coding_mock_mcq_018
Q: Which tree traversal visits the root node first, followed by the left subtree and then the right subtree?
 [ ] A: In-order
 [*] B: Pre-order
 [ ] C: Post-order
 [ ] D: Level-order
Explanation: Pre-order traversal visits the current node (Root) first, then traverses the Left subtree, and finally the Right subtree.

ID: q_coding_mock_mcq_019
Q: What is the time complexity of the Binary Search algorithm on a sorted list of N elements?
 [ ] A: O(N)
 [*] B: O(log N)
 [ ] C: O(N^2)
 [ ] D: O(1)
Explanation: Binary Search repeatedly cuts the search interval in half, resulting in a logarithmic time complexity of O(log N).

ID: q_coding_mock_mcq_020
Q: What does the space complexity O(N) represent in dynamic arrays?
 [*] A: Memory consumption increases linearly with input size N.
 [ ] B: Memory consumption is constant regardless of input size N.
 [ ] C: Memory consumption grows exponentially with input size N.
 [ ] D: Memory consumption decreases with input size N.
Explanation: Space complexity O(N) means the memory required by the program grows linearly in proportion to the input size N.

ID: q_coding_mock_code_001 (CODING)
Title: You are given a string of words separated by spaces.
Write a program that reads the string from standard input (stdin) and outputs the string with its words reversed in order.
Words must be separated by a single space, and there should be no leading or trailing spaces.
Problem: Reverse words in a string.

ID: q_coding_mock_code_002 (CODING)
Title: Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.
Write a program that reads the string from standard input (stdin) and outputs 'true' if it is a palindrome, else 'false'.
Problem: Find the missing number.

ID: q_coding_mock_code_003 (CODING)
Title: Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
Write a program that processes operation instructions from standard input (stdin) and outputs the results of 'top' and 'getMin' operations on separate lines.
Operation commands:
- push X: push element X onto stack
- pop: remove the top element
- top: print the top element
- getMin: print the minimum element in the stack
Problem: Check if a string is a palindrome.

ID: q_coding_mock_code_004 (CODING)
Title: An integer array nums is sorted in ascending order (with distinct values).
Prior to being passed to your function, nums is possibly rotated at an unknown pivot index.
Given the array nums after the possible rotation and an integer target, write a program that reads input from standard input (stdin) and outputs the index of target if it is in nums, or -1 if it is not in nums.
Problem: Sort an array of integers.

ID: q_coding_mock_code_005 (CODING)
Title: You are climbing a staircase. It takes N steps to reach the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
Write a program that reads N from standard input (stdin) and prints the distinct ways to standard output (stdout).
Problem: Find the first non-repeating character.

# Output

ID: q_code_out_001
Q: What is the output of the following JavaScript code?\n```javascript\nconsole.log(typeof null);\n```
 [ ] A: "null"
 [*] B: "object"
 [ ] C: "undefined"
 [ ] D: Throws an error
Explanation: In JavaScript, typeof null returns "object". This is a well-known historical bug in ECMAScript that cannot be fixed without breaking existing code.

ID: q_code_out_002
Q: What will the following Python code print?\n```python\ndef add_to_list(val, my_list=[]):\n    my_list.append(val)\n    return my_list\n\nprint(add_to_list(1))\nprint(add_to_list(2))\n```
 [ ] A: [1]\n[2]
 [*] B: [1]\n[1, 2]
 [ ] C: Throws a TypeError
 [ ] D: [1, 2]\n[1, 2]
Explanation: In Python, default arguments are evaluated only once at function definition time. Therefore, the same list object is used across multiple calls, resulting in [1] then [1, 2].

ID: q_code_out_003
Q: What does this JavaScript code log?\n```javascript\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}\n```
 [ ] A: 0 1 2
 [ ] B: 1 2 3
 [*] C: 3 3 3
 [ ] D: undefined undefined undefined
Explanation: Because `var` is function-scoped (or globally scoped here) and not block-scoped, by the time the setTimeout callbacks run, the loop has finished and `i` is 3.

ID: q_code_out_004
Q: Identify the bug in this Python snippet:\n```python\nmy_dict = {[1, 2]: "numbers"}\n```
 [ ] A: SyntaxError: invalid syntax
 [*] B: TypeError: unhashable type: 'list'
 [ ] C: KeyError: [1, 2]
 [ ] D: There is no bug, it works fine.
Explanation: Dictionary keys in Python must be immutable (hashable). A list is mutable, so it cannot be used as a dictionary key, resulting in a TypeError.

ID: q_code_out_005
Q: What does the following JavaScript code output?\n```javascript\nconsole.log([] == ![]);\n```
 [*] A: true
 [ ] B: false
 [ ] C: TypeError
 [ ] D: undefined
Explanation: `![]` evaluates to `false`. The comparison becomes `[] == false`. `[]` is coerced to an empty string `""`, and `false` is coerced to `0`. `""` is coerced to `0`, so `0 == 0` is true.

ID: q_code_out_006
Q: What is the output of this Python code?\n```python\nx = 10\ndef foo():\n    x += 1\n    print(x)\nfoo()\n```
 [ ] A: 11
 [ ] B: 10
 [*] C: UnboundLocalError
 [ ] D: NameError
Explanation: Python assumes any variable assigned within a function is local. Since `x` is incremented (which involves reading its value first) before being locally assigned, it throws an UnboundLocalError.

ID: q_code_out_007
Q: What does this C++ snippet output?\n```cpp\nint x = 5;\nint y = ++x * x++;\nstd::cout << y;\n```
 [ ] A: 30
 [ ] B: 36
 [ ] C: 42
 [*] D: Undefined Behavior
Explanation: Modifying a variable multiple times without an intervening sequence point leads to Undefined Behavior in C++ (prior to C++17, and heavily compiler dependent even now).

ID: q_code_out_008
Q: What is the output in JavaScript?\n```javascript\nconsole.log(0.1 + 0.2 === 0.3);\n```
 [ ] A: true
 [*] B: false
 [ ] C: SyntaxError
 [ ] D: undefined
Explanation: Due to IEEE 754 floating-point arithmetic precision limitations, 0.1 + 0.2 results in 0.30000000000000004, which does not strictly equal 0.3.

ID: q_code_out_009
Q: Analyze this Java code:\n```java\nString s1 = "hello";\nString s2 = new String("hello");\nSystem.out.println(s1 == s2);\n```
 [ ] A: true
 [*] B: false
 [ ] C: Compilation Error
 [ ] D: NullPointerException
Explanation: The `==` operator checks for reference equality. `s1` points to the string pool, while `s2` points to a new object created on the heap. Thus, they are not the same reference.

ID: q_code_out_010
Q: What is the output of this Python code?\n```python\nprint(bool("False"))\n```
 [*] A: True
 [ ] B: False
 [ ] C: TypeError
 [ ] D: None
Explanation: Any non-empty string in Python evaluates to True when converted to a boolean, regardless of its content.

ID: q_code_out_011
Q: What will be logged in JavaScript?\n```javascript\nlet a = { x: 1 };\nlet b = a;\nb.x = 2;\nconsole.log(a.x);\n```
 [ ] A: 1
 [*] B: 2
 [ ] C: undefined
 [ ] D: Throws an error
Explanation: Objects in JavaScript are passed by reference. Variables `a` and `b` point to the same object in memory, so mutating `b` mutates `a`.

ID: q_code_out_012
Q: Identify the potential runtime error in this C loop:\n```c\nint arr[5] = {1, 2, 3, 4, 5};\nfor (int i = 1; i <= 5; i++) {\n    printf("%d", arr[i]);\n}\n```
 [ ] A: Syntax Error on loop declaration
 [*] B: Buffer Overflow / Out-of-bounds access
 [ ] C: Infinite Loop
 [ ] D: No error, it prints 12345
Explanation: Arrays in C are 0-indexed. The loop accesses `arr[5]`, which is outside the bounds of the array (valid indices are 0 to 4), leading to undefined behavior / buffer overflow.

ID: q_code_out_013
Q: What is the result of this Python expression?\n```python\n[1, 2, 3] * 2\n```
 [ ] A: [2, 4, 6]
 [*] B: [1, 2, 3, 1, 2, 3]
 [ ] C: TypeError
 [ ] D: [[1, 2, 3], [1, 2, 3]]
Explanation: Multiplying a list by an integer `n` in Python creates a new list with the elements of the original list repeated `n` times.

ID: q_code_out_014
Q: What does this JavaScript code evaluate to?\n```javascript\ntypeof (()=>{})\n```
 [ ] A: "object"
 [*] B: "function"
 [ ] C: "undefined"
 [ ] D: SyntaxError
Explanation: The expression evaluates an arrow function, which is technically a Function object. In JS, `typeof` for functions returns `"function"`.

ID: q_code_out_015
Q: Consider this recursive function. What is `f(3)`?\n```python\ndef f(n):\n    if n <= 1: return 1\n    return n + f(n-1)\n```
 [ ] A: 3
 [ ] B: 4
 [ ] C: 5
 [*] D: 6
Explanation: Tracing: f(3) = 3 + f(2). f(2) = 2 + f(1). f(1) = 1. So f(3) = 3 + 2 + 1 = 6.

ID: q_code_out_016
Q: What does this JS code output?\n```javascript\nconsole.log(1 < 2 < 3);\nconsole.log(3 > 2 > 1);\n```
 [ ] A: true\ntrue
 [ ] B: false\nfalse
 [*] C: true\nfalse
 [ ] D: false\ntrue
Explanation: `1 < 2` is `true`, then `true < 3` coerces `true` to 1, so `1 < 3` is `true`. `3 > 2` is `true`, then `true > 1` coerces `true` to 1, so `1 > 1` is `false`.

ID: q_code_out_017
Q: What happens when this Java snippet executes?\n```java\nint x = 0;\nint y = 10 / x;\nSystem.out.println(y);\n```
 [ ] A: Outputs 0
 [ ] B: Outputs Infinity
 [*] C: Throws ArithmeticException
 [ ] D: Compilation Error
Explanation: Dividing an integer by zero in Java at runtime throws a `java.lang.ArithmeticException: / by zero`.

ID: q_code_out_018
Q: What is the output of this Python list comprehension?\n```python\nprint([x for x in range(5) if x % 2 == 0])\n```
 [ ] A: [0, 1, 2, 3, 4]
 [ ] B: [1, 3]
 [*] C: [0, 2, 4]
 [ ] D: [2, 4]
Explanation: The loop goes from 0 to 4. The condition `x % 2 == 0` filters for even numbers. 0, 2, and 4 are even.

ID: q_code_out_019
Q: What does this JavaScript code log?\n```javascript\nconst obj = { a: 1 };\nObject.freeze(obj);\nobj.a = 2;\nconsole.log(obj.a);\n```
 [*] A: 1
 [ ] B: 2
 [ ] C: TypeError
 [ ] D: undefined
Explanation: `Object.freeze()` makes the object immutable. In non-strict mode, reassigning a frozen property fails silently, so the property remains 1.

ID: q_code_out_020
Q: What is the output in Python?\n```python\nx = (1, 2, [3, 4])\nx[2].append(5)\nprint(x)\n```
 [ ] A: TypeError: 'tuple' object does not support item assignment
 [*] B: (1, 2, [3, 4, 5])
 [ ] C: (1, 2, [3, 4])
 [ ] D: SyntaxError
Explanation: While tuples are immutable, the list *inside* the tuple is mutable. Appending to the list modifies the list in place without changing the tuple's reference to it.

# Prog

ID: q_prog_fund_001
Q: Which of the following data types is typically used to represent a true or false value?
 [ ] A: Integer
 [ ] B: Float
 [*] C: Boolean
 [ ] D: String
Explanation: A Boolean data type has only two possible values: true or false.

ID: q_prog_fund_002
Q: What does the modulo operator (`%`) return?
 [ ] A: The quotient of division
 [*] B: The remainder of division
 [ ] C: The integer division result
 [ ] D: The exponential result
Explanation: The modulo operator (%) divides one operand by another and returns the remainder. For example, 7 % 3 is 1.

ID: q_prog_fund_003
Q: In an array/list, what is the index of the first element in most programming languages?
 [*] A: 0
 [ ] B: 1
 [ ] C: -1
 [ ] D: Depends on the size of the array
Explanation: In most modern languages (C, Java, Python, JavaScript), arrays are zero-indexed, meaning the first element is at index 0.

ID: q_prog_fund_004
Q: Which control structure is best suited when you know exactly how many times a block of code should run?
 [ ] A: while loop
 [ ] B: do-while loop
 [*] C: for loop
 [ ] D: switch statement
Explanation: A for loop is ideal when the number of iterations is known in advance, as it explicitly defines the initialization, condition, and increment/decrement.

ID: q_prog_fund_005
Q: What is the purpose of a function (or method) in programming?
 [ ] A: To store data permanently
 [*] B: To group a block of code to perform a specific task, promoting reusability
 [ ] C: To define the data types of variables
 [ ] D: To encrypt code
Explanation: Functions allow you to encapsulate a specific piece of logic so it can be executed multiple times without repeating code, keeping programs organized and reusable.

ID: q_prog_fund_006
Q: What does "scope" refer to in programming?
 [ ] A: The size of an array in memory
 [*] B: The region of the code where a variable is defined and can be accessed
 [ ] C: The speed of execution of a program
 [ ] D: The tool used to debug code
Explanation: Scope determines the accessibility (visibility) of variables and functions. A variable defined inside a function (local scope) cannot be accessed from outside that function.

ID: q_prog_fund_007
Q: What is an infinite loop?
 [ ] A: A loop that automatically adjusts its bounds
 [*] B: A loop that never terminates because its exit condition is never met
 [ ] C: A loop used strictly for server connections
 [ ] D: A loop that handles floating point numbers
Explanation: An infinite loop happens when the terminating condition is never satisfied, causing the program to execute the loop block indefinitely.

ID: q_prog_fund_008
Q: What is recursion in programming?
 [*] A: When a function calls itself directly or indirectly
 [ ] B: When two arrays reference each other
 [ ] C: A type of sorting algorithm
 [ ] D: A method for compressing files
Explanation: Recursion occurs when a function calls itself. It must have a base case to stop the recursive calls and prevent a stack overflow.

ID: q_prog_fund_009
Q: What is a "base case" in a recursive function?
 [ ] A: The worst-case time complexity
 [*] B: The condition under which the function stops calling itself
 [ ] C: The starting point of the program execution
 [ ] D: The default block in a switch statement
Explanation: The base case is the terminating condition in a recursive function. Without it, the function would call itself indefinitely.

ID: q_prog_fund_010
Q: Which logical operator returns TRUE only if BOTH operands are TRUE?
 [ ] A: OR (||)
 [ ] B: NOT (!)
 [*] C: AND (&&)
 [ ] D: XOR (^)
Explanation: The logical AND operator requires both conditions to be true in order to evaluate to true overall.

ID: q_prog_fund_011
Q: What is string concatenation?
 [ ] A: Cutting a string into smaller pieces
 [*] B: Combining two or more strings end-to-end to form a new string
 [ ] C: Converting a string to uppercase
 [ ] D: Parsing an integer from a string
Explanation: Concatenation is the operation of joining character strings end-to-end. For example, "Hello" + "World" becomes "HelloWorld".

ID: q_prog_fund_012
Q: Which programming concept involves breaking down a problem into smaller, manageable parts?
 [ ] A: Polymorphism
 [ ] B: Encapsulation
 [*] C: Modular programming / Decomposition
 [ ] D: Garbage collection
Explanation: Decomposition (or modular programming) is the practice of breaking a complex problem into smaller, simpler, and more manageable modules or functions.

ID: q_prog_fund_013
Q: In OOP, what is a "class"?
 [ ] A: A specific item in memory
 [*] B: A blueprint or template for creating objects
 [ ] C: A mathematical function
 [ ] D: A reserved keyword to stop a loop
Explanation: A class is a blueprint that defines the variables and the methods common to all objects of a certain kind.

ID: q_prog_fund_014
Q: Which of the following is true regarding dynamically typed languages (e.g., Python, JavaScript)?
 [ ] A: Variables are bound to types at compile time.
 [ ] B: You must explicitly declare the data type of a variable before using it.
 [*] C: The type of a variable is checked at runtime and can change during execution.
 [ ] D: They generally run faster than statically typed languages.
Explanation: In dynamically typed languages, types are associated with run-time values, and a variable can hold a string at one point and an integer at another.

ID: q_prog_fund_015
Q: What is a Syntax Error?
 [ ] A: An error that occurs when the program attempts an impossible mathematical operation
 [*] B: An error resulting from code that violates the grammatical rules of the programming language
 [ ] C: An error that causes the program to produce incorrect output despite running successfully
 [ ] D: An error caused by a missing file at runtime
Explanation: A syntax error occurs when the code breaks the structural rules of the language (like a missing semicolon or mismatched parentheses). The compiler or interpreter will refuse to execute it.

ID: q_prog_fund_016
Q: What does a compiler do?
 [ ] A: Executes source code line-by-line during runtime.
 [*] B: Translates the entire high-level source code into machine code before execution.
 [ ] C: Formats code to make it readable.
 [ ] D: Searches for logic errors in an algorithm.
Explanation: A compiler translates the entire source code into executable machine code (or intermediate byte code) prior to execution, whereas an interpreter translates it line-by-line on the fly.

ID: q_prog_fund_017
Q: If `x = 5` and `y = 10`, what is the result of `x == y`?
 [ ] A: 5
 [ ] B: 10
 [ ] C: True
 [*] D: False
Explanation: The `==` operator checks for equality. Since 5 is not equal to 10, the expression evaluates to False.

ID: q_prog_fund_018
Q: What is an array?
 [ ] A: A primitive data type holding a single value
 [*] B: A data structure that stores a collection of elements, typically of the same type, sequentially in memory
 [ ] C: A function that repeats a set of instructions
 [ ] D: A keyword used to declare a constant
Explanation: An array is a linear data structure used to store a collection of elements, accessed via indices.

ID: q_prog_fund_019
Q: What is a parameter in the context of functions?
 [ ] A: The return value of the function
 [*] B: A variable in a function definition that accepts data passed into the function
 [ ] C: A block of code inside the function
 [ ] D: An error thrown by the function
Explanation: A parameter is a variable declared in the function definition. When the function is called, the actual values passed are called arguments, which bind to the parameters.

ID: q_prog_fund_020
Q: Which of the following describes an IF-ELSE statement?
 [ ] A: It creates a loop that runs until a condition is met.
 [*] B: It is a conditional statement that executes one block of code if a condition is true, and another if it is false.
 [ ] C: It pauses the execution of the program for a specific time.
 [ ] D: It declares a new variable and assigns it a default value.
Explanation: The IF-ELSE structure branches the execution of the program based on the boolean result of a condition.

ID: q_prog_fund_021
Q: Why are comments used in code?
 [ ] A: To increase the execution speed of the program
 [*] B: To explain code logic and make it more readable for humans
 [ ] C: To encrypt sensitive data within the file
 [ ] D: To tell the compiler which language is being used
Explanation: Comments are ignored by the compiler/interpreter and exist purely to help developers understand the logic, intention, and functionality of the code.

ID: q_prog_fund_022
Q: What does it mean when a variable is described as a "Constant"?
 [ ] A: It can only store numbers.
 [*] B: Its value cannot be changed after it is initialized.
 [ ] C: It is accessible from anywhere in the program.
 [ ] D: It must be defined at the very top of a file.
Explanation: A constant is an identifier whose associated value cannot be altered by the program during its execution (e.g., using `const` in JS/C++ or `final` in Java).

ID: q_prog_fund_023
Q: In object-oriented programming, what is a "Method"?
 [ ] A: A property or attribute of a class.
 [*] B: A function that belongs to a class or object.
 [ ] C: The process of creating a new object.
 [ ] D: An error handling technique.
Explanation: Methods are functions that are defined within a class and operate on the data (attributes) of instances (objects) of that class.

ID: q_prog_fund_024
Q: Which data structure operates on a Last-In, First-Out (LIFO) principle?
 [ ] A: Queue
 [*] B: Stack
 [ ] C: Array
 [ ] D: Linked List
Explanation: A Stack follows the Last-In-First-Out (LIFO) principle, where the last element added is the first one to be removed.

ID: q_prog_fund_025
Q: What is an "Exception" in programming?
 [ ] A: A very highly optimized block of code
 [*] B: An unexpected event that occurs during execution and disrupts the normal flow of instructions
 [ ] C: A special type of loop
 [ ] D: A feature allowing multiple inheritance
Explanation: An exception is an error event that occurs during runtime. Proper exception handling allows a program to deal with the error gracefully instead of crashing.

# SQL

ID: q_sql_001
Q: Which SQL clause is used to filter records after aggregation has occurred?
 [ ] A: WHERE
 [*] B: HAVING
 [ ] C: GROUP BY
 [ ] D: ORDER BY
Explanation: The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions.

ID: q_sql_002
Q: What is the primary difference between INNER JOIN and LEFT JOIN?
 [ ] A: INNER JOIN returns all rows from the left table, LEFT JOIN returns only matching rows.
 [*] B: INNER JOIN returns only rows with a match in both tables, LEFT JOIN returns all rows from the left table and matched rows from the right.
 [ ] C: INNER JOIN is faster than LEFT JOIN.
 [ ] D: There is no functional difference; they are just aliases.
Explanation: INNER JOIN requires matching records in both tables. LEFT JOIN ensures every record from the left table is returned, using NULLs for missing right-side matches.

ID: q_sql_003
Q: What does the SQL command `TRUNCATE TABLE` do?
 [ ] A: Deletes the table structure and its data.
 [*] B: Deletes all rows from a table but keeps the structure, and cannot be rolled back in some DBMS.
 [ ] C: Deletes specific rows based on a WHERE clause.
 [ ] D: Creates a backup copy of the table.
Explanation: TRUNCATE is a DDL command that quickly removes all records from a table without logging individual row deletions, unlike the DELETE command.

ID: q_sql_004
Q: In a query `SELECT COUNT(*) FROM employees WHERE department_id = 10`, what will COUNT(*) include?
 [ ] A: Only rows where all column values are non-NULL.
 [ ] B: Only distinct rows.
 [*] C: All rows matching the condition, including rows that contain NULL values in some columns.
 [ ] D: It will throw a syntax error.
Explanation: COUNT(*) counts the total number of rows returned by the query, regardless of whether any specific columns contain NULL values.

ID: q_sql_005
Q: Which function is used to replace NULL values with a specified replacement value in SQL Server or PostgreSQL?
 [*] A: ISNULL / COALESCE
 [ ] B: REPLACE_NULL
 [ ] C: IFNULL_REPLACE
 [ ] D: NULLIF
Explanation: COALESCE (standard) or ISNULL (SQL Server specific) returns the first non-null expression among its arguments.

ID: q_sql_006
Q: What does a `UNION` operator do?
 [ ] A: Combines the result sets of two queries, keeping all duplicate rows.
 [*] B: Combines the result sets of two queries, removing duplicate rows.
 [ ] C: Joins two tables horizontally based on a foreign key.
 [ ] D: Finds the intersection between two tables.
Explanation: UNION combines results vertically and eliminates duplicate rows. UNION ALL must be used to retain duplicates.

ID: q_sql_007
Q: Which normal form dictates that a table must not have transitive dependencies?
 [ ] A: First Normal Form (1NF)
 [ ] B: Second Normal Form (2NF)
 [*] C: Third Normal Form (3NF)
 [ ] D: Boyce-Codd Normal Form (BCNF)
Explanation: 3NF states that every non-prime attribute of a table must be dependent on the primary key, and nothing but the primary key (no transitive dependencies).

ID: q_sql_008
Q: What is a Correlated Subquery?
 [ ] A: A subquery that can run independently of the outer query.
 [*] B: A subquery that uses values from the outer query, meaning it is evaluated once for each row processed by the outer query.
 [ ] C: A query that uses two different database connections.
 [ ] D: A subquery that returns more than one column.
Explanation: Correlated subqueries reference columns from the outer query, forcing the DBMS to execute the subquery repeatedly for each row evaluated by the outer query.

ID: q_sql_009
Q: Which index type stores the data rows themselves at the leaf level of the index structure?
 [ ] A: Non-clustered Index
 [ ] B: Bitmap Index
 [*] C: Clustered Index
 [ ] D: Hash Index
Explanation: A clustered index sorts and stores the data rows in the table or view based on their key values. Therefore, there can be only one clustered index per table.

ID: q_sql_010
Q: What does the `NULLIF(expr1, expr2)` function do?
 [*] A: Returns NULL if expr1 equals expr2, otherwise returns expr1.
 [ ] B: Returns expr1 if it is NULL, otherwise returns expr2.
 [ ] C: Returns NULL if either expr1 or expr2 is NULL.
 [ ] D: Throws an error if expr1 equals expr2.
Explanation: NULLIF compares two expressions. If they are equal, it returns NULL. If they are not equal, it returns the first expression. Useful for preventing divide-by-zero.

ID: q_sql_011
Q: In a SELECT statement, what is the correct order of execution of clauses by the database engine?
 [ ] A: SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY
 [*] B: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY
 [ ] C: FROM -> SELECT -> WHERE -> GROUP BY -> HAVING -> ORDER BY
 [ ] D: SELECT -> WHERE -> FROM -> GROUP BY -> HAVING -> ORDER BY
Explanation: Logical execution order is: FROM (and JOINs), WHERE, GROUP BY, HAVING, SELECT (expressions and aliases), ORDER BY, and finally LIMIT/OFFSET.

ID: q_sql_012
Q: What is the purpose of the `CASCADE` option in a foreign key constraint?
 [ ] A: It speeds up join queries involving the foreign key.
 [ ] B: It automatically creates an index on the foreign key column.
 [*] C: If a referenced row in the parent table is deleted or updated, the referencing rows in the child table are automatically deleted or updated.
 [ ] D: It cascades the results into multiple result sets.
Explanation: ON DELETE CASCADE or ON UPDATE CASCADE ensures referential integrity is maintained by automatically reflecting changes from the parent table to the child table.

ID: q_sql_013
Q: When would a FULL OUTER JOIN be most appropriate?
 [ ] A: When you want to find records that exist only in the left table.
 [*] B: When you want to retrieve all matching and non-matching rows from both tables.
 [ ] C: When you want to find the cross product of two tables.
 [ ] D: When you want to filter out rows containing NULL values.
Explanation: FULL OUTER JOIN combines the results of both LEFT and RIGHT outer joins, returning all records from both tables and filling in NULLs where there is no match.

ID: q_sql_014
Q: Which command is used to revoke privileges granted to a user?
 [ ] A: DENY
 [ ] B: REMOVE
 [*] C: REVOKE
 [ ] D: DELETE
Explanation: REVOKE is a Data Control Language (DCL) command used to remove previously granted privileges from a user or role.

ID: q_sql_015
Q: Which window function assigns a unique sequential integer to each row within a partition of a result set?
 [ ] A: RANK()
 [ ] B: DENSE_RANK()
 [*] C: ROW_NUMBER()
 [ ] D: NTILE()
Explanation: ROW_NUMBER() assigns a distinct, sequential number to rows within a partition, regardless of tied values. RANK() leaves gaps for ties, DENSE_RANK() does not.

ID: q_sql_016
Q: What will be the result of comparing a value to NULL using the equal sign (e.g., `WHERE column = NULL`) in standard SQL?
 [ ] A: True if the column is NULL.
 [ ] B: False if the column is NULL.
 [*] C: Unknown (which evaluates to False for the WHERE clause).
 [ ] D: A syntax error.
Explanation: In standard SQL, NULL means "unknown value". Comparing anything to NULL (even NULL = NULL) yields UNKNOWN. You must use IS NULL.

ID: q_sql_017
Q: What is the purpose of the EXPLAIN (or EXPLAIN PLAN) command?
 [ ] A: To provide a description of a table's schema.
 [ ] B: To output a natural language description of a query.
 [*] C: To show the execution plan that the database engine will use to run a query.
 [ ] D: To debug stored procedures step-by-step.
Explanation: EXPLAIN allows developers to see the query execution plan (like index usage, join strategies) chosen by the query optimizer without actually executing the query.

ID: q_sql_018
Q: What type of lock is typically acquired when a row is updated, preventing other transactions from updating the same row simultaneously?
 [ ] A: Shared Lock (S)
 [*] B: Exclusive Lock (X)
 [ ] C: Intent Lock (I)
 [ ] D: Update Lock (U)
Explanation: An Exclusive Lock prevents other transactions from reading (depending on isolation level) or modifying the locked resource until the transaction commits.

ID: q_sql_019
Q: In a database schema, if Table A has a foreign key referencing Table B, which is the child table?
 [*] A: Table A
 [ ] B: Table B
 [ ] C: Both are child tables
 [ ] D: It depends on the data types
Explanation: The table containing the foreign key (Table A) is the child table. The table containing the referenced primary key (Table B) is the parent table.

ID: q_sql_020
Q: Which statement accurately describes a View in SQL?
 [ ] A: A materialized copy of a table that automatically updates.
 [*] B: A virtual table based on the result-set of an SQL statement.
 [ ] C: An indexed data structure used to speed up queries.
 [ ] D: A backup file of the database schema.
Explanation: A view does not store data itself (unless it's a materialized view). It is a saved query that acts as a virtual table.

ID: q_sql_021
Q: How do you return the highest salary from an `employees` table?
 [ ] A: SELECT TOP 1 salary FROM employees
 [*] B: SELECT MAX(salary) FROM employees
 [ ] C: SELECT HIGHEST(salary) FROM employees
 [ ] D: SELECT salary FROM employees ORDER BY salary DESC
Explanation: The MAX() aggregate function returns the maximum value in a set of values.

ID: q_sql_022
Q: What does the SQL `CASE` statement do?
 [ ] A: It changes the case of a string to uppercase.
 [*] B: It creates a switch-case logic flow to return specific values based on conditions.
 [ ] C: It validates data types in a column.
 [ ] D: It defines an exception block.
Explanation: The CASE statement goes through conditions and returns a value when the first condition is met (like an if-then-else statement).

ID: q_sql_023
Q: Which SQL operator is used to search for a specified pattern in a column?
 [ ] A: SEARCH
 [ ] B: IN
 [ ] C: MATCH
 [*] D: LIKE
Explanation: The LIKE operator is used in a WHERE clause to search for a specified pattern, often using wildcards like % and _.

ID: q_sql_024
Q: If you use `GROUP BY dept_id, job_id`, what is the grouping result?
 [ ] A: Data is grouped by dept_id only, and job_id is ignored.
 [*] B: Data is grouped by the unique combination of dept_id and job_id.
 [ ] C: Data is grouped independently for dept_id and then separately for job_id.
 [ ] D: A syntax error, you can only group by one column.
Explanation: Providing multiple columns in a GROUP BY clause aggregates the result set by each unique combination of values across those columns.

ID: q_sql_025
Q: What is a cross join (Cartesian product)?
 [ ] A: A join that returns rows from both tables even if there is no match.
 [*] B: A join that produces a result set which is the number of rows in the first table multiplied by the number of rows in the second table.
 [ ] C: A join optimized for large datasets using hash algorithms.
 [ ] D: A self-join.
Explanation: A CROSS JOIN returns the Cartesian product of rows from tables in the join. Without a WHERE clause, it combines every row from the first table with every row from the second.


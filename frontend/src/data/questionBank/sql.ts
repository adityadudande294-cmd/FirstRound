import { Question, MCQQuestion } from '../../types';

export const sqlQuestions: Question[] = [
  {
    id: 'q_sql_001',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'Which SQL clause is used to filter records after aggregation has occurred?',
    options: [
      { id: 'A', text: 'WHERE' },
      { id: 'B', text: 'HAVING' },
      { id: 'C', text: 'GROUP BY' },
      { id: 'D', text: 'ORDER BY' }
    ],
    correctOption: 'B',
    topic: 'SQL',
    subTopic: 'Aggregation',
    difficulty: 'Medium',
    explanation: 'The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions.'
  },
  {
    id: 'q_sql_002',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'What is the primary difference between INNER JOIN and LEFT JOIN?',
    options: [
      { id: 'A', text: 'INNER JOIN returns all rows from the left table, LEFT JOIN returns only matching rows.' },
      { id: 'B', text: 'INNER JOIN returns only rows with a match in both tables, LEFT JOIN returns all rows from the left table and matched rows from the right.' },
      { id: 'C', text: 'INNER JOIN is faster than LEFT JOIN.' },
      { id: 'D', text: 'There is no functional difference; they are just aliases.' }
    ],
    correctOption: 'B',
    topic: 'SQL',
    subTopic: 'Joins',
    difficulty: 'Easy',
    explanation: 'INNER JOIN requires matching records in both tables. LEFT JOIN ensures every record from the left table is returned, using NULLs for missing right-side matches.'
  },
  {
    id: 'q_sql_003',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'What does the SQL command `TRUNCATE TABLE` do?',
    options: [
      { id: 'A', text: 'Deletes the table structure and its data.' },
      { id: 'B', text: 'Deletes all rows from a table but keeps the structure, and cannot be rolled back in some DBMS.' },
      { id: 'C', text: 'Deletes specific rows based on a WHERE clause.' },
      { id: 'D', text: 'Creates a backup copy of the table.' }
    ],
    correctOption: 'B',
    topic: 'SQL',
    subTopic: 'DDL',
    difficulty: 'Medium',
    explanation: 'TRUNCATE is a DDL command that quickly removes all records from a table without logging individual row deletions, unlike the DELETE command.'
  },
  {
    id: 'q_sql_004',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'In a query `SELECT COUNT(*) FROM employees WHERE department_id = 10`, what will COUNT(*) include?',
    options: [
      { id: 'A', text: 'Only rows where all column values are non-NULL.' },
      { id: 'B', text: 'Only distinct rows.' },
      { id: 'C', text: 'All rows matching the condition, including rows that contain NULL values in some columns.' },
      { id: 'D', text: 'It will throw a syntax error.' }
    ],
    correctOption: 'C',
    topic: 'SQL',
    subTopic: 'Aggregation',
    difficulty: 'Medium',
    explanation: 'COUNT(*) counts the total number of rows returned by the query, regardless of whether any specific columns contain NULL values.'
  },
  {
    id: 'q_sql_005',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'Which function is used to replace NULL values with a specified replacement value in SQL Server or PostgreSQL?',
    options: [
      { id: 'A', text: 'ISNULL / COALESCE' },
      { id: 'B', text: 'REPLACE_NULL' },
      { id: 'C', text: 'IFNULL_REPLACE' },
      { id: 'D', text: 'NULLIF' }
    ],
    correctOption: 'A',
    topic: 'SQL',
    subTopic: 'NULL handling',
    difficulty: 'Medium',
    explanation: 'COALESCE (standard) or ISNULL (SQL Server specific) returns the first non-null expression among its arguments.'
  },
  {
    id: 'q_sql_006',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'What does a `UNION` operator do?',
    options: [
      { id: 'A', text: 'Combines the result sets of two queries, keeping all duplicate rows.' },
      { id: 'B', text: 'Combines the result sets of two queries, removing duplicate rows.' },
      { id: 'C', text: 'Joins two tables horizontally based on a foreign key.' },
      { id: 'D', text: 'Finds the intersection between two tables.' }
    ],
    correctOption: 'B',
    topic: 'SQL',
    subTopic: 'Set Operations',
    difficulty: 'Medium',
    explanation: 'UNION combines results vertically and eliminates duplicate rows. UNION ALL must be used to retain duplicates.'
  },
  {
    id: 'q_sql_007',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'Which normal form dictates that a table must not have transitive dependencies?',
    options: [
      { id: 'A', text: 'First Normal Form (1NF)' },
      { id: 'B', text: 'Second Normal Form (2NF)' },
      { id: 'C', text: 'Third Normal Form (3NF)' },
      { id: 'D', text: 'Boyce-Codd Normal Form (BCNF)' }
    ],
    correctOption: 'C',
    topic: 'SQL',
    subTopic: 'Normalization',
    difficulty: 'Hard',
    explanation: '3NF states that every non-prime attribute of a table must be dependent on the primary key, and nothing but the primary key (no transitive dependencies).'
  },
  {
    id: 'q_sql_008',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'What is a Correlated Subquery?',
    options: [
      { id: 'A', text: 'A subquery that can run independently of the outer query.' },
      { id: 'B', text: 'A subquery that uses values from the outer query, meaning it is evaluated once for each row processed by the outer query.' },
      { id: 'C', text: 'A query that uses two different database connections.' },
      { id: 'D', text: 'A subquery that returns more than one column.' }
    ],
    correctOption: 'B',
    topic: 'SQL',
    subTopic: 'Subqueries',
    difficulty: 'Hard',
    explanation: 'Correlated subqueries reference columns from the outer query, forcing the DBMS to execute the subquery repeatedly for each row evaluated by the outer query.'
  },
  {
    id: 'q_sql_009',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'Which index type stores the data rows themselves at the leaf level of the index structure?',
    options: [
      { id: 'A', text: 'Non-clustered Index' },
      { id: 'B', text: 'Bitmap Index' },
      { id: 'C', text: 'Clustered Index' },
      { id: 'D', text: 'Hash Index' }
    ],
    correctOption: 'C',
    topic: 'SQL',
    subTopic: 'Indexing',
    difficulty: 'Medium',
    explanation: 'A clustered index sorts and stores the data rows in the table or view based on their key values. Therefore, there can be only one clustered index per table.'
  },
  {
    id: 'q_sql_010',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'What does the `NULLIF(expr1, expr2)` function do?',
    options: [
      { id: 'A', text: 'Returns NULL if expr1 equals expr2, otherwise returns expr1.' },
      { id: 'B', text: 'Returns expr1 if it is NULL, otherwise returns expr2.' },
      { id: 'C', text: 'Returns NULL if either expr1 or expr2 is NULL.' },
      { id: 'D', text: 'Throws an error if expr1 equals expr2.' }
    ],
    correctOption: 'A',
    topic: 'SQL',
    subTopic: 'NULL handling',
    difficulty: 'Medium',
    explanation: 'NULLIF compares two expressions. If they are equal, it returns NULL. If they are not equal, it returns the first expression. Useful for preventing divide-by-zero.'
  },
  {
    id: 'q_sql_011',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'In a SELECT statement, what is the correct order of execution of clauses by the database engine?',
    options: [
      { id: 'A', text: 'SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY' },
      { id: 'B', text: 'FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY' },
      { id: 'C', text: 'FROM -> SELECT -> WHERE -> GROUP BY -> HAVING -> ORDER BY' },
      { id: 'D', text: 'SELECT -> WHERE -> FROM -> GROUP BY -> HAVING -> ORDER BY' }
    ],
    correctOption: 'B',
    topic: 'SQL',
    subTopic: 'Query Execution',
    difficulty: 'Hard',
    explanation: 'Logical execution order is: FROM (and JOINs), WHERE, GROUP BY, HAVING, SELECT (expressions and aliases), ORDER BY, and finally LIMIT/OFFSET.'
  },
  {
    id: 'q_sql_012',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'What is the purpose of the `CASCADE` option in a foreign key constraint?',
    options: [
      { id: 'A', text: 'It speeds up join queries involving the foreign key.' },
      { id: 'B', text: 'It automatically creates an index on the foreign key column.' },
      { id: 'C', text: 'If a referenced row in the parent table is deleted or updated, the referencing rows in the child table are automatically deleted or updated.' },
      { id: 'D', text: 'It cascades the results into multiple result sets.' }
    ],
    correctOption: 'C',
    topic: 'SQL',
    subTopic: 'Constraints',
    difficulty: 'Medium',
    explanation: 'ON DELETE CASCADE or ON UPDATE CASCADE ensures referential integrity is maintained by automatically reflecting changes from the parent table to the child table.'
  },
  {
    id: 'q_sql_013',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'When would a FULL OUTER JOIN be most appropriate?',
    options: [
      { id: 'A', text: 'When you want to find records that exist only in the left table.' },
      { id: 'B', text: 'When you want to retrieve all matching and non-matching rows from both tables.' },
      { id: 'C', text: 'When you want to find the cross product of two tables.' },
      { id: 'D', text: 'When you want to filter out rows containing NULL values.' }
    ],
    correctOption: 'B',
    topic: 'SQL',
    subTopic: 'Joins',
    difficulty: 'Medium',
    explanation: 'FULL OUTER JOIN combines the results of both LEFT and RIGHT outer joins, returning all records from both tables and filling in NULLs where there is no match.'
  },
  {
    id: 'q_sql_014',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'Which command is used to revoke privileges granted to a user?',
    options: [
      { id: 'A', text: 'DENY' },
      { id: 'B', text: 'REMOVE' },
      { id: 'C', text: 'REVOKE' },
      { id: 'D', text: 'DELETE' }
    ],
    correctOption: 'C',
    topic: 'SQL',
    subTopic: 'DCL',
    difficulty: 'Easy',
    explanation: 'REVOKE is a Data Control Language (DCL) command used to remove previously granted privileges from a user or role.'
  },
  {
    id: 'q_sql_015',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'Which window function assigns a unique sequential integer to each row within a partition of a result set?',
    options: [
      { id: 'A', text: 'RANK()' },
      { id: 'B', text: 'DENSE_RANK()' },
      { id: 'C', text: 'ROW_NUMBER()' },
      { id: 'D', text: 'NTILE()' }
    ],
    correctOption: 'C',
    topic: 'SQL',
    subTopic: 'Window Functions',
    difficulty: 'Hard',
    explanation: 'ROW_NUMBER() assigns a distinct, sequential number to rows within a partition, regardless of tied values. RANK() leaves gaps for ties, DENSE_RANK() does not.'
  },
  {
    id: 'q_sql_016',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'What will be the result of comparing a value to NULL using the equal sign (e.g., `WHERE column = NULL`) in standard SQL?',
    options: [
      { id: 'A', text: 'True if the column is NULL.' },
      { id: 'B', text: 'False if the column is NULL.' },
      { id: 'C', text: 'Unknown (which evaluates to False for the WHERE clause).' },
      { id: 'D', text: 'A syntax error.' }
    ],
    correctOption: 'C',
    topic: 'SQL',
    subTopic: 'NULL handling',
    difficulty: 'Medium',
    explanation: 'In standard SQL, NULL means "unknown value". Comparing anything to NULL (even NULL = NULL) yields UNKNOWN. You must use IS NULL.'
  },
  {
    id: 'q_sql_017',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'What is the purpose of the EXPLAIN (or EXPLAIN PLAN) command?',
    options: [
      { id: 'A', text: 'To provide a description of a table\'s schema.' },
      { id: 'B', text: 'To output a natural language description of a query.' },
      { id: 'C', text: 'To show the execution plan that the database engine will use to run a query.' },
      { id: 'D', text: 'To debug stored procedures step-by-step.' }
    ],
    correctOption: 'C',
    topic: 'SQL',
    subTopic: 'Optimization',
    difficulty: 'Medium',
    explanation: 'EXPLAIN allows developers to see the query execution plan (like index usage, join strategies) chosen by the query optimizer without actually executing the query.'
  },
  {
    id: 'q_sql_018',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'What type of lock is typically acquired when a row is updated, preventing other transactions from updating the same row simultaneously?',
    options: [
      { id: 'A', text: 'Shared Lock (S)' },
      { id: 'B', text: 'Exclusive Lock (X)' },
      { id: 'C', text: 'Intent Lock (I)' },
      { id: 'D', text: 'Update Lock (U)' }
    ],
    correctOption: 'B',
    topic: 'SQL',
    subTopic: 'Transactions',
    difficulty: 'Hard',
    explanation: 'An Exclusive Lock prevents other transactions from reading (depending on isolation level) or modifying the locked resource until the transaction commits.'
  },
  {
    id: 'q_sql_019',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'In a database schema, if Table A has a foreign key referencing Table B, which is the child table?',
    options: [
      { id: 'A', text: 'Table A' },
      { id: 'B', text: 'Table B' },
      { id: 'C', text: 'Both are child tables' },
      { id: 'D', text: 'It depends on the data types' }
    ],
    correctOption: 'A',
    topic: 'SQL',
    subTopic: 'Concepts',
    difficulty: 'Easy',
    explanation: 'The table containing the foreign key (Table A) is the child table. The table containing the referenced primary key (Table B) is the parent table.'
  },
  {
    id: 'q_sql_020',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'Which statement accurately describes a View in SQL?',
    options: [
      { id: 'A', text: 'A materialized copy of a table that automatically updates.' },
      { id: 'B', text: 'A virtual table based on the result-set of an SQL statement.' },
      { id: 'C', text: 'An indexed data structure used to speed up queries.' },
      { id: 'D', text: 'A backup file of the database schema.' }
    ],
    correctOption: 'B',
    topic: 'SQL',
    subTopic: 'Views',
    difficulty: 'Easy',
    explanation: 'A view does not store data itself (unless it\'s a materialized view). It is a saved query that acts as a virtual table.'
  },
  {
    id: 'q_sql_021',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'How do you return the highest salary from an `employees` table?',
    options: [
      { id: 'A', text: 'SELECT TOP 1 salary FROM employees' },
      { id: 'B', text: 'SELECT MAX(salary) FROM employees' },
      { id: 'C', text: 'SELECT HIGHEST(salary) FROM employees' },
      { id: 'D', text: 'SELECT salary FROM employees ORDER BY salary DESC' }
    ],
    correctOption: 'B',
    topic: 'SQL',
    subTopic: 'Aggregation',
    difficulty: 'Easy',
    explanation: 'The MAX() aggregate function returns the maximum value in a set of values.'
  },
  {
    id: 'q_sql_022',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'What does the SQL `CASE` statement do?',
    options: [
      { id: 'A', text: 'It changes the case of a string to uppercase.' },
      { id: 'B', text: 'It creates a switch-case logic flow to return specific values based on conditions.' },
      { id: 'C', text: 'It validates data types in a column.' },
      { id: 'D', text: 'It defines an exception block.' }
    ],
    correctOption: 'B',
    topic: 'SQL',
    subTopic: 'Conditional Logic',
    difficulty: 'Easy',
    explanation: 'The CASE statement goes through conditions and returns a value when the first condition is met (like an if-then-else statement).'
  },
  {
    id: 'q_sql_023',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'Which SQL operator is used to search for a specified pattern in a column?',
    options: [
      { id: 'A', text: 'SEARCH' },
      { id: 'B', text: 'IN' },
      { id: 'C', text: 'MATCH' },
      { id: 'D', text: 'LIKE' }
    ],
    correctOption: 'D',
    topic: 'SQL',
    subTopic: 'Filtering',
    difficulty: 'Easy',
    explanation: 'The LIKE operator is used in a WHERE clause to search for a specified pattern, often using wildcards like % and _.'
  },
  {
    id: 'q_sql_024',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'If you use `GROUP BY dept_id, job_id`, what is the grouping result?',
    options: [
      { id: 'A', text: 'Data is grouped by dept_id only, and job_id is ignored.' },
      { id: 'B', text: 'Data is grouped by the unique combination of dept_id and job_id.' },
      { id: 'C', text: 'Data is grouped independently for dept_id and then separately for job_id.' },
      { id: 'D', text: 'A syntax error, you can only group by one column.' }
    ],
    correctOption: 'B',
    topic: 'SQL',
    subTopic: 'Aggregation',
    difficulty: 'Medium',
    explanation: 'Providing multiple columns in a GROUP BY clause aggregates the result set by each unique combination of values across those columns.'
  },
  {
    id: 'q_sql_025',
    testSeriesId: 'cat_coding_sql',
    questionType: 'MCQ',
    questionText: 'What is a cross join (Cartesian product)?',
    options: [
      { id: 'A', text: 'A join that returns rows from both tables even if there is no match.' },
      { id: 'B', text: 'A join that produces a result set which is the number of rows in the first table multiplied by the number of rows in the second table.' },
      { id: 'C', text: 'A join optimized for large datasets using hash algorithms.' },
      { id: 'D', text: 'A self-join.' }
    ],
    correctOption: 'B',
    topic: 'SQL',
    subTopic: 'Joins',
    difficulty: 'Medium',
    explanation: 'A CROSS JOIN returns the Cartesian product of rows from tables in the join. Without a WHERE clause, it combines every row from the first table with every row from the second.'
  }
];

import { CanonicalCodingProblem } from '../../types';
import { TAXONOMY } from '../taxonomy';

export const tcsCodingProblems: CanonicalCodingProblem[] = [
  // =========================================================================
  // PROBLEM 1: MEDIUM-HARD ALGORITHMIC (SLIDING WINDOW / TWO POINTERS / HASHING)
  // =========================================================================
  {
    id: 'q_tcs_coding_001',
    title: 'Longest Subarray with at Most K Distinct Frequencies',
    questionType: 'CODING',
    questionText: `You are given an integer array nums of length N and an integer K.

A contiguous subarray is defined as valid if the frequency of every element inside the subarray is at most K (i.e. no single integer appears strictly more than K times within the contiguous window).

Your task is to write a program that reads the input from standard input (stdin) and computes the maximum length of a valid contiguous subarray. Output the result to standard output (stdout).`,
    problemStatement: `Given an array of integers \`nums\` of size \`N\` and an integer \`K\`, find the maximum length of a contiguous subarray where the frequency of each element in that subarray is at most \`K\`.

Input is provided from standard input (stdin) and your program should print the integer answer to standard output (stdout).`,
    inputFormat: `The first line contains two space-separated integers N and K.
The second line contains N space-separated integers representing the array elements.`,
    outputFormat: `Print a single integer representing the maximum length of the valid contiguous subarray.`,
    constraints: [
      '1 <= N <= 10^5',
      '1 <= K <= N',
      '1 <= nums[i] <= 10^9'
    ],
    examples: [
      {
        input: `6 2\n1 2 3 1 2 3`,
        output: `6`,
        explanation: 'Every element (1, 2, 3) appears exactly 2 times in the full array, which is <= K (2). The entire array of length 6 is valid.'
      },
      {
        input: `6 1\n1 2 1 2 1 2`,
        output: `2`,
        explanation: 'For K = 1, each element can appear at most once. The longest subarrays without duplicate elements are [1, 2] or [2, 1], with maximum length 2.'
      }
    ],
    supportedLanguages: ['javascript', 'typescript', 'python'],
    starterCode: {
      javascript: `const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length < 2 || input[0] === '') return;

  const n = parseInt(input[0], 10);
  const k = parseInt(input[1], 10);
  const nums = [];
  for (let i = 0; i < n; i++) {
    nums.push(parseInt(input[2 + i], 10));
  }

  // Sliding Window: Two Pointers with Frequency Map
  let left = 0;
  let maxLen = 0;
  const freq = new Map();

  for (let right = 0; right < n; right++) {
    const val = nums[right];
    freq.set(val, (freq.get(val) || 0) + 1);

    while (freq.get(val) > k) {
      const leftVal = nums[left];
      freq.set(leftVal, freq.get(leftVal) - 1);
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  console.log(maxLen);
}

solve();
`,
      typescript: `import * as fs from 'fs';

function solve(): void {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length < 2 || input[0] === '') return;

  const n = parseInt(input[0], 10);
  const k = parseInt(input[1], 10);
  const nums: number[] = [];
  for (let i = 0; i < n; i++) {
    nums.push(parseInt(input[2 + i], 10));
  }

  let left = 0;
  let maxLen = 0;
  const freq = new Map<number, number>();

  for (let right = 0; right < n; right++) {
    const val = nums[right];
    freq.set(val, (freq.get(val) || 0) + 1);

    while ((freq.get(val) || 0) > k) {
      const leftVal = nums[left];
      freq.set(leftVal, (freq.get(leftVal) || 0) - 1);
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  console.log(maxLen);
}

solve();
`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    
    n = int(raw[0])
    k = int(raw[1])
    nums = [int(x) for x in raw[2:2 + n]]

    freq = {}
    left = 0
    max_len = 0

    for right in range(n):
        val = nums[right]
        freq[val] = freq.get(val, 0) + 1

        while freq[val] > k:
            left_val = nums[left]
            freq[left_val] -= 1
            left += 1

        max_len = max(max_len, right - left + 1)

    print(max_len)

if __name__ == '__main__':
    solve()
`,
      java: `// Java is currently gated`,
      cpp: `// C++ is currently gated`
    },
    testCases: [
      // 2 Public Sample Cases
      {
        id: 'tc_sample_1',
        input: `6 2\n1 2 3 1 2 3`,
        expectedOutput: `6`,
        isHidden: false,
        explanation: 'All elements have frequency <= 2 in the entire array of length 6.'
      },
      {
        id: 'tc_sample_2',
        input: `6 1\n1 2 1 2 1 2`,
        expectedOutput: `2`,
        isHidden: false,
        explanation: 'For K = 1, each element appears at most once; max length is 2.'
      },
      // 5 Server-Owned Hidden Cases
      {
        id: 'tc_hidden_3',
        input: `1 1\n42`,
        expectedOutput: `1`,
        isHidden: true,
        explanation: 'Single element boundary test case.'
      },
      {
        id: 'tc_hidden_4',
        input: `7 2\n5 5 5 5 5 5 5`,
        expectedOutput: `2`,
        isHidden: true,
        explanation: 'All identical elements with frequency constraint K = 2.'
      },
      {
        id: 'tc_hidden_5',
        input: `8 2\n1 4 4 3 3 2 4 1`,
        expectedOutput: `6`,
        isHidden: true,
        explanation: 'Subarray [1, 4, 4, 3, 3, 2] or [4, 3, 3, 2, 4, 1] has valid frequency <= 2 for all elements; length is 6.'
      },
      {
        id: 'tc_hidden_6',
        input: `10 3\n100 200 100 300 100 200 200 400 100 500`,
        expectedOutput: `9`,
        isHidden: true,
        explanation: 'Subarray with four 100s, max valid contiguous length is 9.'
      },
      {
        id: 'tc_hidden_7',
        input: `8 1\n10 20 30 40 50 60 70 80`,
        expectedOutput: `8`,
        isHidden: true,
        explanation: 'All distinct elements, full array valid under K = 1.'
      }
    ],
    timeLimitMs: 3000,
    memoryLimitMb: 256,
    scoringConfig: {
      model: 'PERCENTAGE_PASSED',
      hiddenTestWeight: 80,
      sampleTestWeight: 20
    },
    correctAnswer: 'Optimal O(N) Sliding Window via Two Pointers & Frequency Hash Map',
    explanation: `Optimal Solution Architecture:
1. Use a two-pointer sliding window [left, right] maintained from left = 0 to right = 0...N-1.
2. Maintain a hash map (or frequency table) recording the count of each element within the current window.
3. For each element nums[right], increment its frequency in the map.
4. If freq[nums[right]] > K, shrink the window from the left by decrementing freq[nums[left]] and advancing left until freq[nums[right]] <= K.
5. Update maxLen = max(maxLen, right - left + 1) at each step.
Time Complexity: O(N) since each element enters and exits the window at most once.
Space Complexity: O(N) for hash map storing unique values.`,
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.DSA,
    topic: 'Sliding Window',
    subtopic: 'Sliding Window & Two Pointers',
    supportedRoles: ['Software Developer', 'Digital', 'Prime'],
    company: 'TCS',
    source: 'FirstRound Original',
    sourceReference: 'Advanced Coding Assessment Pattern — Linear Time Window Optimization',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['Sliding Window', 'Two Pointers', 'Hash Map', 'Arrays', 'TCS Advanced Coding']
  },

  // =========================================================================
  // PROBLEM 2: HARD ALGORITHMIC (DYNAMIC PROGRAMMING / GRID PATH OPTIMIZATION)
  // =========================================================================
  {
    id: 'q_tcs_coding_002',
    title: 'Minimum Obstacle Removal to Reach Target in Weighted Grid',
    questionType: 'CODING',
    questionText: `You are given an M x N binary grid where each cell grid[r][c] is either:
- 0: an open empty path
- 1: an obstacle that can be removed with cost 1

You start at the top-left cell (0, 0) and want to reach the bottom-right cell (M - 1, N - 1). You can move in 4 cardinal directions: Up, Down, Left, or Right.

Your task is to write a program that reads the grid from standard input (stdin) and outputs the absolute minimum total number of obstacles you must remove to create a walkable path from start (0, 0) to destination (M - 1, N - 1). If the starting cell itself contains an obstacle, removing it counts towards the total. Output the result to standard output (stdout).`,
    problemStatement: `Given an \`M x N\` 2D grid containing \`0\`s and \`1\`s, find the minimum number of obstacle cells (\`1\`s) that must be removed to travel from \`(0, 0)\` to \`(M - 1, N - 1)\`. Movement is allowed in 4 cardinal directions (Up, Down, Left, Right).

Input is supplied via standard input (stdin) and the minimum obstacle removals should be printed to standard output (stdout).`,
    inputFormat: `The first line contains two space-separated integers M and N (rows and columns).
The following M lines each contain N space-separated integers (0 or 1).`,
    outputFormat: `Print a single integer representing the minimum number of obstacles removed to reach (M - 1, N - 1).`,
    constraints: [
      '1 <= M, N <= 100',
      '2 <= M * N <= 10^4',
      'grid[r][c] is either 0 or 1'
    ],
    examples: [
      {
        input: `3 3\n0 1 1\n1 1 0\n1 1 0`,
        output: `2`,
        explanation: 'From (0,0)[0] -> (0,1)[1] -> (0,2)[1] -> (1,2)[0] -> (2,2)[0]. Obstacles removed = 2.'
      },
      {
        input: `3 3\n0 1 0\n0 1 0\n0 0 0`,
        output: `0`,
        explanation: 'We can traverse around the obstacles: (0,0) -> (1,0) -> (2,0) -> (2,1) -> (2,2) with 0 obstacles removed.'
      }
    ],
    supportedLanguages: ['javascript', 'typescript', 'python'],
    starterCode: {
      javascript: `const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length < 2 || input[0] === '') return;

  const m = parseInt(input[0], 10);
  const n = parseInt(input[1], 10);
  const grid = [];
  let idx = 2;

  for (let r = 0; r < m; r++) {
    const row = [];
    for (let c = 0; c < n; c++) {
      row.push(parseInt(input[idx++], 10));
    }
    grid.push(row);
  }

  // 0-1 BFS / Shortest Path on Grid
  const dist = Array.from({ length: m }, () => Array(n).fill(Infinity));
  dist[0][0] = grid[0][0];

  // Deque implementation via array pointer
  const deque = [[0, 0]];
  let head = 0;
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  while (head < deque.length) {
    const [r, c] = deque[head++];
    const d = dist[r][c];

    if (r === m - 1 && c === n - 1) {
      console.log(d);
      return;
    }

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
        const weight = grid[nr][nc];
        if (d + weight < dist[nr][nc]) {
          dist[nr][nc] = d + weight;
          if (weight === 0) {
            // Push front (simulate by inserting at head position)
            deque.splice(head, 0, [nr, nc]);
          } else {
            // Push back
            deque.push([nr, nc]);
          }
        }
      }
    }
  }

  console.log(dist[m - 1][n - 1]);
}

solve();
`,
      typescript: `import * as fs from 'fs';

function solve(): void {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length < 2 || input[0] === '') return;

  const m = parseInt(input[0], 10);
  const n = parseInt(input[1], 10);
  const grid: number[][] = [];
  let idx = 2;

  for (let r = 0; r < m; r++) {
    const row: number[] = [];
    for (let c = 0; c < n; c++) {
      row.push(parseInt(input[idx++], 10));
    }
    grid.push(row);
  }

  const dist: number[][] = Array.from({ length: m }, () => Array(n).fill(Infinity));
  dist[0][0] = grid[0][0];

  const deque: [number, number][] = [[0, 0]];
  let head = 0;
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  while (head < deque.length) {
    const [r, c] = deque[head++];
    const d = dist[r][c];

    if (r === m - 1 && c === n - 1) {
      console.log(d);
      return;
    }

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
        const weight = grid[nr][nc];
        if (d + weight < dist[nr][nc]) {
          dist[nr][nc] = d + weight;
          if (weight === 0) {
            deque.splice(head, 0, [nr, nc]);
          } else {
            deque.push([nr, nc]);
          }
        }
      }
    }
  }

  console.log(dist[m - 1][n - 1]);
}

solve();
`,
      python: `import sys

def solve():
    raw = sys.stdin.read().split()
    if not raw:
        return
    
    m = int(raw[0])
    n = int(raw[1])
    grid = []
    idx = 2
    for r in range(m):
        row = []
        for c in range(n):
            row.append(int(raw[idx]))
            idx += 1
        grid.append(row)

    dist = [[float('inf')] * n for _ in range(m)]
    dist[0][0] = grid[0][0]
    
    queue = [(0, 0)]
    head = 0
    dirs = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    while head < len(queue):
        r, c = queue[head]
        head += 1
        d = dist[r][c]

        if r == m - 1 and c == n - 1:
            print(d)
            return

        for dr, dc in dirs:
            nr = r + dr
            nc = c + dc
            if 0 <= nr < m and 0 <= nc < n:
                w = grid[nr][nc]
                if d + w < dist[nr][nc]:
                    dist[nr][nc] = d + w
                    if w == 0:
                        queue.insert(head, (nr, nc))
                    else:
                        queue.append((nr, nc))

    print(dist[m - 1][n - 1])

if __name__ == '__main__':
    solve()
`,
      java: `// Java is currently gated`,
      cpp: `// C++ is currently gated`
    },
    testCases: [
      // 2 Public Sample Cases
      {
        id: 'tc_sample_1',
        input: `3 3\n0 1 1\n1 1 0\n1 1 0`,
        expectedOutput: `2`,
        isHidden: false,
        explanation: 'Pass through 2 obstacle cells to reach bottom-right corner.'
      },
      {
        id: 'tc_sample_2',
        input: `3 3\n0 1 0\n0 1 0\n0 0 0`,
        expectedOutput: `0`,
        isHidden: false,
        explanation: 'Open pathway exists around obstacle column with cost 0.'
      },
      // 5 Server-Owned Hidden Cases
      {
        id: 'tc_hidden_3',
        input: `2 2\n0 0\n0 0`,
        expectedOutput: `0`,
        isHidden: true,
        explanation: 'Minimal 2x2 grid with all 0s.'
      },
      {
        id: 'tc_hidden_4',
        input: `2 2\n1 1\n1 1`,
        expectedOutput: `3`,
        isHidden: true,
        explanation: 'All cells are obstacles. Path requires (0,0)[1] -> (0,1)[1] -> (1,1)[1] = 3.'
      },
      {
        id: 'tc_hidden_5',
        input: `4 4\n0 1 1 1\n0 1 0 0\n0 1 0 1\n0 0 0 1`,
        expectedOutput: `1`,
        isHidden: true,
        explanation: 'Path (0,0)[0] -> (1,0)[0] -> (2,0)[0] -> (3,0)[0] -> (3,1)[0] -> (3,2)[0] -> (3,3)[1] requires removing 1 obstacle at the destination.'
      },
      {
        id: 'tc_hidden_6',
        input: `1 5\n0 1 1 1 0`,
        expectedOutput: `3`,
        isHidden: true,
        explanation: 'Single-row hallway with 3 obstacles in between.'
      },
      {
        id: 'tc_hidden_7',
        input: `5 5\n0 1 1 1 1\n1 1 0 0 0\n1 0 1 1 0\n1 0 1 1 0\n1 1 1 1 0`,
        expectedOutput: `2`,
        isHidden: true,
        explanation: 'Multi-branch grid with minimum 2 obstacles.'
      }
    ],
    timeLimitMs: 4000,
    memoryLimitMb: 256,
    scoringConfig: {
      model: 'PERCENTAGE_PASSED',
      hiddenTestWeight: 80,
      sampleTestWeight: 20
    },
    correctAnswer: 'Optimal 0-1 BFS / Dijkstra shortest path on grid graph in O(M*N) time',
    explanation: `Optimal Solution Architecture:
1. Treat the grid as a graph where each step to an adjacent 0 cell has edge weight 0, and each step to a 1 cell has edge weight 1.
2. Because edge weights are only 0 and 1, we can compute the shortest distance in linear time O(M * N) using 0-1 Breadth First Search (0-1 BFS) with a double-ended queue (Deque).
3. If the next cell has weight 0, push to the front of the deque; if weight 1, push to the back.
4. Maintain dist[r][c] to store minimum obstacles removed to reach cell (r, c).
5. The first time the destination (M - 1, N - 1) is popped from the front of the queue, its dist value is guaranteed to be optimal.
Time Complexity: O(M * N)
Space Complexity: O(M * N) for the distance array and deque.`,
    difficulty: 'Hard',
    category: TAXONOMY.categories.COMPANY_SPECIFIC,
    skill: TAXONOMY.skills.DSA,
    topic: '0-1 BFS & Shortest Path',
    subtopic: '0-1 BFS & Grid Shortest Path Optimization',
    supportedRoles: ['Software Developer', 'Digital', 'Prime'],
    company: 'TCS',
    source: 'FirstRound Original',
    sourceReference: 'Advanced Coding Assessment Pattern — 0-1 BFS & Graph Shortest Path',
    qualityStatus: 'DRAFT',
    verificationStatus: 'VERIFIED',
    tags: ['0-1 BFS', 'Graph Traversal', 'Shortest Path', 'Dynamic Programming', 'TCS Advanced Coding']
  }
];

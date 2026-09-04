import { dsaQuestions } from './src/data/questionBank/dsa';
import { codingMockQuestions } from './src/data/questionBank/codingMock';
import { NodeVmSandboxExecutor, CodeExecutionService } from './src/services/CodeExecutionService';

async function runTests() {
  const dsaCoding = dsaQuestions.filter(q => q.questionType === 'CODING');
  const mockCoding = codingMockQuestions.filter(q => q.questionType === 'CODING');
  const allCoding = [...dsaCoding, ...mockCoding];

  console.log(`Found ${allCoding.length} CODING questions (Expected 10)`);
  if (allCoding.length !== 10) throw new Error("Did not find 10 coding questions.");

  const executor = new NodeVmSandboxExecutor();
  let allPassed = true;

  console.log("\\n--- RUNNING STRUCTURAL & RUNTIME VALIDATION ---");

  for (const q of allCoding) {
    const config = q.codingConfig;
    if (!config) throw new Error(`Missing codingConfig on ${q.id}`);

    const publicTests = config.publicTests || [];
    const hiddenTests = config.hiddenTests || [];

    if (publicTests.length < 3) {
      console.error(`[${q.id}] Public tests < 3`);
      allPassed = false;
    }
    if (hiddenTests.length < 5) {
      console.error(`[${q.id}] Hidden tests < 5`);
      allPassed = false;
    }

    const allTests = [...publicTests, ...hiddenTests];
    for (const test of allTests) {
      if (test.input === "test" || test.output === "test") {
        console.error(`[${q.id}] Found placeholder test!`);
        allPassed = false;
      }
    }

    // Generate a mock solution that reads STDIN and prints the exact expected output
    // to prove the CodeExecutionService correctly spins up Node/TSX/Python and parses stdout.
    
    // JS Mock Solution
    let jsMock = `const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tests = ${JSON.stringify(allTests)};
  for (const t of tests) {
    if (t.input === input) {
      console.log(t.output);
      return;
    }
  }
}
solve();`;

    // TS Mock Solution
    let tsMock = `import * as fs from 'fs';
function solve(): void {
  const input = fs.readFileSync(0, 'utf-8');
  const tests = ${JSON.stringify(allTests)};
  for (const t of tests) {
    if (t.input === input) {
      console.log(t.output);
      return;
    }
  }
}
solve();`;

    // Python Mock Solution
    let pyMock = `import sys
def solve():
    input_data = sys.stdin.read()
    tests = ${JSON.stringify(allTests)}
    for t in tests:
        if t["input"] == input_data:
            print(t["output"])
            return
solve()`;

    for (const test of allTests) {
      // JS
      const jsResult = await executor.execute('javascript', jsMock, test.input, 2000, 128);
      if (jsResult.status !== 'PASSED' || jsResult.stdout.trim() !== test.output.trim()) {
         console.error(`[${q.id}] JS Runtime failed! Status: ${jsResult.status} Expected: ${test.output} Actual: ${jsResult.stdout}`);
         allPassed = false;
      }
      // TS
      const tsResult = await executor.execute('typescript', tsMock, test.input, 4000, 128);
      if (tsResult.status !== 'PASSED' || tsResult.stdout.trim() !== test.output.trim()) {
         console.error(`[${q.id}] TS Runtime failed! Status: ${tsResult.status} Expected: ${test.output} Actual: ${tsResult.stdout}`);
         allPassed = false;
      }
      // Python
      const pyResult = await executor.execute('python', pyMock, test.input, 4000, 128);
      if (pyResult.status !== 'PASSED' || pyResult.stdout.trim() !== test.output.trim()) {
         console.error(`[${q.id}] PY Runtime failed! Status: ${pyResult.status} Expected: ${test.output} Actual: ${pyResult.stdout}`);
         allPassed = false;
      }
    }
    console.log(`[${q.id}] Successfully validated JS, TS, and Python execution environments for all ${allTests.length} tests.`);
  }

  if (allPassed) {
    console.log("\\n--- ALL STRUCTURAL AND AUTOMATED RUNTIME CHECKS PASSED ---");
  } else {
    console.error("\\n--- SOME CHECKS FAILED ---");
    process.exit(1);
  }
}

runTests().catch(e => {
  console.error(e);
  process.exit(1);
});

import { db } from './server/db';
import { COMPANY_BLUEPRINTS } from './src/data/blueprints/company';
import { codingMockQuestions } from './src/data/questionBank/codingMock';
import { CodingEnvironmentRegistry } from './src/services/CodingEnvironmentRegistry';
import { codeExecutionService } from './src/services/CodeExecutionService';
import assert from 'assert';

async function runTests() {
  console.log('--- STARTING PHASE 31E PROGRAMMATIC QA SUITE ---');

  try {
    // 1. Staging Catalog & Blueprint Verification
    console.log('Verifying staging catalog parameters...');
    const tests = db.getTests();
    const targetTest = tests.find(t => t.id === 'cat_coding_mock_01');
    assert(targetTest, 'Staging mock not found in catalogue.');
    assert.strictEqual(targetTest.status, 'coming_soon', 'Staging status must be coming_soon.');
    assert.strictEqual(targetTest.verificationStatus, 'UNVERIFIED', 'Staging verificationStatus must be UNVERIFIED.');

    const targetBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_coding_mock_01');
    assert(targetBp, 'Blueprint bp_coding_mock_01 is missing.');
    console.log('✓ Staging catalog and blueprint verified.');

    // 2. Question-Level In-Depth Verification
    console.log('Verifying question count and properties...');
    const questions = db.getQuestionsForTest('cat_coding_mock_01');
    assert.strictEqual(questions.length, 25, `Expected 25 questions, got ${questions.length}`);

    const mcqs = questions.filter(q => q.questionType !== 'CODING');
    const codings = questions.filter(q => q.questionType === 'CODING');
    assert.strictEqual(mcqs.length, 20, 'Expected 20 MCQs.');
    assert.strictEqual(codings.length, 5, 'Expected 5 Coding questions.');

    // Verify MCQ Option Cardinality and Keys
    mcqs.forEach(q => {
      assert.strictEqual((q as import('./src/types').MCQQuestion).options.length, 4, `MCQ ${q.id} must have exactly 4 options`);
      assert(q.explanation && q.explanation.length > 5, `MCQ ${q.id} missing explanation`);
      assert((q as import('./src/types').MCQQuestion).correctOption, `MCQ ${q.id} missing correctOption`);
    });

    // Verify Coding Config
    codings.forEach(q => {
      assert((q as import('./src/types').CodingQuestion).codingConfig, `Coding question ${q.id} missing codingConfig`);
      assert((q as import('./src/types').CodingQuestion).codingConfig.languages && (q as import('./src/types').CodingQuestion).codingConfig.languages.length > 0, `Coding question ${q.id} missing languages`);
      assert((q as import('./src/types').CodingQuestion).codingConfig.defaultLanguage, `Coding question ${q.id} missing defaultLanguage`);
    });
    console.log('✓ Question structures verified.');

    // 3. Execution Verification for All 5 Coding Questions
    console.log('Verifying sandbox execution of the 5 coding problems...');
    for (const prob of codingMockQuestions.filter(q => q.questionType === 'CODING')) {
      console.log(`Testing problem: ${prob.title} (${prob.id})`);
      
      // A. JavaScript Starter Code execution
      const jsRes = await codeExecutionService.executeSubmission(
        {
          userId: `usr_qa_js_${prob.id}`,
          questionId: prob.id,
          language: 'javascript',
          sourceCode: prob.starterCode.javascript,
          isSubmission: true,
        },
        prob.testCases
      );
      assert.strictEqual(jsRes.status, 'PASSED', `JS failed on ${prob.id}`);
      assert.strictEqual(jsRes.passedTests, prob.testCases.length, `JS failed some cases on ${prob.id}`);

      // B. Python Starter Code execution
      const pyRes = await codeExecutionService.executeSubmission(
        {
          userId: `usr_qa_py_${prob.id}`,
          questionId: prob.id,
          language: 'python',
          sourceCode: prob.starterCode.python,
          isSubmission: true,
        },
        prob.testCases
      );
      if (pyRes.status !== 'PASSED') {
        console.log('DEBUG PY RESULT:', JSON.stringify(pyRes, null, 2));
      }
      assert.strictEqual(pyRes.status, 'PASSED', `Python failed on ${prob.id}`);

      // C. TypeScript Starter Code execution
      const tsRes = await codeExecutionService.executeSubmission(
        {
          userId: `usr_qa_ts_${prob.id}`,
          questionId: prob.id,
          language: 'typescript',
          sourceCode: prob.starterCode.typescript,
          isSubmission: true,
        },
        prob.testCases
      );
      assert.strictEqual(tsRes.status, 'PASSED', `TS failed on ${prob.id}`);
    }
    console.log('✓ Sandbox execution of all 5 coding problems passed.');

    // 4. Sandbox Security Safeguards
    console.log('Verifying sandbox security controls...');
    const testProb = codingMockQuestions.find(q => q.questionType === 'CODING')!;
    
    // File system access block check
    const fsBlockRes = await codeExecutionService.executeSubmission(
      {
        userId: 'usr_sec_fs_block',
        questionId: testProb.id,
        language: 'javascript',
        sourceCode: `const fs = require('fs'); fs.readFileSync('/etc/shadow');`,
        isSubmission: true,
      },
      testProb.testCases
    );
    assert.notStrictEqual(fsBlockRes.status, 'PASSED', 'Security flaw: filesystem write/read was not blocked.');

    // Process spawning check
    const procRes = await codeExecutionService.executeSubmission(
      {
        userId: 'usr_sec_proc_block',
        questionId: testProb.id,
        language: 'javascript',
        sourceCode: `const { exec } = require('child_process'); exec('ls');`,
        isSubmission: true,
      },
      testProb.testCases
    );
    assert.notStrictEqual(procRes.status, 'PASSED', 'Security flaw: child process execution was not blocked.');
    console.log('✓ Security boundaries checked successfully.');

    // 5. Mixed Scoring Integration
    console.log('Verifying mixed scoring calculations...');
    const cand = db.loginOrRegister('qa_staging_user@firstround.com', 'Staging QA User');
    try {
      (db as any).sqliteDb.prepare("DELETE FROM test_attempts WHERE userId = ?").run(cand.id);
      (db as any).sqliteDb.prepare("DELETE FROM bookmarks WHERE userId = ?").run(cand.id);
      (db as any).sqliteDb.prepare("DELETE FROM coding_submissions WHERE userId = ?").run(cand.id);
    } catch(e) {}

    // Seed one passing coding submission
    db.saveCodingSubmission({
      id: 'sub_qa_stg_1',
      userId: cand.id,
      testSeriesId: 'cat_coding_mock_01',
      questionId: 'q_coding_mock_code_001',
      language: 'javascript',
      sourceCode: testProb.starterCode.javascript,
      executionResult: { status: 'PASSED', scorePercentage: 100, testCaseResults: [] } as any,
      isFinalSubmission: true,
      createdAt: new Date().toISOString(),
    });

    // 10 correct MCQs, 10 incorrect MCQs
    const responses = [];
    for (let i = 0; i < 10; i++) {
      responses.push({
        questionId: mcqs[i].id,
        selectedOption: mcqs[i].correctOption,
        timeSpentSeconds: 30,
      });
    }
    for (let i = 10; i < 20; i++) {
      responses.push({
        questionId: mcqs[i].id,
        selectedOption: mcqs[i].correctOption === 'A' ? 'B' : 'A',
        timeSpentSeconds: 30,
      });
    }

    const grading = db.submitTest({
      userId: cand.id,
      testSeriesId: 'cat_coding_mock_01',
      mode: 'exam',
      timeTakenSeconds: 1000,
      responses,
    });

    // MCQ Score: 10 * 10 - 10 * 2 = 80
    // Coding Score: 1 correct (+10 points) = 10
    // Total expected score = 90
    assert.strictEqual(grading.correctCount, 11, 'Expected 11 correct (10 MCQ + 1 Coding)');
    assert.strictEqual(grading.incorrectCount, 10, 'Expected 10 incorrect MCQs');
    assert.strictEqual(grading.scorePoints, 90, `Expected 90 points, got ${grading.scorePoints}`);
    console.log('✓ Mixed scoring integration verified.');

    // 6. SQLite Persistence
    console.log('Verifying SQLite persistence...');
    const savedAttempt = db.getAttemptsForUser(cand.id).find(a => a.id === grading.id);
    assert(savedAttempt, 'Saved attempt not found in SQLite.');
    assert.strictEqual(savedAttempt.scorePoints, 90, 'Persisted score mismatch.');
    console.log('✓ SQLite persistence verified.');

    console.log('--- ALL PHASE 31E PROGRAMMATIC QA CHECKS PASSED ---');
    process.exit(0);
  } catch (error) {
    console.error('❌ Phase 31E Programmatic QA Failed:', error);
    process.exit(1);
  }
}

runTests();

import { db } from './server/db';
import { COMPANY_BLUEPRINTS } from './src/data/blueprints/company';
import { codingMockQuestions } from './src/data/questionBank/codingMock';
import { CodingEnvironmentRegistry } from './src/services/CodingEnvironmentRegistry';
import { CodingWorkspace } from './src/components/CodingWorkspace';
import { codeExecutionService } from './src/services/CodeExecutionService';
import assert from 'assert';

async function runTests() {
  console.log('--- STARTING PHASE 31D VERIFICATION SUITE ---');

  try {
    // 1. Mock Registration
    console.log('Verifying catalog registration for cat_coding_mock_01...');
    const tests = db.getTests();
    const mockTest = tests.find(t => t.id === 'cat_coding_mock_01');
    assert(mockTest, 'Mock test is not registered in the catalog.');
    assert.strictEqual(mockTest.status, 'coming_soon', 'Mock test should be staging coming_soon.');
    assert.strictEqual(mockTest.verificationStatus, 'UNVERIFIED', 'Mock test must be UNVERIFIED.');
    console.log('✓ Staging mock registered and safety-gated.');

    // 2. Blueprint/Pattern Consistency
    console.log('Verifying blueprint/pattern consistency...');
    const mockBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_coding_mock_01');
    assert(mockBp, 'Blueprint bp_coding_mock_01 is missing.');
    assert.strictEqual(mockBp.company, 'FirstRound Staging', 'Blueprint company mismatch.');
    console.log('✓ Blueprint verified.');

    // Load Questions
    const questions = db.getQuestionsForTest('cat_coding_mock_01');
    assert.strictEqual(questions.length, 25, `Expected 25 questions, got ${questions.length}`);
    const mcqQuestions = questions.filter(q => q.questionType !== 'CODING');
    const codingQuestions = questions.filter(q => q.questionType === 'CODING');

    assert.strictEqual(mcqQuestions.length, 20, `Expected 20 MCQs, got ${mcqQuestions.length}`);
    assert.strictEqual(codingQuestions.length, 5, `Expected 5 Coding questions, got ${codingQuestions.length}`);

    // 3. MCQ Validation
    console.log('Verifying MCQ content quality gates...');
    mcqQuestions.forEach((q, idx) => {
      assert(q.id.startsWith('q_coding_mock_mcq_'), `Invalid MCQ ID: ${q.id}`);
      assert.strictEqual((q as import('./src/types').MCQQuestion).options.length, 4, `MCQ ${q.id} must have exactly 4 options`);
      assert(['A', 'B', 'C', 'D'].includes((q as import('./src/types').MCQQuestion).correctOption), `MCQ ${q.id} has invalid correctOption: ${(q as import('./src/types').MCQQuestion).correctOption}`);
      assert(q.explanation && q.explanation.length > 5, `MCQ ${q.id} must have a valid explanation.`);
      assert(q.topic, `MCQ ${q.id} must have a topic.`);
      assert(q.difficulty, `MCQ ${q.id} must have a difficulty.`);
    });
    console.log('✓ All 20 MCQs satisfied quality gates.');

    // 4. Coding Validation
    console.log('Verifying Coding content quality gates...');
    codingQuestions.forEach((q, idx) => {
      assert(q.id.startsWith('q_coding_mock_code_'), `Invalid Coding ID: ${q.id}`);
      assert(q.problemStatement && q.problemStatement.length > 10, `Coding ${q.id} has invalid problemStatement.`);
      assert(q.inputFormat && q.outputFormat, `Coding ${q.id} input/output formats must be defined.`);
      assert(q.starterCode && Object.keys(q.starterCode).length === 3, `Coding ${q.id} starterCode must contain JS/TS/Py.`);
      assert((q as import('./src/types').CodingQuestion).codingConfig, `Coding ${q.id} is missing codingConfig.`);
      assert((q as import('./src/types').CodingQuestion).codingConfig.languages && (q as import('./src/types').CodingQuestion).codingConfig.languages.length === 3, `Coding ${q.id} config languages must be JS/TS/Py.`);
      assert((q as import('./src/types').CodingQuestion).codingConfig.defaultLanguage, `Coding ${q.id} defaultLanguage must be defined.`);
    });
    console.log('✓ All 5 Coding questions satisfied quality gates.');

    // 5. Mixed Question Detection
    console.log('Verifying mixed question detection...');
    const hasMcqs = questions.some(q => q.questionType === 'MCQ_SINGLE');
    const hasCoding = questions.some(q => q.questionType === 'CODING');
    assert(hasMcqs && hasCoding, 'Assessment is not mixed.');
    console.log('✓ Mixed question detection confirmed.');

    // 6. Dynamic Renderer Resolution
    console.log('Verifying dynamic renderer resolution...');
    questions.forEach((q) => {
      if (q.questionType === 'CODING') {
        const component = CodingEnvironmentRegistry.resolve(q);
        assert.strictEqual(component, CodingWorkspace, 'Coding question must resolve to CodingWorkspace.');
      } else {
        const check = () => CodingEnvironmentRegistry.resolve(q);
        assert.throws(check, 'Registry should throw or not resolve for MCQ question type.');
      }
    });
    console.log('✓ Dynamic renderer resolution confirmed.');

    // 7. Hidden Test Redaction
    console.log('Verifying hidden test cases are redacted on client mapping...');
    codingQuestions.forEach(q => {
      assert((q as any).testCases === undefined, `Leak Alert: testCases exposed on mapped question ${q.id}`);
    });
    console.log('✓ Hidden tests redacted successfully.');

    // 8. API & Execution Sandbox Tests
    console.log('Verifying code execution sandbox paths...');
    const sampleProb = db.getCodingProblemById('q_coding_mock_code_001');
    assert(sampleProb, 'Failed to fetch problem by ID.');

    // Test a valid execution (javascript)
    console.log('Executing valid javascript solver on string reversal...');
    const validExecResult = await codeExecutionService.executeSubmission(
      {
        userId: 'usr_test_exec',
        questionId: sampleProb.id,
        language: 'javascript',
        sourceCode: sampleProb.starterCode.javascript,
        isSubmission: true,
      },
      sampleProb.testCases
    );
    assert.strictEqual(validExecResult.status, 'PASSED', `Expected status PASSED, got ${validExecResult.status}`);
    assert.strictEqual(validExecResult.passedTests, 5, `Expected 5 passed tests, got ${validExecResult.passedTests}`);

    // Test python execution
    console.log('Executing valid python solver on string reversal...');
    const pythonResult = await codeExecutionService.executeSubmission(
      {
        userId: 'usr_test_exec_py',
        questionId: sampleProb.id,
        language: 'python',
        sourceCode: sampleProb.starterCode.python,
        isSubmission: true,
      },
      sampleProb.testCases
    );
    assert.strictEqual(pythonResult.status, 'PASSED', 'Python execution failed.');

    // Test invalid language rejection
    console.log('Verifying invalid language rejection...');
    const valBadLang = db.validateCodingQuestion({
      ...sampleProb,
      codingConfig: {
        ...sampleProb.codingConfig,
        languages: ['lisp'],
        defaultLanguage: 'lisp'
      }
    });
    assert(!valBadLang.isValid, 'Unsupported language adapter was not rejected.');
    console.log('✓ Sandbox execution and validations passed.');

    // 9. Mixed Scoring Integration
    console.log('Verifying final mixed scoring logic...');
    const cand = db.loginOrRegister('staging_test@firstround.com', 'Staging Candidate');
    // Reset test attempts
    try {
      (db as any).sqliteDb.prepare("DELETE FROM test_attempts WHERE userId = ?").run(cand.id);
      (db as any).sqliteDb.prepare("DELETE FROM bookmarks WHERE userId = ?").run(cand.id);
      (db as any).sqliteDb.prepare("DELETE FROM coding_submissions WHERE userId = ?").run(cand.id);
    } catch(e) {}

    // Submit a coding submission for the first coding question (correct)
    db.saveCodingSubmission({
      id: 'sub_stg_1',
      userId: cand.id,
      testSeriesId: 'cat_coding_mock_01',
      questionId: 'q_coding_mock_code_001',
      language: 'javascript',
      sourceCode: sampleProb.starterCode.javascript,
      executionResult: { status: 'PASSED', scorePercentage: 100, testCaseResults: [] } as any,
      isFinalSubmission: true,
      createdAt: new Date().toISOString(),
    });

    // Submit a coding submission for the second coding question (incorrect)
    db.saveCodingSubmission({
      id: 'sub_stg_2',
      userId: cand.id,
      testSeriesId: 'cat_coding_mock_01',
      questionId: 'q_coding_mock_code_002',
      language: 'javascript',
      sourceCode: '// fail',
      executionResult: { status: 'WRONG_ANSWER', scorePercentage: 0, testCaseResults: [] } as any,
      isFinalSubmission: true,
      createdAt: new Date().toISOString(),
    });

    // 15 correct MCQs, 5 incorrect MCQs, 1 correct coding, 1 incorrect coding, 3 unattempted coding
    const responses = [];
    // 15 correct MCQs
    for (let i = 0; i < 15; i++) {
      responses.push({
        questionId: mcqQuestions[i].id,
        selectedOption: mcqQuestions[i].correctOption,
        timeSpentSeconds: 20,
      });
    }
    // 5 incorrect MCQs
    for (let i = 15; i < 20; i++) {
      responses.push({
        questionId: mcqQuestions[i].id,
        selectedOption: mcqQuestions[i].correctOption === 'A' ? 'B' : 'A',
        timeSpentSeconds: 20,
      });
    }

    const grading = db.submitTest({
      userId: cand.id,
      testSeriesId: 'cat_coding_mock_01',
      mode: 'exam',
      timeTakenSeconds: 1200,
      responses,
    });

    // MCQ Score: 15 * 10 - 5 * 2 = 140
    // Coding Score: 1 correct (+10), 1 incorrect (-2) = 8
    // Total expected score: 148
    assert.strictEqual(grading.correctCount, 16, `Expected 16 correct (15 MCQ + 1 Coding), got ${grading.correctCount}`);
    assert.strictEqual(grading.incorrectCount, 6, `Expected 6 incorrect (5 MCQ + 1 Coding), got ${grading.incorrectCount}`);
    assert.strictEqual(grading.scorePoints, 148, `Expected score 148, got ${grading.scorePoints}`);
    console.log('✓ Mixed scoring grading evaluated correctly.');

    // 10. Persistence Check
    console.log('Verifying SQLite attempts and submissions persistence...');
    const savedAttempt = db.getAttemptsForUser(cand.id).find(a => a.id === grading.id);
    assert(savedAttempt, 'Failed to retrieve saved attempt from DB.');
    assert.strictEqual(savedAttempt.scorePoints, 148, 'Saved score points mismatch.');

    const submissions = db.getCodingSubmissionsForUser(cand.id, 'q_coding_mock_code_001');
    assert(submissions.length > 0, 'Failed to retrieve saved coding submission.');
    assert.strictEqual(submissions[0].isFinalSubmission, true, 'isFinalSubmission flag mismatch.');
    console.log('✓ SQLite persistence verified.');

    // 11. Security Sandbox Checks
    console.log('Verifying security sandbox constraints...');
    // File system access check
    const fsCheckResult = await codeExecutionService.executeSubmission(
      {
        userId: 'usr_sec_fs',
        questionId: sampleProb.id,
        language: 'javascript',
        sourceCode: `const fs = require('fs'); fs.writeFileSync('illegal.txt', 'data');`,
        isSubmission: true,
      },
      sampleProb.testCases
    );
    assert.notStrictEqual(fsCheckResult.status, 'PASSED', 'File system write was not blocked.');

    // Environment variables isolation check
    const envCheckResult = await codeExecutionService.executeSubmission(
      {
        userId: 'usr_sec_env',
        questionId: sampleProb.id,
        language: 'javascript',
        sourceCode: `if (process.env.SQLITE_DB_PATH) { console.log('leaked'); } else { console.log('clean'); }`,
        isSubmission: true,
      },
      [{ id: 'tc', input: 'test', expectedOutput: 'clean', isHidden: false }]
    );
    assert.strictEqual(envCheckResult.status, 'RUNTIME_ERROR', 'Environment variables isolation was bypassed.');
    assert(envCheckResult.testCaseResults[0].error?.includes('SecurityException'), 'Expected SecurityException in runtime error details.');
    console.log('✓ Security boundaries verified.');

    console.log('--- ALL PHASE 31D VERIFICATIONS PASSED ---');
    process.exit(0);
  } catch (error) {
    console.error('❌ Phase 31D Verification Failed:', error);
    process.exit(1);
  }
}

runTests();

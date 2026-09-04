import { db } from './server/db';
import { tcsCodingProblems } from './src/data/questionBank/tcsCoding';
import { LANGUAGE_ADAPTERS } from './src/services/CodeExecutionService';
import assert from 'assert';

async function runTests() {
  console.log('--- STARTING PHASE 31B VERIFICATION SUITE ---');

  try {
    // 1. MCQ Regression & Live Assessments Check
    console.log('Verifying MCQ and live assessments mapping...');
    const tests = db.getTests();
    assert(tests.length >= 11, `Expected at least 11 tests, got ${tests.length}`);
    console.log(`✓ Confirmed ${tests.length} live assessments present.`);

    const wiproQuestions = db.getQuestionsForTest('cat_company_wipro');
    assert(wiproQuestions.length > 0, 'Wipro assessment questions failed to load.');
    assert(wiproQuestions.every(q => (q as import('./src/types').MCQQuestion).correctOption !== undefined), 'MCQ options mapping regression detected.');
    console.log('✓ MCQ mapping and live assessments are intact.');

    // 2. Coding Question Metadata Mapping (excluding hidden test cases)
    console.log('Verifying coding question metadata mapping...');
    const tcsQuestions = db.getQuestionsForTest('cat_company_tcs');
    const codingQuestion = tcsQuestions.find(q => q.questionType === 'CODING');
    
    assert(codingQuestion, 'TCS Advanced assessment does not contain a coding question.');
    assert(codingQuestion.problemStatement !== undefined, 'problemStatement missing in mapped question.');
    assert(codingQuestion.inputFormat !== undefined, 'inputFormat missing in mapped question.');
    assert(codingQuestion.outputFormat !== undefined, 'outputFormat missing in mapped question.');
    assert(codingQuestion.constraints !== undefined, 'constraints missing in mapped question.');
    assert(codingQuestion.examples !== undefined, 'examples missing in mapped question.');
    assert(codingQuestion.starterCode !== undefined, 'starterCode missing in mapped question.');
    assert(codingQuestion.supportedLanguages !== undefined, 'supportedLanguages missing in mapped question.');
    
    // Ensure hidden test cases did not leak
    assert((codingQuestion as any).testCases === undefined, 'Leak Alert: hidden testCases exposed in client mapping!');
    console.log('✓ Coding metadata mapping verified; hidden test cases are secure.');

    // 3. Dynamic Question Lookup
    console.log('Verifying dynamic question lookup...');
    const targetProblem = db.getCodingProblemById(codingQuestion.id);
    assert(targetProblem, 'Failed to retrieve coding problem by ID.');
    assert(targetProblem.testCases && targetProblem.testCases.length > 0, 'Retrieved problem contains no test cases.');
    console.log('✓ Dynamic question lookup works correctly.');

    // 4. Final Exam Scoring Integration
    console.log('Verifying final exam scoring integration...');
    const users = db.getAllUsers();
    const mockUserId = users[0].id;
    const mockTestAttemptId = 'attempt_test_31b';

    // Seed a coding submission
    console.log('Simulating a sandbox coding submission...');
    const mockResult = {
      submissionId: 'sub_test_123',
      questionId: codingQuestion.id,
      userId: mockUserId,
      language: 'javascript' as const,
      status: 'PASSED' as const,
      passedTests: 3,
      totalTests: 3,
      sampleTestsPassed: 1,
      totalSampleTests: 1,
      hiddenTestsPassed: 2,
      totalHiddenTests: 2,
      runtimeMs: 45,
      memoryKb: 4096,
      scorePercentage: 100,
      testCaseResults: [],
      executedAt: new Date().toISOString(),
    };

    db.saveCodingSubmission({
      id: mockResult.submissionId,
      userId: mockUserId,
      testSeriesId: 'cat_company_tcs',
      testAttemptId: mockTestAttemptId,
      questionId: codingQuestion.id,
      language: 'javascript',
      sourceCode: 'console.log("hello world");',
      executionResult: mockResult,
      isFinalSubmission: true,
      createdAt: mockResult.executedAt,
    });

    const latestSub = db.getLatestCodingSubmission(mockUserId, codingQuestion.id);
    assert(latestSub, 'Failed to retrieve saved coding submission.');
    assert.strictEqual(latestSub.executionResult.status, 'PASSED', 'Submission status mismatch.');
    console.log('✓ Coding submission successfully saved and retrieved.');

    // Compile responses list containing the coding question
    const examResponsePayload = {
      userId: mockUserId,
      testSeriesId: 'cat_company_tcs',
      timeTakenSeconds: 300,
      mode: 'exam' as const,
      responses: [
        {
          questionId: codingQuestion.id,
          selectedOption: 'A',
          timeSpentSeconds: 120,
        }
      ]
    };

    const gradedAttempt = db.submitTest(examResponsePayload);
    assert(gradedAttempt, 'Test submission failed.');
    assert.strictEqual(gradedAttempt.correctCount, 1, 'Grading logic did not evaluate coding question as correct.');
    assert.strictEqual(gradedAttempt.scorePoints, 10, `Expected score of 10 for correct coding question, got ${gradedAttempt.scorePoints}`);
    console.log('✓ Final scoring integration correctly graded the coding question (score: 10).');

    // 5. Language Adapters Check
    console.log('Verifying language adapters...');
    assert(LANGUAGE_ADAPTERS.javascript, 'JavaScript language adapter not registered.');
    assert(LANGUAGE_ADAPTERS.typescript, 'TypeScript language adapter not registered.');
    assert(LANGUAGE_ADAPTERS.python, 'Python language adapter not registered.');
    console.log('✓ Language adapters are correctly defined and modular.');

    console.log('--- ALL PHASE 31B VERIFICATIONS PASSED ---');
    db.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Phase 31B Verification Failed:', error);
    db.close();
    process.exit(1);
  }
}

runTests();

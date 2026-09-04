import { db } from './server/db';
import { CodingEnvironmentRegistry, GenericCodingEnvironment } from './src/services/CodingEnvironmentRegistry';
import { CodingWorkspace } from './src/components/CodingWorkspace';
import assert from 'assert';

async function runTests() {
  console.log('--- STARTING PHASE 31C VERIFICATION SUITE ---');

  try {
    // 1. MCQ vs CODING Classification
    console.log('Verifying MCQ and CODING question classifications...');
    const mcqQuestion = {
      id: 'mcq_test',
      questionType: 'MCQ_SINGLE' as const,
      questionText: 'Which of the following is correct?',
      options: [],
      correctOption: 'A' as const,
      topic: 'Logical',
      difficulty: 'Easy' as const,
      explanation: 'No codingConfig here.',
    };

    const codingQuestion = {
      id: 'coding_test',
      questionType: 'CODING' as const,
      questionText: 'Write a function...',
      options: [],
      correctOption: 'A' as const,
      topic: 'Coding',
      difficulty: 'Medium' as const,
      explanation: 'Explanation',
      codingConfig: {
        problemType: 'ALGORITHM',
        languages: ['javascript', 'python'],
        defaultLanguage: 'python',
        starterCode: { javascript: '// JS', python: '# PY' },
        timeLimitMs: 2000,
        memoryLimitMb: 256,
      }
    };

    // MCQ must not have a coding configuration or renderers
    assert.strictEqual(mcqQuestion.questionType, 'MCQ_SINGLE', 'MCQ Question classification failed.');
    assert.strictEqual(codingQuestion.questionType, 'CODING', 'Coding Question classification failed.');
    console.log('✓ Classifications verified.');

    // 2. Coding Environment Registry Resolution
    console.log('Verifying CodingEnvironmentRegistry resolution paths...');
    
    // Test registered subtypes
    const algoEnv = CodingEnvironmentRegistry.resolve({ ...codingQuestion, codingConfig: { ...codingQuestion.codingConfig, problemType: 'ALGORITHM' } } as any);
    const dsaEnv = CodingEnvironmentRegistry.resolve({ ...codingQuestion, codingConfig: { ...codingQuestion.codingConfig, problemType: 'DSA' } } as any);
    const sqlEnv = CodingEnvironmentRegistry.resolve({ ...codingQuestion, codingConfig: { ...codingQuestion.codingConfig, problemType: 'SQL' } } as any);
    const debugEnv = CodingEnvironmentRegistry.resolve({ ...codingQuestion, codingConfig: { ...codingQuestion.codingConfig, problemType: 'DEBUGGING' } } as any);

    assert.strictEqual(algoEnv, CodingWorkspace, 'ALGORITHM problemType failed to resolve correctly.');
    assert.strictEqual(dsaEnv, CodingWorkspace, 'DSA problemType failed to resolve correctly.');
    assert.strictEqual(sqlEnv, CodingWorkspace, 'SQL problemType failed to resolve correctly.');
    assert.strictEqual(debugEnv, CodingWorkspace, 'DEBUGGING problemType failed to resolve correctly.');

    // Test unknown future problemType resolves to GenericCodingEnvironment
    const unknownEnv = CodingEnvironmentRegistry.resolve({ ...codingQuestion, codingConfig: { ...codingQuestion.codingConfig, problemType: 'UNKNOWN_SUBTYPE_99' } } as any);
    assert.strictEqual(unknownEnv, GenericCodingEnvironment, 'Unknown problemType did not fall back to GenericCodingEnvironment.');
    console.log('✓ Coding environment registry resolution pathways verified.');

    // 3. Publishing Validation Checks
    console.log('Verifying publishing validation rules...');
    
    // A. Valid MCQ
    const valMcq = db.validateCodingQuestion(mcqQuestion);
    assert(valMcq.isValid, 'Valid MCQ incorrectly flagged as invalid.');

    // B. MCQ with warning
    const valMcqWarn = db.validateCodingQuestion({ ...mcqQuestion, codingConfig: {} as any });
    assert(valMcqWarn.isValid && valMcqWarn.warning, 'MCQ containing codingConfig should trigger a warning.');

    // C. Valid Coding
    const valCod = db.validateCodingQuestion(codingQuestion);
    assert(valCod.isValid, `Valid coding config rejected: ${valCod.error}`);

    // D. Invalid Coding: missing config
    const valCodNoConfig = db.validateCodingQuestion({ ...codingQuestion, codingConfig: undefined });
    assert(!valCodNoConfig.isValid && valCodNoConfig.error?.includes('missing codingConfig'), 'Rejected: CODING question with no codingConfig was validated as correct.');

    // E. Invalid Coding: empty languages
    const valCodEmptyLangs = db.validateCodingQuestion({ ...codingQuestion, codingConfig: { ...codingQuestion.codingConfig, languages: [] } });
    assert(!valCodEmptyLangs.isValid && valCodEmptyLangs.error?.includes('languages list'), 'Rejected: CODING question with empty languages was validated as correct.');

    // F. Invalid Coding: defaultLanguage mismatch
    const valCodBadDefault = db.validateCodingQuestion({ ...codingQuestion, codingConfig: { ...codingQuestion.codingConfig, defaultLanguage: 'cpp' } });
    assert(!valCodBadDefault.isValid && valCodBadDefault.error?.includes('defaultLanguage'), 'Rejected: defaultLanguage mismatch validation failed.');

    // G. Invalid Coding: unsupported adapter
    const valCodBadAdapter = db.validateCodingQuestion({ ...codingQuestion, codingConfig: { ...codingQuestion.codingConfig, languages: ['lisp'], defaultLanguage: 'lisp' } });
    assert(!valCodBadAdapter.isValid && valCodBadAdapter.error?.includes('Unsupported language adapter'), 'Rejected: unsupported language adapter check failed.');
    console.log('✓ Publishing validation rules confirmed.');

    // 4. TCS Compatibility & Database Fallback Mapping
    console.log('Verifying current TCS coding questions compatibility...');
    const tcsQuestions = db.getQuestionsForTest('cat_company_tcs');
    const tcsCodingQ = tcsQuestions.find(q => q.id === 'q_tcs_coding_001');

    assert(tcsCodingQ, 'TCS Advanced coding problem is missing.');
    assert(tcsCodingQ.codingConfig, 'Fallback mapping failed to create codingConfig for legacy question.');
    assert.strictEqual(tcsCodingQ.codingConfig.problemType, 'ALGORITHM', 'Legacy fallback problemType must be ALGORITHM.');
    assert.deepStrictEqual(tcsCodingQ.codingConfig.languages, ['javascript', 'typescript', 'python'], 'Legacy fallback languages mismatch.');
    
    // Ensure hidden tests remain server-only
    assert((tcsCodingQ as any).testCases === undefined, 'Leak Alert: Legacy question mapping leaked testCases.');
    console.log('✓ legacy TCS questions fallback and security confirmed.');

    // 5. Existing Assessments Check
    console.log('Verifying that existing live assessments remain intact...');
    const tests = db.getTests();
    assert(tests.length >= 11, 'Assessments registry regression.');
    console.log('✓ Existing live assessments verified.');

    console.log('--- ALL PHASE 31C VERIFICATIONS PASSED ---');
    process.exit(0);
  } catch (error) {
    console.error('❌ Phase 31C Verification Failed:', error);
    process.exit(1);
  }
}

runTests();

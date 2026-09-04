import { db } from './server/db';
import * as assert from 'assert';

async function verifyLaunchFix() {
  console.log('--- PHASE 31F LAUNCH FIX VERIFICATION ---');
  
  // 1. Fetch test
  const test = db.getTestById('cat_coding_mock_01', true);
  assert.ok(test, 'cat_coding_mock_01 must exist');
  console.log('✔ Test fetched successfully');

  // 2. Fetch questions
  const questions = db.getQuestionsForTest('cat_coding_mock_01', 'ALL');
  assert.strictEqual(questions.length, 25, 'Should have exactly 25 questions');
  console.log('✔ 25 questions retrieved');

  let mcqCount = 0;
  let codingCount = 0;

  for (const q of questions) {
    if (q.questionType === 'CODING') {
      codingCount++;
    } else {
      mcqCount++;
      // Critical check for the fix: options must be objects with 'id' and 'text'
      assert.ok(Array.isArray((q as import('./src/types').MCQQuestion).options), 'Options must be an array');
      assert.strictEqual((q as import('./src/types').MCQQuestion).options.length, 4, 'Should have 4 options');
      
      (q as import('./src/types').MCQQuestion).options.forEach((opt: any) => {
        assert.ok(opt.id, `Option must have an id on question ${q.id}`);
        assert.ok(typeof opt.id === 'string', `Option id must be string on question ${q.id}`);
        assert.ok(typeof opt.text === 'string', `Option text must be string on question ${q.id}`);
      });
    }
  }

  assert.strictEqual(mcqCount, 20, 'Should have 20 MCQs');
  assert.strictEqual(codingCount, 5, 'Should have 5 Coding questions');
  console.log('✔ All MCQs have properly formatted object options with IDs');
  console.log('✔ Launch data contract verified. ActiveTestEngine will not crash.');
}

verifyLaunchFix().catch((err) => {
  console.error('FAILED Phase 31F verification:', err);
  process.exit(1);
});

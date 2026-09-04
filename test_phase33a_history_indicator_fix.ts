import assert from 'assert';

async function runTest() {
  console.log('--- Starting Phase 33A.1 History Indicator Fix Test ---');
  const PORT = process.env.PORT || 3000;
  const baseUrl = `http://localhost:${PORT}`;
  
  const userIdA = 'test_user_A_' + Date.now();
  const userIdB = 'test_user_B_' + Date.now();
  const testId = 'cat_dsa_01'; // Known catalogue test

  try {
    // 1. Log a visit for User A
    console.log(`[1] User A (${userIdA}) visits test ${testId}`);
    const visitRes = await fetch(`${baseUrl}/api/tests/history/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userIdA, testId })
    });
    assert.strictEqual(visitRes.ok, true, 'Visit endpoint should return 200 OK');

    // 2. Verify VISITED state for User A
    console.log(`[2] Verifying VISITED state for User A`);
    const historyResA1 = await fetch(`${baseUrl}/api/tests/history?userId=${userIdA}`);
    const historyDataA1 = await historyResA1.json();
    assert.strictEqual(historyDataA1.success, true);
    
    const recordA1 = historyDataA1.history.find((h: any) => h.testId === testId);
    assert.ok(recordA1, 'History record should exist for User A');
    assert.strictEqual(recordA1.status, 'VISITED', 'Status should be VISITED');

    // 3. Verify NO history for User B
    console.log(`[3] Verifying no history leak to User B (${userIdB})`);
    const historyResB1 = await fetch(`${baseUrl}/api/tests/history?userId=${userIdB}`);
    const historyDataB1 = await historyResB1.json();
    const recordB1 = historyDataB1.history.find((h: any) => h.testId === testId);
    assert.strictEqual(recordB1, undefined, 'User B should not have history for this test');

    // 4. Submit test for User A
    console.log(`[4] User A completes the test ${testId}`);
    const submitRes = await fetch(`${baseUrl}/api/tests/${testId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userIdA,
        mode: 'exam',
        timeTakenSeconds: 10,
        responses: []
      })
    });
    assert.strictEqual(submitRes.ok, true, 'Submit endpoint should return 200 OK');

    // 5. Verify COMPLETED state for User A
    console.log(`[5] Verifying COMPLETED state for User A`);
    const historyResA2 = await fetch(`${baseUrl}/api/tests/history?userId=${userIdA}`);
    const historyDataA2 = await historyResA2.json();
    const recordA2 = historyDataA2.history.find((h: any) => h.testId === testId);
    assert.ok(recordA2, 'History record should exist for User A');
    assert.strictEqual(recordA2.status, 'COMPLETED', 'Status should be COMPLETED after submission');

    console.log('✅ ALL TESTS PASSED. The history architecture and candidate isolation work correctly.');
  } catch (error) {
    console.error('❌ TEST FAILED:', error);
    process.exit(1);
  }
}

runTest();

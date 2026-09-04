const Database = require('better-sqlite3');
const db = new Database('./firstround.db');

// Force WAL checkpoint
db.pragma('wal_checkpoint(FULL)');

console.log('=== test_user_history after checkpoint ===');
const history = db.prepare('SELECT * FROM test_user_history').all();
console.log(JSON.stringify(history, null, 2));
console.log('Row count:', history.length);

// Also try to manually insert and see if it works
console.log('\n=== Testing manual insert ===');
try {
  db.prepare(`
    INSERT OR REPLACE INTO test_user_history 
    (userId, testId, status, firstVisitedAt, lastVisitedAt, attemptCount, bestScore, lastScore) 
    VALUES ('test_debug_user', 'cat_company_tcs', 'COMPLETED', '2026-09-01', '2026-09-01', 1, 10, 10)
  `).run();
  const inserted = db.prepare('SELECT * FROM test_user_history WHERE userId = ?').all('test_debug_user');
  console.log('Insert succeeded:', JSON.stringify(inserted, null, 2));
  
  // Clean up
  db.prepare('DELETE FROM test_user_history WHERE userId = ?').run('test_debug_user');
  console.log('Cleanup done');
} catch (e) {
  console.error('Insert failed:', e.message);
}

db.close();

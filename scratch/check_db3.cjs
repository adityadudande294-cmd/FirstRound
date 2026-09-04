const Database = require('better-sqlite3');
const db = new Database('./firstround.db');
db.pragma('foreign_keys = ON');

// Check if the user from the latest attempt exists
const latestAttempt = db.prepare('SELECT userId, testSeriesId FROM test_attempts ORDER BY submittedAt DESC LIMIT 1').get();
console.log('Latest attempt:', JSON.stringify(latestAttempt));

if (latestAttempt) {
  const user = db.prepare('SELECT id, email, name FROM users WHERE id = ?').get(latestAttempt.userId);
  console.log('User found:', JSON.stringify(user));
  
  if (user) {
    // Try the actual upsert operation
    console.log('\n=== Testing upsert with real user ===');
    try {
      const now = new Date().toISOString();
      const existing = db.prepare('SELECT * FROM test_user_history WHERE userId = ? AND testId = ?').get(user.id, latestAttempt.testSeriesId);
      console.log('Existing history:', existing);
      
      if (!existing) {
        console.log('Inserting new history row...');
        db.prepare(`
          INSERT INTO test_user_history 
          (userId, testId, status, firstVisitedAt, lastVisitedAt, attemptCount, bestScore, lastScore) 
          VALUES (?, ?, 'COMPLETED', ?, ?, 1, 10, 10)
        `).run(user.id, latestAttempt.testSeriesId, now, now);
        console.log('Insert succeeded!');
        
        // Verify
        const inserted = db.prepare('SELECT * FROM test_user_history WHERE userId = ?').all(user.id);
        console.log('Inserted rows:', JSON.stringify(inserted, null, 2));
        
        // Clean up debug row
        db.prepare('DELETE FROM test_user_history WHERE userId = ? AND testId = ?').run(user.id, latestAttempt.testSeriesId);
      }
    } catch(e) {
      console.error('ERROR:', e.message);
    }
  } else {
    console.log('User NOT found in users table. This is the FK violation cause.');
    
    // Check all userIds in test_attempts that DON'T match a user
    const orphans = db.prepare(`
      SELECT DISTINCT ta.userId 
      FROM test_attempts ta 
      LEFT JOIN users u ON ta.userId = u.id 
      WHERE u.id IS NULL
    `).all();
    console.log('Orphaned user IDs in test_attempts:', JSON.stringify(orphans));
  }
}

db.close();

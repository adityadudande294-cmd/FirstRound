const Database = require('better-sqlite3');
const db = new Database('./firstround.db');
db.pragma('foreign_keys = ON');

// Manually backfill test_user_history from test_attempts for existing users
console.log('=== Backfilling test_user_history from test_attempts ===');

const attempts = db.prepare(`
  SELECT ta.userId, ta.testSeriesId, ta.scorePoints, ta.submittedAt,
         u.id as validUserId
  FROM test_attempts ta
  INNER JOIN users u ON ta.userId = u.id
  ORDER BY ta.submittedAt ASC
`).all();

console.log(`Found ${attempts.length} valid attempts to process`);

let inserted = 0;
let updated = 0;

for (const att of attempts) {
  const existing = db.prepare('SELECT * FROM test_user_history WHERE userId = ? AND testId = ?').get(att.userId, att.testSeriesId);
  
  if (existing) {
    const bestScore = Math.max(existing.bestScore || 0, att.scorePoints);
    const attemptCount = (existing.attemptCount || 0) + 1;
    db.prepare(`
      UPDATE test_user_history 
      SET status = 'COMPLETED', lastAttemptAt = ?, attemptCount = ?, bestScore = ?, lastScore = ?
      WHERE userId = ? AND testId = ?
    `).run(att.submittedAt, attemptCount, bestScore, att.scorePoints, att.userId, att.testSeriesId);
    updated++;
  } else {
    db.prepare(`
      INSERT INTO test_user_history 
      (userId, testId, status, firstVisitedAt, lastVisitedAt, lastAttemptAt, attemptCount, bestScore, lastScore) 
      VALUES (?, ?, 'COMPLETED', ?, ?, ?, 1, ?, ?)
    `).run(att.userId, att.testSeriesId, att.submittedAt, att.submittedAt, att.submittedAt, att.scorePoints, att.scorePoints);
    inserted++;
  }
}

console.log(`Inserted ${inserted} new history rows, Updated ${updated} existing rows`);

// Verify
const history = db.prepare('SELECT * FROM test_user_history').all();
console.log('\n=== Final test_user_history ===');
console.log(JSON.stringify(history, null, 2));

db.close();

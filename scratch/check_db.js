const Database = require('better-sqlite3');
const db = new Database('./firstround.db', { readonly: true });

console.log('=== test_user_history ===');
const history = db.prepare('SELECT * FROM test_user_history').all();
console.log(JSON.stringify(history, null, 2));

console.log('\n=== users ===');
const users = db.prepare('SELECT id, email, name FROM users LIMIT 10').all();
console.log(JSON.stringify(users, null, 2));

console.log('\n=== test_attempts (last 5) ===');
const attempts = db.prepare('SELECT id, userId, testSeriesId, scorePoints, submittedAt FROM test_attempts ORDER BY submittedAt DESC LIMIT 5').all();
console.log(JSON.stringify(attempts, null, 2));

console.log('\n=== catalogue tests IDs ===');
const catTests = db.prepare("SELECT id FROM tests WHERE id LIKE 'cat_%'").all();
console.log(JSON.stringify(catTests.map(t => t.id), null, 2));

db.close();

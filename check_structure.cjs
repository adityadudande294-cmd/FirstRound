const { coreCsQuestions } = require('./dist/server.cjs').__esModule ? require('./dist/server.cjs') : require('./dist/server.cjs');
const { dsaQuestions } = require('./dist/server.cjs').__esModule ? require('./dist/server.cjs') : require('./dist/server.cjs');
const { codingMockQuestions } = require('./dist/server.cjs').__esModule ? require('./dist/server.cjs') : require('./dist/server.cjs');
const { outputDebugQuestions } = require('./dist/server.cjs').__esModule ? require('./dist/server.cjs') : require('./dist/server.cjs');
const { progFundamentalsQuestions } = require('./dist/server.cjs').__esModule ? require('./dist/server.cjs') : require('./dist/server.cjs');
const { sqlQuestions } = require('./dist/server.cjs').__esModule ? require('./dist/server.cjs') : require('./dist/server.cjs');

// Because server.cjs might not export these directly depending on index exports, let's just parse the TS files using regex or tsx.

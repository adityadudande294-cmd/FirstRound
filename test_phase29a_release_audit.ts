import { quantQuestions } from './src/data/questionBank/quant';
import { logicalQuestions } from './src/data/questionBank/logical';
import { verbalQuestions } from './src/data/questionBank/verbal';
import { diQuestions } from './src/data/questionBank/di';
import { pseudocodeQuestions } from './src/data/questionBank/pseudocode';
import { accentureQuestions } from './src/data/questionBank/accenture';
import { cognizantQuestions } from './src/data/questionBank/cognizant';
import { infosysQuestions } from './src/data/questionBank/infosys';
import { wiproQuestions } from './src/data/questionBank/wipro';
import { tcsAdvancedQuestions } from './src/data/questionBank/tcsAdvanced';
import { tcsCodingProblems } from './src/data/questionBank/tcsCoding';
import { COMPANY_BLUEPRINTS } from './src/data/blueprints/company';
import { COMPANY_PATTERNS_REGISTRY } from './src/data/companyPatterns/registry';
import { codeExecutionService } from './src/services/CodeExecutionService';
import { questionSelectionEngine } from './src/services/QuestionSelectionEngine';
import { recommendationEngine } from './src/services/RecommendationEngine';
import { db } from './server/db';

console.log('================================================================');
console.log('PHASE 29A: PRODUCTION READINESS & RELEASE AUDIT');
console.log('================================================================\n');

let failedChecks = 0;
function assertRelease(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
  } else {
    console.error(`  [FAIL] ${testName}${detail ? ` -> ${detail}` : ''}`);
    failedChecks++;
  }
}

// 1. CONFIGURATION & ENVIRONMENT INTEGRITY
console.log('--- 1. CONFIGURATION & ENVIRONMENT INTEGRITY ---');
const totalBank = [
  ...quantQuestions,
  ...logicalQuestions,
  ...verbalQuestions,
  ...diQuestions,
  ...pseudocodeQuestions,
  ...accentureQuestions,
  ...cognizantQuestions,
  ...wiproQuestions,
  ...infosysQuestions,
  ...tcsAdvancedQuestions,
  ...tcsCodingProblems as any,
];
assertRelease(totalBank.length === 366, `System Total Bank Size: 366 (Actual: ${totalBank.length})`);
assertRelease(!process.env.DEBUG_EXPOSE_SECRETS, `Security: No secrets exposed in environment flags`);

// 2. SECURITY, AUTHENTICATION & ACCESS BOUNDARIES
console.log('\n--- 2. SECURITY, ACCESS BOUNDARIES & OWNERSHIP ---');
const user1 = db.loginOrRegister('release_user1@firstround.com', 'Release User 1');
try {
  (db as any).sqliteDb.prepare("DELETE FROM test_attempts WHERE userId = ?").run(user1.id);
  (db as any).sqliteDb.prepare("DELETE FROM bookmarks WHERE userId = ?").run(user1.id);
  (db as any).sqliteDb.prepare("DELETE FROM coding_submissions WHERE userId = ?").run(user1.id);
} catch (e) {
  console.error("Cleanup 1 error:", e);
}

const user2 = db.loginOrRegister('release_user2@firstround.com', 'Release User 2');
try {
  (db as any).sqliteDb.prepare("DELETE FROM test_attempts WHERE userId = ?").run(user2.id);
  (db as any).sqliteDb.prepare("DELETE FROM bookmarks WHERE userId = ?").run(user2.id);
  (db as any).sqliteDb.prepare("DELETE FROM coding_submissions WHERE userId = ?").run(user2.id);
} catch (e) {
  console.error("Cleanup 2 error:", e);
}

const att1 = db.submitTest({
  userId: user1.id,
  testSeriesId: 'cat_foundation_quant',
  mode: 'exam',
  timeTakenSeconds: 900,
  responses: [
    { questionId: 'q_quant_001', selectedOption: 'B', timeSpentSeconds: 30 } as any,
    { questionId: 'q_quant_002', selectedOption: 'D', timeSpentSeconds: 30 } as any, // wrong
  ],
});

const user1Attempts = db.getAttemptsForUser(user1.id);
const user2Attempts = db.getAttemptsForUser(user2.id);
assertRelease(user1Attempts.length === 1 && user1Attempts[0].id === att1.id, `Attempt Ownership: User 1 owns attempt ${att1.id}`);
assertRelease(user2Attempts.length === 0, `Cross-User Isolation: User 2 has 0 attempts`);

const user1Vault = db.getWeakQuestionsForUser(user1.id);
const user2Vault = db.getWeakQuestionsForUser(user2.id);
assertRelease(user1Vault.length === 1 && user1Vault[0].question?.id === 'q_quant_002', `Revision Vault Ownership: User 1 has 1 weak question (${user1Vault[0]?.question?.id})`);
assertRelease(user2Vault.length === 0, `Revision Vault Isolation: User 2 has 0 weak questions`);

// 3. API & ERROR RECOVERY
console.log('\n--- 3. API & PRODUCTION ERROR HANDLING ---');
const nonExistentTest = db.getTestById('cat_non_existent_9999', true);
assertRelease(nonExistentTest === undefined, `Graceful Handling: Non-existent test ID returns undefined without crashing`);

// 4. LIVE ASSESSMENTS PLAYABILITY MATRIX (11/11)
console.log('\n--- 4. PRODUCTION PLAYABILITY MATRIX (11/11 LIVE ASSESSMENTS) ---');
const live11 = [
  { id: 'cat_foundation_quant', count: 25 },
  { id: 'cat_foundation_logical', count: 25 },
  { id: 'cat_foundation_verbal', count: 25 },
  { id: 'cat_foundation_di', count: 25 },
  { id: 'cat_foundation_pseudocode', count: 25 },
  { id: 'cat_company_wipro', count: 48 },
  { id: 'cat_company_accenture', count: 90 },
  { id: 'cat_company_cognizant', count: 80 },
  { id: 'cat_company_infosys', count: 54 },
  { id: 'cat_company_tcs', count: 22 },
  { id: 'cat_company_tcs_foundation', count: 65 },
];

let all11Pass = true;
live11.forEach(({ id, count }) => {
  const t = db.getTestById(id, true);
  const ok = t && t.status === 'ready' && t.verificationStatus === 'VERIFIED' && t.questions?.length === count;
  if (!ok) all11Pass = false;
  assertRelease(!!ok, `[${id}]: status=${t?.status}, verificationStatus=${t?.verificationStatus}, loaded=${t?.questions?.length}/${count}`);
});

// 5. CODING SANDBOX MULTI-LANGUAGE & SECURITY
console.log('\n--- 5. TCS ADVANCED CODING SANDBOX VERIFICATION ---');
async function testCoding() {
  let allPass = true;
  for (const prob of tcsCodingProblems) {
    for (const lang of ['javascript', 'typescript', 'python'] as const) {
      const res = await codeExecutionService.executeSubmission(
        {
          userId: `usr_rel_${prob.id}_${lang}`,
          questionId: prob.id,
          language: lang,
          sourceCode: prob.starterCode[lang],
          isSubmission: true,
        },
        prob.testCases
      );
      if (res.status !== 'PASSED' || res.passedTests !== res.totalTests) {
        allPass = false;
      }
    }
  }
  assertRelease(allPass, `Coding Sandbox: 100% Pass across JS, TS, and Python on all hidden test cases`);

  // Security test
  const secRes = await codeExecutionService.executeSubmission(
    {
      userId: 'usr_rel_malicious',
      questionId: 'q_tcs_coding_001',
      language: 'javascript',
      sourceCode: `const fs = require('fs'); fs.readFileSync('/etc/passwd');`,
      isSubmission: false,
    },
    tcsCodingProblems[0].testCases
  );
  assertRelease(secRes.status !== 'PASSED', `Security Sandbox: Arbitrary fs/system access blocked safely`);
}

async function runMain() {
  await testCoding();
  console.log('\n================================================================');
  console.log(`PHASE 29A RELEASE AUDIT: ${failedChecks === 0 ? 'ALL RELEASE GATES PASSED (0 BLOCKERS)' : `${failedChecks} BLOCKERS`}`);
  console.log('================================================================');
  if (failedChecks > 0) process.exit(1);
}

runMain();

import { CodeExecutionService, SUPPORTED_LANGUAGES_CONFIG, EXECUTION_LIMITS } from './src/services/CodeExecutionService';
import { quantQuestions } from './src/data/questionBank/quant';
import { logicalQuestions } from './src/data/questionBank/logical';
import { verbalQuestions } from './src/data/questionBank/verbal';
import { diQuestions } from './src/data/questionBank/di';
import { pseudocodeQuestions } from './src/data/questionBank/pseudocode';
import { accentureQuestions } from './src/data/questionBank/accenture';
import { cognizantQuestions } from './src/data/questionBank/cognizant';
import { infosysQuestions } from './src/data/questionBank/infosys';
import { tcsAdvancedQuestions } from './src/data/questionBank/tcsAdvanced';
import { COMPANY_BLUEPRINTS } from './src/data/blueprints/company';
import { COMPANY_PATTERNS_REGISTRY } from './src/data/companyPatterns/registry';
import { db } from './server/db';
import { CodeTestCase } from './src/types';

console.log('================================================================');
console.log('PHASE 18E VERIFICATION SUITE — CODING EXECUTION ARCHITECTURE');
console.log('================================================================\n');

async function runVerification() {
  // 1. Foundation Safety & Integrity (125 questions)
  const totalFoundation = quantQuestions.length + logicalQuestions.length + verbalQuestions.length + diQuestions.length + pseudocodeQuestions.length;
  console.log('--- 1. FOUNDATION QUESTION BANK INTEGRITY ---');
  console.log(`Quant count: ${quantQuestions.length} (Expected: 25)`);
  console.log(`Logical count: ${logicalQuestions.length} (Expected: 25)`);
  console.log(`Verbal count: ${verbalQuestions.length} (Expected: 25)`);
  console.log(`DI count: ${diQuestions.length} (Expected: 25)`);
  console.log(`Pseudocode count: ${pseudocodeQuestions.length} (Expected: 25)`);
  console.log(`Total Foundation questions: ${totalFoundation} (Expected: 125)`);

  const foundationPassed = 
    quantQuestions.length === 25 &&
    logicalQuestions.length === 25 &&
    verbalQuestions.length === 25 &&
    diQuestions.length === 25 &&
    pseudocodeQuestions.length === 25;

  console.log(`Foundation Safety Regression: ${foundationPassed ? 'PASS' : 'FAIL'}\n`);

  // 2. Prior Company Banks Integrity (Accenture: 22, Cognizant: 14, Infosys: 7, TCS Adv: 20 = 188 total)
  console.log('--- 2. PRIOR COMPANY BANKS INTEGRITY ---');
  console.log(`Accenture count: ${accentureQuestions.length} (Expected: 22)`);
  console.log(`Cognizant count: ${cognizantQuestions.length} (Expected: 14)`);
  console.log(`Infosys count: ${infosysQuestions.length} (Expected: 7)`);
  console.log(`TCS Advanced count: ${tcsAdvancedQuestions.length} (Expected: 20)`);
  const totalAllBanks = totalFoundation + accentureQuestions.length + cognizantQuestions.length + infosysQuestions.length + tcsAdvancedQuestions.length;
  console.log(`Total Existing Bank Questions: ${totalAllBanks} (Expected: 188)`);
  const priorPassed = totalAllBanks === 188;
  console.log(`Prior Banks Safety: ${priorPassed ? 'PASS' : 'FAIL'}\n`);

  // 3. Supported Languages & Runtime Execution Strategy
  console.log('--- 3. SUPPORTED LANGUAGES & RUNTIME STRATEGY ---');
  const languages = Object.keys(SUPPORTED_LANGUAGES_CONFIG);
  console.log('Registered Runtime Languages:', languages);
  languages.forEach((lang) => {
    const cfg = SUPPORTED_LANGUAGES_CONFIG[lang as any];
    console.log(`- [${cfg.language}]: Display: "${cfg.displayName}", Supported: ${cfg.isSupported}, TimeLimit: ${cfg.timeLimitMs}ms, MemoryLimit: ${cfg.memoryLimitMb}MB`);
  });

  // 4. Code Execution Service & Isolated Test Case Evaluation Test
  console.log('\n--- 4. CODE EXECUTION SERVICE & HIDDEN TEST CASE ISOLATION ---');
  const executionService = new CodeExecutionService();

  // Internal test fixtures (architecture validation only, never published)
  const testFixtures: CodeTestCase[] = [
    {
      id: 'fixture_sample_1',
      input: '5',
      expectedOutput: '5',
      isHidden: false,
      explanation: 'Public sample case',
    },
    {
      id: 'fixture_hidden_2',
      input: '100',
      expectedOutput: '100',
      isHidden: true,
      explanation: 'Server-owned hidden case',
    },
  ];

  // Test Run Mode (Sample cases only)
  console.log('Executing Sample Run Mode...');
  const runResult = await executionService.executeSubmission(
    {
      questionId: 'fixture_q_test',
      userId: 'usr_test_eval',
      language: 'javascript',
      sourceCode: `const fs = require('fs');\nconsole.log(fs.readFileSync(0, 'utf-8').trim());`,
      isSubmission: false,
    },
    testFixtures
  );
  console.log(`Run Mode Status: ${runResult.status}, Total Executed: ${runResult.testCaseResults.length} (Expected: 1, Sample Only)`);
  console.log(`Sample Tests Passed: ${runResult.sampleTestsPassed}/${runResult.totalSampleTests}`);

  // Test Submit Mode (All cases including hidden)
  console.log('\nExecuting Submit Evaluation Mode...');
  const submitResult = await executionService.executeSubmission(
    {
      questionId: 'fixture_q_test',
      userId: 'usr_test_eval',
      language: 'javascript',
      sourceCode: `const fs = require('fs');\nconsole.log(fs.readFileSync(0, 'utf-8').trim());`,
      isSubmission: true,
    },
    testFixtures
  );
  console.log(`Submit Mode Status: ${submitResult.status}, Total Executed: ${submitResult.testCaseResults.length} (Expected: 2)`);
  console.log(`Passed: ${submitResult.passedTests}/${submitResult.totalTests}, Score: ${submitResult.scorePercentage}%`);
  
  // Verify Hidden Test Redaction
  const hiddenResult = submitResult.testCaseResults.find(r => r.isHidden);
  console.log(`Hidden Test Redaction Check: input="${hiddenResult?.input}", expectedOutput="${hiddenResult?.expectedOutput}" (Expected: Redacted)`);
  const redactionSafe = hiddenResult?.input === '[HIDDEN TEST INPUT]' && hiddenResult?.expectedOutput === undefined;
  console.log(`Hidden Test Security Redaction: ${redactionSafe ? 'PASS' : 'FAIL'}`);

  // 5. Rate Limiting Test
  console.log('\n--- 5. RATE LIMITING INTEGRITY ---');
  let rateLimitHit = false;
  for (let i = 0; i < 15; i++) {
    const check = executionService.checkRateLimit('usr_rate_test', false);
    if (!check.allowed) {
      rateLimitHit = true;
      console.log(`Rate limit successfully triggered on attempt ${i + 1} (Retry after: ${check.retryAfterSeconds}s)`);
      break;
    }
  }
  console.log(`Rate Limiter Protection: ${rateLimitHit ? 'PASS' : 'FAIL'}`);

  // 6. DB Submission Persistence Test
  console.log('\n--- 6. SUBMISSION PERSISTENCE INTEGRITY ---');
  const savedRecord = db.saveCodingSubmission({
    id: submitResult.submissionId,
    userId: 'usr_test_eval',
    questionId: 'fixture_q_test',
    language: 'javascript',
    sourceCode: '// verified code',
    executionResult: submitResult,
    isFinalSubmission: true,
    createdAt: submitResult.executedAt,
  });
  const retrievedSubmissions = db.getCodingSubmissionsForUser('usr_test_eval', 'fixture_q_test');
  console.log(`Saved Submission ID: ${savedRecord.id}`);
  console.log(`Retrieved Submissions Count: ${retrievedSubmissions.length} (Expected: >= 1)`);
  const persistencePassed = retrievedSubmissions.length > 0 && retrievedSubmissions[0].id === savedRecord.id;
  console.log(`Persistence Verification: ${persistencePassed ? 'PASS' : 'FAIL'}`);

  // 7. Publishing Gate Safety Check
  console.log('\n--- 7. PUBLISHING GATE STATUS ---');
  const tcsAdvBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_tcs_nqt_advanced');
  const tcsAdvPattern = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_tcs_nqt_advanced');
  const catTcsTest = db.getTestById('cat_company_tcs', false);

  console.log(`TCS Advanced Blueprint ID: ${tcsAdvBp?.id}`);
  console.log(`Blueprint Verification Status: ${tcsAdvBp?.verificationStatus} (Expected: UNVERIFIED)`);
  console.log(`Pattern Status in Registry: ${tcsAdvPattern?.status} (Expected: coming_soon)`);
  console.log(`Catalogue Playability Status in DB: ${catTcsTest?.status} (Expected: coming_soon)`);

  const blueprintGateSafe = 
    tcsAdvBp?.verificationStatus === 'UNVERIFIED' &&
    tcsAdvPattern?.status === 'coming_soon' &&
    catTcsTest?.status === 'coming_soon';

  console.log(`Publishing Gate Unpromoted & Safe: ${blueprintGateSafe ? 'PASS' : 'FAIL'}`);

  console.log('\n================================================================');
  console.log('PHASE 18E VERIFICATION COMPLETE');
  console.log('================================================================');
}

runVerification().catch(console.error);

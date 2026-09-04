import { CodeExecutionService } from './src/services/CodeExecutionService';
import { DuplicateDetection } from './src/services/DuplicateDetection';
import { ContentQAEngine } from './src/services/ContentQAEngine';
import { quantQuestions } from './src/data/questionBank/quant';
import { logicalQuestions } from './src/data/questionBank/logical';
import { verbalQuestions } from './src/data/questionBank/verbal';
import { diQuestions } from './src/data/questionBank/di';
import { pseudocodeQuestions } from './src/data/questionBank/pseudocode';
import { accentureQuestions } from './src/data/questionBank/accenture';
import { cognizantQuestions } from './src/data/questionBank/cognizant';
import { infosysQuestions } from './src/data/questionBank/infosys';
import { tcsAdvancedQuestions } from './src/data/questionBank/tcsAdvanced';
import { tcsCodingProblems } from './src/data/questionBank/tcsCoding';
import { COMPANY_BLUEPRINTS } from './src/data/blueprints/company';
import { COMPANY_PATTERNS_REGISTRY } from './src/data/companyPatterns/registry';
import { db } from './server/db';

console.log('================================================================');
console.log('PHASE 18F VERIFICATION SUITE — TCS ADVANCED CODING EXECUTION & QA');
console.log('================================================================\n');

async function runPhase18FVerification() {
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
  const totalPrior = totalFoundation + accentureQuestions.length + cognizantQuestions.length + infosysQuestions.length + tcsAdvancedQuestions.length;
  console.log(`Total Existing Bank Questions before coding: ${totalPrior} (Expected: 188)`);
  const priorPassed = totalPrior === 188;
  console.log(`Prior Banks Safety: ${priorPassed ? 'PASS' : 'FAIL'}\n`);

  // 3. Coding Problems Count & Integrity
  console.log('--- 3. CODING PROBLEMS CREATION & SCHEMA ---');
  console.log(`Coding Problems Created: ${tcsCodingProblems.length} (Expected: 2)`);
  tcsCodingProblems.forEach((p, idx) => {
    console.log(`Problem ${idx + 1}: [${p.id}] "${p.title}" | Difficulty: ${p.difficulty} | Topic: ${p.topic} | Subtopic: ${p.subtopic}`);
    console.log(`  - Public Test Cases: ${p.testCases.filter(tc => !tc.isHidden).length}`);
    console.log(`  - Hidden Test Cases: ${p.testCases.filter(tc => tc.isHidden).length}`);
    console.log(`  - Supported Languages: ${p.supportedLanguages.join(', ')}`);
  });

  // 4. Duplicate Detection Across Entire Platform (188 Existing + 2 Coding)
  console.log('\n--- 4. CROSS-BANK DUPLICATE DETECTION ---');
  const allExistingQuestions = [
    ...quantQuestions,
    ...logicalQuestions,
    ...verbalQuestions,
    ...diQuestions,
    ...pseudocodeQuestions,
    ...accentureQuestions,
    ...cognizantQuestions,
    ...infosysQuestions,
    ...tcsAdvancedQuestions
  ];

  const dupDetector = new DuplicateDetection();
  let duplicateFound = false;

  // Check ID collisions
  const allIds = new Set<string>();
  [...allExistingQuestions, ...tcsCodingProblems].forEach(q => {
    if (allIds.has(q.id)) {
      console.error(`ERROR: Duplicate ID found: ${q.id}`);
      duplicateFound = true;
    }
    allIds.add(q.id);
  });

  // Check problem duplicate with existing bank
  tcsCodingProblems.forEach(p => {
    if (dupDetector.isDuplicate(p, allExistingQuestions)) {
      console.error(`ERROR: Coding Problem ${p.id} collided with existing question!`);
      duplicateFound = true;
    }
  });

  // Check q_tcs_coding_001 vs q_tcs_coding_002
  const p1 = tcsCodingProblems[0];
  const p2 = tcsCodingProblems[1];
  if (dupDetector.normalizeQuestionText(p1.problemStatement) === dupDetector.normalizeQuestionText(p2.problemStatement)) {
    console.error('ERROR: Coding Problem 1 duplicates Coding Problem 2!');
    duplicateFound = true;
  }

  console.log(`Cross-Bank & Problem Duplication Check: ${!duplicateFound ? 'PASS (0 collisions)' : 'FAIL'}\n`);

  // 5. Multi-Language Execution Validation (JS, TS, Python)
  console.log('--- 5. MULTI-LANGUAGE REAL SANDBOX EXECUTION VALIDATION ---');
  const executionService = new CodeExecutionService();
  const languages: ('javascript' | 'typescript' | 'python')[] = ['javascript', 'typescript', 'python'];

  for (const problem of tcsCodingProblems) {
    console.log(`\nTesting Problem [${problem.id}] "${problem.title}" across all test cases (${problem.testCases.length} total):`);

    for (const lang of languages) {
      const code = problem.starterCode[lang];
      const result = await executionService.executeSubmission(
        {
          questionId: problem.id,
          userId: `usr_eval_${problem.id}_${lang}`,
          language: lang,
          sourceCode: code,
          isSubmission: true, // Run ALL (sample + hidden)
        },
        problem.testCases
      );

      console.log(`  - [${lang}]: Status: ${result.status} | Passed: ${result.passedTests}/${result.totalTests} (Sample: ${result.sampleTestsPassed}/${result.totalSampleTests}, Hidden: ${result.hiddenTestsPassed}/${result.totalHiddenTests}) | Score: ${result.scorePercentage}% | Runtime: ${result.runtimeMs}ms`);

      if (result.status !== 'PASSED' || result.passedTests !== result.totalTests) {
        console.error(`    FAILED on language ${lang}: errorMessage=${result.errorMessage}`, result.testCaseResults.filter(r => !r.passed));
      }
    }
  }

  // 6. Security, Hidden Redaction & Timeout Validation
  console.log('\n--- 6. SECURITY & TIMEOUT ADVERSARIAL VALIDATION ---');
  
  // Test 6a: Forbidden system call / process escape injection
  console.log('Testing Malicious Injection Interception:');
  const maliciousResult = await executionService.executeSubmission(
    {
      questionId: 'q_tcs_coding_001',
      userId: 'usr_malicious',
      language: 'javascript',
      sourceCode: `const { execSync } = require('child_process'); console.log(process.env);`,
      isSubmission: true,
    },
    tcsCodingProblems[0].testCases
  );
  console.log(`  - Malicious Code Status: ${maliciousResult.status} (Expected: RUNTIME_ERROR / SecurityException)`);
  const injectionBlocked = maliciousResult.status === 'RUNTIME_ERROR' || maliciousResult.status === 'SYSTEM_ERROR';
  console.log(`  - Security Injection Defense: ${injectionBlocked ? 'PASS' : 'FAIL'}`);

  // Test 6b: Infinite loop timeout validation
  console.log('Testing Infinite Loop Watchdog Timeout (1500ms):');
  const timeoutResult = await executionService.executeSubmission(
    {
      questionId: 'q_tcs_coding_001',
      userId: 'usr_timeout',
      language: 'javascript',
      sourceCode: `while(true) {}`,
      isSubmission: false,
    },
    [
      {
        id: 'tc_timeout_test',
        input: '1',
        expectedOutput: '1',
        isHidden: false,
      }
    ]
  );
  console.log(`  - Infinite Loop Status: ${timeoutResult.status} (Expected: TIME_LIMIT_EXCEEDED / RUNTIME_ERROR)`);
  const timeoutHandled = timeoutResult.status === 'TIME_LIMIT_EXCEEDED' || timeoutResult.status === 'RUNTIME_ERROR';
  console.log(`  - Watchdog Timeout Enforcement: ${timeoutHandled ? 'PASS' : 'FAIL'}`);

  // 7. Content QA Engine Validation
  console.log('\n--- 7. CONTENT QA ENGINE VALIDATION ---');
  const qaEngine = new ContentQAEngine();
  const qaReport = qaEngine.generateFullQAReport(tcsCodingProblems);
  console.log(`Total Audited: ${qaReport.totalQuestions}`);
  console.log(`Passed Validation: ${qaReport.passedValidation}`);
  console.log(`Failed Validation: ${qaReport.failedValidation}`);
  console.log(`Duplicate Count: ${qaReport.duplicateCount}`);
  console.log(`Provenance Distribution:`, qaReport.provenanceDistribution);

  // 8. Blueprint & Publishing Gate Status
  console.log('\n--- 8. BLUEPRINT & PUBLISHING GATE STATUS ---');
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
  console.log('PHASE 18F VERIFICATION COMPLETE');
  console.log('================================================================');
}

runPhase18FVerification().catch(console.error);

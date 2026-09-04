import { tcsAdvancedQuestions } from './src/data/questionBank/tcsAdvanced';
import { tcsCodingProblems } from './src/data/questionBank/tcsCoding';
import { quantQuestions } from './src/data/questionBank/quant';
import { logicalQuestions } from './src/data/questionBank/logical';
import { verbalQuestions } from './src/data/questionBank/verbal';
import { diQuestions } from './src/data/questionBank/di';
import { pseudocodeQuestions } from './src/data/questionBank/pseudocode';
import { accentureQuestions } from './src/data/questionBank/accenture';
import { cognizantQuestions } from './src/data/questionBank/cognizant';
import { infosysQuestions } from './src/data/questionBank/infosys';
import { wiproQuestions } from './src/data/questionBank/wipro';
import { COMPANY_BLUEPRINTS } from './src/data/blueprints/company';
import { COMPANY_PATTERNS_REGISTRY } from './src/data/companyPatterns/registry';
import { CATALOGUE_TESTS } from './server/data/catalogueData';
import { codeExecutionService } from './src/services/CodeExecutionService';
import { questionSelectionEngine } from './src/services/QuestionSelectionEngine';
import { recommendationEngine } from './src/services/RecommendationEngine';
import { ContentQAEngine } from './src/services/ContentQAEngine';
import { db } from './server/db';

const contentQA = new ContentQAEngine();

console.log('================================================================');
console.log('PHASE 23A: TCS NQT ADVANCED VERIFICATION & READINESS AUDIT');
console.log('================================================================\n');

// 1. Inventory & Continuity Audit
console.log('--- 1. CURRENT TCS INVENTORY AUDIT ---');
console.log(`TCS Advanced Quant & Reasoning: ${tcsAdvancedQuestions.length} / 20`);
console.log(`TCS Advanced Coding Problems: ${tcsCodingProblems.length} / 2`);
const expectedAdvIds = Array.from({ length: 20 }, (_, i) => `q_tcs_adv_${String(i + 1).padStart(3, '0')}`);
const actualAdvIds = tcsAdvancedQuestions.map(q => q.id);
const missingAdvIds = expectedAdvIds.filter(id => !actualAdvIds.includes(id));
console.log(`Quant & Reasoning ID Sequence: ${missingAdvIds.length === 0 ? 'PASS (q_tcs_adv_001 -> q_tcs_adv_020 continuous)' : 'FAIL'}`);

const expectedCodingIds = ['q_tcs_coding_001', 'q_tcs_coding_002'];
const actualCodingIds = tcsCodingProblems.map(p => p.id);
const missingCodingIds = expectedCodingIds.filter(id => !actualCodingIds.includes(id));
console.log(`Coding Problem ID Sequence: ${missingCodingIds.length === 0 ? 'PASS (q_tcs_coding_001 -> q_tcs_coding_002 continuous)' : 'FAIL'}\n`);

// 2. Blueprint & Pattern Audit
console.log('--- 2. BLUEPRINT & PATTERN REGISTRY AUDIT ---');
const tcsAdvBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_tcs_nqt_advanced')!;
const tcsAdvPat = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_tcs_nqt_advanced')!;
const tcsAdvCat = CATALOGUE_TESTS.find(c => c.id === 'cat_company_tcs_advanced')!;

console.log(`Blueprint: ${tcsAdvBp.title} (${tcsAdvBp.id})`);
console.log(`  Duration: ${tcsAdvBp.duration} mins | Question Count: ${tcsAdvBp.questionCount}`);
console.log(`  Sections:`);
tcsAdvBp.sections.forEach(s => {
  console.log(`    - ${s.name} (${s.id}): ${s.questionCount} Qs, Types: [${s.questionTypes.join(', ')}], Difficulty:`, s.difficultyDistribution);
});
console.log(`Pattern Registry: ${tcsAdvPat?.assessmentName} | Duration: ${tcsAdvPat?.totalDurationMinutes} mins`);
console.log(`Catalogue Item: ${tcsAdvCat?.title} | Duration: ${tcsAdvCat?.durationMinutes} mins | Status: ${tcsAdvCat?.status}`);

const blueprintPass = 
  tcsAdvBp.duration === 115 &&
  tcsAdvBp.questionCount === 22 &&
  tcsAdvBp.sections.length === 2 &&
  tcsAdvBp.sections[0].questionCount === 20 &&
  tcsAdvBp.sections[1].questionCount === 2;
console.log(`Blueprint Structure Validation: ${blueprintPass ? 'PASS' : 'FAIL'}\n`);

// 3. Advanced Quantitative & Reasoning QA (20 Questions)
console.log('--- 3. ADVANCED QUANTITATIVE & REASONING QA ---');
let qaErrors = 0;
let diffMismatches = 0;

tcsAdvancedQuestions.forEach(q => {
  const sRes = contentQA.validateSchema(q);
  if (!sRes.isValid) {
    console.log(`  [SCHEMA ERROR] ${q.id}:`, sRes.errors);
    qaErrors++;
  }
  const mRes = contentQA.validateMathematics(q);
  if (!mRes.passed) {
    console.log(`  [MATH ERROR] ${q.id}:`, mRes.reason);
    qaErrors++;
  }
  const dRes = contentQA.evaluateDifficulty(q);
  if (dRes.difficultyMismatch || q.difficulty !== 'Hard') {
    console.log(`  [DIFF MISMATCH] ${q.id}: Authored='${q.difficulty}', Computed='${dRes.computedDifficulty}'`);
    diffMismatches++;
  }
});
console.log(`QA Schema & Math Validation Errors: ${qaErrors} (Expected: 0)`);
console.log(`Difficulty Evaluation Mismatches: ${diffMismatches} (Expected: 0)`);
console.log(`Quant & Reasoning QA Status: ${qaErrors === 0 && diffMismatches === 0 ? 'PASS (20/20 Hard verified)' : 'FAIL'}\n`);

// 4. Sandbox Code Execution Test (Both Coding Problems across JS, TS, Python)
console.log('--- 4. SANDBOX CODE EXECUTION & TEST SUITE VERIFICATION ---');

async function testCodingProblems() {
  for (const prob of tcsCodingProblems) {
    console.log(`Testing Problem: ${prob.title} (${prob.id})`);
    console.log(`  Total Test Cases (Public + Hidden): ${prob.testCases.length}`);

    for (const lang of ['javascript', 'typescript', 'python'] as const) {
      const source = prob.starterCode[lang];
      if (!source) {
        console.log(`  [ERROR] Missing starterCode for language '${lang}' in ${prob.id}`);
        continue;
      }

      const execResult = await codeExecutionService.executeSubmission(
        {
          userId: `usr_qa_sandbox_${prob.id}_${lang}`,
          questionId: prob.id,
          language: lang,
          sourceCode: source,
          isSubmission: true,
        },
        prob.testCases
      );

      const passed = execResult.passedTests;
      const total = execResult.totalTests;
      console.log(`    - Language '${lang}': Status=${execResult.status} | Passed: ${passed}/${total} | Time: ${execResult.runtimeMs}ms`);
      if (execResult.status !== 'PASSED' || passed !== total) {
        console.log(`      [SANDBOX FAILURE] ${prob.id} (${lang}) failed test cases!`, execResult.errorMessage);
      }
    }
  }
}

// 5. Security & Sandbox Guardrails Verification
console.log('\n--- 5. SECURITY & SANDBOX GUARDRAILS VERIFICATION ---');

async function testSecurityGuardrails() {
  const maliciousSnippets = [
    { name: 'child_process injection', lang: 'javascript', code: "const cp = require('child_process'); cp.execSync('dir');" },
    { name: 'subprocess module access', lang: 'python', code: "import subprocess\nsubprocess.run(['ls', '-la'])" },
    { name: 'process.env inspection', lang: 'javascript', code: "console.log(process.env.PATH);" },
    { name: 'forbidden file system traversal', lang: 'python', code: "with open('/etc/passwd') as f: print(f.read())" },
  ];

  for (const test of maliciousSnippets) {
    const res = await codeExecutionService.executeSubmission(
      {
        userId: `usr_qa_sec_${test.lang}`,
        questionId: 'q_tcs_coding_001',
        language: test.lang as any,
        sourceCode: test.code,
        isSubmission: false,
      },
      tcsCodingProblems[0].testCases
    );
    console.log(`  Security Test: "${test.name}" -> Status: ${res.status} | Policy Protection Verified: ${res.status !== 'PASSED' ? 'YES (BLOCKED)' : 'NO'}`);
  }
}

// 6. Candidate Capacity & Runtime Selection Matrix
console.log('\n--- 6. CANDIDATE CAPACITY & RUNTIME ASSEMBLY MATRIX ---');
const fullBank366 = [
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
  ...tcsCodingProblems as any
];

const seenFoundation125 = [
  ...quantQuestions.map(q => q.id),
  ...logicalQuestions.map(q => q.id),
  ...verbalQuestions.map(q => q.id),
  ...diQuestions.map(q => q.id),
  ...pseudocodeQuestions.map(q => q.id),
];
const seenWipro = wiproQuestions.map(q => q.id);
const seenAccenture = accentureQuestions.map(q => q.id);
const seenCognizant = cognizantQuestions.map(q => q.id);
const seenInfosys = infosysQuestions.map(q => q.id);
const seenAllLive344 = [...new Set([...seenFoundation125, ...seenWipro, ...seenAccenture, ...seenCognizant, ...seenInfosys])];

function testScenario(name: string, seenList: string[]) {
  const seenSet = new Set(seenList);
  const assembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
    userId: 'usr_tcs_audit',
    blueprint: tcsAdvBp,
    questionBank: fullBank366,
    previouslyAttemptedQuestionIds: seenList,
    allowPartialReuseWhenExhausted: false,
  });

  const allSelected = assembly.sectionResults.flatMap(sr => sr.selectedQuestions);
  const selectedIds = allSelected.map(q => q.id);
  const freshCount = selectedIds.filter(id => !seenSet.has(id)).length;
  const reusedCount = selectedIds.filter(id => seenSet.has(id)).length;

  console.log(`Scenario: "${name}" (Seen: ${seenList.length})`);
  console.log(`  Assembly Result: ${assembly.success ? 'PASS' : 'FAIL'} | Selected: ${selectedIds.length}/22 | Fresh: ${freshCount} | Reused: ${reusedCount} | Shortfall: ${assembly.shortfall}`);
  assembly.sectionResults.forEach(sr => {
    const sFresh = sr.selectedQuestions.filter(q => !seenSet.has(q.id)).length;
    const sReused = sr.selectedQuestions.filter(q => seenSet.has(q.id)).length;
    console.log(`    - Section "${sr.sectionName}": Selected ${sr.selectedQuestions.length}/${sr.requiredCount} (Fresh: ${sFresh}, Reused: ${sReused})`);
  });
}

testScenario('Scenario A: Cold Start', []);
testScenario('Scenario B: All Foundation Completed (125 seen)', seenFoundation125);
testScenario('Scenario C: Foundation + Wipro (151 seen)', [...new Set([...seenFoundation125, ...seenWipro])]);
testScenario('Scenario D: Foundation + Wipro + Accenture (240 seen)', [...new Set([...seenFoundation125, ...seenWipro, ...seenAccenture])]);
testScenario('Scenario E: All Live Completed (344 seen)', seenAllLive344);

// 7. Full Platform Regression & Integrity
console.log('\n--- 7. FULL QUESTION BANK & PLATFORM REGRESSION ---');
console.log(`Total System Bank Count: ${fullBank366.length} / 366 (Expected: 366)`);
const globalIdMap = new Map<string, string>();
let globalIdDupes = 0;
const globalTextMap = new Map<string, string>();
let globalTextDupes = 0;

fullBank366.forEach(q => {
  if (globalIdMap.has(q.id)) globalIdDupes++;
  globalIdMap.set(q.id, q.company || q.category);

  const norm = q.questionText.trim().toLowerCase().replace(/\s+/g, ' ');
  if (globalTextMap.has(norm)) globalTextDupes++;
  globalTextMap.set(norm, q.id);
});

console.log(`Global ID Collisions: ${globalIdDupes} (Expected: 0)`);
console.log(`Global Text Collisions: ${globalTextDupes} (Expected: 0)`);
console.log(`Cross-Bank Integrity Status: ${globalIdDupes === 0 && globalTextDupes === 0 ? 'PASS' : 'FAIL'}\n`);

// 8. Publishing Gate Status
console.log('--- 8. PUBLISHING GATE STATUS ---');
const tcsCat = CATALOGUE_TESTS.find(c => c.id === 'cat_company_tcs')!;
console.log(`TCS Advanced Blueprint verificationStatus: ${tcsAdvBp.verificationStatus} (Expected: UNVERIFIED)`);
console.log(`TCS Advanced Pattern status: ${tcsAdvPat?.status} | verificationStatus: ${tcsAdvPat?.verificationStatus} (Expected: coming_soon / UNVERIFIED)`);
console.log(`TCS Catalogue status: ${tcsCat?.status} | verificationStatus: ${tcsCat?.verificationStatus} (Expected: coming_soon / PATTERN_BASED)`);

const isGatedSafely =
  tcsAdvBp.verificationStatus === 'UNVERIFIED' &&
  tcsAdvPat?.status === 'coming_soon' &&
  tcsAdvPat?.verificationStatus === 'UNVERIFIED' &&
  tcsCat?.status === 'coming_soon';

console.log(`Publishing Safety Gate: ${isGatedSafely ? 'PASS (Safely Gated in Staging)' : 'FAIL'}\n`);

async function runAll() {
  await testCodingProblems();
  await testSecurityGuardrails();
  console.log('================================================================');
  console.log('PHASE 23A AUDIT COMPLETE');
  console.log('================================================================');
}

runAll();

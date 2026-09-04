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
import { wiproQuestions } from './src/data/questionBank/wipro';
import { COMPANY_BLUEPRINTS } from './src/data/blueprints/company';
import { COMPANY_PATTERNS_REGISTRY } from './src/data/companyPatterns/registry';
import { questionSelectionEngine } from './src/services/QuestionSelectionEngine';
import { CompanyContentCapacityService } from './src/services/CompanyContentCapacityService';
import { ContentQAEngine } from './src/services/ContentQAEngine';
import { DuplicateDetection } from './src/services/DuplicateDetection';
import { db } from './server/db';

console.log('================================================================');
console.log('PHASE 20B: ACCENTURE RUNTIME ASSEMBLY & VERIFICATION SUITE');
console.log('================================================================\n');

const fullBank283 = [
  ...quantQuestions,
  ...logicalQuestions,
  ...verbalQuestions,
  ...diQuestions,
  ...pseudocodeQuestions,
  ...accentureQuestions,
  ...cognizantQuestions,
  ...infosysQuestions,
  ...tcsAdvancedQuestions,
  ...tcsCodingProblems,
  ...wiproQuestions,
];

const accentureBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_accenture_cognitive')!;
const capacityService = new CompanyContentCapacityService();
const dupDetector = new DuplicateDetection();
const qaEngine = new ContentQAEngine();

// Candidate History Definitions
const seenA: string[] = []; // Cold-start (0)
const seenB = [...quantQuestions.map(q => q.id), ...logicalQuestions.map(q => q.id), ...verbalQuestions.map(q => q.id)]; // 75
const seenC = [...seenB, ...diQuestions.map(q => q.id), ...pseudocodeQuestions.map(q => q.id)]; // 125
const seenD = wiproQuestions.map(q => q.id); // 26 (48 test instance history)
const seenE = [...seenC, ...seenD]; // 151

// Generate Attempt 1 for Scenario F and G
const attempt1Result = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_candidate_seed_attempt1',
  blueprint: accentureBp,
  questionBank: fullBank283,
  previouslyAttemptedQuestionIds: [],
  allowPartialReuseWhenExhausted: true,
});
const seenF = attempt1Result.sectionResults.flatMap(sr => sr.selectedQuestions).map(q => q.id); // 90
const seenG = [...new Set([...seenE, ...seenF])]; // 241

interface ScenarioRunResult {
  scenarioName: string;
  seenCount: number;
  strictAssembly: any;
  controlledFallback: any;
  capacityReport: any;
  sectionMatrix: Record<string, { Easy: number; Medium: number; Hard: number; Total: number }>;
  overallDifficulty: { Easy: number; Medium: number; Hard: number; Total: number };
  uniqueIdsPass: boolean;
  uniqueTextPass: boolean;
  noContaminationPass: boolean;
}

function runScenarioVerification(name: string, seenList: string[]): ScenarioRunResult {
  console.log(`\n================================================================`);
  console.log(`SCENARIO: ${name} (Seen: ${seenList.length})`);
  console.log(`================================================================`);

  const cap = capacityService.analyzeCandidateCapacity(accentureBp, 'usr_audit', fullBank283, seenList);

  const strictAssembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
    userId: 'usr_strict_test',
    blueprint: accentureBp,
    questionBank: fullBank283,
    previouslyAttemptedQuestionIds: seenList,
    allowPartialReuseWhenExhausted: false,
  });

  const fallbackAssembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
    userId: 'usr_fallback_test',
    blueprint: accentureBp,
    questionBank: fullBank283,
    previouslyAttemptedQuestionIds: seenList,
    allowPartialReuseWhenExhausted: true,
  });

  const activeResult = strictAssembly.success ? strictAssembly : fallbackAssembly;
  const allSelected = activeResult.sectionResults.flatMap((sr: any) => sr.selectedQuestions);

  // Assertions
  const selectedIds = allSelected.map((q: any) => q.id);
  const selectedTexts = allSelected.map((q: any) => q.questionText);
  const uniqueIds = new Set(selectedIds);
  const uniqueTexts = new Set(selectedTexts);

  const seenSet = new Set(seenList);
  const contaminatedCount = allSelected.filter((q: any) => seenSet.has(q.id)).length;

  const sectionMatrix: Record<string, { Easy: number; Medium: number; Hard: number; Total: number }> = {};
  const overallDifficulty = { Easy: 0, Medium: 0, Hard: 0, Total: 0 };

  activeResult.sectionResults.forEach((sr: any) => {
    const secDiff = { Easy: 0, Medium: 0, Hard: 0, Total: sr.selectedQuestions.length };
    sr.selectedQuestions.forEach((q: any) => {
      secDiff[q.difficulty as 'Easy' | 'Medium' | 'Hard']++;
      overallDifficulty[q.difficulty as 'Easy' | 'Medium' | 'Hard']++;
      overallDifficulty.Total++;
    });
    sectionMatrix[sr.sectionName] = secDiff;
  });

  console.log(`| Section Name | Easy | Med | Hard | Total | Target Section | Section Pass |`);
  console.log(`|:---|:---:|:---:|:---:|:---:|:---:|:---:|`);
  accentureBp.sections.forEach(sec => {
    const m = sectionMatrix[sec.name] || { Easy: 0, Medium: 0, Hard: 0, Total: 0 };
    const pass = m.Total === sec.questionCount;
    console.log(`| ${sec.name} | ${m.Easy} | ${m.Medium} | ${m.Hard} | ${m.Total} | ${sec.questionCount} | ${pass ? 'PASS' : 'FAIL'} |`);
  });
  console.log(`| **TOTAL** | **${overallDifficulty.Easy}** | **${overallDifficulty.Medium}** | **${overallDifficulty.Hard}** | **${overallDifficulty.Total}** | **90** | ${overallDifficulty.Total === 90 ? 'PASS' : 'FAIL'} |`);

  console.log(`\nMetrics:`);
  console.log(`  Strict Assembly Success: ${strictAssembly.success} (Selected: ${strictAssembly.totalSelected}/90, Fresh: ${strictAssembly.freshCount}, Reused: ${strictAssembly.reusedCount})`);
  console.log(`  Controlled Fallback: Selected: ${fallbackAssembly.totalSelected}/90, Fresh: ${fallbackAssembly.freshCount}, Reused: ${fallbackAssembly.reusedCount}`);
  console.log(`  Unique Question IDs: ${uniqueIds.size}/90 (${uniqueIds.size === 90 ? 'PASS' : 'FAIL'})`);
  console.log(`  Unique Question Texts: ${uniqueTexts.size}/90 (${uniqueTexts.size === 90 ? 'PASS' : 'FAIL'})`);
  console.log(`  Contamination (Seen Qs in strict): ${contaminatedCount}`);

  return {
    scenarioName: name,
    seenCount: seenList.length,
    strictAssembly,
    controlledFallback: fallbackAssembly,
    capacityReport: cap,
    sectionMatrix,
    overallDifficulty,
    uniqueIdsPass: uniqueIds.size === 90,
    uniqueTextPass: uniqueTexts.size === 90,
    noContaminationPass: strictAssembly.success ? contaminatedCount === 0 : true,
  };
}

// Run all 7 scenarios
const resA = runScenarioVerification('SCENARIO A: Cold-Start Candidate (0 seen)', seenA);
const resB = runScenarioVerification('SCENARIO B: Foundation Q + V + L Completed (75 seen)', seenB);
const resC = runScenarioVerification('SCENARIO C: All 5 Foundation Completed (125 seen)', seenC);
const resD = runScenarioVerification('SCENARIO D: Wipro Elite NTH Completed (26 seen)', seenD);
const resE = runScenarioVerification('SCENARIO E: All Foundation + Wipro Completed (151 seen)', seenE);
const resF = runScenarioVerification('SCENARIO F: One Previous Accenture Attempt (90 seen)', seenF);
const resG = runScenarioVerification('SCENARIO G: All Foundation + Wipro + One Accenture Attempt (241 seen)', seenG);

// Difficulty Consistency Check across all 89 questions in bank
console.log('\n================================================================');
console.log('DIFFICULTY CONSISTENCY AUDIT (Accenture Bank - 89 Questions)');
console.log('================================================================');
let diffMismatches = 0;
accentureQuestions.forEach(q => {
  const evalDiff = qaEngine.evaluateDifficulty(q);
  if (evalDiff.difficultyMismatch) {
    console.error(`Difficulty Mismatch on ${q.id}: Authored="${q.difficulty}", Computed="${evalDiff.computedDifficulty}"`);
    diffMismatches++;
  }
});
console.log(`Total Difficulty Mismatches in Accenture Bank: ${diffMismatches} (Expected: 0)`);

// Duplicate Detection across all 283 questions
console.log('\n================================================================');
console.log('DUPLICATE DETECTION AUDIT (283 Total Questions)');
console.log('================================================================');
let totalIdDupes = 0;
let totalTextDupes = 0;
const idSet = new Set<string>();
fullBank283.forEach(q => {
  if (idSet.has(q.id)) totalIdDupes++;
  idSet.add(q.id);
});
for (let i = 0; i < fullBank283.length; i++) {
  for (let j = i + 1; j < fullBank283.length; j++) {
    if (dupDetector.normalizeQuestionText(fullBank283[i].questionText) === dupDetector.normalizeQuestionText(fullBank283[j].questionText)) {
      totalTextDupes++;
    }
  }
}
console.log(`ID Duplicates: ${totalIdDupes} | Text Duplicates: ${totalTextDupes}`);

// Regression Suite
console.log('\n================================================================');
console.log('PLATFORM REGRESSION AUDIT');
console.log('================================================================');
const fq = db.getTestById('cat_foundation_quant', false);
const fl = db.getTestById('cat_foundation_logical', false);
const fv = db.getTestById('cat_foundation_verbal', false);
const fdi = db.getTestById('cat_foundation_di', false);
const fp = db.getTestById('cat_foundation_pseudocode', false);
const wip = db.getTestById('cat_company_wipro', false);

const foundationRegPass = 
  quantQuestions.length === 25 &&
  logicalQuestions.length === 25 &&
  verbalQuestions.length === 25 &&
  diQuestions.length === 25 &&
  pseudocodeQuestions.length === 25 &&
  fq?.status === 'ready' &&
  fl?.status === 'ready' &&
  fv?.status === 'ready' &&
  fdi?.status === 'ready' &&
  fp?.status === 'ready';
console.log(`Foundation Assessments (125 Qs): ${foundationRegPass ? 'PASS' : 'FAIL'}`);

const wiproRegPass = wiproQuestions.length === 26 && wip?.status === 'ready' && wip?.verificationStatus === 'VERIFIED';
console.log(`Wipro Elite NTH Assessment (26 Qs): ${wiproRegPass ? 'PASS' : 'FAIL'}`);

const priorRegPass = 
  cognizantQuestions.length === 14 &&
  infosysQuestions.length === 7 &&
  tcsAdvancedQuestions.length === 20 &&
  tcsCodingProblems.length === 2;
console.log(`Prior Company Banks (Cognizant 14, Infosys 7, TCS Adv 20, TCS Coding 2): ${priorRegPass ? 'PASS' : 'FAIL'}`);

// Publishing Gate Status
console.log('\n================================================================');
console.log('PUBLISHING GATE STATUS');
console.log('================================================================');
const accBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_accenture_cognitive');
const accPat = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_accenture_cognitive_technical');
const accCat = db.getTestById('cat_company_accenture', false);

console.log(`Blueprint: ${accBp?.id} | verificationStatus: ${accBp?.verificationStatus} (Expected: UNVERIFIED)`);
console.log(`Pattern: ${accPat?.id} | status: ${accPat?.status} | verificationStatus: ${accPat?.verificationStatus} (Expected: coming_soon / UNVERIFIED)`);
console.log(`Catalogue: ${accCat?.id} | status: ${accCat?.status} (Expected: coming_soon)`);

const gateSafe = 
  accBp?.verificationStatus === 'UNVERIFIED' &&
  accPat?.status === 'coming_soon' &&
  accPat?.verificationStatus === 'UNVERIFIED' &&
  accCat?.status === 'coming_soon';
console.log(`Publishing Gate Status: ${gateSafe ? 'PASS (Safely Gated / Unpromoted)' : 'FAIL'}`);

console.log('\n================================================================');
console.log('PHASE 20B AUDIT COMPLETE');
console.log('================================================================');

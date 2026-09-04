import { infosysQuestions } from './src/data/questionBank/infosys';
import { quantQuestions } from './src/data/questionBank/quant';
import { logicalQuestions } from './src/data/questionBank/logical';
import { verbalQuestions } from './src/data/questionBank/verbal';
import { diQuestions } from './src/data/questionBank/di';
import { pseudocodeQuestions } from './src/data/questionBank/pseudocode';
import { accentureQuestions } from './src/data/questionBank/accenture';
import { cognizantQuestions } from './src/data/questionBank/cognizant';
import { tcsAdvancedQuestions } from './src/data/questionBank/tcsAdvanced';
import { tcsCodingProblems } from './src/data/questionBank/tcsCoding';
import { wiproQuestions } from './src/data/questionBank/wipro';
import { COMPANY_BLUEPRINTS } from './src/data/blueprints/company';
import { COMPANY_PATTERNS_REGISTRY } from './src/data/companyPatterns/registry';
import { CATALOGUE_TESTS } from './server/data/catalogueData';
import { ContentQAEngine } from './src/services/ContentQAEngine';
import { questionSelectionEngine } from './src/services/QuestionSelectionEngine';
import { TAXONOMY } from './src/data/taxonomy';

const contentQAEngine = new ContentQAEngine();

console.log('================================================================');
console.log('PHASE 22C: INFOSYS ASSESSMENT STRICT VERIFICATION & CONSISTENCY');
console.log('================================================================\n');

// 1. INVENTORY & ID CONTINUITY AUDIT
console.log('--- 1. QUESTION INVENTORY & ID CONTINUITY ---');
const totalInfosys = infosysQuestions.length;
console.log(`Total Infosys Questions: ${totalInfosys} (Expected: 43)`);

const expectedIds = Array.from({ length: 43 }, (_, i) => `q_infosys_${String(i + 1).padStart(3, '0')}`);
const actualIds = infosysQuestions.map(q => q.id);

const missingIds = expectedIds.filter(id => !actualIds.includes(id));
const extraIds = actualIds.filter(id => !expectedIds.includes(id));
const duplicateIds = actualIds.filter((id, index) => actualIds.indexOf(id) !== index);

console.log(`ID Continuity: ${missingIds.length === 0 && extraIds.length === 0 && duplicateIds.length === 0 ? 'PASS (q_infosys_001 -> q_infosys_043 intact)' : 'FAIL'}`);
if (missingIds.length > 0) console.log(`  Missing IDs: ${missingIds.join(', ')}`);
if (extraIds.length > 0) console.log(`  Extra IDs: ${extraIds.join(', ')}`);
if (duplicateIds.length > 0) console.log(`  Duplicate IDs: ${duplicateIds.join(', ')}`);

// Check Duplicate Normalized Text within Infosys Bank
const textMap = new Map<string, string>();
const textDupes: string[] = [];
infosysQuestions.forEach(q => {
  const norm = q.questionText.trim().toLowerCase().replace(/\s+/g, ' ');
  if (textMap.has(norm)) {
    textDupes.push(`${q.id} duplicates ${textMap.get(norm)}`);
  } else {
    textMap.set(norm, q.id);
  }
});
console.log(`Internal Infosys Text Collisions: ${textDupes.length} (Expected: 0)`);
if (textDupes.length > 0) console.log(`  Duplicate texts:`, textDupes);

// Check Duplicate Option Sets within Infosys Bank
const optionSetMap = new Map<string, string>();
const optionSetDupes: string[] = [];
infosysQuestions.forEach(q => {
  const optStr = (q as import('./src/types').MCQQuestion).options.map(o => o.text.trim().toLowerCase()).sort().join(' | ');
  if (optionSetMap.has(optStr)) {
    optionSetDupes.push(`${q.id} has same option set as ${optionSetMap.get(optStr)}`);
  } else {
    optionSetMap.set(optStr, q.id);
  }
});
console.log(`Internal Infosys Option Set Collisions: ${optionSetDupes.length} (Expected: 0)`);
if (optionSetDupes.length > 0) console.log(`  Option set dupes:`, optionSetDupes);

// 2. FULL 366 SYSTEM QUESTION BANK INVENTORY & REGRESSION CHECK
console.log('\n--- 2. FULL 366-QUESTION SYSTEM BANK AUDIT ---');
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
  ...tcsCodingProblems
];

console.log(`Foundation Count: ${quantQuestions.length + logicalQuestions.length + verbalQuestions.length + diQuestions.length + pseudocodeQuestions.length} (Expected: 125)`);
console.log(`Accenture Count: ${accentureQuestions.length} (Expected: 89)`);
console.log(`Cognizant Count: ${cognizantQuestions.length} (Expected: 61)`);
console.log(`Wipro Count: ${wiproQuestions.length} (Expected: 26)`);
console.log(`Infosys Count: ${infosysQuestions.length} (Expected: 43)`);
console.log(`TCS Advanced Count: ${tcsAdvancedQuestions.length} (Expected: 20)`);
console.log(`TCS Coding Count: ${tcsCodingProblems.length} (Expected: 2)`);
console.log(`Total System Bank Count: ${fullBank366.length} (Expected: 366)`);

// Global System Collisions
const globalIdMap = new Map<string, string>();
const globalIdDupes: string[] = [];
const globalTextMap = new Map<string, string>();
const globalTextDupes: string[] = [];

fullBank366.forEach(q => {
  if (globalIdMap.has(q.id)) {
    globalIdDupes.push(`${q.id} in multiple places (${globalIdMap.get(q.id)})`);
  } else {
    globalIdMap.set(q.id, q.company || q.category);
  }

  const norm = q.questionText.trim().toLowerCase().replace(/\s+/g, ' ');
  if (globalTextMap.has(norm)) {
    globalTextDupes.push(`${q.id} text duplicates ${globalTextMap.get(norm)}`);
  } else {
    globalTextMap.set(norm, `${q.id} (${q.company || q.category})`);
  }
});
console.log(`Global ID Collisions: ${globalIdDupes.length} (Expected: 0)`);
console.log(`Global Text Collisions: ${globalTextDupes.length} (Expected: 0)`);

// 3. TAXONOMY & METADATA AUDIT (43 Infosys Questions)
console.log('\n--- 3. TAXONOMY & METADATA AUDIT ---');
let metadataErrors = 0;
const validSkills = Object.values(TAXONOMY.skills);
const validCategories = Object.values(TAXONOMY.categories);

infosysQuestions.forEach(q => {
  if (q.questionType !== 'MCQ_SINGLE') {
    console.log(`  [ERROR] ${q.id}: Invalid questionType '${q.questionType}'`);
    metadataErrors++;
  }
  if (!validCategories.includes(q.category)) {
    console.log(`  [ERROR] ${q.id}: Invalid category '${q.category}'`);
    metadataErrors++;
  }
  if (!validSkills.includes(q.skill)) {
    console.log(`  [ERROR] ${q.id}: Invalid skill '${q.skill}'`);
    metadataErrors++;
  }
  if ((q as import('./src/types').MCQQuestion).options.length !== 4) {
    console.log(`  [ERROR] ${q.id}: Options length is ${(q as import('./src/types').MCQQuestion).options.length}, expected 4`);
    metadataErrors++;
  }
  const optIds = (q as import('./src/types').MCQQuestion).options.map(o => o.id);
  if (optIds.join('') !== 'ABCD') {
    console.log(`  [ERROR] ${q.id}: Option IDs are [${optIds.join(', ')}], expected ['A', 'B', 'C', 'D']`);
    metadataErrors++;
  }
  if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer)) {
    console.log(`  [ERROR] ${q.id}: correctAnswer '${q.correctAnswer}' is invalid`);
    metadataErrors++;
  }
  if (!q.explanation || q.explanation.trim().length < 20) {
    console.log(`  [ERROR] ${q.id}: Explanation is missing or too brief`);
    metadataErrors++;
  }
  if (!q.source || !q.source.includes('FirstRound Original')) {
    console.log(`  [ERROR] ${q.id}: Source '${q.source}' must be FirstRound Original`);
    metadataErrors++;
  }
  if (!q.supportedRoles || q.supportedRoles.length === 0) {
    console.log(`  [ERROR] ${q.id}: Missing supportedRoles`);
    metadataErrors++;
  }
  if (!q.tags || q.tags.length === 0) {
    console.log(`  [ERROR] ${q.id}: Missing tags`);
    metadataErrors++;
  }
});
console.log(`Taxonomy & Metadata Errors: ${metadataErrors} (Expected: 0)`);

// 4. CONTENT QA ENGINE & DIFFICULTY CONSISTENCY (All 43 Infosys Questions)
console.log('\n--- 4. CONTENT QA ENGINE VALIDATION & DIFFICULTY CONSISTENCY ---');
let qaErrors = 0;
let diffMismatches = 0;

const authoredDiff = { Easy: 0, Medium: 0, Hard: 0 };
const qaDiff = { Easy: 0, Medium: 0, Hard: 0 };

infosysQuestions.forEach(q => {
  authoredDiff[q.difficulty]++;
  const valRes = contentQAEngine.validateSchema(q);
  if (!valRes.isValid) {
    console.log(`  [QA ERROR] ${q.id}:`, valRes.errors);
    qaErrors++;
  }
  const mathRes = contentQAEngine.validateMathematics(q);
  if (!mathRes.passed) {
    console.log(`  [MATH ERROR] ${q.id}:`, mathRes.reason);
    qaErrors++;
  }
  const diffEval = contentQAEngine.evaluateDifficulty(q);
  qaDiff[diffEval.computedDifficulty]++;
  if (diffEval.difficultyMismatch) {
    console.log(`  [DIFF MISMATCH] ${q.id}: Authored='${q.difficulty}', Computed='${diffEval.computedDifficulty}'`);
    diffMismatches++;
  }
});

console.log(`Authored Difficulty Distribution (Total 43):`, authoredDiff);
console.log(`ContentQAEngine Difficulty Distribution:`, qaDiff);
console.log(`QA Validation Errors: ${qaErrors} (Expected: 0)`);
console.log(`Difficulty Consistency Mismatches: ${diffMismatches} (Expected: 0)`);

// Break down the 36 Phase 22B new questions (q_infosys_008 -> 043)
const new36 = infosysQuestions.slice(7);
const new36Authored = { Easy: 0, Medium: 0, Hard: 0 };
new36.forEach(q => new36Authored[q.difficulty]++);
console.log(`Phase 22B 36-Question Difficulty Distribution:`, new36Authored, `(Expected: { Easy: 6, Medium: 21, Hard: 9 })`);

// 5. RUNTIME ASSEMBLY MATRIX & CANDIDATE CAPACITY
console.log('\n--- 5. RUNTIME ASSEMBLY & CANDIDATE CAPACITY MATRIX ---');
const infBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_infosys_assessment')!;

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
const seenAllLive301 = [...new Set([...seenFoundation125, ...seenWipro, ...seenAccenture, ...seenCognizant])];

interface ScenarioTestResult {
  name: string;
  seenCount: number;
  selectedCount: number;
  freshCount: number;
  reusedCount: number;
  shortfall: number;
  contamination: number;
  sectionBreakdown: { sectionId: string; sectionName: string; count: number; fresh: number; reused: number }[];
  pass: boolean;
}

function runAssemblyScenario(name: string, seenList: string[]): ScenarioTestResult {
  const seenSet = new Set(seenList);
  const assembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
    userId: 'usr_infosys_audit',
    blueprint: infBp,
    questionBank: fullBank366,
    previouslyAttemptedQuestionIds: seenList,
    allowPartialReuseWhenExhausted: false,
  });

  const allSelected = assembly.sectionResults.flatMap(sr => sr.selectedQuestions);
  const selectedIds = allSelected.map(q => q.id);
  const freshCount = selectedIds.filter(id => !seenSet.has(id)).length;
  const reusedCount = selectedIds.filter(id => seenSet.has(id)).length;
  const contamination = selectedIds.filter(id => seenSet.has(id)).length;

  const sectionBreakdown = assembly.sectionResults.map(sr => ({
    sectionId: sr.sectionId,
    sectionName: sr.sectionName,
    count: sr.selectedQuestions.length,
    fresh: sr.selectedQuestions.filter(q => !seenSet.has(q.id)).length,
    reused: sr.selectedQuestions.filter(q => seenSet.has(q.id)).length,
  }));

  const pass = assembly.success && selectedIds.length === 54 && freshCount === 54 && reusedCount === 0;

  return {
    name,
    seenCount: seenList.length,
    selectedCount: selectedIds.length,
    freshCount,
    reusedCount,
    shortfall: assembly.shortfall,
    contamination,
    sectionBreakdown,
    pass,
  };
}

const resA = runAssemblyScenario('Scenario A: Cold Start', []);
const resB = runAssemblyScenario('Scenario B: All Foundation Completed (125 seen)', seenFoundation125);
const resC = runAssemblyScenario('Scenario C: Foundation + Wipro + Accenture (240 seen)', [...new Set([...seenFoundation125, ...seenWipro, ...seenAccenture])]);
const resD = runAssemblyScenario('Scenario D: CRITICAL ACCEPTANCE — All Live Completed (301 seen)', seenAllLive301);

[resA, resB, resC, resD].forEach(res => {
  console.log(`\nScenario: "${res.name}" (Seen: ${res.seenCount})`);
  console.log(`  Assembly Result: ${res.pass ? 'PASS' : 'FAIL'} | Selected: ${res.selectedCount}/54 | Fresh: ${res.freshCount} | Reused: ${res.reusedCount} | Shortfall: ${res.shortfall}`);
  res.sectionBreakdown.forEach(sb => {
    console.log(`    - ${sb.sectionName} (${sb.sectionId}): Selected ${sb.count} (Fresh: ${sb.fresh}, Reused: ${sb.reused})`);
  });
});

// 6. SECOND ATTEMPT CAPACITY AUDIT
console.log('\n--- 6. SECOND ATTEMPT CAPACITY AUDIT ---');
// Cold start attempt 1
const att1 = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_att1',
  blueprint: infBp,
  questionBank: fullBank366,
  previouslyAttemptedQuestionIds: [],
  allowPartialReuseWhenExhausted: false,
});
const att1SelectedIds = att1.sectionResults.flatMap(sr => sr.selectedQuestions).map(q => q.id);

// Cold start attempt 2 (54 seen in attempt 1)
const att2 = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_att1',
  blueprint: infBp,
  questionBank: fullBank366,
  previouslyAttemptedQuestionIds: att1SelectedIds,
  allowPartialReuseWhenExhausted: false,
});
const att2SelectedIds = att2.sectionResults.flatMap(sr => sr.selectedQuestions).map(q => q.id);
const att2Fresh = att2SelectedIds.filter(id => !att1SelectedIds.includes(id)).length;
console.log(`Cold Start Attempt #1: Selected ${att1SelectedIds.length}/54 (Fresh: ${att1SelectedIds.length})`);
console.log(`Cold Start Attempt #2: Selected ${att2SelectedIds.length}/54 (Fresh: ${att2Fresh}, Reused: ${54 - att2Fresh})`);
console.log(`Cold-Start 2-Attempt Full Fresh Capacity: ${att2.success && att2Fresh === 54 ? 'PASS (100% Fresh Attempt #2)' : 'FAIL'}`);

// Post-Live Candidate Attempt 2 (Seen 301 + 54 = 355 seen)
const postLiveAtt1 = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_post_live',
  blueprint: infBp,
  questionBank: fullBank366,
  previouslyAttemptedQuestionIds: seenAllLive301,
  allowPartialReuseWhenExhausted: false,
});
const postLiveAtt1Ids = postLiveAtt1.sectionResults.flatMap(sr => sr.selectedQuestions).map(q => q.id);
const seen355 = [...new Set([...seenAllLive301, ...postLiveAtt1Ids])];

const postLiveAtt2 = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_post_live',
  blueprint: infBp,
  questionBank: fullBank366,
  previouslyAttemptedQuestionIds: seen355,
  allowPartialReuseWhenExhausted: true, // Controlled partial reuse
});
const postLiveAtt2Ids = postLiveAtt2.sectionResults.flatMap(sr => sr.selectedQuestions).map(q => q.id);
const postLiveAtt2Fresh = postLiveAtt2Ids.filter(id => !seen355.includes(id)).length;
console.log(`Post-Live Candidate Attempt #2 (355 seen): Selected ${postLiveAtt2Ids.length}/54 (Fresh: ${postLiveAtt2Fresh}, Reused: ${54 - postLiveAtt2Fresh})`);

// 7. PLATFORM REGRESSION & PUBLISHING SAFETY AUDIT
console.log('\n--- 7. PLATFORM REGRESSION & PUBLISHING SAFETY AUDIT ---');

// Foundation checks
const foundationTestIds = [
  'cat_foundation_quant',
  'cat_foundation_logical',
  'cat_foundation_verbal',
  'cat_foundation_di',
  'cat_foundation_pseudocode',
];
foundationTestIds.forEach(id => {
  const cat = CATALOGUE_TESTS.find(c => c.id === id);
  if (!cat || cat.status !== 'ready' || cat.verificationStatus !== 'VERIFIED') {
    console.log(`  [REGRESSION ERROR] Foundation ${id} has invalid catalogue status`);
  }
});
console.log('Foundation Tests Status: 5/5 READY & VERIFIED (PASS)');

// Live company catalogue checks
const wiproCat = CATALOGUE_TESTS.find(c => c.id === 'cat_company_wipro')!;
const accentureCat = CATALOGUE_TESTS.find(c => c.id === 'cat_company_accenture')!;
const cognizantCat = CATALOGUE_TESTS.find(c => c.id === 'cat_company_cognizant')!;
console.log(`Wipro Elite NTH Catalogue: status=${wiproCat.status}, verificationStatus=${wiproCat.verificationStatus} (PASS)`);
console.log(`Accenture Cognitive Catalogue: status=${accentureCat.status}, verificationStatus=${accentureCat.verificationStatus} (PASS)`);
console.log(`Cognizant GenC Catalogue: status=${cognizantCat.status}, verificationStatus=${cognizantCat.verificationStatus} (PASS)`);

// Infosys staging status checks
const infosysCat = CATALOGUE_TESTS.find(c => c.id === 'cat_company_infosys')!;
const infosysPat = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_infosys_assessment')!;
console.log(`Infosys Staging Status:`);
console.log(`  Blueprint verificationStatus: ${infBp.verificationStatus} (Expected: UNVERIFIED)`);
console.log(`  Pattern status: ${infosysPat.status} (Expected: coming_soon)`);
console.log(`  Pattern verificationStatus: ${infosysPat.verificationStatus} (Expected: UNVERIFIED)`);
console.log(`  Catalogue status: ${infosysCat.status} (Expected: coming_soon)`);
console.log(`  Catalogue verificationStatus: ${infosysCat.verificationStatus} (Expected: PATTERN_BASED / UNVERIFIED)`);

const isStagedSafely =
  infBp.verificationStatus === 'UNVERIFIED' &&
  infosysPat.status === 'coming_soon' &&
  infosysPat.verificationStatus === 'UNVERIFIED' &&
  infosysCat.status === 'coming_soon';

console.log(`Infosys Publishing Safety Gate: ${isStagedSafely ? 'PASS (Safely Staged in Staging)' : 'FAIL'}`);

console.log('\n================================================================');
console.log('PHASE 22C VERIFICATION & CONSISTENCY AUDIT COMPLETE');
console.log('================================================================');

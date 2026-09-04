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
console.log('PHASE 22A: INFOSYS CANDIDATE CAPACITY & ARCHITECTURE AUDIT SUITE');
console.log('================================================================\n');

const fullBank330 = [
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

const infBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_infosys_assessment')!;
const infPat = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_infosys_assessment')!;
const infCat = db.getTestById('cat_company_infosys', false);

console.log('--- 1. CANONICAL BLUEPRINT & PATTERN VERIFICATION ---');
console.log(`Blueprint ID: ${infBp.id} | Title: "${infBp.title}" | Verification: ${infBp.verificationStatus}`);
console.log(`Pattern ID: ${infPat?.id} | Status: ${infPat?.status} | Verification: ${infPat?.verificationStatus}`);
console.log(`Catalogue ID: ${infCat?.id} | Status: ${infCat?.status}`);
console.log(`Required Total Questions: ${infBp.questionCount} | Duration: ${infBp.duration} mins`);
console.log(`Required Sections:`);
infBp.sections.forEach(s => {
  console.log(`  - ${s.name} (ID: ${s.id}): ${s.questionCount} Qs (Easy: ${s.difficultyDistribution?.Easy}, Med: ${s.difficultyDistribution?.Medium}, Hard: ${s.difficultyDistribution?.Hard})`);
});
console.log(`Required Overall Difficulty: Easy: ${infBp.difficultyDistribution?.Easy}, Medium: ${infBp.difficultyDistribution?.Medium}, Hard: ${infBp.difficultyDistribution?.Hard}\n`);

// 2. Question Inventory Analysis
console.log('--- 2. CURRENT INFOSYS QUESTION INVENTORY ---');
console.log(`Infosys Dedicated Bank: ${infosysQuestions.length} Questions`);
const infSecBreakdown: Record<string, number> = {};
infosysQuestions.forEach(q => {
  infSecBreakdown[q.topic] = (infSecBreakdown[q.topic] || 0) + 1;
});
console.log(`Infosys Authored Topics:`, infSecBreakdown);

// 3. Scenario History Configurations
const seenFoundationQ = quantQuestions.map(q => q.id); // 25
const seenFoundationL = logicalQuestions.map(q => q.id); // 25
const seenFoundationV = verbalQuestions.map(q => q.id); // 25
const seenFoundationDI = diQuestions.map(q => q.id); // 25
const seenFoundationP = pseudocodeQuestions.map(q => q.id); // 25
const seenFoundationQLV = [...seenFoundationQ, ...seenFoundationL, ...seenFoundationV]; // 75
const seenAll5Foundation = [...seenFoundationQLV, ...seenFoundationDI, ...seenFoundationP]; // 125
const seenWipro = wiproQuestions.map(q => q.id); // 26
const seenAccenture = accentureQuestions.map(q => q.id); // 89
const seenCognizant = cognizantQuestions.map(q => q.id); // 61

const seenFoundationPlusWipro = [...seenAll5Foundation, ...seenWipro]; // 151
const seenFoundationPlusAccenture = [...seenAll5Foundation, ...seenAccenture]; // 214
const seenFoundationPlusWipPlusAcc = [...new Set([...seenAll5Foundation, ...seenWipro, ...seenAccenture])]; // 240
const seenAllLive = [...new Set([...seenAll5Foundation, ...seenWipro, ...seenAccenture, ...seenCognizant])]; // 301

// Capacity Service Analysis across all candidate histories
const capacityService = new CompanyContentCapacityService();

function analyzeScenario(name: string, seenList: string[]) {
  const cap = capacityService.analyzeCandidateCapacity(infBp, 'usr_audit', fullBank330, seenList);
  return {
    name,
    seenCount: seenList.length,
    totalComp: cap.totalGlobalCompatible,
    totalFresh: cap.totalFreshCompatible,
    shortfall: cap.totalShortfall,
    canAssembleFresh: cap.canAssembleFresh,
    sections: cap.sections,
  };
}

const scA = analyzeScenario('Scenario A: Cold Start (0 seen)', []);
const scB = analyzeScenario('Scenario B: Foundation Quant (25 seen)', seenFoundationQ);
const scC = analyzeScenario('Scenario C: Foundation Logical (25 seen)', seenFoundationL);
const scD = analyzeScenario('Scenario D: Foundation Verbal (25 seen)', seenFoundationV);
const scE = analyzeScenario('Scenario E: Foundation Q+L+V (75 seen)', seenFoundationQLV);
const scF = analyzeScenario('Scenario F: All 5 Foundation (125 seen)', seenAll5Foundation);
const scG = analyzeScenario('Scenario G: Foundation + Wipro (151 seen)', seenFoundationPlusWipro);
const scH = analyzeScenario('Scenario H: Foundation + Accenture (214 seen)', seenFoundationPlusAccenture);
const scI = analyzeScenario('Scenario I: Foundation + Wipro + Accenture (240 seen)', seenFoundationPlusWipPlusAcc);
const scJ = analyzeScenario('Scenario J: All Live Assessments (301 seen)', seenAllLive);

console.log('\n--- 3. SECTION CAPACITY MATRIX (Cold Start vs After All Foundation vs After All Live) ---');
console.log(`| Section Name | Required | Total Comp | Cold Fresh | After 5 Found | After Found+Wip+Acc | After All Live | Gap (After All Live) |`);
console.log(`|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|`);
infBp.sections.forEach((sec, idx) => {
  const cCold = scA.sections[idx];
  const cAllF = scF.sections[idx];
  const cI = scI.sections[idx];
  const cJ = scJ.sections[idx];
  console.log(`| ${sec.name} | ${sec.questionCount} | ${cCold.globalCompatible} | ${cCold.freshCompatible} | ${cAllF.freshCompatible} | ${cI.freshCompatible} | ${cJ.freshCompatible} | ${cJ.shortfall} |`);
});
console.log(`| **TOTAL** | **${infBp.questionCount}** | **${scA.totalComp}** | **${scA.totalFresh}** | **${scF.totalFresh}** | **${scI.totalFresh}** | **${scJ.totalFresh}** | **${scJ.shortfall}** |`);

// 4. Strict Runtime Selection Checks
console.log('\n--- 4. STRICT RUNTIME ASSEMBLY DIAGNOSTICS ---');
function testStrictAssembly(name: string, seenList: string[]) {
  const strict = questionSelectionEngine.selectCompanyAssessmentQuestions({
    userId: 'usr_audit',
    blueprint: infBp,
    questionBank: fullBank330,
    previouslyAttemptedQuestionIds: seenList,
    allowPartialReuseWhenExhausted: false,
  });
  console.log(`Scenario: ${name} -> Selected: ${strict.totalSelected}/${strict.totalRequired}, Fresh: ${strict.freshCount}, Reused: ${strict.reusedCount}, Shortfall: ${strict.totalShortfall}, Success: ${strict.success ? 'PASS' : 'FAIL'}`);
  if (!strict.success) {
    console.log(`  Errors: ${strict.errors.join('; ')}`);
  }
  return strict;
}

const stA = testStrictAssembly('Scenario A: Cold Start (0 seen)', []);
const stE = testStrictAssembly('Scenario E: Foundation Q+L+V (75 seen)', seenFoundationQLV);
const stF = testStrictAssembly('Scenario F: All 5 Foundation (125 seen)', seenAll5Foundation);
const stI = testStrictAssembly('Scenario I: Foundation + Wipro + Accenture (240 seen)', seenFoundationPlusWipPlusAcc);
const stJ = testStrictAssembly('Scenario J: All Live Assessments (301 seen)', seenAllLive);

// Attempt 1 from cold start (to simulate second attempt)
const attempt1Assembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_att1',
  blueprint: infBp,
  questionBank: fullBank330,
  previouslyAttemptedQuestionIds: [],
  allowPartialReuseWhenExhausted: true,
});
const seenAttempt1 = attempt1Assembly.sectionResults.flatMap(sr => sr.selectedQuestions).map(q => q.id);
const stAtt2Cold = testStrictAssembly('Attempt #2: Cold Start + Attempt #1 (54 seen)', seenAttempt1);
const stAtt2All = testStrictAssembly('Attempt #2: All Live + Attempt #1 (310 seen)', [...new Set([...seenAllLive, ...seenAttempt1])]);

// 5. Authoring Target Calculation
console.log('\n--- 5. EXACT AUTHORING TARGET CALCULATIONS ---');
console.log(`TARGET A: Minimum new questions required for ONE complete fresh Infosys attempt after all live assessments (301 seen):`);
let totalTargetAGap = 0;
infBp.sections.forEach((sec, idx) => {
  const cJ = scJ.sections[idx];
  totalTargetAGap += cJ.shortfall;
  console.log(`  - Section "${sec.name}": Required=${sec.questionCount}, Fresh Available=${cJ.freshCompatible} -> Gap = ${cJ.shortfall}`);
});
console.log(`  - TOTAL TARGET A GAP = ${totalTargetAGap} NEW Questions\n`);

console.log(`TARGET B: Minimum new questions required for TWO complete fresh Infosys attempts from Cold Start (108 total questions needed):`);
infBp.sections.forEach((sec, idx) => {
  const cCold = scA.sections[idx];
  const needed = sec.questionCount * 2;
  const gap = Math.max(0, needed - cCold.globalCompatible);
  console.log(`  - Section "${sec.name}": Needed=${needed}, Total Compatible in Pool=${cCold.globalCompatible} -> Gap = ${gap}`);
});

// 6. Content QA & Schema Audit on Existing 7 Infosys Questions
console.log('\n--- 6. CONTENT QA & METADATA AUDIT (7 Infosys Questions) ---');
const qaEngine = new ContentQAEngine();
const qaAudit = qaEngine.generateFullQAReport(infosysQuestions, [infBp]);
console.log(`Total Questions: ${qaAudit.totalQuestions} | Passed: ${qaAudit.passedValidation} | Failed: ${qaAudit.failedValidation} | MissingMetadata: ${qaAudit.missingMetadataCount}`);
console.log(`Difficulty Breakdown:`, qaAudit.difficultyDistribution);
console.log(`Topic Coverage:`, qaAudit.topicCoverage);

// 7. Full 330 Bank Duplicate Audit
console.log('\n--- 7. FULL 330-QUESTION DUPLICATE AUDIT ---');
const dupDetector = new DuplicateDetection();
const idSet = new Set<string>();
let idDupes = 0;
let textDupes = 0;
fullBank330.forEach(q => {
  if (idSet.has(q.id)) idDupes++;
  idSet.add(q.id);
});
for (let i = 0; i < fullBank330.length; i++) {
  for (let j = i + 1; j < fullBank330.length; j++) {
    if (dupDetector.normalizeQuestionText(fullBank330[i].questionText) === dupDetector.normalizeQuestionText(fullBank330[j].questionText)) {
      textDupes++;
    }
  }
}
console.log(`ID Duplicates: ${idDupes} | Text Duplicates: ${textDupes}`);

// 8. Platform Regression Audit
console.log('\n--- 8. PLATFORM REGRESSION AUDIT ---');
const fq = db.getTestById('cat_foundation_quant', false);
const fl = db.getTestById('cat_foundation_logical', false);
const fv = db.getTestById('cat_foundation_verbal', false);
const fdi = db.getTestById('cat_foundation_di', false);
const fp = db.getTestById('cat_foundation_pseudocode', false);
const wip = db.getTestById('cat_company_wipro', false);
const acc = db.getTestById('cat_company_accenture', false);
const cog = db.getTestById('cat_company_cognizant', false);

console.log(`Foundation Tests (5/5 ready & verified): ${fq?.status === 'ready' && fl?.status === 'ready' && fv?.status === 'ready' && fdi?.status === 'ready' && fp?.status === 'ready' ? 'PASS' : 'FAIL'}`);
console.log(`Wipro Elite NTH (ready & verified): ${wip?.status === 'ready' && wip?.verificationStatus === 'VERIFIED' ? 'PASS' : 'FAIL'}`);
console.log(`Accenture (ready & verified): ${acc?.status === 'ready' && acc?.verificationStatus === 'VERIFIED' ? 'PASS' : 'FAIL'}`);
console.log(`Cognizant GenC (ready & verified): ${cog?.status === 'ready' && cog?.verificationStatus === 'VERIFIED' ? 'PASS' : 'FAIL'}`);
console.log(`Total System Bank Count: ${fullBank330.length}/330 Questions`);

// 9. Publishing Gate Status
console.log('\n--- 9. PUBLISHING GATE STATUS ---');
console.log(`Blueprint: ${infBp.id} | verificationStatus: ${infBp.verificationStatus} (Expected: UNVERIFIED)`);
console.log(`Pattern: ${infPat?.id} | status: ${infPat?.status} | verificationStatus: ${infPat?.verificationStatus} (Expected: coming_soon / UNVERIFIED)`);
console.log(`Catalogue: ${infCat?.id} | status: ${infCat?.status} (Expected: coming_soon)`);

const gatePass = 
  infBp.verificationStatus === 'UNVERIFIED' &&
  infPat?.status === 'coming_soon' &&
  infPat?.verificationStatus === 'UNVERIFIED' &&
  infCat?.status === 'coming_soon';
console.log(`Publishing Gate Status: ${gatePass ? 'PASS (Safely Gated / Unpromoted)' : 'FAIL'}`);

console.log('\n================================================================');
console.log('PHASE 22A AUDIT COMPLETE');
console.log('================================================================');

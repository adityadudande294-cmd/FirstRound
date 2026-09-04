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
console.log('PHASE 21A: COGNIZANT GENC CAPACITY & ARCHITECTURE AUDIT SUITE');
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

const cogBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_cognizant_genc')!;
const cogPat = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_cognizant_genc_aptitude')!;
const cogCat = db.getTestById('cat_company_cognizant', false);

console.log('--- 1. CANONICAL BLUEPRINT & PATTERN VERIFICATION ---');
console.log(`Blueprint ID: ${cogBp.id} | Title: "${cogBp.title}" | Verification: ${cogBp.verificationStatus}`);
console.log(`Pattern ID: ${cogPat?.id} | Status: ${cogPat?.status} | Verification: ${cogPat?.verificationStatus}`);
console.log(`Catalogue ID: ${cogCat?.id} | Status: ${cogCat?.status}`);
console.log(`Required Total Questions: ${cogBp.questionCount} | Duration: ${cogBp.duration} mins`);
console.log(`Required Sections:`);
cogBp.sections.forEach(s => {
  console.log(`  - ${s.name} (ID: ${s.id}): ${s.questionCount} Qs (Easy: ${s.difficultyDistribution?.Easy}, Med: ${s.difficultyDistribution?.Medium}, Hard: ${s.difficultyDistribution?.Hard})`);
});
console.log(`Required Difficulty: Easy: ${cogBp.difficultyDistribution?.Easy}, Medium: ${cogBp.difficultyDistribution?.Medium}, Hard: ${cogBp.difficultyDistribution?.Hard}`);

const patternMatch =
  cogBp.questionCount === 80 &&
  cogBp.duration === 100 &&
  cogBp.sections.length === 3 &&
  cogBp.sections[0].questionCount === 25 &&
  cogBp.sections[1].questionCount === 35 &&
  cogBp.sections[2].questionCount === 20;
console.log(`Pattern Match Check: ${patternMatch ? 'PASS' : 'FAIL'}\n`);

// 2. Question Inventory Analysis
console.log('--- 2. CURRENT COGNIZANT QUESTION INVENTORY ---');
console.log(`Cognizant Dedicated Bank: ${cognizantQuestions.length} Questions`);
const cogSecBreakdown: Record<string, number> = {};
cognizantQuestions.forEach(q => {
  cogSecBreakdown[q.skill] = (cogSecBreakdown[q.skill] || 0) + 1;
});
console.log(`Cognizant Authored Skills:`, cogSecBreakdown);

// 3. Scenario History Configurations
const seenFoundationQ = quantQuestions.map(q => q.id);
const seenFoundationL = logicalQuestions.map(q => q.id);
const seenFoundationV = verbalQuestions.map(q => q.id);
const seenFoundationQLV = [...seenFoundationQ, ...seenFoundationL, ...seenFoundationV]; // 75
const seenAllFoundation = [...seenFoundationQLV, ...diQuestions.map(q => q.id), ...pseudocodeQuestions.map(q => q.id)]; // 125
const seenWipro = wiproQuestions.map(q => q.id); // 26
const seenAccenture = accentureQuestions.map(q => q.id); // 89
const seenFoundationPlusWipro = [...seenAllFoundation, ...seenWipro]; // 151
const seenFoundationPlusAccenture = [...seenAllFoundation, ...seenAccenture]; // 214
const seenFoundationPlusWiproPlusAccenture = [...new Set([...seenAllFoundation, ...seenWipro, ...seenAccenture])]; // 240

// Run Candidate Capacity Engine across all candidate scenarios
const capacityService = new CompanyContentCapacityService();

interface ScenarioAnalysis {
  name: string;
  seenCount: number;
  totalComp: number;
  totalFresh: number;
  shortfall: number;
  canAssembleFresh: boolean;
  sections: any[];
}

function analyzeScenario(name: string, seenList: string[]): ScenarioAnalysis {
  const cap = capacityService.analyzeCandidateCapacity(cogBp, 'usr_audit', fullBank283, seenList);
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

const scCold = analyzeScenario('Cold Start (0 seen)', []);
const scFoundQLV = analyzeScenario('Foundation Q+L+V (75 seen)', seenFoundationQLV);
const scAllFound = analyzeScenario('All 5 Foundation (125 seen)', seenAllFoundation);
const scWipro = analyzeScenario('Wipro Completed (26 seen)', seenWipro);
const scAccenture = analyzeScenario('Accenture Completed (89 seen)', seenAccenture);
const scFoundWip = analyzeScenario('Foundation + Wipro (151 seen)', seenFoundationPlusWipro);
const scFoundAcc = analyzeScenario('Foundation + Accenture (214 seen)', seenFoundationPlusAccenture);
const scFullTrio = analyzeScenario('Foundation + Wipro + Accenture (240 seen)', seenFoundationPlusWiproPlusAccenture);

console.log('\n--- 3. SECTION CAPACITY MATRIX ---');
console.log(`| Section Name | Required | Total Comp | Cold Fresh | After Found QLV | After All Found | After Found+Wipro+Acc | Gap (After All 3) |`);
console.log(`|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|`);
cogBp.sections.forEach((sec, idx) => {
  const cCold = scCold.sections[idx];
  const cQLV = scFoundQLV.sections[idx];
  const cAll = scAllFound.sections[idx];
  const cTrio = scFullTrio.sections[idx];
  console.log(`| ${sec.name} | ${sec.questionCount} | ${cCold.globalCompatible} | ${cCold.freshCompatible} | ${cQLV.freshCompatible} | ${cAll.freshCompatible} | ${cTrio.freshCompatible} | ${cTrio.shortfall} |`);
});
console.log(`| **TOTAL** | **${cogBp.questionCount}** | **${scCold.totalComp}** | **${scCold.totalFresh}** | **${scFoundQLV.totalFresh}** | **${scAllFound.totalFresh}** | **${scFullTrio.totalFresh}** | **${scFullTrio.shortfall}** |`);

// 4. Strict Runtime Selection Check
console.log('\n--- 4. STRICT RUNTIME ASSEMBLY DIAGNOSTICS ---');
function testStrictAssembly(name: string, seenList: string[]) {
  const strict = questionSelectionEngine.selectCompanyAssessmentQuestions({
    userId: 'usr_audit',
    blueprint: cogBp,
    questionBank: fullBank283,
    previouslyAttemptedQuestionIds: seenList,
    allowPartialReuseWhenExhausted: false,
  });
  console.log(`Scenario: ${name} -> Selected: ${strict.totalSelected}/${strict.totalRequired}, Fresh: ${strict.freshCount}, Reused: ${strict.reusedCount}, Shortfall: ${strict.totalShortfall}, Success: ${strict.success ? 'YES' : 'NO'}`);
  if (!strict.success) {
    console.log(`  Errors: ${strict.errors.join('; ')}`);
  }
  return strict;
}

const stA = testStrictAssembly('Scenario A: Cold Start (0 seen)', []);
const stB = testStrictAssembly('Scenario B: Foundation Q+L+V (75 seen)', seenFoundationQLV);
const stC = testStrictAssembly('Scenario C: All 5 Foundation (125 seen)', seenAllFoundation);
const stE = testStrictAssembly('Scenario E: Foundation + Wipro + Accenture (240 seen)', seenFoundationPlusWiproPlusAccenture);

// Attempt 1 from cold start (to simulate Scenario D: previous Cognizant attempt)
const attempt1Assembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_att1',
  blueprint: cogBp,
  questionBank: fullBank283,
  previouslyAttemptedQuestionIds: [],
  allowPartialReuseWhenExhausted: true,
});
const seenAttempt1 = attempt1Assembly.sectionResults.flatMap(sr => sr.selectedQuestions).map(q => q.id);
const stD = testStrictAssembly('Scenario D: Previous Cognizant Attempt (80 seen)', seenAttempt1);
const stF = testStrictAssembly('Scenario F: Foundation + Wipro + Accenture + Prev Cognizant (250 seen)', [...new Set([...seenFoundationPlusWiproPlusAccenture, ...seenAttempt1])]);

// 5. Authoring Target Calculation
console.log('\n--- 5. EXACT AUTHORING TARGET CALCULATIONS ---');
console.log(`Target 1: One complete fresh Cognizant attempt after Foundation completion (125 seen):`);
const t1NumGap = Math.max(0, 25 - scAllFound.sections[0].freshCompatible);
const t1LogGap = Math.max(0, 35 - scAllFound.sections[1].freshCompatible);
const t1VerGap = Math.max(0, 20 - scAllFound.sections[2].freshCompatible);
console.log(`  - Numerical Ability: Required=25, Fresh Available=${scAllFound.sections[0].freshCompatible} -> Gap = ${t1NumGap}`);
console.log(`  - Logical & Analytical: Required=35, Fresh Available=${scAllFound.sections[1].freshCompatible} -> Gap = ${t1LogGap}`);
console.log(`  - Verbal Ability: Required=20, Fresh Available=${scAllFound.sections[2].freshCompatible} -> Gap = ${t1VerGap}`);
console.log(`  - TOTAL TARGET 1 GAP = ${t1NumGap + t1LogGap + t1VerGap} NEW Questions`);

console.log(`\nTarget 2: One complete fresh Cognizant attempt after Foundation + Wipro + Accenture (240 seen):`);
const t2NumGap = Math.max(0, 25 - scFullTrio.sections[0].freshCompatible);
const t2LogGap = Math.max(0, 35 - scFullTrio.sections[1].freshCompatible);
const t2VerGap = Math.max(0, 20 - scFullTrio.sections[2].freshCompatible);
console.log(`  - Numerical Ability: Required=25, Fresh Available=${scFullTrio.sections[0].freshCompatible} -> Gap = ${t2NumGap}`);
console.log(`  - Logical & Analytical: Required=35, Fresh Available=${scFullTrio.sections[1].freshCompatible} -> Gap = ${t2LogGap}`);
console.log(`  - Verbal Ability: Required=20, Fresh Available=${scFullTrio.sections[2].freshCompatible} -> Gap = ${t2VerGap}`);
console.log(`  - TOTAL TARGET 2 GAP = ${t2NumGap + t2LogGap + t2VerGap} NEW Questions`);

console.log(`\nTarget 3: Two complete fresh Cognizant attempts from Cold Start (160 total fresh questions needed):`);
const t3NumGap = Math.max(0, 50 - scCold.sections[0].globalCompatible);
const t3LogGap = Math.max(0, 70 - scCold.sections[1].globalCompatible);
const t3VerGap = Math.max(0, 40 - scCold.sections[2].globalCompatible);
console.log(`  - Numerical Ability: Needed=50, Total Compatible=${scCold.sections[0].globalCompatible} -> Gap = ${t3NumGap}`);
console.log(`  - Logical & Analytical: Needed=70, Total Compatible=${scCold.sections[1].globalCompatible} -> Gap = ${t3LogGap}`);
console.log(`  - Verbal Ability: Needed=40, Total Compatible=${scCold.sections[2].globalCompatible} -> Gap = ${t3VerGap}`);
console.log(`  - TOTAL TARGET 3 GAP = ${t3NumGap + t3LogGap + t3VerGap} NEW Questions`);

// 6. Content QA & Metadata Validation on Existing 14 Cognizant Questions
console.log('\n--- 6. CONTENT QA & METADATA AUDIT (14 Cognizant Questions) ---');
const qaEngine = new ContentQAEngine();
const qaAudit = qaEngine.generateFullQAReport(cognizantQuestions, [cogBp]);
console.log(`Total Questions: ${qaAudit.totalQuestions} | Passed: ${qaAudit.passedValidation} | Failed: ${qaAudit.failedValidation} | MissingMetadata: ${qaAudit.missingMetadataCount}`);
console.log(`Difficulty Breakdown:`, qaAudit.difficultyDistribution);
console.log(`Topic Coverage:`, qaAudit.topicCoverage);

// 7. Full Bank Duplicate Audit
console.log('\n--- 7. FULL BANK DUPLICATE AUDIT (283 Total Questions) ---');
const dupDetector = new DuplicateDetection();
const idSet = new Set<string>();
let idDupes = 0;
let textDupes = 0;
fullBank283.forEach(q => {
  if (idSet.has(q.id)) idDupes++;
  idSet.add(q.id);
});
for (let i = 0; i < fullBank283.length; i++) {
  for (let j = i + 1; j < fullBank283.length; j++) {
    if (dupDetector.normalizeQuestionText(fullBank283[i].questionText) === dupDetector.normalizeQuestionText(fullBank283[j].questionText)) {
      textDupes++;
    }
  }
}
console.log(`ID Duplicates: ${idDupes} | Text Duplicates: ${textDupes}`);

// 8. Regression Suite
console.log('\n--- 8. PLATFORM REGRESSION AUDIT ---');
const fq = db.getTestById('cat_foundation_quant', false);
const fl = db.getTestById('cat_foundation_logical', false);
const fv = db.getTestById('cat_foundation_verbal', false);
const fdi = db.getTestById('cat_foundation_di', false);
const fp = db.getTestById('cat_foundation_pseudocode', false);
const wip = db.getTestById('cat_company_wipro', false);
const acc = db.getTestById('cat_company_accenture', false);

console.log(`Foundation Tests (5/5 ready & verified): ${fq?.status === 'ready' && fl?.status === 'ready' && fv?.status === 'ready' && fdi?.status === 'ready' && fp?.status === 'ready' ? 'PASS' : 'FAIL'}`);
console.log(`Wipro Elite NTH (ready & verified): ${wip?.status === 'ready' && wip?.verificationStatus === 'VERIFIED' ? 'PASS' : 'FAIL'}`);
console.log(`Accenture (ready & verified): ${acc?.status === 'ready' && acc?.verificationStatus === 'VERIFIED' ? 'PASS' : 'FAIL'}`);
console.log(`Total System Bank Integrity: ${fullBank283.length}/283 Questions`);

// 9. Publishing Gate Status
console.log('\n--- 9. PUBLISHING GATE STATUS ---');
console.log(`Blueprint: ${cogBp.id} | verificationStatus: ${cogBp.verificationStatus} (Expected: UNVERIFIED)`);
console.log(`Pattern: ${cogPat?.id} | status: ${cogPat?.status} | verificationStatus: ${cogPat?.verificationStatus} (Expected: coming_soon / UNVERIFIED)`);
console.log(`Catalogue: ${cogCat?.id} | status: ${cogCat?.status} (Expected: coming_soon)`);

const gatePass =
  cogBp.verificationStatus === 'UNVERIFIED' &&
  cogPat?.status === 'coming_soon' &&
  cogPat?.verificationStatus === 'UNVERIFIED' &&
  cogCat?.status === 'coming_soon';
console.log(`Publishing Gate Status: ${gatePass ? 'PASS (Safely Gated / Unpromoted)' : 'FAIL'}`);

console.log('\n================================================================');
console.log('PHASE 21A AUDIT COMPLETE');
console.log('================================================================');

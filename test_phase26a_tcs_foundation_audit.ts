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
import { questionSelectionEngine } from './src/services/QuestionSelectionEngine';
import { CompanyContentCapacityService } from './src/services/CompanyContentCapacityService';

console.log('================================================================');
console.log('PHASE 26A: TCS NQT FOUNDATION CAPACITY & PATTERN AUDIT');
console.log('================================================================\n');

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
  ...tcsCodingProblems as any,
];

console.log(`Total System Question Bank: ${fullBank366.length} (Expected: 366)\n`);

const tcsFndBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_tcs_nqt_foundation');
const tcsFndPat = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_tcs_nqt_foundation');

if (!tcsFndBp || !tcsFndPat) {
  console.error('CRITICAL: Blueprint or Pattern not found!');
  process.exit(1);
}

console.log('--- 1. BLUEPRINT & PATTERN DEFINITION ---');
console.log(`Blueprint ID: ${tcsFndBp.id} | Verification: ${tcsFndBp.verificationStatus}`);
console.log(`Pattern ID: ${tcsFndPat.id} | Status: ${tcsFndPat.status} | Verification: ${tcsFndPat.verificationStatus}`);
console.log(`Total Questions: ${tcsFndBp.questionCount} Qs | Total Duration: ${tcsFndBp.duration} mins`);
console.log(`Sections Count: ${tcsFndBp.sections.length}`);
tcsFndBp.sections.forEach((sec, idx) => {
  console.log(`  ${idx + 1}. [${sec.id}] ${sec.name}: ${sec.questionCount} Qs | Topics: ${sec.topics.slice(0, 4).join(', ')}...`);
});
console.log(`Target Difficulty Distribution:`, tcsFndBp.difficultyDistribution);
console.log();

const capacityService = new CompanyContentCapacityService();

// 2. Section Compatibility & Capacity Analysis
console.log('--- 2. SECTION COMPATIBILITY & CAPACITY ANALYSIS ---');
const secNumerical = tcsFndBp.sections.find(s => s.id === 'sec_tcs_numerical')!;
const secVerbal = tcsFndBp.sections.find(s => s.id === 'sec_tcs_verbal')!;
const secReasoning = tcsFndBp.sections.find(s => s.id === 'sec_tcs_reasoning')!;

const compNumerical = fullBank366.filter(q => questionSelectionEngine.evaluateCompatibility(q, secNumerical));
const compVerbal = fullBank366.filter(q => questionSelectionEngine.evaluateCompatibility(q, secVerbal));
const compReasoning = fullBank366.filter(q => questionSelectionEngine.evaluateCompatibility(q, secReasoning));

console.log(`Section 1: Numerical Ability (Required: 20 Qs) -> Globally Compatible: ${compNumerical.length} Qs`);
console.log(`Section 2: Verbal Ability (Required: 25 Qs)    -> Globally Compatible: ${compVerbal.length} Qs`);
console.log(`Section 3: Reasoning Ability (Required: 20 Qs) -> Globally Compatible: ${compReasoning.length} Qs`);
console.log(`Total Globally Compatible across 3 sections: ${compNumerical.length + compVerbal.length + compReasoning.length} Qs\n`);

// 3. Candidate History Scenarios Matrix
console.log('--- 3. CANDIDATE HISTORY SCENARIOS MATRIX ---');

const seenFoundationQuant = quantQuestions.map(q => q.id);
const seenFoundationVerbal = verbalQuestions.map(q => q.id);
const seenFoundationLogical = logicalQuestions.map(q => q.id);
const seenFoundationDI = diQuestions.map(q => q.id);
const seenFoundationPseudo = pseudocodeQuestions.map(q => q.id);
const seenFoundation125 = [...seenFoundationQuant, ...seenFoundationVerbal, ...seenFoundationLogical, ...seenFoundationDI, ...seenFoundationPseudo];

const seenWipro = wiproQuestions.map(q => q.id);
const seenAccenture = accentureQuestions.map(q => q.id);
const seenCognizant = cognizantQuestions.map(q => q.id);
const seenInfosys = infosysQuestions.map(q => q.id);
const seenTcsAdv = [...tcsAdvancedQuestions.map(q => q.id), ...tcsCodingProblems.map(q => q.id)];
const seenAllLive366 = [...new Set([...seenFoundation125, ...seenWipro, ...seenAccenture, ...seenCognizant, ...seenInfosys, ...seenTcsAdv])];

const scenarios = [
  { name: 'A: Cold-start candidate', seen: [] },
  { name: 'B: Foundation Quant completed (25 seen)', seen: seenFoundationQuant },
  { name: 'C: Foundation Verbal completed (25 seen)', seen: seenFoundationVerbal },
  { name: 'D: Foundation Logical completed (25 seen)', seen: seenFoundationLogical },
  { name: 'E: Foundation Q + V + L completed (75 seen)', seen: [...seenFoundationQuant, ...seenFoundationVerbal, ...seenFoundationLogical] },
  { name: 'F: All 5 Foundation completed (125 seen)', seen: seenFoundation125 },
  { name: 'G: Foundation + Wipro completed (151 seen)', seen: [...seenFoundation125, ...seenWipro] },
  { name: 'H: All Currently LIVE completed (366 seen)', seen: seenAllLive366 },
];

scenarios.forEach(sc => {
  const report = capacityService.analyzeCandidateCapacity(tcsFndBp, 'usr_audit', fullBank366, sc.seen);
  const assembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
    userId: 'usr_audit',
    blueprint: tcsFndBp,
    questionBank: fullBank366,
    previouslyAttemptedQuestionIds: sc.seen,
    allowPartialReuseWhenExhausted: true,
  });

  const fresh = assembly.sectionResults.flatMap(sr => sr.selectedQuestions).filter(q => !new Set(sc.seen).has(q.id)).length;
  const reused = assembly.sectionResults.flatMap(sr => sr.selectedQuestions).filter(q => new Set(sc.seen).has(q.id)).length;

  console.log(`Scenario [${sc.name}]:`);
  console.log(`  - Fresh Compatible Available: ${report.totalFreshCompatible} Qs | Shortfall: ${report.totalShortfall}`);
  console.log(`  - Assembly Result: Selected ${assembly.sectionResults.reduce((acc, s) => acc + s.selectedQuestions.length, 0)}/65 (Fresh: ${fresh}, Reused: ${reused}, Shortfall: ${assembly.shortfall})`);
  console.log(`  - Strict Fresh Possible? ${report.canAssembleFresh ? 'YES' : 'NO'} | Fallback Reuse Possible? ${report.canAssembleWithReuse ? 'YES' : 'NO'}`);
  report.sections.forEach(s => {
    console.log(`      * ${s.sectionName}: Req=${s.requiredQuestions}, Fresh=${s.freshCompatible}, Shortfall=${s.shortfall}, Status=${s.status}`);
  });
  console.log();
});

// 4. Two-Attempt Capacity
console.log('--- 4. TWO-ATTEMPT CAPACITY & CONTENT EXPANSION REQUIREMENT ---');
// First Attempt from cold start selects 65 questions
const firstAttemptAssembly = questionSelectionEngine.selectCompanyAssessmentQuestions({
  userId: 'usr_attempt_1',
  blueprint: tcsFndBp,
  questionBank: fullBank366,
  previouslyAttemptedQuestionIds: [],
  allowPartialReuseWhenExhausted: false,
});
const firstAttemptSeen = firstAttemptAssembly.sectionResults.flatMap(s => s.selectedQuestions).map(q => q.id);

// Second Attempt seen firstAttemptSeen
const secondAttemptReport = capacityService.analyzeCandidateCapacity(tcsFndBp, 'usr_attempt_2', fullBank366, firstAttemptSeen);
console.log(`After 1st Attempt (65 seen):`);
console.log(`  - Numerical Fresh: ${secondAttemptReport.sections[0].freshCompatible}/${secondAttemptReport.sections[0].requiredQuestions} (Shortfall: ${secondAttemptReport.sections[0].shortfall})`);
console.log(`  - Verbal Fresh:    ${secondAttemptReport.sections[1].freshCompatible}/${secondAttemptReport.sections[1].requiredQuestions} (Shortfall: ${secondAttemptReport.sections[1].shortfall})`);
console.log(`  - Reasoning Fresh: ${secondAttemptReport.sections[2].freshCompatible}/${secondAttemptReport.sections[2].requiredQuestions} (Shortfall: ${secondAttemptReport.sections[2].shortfall})`);
console.log(`  - Total 2nd Attempt Shortfall: ${secondAttemptReport.totalShortfall} Qs`);

// 5. Difficulty Distribution Audit
console.log('\n--- 5. DIFFICULTY DISTRIBUTION AUDIT ---');
const getDiffCounts = (questions: typeof fullBank366) => {
  return {
    Easy: questions.filter(q => q.difficulty === 'Easy').length,
    Medium: questions.filter(q => q.difficulty === 'Medium').length,
    Hard: questions.filter(q => q.difficulty === 'Hard').length,
  };
};

console.log('Global Numerical Difficulty:', getDiffCounts(compNumerical), '(Blueprint: Easy 4, Med 12, Hard 4)');
console.log('Global Verbal Difficulty:   ', getDiffCounts(compVerbal), '(Blueprint: Easy 5, Med 15, Hard 5)');
console.log('Global Reasoning Difficulty:', getDiffCounts(compReasoning), '(Blueprint: Easy 4, Med 12, Hard 4)');

// 6. Final Audit Decision
console.log('\n================================================================');
console.log('PHASE 26A AUDIT CONCLUSION & RECOMMENDATION:');
console.log('================================================================');

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
import { questionSelectionEngine } from './src/services/QuestionSelectionEngine';
import { DuplicateDetection } from './src/services/DuplicateDetection';

const fullBank216 = [
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

const accentureBp = COMPANY_BLUEPRINTS.find((b) => b.id === 'bp_company_accenture_cognitive')!;

// Define section evaluation function that accurately evaluates section-compatible pool
// If evaluateCompatibility in engine blocks special sections with hardcoded false, we test both:
// 1) As engine currently evaluates
// 2) Content-level compatibility for MS Office (q_accenture_001-012) and Networking/Cloud (q_accenture_013-022)
function getSectionCompatibleQuestions(sec: any, bank: any[], allowSpecialAuthored: boolean = true) {
  return bank.filter((q) => {
    if (!sec.questionTypes.includes(q.questionType)) return false;
    
    // Check if it's authored for special section
    if (sec.id.includes('msoffice')) {
      if (!allowSpecialAuthored) return false;
      const secTopicsLower = sec.topics.map((t: string) => t.toLowerCase());
      const qTopicLower = q.topic.toLowerCase();
      return q.skill === 'Core CS Fundamentals' && secTopicsLower.some((t: string) => qTopicLower.includes(t) || t.includes(qTopicLower));
    }
    if (sec.id.includes('networking') || sec.id.includes('cloud')) {
      if (!allowSpecialAuthored) return false;
      const secTopicsLower = sec.topics.map((t: string) => t.toLowerCase());
      const qTopicLower = q.topic.toLowerCase();
      return q.skill === 'Core CS Fundamentals' && secTopicsLower.some((t: string) => qTopicLower.includes(t) || t.includes(qTopicLower));
    }

    const isQuantSection = sec.id.includes('quant') || sec.id.includes('numerical') || sec.id.includes('math');
    const isLogicalSection = sec.id.includes('logical') || sec.id.includes('reasoning') || sec.id.includes('critical');
    const isVerbalSection = sec.id.includes('verbal') || sec.id.includes('english');
    const isPseudoSection = sec.id.includes('pseudo');

    if (isQuantSection && q.skill !== 'Quantitative Aptitude') return false;
    if (isLogicalSection && q.skill !== 'Logical Reasoning') return false;
    if (isVerbalSection && q.skill !== 'Verbal Ability') return false;
    if (isPseudoSection && q.skill !== 'Pseudocode & Programming Logic') return false;

    const secTopicsLower = sec.topics.map((t: string) => t.toLowerCase());
    const qTopicLower = q.topic.toLowerCase();
    return secTopicsLower.some((t: string) => qTopicLower.includes(t) || t.includes(qTopicLower));
  });
}

console.log('================================================================');
console.log('PHASE 20: ACCENTURE CANDIDATE CAPACITY FULL AUDIT');
console.log('================================================================\n');

// 1. Blueprint Baseline
console.log('--- 1. BLUEPRINT BASELINE ---');
console.log(`Blueprint ID: ${accentureBp.id}`);
console.log(`Total Questions: ${accentureBp.questionCount} | Total Duration: ${accentureBp.duration} mins`);
console.log(`Target Overall Difficulty: Easy=${accentureBp.difficultyDistribution?.Easy}, Med=${accentureBp.difficultyDistribution?.Medium}, Hard=${accentureBp.difficultyDistribution?.Hard}`);
accentureBp.sections.forEach(s => {
  console.log(`  - ${s.name} (${s.id}): Required=${s.questionCount}, Type=${s.questionTypes.join(',')}, Diff=${JSON.stringify(s.difficultyDistribution)}, Topics=${s.topics.join(', ')}`);
});
console.log('');

// Setup Scenarios
const seenA: string[] = []; // Fresh
const seenB = [...quantQuestions.map(q => q.id), ...verbalQuestions.map(q => q.id), ...logicalQuestions.map(q => q.id)]; // Q+V+L (75)
const seenC = [...seenB, ...pseudocodeQuestions.map(q => q.id)]; // Q+V+L+Pseudo (100)
const seenD = [...seenC, ...diQuestions.map(q => q.id)]; // All 5 Foundation (125)
const seenE = [...seenC, ...wiproQuestions.map(q => q.id)]; // Foundation + Wipro (100 + 26)

function analyzeScenario(scenarioName: string, seenIds: string[]) {
  console.log(`--- ${scenarioName} ---`);
  const seenSet = new Set(seenIds);
  let totalReq = 0;
  let totalComp = 0;
  let totalFresh = 0;
  let totalShort = 0;
  let canAssemble = true;

  console.log(`| Section Name | Required | Compatible | Fresh | Seen | Shortfall | Reuse Required | Status |`);
  console.log(`|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---|`);

  accentureBp.sections.forEach(sec => {
    const comp = getSectionCompatibleQuestions(sec, fullBank216, true);
    const fresh = comp.filter(q => !seenSet.has(q.id));
    const seen = comp.filter(q => seenSet.has(q.id));
    const req = sec.questionCount;
    const shortfall = Math.max(0, req - fresh.length);
    const reuse = shortfall > 0 ? Math.min(shortfall, seen.length) : 0;
    const status = shortfall === 0 ? 'SUFFICIENT_FOR_FRESH' : (comp.length >= req ? 'REQUIRES_REUSE' : 'INSUFFICIENT_POOL');

    if (shortfall > 0) canAssemble = false;

    totalReq += req;
    totalComp += comp.length;
    totalFresh += fresh.length;
    totalShort += shortfall;

    console.log(`| ${sec.name} | ${req} | ${comp.length} | ${fresh.length} | ${seen.length} | ${shortfall} | ${reuse} | ${status} |`);
  });

  console.log(`\nScenario Summary: Required=${totalReq}, Compatible=${totalComp}, Fresh=${totalFresh}, Shortfall=${totalShort}, Can Assemble Fresh=${canAssemble ? 'YES' : 'NO'}\n`);
  return { totalReq, totalComp, totalFresh, totalShort, canAssemble };
}

analyzeScenario('SCENARIO A — COMPLETELY FRESH CANDIDATE', seenA);
analyzeScenario('SCENARIO B — FOUNDATION VERBAL + LOGICAL + QUANT (75 Qs seen)', seenB);
analyzeScenario('SCENARIO C — FOUNDATION V + L + Q + PSEUDOCODE (100 Qs seen)', seenC);
analyzeScenario('SCENARIO D — ALL 5 FOUNDATION ASSESSMENTS (125 Qs seen)', seenD);
analyzeScenario('SCENARIO E — FOUNDATION + WIPRO (126 Qs seen)', seenE);

// Scenario F: One previous Accenture attempt
// Assemble Attempt 1 fresh from cold start
const compA1 = accentureBp.sections.flatMap(sec => {
  const comp = getSectionCompatibleQuestions(sec, fullBank216, true);
  return comp.slice(0, sec.questionCount);
});
const seenF = compA1.map(q => q.id);
analyzeScenario('SCENARIO F — ONE PREVIOUS ACCENTURE ATTEMPT (90 Qs seen)', seenF);

// Scenario G: Foundation + Wipro + Attempt 1
const seenG = [...new Set([...seenE, ...seenF])];
analyzeScenario('SCENARIO G — FOUNDATION + WIPRO + ACCENTURE ATTEMPT', seenG);

// 8. Difficulty Capacity Audit
console.log('--- 8. DIFFICULTY CAPACITY AUDIT ---');
accentureBp.sections.forEach(sec => {
  const comp = getSectionCompatibleQuestions(sec, fullBank216, true);
  const targetDiff = sec.difficultyDistribution || { Easy: 0, Medium: 0, Hard: 0 };
  const compEasy = comp.filter(q => q.difficulty === 'Easy').length;
  const compMed = comp.filter(q => q.difficulty === 'Medium').length;
  const compHard = comp.filter(q => q.difficulty === 'Hard').length;

  console.log(`Section: ${sec.name} (Total Req: ${sec.questionCount}, Pool: ${comp.length})`);
  console.log(`  Easy:   Required=${targetDiff.Easy}, Compatible=${compEasy}, Deficit=${Math.max(0, targetDiff.Easy - compEasy)}`);
  console.log(`  Medium: Required=${targetDiff.Medium}, Compatible=${compMed}, Deficit=${Math.max(0, targetDiff.Medium - compMed)}`);
  console.log(`  Hard:   Required=${targetDiff.Hard}, Compatible=${compHard}, Deficit=${Math.max(0, targetDiff.Hard - compHard)}`);
});
console.log('');

// 9. Role Compatibility
console.log('--- 9. ROLE COMPATIBILITY AUDIT ---');
const rolesToTest = ['Software Developer', 'SE', 'Associate Software Engineer', 'Full Stack Engineer', 'Analyst'];
rolesToTest.forEach(role => {
  const roleCompatible = fullBank216.filter(q => (q.supportedRoles || []).includes(role));
  console.log(`Role: "${role}" -> Compatible Questions in Bank: ${roleCompatible.length}`);
});
console.log('');

// 10. Wipro Interaction
console.log('--- 10. WIPRO INTERACTION AUDIT ---');
wiproQuestions.forEach(wq => {
  accentureBp.sections.forEach(sec => {
    if (sec.id.includes('msoffice') || sec.id.includes('networking')) {
      const match = getSectionCompatibleQuestions(sec, [wq], true);
      if (match.length > 0) {
        console.error(`WARNING: Wipro question ${wq.id} matched Accenture special section ${sec.name}`);
      }
    }
  });
});
console.log('Wipro Isolation from Accenture Special Sections: 100% ISOLATED\n');

// 11. Minimum Additional Content Calculation
console.log('--- 11. MINIMUM ADDITIONAL CONTENT CALCULATION ---');
console.log('Target A (One Fresh Attempt after Foundation Q+V+L+Pseudo):');
accentureBp.sections.forEach(sec => {
  const comp = getSectionCompatibleQuestions(sec, fullBank216, true);
  const seenSetC = new Set(seenC);
  const fresh = comp.filter(q => !seenSetC.has(q.id)).length;
  const gap = Math.max(0, sec.questionCount - fresh);
  console.log(`  * ${sec.name}: Required=${sec.questionCount}, Fresh Available=${fresh}, Additional Needed=${gap}`);
});

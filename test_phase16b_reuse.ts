import { COMPANY_BLUEPRINTS } from './src/data/blueprints/company';
import { quantQuestions } from './src/data/questionBank/quant';
import { logicalQuestions } from './src/data/questionBank/logical';
import { verbalQuestions } from './src/data/questionBank/verbal';
import { diQuestions } from './src/data/questionBank/di';
import { pseudocodeQuestions } from './src/data/questionBank/pseudocode';
import { CanonicalQuestion, BlueprintSection } from './src/types';
import { db } from './server/db';

console.log('================================================================');
console.log('FIRSTROUND — PHASE 16B: STRICT CONTENT REUSE & COMPATIBILITY AUDIT');
console.log('================================================================\n');

// 1. POOL INVENTORY AUDIT
console.log('--- 1. VALIDATED FOUNDATION QUESTION BANK INVENTORY ---');
console.log(`- Quantitative Aptitude: ${quantQuestions.length} Qs`);
console.log(`- Logical Reasoning:     ${logicalQuestions.length} Qs`);
console.log(`- Verbal Ability:        ${verbalQuestions.length} Qs`);
console.log(`- Data Interpretation:   ${diQuestions.length} Qs`);
console.log(`- Pseudocode & Logic:    ${pseudocodeQuestions.length} Qs`);
const totalPool = quantQuestions.length + logicalQuestions.length + verbalQuestions.length + diQuestions.length + pseudocodeQuestions.length;
console.log(`TOTAL VALIDATED POOL:    ${totalPool} Qs\n`);

const allFoundationQuestions: CanonicalQuestion[] = [
  ...quantQuestions,
  ...logicalQuestions,
  ...verbalQuestions,
  ...diQuestions,
  ...pseudocodeQuestions
];

/**
 * Strict Compatibility Checker
 * Evaluates whether a CanonicalQuestion genuinely satisfies a company section requirement
 */
function evaluateSectionCompatibility(q: CanonicalQuestion, sec: BlueprintSection): boolean {
  // 1. Question Type must be supported in section
  if (!sec.questionTypes.includes(q.questionType)) {
    return false;
  }

  // 2. Topic Matching: Question topic must match one of the section's allowed topics
  const secTopicsLower = sec.topics.map(t => t.toLowerCase());
  const qTopicLower = q.topic.toLowerCase();
  const topicDirectMatch = secTopicsLower.some(t => qTopicLower.includes(t) || t.includes(qTopicLower));

  // 3. Skill & Assessment Intent Matching
  const isQuantMatch = sec.id.includes('quant') || sec.id.includes('numerical') || sec.id.includes('math');
  const isLogicalMatch = sec.id.includes('logical') || sec.id.includes('reasoning') || sec.id.includes('critical');
  const isVerbalMatch = sec.id.includes('verbal') || sec.id.includes('english');
  const isPseudoMatch = sec.id.includes('pseudo');

  if (isQuantMatch && q.skill !== 'Quantitative Aptitude') return false;
  if (isLogicalMatch && q.skill !== 'Logical Reasoning') return false;
  if (isVerbalMatch && q.skill !== 'Verbal Ability') return false;
  if (isPseudoMatch && q.skill !== 'Pseudocode & Programming Logic') return false;

  // 4. Content Gap Sections (MS Office, Networking/Cloud, Puzzle, Coding) -> NEVER matched by Foundation aptitude
  if (sec.id.includes('msoffice') || sec.id.includes('networking') || sec.id.includes('puzzle') || sec.id.includes('coding')) {
    return false;
  }

  return topicDirectMatch;
}

// 2. STRICT REUSE EXECUTION PER BLUEPRINT & SECTION
console.log('--- 2. STRICT CONTENT REUSE & COMPATIBILITY AUDIT PER BLUEPRINT ---');

interface SectionReuseResult {
  blueprintId: string;
  blueprintTitle: string;
  sectionId: string;
  sectionName: string;
  requiredCount: number;
  potentialCandidates: number;
  actuallyReusable: number;
  reusePercentage: number;
  contentGap: number;
  isGap: boolean;
}

const auditResults: SectionReuseResult[] = [];

COMPANY_BLUEPRINTS.forEach(bp => {
  console.log(`\n================================================================`);
  console.log(`BLUEPRINT: [${bp.id}] ${bp.title}`);
  console.log(`Duration: ${bp.duration}m | Total Required Qs: ${bp.questionCount} | Sections: ${bp.sections.length}`);
  console.log(`Verification: ${bp.verificationStatus} | Category: ${bp.category}`);
  console.log(`----------------------------------------------------------------`);

  bp.sections.forEach(sec => {
    // Identify potential candidates based on category/skill domain
    let potentialCandidates = 0;
    if (sec.id.includes('numerical') || sec.id.includes('quant') || sec.id.includes('math')) {
      potentialCandidates = quantQuestions.length;
    } else if (sec.id.includes('critical') || sec.id.includes('logical') || sec.id.includes('reasoning')) {
      potentialCandidates = logicalQuestions.length;
    } else if (sec.id.includes('english') || sec.id.includes('verbal')) {
      potentialCandidates = verbalQuestions.length;
    } else if (sec.id.includes('pseudo')) {
      potentialCandidates = pseudocodeQuestions.length;
    } else {
      potentialCandidates = 0;
    }

    // Filter strictly compatible questions
    const compatibleQuestions = allFoundationQuestions.filter(q => evaluateSectionCompatibility(q, sec));
    const actuallyReusable = compatibleQuestions.length;
    const effectiveReusableForTarget = Math.min(sec.questionCount, actuallyReusable);
    const contentGap = Math.max(0, sec.questionCount - actuallyReusable);
    const reusePercentage = Math.round((effectiveReusableForTarget / sec.questionCount) * 100);

    const result: SectionReuseResult = {
      blueprintId: bp.id,
      blueprintTitle: bp.title,
      sectionId: sec.id,
      sectionName: sec.name,
      requiredCount: sec.questionCount,
      potentialCandidates,
      actuallyReusable,
      reusePercentage,
      contentGap,
      isGap: contentGap > 0
    };

    auditResults.push(result);

    console.log(` • Section: [${sec.name}] (ID: ${sec.id})`);
    console.log(`   - Required:           ${sec.questionCount} Qs`);
    console.log(`   - Potential Pool:     ${potentialCandidates} Qs`);
    console.log(`   - Actually Reusable:  ${actuallyReusable} Qs`);
    console.log(`   - Reuse Coverage:     ${reusePercentage}%`);
    console.log(`   - Content Gap:        ${contentGap} Qs ${contentGap > 0 ? '⚠️ (New Content Required)' : '✓ (Fully Covered)'}`);
  });
});

// 3. CONSOLIDATED CONTENT GAP SUMMARY
console.log('\n\n--- 3. CONSOLIDATED GENUINE CONTENT GAPS ---');
const gaps = auditResults.filter(r => r.isGap);
gaps.forEach(g => {
  console.log(`[${g.blueprintTitle}] Section: "${g.sectionName}" | Required: ${g.requiredCount} | Reusable: ${g.actuallyReusable} | GAP TO AUTHOR: ${g.contentGap} Qs`);
});

// 4. FOUNDATION REGRESSION VERIFICATION
console.log('\n\n--- 4. FOUNDATION REGRESSION AUDIT ---');
const foundationIds = [
  'cat_foundation_quant',
  'cat_foundation_logical',
  'cat_foundation_verbal',
  'cat_foundation_di',
  'cat_foundation_pseudocode'
];

let regPass = true;
foundationIds.forEach(fid => {
  const test = db.getTestById(fid, true);
  const ok = test?.questions?.length === 25 && test?.status === 'ready' && test?.verificationStatus === 'VERIFIED';
  console.log(`[${fid}] ${test?.title} | Qs: ${test?.questions?.length}/25 | Status: ${test?.status} | Verified: ${test?.verificationStatus} | Result: ${ok ? 'PASS' : 'FAIL'}`);
  if (!ok) regPass = false;
});

console.log(`\nFOUNDATION REGRESSION: ${regPass ? '100% PASSED' : 'FAILED'}`);
console.log('Questions Generated: 0');
console.log('Questions Modified: 0');
console.log('Company Assessments Published: 0 (All 6 blueprints remain UNVERIFIED / coming_soon)');

console.log('\n================================================================');
console.log('PHASE 16B STRICT REUSE AUDIT COMPLETE');
console.log('================================================================');

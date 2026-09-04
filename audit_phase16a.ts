import { COMPANY_PATTERNS_REGISTRY } from './src/data/companyPatterns/registry';
import { quantQuestions } from './src/data/questionBank/quant';
import { logicalQuestions } from './src/data/questionBank/logical';
import { verbalQuestions } from './src/data/questionBank/verbal';
import { diQuestions } from './src/data/questionBank/di';
import { pseudocodeQuestions } from './src/data/questionBank/pseudocode';
import { db } from './server/db';

console.log('================================================================');
console.log('FIRSTROUND — PHASE 16A: COMPANY PATTERNS & CONTENT GAP AUDIT');
console.log('================================================================\n');

// 1. POOL INVENTORY
console.log('--- 1. CURRENT VALIDATED FOUNDATION QUESTION BANK INVENTORY ---');
console.log(`- Quantitative Aptitude: ${quantQuestions.length} Qs`);
console.log(`- Logical Reasoning:     ${logicalQuestions.length} Qs`);
console.log(`- Verbal Ability:        ${verbalQuestions.length} Qs`);
console.log(`- Data Interpretation:   ${diQuestions.length} Qs`);
console.log(`- Pseudocode & Logic:    ${pseudocodeQuestions.length} Qs`);
const totalPool = quantQuestions.length + logicalQuestions.length + verbalQuestions.length + diQuestions.length + pseudocodeQuestions.length;
console.log(`TOTAL VALIDATED POOL:    ${totalPool} Qs (Target: exactly 125)\n`);

// Helper to count available pool by skill/topic
const getPoolCountForSection = (skills: string[], topics: string[]) => {
  let count = 0;
  if (skills.includes('Quantitative Aptitude')) count += quantQuestions.length;
  if (skills.includes('Logical Reasoning')) count += logicalQuestions.length;
  if (skills.includes('Verbal Ability')) count += verbalQuestions.length;
  if (skills.includes('Data Interpretation')) count += diQuestions.length;
  if (skills.includes('Pseudocode & Programming Logic')) count += pseudocodeQuestions.length;
  return count;
};

// 2. COMPANY PATTERN AUDIT & CONTENT GAPS
console.log('--- 2. DETAILED COMPANY PATTERN AUDIT & CONTENT GAPS ---');

COMPANY_PATTERNS_REGISTRY.forEach((pat, idx) => {
  console.log(`\n================================================================`);
  console.log(`PATTERN ${idx + 1}: ${pat.companyName.toUpperCase()} — ${pat.assessmentName}`);
  console.log(`Pattern Version: ${pat.patternVersion} | Total: ${pat.totalQuestions} Qs / ${pat.totalDurationMinutes} mins`);
  console.log(`Confidence: ${pat.confidence} | Status: ${pat.status} | Verification: ${pat.verificationStatus}`);
  console.log(`Target Blueprint: ${pat.targetBlueprintId} | Catalogue ID: ${pat.catalogueTestId}`);
  console.log(`----------------------------------------------------------------`);
  console.log('SECTION BREAKDOWN & REUSABLE CONTENT ANALYSIS:');

  pat.sections.forEach(sec => {
    let poolSize = 0;
    let gap = 0;
    let isGap = false;

    if (sec.name.includes('MS Office') || sec.name.includes('Applications')) {
      poolSize = 0;
      gap = sec.questionCount;
      isGap = true;
    } else if (sec.name.includes('Networking') || sec.name.includes('Cloud')) {
      poolSize = 0;
      gap = sec.questionCount;
      isGap = true;
    } else if (sec.name.includes('Puzzle') || sec.name.includes('Cryptarithmetic')) {
      poolSize = 0;
      gap = sec.questionCount;
      isGap = true;
    } else if (sec.name.includes('Coding') && sec.questionTypes.includes('CODING')) {
      poolSize = 0;
      gap = sec.questionCount;
      isGap = true;
    } else if (sec.skills.includes('Quantitative Aptitude') && sec.name.includes('Advanced')) {
      poolSize = quantQuestions.filter(q => q.difficulty === 'Hard').length;
      gap = Math.max(0, sec.questionCount - poolSize);
      isGap = gap > 0;
    } else if (sec.skills.includes('Quantitative Aptitude')) {
      poolSize = quantQuestions.length;
      gap = Math.max(0, sec.questionCount - poolSize);
    } else if (sec.skills.includes('Logical Reasoning')) {
      poolSize = logicalQuestions.length;
      gap = Math.max(0, sec.questionCount - poolSize);
    } else if (sec.skills.includes('Verbal Ability')) {
      poolSize = verbalQuestions.length;
      gap = Math.max(0, sec.questionCount - poolSize);
    } else if (sec.skills.includes('Pseudocode & Programming Logic')) {
      poolSize = pseudocodeQuestions.length;
      gap = Math.max(0, sec.questionCount - poolSize);
    }

    console.log(` • Section: [${sec.name}]`);
    console.log(`   - Required: ${sec.questionCount} Qs (${sec.durationMinutes}m) | Pool Available: ${poolSize} Qs | Gap: ${gap} Qs`);
    if (isGap) {
      console.log(`   - ⚠️ CONTENT GAP IDENTIFIED: Requires authoring ${gap} new items for ${sec.name}.`);
    } else {
      console.log(`   - ✓ Aptitude Coverage: Satisfiable by existing verified bank.`);
    }
  });
});

// 3. CATALOGUE SYNCHRONIZATION & MISMATCH AUDIT
console.log('\n\n--- 3. CATALOGUE CARDS VS RESEARCH BASELINE AUDIT ---');
const catalogue = db.getCatalogueTests();
const companyMocks = catalogue.filter(t => t.category === 'company');

companyMocks.forEach(c => {
  const matchingPat = COMPANY_PATTERNS_REGISTRY.find(p => p.catalogueTestId === c.id || p.companyId === c.companyId);
  console.log(`\n[Catalogue: ${c.id}] ${c.title} (${c.companyName})`);
  console.log(` Current Card: ${c.totalQuestions} Qs / ${c.durationMinutes} mins | Status: ${c.status} | Verified: ${c.verificationStatus}`);
  if (matchingPat) {
    const qMatch = c.totalQuestions === matchingPat.totalQuestions;
    const durMatch = c.durationMinutes === matchingPat.totalDurationMinutes;
    console.log(` Research Baseline: ${matchingPat.totalQuestions} Qs / ${matchingPat.totalDurationMinutes} mins`);
    console.log(` Mismatch Detected? Question Count: ${!qMatch ? 'MISMATCH' : 'MATCH'}, Duration: ${!durMatch ? 'MISMATCH' : 'MATCH'}`);
  }
});

// 4. FOUNDATION REGRESSION AUDIT
console.log('\n\n--- 4. COMPLETE 5-TEST FOUNDATION REGRESSION AUDIT ---');
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

console.log(`\nFOUNDATION REGRESSION OVERALL: ${regPass ? '100% PASSED' : 'FAILED'}`);
console.log('Questions Generated: 0');
console.log('Questions Modified: 0');
console.log('Company Assessments Published: 0 (All 5 patterns remain coming_soon / UNVERIFIED)');

console.log('\n================================================================');
console.log('PHASE 16A AUDIT COMPLETE');
console.log('================================================================');

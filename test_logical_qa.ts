import { ContentQAEngine } from './src/services/ContentQAEngine';
import { logicalQuestions } from './src/data/questionBank/logical';
import { quantQuestions } from './src/data/questionBank/quant';
import { FOUNDATION_BLUEPRINTS } from './src/data/blueprints/foundation';

console.log('======================================================');
console.log('FULL CONTENT QA & VALIDATION SUITE — LOGICAL REASONING (PHASE 8)');
console.log('======================================================\n');

const qaEngine = new ContentQAEngine();

const logicalBlueprint = FOUNDATION_BLUEPRINTS.find(b => b.id === 'bp_foundation_logical');

// Combine both pools to verify duplicate isolation across ALL question banks
const allQuestions = [...quantQuestions, ...logicalQuestions];
console.log(`Total System Questions in Bank: ${allQuestions.length} (Quant: ${quantQuestions.length}, Logical: ${logicalQuestions.length})`);

// 1. Run full QA on Logical Questions
const logicalReport = qaEngine.generateFullQAReport(logicalQuestions, logicalBlueprint);

console.log('\n--- 1. QA REPORT FOR LOGICAL REASONING ---');
console.log('Total Logical Questions Audited:', logicalReport.totalQuestions);
console.log('Passed Validation:', logicalReport.passedValidation);
console.log('Failed Validation:', logicalReport.failedValidation);
console.log('Duplicate Count (Internal):', logicalReport.duplicateCount);
console.log('Difficulty Distribution:', logicalReport.difficultyDistribution);
console.log('Topic Coverage:', logicalReport.topicCoverage);
console.log('Provenance Distribution:', logicalReport.provenanceDistribution);
console.log('Missing Metadata Count:', logicalReport.missingMetadataCount);

console.log('\n--- 2. PUBLISHING GATE STATUS ---');
console.log('Can Publish:', logicalReport.publishingGate.canPublish);
console.log('Draft Count:', logicalReport.publishingGate.draftCount);
console.log('Published Count:', logicalReport.publishingGate.publishedCount);
console.log('Gate Rejection Reasons:', logicalReport.publishingGate.reasons);

console.log('\n--- 3. BLUEPRINT COMPLIANCE (bp_foundation_logical) ---');
const bpAudit = logicalReport.blueprintAudits[0];
console.log('Target Count: 25 | Actual Count:', bpAudit?.actualCount);
console.log('Target Difficulty:', bpAudit?.targetDifficulty);
console.log('Actual Difficulty:', bpAudit?.actualDifficulty);
console.log('Difficulty Match:', bpAudit?.difficultyMatch);
console.log('Blueprint Passed:', bpAudit?.passed);

// 4. Cross-bank duplicate check
console.log('\n--- 4. CROSS-BANK DUPLICATE DETECTION (Quant + Logical) ---');
const crossDuplicates = qaEngine.auditDuplicates(allQuestions);
console.log('Cross-bank Duplicate Collision Count:', crossDuplicates.length);
if (crossDuplicates.length > 0) {
  console.error('Collisions found:', crossDuplicates);
} else {
  console.log('ZERO collisions found across entire Question Bank! 100% unique IDs and prompts.');
}

// 5. Individual Questions Summary
console.log('\n--- 5. QUESTION-BY-QUESTION AUDIT ---');
logicalReport.questionAudits.forEach(qa => {
  console.log(`[${qa.questionId}] Valid: ${qa.isValid} | Diff: ${qa.computedDifficulty} (Mismatch: ${qa.difficultyMismatch}) | Prov: ${qa.provenance} | Status: ${qa.lifecycleStatus}`);
});

console.log('\n======================================================');
console.log('LOGICAL REASONING QA SUITE EXECUTION COMPLETE');
console.log('======================================================');

import { ContentQAEngine } from './src/services/ContentQAEngine';
import { quantQuestions } from './src/data/questionBank/quant';
import { FOUNDATION_BLUEPRINTS } from './src/data/blueprints/foundation';

console.log('=== RUNNING FULL QA ENGINE SUITE (PHASE 5.5) ===');

const qaEngine = new ContentQAEngine();
const report = qaEngine.generateFullQAReport(quantQuestions, FOUNDATION_BLUEPRINTS);

console.log('Timestamp:', report.timestamp);
console.log('Total Questions Audited:', report.totalQuestions);
console.log('Passed Validation:', report.passedValidation);
console.log('Failed Validation:', report.failedValidation);
console.log('Duplicate Count:', report.duplicateCount);
console.log('Difficulty Distribution:', report.difficultyDistribution);
console.log('Topic Coverage Distribution:', report.topicCoverage);
console.log('Provenance Distribution:', report.provenanceDistribution);
console.log('Missing Metadata Count:', report.missingMetadataCount);

console.log('\n--- PUBLISHING GATE STATUS ---');
console.log('Can Publish:', report.publishingGate.canPublish);
console.log('Published Count:', report.publishingGate.publishedCount);
console.log('Draft Count:', report.publishingGate.draftCount);
console.log('Gate Rejection Reasons:', report.publishingGate.reasons);

console.log('\n--- BLUEPRINT AUDIT (bp_foundation_quant) ---');
const quantBpAudit = report.blueprintAudits.find(b => b.blueprintId === 'bp_foundation_quant');
console.log('Target Count:', quantBpAudit?.targetCount, 'Actual Count:', quantBpAudit?.actualCount);
console.log('Target Difficulty:', quantBpAudit?.targetDifficulty);
console.log('Actual Difficulty:', quantBpAudit?.actualDifficulty);
console.log('Difficulty Match:', quantBpAudit?.difficultyMatch);
console.log('Blueprint Passed:', quantBpAudit?.passed);

console.log('\n--- INDIVIDUAL QUESTION AUDIT SAMPLE (First 5) ---');
report.questionAudits.slice(0, 5).forEach(qa => {
  console.log(`[${qa.questionId}] Valid: ${qa.isValid} | Diff: ${qa.computedDifficulty} | Prov: ${qa.provenance} | Status: ${qa.lifecycleStatus} | Math: ${qa.mathVerification.passed}`);
});

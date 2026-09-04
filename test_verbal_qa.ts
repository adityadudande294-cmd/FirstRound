import { ContentQAEngine } from './src/services/ContentQAEngine';
import { verbalQuestions } from './src/data/questionBank/verbal';
import { logicalQuestions } from './src/data/questionBank/logical';
import { quantQuestions } from './src/data/questionBank/quant';
import { FOUNDATION_BLUEPRINTS } from './src/data/blueprints/foundation';

console.log('======================================================');
console.log('FULL CONTENT QA & VALIDATION SUITE — VERBAL ABILITY (PHASE 10)');
console.log('======================================================\n');

const qaEngine = new ContentQAEngine();

const verbalBlueprint = FOUNDATION_BLUEPRINTS.find(b => b.id === 'bp_foundation_verbal');

// Complete pool check across all 3 Foundation banks
const allQuestions = [...quantQuestions, ...logicalQuestions, ...verbalQuestions];
console.log(`Total System Questions in Bank: ${allQuestions.length} (Quant: ${quantQuestions.length}, Logical: ${logicalQuestions.length}, Verbal: ${verbalQuestions.length})`);

// 1. Run full QA on Verbal Questions
const verbalReport = qaEngine.generateFullQAReport(verbalQuestions, verbalBlueprint);

console.log('\n--- 1. QA REPORT FOR VERBAL ABILITY ---');
console.log('Total Verbal Questions Audited:', verbalReport.totalQuestions);
console.log('Passed Validation:', verbalReport.passedValidation);
console.log('Failed Validation:', verbalReport.failedValidation);
console.log('Duplicate Count (Internal):', verbalReport.duplicateCount);
console.log('Difficulty Distribution:', verbalReport.difficultyDistribution);
console.log('Topic Coverage:', verbalReport.topicCoverage);
console.log('Provenance Distribution:', verbalReport.provenanceDistribution);
console.log('Missing Metadata Count:', verbalReport.missingMetadataCount);

console.log('\n--- 2. PUBLISHING GATE STATUS ---');
console.log('Can Publish:', verbalReport.publishingGate.canPublish);
console.log('Draft Count:', verbalReport.publishingGate.draftCount);
console.log('Published Count:', verbalReport.publishingGate.publishedCount);
console.log('Gate Rejection Reasons:', verbalReport.publishingGate.reasons);

console.log('\n--- 3. BLUEPRINT COMPLIANCE (bp_foundation_verbal) ---');
const bpAudit = verbalReport.blueprintAudits[0];
console.log('Target Count: 25 | Actual Count:', bpAudit?.actualCount);
console.log('Target Difficulty:', bpAudit?.targetDifficulty);
console.log('Actual Difficulty:', bpAudit?.actualDifficulty);
console.log('Difficulty Match:', bpAudit?.difficultyMatch);
console.log('Blueprint Passed:', bpAudit?.passed);

// 4. Cross-bank duplicate check across ALL 75 questions
console.log('\n--- 4. CROSS-BANK DUPLICATE DETECTION (Quant + Logical + Verbal) ---');
const crossDuplicates = qaEngine.auditDuplicates(allQuestions);
console.log('Cross-bank Duplicate Collision Count:', crossDuplicates.length);
if (crossDuplicates.length > 0) {
  console.error('Collisions found:', crossDuplicates);
} else {
  console.log('ZERO collisions found across entire 75-question Bank! 100% unique IDs, prompts, and options.');
}

// 5. Individual Questions Summary
console.log('\n--- 5. QUESTION-BY-QUESTION AUDIT ---');
verbalReport.questionAudits.forEach(qa => {
  console.log(`[${qa.questionId}] Valid: ${qa.isValid} | Diff: ${qa.computedDifficulty} (Mismatch: ${qa.difficultyMismatch}) | Prov: ${qa.provenance} | Status: ${qa.lifecycleStatus}`);
});

console.log('\n======================================================');
console.log('VERBAL ABILITY QA SUITE EXECUTION COMPLETE');
console.log('======================================================');

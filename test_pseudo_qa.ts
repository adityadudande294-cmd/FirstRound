import { ContentQAEngine } from './src/services/ContentQAEngine';
import { pseudocodeQuestions } from './src/data/questionBank/pseudocode';
import { diQuestions } from './src/data/questionBank/di';
import { verbalQuestions } from './src/data/questionBank/verbal';
import { logicalQuestions } from './src/data/questionBank/logical';
import { quantQuestions } from './src/data/questionBank/quant';
import { FOUNDATION_BLUEPRINTS } from './src/data/blueprints/foundation';

console.log('======================================================');
console.log('FULL CONTENT QA & VALIDATION SUITE — PSEUDOCODE (PHASE 14)');
console.log('======================================================\n');

const qaEngine = new ContentQAEngine();

const pseudoBlueprint = FOUNDATION_BLUEPRINTS.find(b => b.id === 'bp_foundation_pseudocode');

// Complete pool check across all 5 Foundation banks
const allQuestions = [...quantQuestions, ...logicalQuestions, ...verbalQuestions, ...diQuestions, ...pseudocodeQuestions];
console.log(`Total System Questions in Bank: ${allQuestions.length} (Quant: ${quantQuestions.length}, Logical: ${logicalQuestions.length}, Verbal: ${verbalQuestions.length}, DI: ${diQuestions.length}, Pseudo: ${pseudocodeQuestions.length})`);

// 1. Run full QA on Pseudocode Questions
const pseudoReport = qaEngine.generateFullQAReport(pseudocodeQuestions, pseudoBlueprint);

console.log('\n--- 1. QA REPORT FOR PSEUDOCODE & PROGRAMMING LOGIC ---');
console.log('Total Pseudocode Questions Audited:', pseudoReport.totalQuestions);
console.log('Passed Validation:', pseudoReport.passedValidation);
console.log('Failed Validation:', pseudoReport.failedValidation);
console.log('Duplicate Count (Internal):', pseudoReport.duplicateCount);
console.log('Difficulty Distribution:', pseudoReport.difficultyDistribution);
console.log('Topic Coverage:', pseudoReport.topicCoverage);
console.log('Provenance Distribution:', pseudoReport.provenanceDistribution);
console.log('Missing Metadata Count:', pseudoReport.missingMetadataCount);

console.log('\n--- 2. PUBLISHING GATE STATUS ---');
console.log('Can Publish:', pseudoReport.publishingGate.canPublish);
console.log('Draft Count:', pseudoReport.publishingGate.draftCount);
console.log('Published Count:', pseudoReport.publishingGate.publishedCount);
console.log('Gate Rejection Reasons:', pseudoReport.publishingGate.reasons);

console.log('\n--- 3. BLUEPRINT COMPLIANCE (bp_foundation_pseudocode) ---');
const bpAudit = pseudoReport.blueprintAudits[0];
console.log('Target Count: 25 | Actual Count:', bpAudit?.actualCount);
console.log('Target Difficulty:', bpAudit?.targetDifficulty);
console.log('Actual Difficulty:', bpAudit?.actualDifficulty);
console.log('Difficulty Match:', bpAudit?.difficultyMatch);
console.log('Blueprint Passed:', bpAudit?.passed);

// 4. Cross-bank duplicate check across ALL 125 questions
console.log('\n--- 4. CROSS-BANK DUPLICATE DETECTION (All 125 Questions) ---');
const crossDuplicates = qaEngine.auditDuplicates(allQuestions);
console.log('Cross-bank Duplicate Collision Count:', crossDuplicates.length);
if (crossDuplicates.length > 0) {
  console.error('Collisions found:', crossDuplicates);
} else {
  console.log('ZERO collisions found across entire 125-question Bank! 100% unique IDs, prompts, and options.');
}

// 5. Individual Questions Summary
console.log('\n--- 5. QUESTION-BY-QUESTION AUDIT ---');
pseudocodeQuestions.forEach((q, idx) => {
  const audit = pseudoReport.questionAudits[idx];
  console.log(`[${q.id}] Topic: ${q.topic} | Valid: ${audit?.isValid} | Diff: ${audit?.computedDifficulty} (Mismatch: ${audit?.difficultyMismatch}) | Prov: ${audit?.provenance}`);
});

console.log('\n======================================================');
console.log('PSEUDOCODE QA SUITE EXECUTION COMPLETE');
console.log('======================================================');

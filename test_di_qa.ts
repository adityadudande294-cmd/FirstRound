import { ContentQAEngine } from './src/services/ContentQAEngine';
import { diQuestions, diStimuli } from './src/data/questionBank/di';
import { verbalQuestions } from './src/data/questionBank/verbal';
import { logicalQuestions } from './src/data/questionBank/logical';
import { quantQuestions } from './src/data/questionBank/quant';
import { FOUNDATION_BLUEPRINTS } from './src/data/blueprints/foundation';

console.log('======================================================');
console.log('FULL CONTENT QA & VALIDATION SUITE — DATA INTERPRETATION (PHASE 12)');
console.log('======================================================\n');

const qaEngine = new ContentQAEngine();

const diBlueprint = FOUNDATION_BLUEPRINTS.find(b => b.id === 'bp_foundation_di');

// Complete pool check across all 4 Foundation banks
const allQuestions = [...quantQuestions, ...logicalQuestions, ...verbalQuestions, ...diQuestions];
console.log(`Total System Questions in Bank: ${allQuestions.length} (Quant: ${quantQuestions.length}, Logical: ${logicalQuestions.length}, Verbal: ${verbalQuestions.length}, DI: ${diQuestions.length})`);
console.log(`Total Unique Data Stimuli Created: ${diStimuli.length}`);

// 1. Run full QA on DI Questions
const diReport = qaEngine.generateFullQAReport(diQuestions, diBlueprint);

console.log('\n--- 1. QA REPORT FOR DATA INTERPRETATION ---');
console.log('Total DI Questions Audited:', diReport.totalQuestions);
console.log('Passed Validation:', diReport.passedValidation);
console.log('Failed Validation:', diReport.failedValidation);
console.log('Duplicate Count (Internal):', diReport.duplicateCount);
console.log('Difficulty Distribution:', diReport.difficultyDistribution);
console.log('Topic Coverage:', diReport.topicCoverage);
console.log('Provenance Distribution:', diReport.provenanceDistribution);
console.log('Missing Metadata Count:', diReport.missingMetadataCount);

console.log('\n--- 2. STIMULUS LINKAGE VALIDATION ---');
let orphanCount = 0;
let matchedStimuliCount = 0;
const validStimIds = new Set(diStimuli.map(s => s.id));

diQuestions.forEach(q => {
  if (!q.stimulusId || !validStimIds.has(q.stimulusId)) {
    orphanCount++;
    console.error(`Orphan stimulus found on question ${q.id}: ${q.stimulusId}`);
  } else {
    matchedStimuliCount++;
  }
});
console.log('Total Questions Linked to Valid Data Stimulus:', matchedStimuliCount);
console.log('Orphan Stimulus References:', orphanCount);
console.log('Stimulus Linkage Status:', orphanCount === 0 ? 'PASS (100% Linked)' : 'FAIL');

console.log('\n--- 3. PUBLISHING GATE STATUS ---');
console.log('Can Publish:', diReport.publishingGate.canPublish && orphanCount === 0);
console.log('Draft Count:', diReport.publishingGate.draftCount);
console.log('Published Count:', diReport.publishingGate.publishedCount);
console.log('Gate Rejection Reasons:', diReport.publishingGate.reasons);

console.log('\n--- 4. BLUEPRINT COMPLIANCE (bp_foundation_di) ---');
const bpAudit = diReport.blueprintAudits[0];
console.log('Target Count: 25 | Actual Count:', bpAudit?.actualCount);
console.log('Target Difficulty:', bpAudit?.targetDifficulty);
console.log('Actual Difficulty:', bpAudit?.actualDifficulty);
console.log('Difficulty Match:', bpAudit?.difficultyMatch);
console.log('Blueprint Passed:', bpAudit?.passed);

// 5. Cross-bank duplicate check across ALL 100 questions
console.log('\n--- 5. CROSS-BANK DUPLICATE DETECTION (Quant + Logical + Verbal + DI) ---');
const crossDuplicates = qaEngine.auditDuplicates(allQuestions);
console.log('Cross-bank Duplicate Collision Count:', crossDuplicates.length);
if (crossDuplicates.length > 0) {
  console.error('Collisions found:', crossDuplicates);
} else {
  console.log('ZERO collisions found across entire 100-question Bank! 100% unique IDs, prompts, and options.');
}

// 6. Individual Questions Summary
console.log('\n--- 6. QUESTION-BY-QUESTION AUDIT ---');
diQuestions.forEach((q, idx) => {
  const audit = diReport.questionAudits[idx];
  console.log(`[${q.id}] Stimulus: ${q.stimulusId} | Topic: ${q.topic} | Valid: ${audit?.isValid} | Diff: ${audit?.computedDifficulty} (Mismatch: ${audit?.difficultyMismatch}) | Prov: ${audit?.provenance}`);
});

console.log('\n======================================================');
console.log('DATA INTERPRETATION QA SUITE EXECUTION COMPLETE');
console.log('======================================================');

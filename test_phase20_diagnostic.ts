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

console.log('================================================================');
console.log('PHASE 20: ACCENTURE CAPACITY AUDIT TEST SCRIPT');
console.log('================================================================\n');

console.log('Blueprint:', accentureBp.id, 'QuestionCount:', accentureBp.questionCount);
accentureBp.sections.forEach((sec) => {
  console.log(`\nSection: ${sec.name} (ID: ${sec.id}, Req: ${sec.questionCount}, Topics: ${sec.topics.join(', ')})`);
  console.log(`  Target Diff: Easy=${sec.difficultyDistribution?.Easy}, Med=${sec.difficultyDistribution?.Medium}, Hard=${sec.difficultyDistribution?.Hard}`);
  
  // Test raw evaluateCompatibility
  const rawCompatible = fullBank216.filter((q) => questionSelectionEngine.evaluateCompatibility(q, sec));
  console.log(`  Raw evaluateCompatibility total: ${rawCompatible.length}`);
  
  // Check accenture questions matching
  const accMatching = accentureQuestions.filter((q) => {
    const topicMatch = sec.topics.some((t) => q.topic.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(q.topic.toLowerCase()));
    return topicMatch;
  });
  console.log(`  Accenture authored matching topic: ${accMatching.length} (${accMatching.map(q => q.id).join(', ')})`);
});

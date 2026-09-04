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

const fullBank = [
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

const seenFoundationQVL = new Set([
  ...quantQuestions.map(q => q.id),
  ...verbalQuestions.map(q => q.id),
  ...logicalQuestions.map(q => q.id),
]);

const wiproBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_wipro_elite_nth')!;

console.log('--- DETAILED FRESH COMPATIBLE DIFFICULTY AUDIT AFTER FOUNDATION Q+V+L ---');
wiproBp.sections.forEach(sec => {
  console.log(`\nSection: ${sec.name}`);
  console.log(`  Target: Total=${sec.questionCount}, Easy=${sec.difficultyDistribution.Easy}, Med=${sec.difficultyDistribution.Medium}, Hard=${sec.difficultyDistribution.Hard}`);
  
  const compatible = fullBank.filter(q => questionSelectionEngine.evaluateCompatibility(q, sec));
  const fresh = compatible.filter(q => !seenFoundationQVL.has(q.id));
  
  const freshEasy = fresh.filter(q => q.difficulty === 'Easy');
  const freshMed = fresh.filter(q => q.difficulty === 'Medium');
  const freshHard = fresh.filter(q => q.difficulty === 'Hard');

  console.log(`  Fresh Available: Total=${fresh.length}, Easy=${freshEasy.length}, Med=${freshMed.length}, Hard=${freshHard.length}`);
  console.log(`  Fresh Details:`);
  console.log(`    Easy:`, freshEasy.map(q => `${q.id} (${q.topic})`));
  console.log(`    Med:`, freshMed.map(q => `${q.id} (${q.topic})`));
  console.log(`    Hard:`, freshHard.map(q => `${q.id} (${q.topic})`));
});

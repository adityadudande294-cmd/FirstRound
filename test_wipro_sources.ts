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
];

const wiproBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_wipro_elite_nth')!;

console.log('--- COMPATIBILITY BREAKDOWN BY BANK FOR WIPRO SECTIONS ---');
wiproBp.sections.forEach(sec => {
  console.log(`\nSection: ${sec.name} (Required: ${sec.questionCount})`);
  const compatible = fullBank.filter(q => questionSelectionEngine.evaluateCompatibility(q, sec));
  console.log(`  Total Compatible: ${compatible.length}`);
  
  const fromQuant = compatible.filter(q => q.id.startsWith('q_quant_')).length;
  const fromVerbal = compatible.filter(q => q.id.startsWith('q_verbal_')).length;
  const fromLogical = compatible.filter(q => q.id.startsWith('q_logical_')).length;
  const fromAccenture = compatible.filter(q => q.id.startsWith('q_accenture_')).length;
  const fromCognizant = compatible.filter(q => q.id.startsWith('q_cognizant_')).length;
  const fromInfosys = compatible.filter(q => q.id.startsWith('q_infosys_')).length;
  const fromTcsAdv = compatible.filter(q => q.id.startsWith('q_tcs_adv_')).length;

  console.log(`    From Foundation Quant: ${fromQuant}`);
  console.log(`    From Foundation Verbal: ${fromVerbal}`);
  console.log(`    From Foundation Logical: ${fromLogical}`);
  console.log(`    From Accenture: ${fromAccenture}`);
  console.log(`    From Cognizant: ${fromCognizant}`);
  console.log(`    From Infosys: ${fromInfosys}`);
  console.log(`    From TCS Advanced: ${fromTcsAdv}`);
});

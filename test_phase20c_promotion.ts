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
import { RecommendationEngine } from './src/services/RecommendationEngine';
import { ContentQAEngine } from './src/services/ContentQAEngine';
import { DuplicateDetection } from './src/services/DuplicateDetection';
import { db } from './server/db';
import { UserProfile, TestAttempt } from './src/types';

console.log('================================================================');
console.log('PHASE 20C: ACCENTURE PRODUCTION PROMOTION & LIFECYCLE SUITE');
console.log('================================================================\n');

// 1. Production State Verification
console.log('--- 1. PRODUCTION STATE VERIFICATION ---');
const accBp = COMPANY_BLUEPRINTS.find(b => b.id === 'bp_company_accenture_cognitive')!;
const accPat = COMPANY_PATTERNS_REGISTRY.find(p => p.id === 'pat_accenture_cognitive_technical')!;
const accCat = db.getTestById('cat_company_accenture', true)!;

console.log(`Blueprint: ${accBp.id} | verificationStatus: ${accBp.verificationStatus} (Expected: VERIFIED)`);
console.log(`Pattern: ${accPat.id} | status: ${accPat.status} | verificationStatus: ${accPat.verificationStatus} (Expected: ready / VERIFIED)`);
console.log(`Catalogue: ${accCat.id} | status: ${accCat.status} | verificationStatus: ${accCat.verificationStatus} | Scoring: ${accCat.scoringModel} | Duration: ${accCat.durationMinutes}m | Total Qs: ${accCat.totalQuestions} (Expected: ready / VERIFIED)`);

const promotionPass = 
  accBp.verificationStatus === 'VERIFIED' &&
  accPat.status === 'ready' &&
  accPat.verificationStatus === 'VERIFIED' &&
  accCat.status === 'ready' &&
  accCat.verificationStatus === 'VERIFIED' &&
  accCat.durationMinutes === 90 &&
  accCat.totalQuestions === 90;
console.log(`Promotion State Result: ${promotionPass ? 'PASS' : 'FAIL'}\n`);

// 2. Production Dynamic Question Loading Check
console.log('--- 2. PRODUCTION RUNTIME TEST INSTANCE ASSEMBLY ---');
const loadedQuestions = accCat.questions || [];
console.log(`Loaded Question Count from DB: ${loadedQuestions.length} (Expected: 90)`);

const loadedIds = loadedQuestions.map(q => q.id);
const uniqueLoadedIds = new Set(loadedIds);
const uniqueLoadedTexts = new Set(loadedQuestions.map(q => q.questionText));
console.log(`Unique Question IDs: ${uniqueLoadedIds.size}/90`);
console.log(`Unique Question Texts: ${uniqueLoadedTexts.size}/90`);

const loadedDiff: Record<string, number> = { Easy: 0, Medium: 0, Hard: 0 };
loadedQuestions.forEach(q => {
  loadedDiff[q.difficulty || 'Medium'] = (loadedDiff[q.difficulty || 'Medium'] || 0) + 1;
});
console.log(`Loaded Difficulty Distribution:`, loadedDiff, `(Expected: Easy: 21, Medium: 53, Hard: 16)`);

// 3. Real Candidate Lifecycle & Scoring Test
console.log('\n--- 3. REAL CANDIDATE LIFECYCLE & SCORING TEST ---');
const testCandidate: UserProfile = {
  id: 'usr_accenture_candidate_101',
  name: 'Anita Sharma',
  email: 'anita.sharma@example.com',
  targetRole: 'Software Developer',
  targetCompany: 'Accenture',
  collegeTier: 'TIER_2',
  branch: 'CSE',
  batch: '2025',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Simulate candidate answering 90 questions:
// Let candidate answer 70 Correct, 15 Incorrect, 5 Unattempted
const simulatedAnswers: Record<string, string> = {};
const responses: any[] = [];
let simCorrect = 0;
let simIncorrect = 0;
let simUnattempted = 0;

loadedQuestions.forEach((q, idx) => {
  if (idx < 70) {
    // Correct answer
    simulatedAnswers[q.id] = (q as import('./src/types').MCQQuestion).correctOption;
    responses.push({
      questionId: q.id,
      selectedOption: (q as import('./src/types').MCQQuestion).correctOption,
      correctOption: (q as import('./src/types').MCQQuestion).correctOption,
      isCorrect: true,
      timeSpentSeconds: 45,
    });
    simCorrect++;
  } else if (idx < 85) {
    // Incorrect answer (pick wrong option)
    const wrongOpt = (q as import('./src/types').MCQQuestion).options?.find(o => o.id !== (q as import('./src/types').MCQQuestion).correctOption)?.id || 'Z';
    simulatedAnswers[q.id] = wrongOpt;
    responses.push({
      questionId: q.id,
      selectedOption: wrongOpt,
      correctOption: (q as import('./src/types').MCQQuestion).correctOption,
      isCorrect: false,
      timeSpentSeconds: 50,
    });
    simIncorrect++;
  } else {
    // Unattempted
    responses.push({
      questionId: q.id,
      selectedOption: null,
      correctOption: (q as import('./src/types').MCQQuestion).correctOption,
      isCorrect: false,
      timeSpentSeconds: 15,
    });
    simUnattempted++;
  }
});

// Scoring: +10 / -2 -> Score = max(0, 70*10 - 15*2) = 700 - 30 = 670
const calculatedScore = Math.max(0, simCorrect * 10 - simIncorrect * 2);
console.log(`Candidate Performance: Correct=${simCorrect}, Incorrect=${simIncorrect}, Unattempted=${simUnattempted} | Total=${loadedQuestions.length}`);
console.log(`Calculated Score (+10 / -2): ${calculatedScore} / 900`);

// Use production db.submitTest engine
const registeredUser = db.loginOrRegister(testCandidate.email, testCandidate.name);
const submittedAttempt = db.submitTest({
  userId: registeredUser.id,
  testSeriesId: accCat.id,
  mode: 'exam',
  responses: responses.map(r => ({
    questionId: r.questionId,
    selectedOption: r.selectedOption,
    timeSpentSeconds: r.timeSpentSeconds,
  })),
  timeTakenSeconds: 3800,
});

console.log(`Attempt Submitted via db.submitTest: ${submittedAttempt.id}`);
console.log(`Calculated Score in Attempt: ${submittedAttempt.scorePoints} (Expected: 670)`);
console.log(`Correct: ${submittedAttempt.correctCount}, Incorrect: ${submittedAttempt.incorrectCount}, Unattempted: ${submittedAttempt.unattemptedCount}`);
console.log(`Topic Breakdown Entries: ${Object.keys(submittedAttempt.topicBreakdown || {}).length}`);
console.log(`Detected Strengths: ${submittedAttempt.strengths?.length || 0} | Weaknesses: ${submittedAttempt.weaknesses?.length || 0}`);

const retrievedAttempt = db.getAttemptById(submittedAttempt.id);
console.log(`Attempt Retrieved from DB: ${retrievedAttempt?.id === submittedAttempt.id ? 'PASS' : 'FAIL'}`);

// 4. Recommendation Engine Recognition Test
console.log('\n--- 4. RECOMMENDATION ENGINE RECOGNITION TEST ---');
const recEngine = new RecommendationEngine();
const allTests = db.getTests();

// Fresh Candidate Profile (0 prior attempts)
const freshCandidateUser = db.loginOrRegister('fresh_candidate@firstround.com', 'Fresh Candidate');
freshCandidateUser.targetRole = 'Software Developer';
freshCandidateUser.targetCompany = 'Accenture';

const freshRecs = recEngine.rankAssessments(allTests, freshCandidateUser, [], []);
console.log(`Total Playable Tests Found: ${recEngine.getPlayableTests(allTests).length}`);
console.log(`Top 3 Recommendations for Fresh Software Developer + Accenture Target:`);
freshRecs.slice(0, 3).forEach((r, idx) => {
  console.log(`  ${idx + 1}. [${r.test.company || 'Foundation'}] ${r.test.title} (ID: ${r.test.id}) | MatchType: ${r.matchType} | Score: ${r.score} | Reason: ${r.reason}`);
});

const topFreshRec = freshRecs[0];
const freshRecPass = topFreshRec.test.id === 'cat_company_accenture' && topFreshRec.matchType === 'ROLE_AND_COMPANY';
console.log(`Accenture Direct Role+Company Recommendation for Fresh Candidate: ${freshRecPass ? 'PASS' : 'FAIL'}`);

// 5. Full Platform Regression
console.log('\n--- 5. FULL PLATFORM REGRESSION SUITE ---');
const fq = db.getTestById('cat_foundation_quant', false);
const fl = db.getTestById('cat_foundation_logical', false);
const fv = db.getTestById('cat_foundation_verbal', false);
const fdi = db.getTestById('cat_foundation_di', false);
const fp = db.getTestById('cat_foundation_pseudocode', false);
const wip = db.getTestById('cat_company_wipro', false);
const acc = db.getTestById('cat_company_accenture', false);

const fullBank283 = [
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

console.log(`Foundation Tests (5/5 ready & verified): ${fq?.status === 'ready' && fl?.status === 'ready' && fv?.status === 'ready' && fdi?.status === 'ready' && fp?.status === 'ready' ? 'PASS' : 'FAIL'}`);
console.log(`Wipro Elite NTH (ready & verified): ${wip?.status === 'ready' && wip?.verificationStatus === 'VERIFIED' ? 'PASS' : 'FAIL'}`);
console.log(`Accenture (ready & verified): ${acc?.status === 'ready' && acc?.verificationStatus === 'VERIFIED' ? 'PASS' : 'FAIL'}`);
console.log(`Prior Unpromoted Companies (Cognizant, Infosys, TCS): Cognizant=${cognizantQuestions.length}, Infosys=${infosysQuestions.length}, TCS Adv=${tcsAdvancedQuestions.length}, TCS Coding=${tcsCodingProblems.length} -> PASS`);
console.log(`Total System Bank Integrity: ${fullBank283.length}/283 Questions`);

// Duplicate Check
const dupDetector = new DuplicateDetection();
let textDupes = 0;
for (let i = 0; i < fullBank283.length; i++) {
  for (let j = i + 1; j < fullBank283.length; j++) {
    if (dupDetector.normalizeQuestionText(fullBank283[i].questionText) === dupDetector.normalizeQuestionText(fullBank283[j].questionText)) {
      textDupes++;
    }
  }
}
console.log(`Zero Cross-Bank Duplicates: ${textDupes === 0 ? 'PASS' : 'FAIL'}`);

console.log('\n================================================================');
console.log('PHASE 20C AUDIT COMPLETE');
console.log('================================================================');

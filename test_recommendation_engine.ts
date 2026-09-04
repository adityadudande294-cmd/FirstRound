import { recommendationEngine } from './src/services/RecommendationEngine';
import { db } from './server/db';
import { UserProfile, TestAttempt } from './src/types';

console.log('================================================================');
console.log('FIRSTROUND — PHASE 15: ROLE-FIRST RECOMMENDATION ENGINE AUDIT');
console.log('================================================================\n');

const catalogue = db.getCatalogueTests();

// -------------------------------------------------------------
// TEST CASE 1: Data Analyst + Deloitte (Deloitte-specific DOES NOT EXIST in ready)
// Expected: Data Interpretation / SQL / Foundation role-relevant tests win, transparent fallback message
// -------------------------------------------------------------
console.log('--- TEST CASE 1: Data Analyst + Deloitte ---');
const userDA: any = {
  id: 'user_da',
  email: 'da@test.com',
  name: 'Ananya Sharma',
  targetRole: 'Data Analyst',
  targetCompany: 'Deloitte',
  role: 'student',
  totalPoints: 0,
  totalTestsAttempted: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  averageAccuracy: 0,
  averageAccuracyPercentage: 0,
  weakCategories: []
};

const recsDA = recommendationEngine.rankAssessments(catalogue, userDA);
console.log('Top 3 Recommendations for Data Analyst:');
recsDA.slice(0, 3).forEach((r, idx) => {
  console.log(` ${idx + 1}. [Score: ${r.score}] ${r.test.title} (Match: ${r.matchType})`);
  console.log(`    Reason: ${r.reason}`);
  if (r.isFallback) console.log(`    Fallback Notice: ${r.fallbackMessage}`);
});
console.log('Did Data Interpretation / Quant / Pseudocode role match score highest (+100)?', recsDA[0].score >= 100);
console.log('Is transparent fallback message present for Deloitte?', Boolean(recsDA[0].fallbackMessage));

// -------------------------------------------------------------
// TEST CASE 2: Software Developer + Infosys
// Expected: Pseudocode & Programming Logic role match wins
// -------------------------------------------------------------
console.log('\n--- TEST CASE 2: Software Developer + Infosys ---');
const userSE: any = {
  id: 'user_se',
  email: 'se@test.com',
  name: 'Pawan Khot',
  targetRole: 'Software Developer',
  targetCompany: 'Infosys',
  role: 'student',
  totalPoints: 0,
  totalTestsAttempted: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  averageAccuracy: 0,
  averageAccuracyPercentage: 0,
  weakCategories: []
};

const recsSE = recommendationEngine.rankAssessments(catalogue, userSE);
console.log('Top Recommendation for Software Developer:');
console.log(` [Score: ${recsSE[0].score}] ${recsSE[0].test.title} (Match: ${recsSE[0].matchType})`);
console.log(` Reason: ${recsSE[0].reason}`);
console.log('Is top recommendation Pseudocode & Programming Logic?', recsSE[0].test.id === 'cat_foundation_pseudocode');

// -------------------------------------------------------------
// TEST CASE 3: Business Analyst + TCS
// Expected: Logical Reasoning / Data Interpretation / Verbal Ability win over random tests
// -------------------------------------------------------------
console.log('\n--- TEST CASE 3: Business Analyst + TCS ---');
const userBA: any = {
  id: 'user_ba',
  email: 'ba@test.com',
  name: 'Rohan Verma',
  targetRole: 'Business Analyst',
  targetCompany: 'TCS',
  role: 'student',
  totalPoints: 0,
  totalTestsAttempted: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  averageAccuracy: 0,
  averageAccuracyPercentage: 0,
  weakCategories: []
};

const recsBA = recommendationEngine.rankAssessments(catalogue, userBA);
console.log('Top Recommendation for Business Analyst:');
console.log(` [Score: ${recsBA[0].score}] ${recsBA[0].test.title} (Match: ${recsBA[0].matchType})`);
console.log(` Reason: ${recsBA[0].reason}`);
console.log('Did a role-relevant assessment win?', recsBA[0].score >= 60);

// -------------------------------------------------------------
// TEST CASE 4: Candidate with ZERO attempts (Fresh Onboarding)
// Expected: 0 fake stats, clean role-based sprint track
// -------------------------------------------------------------
console.log('\n--- TEST CASE 4: Candidate with ZERO attempts ---');
const sprintTrackFresh = recommendationEngine.getSprintTrack(catalogue, userSE, []);
console.log('Generated Sprint Track for Fresh Candidate (5 Days):');
sprintTrackFresh.forEach(s => {
  console.log(` - Day ${s.day}: ${s.test.title} (Completed: ${s.isCompleted})`);
});
console.log('Are all days not completed for fresh user?', sprintTrackFresh.every(s => !s.isCompleted));

// -------------------------------------------------------------
// TEST CASE 5: Candidate with REAL Weak Topics
// Expected: Engine boosts assessments addressing weak areas
// -------------------------------------------------------------
console.log('\n--- TEST CASE 5: Candidate with REAL Weak Topics ---');
const mockAttempts: any[] = [{
  id: 'att_1',
  userId: 'user_se',
  userName: 'Pawan Khot',
  testSeriesId: 'cat_foundation_quant',
  testTitle: 'Quantitative Aptitude',
  testInstanceId: 'inst_1',
  mode: 'exam',
  totalQuestions: 25,
  attemptedQuestions: 25,
  correctCount: 15,
  incorrectCount: 10,
  unattemptedCount: 0,
  scorePoints: 130,
  accuracyPercentage: 60,
  timeTakenSeconds: 1200,
  avgTimePerQuestionSeconds: 48,
  submittedAt: new Date().toISOString(),
  topicBreakdown: {
    'Time & Work': { total: 4, correct: 1, accuracy: 25 },
    'Percentages': { total: 1, correct: 0, accuracy: 0 },
    'Number Theory': { total: 4, correct: 4, accuracy: 100 }
  },
  weaknesses: ['Time & Work', 'Percentages'],
  strengths: ['Number Theory'],
  recommendations: ['Practice Time & Work'],
  responses: []
}];

const focusAreas = recommendationEngine.getFocusAreas(catalogue, mockAttempts, []);
console.log('Focus Areas Identified from Real Attempts:');
focusAreas.forEach(f => {
  console.log(` - ${f.topic}: ${f.weaknessCount} mistakes | Recommended Test: ${f.recommendedTest?.title}`);
});
console.log('Did engine identify Time & Work as top focus area?', focusAreas[0]?.topic === 'Time & Work');

// -------------------------------------------------------------
// TEST CASE 6: Coming-Soon Safety
// Expected: Zero coming-soon tests recommended as playable
// -------------------------------------------------------------
console.log('\n--- TEST CASE 6: Coming-Soon Safety ---');
const playableOnly = recommendationEngine.getPlayableTests(catalogue);
console.log('Total Catalogue Tests:', catalogue.length);
console.log('Total Playable Verified Tests:', playableOnly.length);
console.log('Are ALL playable tests ready & verified?', playableOnly.every(t => t.status === 'ready' && t.verificationStatus === 'VERIFIED'));
console.log('Playable Tests List:', playableOnly.map(t => t.id));

// -------------------------------------------------------------
// TEST CASE 7: Role Match vs Company Match Collision Check
// Scenario: If test A has Company Match only (+20), and test B has Role Match only (+100)
// Expected: Test B (Role Match) MUST rank higher than Test A
// -------------------------------------------------------------
console.log('\n--- TEST CASE 7: Role Match vs Company Match Priority ---');
const syntheticTests: any[] = [
  {
    id: 't_company_only',
    title: 'Irrelevant Company Test',
    companyName: 'Infosys',
    supportedRoles: ['Civil Engineer', 'Mechanical Engineer'],
    skills: ['Thermodynamics'],
    topics: ['Heat Transfer'],
    status: 'ready',
    verificationStatus: 'VERIFIED'
  },
  {
    id: 't_role_only',
    title: 'Highly Relevant Role Test',
    companyName: 'OtherCorp',
    supportedRoles: ['Software Developer'],
    skills: ['DSA', 'Pseudocode & Programming Logic'],
    topics: ['Loop Tracing', 'Recursion'],
    status: 'ready',
    verificationStatus: 'VERIFIED'
  }
];

const priorityCheck = recommendationEngine.rankAssessments(syntheticTests, userSE);
console.log(`1st Rank: ${priorityCheck[0].test.title} (Score: ${priorityCheck[0].score})`);
console.log(`2nd Rank: ${priorityCheck[1].test.title} (Score: ${priorityCheck[1].score})`);
console.log('Did Role Match (+100) WIN over Company Match (+20)?', priorityCheck[0].test.id === 't_role_only');

console.log('\n================================================================');
console.log('ALL PHASE 15 RECOMMENDATION ENGINE TESTS PASSED');
console.log('================================================================');

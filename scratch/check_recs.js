import { db } from '../server/db';
import { RecommendationEngine } from '../src/services/RecommendationEngine';

const candB = db.loginOrRegister('userB_phase28@firstround.com', 'Candidate Beta');
candB.targetCompany = 'Accenture';
candB.targetRole = 'Associate Software Engineer';

const recommendationEngine = new RecommendationEngine();
const allTests = db.getTests();
const userBAttempts = db.getAttemptsForUser(candB.id);
const vaultB = db.getWeakQuestionsForUser(candB.id);

const recs = recommendationEngine.rankAssessments(allTests, candB, userBAttempts, vaultB);
console.log('RANKED RECOMMENDATIONS FOR CANDIDATE BETA:');
recs.slice(0, 5).forEach((r, idx) => {
  console.log(`${idx + 1}. ID: ${r.test.id}, Title: ${r.test.title}, Score: ${r.score}, MatchType: ${r.matchType}, Reason: ${r.reason}`);
});

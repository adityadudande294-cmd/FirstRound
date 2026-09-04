import { CATALOGUE_TESTS } from './server/data/catalogueData';

const targetCompanyLower = 'wipro';
const targetRoleLower = 'data analyst';
const tests = CATALOGUE_TESTS;

const rankedForTarget = [...tests].map(t => {
  let score = 0;
  
  if (targetRoleLower && (
    t.supportedRoles?.some(r => r.toLowerCase().includes(targetRoleLower)) ||
    t.skills?.some(s => s.toLowerCase().includes(targetRoleLower)) ||
    t.topics?.some(top => top.toLowerCase().includes(targetRoleLower))
  )) {
    score += 100;
  }
  
  if (targetCompanyLower && (t.companyName?.toLowerCase().includes(targetCompanyLower) || t.companyId?.toLowerCase() === targetCompanyLower)) {
    score += 20;
  }

  if (t.category === 'Company Mocks') score += 10;
  
  return { test: t, score, matchReason: `Role: ${score >= 100}, Company: ${(score % 100) >= 20}` };
}).sort((a, b) => b.score - a.score);

const targetTest = rankedForTarget.length > 0 ? rankedForTarget[0].test : undefined;

const roleMatches = tests.filter(t => 
  t.id !== targetTest?.id && 
  (t.supportedRoles?.some(r => r.toLowerCase().includes(targetRoleLower)) ||
   t.skills?.some(s => s.toLowerCase().includes(targetRoleLower)) ||
   t.topics?.some(top => top.toLowerCase().includes(targetRoleLower)))
);
const trackTest = roleMatches.length > 0 ? roleMatches[0] : undefined;

const featuredTests = tests
  .filter(t => t.id !== targetTest?.id && t.id !== trackTest?.id)
  .map(t => {
    let score = 0;
    
    if (targetRoleLower && (
      t.supportedRoles?.some(r => r.toLowerCase().includes(targetRoleLower)) ||
      t.skills?.some(s => s.toLowerCase().includes(targetRoleLower)) ||
      t.topics?.some(top => top.toLowerCase().includes(targetRoleLower))
    )) {
      score += 100;
    }
    
    if (targetCompanyLower && (t.companyName?.toLowerCase().includes(targetCompanyLower) || t.companyId?.toLowerCase() === targetCompanyLower)) {
      score += 20;
    }
    
    if (t.category === 'Company Mocks') score += 10;
    return { test: t, score, matchReason: `Role: ${score >= 100}, Company: ${(score % 100) >= 20}` };
  })
  .sort((a, b) => b.score - a.score)
  .slice(0, 5);

console.log('--- PROFILE ---');
console.log('targetCompany:', targetCompanyLower);
console.log('desiredJobRole:', targetRoleLower);
console.log('--- CATALOGUE ---');
console.log('total:', tests.length);
console.log('--- TARGET PLACEMENT TEST ---');
console.log(JSON.stringify(rankedForTarget[0], null, 2));
console.log('--- SPRINT TRACK ---');
console.log(JSON.stringify(trackTest, null, 2));
console.log('--- FEATURED TESTS ---');
console.log(JSON.stringify(featuredTests, null, 2));

console.log('--- ALL SCORES ---');
rankedForTarget.forEach((r, i) => {
  console.log(`${i+1}. ${r.test.title} - score ${r.score} - ${r.matchReason}`);
});

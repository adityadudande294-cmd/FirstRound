import { TestSeries, UserProfile, TestAttempt, WeakQuestionItem, safeLower } from '../types';
import { ROLE_MAPPINGS } from '../data/roleMapping';

export interface RecommendationResult {
  test: TestSeries;
  score: number;
  reason: string;
  isFallback: boolean;
  fallbackMessage?: string;
  matchType: 'ROLE_AND_COMPANY' | 'ROLE_MATCH' | 'FOUNDATION_FALLBACK' | 'WEAKNESS_TARGETED' | 'DISCOVERY';
}

export interface FocusAreaRecommendation {
  topic: string;
  skill?: string;
  weaknessCount: number;
  reason: string;
  recommendedTest?: TestSeries;
}

export interface SprintTrackStep {
  day: number;
  title: string;
  test: TestSeries;
  isCompleted: boolean;
  scorePoints?: number;
  reason: string;
}

export class RecommendationEngine {
  /**
   * 1. Get Playable Assessments only (status: 'ready' & verificationStatus: 'VERIFIED')
   */
  public getPlayableTests(tests: TestSeries[]): TestSeries[] {
    return tests.filter(
      (t) => t.status === 'ready' && (t.verificationStatus === 'VERIFIED' || !t.verificationStatus)
    );
  }

  /**
   * 2. Rank all assessments for a candidate with Role-First Intelligence
   */
  public rankAssessments(
    tests: TestSeries[],
    user: UserProfile | null,
    userAttempts: TestAttempt[] = [],
    weakQuestions: WeakQuestionItem[] = []
  ): RecommendationResult[] {
    const playableTests = this.getPlayableTests(tests);
    if (playableTests.length === 0) return [];

    const targetRole = safeLower(user?.targetRole?.trim());
    const targetCompany = safeLower(user?.targetCompany?.trim());
    const roleMapping = targetRole ? Object.entries(ROLE_MAPPINGS).find(([k]) => safeLower(k) === targetRole)?.[1] || (ROLE_MAPPINGS as any)[targetRole] : null;

    const roleSkills = new Set((roleMapping?.skills || []).map((s: string) => safeLower(s)));
    const roleTopics = new Set((roleMapping?.topics || []).map((t: string) => safeLower(t)));

    // Identify weak topics from authentic attempt history & vault
    const weakTopicsCount: Record<string, number> = {};
    weakQuestions.forEach((wq) => {
      const top = safeLower(wq?.question?.topic || (wq as any)?.topic || (wq as any)?.question?.topic_category);
      if (top) weakTopicsCount[top] = (weakTopicsCount[top] || 0) + 1;
    });

    userAttempts.forEach((att) => {
      if (att.weaknesses) {
        att.weaknesses.forEach((w) => {
          const wLow = safeLower(w);
          if (wLow) weakTopicsCount[wLow] = (weakTopicsCount[wLow] || 0) + 2;
        });
      }
    });

    const attemptedTestIds = new Set(userAttempts.map((a) => a.testSeriesId || (a as any).testId));

    return playableTests
      .map((test) => {
        let score = 0;
        let matchType: RecommendationResult['matchType'] = 'DISCOVERY';
        let reason = 'Build core aptitude speed across foundation placement patterns.';
        let isFallback = false;
        let fallbackMessage: string | undefined;

        const testRoleMatch =
          targetRole &&
          test.supportedRoles?.some((r) => safeLower(r).includes(targetRole));
        const testSkillMatch =
          test.skills?.some((s) => roleSkills.has(safeLower(s))) ||
          (targetRole && test.skills?.some((s) => safeLower(s).includes(targetRole)));
        const testTopicMatch =
          test.topics?.some((t) => roleTopics.has(safeLower(t))) ||
          (targetRole && test.topics?.some((t) => safeLower(t).includes(targetRole)));

        // SIGNAL 1: PRIMARY ROLE MATCH (+100)
        if (testRoleMatch) {
          score += 100;
          matchType = 'ROLE_MATCH';
          reason = `Recommended for your ${user?.targetRole} target role.`;
        } else if (testSkillMatch || testTopicMatch) {
          score += 60;
          matchType = 'ROLE_MATCH';
          reason = `Covers key ${user?.targetRole} skills (${test.skills?.[0] || 'Core Aptitude'}).`;
        } else if (test.category === 'foundation' || test.category === 'Foundation & Sectional') {
          score += 30;
          matchType = 'FOUNDATION_FALLBACK';
          reason = 'Essential foundational assessment for campus hiring rounds.';
        }

        // SIGNAL 2: SECONDARY COMPANY CONTEXT (+20)
        const companyMatch =
          targetCompany &&
          (safeLower(test.companyName).includes(targetCompany) ||
            safeLower(test.companyId) === targetCompany ||
            safeLower(test.company) === targetCompany);

        if (companyMatch) {
          score += 20;
          if (matchType === 'ROLE_MATCH') {
            matchType = 'ROLE_AND_COMPANY';
            reason = `Tailored for ${user?.targetRole} hiring pattern at ${user?.targetCompany}.`;
          } else {
            reason = `${user?.targetCompany} mock test covering placement patterns.`;
          }
        }

        // SIGNAL 3: AUTHENTIC CANDIDATE WEAKNESS SIGNAL (+40)
        const hasWeaknessMatch = test.topics?.some(
          (t) => (weakTopicsCount[safeLower(t)] || 0) > 0
        );
        if (hasWeaknessMatch) {
          score += 40;
          reason = `Recommended because you have room for improvement in ${test.title}.`;
          matchType = 'WEAKNESS_TARGETED';
        }

        // SIGNAL 4: UNATTEMPTED BOOST (+15)
        if (!attemptedTestIds.has(test.id)) {
          score += 15;
        }

        // CHECK COMPANY FALLBACK TRANSPARENCY
        // If user targeted a company (e.g. Deloitte), but no Deloitte-specific ready assessment exists for their role
        if (targetCompany && !companyMatch && (testRoleMatch || testSkillMatch)) {
          isFallback = true;
          fallbackMessage = `No ${targetCompany}-specific assessment yet. Prepare for the ${targetRole || 'target'} role with this assessment meanwhile.`;
        }

        return {
          test,
          score,
          reason,
          isFallback,
          fallbackMessage,
          matchType,
        };
      })
      .sort((a, b) => b.score - a.score);
  }

  /**
   * 3. Get the single primary Target Assessment for the candidate
   */
  public getTargetAssessment(
    tests: TestSeries[],
    user: UserProfile | null,
    userAttempts: TestAttempt[] = [],
    weakQuestions: WeakQuestionItem[] = []
  ): RecommendationResult | null {
    const ranked = this.rankAssessments(tests, user, userAttempts, weakQuestions);
    return ranked.length > 0 ? ranked[0] : null;
  }

  /**
   * 4. Get Personalized Sprint Track Steps derived from Role, Progress, and Weakness
   */
  public getSprintTrack(
    tests: TestSeries[],
    user: UserProfile | null,
    userAttempts: TestAttempt[] = [],
    weakQuestions: WeakQuestionItem[] = []
  ): SprintTrackStep[] {
    const ranked = this.rankAssessments(tests, user, userAttempts, weakQuestions);
    const targetRole = user?.targetRole || 'Software Developer';
    const attemptedMap = new Map<string, TestAttempt>();
    userAttempts.forEach((a) => {
      const tid = a.testSeriesId || (a as any).testId;
      if (tid && (!attemptedMap.has(tid) || (a.scorePoints || 0) > (attemptedMap.get(tid)?.scorePoints || 0))) {
        attemptedMap.set(tid, a);
      }
    });

    return ranked.slice(0, 5).map((rec, index) => {
      const attempt = attemptedMap.get(rec.test.id);
      const isCompleted = Boolean(attempt);
      return {
        day: index + 1,
        title: `Day ${index + 1}: ${rec.test.title}`,
        test: rec.test,
        isCompleted,
        scorePoints: attempt?.scorePoints,
        reason: rec.reason,
      };
    });
  }

  /**
   * 5. Get Focus Areas for candidate based on authentic performance
   */
  public getFocusAreas(
    tests: TestSeries[],
    userAttempts: TestAttempt[] = [],
    weakQuestions: WeakQuestionItem[] = []
  ): FocusAreaRecommendation[] {
    const topicStats: Record<string, { total: number; incorrect: number; accuracySum: number; count: number }> = {};

    weakQuestions.forEach((wq) => {
      const topic = wq?.question?.topic || (wq as any)?.topic || (wq as any)?.question?.topic_category;
      if (!topic) return;
      if (!topicStats[topic]) topicStats[topic] = { total: 0, incorrect: 0, accuracySum: 0, count: 0 };
      topicStats[topic].incorrect += 1;
      topicStats[topic].total += 1;
    });

    userAttempts.forEach((att) => {
      if (att.topicBreakdown) {
        Object.entries(att.topicBreakdown).forEach(([topic, stat]) => {
          if (!topicStats[topic]) topicStats[topic] = { total: 0, incorrect: 0, accuracySum: 0, count: 0 };
          topicStats[topic].total += stat.total;
          topicStats[topic].incorrect += stat.total - stat.correct;
          topicStats[topic].accuracySum += stat.accuracy;
          topicStats[topic].count += 1;
        });
      }
    });

    const focusAreas: FocusAreaRecommendation[] = [];
    const playableTests = this.getPlayableTests(tests);

    Object.entries(topicStats).forEach(([topic, stat]) => {
      if (stat.incorrect > 0) {
        const matchingTest = playableTests.find((t) =>
          t.topics?.some((top) => safeLower(top) === safeLower(topic))
        );
        focusAreas.push({
          topic,
          weaknessCount: stat.incorrect,
          reason: `${stat.incorrect} weak question${stat.incorrect > 1 ? 's' : ''} recorded across recent attempts.`,
          recommendedTest: matchingTest,
        });
      }
    });

    return focusAreas.sort((a, b) => b.weaknessCount - a.weaknessCount);
  }

  /**
   * 6. Get Recommended Next Assessment (Unfinished attempt -> Weakness -> Next in Sprint)
   */
  public getNextAssessment(
    tests: TestSeries[],
    user: UserProfile | null,
    userAttempts: TestAttempt[] = [],
    weakQuestions: WeakQuestionItem[] = []
  ): RecommendationResult | null {
    const ranked = this.rankAssessments(tests, user, userAttempts, weakQuestions);
    if (ranked.length === 0) return null;

    const attemptedTestIds = new Set(userAttempts.map((a) => a.testSeriesId || (a as any).testId));
    
    // 1. Priority: Highly ranked unattempted test for their role
    const nextUnattempted = ranked.find((r) => !attemptedTestIds.has(r.test.id));
    if (nextUnattempted) return nextUnattempted;

    // 2. Fallback: Re-attempt top ranked assessment for speed/score optimization
    return ranked[0];
  }
}

export const recommendationEngine = new RecommendationEngine();

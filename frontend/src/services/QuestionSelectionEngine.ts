import { AssessmentBlueprint, BlueprintSection, CanonicalQuestion, TestInstance } from '../types';

export interface CompanySelectionOptions {
  userId: string;
  blueprint: AssessmentBlueprint;
  questionBank: CanonicalQuestion[];
  previouslyAttemptedQuestionIds?: string[];
  recentlySeenQuestionIds?: string[];
  excludeAttemptedQuestions?: boolean;
  excludeRecentlySeenQuestions?: boolean;
  diversityMode?: boolean;
  allowPartialReuseWhenExhausted?: boolean;
}

export interface SectionAssemblyResult {
  sectionId: string;
  sectionName: string;
  requiredCount: number;
  selectedQuestions: CanonicalQuestion[];
  freshSelectedCount: number;
  reusedSelectedCount: number;
  difficultyBreakdown: { Easy: number; Medium: number; Hard: number };
  targetDifficulty: { Easy: number; Medium: number; Hard: number };
  isSatisfied: boolean;
  shortfall: number;
  warnings: string[];
}

export interface CompanyAssessmentAssemblyResult {
  success: boolean;
  blueprintId: string;
  blueprintTitle: string;
  userId: string;
  totalRequired: number;
  totalSelected: number;
  freshCount: number;
  reusedCount: number;
  sectionResults: SectionAssemblyResult[];
  testInstance?: TestInstance;
  shortfall: number;
  canAssembleFresh: boolean;
  errors: string[];
  warnings: string[];
}

export class QuestionSelectionEngine {
  /**
   * Evaluates if a CanonicalQuestion is genuinely compatible with a BlueprintSection.
   */
  public evaluateCompatibility(q: CanonicalQuestion, sec: BlueprintSection): boolean {
    // 1. Question Type match
    if (!sec.questionTypes.includes(q.questionType)) {
      return false;
    }

    // 2. Special Content Gap Sections (never satisfied by generic Foundation bank)
    const isSpecialSection =
      sec.id.includes('msoffice') ||
      sec.id.includes('networking') ||
      sec.id.includes('puzzle') ||
      sec.id.includes('coding');

    if (isSpecialSection) {
      // Must match section topics/subtopics/tags and cannot be satisfied by standard Foundation bank
      if (q.category === 'foundation') return false;
      const secTopicsLower = sec.topics.map((t) => t.toLowerCase());
      const qTopicLower = (q.topic || '').toLowerCase();
      const qSubtopicLower = (q.subtopic || '').toLowerCase();
      const qTagsLower = (q.tags || []).map((tg) => tg.toLowerCase());

      return secTopicsLower.some(
        (t) =>
          qTopicLower.includes(t) ||
          t.includes(qTopicLower) ||
          qSubtopicLower.includes(t) ||
          t.includes(qSubtopicLower) ||
          qTagsLower.some((tg) => tg.includes(t) || t.includes(tg))
      );
    }

    // 3. Skill & Domain Integrity
    const isAdvQuantReasoning = sec.id.includes('adv_quant_reasoning');
    const isQuantSection = !isAdvQuantReasoning && (sec.id.includes('quant') || sec.id.includes('numerical') || sec.id.includes('math'));
    const isLogicalSection = !isAdvQuantReasoning && (sec.id.includes('logical') || sec.id.includes('reasoning') || sec.id.includes('critical'));
    const isVerbalSection = sec.id.includes('verbal') || sec.id.includes('english');
    const isPseudoSection = sec.id.includes('pseudo');

    if (isAdvQuantReasoning) {
      if (q.skill !== 'Quantitative Aptitude' && q.skill !== 'Logical Reasoning') return false;
      if (q.company !== 'TCS' && !q.tags?.includes('TCS Advanced')) return false;
    }
    if (isQuantSection && q.skill !== 'Quantitative Aptitude') return false;
    if (isLogicalSection) {
      if (q.skill !== 'Logical Reasoning') return false;
      // If this is a generic logical section (not a puzzle section), do not greedily consume dedicated puzzle section questions
      const isPuzzleQ =
        ['q_infosys_004', 'q_infosys_005', 'q_infosys_006', 'q_infosys_007', 'q_infosys_040', 'q_infosys_041', 'q_infosys_042', 'q_infosys_043'].includes(q.id);
      if (isPuzzleQ) return false;
    }
    if (isVerbalSection && q.skill !== 'Verbal Ability') return false;
    if (isPseudoSection && q.skill !== 'Pseudocode & Programming Logic') return false;

    // 4. Topic Matching
    if (isAdvQuantReasoning) {
      return true;
    }
    const secTopicsLower = (sec.topics || []).map((t) => t.toLowerCase());
    const qTopicLower = (q.topic || (q as any).topic_category || '').toLowerCase();
    const topicMatches = secTopicsLower.some(
      (t) => qTopicLower.includes(t) || t.includes(qTopicLower)
    );

    return topicMatches;
  }

  /**
   * Candidate-Safe Selection & Company Test Assembly
   */
  public selectCompanyAssessmentQuestions(
    options: CompanySelectionOptions
  ): CompanyAssessmentAssemblyResult {
    const {
      userId,
      blueprint,
      questionBank,
      previouslyAttemptedQuestionIds = [],
      recentlySeenQuestionIds = [],
      excludeAttemptedQuestions = true,
      excludeRecentlySeenQuestions = true,
      allowPartialReuseWhenExhausted = false,
    } = options;

    const seenSet = new Set<string>([
      ...(excludeAttemptedQuestions ? previouslyAttemptedQuestionIds : []),
      ...(excludeRecentlySeenQuestions ? recentlySeenQuestionIds : []),
    ]);

    const selectedOverallIds = new Set<string>();
    const sectionResults: SectionAssemblyResult[] = [];
    const allSelectedQuestions: CanonicalQuestion[] = [];
    const errors: string[] = [];
    const warnings: string[] = [];

    let overallSuccess = true;
    let totalFresh = 0;
    let totalReused = 0;
    let totalShortfall = 0;

    for (const section of blueprint.sections) {
      const sectionCompatible = questionBank.filter((q) =>
        this.evaluateCompatibility(q, section)
      );

      // Separate into Fresh and Previously Seen
      const freshCandidates = sectionCompatible.filter(
        (q) => !seenSet.has(q.id) && !selectedOverallIds.has(q.id)
      );
      const seenCandidates = sectionCompatible.filter(
        (q) => seenSet.has(q.id) && !selectedOverallIds.has(q.id)
      );

      const sectionSelected: CanonicalQuestion[] = [];
      const secDiffBreakdown = { Easy: 0, Medium: 0, Hard: 0 };
      let secFresh = 0;
      let secReused = 0;

      // Group fresh by difficulty
      const freshByDiff = {
        Easy: freshCandidates.filter((q) => q.difficulty === 'Easy'),
        Medium: freshCandidates.filter((q) => q.difficulty === 'Medium'),
        Hard: freshCandidates.filter((q) => q.difficulty === 'Hard'),
      };

      const targetDiff = section.difficultyDistribution || { Easy: 0, Medium: 0, Hard: 0 };

      // Helper to pick items per difficulty
      (['Easy', 'Medium', 'Hard'] as const).forEach((diff) => {
        const needed = targetDiff[diff] || 0;
        const availableFresh = freshByDiff[diff] || [];
        const pickedFresh = availableFresh.slice(0, needed);

        pickedFresh.forEach((q) => {
          sectionSelected.push(q);
          selectedOverallIds.add(q.id);
          secDiffBreakdown[diff]++;
          secFresh++;
        });

        // If fresh is insufficient and partial reuse is allowed
        const remainingForDiff = needed - pickedFresh.length;
        if (remainingForDiff > 0 && allowPartialReuseWhenExhausted) {
          const availableSeen = seenCandidates.filter(
            (q) => q.difficulty === diff && !selectedOverallIds.has(q.id)
          );
          const pickedSeen = availableSeen.slice(0, remainingForDiff);
          pickedSeen.forEach((q) => {
            sectionSelected.push(q);
            selectedOverallIds.add(q.id);
            secDiffBreakdown[diff]++;
            secReused++;
          });
        }
      });

      // Adaptive fresh fill fallback: If exact difficulty buckets had slight surplus in Hard/Medium/Easy,
      // pick remaining available fresh compatible questions from the section to satisfy total required count
      if (sectionSelected.length < section.questionCount) {
        const remainingSectionNeed = section.questionCount - sectionSelected.length;
        const remainingFreshUnselected = freshCandidates.filter((q) => !selectedOverallIds.has(q.id));
        const fillFresh = remainingFreshUnselected.slice(0, remainingSectionNeed);

        fillFresh.forEach((q) => {
          sectionSelected.push(q);
          selectedOverallIds.add(q.id);
          secDiffBreakdown[q.difficulty]++;
          secFresh++;
        });
      }

      // If still underfilled and reuse is allowed, fill from remaining seen candidates
      if (sectionSelected.length < section.questionCount && allowPartialReuseWhenExhausted) {
        const remainingNeed = section.questionCount - sectionSelected.length;
        const remainingSeenUnselected = seenCandidates.filter((q) => !selectedOverallIds.has(q.id));
        const fillSeen = remainingSeenUnselected.slice(0, remainingNeed);

        fillSeen.forEach((q) => {
          sectionSelected.push(q);
          selectedOverallIds.add(q.id);
          secDiffBreakdown[q.difficulty]++;
          secReused++;
        });
      }

      const sectionShortfall = section.questionCount - sectionSelected.length;
      const isSatisfied = sectionShortfall === 0;

      if (!isSatisfied) {
        overallSuccess = false;
        totalShortfall += sectionShortfall;
        errors.push(
          `Section "${section.name}" shortfall: needed ${section.questionCount}, selected ${sectionSelected.length} (Missing ${sectionShortfall} Qs).`
        );
      }

      if (secReused > 0) {
        warnings.push(
          `Section "${section.name}" reused ${secReused} previously seen question(s) due to pool exhaustion.`
        );
      }

      totalFresh += secFresh;
      totalReused += secReused;
      allSelectedQuestions.push(...sectionSelected);

      sectionResults.push({
        sectionId: section.id,
        sectionName: section.name,
        requiredCount: section.questionCount,
        selectedQuestions: sectionSelected,
        freshSelectedCount: secFresh,
        reusedSelectedCount: secReused,
        difficultyBreakdown: secDiffBreakdown,
        targetDifficulty: targetDiff,
        isSatisfied,
        shortfall: sectionShortfall,
        warnings: secReused > 0 ? [`Reused ${secReused} questions.`] : [],
      });
    }

    let testInstance: TestInstance | undefined;
    if (overallSuccess) {
      testInstance = {
        id: `inst_${blueprint.id}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        blueprintId: blueprint.id,
        userId,
        questions: allSelectedQuestions,
        generatedAt: new Date().toISOString(),
        status: 'pending',
      };
    }

    return {
      success: overallSuccess,
      blueprintId: blueprint.id,
      blueprintTitle: blueprint.title,
      userId,
      totalRequired: blueprint.questionCount,
      totalSelected: allSelectedQuestions.length,
      freshCount: totalFresh,
      reusedCount: totalReused,
      sectionResults,
      testInstance,
      shortfall: totalShortfall,
      canAssembleFresh: totalReused === 0 && overallSuccess,
      errors,
      warnings,
    };
  }

  /**
   * Backwards compatible generateTestInstance
   */
  public generateTestInstance(
    blueprint: AssessmentBlueprint,
    userId: string,
    questionBank: CanonicalQuestion[],
    previousInstances: TestInstance[] = []
  ): TestInstance {
    const seenIds = new Set<string>();
    previousInstances.forEach((inst) => inst.questions.forEach((q) => seenIds.add(q.id)));

    const result = this.selectCompanyAssessmentQuestions({
      userId,
      blueprint,
      questionBank,
      previouslyAttemptedQuestionIds: Array.from(seenIds),
      allowPartialReuseWhenExhausted: true,
    });

    if (result.testInstance) {
      return result.testInstance;
    }

    // Fallback instance if partial assembly
    return {
      id: `instance_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      blueprintId: blueprint.id,
      userId,
      questions: result.sectionResults.flatMap((s) => s.selectedQuestions),
      generatedAt: new Date().toISOString(),
      status: 'pending',
    };
  }
}

export const questionSelectionEngine = new QuestionSelectionEngine();

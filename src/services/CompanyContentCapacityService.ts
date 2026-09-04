import { AssessmentBlueprint, CanonicalQuestion } from '../types';
import { questionSelectionEngine } from './QuestionSelectionEngine';

export interface SectionCapacity {
  sectionId: string;
  sectionName: string;
  requiredQuestions: number;
  globalCompatible: number;
  freshCompatible: number;
  previouslySeenCompatible: number;
  shortfall: number;
  status: 'SUFFICIENT_FOR_FRESH' | 'REQUIRES_REUSE' | 'INSUFFICIENT_POOL' | 'GENUINE_CONTENT_GAP';
  notes?: string;
}

export interface BlueprintCapacityReport {
  blueprintId: string;
  blueprintTitle: string;
  userId: string;
  totalRequired: number;
  totalGlobalCompatible: number;
  totalFreshCompatible: number;
  totalShortfall: number;
  canAssembleFresh: boolean;
  canAssembleWithReuse: boolean;
  sections: SectionCapacity[];
  warnings: string[];
}

export class CompanyContentCapacityService {
  /**
   * Analyzes candidate-specific content capacity for a company blueprint.
   */
  public analyzeCandidateCapacity(
    blueprint: AssessmentBlueprint,
    userId: string,
    questionBank: CanonicalQuestion[],
    candidateSeenQuestionIds: string[] = []
  ): BlueprintCapacityReport {
    const seenSet = new Set(candidateSeenQuestionIds);
    const sections: SectionCapacity[] = [];
    const warnings: string[] = [];

    let totalGlobalCompatible = 0;
    let totalFreshCompatible = 0;
    let totalShortfall = 0;
    let canAssembleFresh = true;
    let canAssembleWithReuse = true;

    for (const section of blueprint.sections) {
      const compatible = questionBank.filter((q) =>
        questionSelectionEngine.evaluateCompatibility(q, section)
      );

      const fresh = compatible.filter((q) => !seenSet.has(q.id));
      const previouslySeen = compatible.filter((q) => seenSet.has(q.id));

      const required = section.questionCount;
      const globalCount = compatible.length;
      const freshCount = fresh.length;
      const seenCount = previouslySeen.length;

      let status: SectionCapacity['status'] = 'SUFFICIENT_FOR_FRESH';
      let shortfall = 0;

      if (globalCount === 0) {
        status = 'GENUINE_CONTENT_GAP';
        shortfall = required;
        canAssembleFresh = false;
        canAssembleWithReuse = false;
        warnings.push(
          `Section "${section.name}" has an unresolved genuine content gap (${required} questions required).`
        );
      } else if (freshCount >= required) {
        status = 'SUFFICIENT_FOR_FRESH';
        shortfall = 0;
      } else if (globalCount >= required) {
        status = 'REQUIRES_REUSE';
        shortfall = required - freshCount;
        canAssembleFresh = false;
        warnings.push(
          `Section "${section.name}" has only ${freshCount} fresh questions for candidate (needs ${required}; requires reusing ${shortfall} questions).`
        );
      } else {
        status = 'INSUFFICIENT_POOL';
        shortfall = required - globalCount;
        canAssembleFresh = false;
        canAssembleWithReuse = false;
        warnings.push(
          `Section "${section.name}" has insufficient global pool (${globalCount} available, ${required} required).`
        );
      }

      totalGlobalCompatible += globalCount;
      totalFreshCompatible += freshCount;
      totalShortfall += shortfall;

      sections.push({
        sectionId: section.id,
        sectionName: section.name,
        requiredQuestions: required,
        globalCompatible: globalCount,
        freshCompatible: freshCount,
        previouslySeenCompatible: seenCount,
        shortfall,
        status,
      });
    }

    return {
      blueprintId: blueprint.id,
      blueprintTitle: blueprint.title,
      userId,
      totalRequired: blueprint.questionCount,
      totalGlobalCompatible,
      totalFreshCompatible,
      totalShortfall,
      canAssembleFresh,
      canAssembleWithReuse,
      sections,
      warnings,
    };
  }
}

export const companyContentCapacityService = new CompanyContentCapacityService();

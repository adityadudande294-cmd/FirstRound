import { CanonicalQuestion } from '../types';
import { TAXONOMY } from '../data/taxonomy';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validation Engine
 * 
 * Validates canonical questions entering the system, ensuring they meet the required
 * schema and quality constraints before moving from DRAFT to APPROVED.
 */
export class ValidationEngine {
  
  public validateQuestion(question: CanonicalQuestion): ValidationResult {
    const errors: string[] = [];

    // 1. Basic field presence
    if (!question.id) errors.push('Missing question ID.');
    if (!question.questionText) errors.push('Missing question text.');
    if (!question.explanation) errors.push('Missing explanation.');
    
    // 2. Type-specific validation
    if (question.questionType === 'MCQ_SINGLE' || question.questionType === 'MCQ_MULTIPLE') {
      if (!question.options || question.options.length < 2) {
        errors.push('MCQ questions must have at least 2 options.');
      }
      
      if (!question.correctAnswer) {
        errors.push('Missing correct answer.');
      } else if (question.options) {
        // Validate correct answer exists in options
        const correctAnswers = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer];
        const optionIds = question.options.map(o => o.id);
        correctAnswers.forEach(ans => {
          if (!optionIds.includes(ans)) {
            errors.push(`Correct answer '${ans}' does not match any option ID.`);
          }
        });
      }
      
      if (question.questionType === 'MCQ_SINGLE' && Array.isArray(question.correctAnswer) && question.correctAnswer.length > 1) {
        errors.push('MCQ_SINGLE must have exactly one correct answer.');
      }
    }

    // 3. Taxonomy validation
    const validTopics = Object.values(TAXONOMY.topics).flat();
    if (!validTopics.includes(question.topic)) {
      errors.push(`Invalid topic: '${question.topic}'. Must exist in TAXONOMY.`);
    }

    const validSkills = Object.values(TAXONOMY.skills);
    if (!validSkills.includes(question.skill)) {
      errors.push(`Invalid skill: '${question.skill}'. Must exist in TAXONOMY.`);
    }

    // 4. Provenance validation
    if (question.verificationStatus !== 'UNVERIFIED' && !question.source) {
      errors.push('Verified or Pattern Based questions must include a source.');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

import { CanonicalQuestion } from '../types';

/**
 * Duplicate Detection Service
 * 
 * Provides mechanisms to detect exact and semantic duplicates within the Question Bank
 * and during Test Instance generation.
 */
export class DuplicateDetection {
  
  /**
   * Normalizes question text for semantic comparison.
   * Removes punctuation, normalizes whitespace, and converts to lowercase.
   */
  public normalizeQuestionText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  /**
   * Generates a basic semantic hash for a question to detect near-duplicates.
   */
  public generateSemanticHash(text: string): string {
    const normalized = this.normalizeQuestionText(text);
    // Simple hash implementation for stub purposes
    let hash = 0;
    for (let i = 0; i < normalized.length; i++) {
      const char = normalized.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(16);
  }

  /**
   * Checks if a new question is a duplicate of any existing questions in the bank.
   */
  public isDuplicate(newQuestion: CanonicalQuestion, bank: CanonicalQuestion[]): boolean {
    const newHash = this.generateSemanticHash(newQuestion.questionText);
    
    for (const existing of bank) {
      if (existing.id === newQuestion.id) return true;
      
      const existingHash = this.generateSemanticHash(existing.questionText);
      if (existingHash === newHash) return true;
    }
    
    return false;
  }
}

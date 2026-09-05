import React from 'react';
import { Question } from '../types';
import { CodingWorkspace } from '../components/CodingWorkspace';

// Export GenericCodingEnvironment as a clean alias of CodingWorkspace
export const GenericCodingEnvironment = CodingWorkspace;

export const CodingEnvironmentRegistry = {
  /**
   * Resolves the appropriate React component for a given coding question
   * driven strictly by the question type and codingConfig.problemType.
   */
  resolve(question: Question): React.ComponentType<any> {
    if (question.questionType === 'SQL') {
      // Future SQLEnvironment will be returned here
      // For now we fall back to a generic component or throw if unsupported
      // But we will return GenericCodingEnvironment as placeholder
      return GenericCodingEnvironment;
    }
    
    if (question.questionType !== 'CODING') {
      // Technically MCQ should be handled outside this registry by MCQRenderer,
      // but if asked to resolve an environment, we shouldn't crash unless it's strictly CODING expected.
      throw new Error(`Cannot resolve coding environment for non-coding/SQL question type: ${question.questionType}`);
    }
    const problemType = question.codingConfig?.problemType?.toUpperCase() || 'ALGORITHM';

    const registeredTypes = [
      'ALGORITHM',
      'DSA',
      'DEBUGGING',
      'SQL',
      'FRONTEND',
      'FUNCTION_IMPLEMENTATION',
      'CODE_OUTPUT',
    ];

    if (registeredTypes.includes(problemType)) {
      // In the future, individual environment renderers (e.g. SQLWorkspace)
      // can be mapped here. For now, they all leverage the robust GenericCodingEnvironment.
      return CodingWorkspace;
    }

    // Default fallback environment for unknown/future problem types
    return GenericCodingEnvironment;
  }
};

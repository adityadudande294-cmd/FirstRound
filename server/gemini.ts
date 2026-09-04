import { GoogleGenAI } from '@google/genai';
import { AIDoubtResponse, Question, TestSeries } from '../src/types';

let genAIClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAIClient;
}

export async function askAIDoubt(params: {
  question: Question;
  userSelectedOption?: string | null;
  studentQuestion?: string;
}): Promise<AIDoubtResponse> {
  const { question, userSelectedOption, studentQuestion } = params;
  const ai = getAIClient();

  if (!ai) {
    // High-quality fallback explanation if API key is not configured
    return {
      answer: `The correct option is (${question.correctOption}). ${question.explanation}`,
      stepByStepSolution: [
        'Identify the given parameters and target variable.',
        'Apply the standard placement formula or logical relationship.',
        `Compute the result to match option (${question.correctOption}).`,
      ],
      keyFormulaOrConcept: question.shortcutFormula || 'Standard Aptitude Formula & Logic Rules',
      shortcutTrick: 'Eliminate options with incompatible parity, units, or boundary conditions before calculating.',
      commonTrapToAvoid: 'Watch out for mixed units (e.g. km/h vs m/s or days vs hours) and negative signs.',
    };
  }

  try {
    const prompt = `You are FirstRound's expert campus placement aptitude tutor for top IT firms (TCS, Infosys, Wipro, Accenture, Cognizant).
Break down this question in an encouraging, crisp, structured format for placement students.

Question:
${question.questionText}
${question.codeSnippet ? `Code:\n${question.codeSnippet}\n` : ''}

Options:
${question.options.map((o) => `(${o.id}) ${o.text}`).join('\n')}

Correct Option: (${question.correctOption})
${userSelectedOption ? `Student selected: (${userSelectedOption})` : ''}
${studentQuestion ? `Student's specific doubt: "${studentQuestion}"` : ''}
Original Explanation:
${question.explanation}

Respond in strict JSON with these keys:
{
  "answer": "Clear summary of why option ${question.correctOption} is correct",
  "stepByStepSolution": ["Step 1 explanation", "Step 2 explanation", "Step 3 explanation"],
  "keyFormulaOrConcept": "Key formula or rule used",
  "shortcutTrick": "10-second speed math shortcut or elimination trick for exam",
  "commonTrapToAvoid": "The exact mistake candidates make in this problem"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      return {
        answer: parsed.answer || `Correct Option is (${question.correctOption})`,
        stepByStepSolution: Array.isArray(parsed.stepByStepSolution) ? parsed.stepByStepSolution : [question.explanation],
        keyFormulaOrConcept: parsed.keyFormulaOrConcept || question.shortcutFormula || 'Key Placement Concept',
        shortcutTrick: parsed.shortcutTrick || 'Use option elimination and units check.',
        commonTrapToAvoid: parsed.commonTrapToAvoid || 'Be careful of unit conversions.',
      };
    }
  } catch (error) {
    console.error('Error generating AI doubt answer:', error);
  }

  return {
    answer: `The correct option is (${question.correctOption}). ${question.explanation}`,
    stepByStepSolution: [
      'Understand the problem statement and given values.',
      'Apply formula / deduction step-by-step.',
      `Verify result matches option (${question.correctOption}).`,
    ],
    keyFormulaOrConcept: question.shortcutFormula || 'Placement Aptitude Core Principle',
    shortcutTrick: 'Look for symmetry or plug in simple numbers (0, 1, 100) to check options fast.',
    commonTrapToAvoid: 'Misinterpreting the question condition.',
  };
}

export async function generateAITestSeries(params: {
  topicOrCompany: string;
  category: string;
  difficulty: string;
  numQuestions: number;
}): Promise<{ test: Omit<TestSeries, 'id' | 'attemptsCount'>; questions: Omit<Question, 'id' | 'testSeriesId'>[] }> {
  const { topicOrCompany, category, difficulty, numQuestions } = params;
  const ai = getAIClient();

  if (!ai) {
    // Return sample seeded test if AI key not present
    return {
      test: {
        title: `${topicOrCompany} Placement Sprint (${category})`,
        description: `High-frequency placement questions on ${topicOrCompany} calibrated for campus hiring rounds.`,
        companyName: topicOrCompany,
        category: category as any,
        difficulty: difficulty as any,
        durationMinutes: Math.max(10, numQuestions * 2.5),
        totalQuestions: numQuestions,
        passingPercentage: 65,
        tags: [topicOrCompany, category, 'AI Generated', 'Campus Prep'],
      },
      questions: [
        {
          questionText: `If 12 men can complete a project in 20 days working 8 hours a day, how many days will 16 men take to complete the same project working 6 hours a day?`,
          options: [
            { id: 'A', text: '20 days' },
            { id: 'B', text: '24 days' },
            { id: 'C', text: '18 days' },
            { id: 'D', text: '16 days' },
          ],
          correctOption: 'A',
          topic: 'Time and Work',
          subTopic: 'Man-Days-Hours Formula',
          difficulty: 'Medium',
          companyTag: topicOrCompany,
          yearTag: '2025 Mock',
          explanation: 'Using M1*D1*H1 = M2*D2*H2 => 12*20*8 = 16*D2*6 => 1920 = 96*D2 => D2 = 20 days.',
          shortcutFormula: 'M1*D1*H1 / W1 = M2*D2*H2 / W2',
        },
      ],
    };
  }

  const prompt = `You are a Senior Placement Test Architect for TCS NQT, Infosys, Wipro NLTH, and Accenture.
Create a high-quality ${numQuestions}-question Aptitude Mock Test on: "${topicOrCompany}"
Category: ${category}
Difficulty: ${difficulty}

Respond in strict JSON with the following structure:
{
  "test": {
    "title": "Title of the test series",
    "description": "Short 1-2 sentence description",
    "companyName": "${topicOrCompany}",
    "category": "${category}",
    "difficulty": "${difficulty}",
    "durationMinutes": ${Math.max(10, numQuestions * 2)},
    "totalQuestions": ${numQuestions},
    "passingPercentage": 65,
    "tags": ["${topicOrCompany}", "${category}", "PYQ 2025"]
  },
  "questions": [
    {
      "questionText": "Clear problem statement",
      "options": [
        {"id": "A", "text": "Option A"},
        {"id": "B", "text": "Option B"},
        {"id": "C", "text": "Option C"},
        {"id": "D", "text": "Option D"}
      ],
      "correctOption": "A",
      "topic": "${category}",
      "subTopic": "Specific sub-topic",
      "difficulty": "${difficulty}",
      "companyTag": "${topicOrCompany}",
      "yearTag": "2025 PYQ",
      "explanation": "Detailed step-by-step solution showing mathematical/logical working",
      "shortcutFormula": "Exam shortcut or formula"
    }
  ]
}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      return parsed;
    }
  } catch (err) {
    console.error('Failed to generate AI test:', err);
  }

  // Fallback
  return {
    test: {
      title: `${topicOrCompany} Practice Challenge`,
      description: `Comprehensive mock test on ${topicOrCompany}.`,
      companyName: topicOrCompany,
      category: category as any,
      difficulty: difficulty as any,
      durationMinutes: numQuestions * 2,
      totalQuestions: numQuestions,
      passingPercentage: 65,
      tags: [topicOrCompany, category],
    },
    questions: [],
  };
}

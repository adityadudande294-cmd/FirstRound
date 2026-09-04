import React, { useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Bot,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  Send,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { AIDoubtResponse, Question } from '../types';

interface AIDoubtDrawerProps {
  question: Question;
  userSelectedOption?: 'A' | 'B' | 'C' | 'D' | null;
  onClose: () => void;
  onAskAI: (payload: { question: Question; userSelectedOption?: string | null; studentQuestion?: string }) => Promise<AIDoubtResponse>;
}

export const AIDoubtDrawer: React.FC<AIDoubtDrawerProps> = ({
  question,
  userSelectedOption,
  onClose,
  onAskAI,
}) => {
  const [customQuestion, setCustomQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [doubtResponse, setDoubtResponse] = useState<AIDoubtResponse | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Auto-fetch standard AI breakdown on open
  React.useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true);
      fetchBreakdown();
    }
  }, [hasInitialized]);

  const fetchBreakdown = async (studentQuery?: string) => {
    setLoading(true);
    try {
      const res = await onAskAI({
        question,
        userSelectedOption: userSelectedOption || null,
        studentQuestion: studentQuery || undefined,
      });
      setDoubtResponse(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendCustomDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim() || loading) return;
    fetchBreakdown(customQuestion.trim());
    setCustomQuestion('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-xl bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl text-slate-900 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 bg-primary border-b border-primary-dark text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-['Outfit'] text-white">FirstRound AI Tutor</h3>
                <span className="px-2 py-0.5 rounded bg-white/20 text-white text-[10px] font-bold uppercase">
                  Placement Mentor
                </span>
              </div>
              <p className="text-xs text-slate-300">Step-by-step logic, shortcuts & option elimination</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-5">
          {/* Question Summary Pill */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-sky-800">{question.topic}</span>
              <span className="text-slate-500 font-semibold">Correct Option: ({question.correctOption})</span>
            </div>
            <p className="text-xs text-slate-800 line-clamp-3 leading-relaxed font-medium">{question.questionText}</p>
          </div>

          {/* AI Response Area */}
          {loading ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-8 h-8 border-3 border-amber-400 border-t-amber-500 rounded-full animate-spin mx-auto"></div>
              <p className="text-xs font-bold text-slate-800">Analyzing question with Gemini AI tutor...</p>
              <p className="text-[11px] text-slate-500">Generating step-by-step breakdown & speed shortcuts</p>
            </div>
          ) : doubtResponse ? (
            <div className="space-y-4 animate-in fade-in">
              {/* Answer summary */}
              <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-900">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span>AI Tutor Explanation</span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed">{doubtResponse.answer}</p>
              </div>

              {/* Step by step */}
              {doubtResponse.stepByStepSolution && doubtResponse.stepByStepSolution.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-sky-700" />
                    Step-by-Step Derivation
                  </h4>
                  <div className="space-y-2">
                    {doubtResponse.stepByStepSolution.map((step, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">
                          {idx + 1}
                        </span>
                        <p className="text-slate-800 leading-relaxed font-mono">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 10-Second Exam Shortcut Trick */}
              {doubtResponse.shortcutTrick && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                    <Zap className="w-4 h-4 fill-amber-500 text-amber-600" />
                    <span>10-Second Exam Shortcut Trick</span>
                  </div>
                  <p className="text-xs text-amber-950 leading-relaxed">{doubtResponse.shortcutTrick}</p>
                </div>
              )}

              {/* Common Trap */}
              {doubtResponse.commonTrapToAvoid && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-900">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Common Candidate Mistake to Avoid</span>
                  </div>
                  <p className="text-xs text-rose-950 leading-relaxed">{doubtResponse.commonTrapToAvoid}</p>
                </div>
              )}

              {/* Formula & Concept */}
              {doubtResponse.keyFormulaOrConcept && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Core Formula</span>
                  <p className="font-mono text-slate-900 font-bold">{doubtResponse.keyFormulaOrConcept}</p>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Bottom Custom Doubt Input */}
        <form onSubmit={handleSendCustomDoubt} className="p-4 bg-white border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="Ask AI: e.g., 'Explain using LCM shortcut method'..."
            className="flex-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            disabled={!customQuestion.trim() || loading}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask</span>
          </button>
        </form>
      </div>
    </div>
  );
};

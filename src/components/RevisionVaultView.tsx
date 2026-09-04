import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Bookmark,
  BookmarkX,
  BookOpen,
  Bot,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  Filter,
  Flame,
  HelpCircle,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Trash2,
  XCircle,
  Zap,
} from 'lucide-react';
import { AIDoubtResponse, BookmarkedItem, Question, WeakQuestionItem } from '../types';
import { AIDoubtDrawer } from './AIDoubtDrawer';

interface RevisionVaultViewProps {
  weakQuestions: WeakQuestionItem[];
  bookmarkedItems: BookmarkedItem[];
  onRemoveBookmark: (questionId: string) => Promise<boolean>;
  onStartCustomQuiz: (questions: Question[]) => void;
  onAskAI: (payload: { question: Question; userSelectedOption?: string | null; studentQuestion?: string }) => Promise<AIDoubtResponse>;
}

export const RevisionVaultView: React.FC<RevisionVaultViewProps> = ({
  weakQuestions,
  bookmarkedItems,
  onRemoveBookmark,
  onStartCustomQuiz,
  onAskAI,
}) => {
  const [activeTab, setActiveTab] = useState<'weak' | 'bookmarks'>('weak');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [activeDoubtQuestion, setActiveDoubtQuestion] = useState<Question | null>(null);

  // Filter lists
  const currentList = activeTab === 'weak' ? weakQuestions.map((w) => w.question) : bookmarkedItems.map((b) => b.question);

  const topics = Array.from(new Set(currentList.map((q) => q.topic).filter(Boolean)));

  const filteredQuestions = currentList.filter((q) => {
    if (selectedTopic !== 'all' && q.topic !== selectedTopic) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0d3461] via-[#0b2b52] to-[#071f3d] p-7 sm:p-10 space-y-3 text-white shadow-xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold shadow-sm">
          <BookOpen className="w-4 h-4 text-slate-950" />
          <span>Smart Revision & Memory Vault</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
          Revision Vault & Weak Areas
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
          Automated collection of questions you answered incorrectly across mock tests. Re-attempt weak concepts until you achieve 100% mastery.
        </p>

        {filteredQuestions.length > 0 && (
          <div className="pt-2">
            <button
              onClick={() => onStartCustomQuiz(filteredQuestions)}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Re-Attempt All {filteredQuestions.length} Questions as Revision Quiz
            </button>
          </div>
        )}
      </div>

      {/* Tabs & Topic Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('weak')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'weak'
                ? 'bg-[#0b2545] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <XCircle className="w-4 h-4 text-rose-400" />
            <span>Weak Questions ({weakQuestions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'bookmarks'
                ? 'bg-[#0b2545] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span>Bookmarked Questions ({bookmarkedItems.length})</span>
          </button>
        </div>

        {/* Topic filter */}
        {topics.length > 0 && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-semibold">Filter Topic:</span>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#0b2545]"
            >
              <option value="all">All Topics</option>
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3 shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              {activeTab === 'weak' ? 'No weak questions yet!' : 'No bookmarked questions saved yet'}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              {activeTab === 'weak'
                ? 'When you take practice and exam mock tests, questions you get wrong will automatically appear here for focused revision.'
                : 'During any test, click the bookmark icon on tough questions to save them to this vault.'}
            </p>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isExpanded = expandedId === q.id;
            const weakMeta = weakQuestions.find((w) => w.question.id === q.id);

            return (
              <div
                key={q.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm transition-all hover:border-slate-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold">
                      {q.topic}
                    </span>
                    {q.subTopic && (
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs">
                        {q.subTopic}
                      </span>
                    )}
                    {weakMeta && (
                      <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold">
                        Failed {weakMeta.timesFailed}x in Past Tests
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveDoubtQuestion(q)}
                      className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Bot className="w-3.5 h-3.5 text-amber-600" />
                      <span>Ask AI</span>
                    </button>

                    {activeTab === 'bookmarks' && (
                      <button
                        onClick={() => onRemoveBookmark(q.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Remove from bookmarks"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Question Statement */}
                <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed whitespace-pre-line">
                  {q.questionText}
                </p>

                {q.codeSnippet && (
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-sky-300 whitespace-pre">
                    {q.codeSnippet}
                  </div>
                )}

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt) => {
                    const isCorrect = opt.id === q.correctOption;
                    return (
                      <div
                        key={opt.id}
                        className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
                          isCorrect && isExpanded
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="w-5 h-5 rounded bg-slate-200 font-bold text-[11px] flex items-center justify-center text-slate-700">
                          {opt.id}
                        </span>
                        <span className="flex-1">{opt.text}</span>
                        {isCorrect && isExpanded && (
                          <span className="text-[10px] font-black text-emerald-700">✓ Correct</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Expand / Collapse Solution */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isExpanded ? 'Hide Step-by-Step Solution' : 'View Step-by-Step Solution & Formulas'}</span>
                  </button>

                  <span className="text-[11px] text-slate-500 font-medium">Correct Option: ({q.correctOption})</span>
                </div>

                {isExpanded && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 animate-in fade-in">
                    <p className="text-xs font-bold text-emerald-800">Full Derivation & Solution:</p>
                    <p className="text-xs text-slate-700 font-mono whitespace-pre-line leading-relaxed">
                      {q.explanation}
                    </p>
                    {q.shortcutFormula && (
                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 font-semibold">
                        💡 Exam Shortcut: {q.shortcutFormula}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Floating AI Doubt Drawer */}
      {activeDoubtQuestion && (
        <AIDoubtDrawer
          question={activeDoubtQuestion}
          onClose={() => setActiveDoubtQuestion(null)}
          onAskAI={onAskAI}
        />
      )}
    </div>
  );
};

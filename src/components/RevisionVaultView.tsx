import React, { useState, useMemo } from 'react';
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
  Search,
  ArrowRight
} from 'lucide-react';
import { AIDoubtResponse, BookmarkedItem, Question, WeakQuestionItem, TestSeries, TestMode } from '../types';
import { AIDoubtDrawer } from './AIDoubtDrawer';

interface RevisionVaultViewProps {
  weakQuestions: WeakQuestionItem[];
  bookmarkedItems: BookmarkedItem[];
  tests?: TestSeries[];
  onRemoveBookmark: (questionId: string) => Promise<boolean>;
  onStartCustomQuiz: (questions: Question[]) => void;
  onStartTest?: (test: TestSeries, mode?: TestMode) => void;
  onAskAI: (payload: { question: Question; userSelectedOption?: string | null; studentQuestion?: string }) => Promise<AIDoubtResponse>;
}

export const RevisionVaultView: React.FC<RevisionVaultViewProps> = ({
  weakQuestions,
  bookmarkedItems,
  tests = [],
  onRemoveBookmark,
  onStartCustomQuiz,
  onStartTest,
  onAskAI,
}) => {
  const [activeTab, setActiveTab] = useState<'weak' | 'bookmarks'>('weak');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filters
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Sorting
  const [weakSortOrder, setWeakSortOrder] = useState<'default' | 'most-failed' | 'recent'>('default');

  // Quiz configuration
  const [quizCount, setQuizCount] = useState<'5' | '10' | 'all'>('all');

  const [activeDoubtQuestion, setActiveDoubtQuestion] = useState<Question | null>(null);

  // Pre-process current list and map metadata
  const currentListRaw = activeTab === 'weak' ? weakQuestions : bookmarkedItems;
  
  const currentListWithMeta = useMemo(() => {
    return currentListRaw.map((item) => {
      const q = 'question' in item ? item.question : (item as any).question;
      const test = tests.find(t => t.id === q.testSeriesId);
      const isWeak = activeTab === 'weak';
      return {
        item,
        q,
        test,
        timesFailed: isWeak ? (item as WeakQuestionItem).timesFailed : 0,
        lastAttemptedAt: isWeak ? (item as WeakQuestionItem).lastAttemptedAt : (item as BookmarkedItem).addedAt,
      };
    });
  }, [currentListRaw, tests, activeTab]);

  // Derived available filters
  const availableTopics = Array.from(new Set(currentListWithMeta.map((m) => m.q.topic).filter(Boolean)));
  const availableCategories = Array.from(new Set(currentListWithMeta.map((m) => m.test?.category).filter(Boolean)));
  const availableCompanies = Array.from(new Set(currentListWithMeta.map((m) => m.q.companyTag || m.test?.company).filter(Boolean)));
  const availableDifficulties = Array.from(new Set(currentListWithMeta.map((m) => m.q.difficulty).filter(Boolean)));

  // Apply Search, Filters, and Sort
  const filteredItems = useMemo(() => {
    let result = [...currentListWithMeta];

    // Search
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(m => 
        m.q.questionText.toLowerCase().includes(lowerSearch) ||
        m.q.topic.toLowerCase().includes(lowerSearch) ||
        (m.test?.title || '').toLowerCase().includes(lowerSearch) ||
        (m.q.companyTag || m.test?.company || '').toLowerCase().includes(lowerSearch)
      );
    }

    // Filters
    if (selectedTopic !== 'all') result = result.filter(m => m.q.topic === selectedTopic);
    if (selectedCategory !== 'all') result = result.filter(m => m.test?.category === selectedCategory);
    if (selectedCompany !== 'all') result = result.filter(m => (m.q.companyTag || m.test?.company) === selectedCompany);
    if (selectedDifficulty !== 'all') result = result.filter(m => m.q.difficulty === selectedDifficulty);

    // Sorting (Weak only for failed/recent, Bookmarks can use recent)
    if (weakSortOrder === 'most-failed' && activeTab === 'weak') {
      result.sort((a, b) => b.timesFailed - a.timesFailed);
    } else if (weakSortOrder === 'recent') {
      result.sort((a, b) => new Date(b.lastAttemptedAt || 0).getTime() - new Date(a.lastAttemptedAt || 0).getTime());
    }

    return result;
  }, [currentListWithMeta, searchTerm, selectedTopic, selectedCategory, selectedCompany, selectedDifficulty, weakSortOrder, activeTab]);

  const finalFilteredQuestions = filteredItems.map(m => m.q);

  // Derive Quiz options
  const quizCountOptions = useMemo(() => {
    const total = finalFilteredQuestions.length;
    const opts = [];
    if (total >= 5) opts.push({ label: '5', value: '5' });
    if (total >= 10) opts.push({ label: '10', value: '10' });
    opts.push({ label: `All (${total})`, value: 'all' });
    return opts;
  }, [finalFilteredQuestions.length]);

  // Adjust quizCount if it exceeds available
  if (quizCount !== 'all' && parseInt(quizCount) > finalFilteredQuestions.length && finalFilteredQuestions.length > 0) {
    setQuizCount('all');
  }

  const handleStartQuiz = () => {
    let qList = finalFilteredQuestions;
    if (quizCount !== 'all') {
      qList = qList.slice(0, parseInt(quizCount));
    }
    onStartCustomQuiz(qList);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Header */}
      <div className="rounded-3xl bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end p-7 sm:p-10 space-y-3 text-white shadow-xl relative overflow-hidden">
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

        {finalFilteredQuestions.length > 0 && (
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <div className="bg-surface/10 backdrop-blur-sm rounded-xl p-1 border border-white/20 flex items-center">
              <select
                value={quizCount}
                onChange={(e) => setQuizCount(e.target.value as any)}
                className="bg-transparent text-white text-xs font-bold focus:outline-none px-2 py-1 appearance-none cursor-pointer"
              >
                {quizCountOptions.map(o => (
                  <option key={o.value} value={o.value} className="text-slate-900">{o.label} Questions</option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-white/70 mr-2" />
            </div>
            <button
              onClick={handleStartQuiz}
              className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Start Revision Quiz
            </button>
          </div>
        )}
      </div>

      {/* Controls Container */}
      <div className="bg-surface rounded-2xl border border-border p-4 shadow-sm space-y-4">
        {/* Top Row: Tabs, Search, Sort */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full lg:w-auto no-scrollbar">
            <button
              onClick={() => { setActiveTab('weak'); setWeakSortOrder('default'); }}
              className={`whitespace-nowrap px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'weak'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface text-text-secondary border border-border hover:bg-app-bg'
              }`}
            >
              <XCircle className="w-4 h-4 text-rose-400" />
              <span>Weak Questions ({weakQuestions.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('bookmarks'); setWeakSortOrder('default'); }}
              className={`whitespace-nowrap px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'bookmarks'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface text-text-secondary border border-border hover:bg-app-bg'
              }`}
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              <span>Bookmarks ({bookmarkedItems.length})</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search questions, topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-app-bg border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-text-muted text-xs font-semibold whitespace-nowrap">Sort:</span>
              <select
                value={weakSortOrder}
                onChange={(e) => setWeakSortOrder(e.target.value as any)}
                className="px-3 py-1.5 bg-app-bg border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
              >
                <option value="default">Default</option>
                <option value="recent">Recently Failed</option>
                {activeTab === 'weak' && <option value="most-failed">Most Failed</option>}
              </select>
            </div>
          </div>
        </div>

        {/* Bottom Row: Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
          <div className="flex items-center gap-1.5 text-text-muted text-xs font-semibold mr-2">
            <Filter className="w-3.5 h-3.5" /> Filters:
          </div>

          {availableTopics.length > 0 && (
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-1.5 bg-app-bg border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
            >
              <option value="all">All Topics</option>
              {availableTopics.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          )}

          {availableCategories.length > 0 && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 bg-app-bg border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
            >
              <option value="all">All Categories</option>
              {availableCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          )}

          {availableCompanies.length > 0 && (
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="px-3 py-1.5 bg-app-bg border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
            >
              <option value="all">All Companies</option>
              {availableCompanies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          )}

          {availableDifficulties.length > 0 && (
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-1.5 bg-app-bg border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
            >
              <option value="all">All Difficulties</option>
              {availableDifficulties.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          )}
          
          {(selectedTopic !== 'all' || selectedCategory !== 'all' || selectedCompany !== 'all' || selectedDifficulty !== 'all' || searchTerm !== '') && (
            <button
              onClick={() => {
                setSelectedTopic('all');
                setSelectedCategory('all');
                setSelectedCompany('all');
                setSelectedDifficulty('all');
                setSearchTerm('');
              }}
              className="px-3 py-1.5 text-xs font-semibold text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="bg-surface border border-border rounded-2xl p-12 text-center space-y-3 shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-text-primary">
              {activeTab === 'weak' ? 'No weak questions match your criteria.' : 'No bookmarked questions match your criteria.'}
            </h3>
            <p className="text-xs text-text-muted max-w-md mx-auto leading-relaxed">
              Try adjusting your search terms or clearing the active filters.
            </p>
          </div>
        ) : (
          filteredItems.map((meta, idx) => {
            const q = meta.q;
            const isExpanded = expandedId === q.id;

            return (
              <div
                key={q.id}
                className="bg-surface border border-border rounded-2xl p-6 space-y-4 shadow-sm transition-all hover:border-slate-300"
              >
                {/* Meta Header */}
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-surface-hover text-text-primary font-bold text-xs flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200 text-[10px] font-bold uppercase tracking-wider">
                      {q.topic}
                    </span>
                    {q.difficulty && (
                      <span className={`px-2.5 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${
                        q.difficulty === 'Hard' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        q.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {q.difficulty}
                      </span>
                    )}
                    {(q.companyTag || meta.test?.company) && (
                      <span className="px-2 py-0.5 rounded bg-surface-hover text-text-secondary border border-border text-[10px] font-bold uppercase tracking-wider">
                        🏢 {q.companyTag || meta.test?.company}
                      </span>
                    )}
                    {activeTab === 'weak' && meta.timesFailed > 0 && (
                      <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        Failed {meta.timesFailed}x
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
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

                {/* Source Assessment Context Box */}
                {meta.test && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-app-bg border border-border rounded-xl">
                    <div className="flex items-center flex-wrap gap-2 text-xs">
                      <span className="text-text-muted font-medium">Source Test:</span>
                      <span className="font-bold text-text-primary">{meta.test.title}</span>
                      {meta.test.category && (
                        <span className="px-1.5 py-0.5 rounded bg-surface-hover text-[10px] text-text-secondary border border-border">
                          {meta.test.category}
                        </span>
                      )}
                    </div>
                    {onStartTest && (
                      <button
                        onClick={() => onStartTest(meta.test!, 'practice')}
                        className="flex items-center gap-1 text-[11px] font-bold text-primary hover:text-primary-active transition-colors shrink-0"
                      >
                        Practice This Test <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}

                {/* Question Statement */}
                <p className="text-xs sm:text-sm font-semibold text-text-primary leading-relaxed whitespace-pre-line">
                  {q.questionText}
                </p>

                {q.codeSnippet && (
                  <div className="p-3 bg-primary rounded-xl border border-primary-active font-mono text-xs text-sky-300 whitespace-pre overflow-x-auto">
                    {q.codeSnippet}
                  </div>
                )}

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options && q.options.map((opt) => {
                    const isCorrect = opt.id === q.correctOption;
                    return (
                      <div
                        key={opt.id}
                        className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
                          isCorrect && isExpanded
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                            : 'bg-app-bg border-border text-slate-700'
                        }`}
                      >
                        <span className="w-5 h-5 rounded bg-slate-200 font-bold text-[11px] flex items-center justify-center text-slate-700 shrink-0">
                          {opt.id}
                        </span>
                        <span className="flex-1">{opt.text}</span>
                        {isCorrect && isExpanded && (
                          <span className="text-[10px] font-black text-emerald-700 shrink-0">✓ Correct</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Expand / Collapse Solution */}
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isExpanded ? 'Hide Step-by-Step Solution' : 'View Step-by-Step Solution & Formulas'}</span>
                  </button>

                  <span className="text-[11px] text-text-muted font-medium">Correct Option: ({q.correctOption})</span>
                </div>

                {isExpanded && (
                  <div className="p-4 rounded-xl bg-app-bg border border-border space-y-2 animate-in fade-in">
                    <p className="text-xs font-bold text-emerald-800">Full Derivation & Solution:</p>
                    <p className="text-xs text-slate-700 font-mono whitespace-pre-line leading-relaxed">
                      {q.explanation}
                    </p>
                    {q.shortcutFormula && (
                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 font-semibold mt-3">
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

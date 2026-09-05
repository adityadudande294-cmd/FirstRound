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
  ArrowRight,
  Code2,
  Building2,
  Layers,
  GraduationCap
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
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'all' | 'foundation' | 'company' | 'coding'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());

  // Filters
  const [selectedTopic, setSelectedTopic] = useState('all');
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
    return currentListRaw
      .filter((item) => {
        if (!item) return false;
        const q = ('question' in item ? item.question : (item as any).question) || item;
        return q && q.id && !masteredIds.has(q.id);
      })
      .map((item) => {
        const q = ('question' in item ? item.question : (item as any).question) || item || {};
        const test = tests.find((t) => t.id === q?.testSeriesId || (t as any).id === q?.test_id);
        const isWeak = activeTab === 'weak';
        
        // Categorize question
        let cat = 'foundation';
        const topicLower = (q?.topic || (q as any)?.topic_category || '').toLowerCase();
        const testCat = (test?.category || '').toLowerCase();
        if (testCat === 'company' || q?.companyTag || test?.company) {
          cat = 'company';
        } else if (testCat === 'coding' || topicLower.includes('coding') || topicLower.includes('dsa') || topicLower.includes('sql') || topicLower.includes('pseudocode')) {
          cat = 'coding';
        }

        return {
          item,
          q,
          test,
          category: cat,
          timesFailed: isWeak ? (item as WeakQuestionItem).timesFailed || 1 : 0,
          lastAttemptedAt: isWeak ? (item as WeakQuestionItem).lastAttemptedAt : (item as BookmarkedItem).addedAt,
        };
      });
  }, [currentListRaw, tests, activeTab, masteredIds]);

  // Derived available filters
  const availableTopics = Array.from(new Set(currentListWithMeta.map((m) => m?.q?.topic || (m?.q as any)?.topic_category || 'General Aptitude').filter(Boolean)));
  const availableCompanies = Array.from(new Set(currentListWithMeta.map((m) => m?.q?.companyTag || m?.test?.company).filter(Boolean)));
  const availableDifficulties = Array.from(new Set(currentListWithMeta.map((m) => m?.q?.difficulty || 'Medium').filter(Boolean)));

  // Apply Search, Category Tabs, Filters, and Sort
  const filteredItems = useMemo(() => {
    let result = [...currentListWithMeta];

    // Category tab filter
    if (selectedCategoryTab !== 'all') {
      result = result.filter((m) => m.category === selectedCategoryTab);
    }

    // Search
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (m) =>
          (m?.q?.questionText || (m?.q as any)?.question_text || '').toLowerCase().includes(lowerSearch) ||
          (m?.q?.topic || (m?.q as any)?.topic_category || '').toLowerCase().includes(lowerSearch) ||
          (m?.test?.title || '').toLowerCase().includes(lowerSearch) ||
          (m?.q?.companyTag || m?.test?.company || '').toLowerCase().includes(lowerSearch)
      );
    }

    // Dropdown Filters
    if (selectedTopic !== 'all') result = result.filter((m) => (m?.q?.topic || (m?.q as any)?.topic_category) === selectedTopic);
    if (selectedCompany !== 'all') result = result.filter((m) => (m?.q?.companyTag || m?.test?.company) === selectedCompany);
    if (selectedDifficulty !== 'all') result = result.filter((m) => (m?.q?.difficulty || 'Medium') === selectedDifficulty);

    // Sorting
    if (weakSortOrder === 'most-failed' && activeTab === 'weak') {
      result.sort((a, b) => b.timesFailed - a.timesFailed);
    } else if (weakSortOrder === 'recent') {
      result.sort((a, b) => new Date(b.lastAttemptedAt || 0).getTime() - new Date(a.lastAttemptedAt || 0).getTime());
    }

    return result;
  }, [
    currentListWithMeta,
    selectedCategoryTab,
    searchTerm,
    selectedTopic,
    selectedCompany,
    selectedDifficulty,
    weakSortOrder,
    activeTab,
  ]);

  const finalFilteredQuestions = filteredItems.map((m) => m.q);

  // Derive Quiz options
  const quizCountOptions = useMemo(() => {
    const total = finalFilteredQuestions.length;
    const opts = [];
    if (total >= 5) opts.push({ label: '5', value: '5' });
    if (total >= 10) opts.push({ label: '10', value: '10' });
    opts.push({ label: `All (${total})`, value: 'all' });
    return opts;
  }, [finalFilteredQuestions.length]);

  const handleStartQuiz = () => {
    let qList = finalFilteredQuestions;
    if (quizCount !== 'all') {
      qList = qList.slice(0, parseInt(quizCount));
    }
    onStartCustomQuiz(qList);
  };

  const handleMarkMastered = (questionId: string) => {
    setMasteredIds((prev) => new Set([...prev, questionId]));
    if (activeTab === 'bookmarks') {
      onRemoveBookmark(questionId);
    }
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
          Automated collection of questions you answered incorrectly across mock tests. Re-attempt weak concepts, ask the AI doubt engine, and practice until you achieve 100% mastery.
        </p>

        {finalFilteredQuestions.length > 0 && (
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <div className="bg-surface/10 backdrop-blur-sm rounded-xl p-1 border border-white/20 flex items-center">
              <select
                value={quizCount}
                onChange={(e) => setQuizCount(e.target.value as any)}
                className="bg-transparent text-white text-xs font-bold focus:outline-none px-2 py-1 appearance-none cursor-pointer"
              >
                {quizCountOptions.map((o) => (
                  <option key={o.value} value={o.value} className="text-slate-900">
                    {o.label} Questions
                  </option>
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

      {/* Main Container */}
      <div className="bg-surface rounded-2xl border border-border p-4 shadow-sm space-y-5">
        {/* Row 1: Source Selector (Weak Questions vs Bookmarks) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('weak');
                setWeakSortOrder('default');
              }}
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
              onClick={() => {
                setActiveTab('bookmarks');
                setWeakSortOrder('default');
              }}
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

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search questions, topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-app-bg border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Row 2: Category Tabs (Foundation, Company, Coding) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedCategoryTab('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedCategoryTab === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-app-bg text-text-secondary hover:text-text-primary border border-border'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Categories</span>
          </button>
          <button
            onClick={() => setSelectedCategoryTab('foundation')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedCategoryTab === 'foundation'
                ? 'bg-blue-600 text-white'
                : 'bg-app-bg text-text-secondary hover:text-text-primary border border-border'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Foundation & Sectional</span>
          </button>
          <button
            onClick={() => setSelectedCategoryTab('company')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedCategoryTab === 'company'
                ? 'bg-purple-600 text-white'
                : 'bg-app-bg text-text-secondary hover:text-text-primary border border-border'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Company-Specific</span>
          </button>
          <button
            onClick={() => setSelectedCategoryTab('coding')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedCategoryTab === 'coding'
                ? 'bg-emerald-600 text-white'
                : 'bg-app-bg text-text-secondary hover:text-text-primary border border-border'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Coding & Technical</span>
          </button>
        </div>

        {/* Row 3: Dropdown Filters & Sorters */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-border">
          <div className="flex items-center gap-1.5 text-text-muted text-xs font-semibold mr-2">
            <Filter className="w-3.5 h-3.5" /> Filters:
          </div>

          {availableTopics.length > 0 && (
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-1.5 bg-app-bg border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
            >
              <option value="all">All Topics ({availableTopics.length})</option>
              {availableTopics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          )}

          {availableCompanies.length > 0 && (
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="px-3 py-1.5 bg-app-bg border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
            >
              <option value="all">All Companies</option>
              {availableCompanies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}

          {availableDifficulties.length > 0 && (
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-1.5 bg-app-bg border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
            >
              <option value="all">All Difficulties</option>
              {availableDifficulties.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-text-muted text-xs font-semibold whitespace-nowrap">Sort:</span>
            <select
              value={weakSortOrder}
              onChange={(e) => setWeakSortOrder(e.target.value as any)}
              className="px-3 py-1.5 bg-app-bg border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary"
            >
              <option value="default">Default</option>
              <option value="recent">Recently Added</option>
              {activeTab === 'weak' && <option value="most-failed">Most Failed</option>}
            </select>
          </div>
        </div>
      </div>

      {/* Questions List or Graceful Empty State */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="bg-surface border border-border rounded-3xl p-12 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">
              {activeTab === 'weak'
                ? 'Your Revision Vault is Clear!'
                : 'No Saved Bookmarks Yet'}
            </h3>
            <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto leading-relaxed">
              {activeTab === 'weak'
                ? 'Whenever you get questions wrong during mock exams, they are automatically logged here so you can review and master them.'
                : 'Click the bookmark icon on any question during test practice to save it for quick revision.'}
            </p>
            {tests.length > 0 && onStartTest && (
              <div className="pt-2">
                <button
                  onClick={() => onStartTest(tests[0], 'practice')}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-active text-white text-xs font-bold rounded-xl shadow-md transition-all inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Start a Test to Practice</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          filteredItems.map((meta, idx) => {
            const q = meta.q;
            const isExpanded = expandedId === q.id;

            return (
              <div
                key={q.id}
                className="bg-surface border border-border rounded-2xl p-6 space-y-4 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-700"
              >
                {/* Meta Header */}
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-surface-hover text-text-primary font-bold text-xs flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200 text-[10px] font-bold uppercase tracking-wider">
                      {q?.topic || (q as any)?.topic_category || 'General Aptitude'}
                    </span>
                    {q.difficulty && (
                      <span
                        className={`px-2.5 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${
                          q.difficulty === 'Hard'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : q.difficulty === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
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
                    {/* Ask AI Doubt Button */}
                    <button
                      onClick={() => setActiveDoubtQuestion(q)}
                      className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Bot className="w-3.5 h-3.5 text-amber-600" />
                      <span>Ask AI Doubt</span>
                    </button>

                    {/* Mark Mastered / Remove Control */}
                    <button
                      onClick={() => handleMarkMastered(q.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors flex items-center gap-1"
                      title="Mark as Mastered"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Mastered</span>
                    </button>
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
                  {q.options &&
                    q.options.map((opt) => {
                      const isCorrect = opt.id === q.correctOption;
                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
                            isCorrect && isExpanded
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700'
                              : 'bg-app-bg border-border text-text-primary'
                          }`}
                        >
                          <span className="w-5 h-5 rounded bg-slate-200 dark:bg-slate-700 font-bold text-[11px] flex items-center justify-center text-slate-700 dark:text-slate-200 shrink-0">
                            {opt.id}
                          </span>
                          <span className="flex-1">{opt.text}</span>
                          {isCorrect && isExpanded && (
                            <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 shrink-0">
                              ✓ Correct
                            </span>
                          )}
                        </div>
                      );
                    })}
                </div>

                {/* Reveal Solution Bar */}
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="text-xs font-bold text-sky-600 hover:text-sky-800 dark:text-sky-400 flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>
                      {isExpanded ? 'Hide Step-by-Step Solution' : 'Reveal Solution & Formulas'}
                    </span>
                  </button>

                  <span className="text-[11px] text-text-muted font-medium">
                    Correct Option: ({q.correctOption})
                  </span>
                </div>

                {/* Expanded Solution Box */}
                {isExpanded && (
                  <div className="p-4 rounded-xl bg-app-bg border border-border space-y-2 animate-in fade-in">
                    <p className="text-xs font-bold text-emerald-800 dark:text-emerald-400">
                      Full Derivation & Solution:
                    </p>
                    <p className="text-xs text-text-primary font-mono whitespace-pre-line leading-relaxed">
                      {q.explanation}
                    </p>
                    {q.shortcutFormula && (
                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 font-semibold mt-3 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800">
                        💡 Speed Shortcut: {q.shortcutFormula}
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

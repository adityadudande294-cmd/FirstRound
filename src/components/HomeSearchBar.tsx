import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  Building2,
  ChevronRight,
  Clock,
  HelpCircle,
  Play,
  Search,
  Sparkles,
  Tag,
  X,
  Zap,
} from 'lucide-react';
import { NavTab, TestMode, TestSeries } from '../types';

interface HomeSearchBarProps {
  tests: TestSeries[];
  onStartTest: (test: TestSeries, mode: TestMode) => void;
  onNavigateTab: (tab: NavTab) => void;
}

const POPULAR_COMPANIES = ['TCS', 'Infosys', 'Accenture', 'Wipro', 'Cognizant', 'Capgemini', 'Amazon'];
const POPULAR_TOPICS = [
  'Quantitative Aptitude',
  'Logical Reasoning',
  'Verbal Ability',
  'Cryptarithmetic',
  'Pseudocode',
  'Time & Work',
  'Puzzles',
];

export const HomeSearchBar: React.FC<HomeSearchBarProps> = ({
  tests,
  onStartTest,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Normalization and relevance ranking logic
  const searchResults = useMemo(() => {
    const raw = query.trim().toLowerCase();
    if (!raw) return { tests: [], matchingCompanies: [], matchingTopics: [], totalMatches: 0 };

    const terms = raw.split(/\s+/).filter(Boolean);

    // 1. Identify matching companies
    const matchingCompanies = POPULAR_COMPANIES.filter((company) => {
      const c = company.toLowerCase();
      return terms.some((t) => c.includes(t) || t.includes(c));
    });

    // 2. Identify matching topics
    const matchingTopics = POPULAR_TOPICS.filter((topic) => {
      const top = topic.toLowerCase();
      return terms.some((t) => top.includes(t) || t.includes(top));
    });

    // 3. Score and rank matching tests
    const scored = tests
      .map((test) => {
        let score = 0;
        const title = test.title.toLowerCase();
        const desc = test.description.toLowerCase();
        const comp = (test.companyName || test.companyId || '').toLowerCase();
        const cat = test.category.toLowerCase();
        const diff = test.difficulty.toLowerCase();
        const tags = test.tags.map((t) => t.toLowerCase());

        // Exact full phrase match
        if (title === raw) score += 120;
        else if (title.includes(raw)) score += 70;

        if (comp === raw || (test.companyId && test.companyId.toLowerCase() === raw)) score += 80;
        else if (comp.includes(raw)) score += 50;

        if (cat === raw || cat.includes(raw)) score += 40;
        if (diff === raw) score += 30;

        // Individual term matches
        terms.forEach((term) => {
          if (title.includes(term)) score += 25;
          if (comp.includes(term)) score += 20;
          if (cat.includes(term)) score += 15;
          if (tags.some((t) => t.includes(term))) score += 20;
          if (desc.includes(term)) score += 10;
        });

        return { test, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.test);

    return {
      tests: scored.slice(0, 6),
      matchingCompanies,
      matchingTopics,
      totalMatches: scored.length,
    };
  }, [query, tests]);

  const handleSelectTest = (test: TestSeries, mode: TestMode = 'exam') => {
    setIsOpen(false);
    onStartTest(test, mode);
  };

  const handleSelectSuggestion = (text: string) => {
    setQuery(text);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full z-30">
      {/* Search Input Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          ref={inputRef}
          id="home-search-input"
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search placement tests, TCS, Infosys, topics..."
          className="w-full pl-11 pr-10 py-3 bg-white hover:bg-slate-50/80 focus:bg-white text-sm text-slate-900 placeholder-slate-400 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/15 rounded-2xl shadow-xs outline-none transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dynamic Suggestions & Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* STATE 1: Empty Query -> Curated Quick Suggestions */}
          {!query.trim() ? (
            <div className="p-4 space-y-4 text-xs">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Target Companies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_COMPANIES.map((company) => (
                    <button
                      key={company}
                      type="button"
                      onClick={() => handleSelectSuggestion(company)}
                      className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Building2 className="w-3 h-3 text-sky-600" />
                      <span>{company}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Key Topics & Modules
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_TOPICS.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => handleSelectSuggestion(topic)}
                      className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3 h-3 text-emerald-600" />
                      <span>{topic}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : searchResults.tests.length === 0 ? (
            /* STATE 2: Query entered with 0 results */
            <div className="p-8 text-center space-y-3">
              <HelpCircle className="w-9 h-9 text-slate-300 mx-auto" />
              <div>
                <p className="text-sm font-bold text-slate-800">
                  No matching tests found for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Try searching for a company name (TCS, Infosys), aptitude topic (Quantitative, Logical), or difficulty.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                <span className="text-xs text-slate-400 mr-1">Suggestions:</span>
                {['TCS', 'Quantitative', 'Infosys', 'Verbal'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSelectSuggestion(s)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* STATE 3: Matching Results Categorized List */
            <div className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto">
              {/* Optional Matching Filter Badges */}
              {(searchResults.matchingCompanies.length > 0 || searchResults.matchingTopics.length > 0) && (
                <div className="p-3 bg-slate-50/80 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Filters:
                  </span>
                  {searchResults.matchingCompanies.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded-md bg-sky-100/70 text-sky-900 border border-sky-200 font-semibold text-[11px] flex items-center gap-1"
                    >
                      <Building2 className="w-3 h-3 text-sky-700" />
                      {c}
                    </span>
                  ))}
                  {searchResults.matchingTopics.map((top) => (
                    <span
                      key={top}
                      className="px-2 py-0.5 rounded-md bg-emerald-100/70 text-emerald-900 border border-emerald-200 font-semibold text-[11px] flex items-center gap-1"
                    >
                      <BookOpen className="w-3 h-3 text-emerald-700" />
                      {top}
                    </span>
                  ))}
                </div>
              )}

              {/* Matching Test Cards */}
              <div className="p-2 space-y-1">
                <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Matching Tests ({searchResults.totalMatches})
                </div>
                {searchResults.tests.map((test) => {
                  const diffColor =
                    test.difficulty === 'Easy'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : test.difficulty === 'Medium'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200';

                  return (
                    <div
                      key={test.id}
                      className="p-3 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-between gap-3 group"
                    >
                      <div
                        onClick={() => handleSelectTest(test, 'exam')}
                        className="cursor-pointer flex-1 min-w-0"
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                            {test.companyName || test.category}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${diffColor}`}>
                            {test.difficulty}
                          </span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {test.durationMinutes}m • {test.totalQuestions} Qs
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors mt-1 truncate">
                          {test.title}
                        </h4>
                        <p className="text-xs text-slate-500 truncate">{test.description}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {test.status === 'coming_soon' ? (
                          <div className="px-3 py-1.5 bg-slate-100 text-slate-400 text-xs font-bold rounded-lg border border-slate-200 flex items-center gap-1.5 cursor-not-allowed">
                            <Clock className="w-3 h-3" />
                            <span>Coming Soon</span>
                          </div>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => handleSelectTest(test, 'practice')}
                              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-200 transition-all flex items-center gap-1"
                            >
                              <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                              <span>Practice</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSelectTest(test, 'exam')}
                              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-all shadow-xs flex items-center gap-1"
                            >
                              <Play className="w-3 h-3 fill-slate-950" />
                              <span>Exam</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Exploration Link */}
              <div className="p-3 bg-slate-50/80 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Showing top {searchResults.tests.length} of {searchResults.totalMatches} matches
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onNavigateTab('tests');
                  }}
                  className="font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 hover:underline"
                >
                  <span>Explore all tests in catalog</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

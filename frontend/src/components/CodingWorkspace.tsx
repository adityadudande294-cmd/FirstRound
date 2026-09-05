import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Cpu,
  RefreshCw,
  Terminal,
  Code,
  Layers,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  FileText
} from 'lucide-react';
import {
  Question,
  SupportedLanguage,
  CodingExecutionResult,
  LanguageExecutionConfig,
  TestMode
} from '../types';
import { apiRunCode, apiSubmitCode } from '../api';
import { LanguageRegistry, resolveStarterCode, getSupportedLanguages } from '../services/LanguageRegistry';

interface CodingWorkspaceProps {
  question: Question;
  userId: string;
  testSeriesId?: string;
  testAttemptId?: string;
  mode?: TestMode;
  onSubmissionSuccess?: (questionId: string, result: CodingExecutionResult) => void;
  onCodeChange?: (code: string, language: SupportedLanguage) => void;
}

export const CodingWorkspace: React.FC<CodingWorkspaceProps> = ({
  question,
  userId,
  testSeriesId,
  testAttemptId,
  mode = 'exam',
  onSubmissionSuccess,
  onCodeChange,
}) => {
  const modeKey = mode === 'practice' ? `${testSeriesId || 'practice'}_practice` : (testSeriesId || 'exam');
  
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(() => {
    const allowedLangs = question.codingConfig?.languages || ['javascript', 'typescript', 'python'];
    const supportedAllowed = allowedLangs.filter(lang => LanguageRegistry[lang]?.isSupported);
    const def = question.codingConfig?.defaultLanguage;
    
    // First, try to restore the last used language from a global preference if we wanted, 
    // but here we just check if there's any saved code for the allowed languages.
    for (const lang of supportedAllowed) {
      if (localStorage.getItem(`coding_state:${userId}:${modeKey}:${question.id}:${lang}`)) {
        return lang as SupportedLanguage;
      }
    }

    if (def && supportedAllowed.includes(def)) {
      return def as SupportedLanguage;
    }
    return (supportedAllowed[0] || 'javascript') as SupportedLanguage;
  });
  const [sourceCode, setSourceCode] = useState<string>('');
  const [customInput, setCustomInput] = useState<string>('');
  const [useCustomInput, setUseCustomInput] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<CodingExecutionResult | null>(null);
  const [activeTab, setActiveTab] = useState<'results' | 'custom' | 'console'>('results');
  const [mobileTab, setMobileTab] = useState<'problem' | 'code' | 'results'>('problem');
  const [lineCount, setLineCount] = useState<number>(1);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  // 1. Initialize code from local storage or starter code
  useEffect(() => {
    const allowedLangs = question.codingConfig?.languages || ['javascript', 'typescript', 'python'];
    const supportedAllowed = allowedLangs.filter(lang => LanguageRegistry[lang]?.isSupported);
    
    let initialLang = selectedLanguage;
    if (!supportedAllowed.includes(initialLang)) {
      initialLang = (supportedAllowed[0] || 'javascript') as SupportedLanguage;
      setSelectedLanguage(initialLang);
    }

    const stateKeyLang = `coding_state:${userId}:${modeKey}:${question.id}:${initialLang}`;
    const savedCode = localStorage.getItem(stateKeyLang);
    
    if (savedCode !== null) {
      setSourceCode(savedCode);
      if (onCodeChange) onCodeChange(savedCode, initialLang);
    } else {
      const defaultCode = resolveStarterCode(initialLang, question.starterCode || question.codingConfig?.starterCode);
      setSourceCode(defaultCode);
      if (onCodeChange) onCodeChange(defaultCode, initialLang);
    }
  }, [question.id]);

  // 2. Track line count changes for gutter
  useEffect(() => {
    const count = sourceCode.split('\n').length;
    setLineCount(count || 1);
  }, [sourceCode]);

  // 3. Save state to local storage on edits
  const saveState = (code: string, lang: SupportedLanguage) => {
    try {
      localStorage.setItem(`coding_state:${userId}:${modeKey}:${question.id}:${lang}`, code);
    } catch (e) {
      console.error('Error autosaving code:', e);
    }
  };

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setSelectedLanguage(newLang);
    
    const stateKeyLang = `coding_state:${userId}:${modeKey}:${question.id}:${newLang}`;
    const savedCode = localStorage.getItem(stateKeyLang);
    
    let code = '';
    if (savedCode !== null) {
      code = savedCode;
    } else {
      code = resolveStarterCode(newLang, question.starterCode || question.codingConfig?.starterCode);
    }

    setSourceCode(code);
    saveState(code, newLang);
    if (onCodeChange) onCodeChange(code, newLang);
  };

  const handleSourceCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const code = e.target.value;
    setSourceCode(code);
    saveState(code, selectedLanguage);
    if (onCodeChange) onCodeChange(code, selectedLanguage);
  };

  // Reset to starter code
  const handleResetStarterCode = () => {
    if (window.confirm('Reset the editor to the starter boilerplate? Your current changes will be discarded.')) {
      const starter = question.starterCode?.[selectedLanguage] || question.codingConfig?.starterCode?.[selectedLanguage] || languagesConfig[selectedLanguage]?.defaultBoilerplate || '';
      setSourceCode(starter);
      saveState(starter, selectedLanguage);
      if (onCodeChange) onCodeChange(starter, selectedLanguage);
    }
  };

  // Sync scroll between textarea and line number gutter
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  // Support Tab key indent inserts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = sourceCode.substring(0, start) + '  ' + sourceCode.substring(end);
      setSourceCode(newValue);
      saveState(newValue, selectedLanguage);
      if (onCodeChange) onCodeChange(newValue, selectedLanguage);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleRunCode = async () => {
    if (isRunning || isSubmitting) return;
    setIsRunning(true);
    setActiveTab('results');
    setExecutionResult(null);

    try {
      const result = await apiRunCode({
        questionId: question.id,
        userId: userId || 'usr_guest',
        language: selectedLanguage,
        sourceCode,
        customInput: useCustomInput ? customInput : undefined,
      });
      setExecutionResult(result);
    } catch (err: any) {
      setExecutionResult({
        submissionId: `err_${Date.now()}`,
        questionId: question.id,
        userId: userId || 'usr_guest',
        language: selectedLanguage,
        status: 'SYSTEM_ERROR',
        passedTests: 0,
        totalTests: 1,
        sampleTestsPassed: 0,
        totalSampleTests: 1,
        hiddenTestsPassed: 0,
        totalHiddenTests: 0,
        runtimeMs: 0,
        memoryKb: 0,
        scorePercentage: 0,
        testCaseResults: [],
        errorMessage: err.message || 'Execution failed',
        executedAt: new Date().toISOString(),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    if (isRunning || isSubmitting) return;
    setIsSubmitting(true);
    setActiveTab('results');
    setExecutionResult(null);

    try {
      const result = await apiSubmitCode({
        questionId: question.id,
        userId: userId || 'usr_guest',
        testSeriesId,
        testAttemptId,
        language: selectedLanguage,
        sourceCode,
      });
      setExecutionResult(result);

      // Notify parent on success
      if (onSubmissionSuccess) {
        onSubmissionSuccess(question.id, result);
      }
    } catch (err: any) {
      setExecutionResult({
        submissionId: `err_${Date.now()}`,
        questionId: question.id,
        userId: userId || 'usr_guest',
        language: selectedLanguage,
        status: 'SYSTEM_ERROR',
        passedTests: 0,
        totalTests: 1,
        sampleTestsPassed: 0,
        totalSampleTests: 1,
        hiddenTestsPassed: 0,
        totalHiddenTests: 0,
        runtimeMs: 0,
        memoryKb: 0,
        scorePercentage: 0,
        testCaseResults: [],
        errorMessage: err.message || 'Submission failed',
        executedAt: new Date().toISOString(),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="flex flex-col h-full bg-slate-900 border-none lg:border lg:border-slate-800 rounded-none lg:rounded-xl overflow-hidden shadow-2xl flex-1 min-h-0 w-full relative">
      {/* Mobile Tab Navigation (Only visible on small screens) */}
      <div className="lg:hidden flex items-center bg-slate-950 border-b border-slate-800 shrink-0">
        <button
          onClick={() => setMobileTab('problem')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
            mobileTab === 'problem' ? 'text-amber-400 border-b-2 border-amber-400 bg-amber-400/5' : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Problem
        </button>
        <button
          onClick={() => setMobileTab('code')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
            mobileTab === 'code' ? 'text-amber-400 border-b-2 border-amber-400 bg-amber-400/5' : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Code
        </button>
        <button
          onClick={() => setMobileTab('results')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
            mobileTab === 'results' ? 'text-amber-400 border-b-2 border-amber-400 bg-amber-400/5' : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Results
        </button>
      </div>

      <div className="flex flex-col lg:flex-row h-full flex-1 min-h-0 overflow-hidden">
        {/* LEFT PANEL: Problem Details */}
        <div className={`${mobileTab === 'problem' ? 'flex' : 'hidden'} lg:flex w-full lg:w-[40%] flex-col border-r-0 lg:border-r border-slate-800 bg-slate-950/60 h-full overflow-y-auto`}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/80 sticky top-0 z-10 shrink-0">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Problem Description
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/20">
            {question.difficulty || 'Medium'}
          </span>
        </div>

        <div className="p-5 flex-1 flex flex-col space-y-5 text-slate-300 text-sm leading-relaxed">
          {/* Header */}
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              {question.topic || 'Coding Challenge'}
            </h3>
            {question.subTopic && (
              <span className="text-xs text-slate-400 font-medium">Topic: {question.subTopic}</span>
            )}
          </div>

          {/* Statement */}
          <div className="prose prose-invert max-w-none">
            <p className="whitespace-pre-line text-slate-200">
              {question.problemStatement || question.questionText}
            </p>
          </div>

          {/* Input Format */}
          {question.inputFormat && (
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Input Format</h4>
              <p className="text-slate-300 bg-slate-900/40 p-2.5 rounded border border-slate-800/60 font-mono text-[11px] whitespace-pre-wrap">
                {question.inputFormat}
              </p>
            </div>
          )}

          {/* Output Format */}
          {question.outputFormat && (
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Output Format</h4>
              <p className="text-slate-300 bg-slate-900/40 p-2.5 rounded border border-slate-800/60 font-mono text-[11px] whitespace-pre-wrap">
                {question.outputFormat}
              </p>
            </div>
          )}

          {/* Constraints */}
          {question.constraints && question.constraints.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Constraints</h4>
              <ul className="list-disc pl-5 text-[11px] font-mono text-slate-400 space-y-0.5">
                {question.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Examples */}
          {question.examples && question.examples.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Examples</h4>
              <div className="space-y-3">
                {question.examples.map((ex, i) => (
                  <div key={i} className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg space-y-2">
                    <div className="text-xs font-bold text-slate-300">Example {i + 1}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold mb-0.5">Input:</div>
                        <pre className="p-2 bg-slate-950 font-mono text-[11px] rounded text-emerald-400 border border-slate-800 overflow-x-auto">{ex.input}</pre>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold mb-0.5">Output:</div>
                        <pre className="p-2 bg-slate-950 font-mono text-[11px] rounded text-cyan-400 border border-slate-800 overflow-x-auto">{ex.output}</pre>
                      </div>
                    </div>
                    {ex.explanation && (
                      <p className="text-[11px] text-slate-400 italic">
                        <strong>Explanation:</strong> {ex.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL: Code Editor & Console */}
      <div className={`${mobileTab === 'code' || mobileTab === 'results' ? 'flex' : 'hidden'} lg:flex w-full lg:w-[60%] flex-col bg-slate-900 h-full min-h-0`}>
        
        {/* Code Editor Container (Hidden on mobile if 'results' tab is active) */}
        <div className={`${mobileTab === 'results' ? 'hidden lg:flex' : 'flex'} flex-col flex-1 min-h-0`}>
          {/* Editor Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 lg:px-4 py-2.5 bg-slate-950 border-b border-slate-800 shrink-0">
            <div className="flex items-center space-x-2">
              <label className="hidden sm:block text-xs font-medium text-slate-400">Language:</label>
              {(() => {
                const allowedLangs = question.codingConfig?.languages || ['javascript', 'typescript', 'python'];
                const supportedAllowed = allowedLangs.filter(lang => LanguageRegistry[lang]?.isSupported);
                
                if (supportedAllowed.length <= 1) {
                  const singleLang = supportedAllowed[0] || 'javascript';
                  const config = LanguageRegistry[singleLang] || { displayName: singleLang };
                  return (
                    <div className="text-xs font-medium text-slate-300 bg-slate-800 px-2.5 py-1 rounded border border-slate-700 select-none">
                      {config.displayName}
                    </div>
                  );
                }
                
                return (
                  <select
                    value={selectedLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
                    className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded px-2.5 py-1 font-medium focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  >
                    {supportedAllowed.map((lang) => (
                      <option key={lang} value={lang}>
                        {LanguageRegistry[lang]?.displayName || lang}
                      </option>
                    ))}
                  </select>
                );
              })()}
          </div>

          <div className="flex items-center space-x-1.5 lg:space-x-2 shrink-0">
            <button
              onClick={handleResetStarterCode}
              title="Reset boilerplate"
              className="p-1.5 rounded bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors hidden sm:block"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { handleRunCode(); if(window.innerWidth < 1024) setMobileTab('results'); }}
              disabled={isRunning || isSubmitting}
              className="flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-200 text-xs font-medium transition-colors border border-slate-800 disabled:opacity-50"
            >
              {isRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />}
              <span className="hidden xs:inline">Run</span>
            </button>
            <button
              onClick={() => { handleSubmitCode(); if(window.innerWidth < 1024) setMobileTab('results'); }}
              disabled={isRunning || isSubmitting}
              className="flex items-center justify-center space-x-1.5 px-3 lg:px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-lg shadow-emerald-950/30 disabled:opacity-50"
            >
              {isSubmitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5 text-white" />}
              <span>Submit</span>
            </button>
          </div>
        </div>

        {/* IDE Layout: scroll-synced Gutter and Textarea */}
        <div className="flex-1 relative bg-slate-950 font-mono text-xs flex min-h-0">
          {/* Gutter Gutter */}
          <div
            ref={gutterRef}
            className="w-10 min-h-0 bg-slate-950 border-r border-slate-850 select-none text-slate-600 text-right pr-2.5 py-4 pb-12 font-mono text-[11px] overflow-hidden"
          >
            {lineNumbers.map((num) => (
              <div key={num} className="h-[20px] leading-[20px]">
                {num}
              </div>
            ))}
          </div>

          {/* Text Editor Area */}
          <textarea
            ref={textareaRef}
            value={sourceCode}
            onChange={handleSourceCodeChange}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            style={{ lineHeight: '20px' }}
            className="flex-1 min-h-0 p-4 pb-12 bg-transparent text-slate-100 font-mono text-[11px] resize-none focus:outline-none border-none overflow-y-auto whitespace-pre"
            placeholder="// Write your solution here..."
          />
        </div>
        </div>

        {/* CONSOLE & OUTPUT PANELS (Hidden on mobile if 'code' tab is active) */}
        <div className={`${mobileTab === 'code' ? 'hidden lg:flex' : 'flex'} flex-col border-t border-slate-800 bg-slate-950 shrink-0 h-full lg:h-[280px] overflow-hidden`}>
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800/60 shrink-0">
            <div className="flex items-center space-x-3 text-xs">
              <button
                onClick={() => setActiveTab('results')}
                className={`py-1 px-2.5 rounded font-semibold transition-all ${
                  activeTab === 'results' ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Test Results
              </button>
              <button
                onClick={() => setActiveTab('custom')}
                className={`py-1 px-2.5 rounded font-semibold transition-all ${
                  activeTab === 'custom' ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Custom Input
              </button>
            </div>
            {executionResult && (
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  executionResult.status === 'PASSED'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-rose-500/20 text-rose-400'
                }`}
              >
                {executionResult.status} ({executionResult.passedTests}/{executionResult.totalTests} passed)
              </span>
            )}
          </div>

          <div className="p-3 flex-1 min-h-0 overflow-y-auto space-y-2 text-xs">
            {activeTab === 'custom' && (
              <div className="space-y-2 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-slate-400 text-[11px] font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useCustomInput}
                      onChange={(e) => setUseCustomInput(e.target.checked)}
                      className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0"
                    />
                    <span>Enable Custom Input stream</span>
                  </label>
                </div>
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  disabled={!useCustomInput}
                  placeholder="Provide test input lines here..."
                  className="flex-1 w-full p-2 bg-slate-900 border border-slate-800 rounded font-mono text-[11px] text-slate-300 focus:outline-none resize-none disabled:opacity-40"
                />
              </div>
            )}

            {activeTab === 'results' && (
              <div className="h-full">
                {isRunning && (
                  <div className="flex items-center space-x-2 text-slate-400 py-4 justify-center">
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>Executing test cases inside isolated sandbox...</span>
                  </div>
                )}

                {executionResult && !isRunning && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-slate-400">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          <span>{executionResult.runtimeMs} ms</span>
                        </div>
                        <div className="flex items-center space-x-1 text-slate-400">
                          <Cpu className="w-3.5 h-3.5 text-slate-500" />
                          <span>{Math.round(executionResult.memoryKb / 1024)} MB</span>
                        </div>
                      </div>
                      <span className="font-semibold text-slate-200">
                        Score: {executionResult.scorePercentage}%
                      </span>
                    </div>

                    {executionResult.errorMessage && (
                      <div className="p-2.5 rounded bg-rose-950/40 border border-rose-800/50 text-rose-300">
                        <div className="flex items-center space-x-1.5 font-bold mb-1">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                          <span>Error Details</span>
                        </div>
                        <pre className="font-mono text-[11px] whitespace-pre-wrap">{executionResult.errorMessage}</pre>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      {executionResult.testCaseResults.map((tc, idx) => (
                        <div
                          key={tc.testCaseId || idx}
                          className={`p-2 rounded border flex flex-col text-xs ${
                            tc.passed
                              ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                              : 'bg-rose-950/20 border-rose-800/40 text-rose-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              {tc.passed ? (
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              ) : (
                                <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                              )}
                              <span className="font-medium">
                                {tc.isHidden ? `Hidden Test Case #${idx + 1}` : `Sample Test Case #${idx + 1}`}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono opacity-80">
                              {tc.runtimeMs}ms | {tc.status}
                            </span>
                          </div>
                          {!tc.isHidden && !tc.passed && (
                            <div className="bg-slate-950 p-2 rounded text-[10px] font-mono mt-1 space-y-1 text-slate-400 border border-slate-900">
                              <div><strong>Input:</strong> {tc.input}</div>
                              <div><strong>Expected Output:</strong> {tc.expectedOutput}</div>
                              <div><strong>Your Output:</strong> {tc.actualOutput}</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!executionResult && !isRunning && (
                  <div className="text-slate-500 py-6 text-center">
                    Click <span className="text-slate-400 font-semibold">Run Code</span> to test sample cases or <span className="text-slate-400 font-semibold">Submit Solution</span> for full evaluation.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

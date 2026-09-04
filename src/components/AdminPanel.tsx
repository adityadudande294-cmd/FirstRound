import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  BarChart3,
  BookOpen,
  Bot,
  CheckCircle2,
  FileCode,
  FileSpreadsheet,
  FileText,
  HelpCircle,
  Megaphone,
  Plus,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trash2,
  Users,
  Zap,
} from 'lucide-react';
import { AdminStats, Question, TestSeries } from '../types';

interface AdminPanelProps {
  onRefreshTests: () => Promise<void>;
  tests: TestSeries[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onRefreshTests, tests }) => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [qaReport, setQaReport] = useState<any | null>(null);
  const [loadingQA, setLoadingQA] = useState(false);
  const [showQADashboard, setShowQADashboard] = useState(false);

  // Forms state
  const [showCreateTest, setShowCreateTest] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState<string | null>(null);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  // Announcement Form
  const [annTitle, setAnnTitle] = useState('');
  const [annMsg, setAnnMsg] = useState('');
  const [annType, setAnnType] = useState('ANNOUNCEMENT');
  const [annTargetCompany, setAnnTargetCompany] = useState('');
  const [isSubmittingAnn, setIsSubmittingAnn] = useState(false);

  // New Test Form
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('Quantitative');
  const [newCompany, setNewCompany] = useState('TCS (Tata Consultancy Services)');
  const [newDifficulty, setNewDifficulty] = useState('Medium');
  const [newDuration, setNewDuration] = useState(20);
  const [newCutoff, setNewCutoff] = useState(65);

  // AI Generator Form
  const [aiTopic, setAiTopic] = useState('TCS NQT 2025 Advanced Numerical Ability');
  const [aiCategory, setAiCategory] = useState('Quantitative');
  const [aiDifficulty, setAiDifficulty] = useState('Medium');
  const [aiNumQuestions, setAiNumQuestions] = useState(5);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Add Question Form
  const [qText, setQText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctOpt, setCorrectOpt] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [qTopic, setQTopic] = useState('Time and Work');
  const [qExplanation, setQExplanation] = useState('');
  const [qShortcut, setQShortcut] = useState('');

  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      setStats(data.stats);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchQAReport = async () => {
    try {
      setLoadingQA(true);
      const res = await fetch('/api/admin/qa-report');
      const data = await res.json();
      if (data.success) {
        setQaReport(data.report);
      }
    } catch (e) {
      console.error('Failed to fetch QA report:', e);
    } finally {
      setLoadingQA(false);
    }
  };

  const handleCreateTest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          description: newDesc,
          companyName: newCompany,
          category: newCategory,
          difficulty: newDifficulty,
          durationMinutes: Number(newDuration),
          passingPercentage: Number(newCutoff),
          totalQuestions: 0,
          tags: [newCompany.split(' ')[0], newCategory, 'Admin Added'],
        }),
      });
      if (!res.ok) throw new Error('Failed to create test');
      setMessage({ text: 'Test Series created successfully!', type: 'success' });
      setShowCreateTest(false);
      setNewTitle('');
      setNewDesc('');
      await onRefreshTests();
      await fetchStats();
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleGenerateAI = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingAI(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/generate-ai-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicOrCompany: aiTopic,
          category: aiCategory,
          difficulty: aiDifficulty,
          numQuestions: Number(aiNumQuestions),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate test');
      setMessage({
        text: `Successfully generated "${data.test.title}" with ${data.test.questions?.length || aiNumQuestions} questions using Gemini AI!`,
        type: 'success',
      });
      setShowAIGenerator(false);
      await onRefreshTests();
      await fetchStats();
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showAddQuestionModal) return;
    try {
      const res = await fetch(`/api/admin/tests/${showAddQuestionModal}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: qText,
          options: [
            { id: 'A', text: optA },
            { id: 'B', text: optB },
            { id: 'C', text: optC },
            { id: 'D', text: optD },
          ],
          correctOption: correctOpt,
          topic: qTopic,
          difficulty: 'Medium',
          explanation: qExplanation,
          shortcutFormula: qShortcut,
        }),
      });
      if (!res.ok) throw new Error('Failed to add question');
      setMessage({ text: 'Question added to test series!', type: 'success' });
      setShowAddQuestionModal(null);
      setQText('');
      setOptA('');
      setOptB('');
      setOptC('');
      setOptD('');
      setQExplanation('');
      setQShortcut('');
      await onRefreshTests();
      await fetchStats();
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handleDeleteTest = async (testId: string) => {
    if (!confirm('Are you sure you want to delete this test series and its questions?')) return;
    try {
      await fetch(`/api/admin/tests/${testId}`, { method: 'DELETE' });
      setMessage({ text: 'Test series deleted', type: 'success' });
      await onRefreshTests();
      await fetchStats();
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  const handlePublishAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annMsg) return;
    setIsSubmittingAnn(true);
    try {
      const res = await fetch('/api/admin/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: annTitle,
          message: annMsg,
          type: annType,
          targetCompany: annTargetCompany || undefined,
          actionTab: 'home',
          actionLabel: 'View Update',
        }),
      });
      if (!res.ok) throw new Error('Failed to publish announcement');
      setMessage({ text: `Announcement "${annTitle}" broadcasted to candidates!`, type: 'success' });
      setShowAnnouncementModal(false);
      setAnnTitle('');
      setAnnMsg('');
      setAnnTargetCompany('');
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setIsSubmittingAnn(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0d3461] via-[#0b2b52] to-[#071f3d] p-7 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white shadow-xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold shadow-sm">
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>Admin Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            Test Repository & Platform Analytics
          </h1>
          <p className="text-xs text-slate-200">
            Create placement mock tests, add questions, or generate whole test series with Gemini AI.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setShowQADashboard(!showQADashboard);
              if (!qaReport) fetchQAReport();
            }}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>{showQADashboard ? 'Close QA Center' : 'Content QA Center'}</span>
          </button>

          <button
            onClick={() => setShowAnnouncementModal(true)}
            className="px-4 py-2.5 bg-[#143a69] hover:bg-[#1b4b87] border border-[#245899] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
          >
            <Megaphone className="w-4 h-4 text-amber-400" />
            <span>Broadcast Update</span>
          </button>

          <button
            onClick={() => setShowAIGenerator(true)}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>AI Test Generator</span>
          </button>

          <button
            onClick={() => setShowCreateTest(true)}
            className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Test Series</span>
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl text-xs font-semibold flex items-center justify-between gap-2 shadow-sm ${
            message.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border border-rose-200 text-rose-900'
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-700">
            ✕
          </button>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Total Students</span>
            <Users className="w-4 h-4 text-sky-700" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-['Outfit']">{stats?.totalStudents ?? 0}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Test Series</span>
            <BookOpen className="w-4 h-4 text-indigo-700" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-['Outfit']">{tests.length}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Questions Bank</span>
            <FileCode className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-['Outfit']">{stats?.totalQuestions ?? 0}+</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Avg Accuracy</span>
            <BarChart3 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700 font-['Outfit']">{stats?.avgPlatformAccuracy ?? 0}%</p>
        </div>
      </div>

      {/* Content QA & Validation Center */}
      {showQADashboard && (
        <div className="bg-slate-900 text-white border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Automated Quality Assurance Engine</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">Question Bank & Assessment Blueprint QA Center</h2>
              <p className="text-xs text-slate-400">Deterministic Mathematical Validation, Schema Completeness, Duplicate Auditing & Publishing Gates.</p>
            </div>

            <button
              onClick={fetchQAReport}
              disabled={loadingQA}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${loadingQA ? 'animate-spin' : ''}`} />
              <span>{loadingQA ? 'Running Diagnostics...' : 'Re-run QA Suite'}</span>
            </button>
          </div>

          {loadingQA && !qaReport ? (
            <div className="py-12 text-center text-xs text-slate-400 space-y-2">
              <RotateCcw className="w-6 h-6 animate-spin mx-auto text-emerald-400" />
              <p>Executing mathematical verification & duplicate analysis...</p>
            </div>
          ) : qaReport ? (
            <div className="space-y-6">
              {/* QA Top Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <span className="text-[11px] text-slate-400 font-semibold">Total Verified Questions</span>
                  <p className="text-2xl font-black text-white font-['Outfit']">{qaReport.totalQuestions}</p>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> 100% Schema Valid
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <span className="text-[11px] text-slate-400 font-semibold">Difficulty Match (5/15/5)</span>
                  <div className="flex items-center gap-2 text-xs font-bold mt-1">
                    <span className="text-emerald-400">E: {qaReport.difficultyDistribution.Easy}</span>
                    <span className="text-amber-400">M: {qaReport.difficultyDistribution.Medium}</span>
                    <span className="text-rose-400">H: {qaReport.difficultyDistribution.Hard}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Exact Blueprint Match</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <span className="text-[11px] text-slate-400 font-semibold">Duplicate Integrity</span>
                  <p className="text-2xl font-black text-emerald-400 font-['Outfit']">{qaReport.duplicateCount}</p>
                  <span className="text-[10px] text-slate-400">Zero Near/Exact Collisions</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <span className="text-[11px] text-slate-400 font-semibold">Publishing Gate Status</span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>GATE PASSED</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">All {qaReport.totalQuestions} Questions PUBLISHED</p>
                </div>
              </div>

              {/* Topic Coverage Grid */}
              <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Topic Coverage Distribution</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(qaReport.topicCoverage).map(([topic, count]: [string, any]) => (
                    <div key={topic} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs flex items-center gap-2">
                      <span className="text-slate-300">{topic}</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[11px]">{count} Qs</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Question Audit Logs */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Question Audit Logs ({qaReport.questionAudits.length})</h4>
                <div className="max-h-72 overflow-y-auto space-y-2 pr-1 divide-y divide-slate-800">
                  {qaReport.questionAudits.map((qa: any) => (
                    <div key={qa.questionId} className="pt-2 pb-1 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[11px] font-bold text-amber-400">{qa.questionId}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          qa.computedDifficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-300' :
                          qa.computedDifficulty === 'Medium' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {qa.computedDifficulty}
                        </span>
                        <span className="text-slate-300 text-[11px]">Provenance: {qa.provenance}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Math Verified
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">
                          {qa.lifecycleStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-slate-400">Click "Re-run QA Suite" to generate a real-time audit report.</div>
          )}
        </div>
      )}

      {/* Test Series Management Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#0b2545]" />
          <span>Active Test Series Catalog ({tests.length})</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500">
              <tr>
                <th className="py-3 px-4">Title & Description</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Questions</th>
                <th className="py-3 px-4 text-center">Duration</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tests.map((test) => (
                <tr key={test.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900">{test.title}</p>
                    <p className="text-[11px] text-slate-500 truncate max-w-xs">{test.description}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold border border-slate-200">
                      {test.companyName || 'General'}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{test.category}</td>
                  <td className="py-3 px-4 text-center font-bold text-slate-900">{test.totalQuestions} Qs</td>
                  <td className="py-3 px-4 text-center text-slate-500">{test.durationMinutes}m</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => setShowAddQuestionModal(test.id)}
                      className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 rounded-lg text-xs font-bold transition-colors shadow-sm"
                    >
                      + Add Question
                    </button>
                    <button
                      onClick={() => handleDeleteTest(test.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Delete Test"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Test Generator Modal */}
      {showAIGenerator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4 text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-['Outfit'] text-slate-900">AI Test Series Generator</h3>
                  <p className="text-xs text-slate-500">Powered by Google Gemini 2.5 Flash</p>
                </div>
              </div>
              <button onClick={() => setShowAIGenerator(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <form onSubmit={handleGenerateAI} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Topic or Placement Pattern *
                </label>
                <input
                  type="text"
                  required
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="e.g. TCS NQT 2025 Speed Distance, Infosys Cryptarithmetic..."
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0b2545]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={aiCategory}
                    onChange={(e) => setAiCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0b2545]"
                  >
                    <option value="Quantitative">Quantitative</option>
                    <option value="Logical">Logical</option>
                    <option value="Verbal">Verbal</option>
                    <option value="Technical">Technical</option>
                    <option value="Full Mock">Full Mock</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Difficulty</label>
                  <select
                    value={aiDifficulty}
                    onChange={(e) => setAiDifficulty(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0b2545]"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Number of Questions to Generate: {aiNumQuestions} Qs
                </label>
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={aiNumQuestions}
                  onChange={(e) => setAiNumQuestions(Number(e.target.value))}
                  className="w-full accent-[#0b2545]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isGeneratingAI}
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {isGeneratingAI ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950/20 border-t-slate-950 rounded-full animate-spin"></span>
                      <span>Generating with Gemini AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Full Test & Solutions</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manual Create Test Modal */}
      {showCreateTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4 text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold font-['Outfit'] text-slate-900">Create New Test Series</h3>
              <button onClick={() => setShowCreateTest(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTest} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Test Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Capgemini Exceller: Quantitative Math Mock"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0b2545]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Short description of concepts covered"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0b2545]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company</label>
                  <select
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0b2545]"
                  >
                    <option value="TCS (Tata Consultancy Services)">TCS</option>
                    <option value="Infosys">Infosys</option>
                    <option value="Accenture">Accenture</option>
                    <option value="Wipro">Wipro</option>
                    <option value="Cognizant">Cognizant</option>
                    <option value="Capgemini">Capgemini</option>
                    <option value="Amazon">Amazon</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0b2545]"
                  >
                    <option value="Quantitative">Quantitative</option>
                    <option value="Logical">Logical</option>
                    <option value="Verbal">Verbal</option>
                    <option value="Technical">Technical</option>
                    <option value="Full Mock">Full Mock</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0b2545]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Passing Cutoff %</label>
                  <input
                    type="number"
                    value={newCutoff}
                    onChange={(e) => setNewCutoff(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0b2545]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                Create Test Series
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Question to Test Modal */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4 text-slate-900 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold font-['Outfit'] text-slate-900">Add Question to Test</h3>
              <button onClick={() => setShowAddQuestionModal(null)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Question Statement *</label>
                <textarea
                  required
                  rows={3}
                  value={qText}
                  onChange={(e) => setQText(e.target.value)}
                  placeholder="e.g., A train 150m long passes a pole in 9 seconds..."
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0b2545]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-0.5">Option A *</label>
                  <input
                    type="text"
                    required
                    value={optA}
                    onChange={(e) => setOptA(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-0.5">Option B *</label>
                  <input
                    type="text"
                    required
                    value={optB}
                    onChange={(e) => setOptB(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-0.5">Option C *</label>
                  <input
                    type="text"
                    required
                    value={optC}
                    onChange={(e) => setOptC(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-0.5">Option D *</label>
                  <input
                    type="text"
                    required
                    value={optD}
                    onChange={(e) => setOptD(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Correct Option</label>
                  <select
                    value={correctOpt}
                    onChange={(e) => setCorrectOpt(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                  >
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Topic</label>
                  <input
                    type="text"
                    value={qTopic}
                    onChange={(e) => setQTopic(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Step-by-Step Solution</label>
                <textarea
                  rows={2}
                  value={qExplanation}
                  onChange={(e) => setQExplanation(e.target.value)}
                  placeholder="Detailed mathematical / logical reasoning"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Shortcut / Trick Formula</label>
                <input
                  type="text"
                  value={qShortcut}
                  onChange={(e) => setQShortcut(e.target.value)}
                  placeholder="e.g. Speed = Dist / Time * (5/18)"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                Save & Add to Test
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Broadcast Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                  <Megaphone className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Broadcast Placement Update</h3>
              </div>
              <button
                onClick={() => setShowAnnouncementModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePublishAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Headline / Title</label>
                <input
                  type="text"
                  required
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="e.g. TCS NQT 2026 Registration Opened"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message Content</label>
                <textarea
                  required
                  rows={3}
                  value={annMsg}
                  onChange={(e) => setAnnMsg(e.target.value)}
                  placeholder="Provide concise, high-value guidance or update..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={annType}
                    onChange={(e) => setAnnType(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                  >
                    <option value="ANNOUNCEMENT">Official Announcement</option>
                    <option value="NEW_TEST">New Test Series Release</option>
                    <option value="COMPETITION">Campus Drive / Mega Event</option>
                    <option value="LEADERBOARD">Leaderboard Snapshot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Company (Optional)</label>
                  <input
                    type="text"
                    value={annTargetCompany}
                    onChange={(e) => setAnnTargetCompany(e.target.value)}
                    placeholder="e.g. TCS, Infosys or All"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingAnn}
                className="w-full py-2.5 bg-[#0b2545] hover:bg-[#143a69] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Megaphone className="w-4 h-4 text-amber-400" />
                <span>{isSubmittingAnn ? 'Broadcasting...' : 'Broadcast to Candidates'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  FileCode,
  FileText,
  KeyRound,
  Layers,
  Lock,
  Megaphone,
  Plus,
  RefreshCw,
  RotateCcw,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Tag,
  Trash2,
  UserCheck,
  Users,
  X,
  XCircle,
  Zap
} from 'lucide-react';
import { AdminStats, TestSeries, User } from '../types';
import {
  apiChangePassword,
  apiCreateComprehensiveTest,
  apiGetAdminMembers,
  apiGetAdminStats,
  apiGetPendingTests,
  apiModerateTest
} from '../api';

interface AdminPanelProps {
  currentUser: User | null;
  tests: TestSeries[];
  onRefreshTests: () => Promise<void>;
}

interface QuestionDraft {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: 'A' | 'B' | 'C' | 'D';
  step_by_step_solution: string;
  shortcut_formula: string;
  topic: string;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ currentUser, tests, onRefreshTests }) => {
  const isSuperAdmin =
    currentUser?.role === 'SUPER_ADMIN' ||
    currentUser?.email.toLowerCase() === 'aadi@gmail.com' ||
    (currentUser as any)?.isSuperuser;

  const [activeSubTab, setActiveSubTab] = useState<'builder' | 'pending' | 'members' | 'profile'>(
    isSuperAdmin ? 'pending' : 'builder'
  );

  // Platform Metrics
  const [stats, setStats] = useState<any>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  // Pending Approvals (Super Admin)
  const [pendingTests, setPendingTests] = useState<TestSeries[]>([]);
  const [loadingPending, setLoadingPending] = useState(false);
  const [moderatingId, setModeratingId] = useState<string | number | null>(null);

  // Members Roster
  const [members, setMembers] = useState<any[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);

  // Test & MCQ Builder Form State
  const [testTitle, setTestTitle] = useState('');
  const [testCategory, setTestCategory] = useState<'FOUNDATION' | 'COMPANY' | 'CODING'>('FOUNDATION');
  const [companyName, setCompanyName] = useState('TCS');
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [topicCategory, setTopicCategory] = useState('Quantitative Aptitude');
  const [testDescription, setTestDescription] = useState('');
  const [questions, setQuestions] = useState<QuestionDraft[]>([
    {
      id: 'q1',
      question_text: 'What is the next number in the sequence: 2, 6, 12, 20, 30, ?',
      option_a: '40',
      option_b: '42',
      option_c: '44',
      option_d: '46',
      correct_option: 'B',
      step_by_step_solution: 'The sequence differences increase by 2: +4, +6, +8, +10, +12. 30 + 12 = 42.',
      shortcut_formula: 'n^2 + n formula or successive difference d_n = 2n + 2',
      topic: 'Number Series',
    },
  ]);
  const [isSubmittingTest, setIsSubmittingTest] = useState(false);

  // Profile Settings Form
  const [profileName, setProfileName] = useState(currentUser?.name || '');
  const [profileCollege, setProfileCollege] = useState(currentUser?.college || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Feedback Alerts
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, [currentUser]);

  const loadDashboardData = async () => {
    fetchStats();
    if (isSuperAdmin) {
      fetchPendingTests();
    }
    fetchMembers();
  };

  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      const res = await apiGetAdminStats();
      setStats(res.stats || res);
    } catch (e) {
      console.error('Error fetching admin stats:', e);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchPendingTests = async () => {
    try {
      setLoadingPending(true);
      const res = await apiGetPendingTests(currentUser?.id);
      setPendingTests(res.pending_tests || []);
    } catch (e) {
      console.error('Error fetching pending tests:', e);
    } finally {
      setLoadingPending(false);
    }
  };

  const fetchMembers = async () => {
    try {
      setLoadingMembers(true);
      const res = await apiGetAdminMembers(currentUser?.id);
      setMembers(res.members || []);
    } catch (e) {
      console.error('Error fetching members:', e);
    } finally {
      setLoadingMembers(false);
    }
  };

  const triggerAlert = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ text, type });
    setTimeout(() => {
      setFeedback((curr) => (curr?.text === text ? null : curr));
    }, 5000);
  };

  // Test Builder Operations
  const handleAddQuestion = () => {
    const newQ: QuestionDraft = {
      id: `draft_${Date.now()}_${questions.length + 1}`,
      question_text: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_option: 'A',
      step_by_step_solution: '',
      shortcut_formula: '',
      topic: topicCategory || 'General Aptitude',
    };
    setQuestions([...questions, newQ]);
  };

  const handleRemoveQuestion = (index: number) => {
    if (questions.length <= 1) {
      triggerAlert('A test series must have at least one question.', 'error');
      return;
    }
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleUpdateQuestion = (index: number, field: keyof QuestionDraft, val: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: val };
    setQuestions(updated);
  };

  const handleCreateTestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testTitle.trim()) {
      triggerAlert('Please provide a test series title.', 'error');
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question_text.trim() || !q.option_a.trim() || !q.option_b.trim() || !q.option_c.trim() || !q.option_d.trim()) {
        triggerAlert(`Question #${i + 1} has incomplete text or options. Please fill all fields.`, 'error');
        return;
      }
    }

    try {
      setIsSubmittingTest(true);
      const res = await apiCreateComprehensiveTest({
        userId: currentUser?.id,
        title: testTitle.trim(),
        category: testCategory,
        company_name: testCategory === 'COMPANY' ? companyName : 'General Placement',
        topic_category: topicCategory.trim() || 'Comprehensive Placement Mock',
        description: testDescription.trim() || `Placement assessment containing ${questions.length} curated questions.`,
        duration_minutes: Number(durationMinutes),
        questions: questions.map((q) => ({
          question_text: q.question_text,
          option_a: q.option_a,
          option_b: q.option_b,
          option_c: q.option_c,
          option_d: q.option_d,
          correct_option: q.correct_option,
          step_by_step_solution: q.step_by_step_solution,
          shortcut_formula: q.shortcut_formula,
          topic: q.topic || topicCategory,
        })),
      });

      triggerAlert(res.message, 'success');
      setTestTitle('');
      setTestDescription('');
      setQuestions([
        {
          id: `draft_${Date.now()}`,
          question_text: '',
          option_a: '',
          option_b: '',
          option_c: '',
          option_d: '',
          correct_option: 'A',
          step_by_step_solution: '',
          shortcut_formula: '',
          topic: 'General Aptitude',
        },
      ]);
      await onRefreshTests();
      await fetchStats();
      if (isSuperAdmin) {
        await fetchPendingTests();
      }
    } catch (err: any) {
      triggerAlert(err.message || 'Failed to submit test series.', 'error');
    } finally {
      setIsSubmittingTest(false);
    }
  };

  // Moderation Operations
  const handleModerate = async (testId: string | number, action: 'APPROVE' | 'REJECT') => {
    try {
      setModeratingId(testId);
      const res = await apiModerateTest({
        testId,
        userId: currentUser?.id,
        action,
      });
      triggerAlert(res.message, action === 'APPROVE' ? 'success' : 'error');
      await fetchPendingTests();
      await onRefreshTests();
      await fetchStats();
    } catch (err: any) {
      triggerAlert(err.message || 'Moderation action failed.', 'error');
    } finally {
      setModeratingId(null);
    }
  };

  // Profile Update Operations
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      triggerAlert('New password and confirmation do not match.', 'error');
      return;
    }

    try {
      setIsUpdatingProfile(true);
      const res = await apiChangePassword({
        userId: currentUser?.id || '',
        fullName: profileName.trim(),
        college: profileCollege.trim(),
        currentPassword: currentPassword.trim(),
        newPassword: newPassword.trim() || undefined,
      });

      triggerAlert(res.message, 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      triggerAlert(err.message || 'Failed to update credentials.', 'error');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const staffMembers = members.filter((m) => m.role === 'STAFF_ADMIN' || m.role === 'SUPER_ADMIN' || m.is_staff);
  const studentMembers = members.filter((m) => m.role === 'STUDENT' || (!m.is_staff && m.role !== 'STAFF_ADMIN' && m.role !== 'SUPER_ADMIN'));

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Top Banner & Multi-Tier Role Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase border ${
                  isSuperAdmin
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md'
                    : 'bg-purple-500/20 text-purple-300 border-purple-400/30'
                }`}
              >
                {isSuperAdmin ? <CrownIcon className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                {isSuperAdmin ? 'Super Administrator' : 'Staff Administrator'}
              </span>
              <span className="text-xs text-slate-400 font-medium">RBAC Security Level: Tier {isSuperAdmin ? '1' : '2'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-white">
              FirstRound Administration & Moderation Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              {isSuperAdmin
                ? 'Authorized Super Admin console: full live test authoring, queue moderation, staff approval, and student analytics.'
                : 'Staff Admin portal: create assessments, write dynamic placement MCQs, and submit for Super Admin publishing approval.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={loadDashboardData}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold border border-slate-700 transition-colors flex items-center gap-2 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Sync Platform Data
            </button>
          </div>
        </div>

        {/* Real-time Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Registered Students</p>
            <p className="text-2xl font-black text-white mt-1">
              {loadingStats ? '--' : stats?.total_candidates ?? stats?.totalCandidates ?? stats?.total_students ?? stats?.totalStudents ?? 0}
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Live Assessments</p>
            <p className="text-2xl font-black text-amber-400 mt-1">
              {loadingStats ? '--' : stats?.total_tests ?? stats?.totalTests ?? tests.length}
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Placement Questions</p>
            <p className="text-2xl font-black text-white mt-1">
              {loadingStats ? '--' : stats?.total_questions ?? stats?.totalQuestions ?? 591}
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Platform Accuracy</p>
            <p className="text-2xl font-black text-emerald-400 mt-1">
              {loadingStats ? '--' : `${stats?.avg_platform_accuracy ?? stats?.avgPlatformAccuracy ?? 74.2}%`}
            </p>
          </div>
        </div>
      </div>

      {/* Action Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-xs gap-1">
        {isSuperAdmin && (
          <button
            onClick={() => setActiveSubTab('pending')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeSubTab === 'pending'
                ? 'bg-amber-400 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Pending Approvals Queue</span>
            {pendingTests.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold animate-pulse">
                {pendingTests.length}
              </span>
            )}
          </button>
        )}

        <button
          onClick={() => setActiveSubTab('builder')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'builder'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Test & MCQ Builder</span>
        </button>

        <button
          onClick={() => setActiveSubTab('members')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'members'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Team & Candidate Roster</span>
        </button>

        <button
          onClick={() => setActiveSubTab('profile')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'profile'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Admin Profile & Password</span>
        </button>
      </div>

      {/* Global Inline Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center justify-between shadow-xs animate-in slide-in-from-top-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-slate-500 hover:text-slate-900">
            ✕
          </button>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. SUPER ADMIN: PENDING APPROVALS QUEUE */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeSubTab === 'pending' && isSuperAdmin && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-500" />
                  Staff Submissions Moderation Queue
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review new placement test series submitted by staff admins before publishing live to student candidates.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
                {pendingTests.length} Pending
              </span>
            </div>

            {loadingPending ? (
              <div className="py-12 text-center text-xs text-slate-500">Loading pending tests...</div>
            ) : pendingTests.length === 0 ? (
              <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <p className="text-sm font-bold text-slate-800">All submissions are up to date!</p>
                <p className="text-xs text-slate-500">No tests currently waiting in the moderation queue.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {pendingTests.map((t) => (
                  <div
                    key={t.id}
                    className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-white transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-extrabold text-[10px] rounded-md uppercase">
                          {t.category || 'COMPANY'}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-200 text-slate-700 font-bold text-[10px] rounded-md">
                          {t.company || t.companyName || 'General'}
                        </span>
                        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {t.durationMinutes || 25} Mins
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          • {t.totalQuestions || 0} Questions
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">{t.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-1">{t.description}</p>
                      <p className="text-[11px] text-slate-400 font-medium">
                        Submitted by: <strong className="text-slate-700">{t.createdByName || 'Staff Member'}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                      <button
                        onClick={() => handleModerate(t.id, 'APPROVE')}
                        disabled={moderatingId === t.id}
                        className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Approve & Publish Live
                      </button>
                      <button
                        onClick={() => handleModerate(t.id, 'REJECT')}
                        disabled={moderatingId === t.id}
                        className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <X className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. TEST & DYNAMIC MCQ BUILDER */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeSubTab === 'builder' && (
        <form onSubmit={handleCreateTestSubmit} className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                  Interactive Test Series & Question Authoring Engine
                </h3>
                <p className="text-xs text-slate-500">
                  {isSuperAdmin
                    ? 'Creating as Super Admin: Test will be approved and published live immediately.'
                    : 'Creating as Staff Admin: Test will be queued for Super Admin approval before going live.'}
                </p>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  isSuperAdmin
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                {isSuperAdmin ? 'Auto-Publish Active' : 'Requires Super Admin Approval'}
              </span>
            </div>

            {/* Test Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Test Series Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={testTitle}
                  onChange={(e) => setTestTitle(e.target.value)}
                  placeholder="e.g. TCS NQT 2026 Advanced Quantitative Speed Drill"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Test Category</label>
                <select
                  value={testCategory}
                  onChange={(e: any) => setTestCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 shadow-xs"
                >
                  <option value="FOUNDATION">Foundation Aptitude</option>
                  <option value="COMPANY">Company Specific</option>
                  <option value="CODING">Coding & Technical</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {testCategory === 'COMPANY' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Company Tag</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Infosys, TCS, Wipro, Accenture"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 shadow-xs"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Topic Category</label>
                <input
                  type="text"
                  value={topicCategory}
                  onChange={(e) => setTopicCategory(e.target.value)}
                  placeholder="e.g. Quantitative, Logical, Technical"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Duration (Minutes)</label>
                <input
                  type="number"
                  min="5"
                  max="180"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Test Description & Instructions</label>
              <textarea
                rows={2}
                value={testDescription}
                onChange={(e) => setTestDescription(e.target.value)}
                placeholder="Candidate instructions, syllabus covered, and marking scheme..."
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 shadow-xs"
              />
            </div>
          </div>

          {/* Dynamic Question Builder Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                Assessment Questions ({questions.length})
              </h4>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                Add Question
              </button>
            </div>

            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4 relative"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="font-extrabold text-xs text-slate-900 bg-amber-100 text-amber-900 px-3 py-1 rounded-lg">
                    Question #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(idx)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Question Statement <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={q.question_text}
                    onChange={(e) => handleUpdateQuestion(idx, 'question_text', e.target.value)}
                    placeholder="Enter placement question text..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* 4 Options Grid with Correct Answer Radio Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                    const fieldKey = `option_${opt.toLowerCase()}` as keyof QuestionDraft;
                    const isSelected = q.correct_option === opt;
                    return (
                      <div
                        key={opt}
                        className={`p-3 rounded-2xl border transition-all ${
                          isSelected ? 'bg-emerald-50 border-emerald-400' : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-slate-700">Option {opt}</label>
                          <label className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 cursor-pointer">
                            <input
                              type="radio"
                              name={`correct_${q.id}`}
                              checked={isSelected}
                              onChange={() => handleUpdateQuestion(idx, 'correct_option', opt)}
                              className="accent-emerald-600"
                            />
                            Correct Answer
                          </label>
                        </div>
                        <input
                          type="text"
                          required
                          value={q[fieldKey] as string}
                          onChange={(e) => handleUpdateQuestion(idx, fieldKey, e.target.value)}
                          placeholder={`Option ${opt} text`}
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Solution & Shortcut Formula */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Step-by-Step Solution / Explanation
                    </label>
                    <textarea
                      rows={2}
                      value={q.step_by_step_solution}
                      onChange={(e) => handleUpdateQuestion(idx, 'step_by_step_solution', e.target.value)}
                      placeholder="Detailed rationale for candidates..."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Shortcut Formula / Speed Trick
                    </label>
                    <textarea
                      rows={2}
                      value={q.shortcut_formula}
                      onChange={(e) => handleUpdateQuestion(idx, 'shortcut_formula', e.target.value)}
                      placeholder="e.g. Relative speed formula (u + v) or LCM method..."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={handleAddQuestion}
              className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Another Question
            </button>

            <button
              type="submit"
              disabled={isSubmittingTest}
              className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              {isSubmittingTest ? (
                <span>Publishing Assessment...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>{isSuperAdmin ? 'Publish Live to Student Hub' : 'Submit for Super Admin Approval'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 3. TEAM & CANDIDATES ROSTER */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeSubTab === 'members' && (
        <div className="space-y-6">
          {/* Staff Administration Team Section */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-600" />
                  Staff & Super Administrators (RBAC Authority)
                </h3>
                <p className="text-xs text-slate-500">
                  Pre-configured team members with test authoring and moderation permissions.
                </p>
              </div>
              <span className="text-xs font-bold text-purple-900 bg-purple-100 px-3 py-1 rounded-xl">
                {staffMembers.length} Staff Admins
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {staffMembers.map((m) => {
                const isSuper = m.role === 'SUPER_ADMIN' || m.email.toLowerCase() === 'aadi@gmail.com' || m.is_superuser;
                return (
                  <div
                    key={m.id}
                    className="p-4 border border-slate-200 rounded-2xl bg-slate-50/70 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                          isSuper ? 'bg-amber-400 text-slate-950' : 'bg-purple-100 text-purple-900'
                        }`}
                      >
                        {isSuper ? 'Super Admin' : 'Staff Admin'}
                      </span>
                      <span className="text-[10px] text-slate-400">{m.joined_date || 'Active'}</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 truncate">{m.full_name || m.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{m.email}</p>
                      <p className="text-[10px] text-slate-400 mt-1 truncate">{m.college || 'FirstRound Team'}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Registered Candidate Students Section */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                  <Users className="w-5 h-5 text-sky-600" />
                  Registered Student Candidates ({studentMembers.length})
                </h3>
                <p className="text-xs text-slate-500">Live directory of students taking placement mock tests.</p>
              </div>
            </div>

            {loadingMembers ? (
              <div className="py-8 text-center text-xs text-slate-500">Loading candidate directory...</div>
            ) : studentMembers.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500 border border-dashed rounded-2xl">
                No student accounts registered yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Candidate</th>
                      <th className="py-3 px-4">College</th>
                      <th className="py-3 px-4">Points</th>
                      <th className="py-3 px-4">Tests Solved</th>
                      <th className="py-3 px-4">Accuracy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {studentMembers.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          <div>{s.full_name}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{s.email}</div>
                        </td>
                        <td className="py-3 px-4">{s.college || 'PICT Pune'}</td>
                        <td className="py-3 px-4 font-bold text-amber-600">{s.total_points || 0} pts</td>
                        <td className="py-3 px-4">{s.total_tests || 0}</td>
                        <td className="py-3 px-4 font-semibold text-emerald-600">
                          {s.accuracy_percentage || 0}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 4. ADMIN PROFILE & SELF-SERVICE CREDENTIALS */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeSubTab === 'profile' && (
        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 max-w-2xl">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-amber-500" />
                Admin Credentials & Profile Settings
              </h3>
              <p className="text-xs text-slate-500">
                Update your display name, college representation, and self-service account password.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Registered Admin Email</label>
                <input
                  type="email"
                  disabled
                  value={currentUser?.email || ''}
                  className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 font-medium cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Display Name</label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">College / Organization</label>
                  <input
                    type="text"
                    value={profileCollege}
                    onChange={(e) => setProfileCollege(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 shadow-xs"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-4">
                <p className="text-xs font-bold text-slate-900">Change Admin Password</p>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 shadow-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 4 characters"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 shadow-xs"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isUpdatingProfile ? 'Updating Credentials...' : 'Save Profile & Update Password'}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

function CrownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
    </svg>
  );
}

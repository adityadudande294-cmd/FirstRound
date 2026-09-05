import {
  AdminStats,
  AIDoubtResponse,
  AppNotification,
  BookmarkedItem,
  CompanyInfo,
  LeaderboardEntry,
  MegaEvent,
  Question,
  QuestionResponse,
  TestAttempt,
  TestMode,
  TestSeries,
  User,
  WeakQuestionItem,
} from './types';

const API_BASE = '';

// Named API Client Functions
export async function apiLoginOrRegister(payload: {
  email: string;
  name?: string;
  college?: string;
  targetCompany?: string;
  targetRole?: string;
  role?: 'student' | 'admin';
}): Promise<User> {
  const res = await fetch(`${API_BASE}/api/auth/login-or-register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to authenticate');
  return data.user;
}

export async function apiGetUserProfile(userId?: string | null): Promise<{
  user: User | null;
  attempts: TestAttempt[];
  totalBookmarks: number;
  totalWeakQuestions: number;
}> {
  if (!userId) {
    return {
      user: null,
      attempts: [],
      totalBookmarks: 0,
      totalWeakQuestions: 0,
    };
  }
  try {
    const res = await fetch(`/api/auth/profile/${userId}`);
    if (res.status === 404) {
      return {
        user: null,
        attempts: [],
        totalBookmarks: 0,
        totalWeakQuestions: 0,
      };
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch user profile');
    return {
      user: {
        ...data.user,
        averageAccuracyPercentage: data.user.averageAccuracy,
      },
      attempts: data.attempts || [],
      totalBookmarks: data.totalBookmarks || 0,
      totalWeakQuestions: data.totalWeakQuestions || 0,
    };
  } catch {
    return {
      user: null,
      attempts: [],
      totalBookmarks: 0,
      totalWeakQuestions: 0,
    };
  }
}

export async function apiUpdateUserProfile(
  userId: string,
  data: Partial<User>
): Promise<{ user: User }> {
  const res = await fetch(`/api/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      userId,
      user_id: userId,
      full_name: (data as any).full_name || data.name,
      college: data.college,
    }),
  });
  const resData = await res.json();
  return {
    user: {
      ...resData.user,
      averageAccuracyPercentage: resData.user?.averageAccuracy ?? resData.user?.accuracy_percentage,
    },
  };
}

export async function apiGetCompanies(): Promise<{ companies: CompanyInfo[] }> {
  const res = await fetch('/api/companies');
  const data = await res.json();
  return { companies: data.companies || [] };
}

export async function apiGetTests(params?: {
  category?: string;
  companyId?: string;
  difficulty?: string;
  search?: string;
}): Promise<{ tests: TestSeries[] }> {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.companyId) query.append('companyId', params.companyId);
  if (params?.difficulty) query.append('difficulty', params.difficulty);
  if (params?.search) query.append('search', params.search);

  const res = await fetch(`/api/tests?${query.toString()}`);
  const data = await res.json();
  const rawTests: any[] = data.tests || [];
  const normalizedTests: TestSeries[] = rawTests.map((t) => ({
    ...t,
    topic: t.topic || t.topic_category || t.category || 'General',
    topics: Array.isArray(t.topics) ? t.topics : (t.topic || t.topic_category ? [t.topic || t.topic_category] : []),
    skills: Array.isArray(t.skills) ? t.skills : [],
    supportedRoles: Array.isArray(t.supportedRoles) ? t.supportedRoles : (Array.isArray(t.roles) ? t.roles : []),
    questions: Array.isArray(t.questions) ? t.questions : [],
  }));
  return { tests: normalizedTests };
}

/**
 * Returns ONLY the 15 catalogue blueprint tests (cat_ prefix).
 * Used exclusively by Explore Tests (TestHub) to show only the new architecture.
 * Does NOT affect Home recommendation data which continues to use apiGetTests().
 */
export async function apiGetCatalogue(): Promise<{ tests: TestSeries[] }> {
  const res = await fetch('/api/catalogue');
  const data = await res.json();
  const rawTests: any[] = data.tests || [];
  const normalizedTests: TestSeries[] = rawTests.map((t) => ({
    ...t,
    topic: t.topic || t.topic_category || t.category || 'General',
    topics: Array.isArray(t.topics) ? t.topics : (t.topic || t.topic_category ? [t.topic || t.topic_category] : []),
    skills: Array.isArray(t.skills) ? t.skills : [],
    supportedRoles: Array.isArray(t.supportedRoles) ? t.supportedRoles : (Array.isArray(t.roles) ? t.roles : []),
    questions: Array.isArray(t.questions) ? t.questions : [],
  }));
  return { tests: normalizedTests };
}

export async function apiLogin(payload: {
  email: string;
  password?: string;
}): Promise<{
  user: User;
  token?: string;
  role: string;
  redirect: 'admin' | 'home';
  message: string;
}> {
  const res = await fetch(`${API_BASE}/api/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed. Please verify credentials.');
  return data;
}

export async function apiRegister(payload: {
  email: string;
  password?: string;
  fullName?: string;
  name?: string;
  college?: string;
}): Promise<{
  user: User;
  token?: string;
  role: string;
  redirect: 'home';
  message: string;
}> {
  const res = await fetch(`${API_BASE}/api/auth/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
      full_name: payload.fullName || payload.name,
      college: payload.college,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration failed.');
  return data;
}

export async function apiChangePassword(payload: {
  userId: string;
  currentPassword?: string;
  newPassword?: string;
  fullName?: string;
  college?: string;
}): Promise<{ success: boolean; message: string; user: User }> {
  const res = await fetch('/api/auth/change-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update profile.');
  return data;
}

export async function apiGetTestById(id: string): Promise<{ test: TestSeries & { questions: Question[] } }> {
  const res = await fetch(`/api/tests/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch test');
  const testObj = data.test || data;
  return { test: testObj };
}

export async function apiSubmitAttempt(payload: {
  testId: string;
  testInstanceId?: string;
  userId: string;
  mode?: string;
  responses: QuestionResponse[];
  timeTakenSeconds: number;
}): Promise<{ attempt: TestAttempt }> {
  const res = await fetch(`/api/tests/${payload.testId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: payload.userId,
      testInstanceId: payload.testInstanceId,
      mode: payload.mode || 'exam',
      responses: payload.responses,
      timeTakenSeconds: payload.timeTakenSeconds,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to submit test');
  return data;
}

export async function apiCreateComprehensiveTest(payload: {
  userId?: string;
  title: string;
  category: string;
  company_name?: string;
  year?: string;
  topic_category?: string;
  description?: string;
  duration_minutes?: number;
  questions: Array<{
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: string;
    step_by_step_solution?: string;
    shortcut_formula?: string;
    topic?: string;
  }>;
}): Promise<{ success: boolean; message: string; test: TestSeries; approval_status: string }> {
  const res = await fetch('/api/admin/tests/create-comprehensive', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create test series.');
  return data;
}

export async function apiGetPendingTests(userId?: string): Promise<{
  success: boolean;
  pending_tests: TestSeries[];
  count: number;
}> {
  const url = userId ? `/api/admin/pending-tests?userId=${encodeURIComponent(userId)}` : '/api/admin/pending-tests';
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch pending tests.');
  return data;
}

export async function apiModerateTest(payload: {
  testId: string | number;
  userId?: string;
  action: 'APPROVE' | 'REJECT';
}): Promise<{ success: boolean; message: string; test: TestSeries }> {
  const res = await fetch(`/api/admin/tests/${payload.testId}/moderate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: payload.userId,
      action: payload.action,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Moderation action failed.');
  return data;
}

export async function apiGetAdminMembers(userId?: string): Promise<{ members: any[] }> {
  const url = userId ? `/api/admin/members?userId=${encodeURIComponent(userId)}` : '/api/admin/members';
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch member list.');
  return data;
}

export async function apiGetUserAttempts(userId?: string | null): Promise<{ attempts: TestAttempt[] }> {
  if (!userId) return { attempts: [] };
  const res = await fetch(`/api/attempts?userId=${userId}`);
  const data = await res.json();
  return { attempts: data.attempts || [] };
}

export async function apiGetLeaderboard(params?: {
  category?: string;
  company?: string;
}): Promise<{ leaderboard: LeaderboardEntry[] }> {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.company) query.append('company', params.company);

  const res = await fetch(`/api/leaderboard?${query.toString()}`);
  const data = await res.json();
  const rawList = data.leaderboard || [];
  const normalizedList: LeaderboardEntry[] = rawList.map((entry: any, index: number) => ({
    rank: entry.rank || index + 1,
    userId: entry.id || entry.userId || '',
    userName: entry.full_name || entry.userName || entry.name || 'Anonymous',
    userCollege: entry.college || entry.userCollege || 'Campus Candidate',
    targetCompany: entry.targetCompany || entry.target_company || 'Tier-1 IT',
    totalPoints: entry.total_points ?? entry.totalPoints ?? 0,
    totalTestsAttempted: entry.total_tests ?? entry.totalTestsAttempted ?? 0,
    totalCorrect: entry.total_correct ?? entry.totalCorrect ?? 0,
    averageAccuracy: entry.accuracy_percentage ?? entry.averageAccuracy ?? entry.accuracy ?? 0,
    avgSpeedSeconds: entry.avgSpeedSeconds ?? entry.avg_speed_seconds ?? (entry.total_time_taken_seconds && entry.total_questions_solved ? Math.round(entry.total_time_taken_seconds / entry.total_questions_solved) : 0),
  }));
  return { leaderboard: normalizedList };
}

export async function apiGetMegaEvents(): Promise<{ events: MegaEvent[] }> {
  const res = await fetch('/api/mega-events');
  const data = await res.json();
  return { events: data.megaEvents || data.mega_events || data.events || [] };
}

export async function apiToggleBookmark(
  userId: string,
  questionId: string
): Promise<{ bookmarked: boolean }> {
  const res = await fetch('/api/bookmarks/toggle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      user_id: userId,
      questionId,
      question_id: questionId,
    }),
  });
  const data = await res.json();
  return data;
}

export async function apiGetBookmarkedQuestions(
  userId?: string | null
): Promise<{ bookmarks: BookmarkedItem[] }> {
  if (!userId) return { bookmarks: [] };
  const res = await fetch(`/api/bookmarks?userId=${encodeURIComponent(userId)}&user_id=${encodeURIComponent(userId)}`);
  const data = await res.json();
  const rawList: any[] = data.bookmarks || [];
  const normalizedList: BookmarkedItem[] = rawList
    .filter(Boolean)
    .map((item) => {
      const q = item.question || item;
      return {
        ...item,
        questionId: item.questionId || item.question_id || q.id || '',
        question: {
          ...q,
          id: q.id || item.questionId || `bq_${Math.random()}`,
          questionText: q.questionText || q.question_text || '',
          topic: q.topic || q.topic_category || 'General Aptitude',
          difficulty: q.difficulty || 'Medium',
          options: Array.isArray(q.options) ? q.options : [],
          correctOption: q.correctOption || q.correct_option || 'A',
          explanation: q.explanation || q.step_by_step_solution || '',
        },
        addedAt: item.addedAt || item.created_at || new Date().toISOString(),
      };
    });
  return { bookmarks: normalizedList };
}

export async function apiGetWeakQuestions(
  userId?: string | null
): Promise<{ weakQuestions: WeakQuestionItem[] }> {
  if (!userId) return { weakQuestions: [] };
  const res = await fetch(`/api/revision-vault/weak-questions?userId=${encodeURIComponent(userId)}&user_id=${encodeURIComponent(userId)}`);
  const data = await res.json();
  const rawList: any[] = data.weakQuestions || data.weak_questions || [];
  const normalizedList: WeakQuestionItem[] = rawList
    .filter(Boolean)
    .map((item) => {
      const q = item.question || item;
      return {
        ...item,
        question: {
          ...q,
          id: q.id || item.id || `wq_${Math.random()}`,
          questionText: q.questionText || q.question_text || '',
          topic: q.topic || q.topic_category || 'General Aptitude',
          difficulty: q.difficulty || 'Medium',
          options: Array.isArray(q.options) ? q.options : [],
          correctOption: q.correctOption || q.correct_option || 'A',
          explanation: q.explanation || q.step_by_step_solution || '',
        },
        timesFailed: item.timesFailed || item.times_failed || 1,
        lastAttemptedAt: item.lastAttemptedAt || item.last_attempted_at || new Date().toISOString(),
      };
    });
  return { weakQuestions: normalizedList };
}

export async function apiAskAIDoubt(payload: {
  question: Question;
  userSelectedOption?: string | null;
  studentQuestion?: string;
}): Promise<AIDoubtResponse> {
  const res = await fetch('/api/ai/ask-doubt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch AI explanation');
  return data.explanation;
}

export async function apiGetAdminStats(userId?: string): Promise<{ stats: AdminStats }> {
  const effectiveUserId = userId || localStorage.getItem('firstround_uid') || '';
  const query = effectiveUserId ? `?userId=${encodeURIComponent(effectiveUserId)}&user_id=${encodeURIComponent(effectiveUserId)}` : '';
  const res = await fetch(`/api/admin/stats${query}`, {
    headers: effectiveUserId ? { 'X-User-Id': effectiveUserId } : {},
  });
  const data = await res.json();
  return { stats: data.stats || data };
}

export async function apiGetQAReport(): Promise<{ success: boolean; report: any }> {
  const res = await fetch('/api/admin/qa-report');
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch QA report');
  return data;
}

export async function apiGetNotifications(
  userId?: string | null
): Promise<{ notifications: AppNotification[]; unreadCount: number; readIds: string[] }> {
  const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
  const res = await fetch(`/api/notifications${query}`);
  const data = await res.json();
  return {
    notifications: data.notifications || [],
    unreadCount: data.unreadCount || 0,
    readIds: data.readIds || [],
  };
}

export async function apiMarkNotificationRead(
  userId: string,
  notificationId: string
): Promise<{ success: boolean; unreadCount: number }> {
  const res = await fetch(`/api/notifications/${notificationId}/read`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  const data = await res.json();
  return data;
}

export async function apiMarkAllNotificationsRead(
  userId: string
): Promise<{ success: boolean; unreadCount: number }> {
  const res = await fetch('/api/notifications/mark-all-read', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  const data = await res.json();
  return data;
}

export async function apiCreateAnnouncement(payload: {
  title: string;
  message: string;
  type?: string;
  targetCompany?: string;
  actionTab?: string;
  actionTestId?: string;
  actionLabel?: string;
}): Promise<{ success: boolean; notification: AppNotification }> {
  const res = await fetch('/api/admin/announcements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create announcement');
  return data;
}

// --- Phase 18E: Coding Execution API Client ---

export async function apiGetCodingLanguages(): Promise<Record<string, any>> {
  const res = await fetch('/api/coding/languages');
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch languages');
  return data.languages;
}

export async function apiRunCode(payload: {
  questionId: string;
  userId: string;
  language: string;
  sourceCode: string;
  customInput?: string;
}): Promise<any> {
  const res = await fetch('/api/coding/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to run code');
  return data.result;
}

export async function apiSubmitCode(payload: {
  questionId: string;
  userId: string;
  testSeriesId?: string;
  testAttemptId?: string;
  language: string;
  sourceCode: string;
}): Promise<any> {
  const res = await fetch('/api/coding/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to submit code');
  return data.result;
}

export async function apiGetCodingSubmissions(userId: string, questionId?: string): Promise<any[]> {
  const url = questionId
    ? `/api/coding/submissions?userId=${encodeURIComponent(userId)}&questionId=${encodeURIComponent(questionId)}`
    : `/api/coding/submissions?userId=${encodeURIComponent(userId)}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch coding submissions');
  return data.submissions;
}

export const apiGetTestHistory = async (userId: string) => {
  const res = await fetch(`/api/tests/history?userId=${userId}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch history');
  return data.history;
};

export const apiLogTestVisit = async (userId: string, testId: string, mode: string = 'exam') => {
  const res = await fetch('/api/tests/history/visit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, testId, mode })
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to log visit');
  return data;
};

export const apiLogTestStart = async (userId: string, testId: string, mode: string = 'exam') => {
  const res = await fetch('/api/tests/history/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, testId, mode })
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to log start');
  return data;
};

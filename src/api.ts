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

// Named API Client Functions
export async function apiLoginOrRegister(payload: {
  email: string;
  name?: string;
  college?: string;
  targetCompany?: string;
  targetRole?: string;
  role?: 'student' | 'admin';
}): Promise<User> {
  const res = await fetch('/api/auth/login-or-register', {
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
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  return {
    user: {
      ...resData.user,
      averageAccuracyPercentage: resData.user.averageAccuracy,
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
  return { tests: data.tests || [] };
}

/**
 * Returns ONLY the 15 catalogue blueprint tests (cat_ prefix).
 * Used exclusively by Explore Tests (TestHub) to show only the new architecture.
 * Does NOT affect Home recommendation data which continues to use apiGetTests().
 */
export async function apiGetCatalogue(): Promise<{ tests: TestSeries[] }> {
  const res = await fetch('/api/catalogue');
  const data = await res.json();
  return { tests: data.tests || [] };
}

export async function apiGetTestById(id: string): Promise<{ test: TestSeries & { questions: Question[] } }> {
  const res = await fetch(`/api/tests/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch test');
  return { test: data.test };
}

export async function apiSubmitAttempt(payload: {
  testId: string;
  testInstanceId?: string;
  userId: string;
  responses: QuestionResponse[];
  timeTakenSeconds: number;
}): Promise<{ attempt: TestAttempt }> {
  const res = await fetch(`/api/tests/${payload.testId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: payload.userId,
      testInstanceId: payload.testInstanceId,
      mode: 'exam',
      responses: payload.responses,
      timeTakenSeconds: payload.timeTakenSeconds,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to submit test');
  return { attempt: data.attempt };
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
  return { leaderboard: data.leaderboard || [] };
}

export async function apiGetMegaEvents(): Promise<{ events: MegaEvent[] }> {
  const res = await fetch('/api/mega-events');
  const data = await res.json();
  return { events: data.megaEvents || [] };
}

export async function apiToggleBookmark(
  userId: string,
  questionId: string
): Promise<{ bookmarked: boolean }> {
  const res = await fetch('/api/bookmarks/toggle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, questionId }),
  });
  const data = await res.json();
  return data;
}

export async function apiGetBookmarkedQuestions(
  userId?: string | null
): Promise<{ bookmarks: BookmarkedItem[] }> {
  if (!userId) return { bookmarks: [] };
  const res = await fetch(`/api/bookmarks?userId=${userId}`);
  const data = await res.json();
  return { bookmarks: data.bookmarks || [] };
}

export async function apiGetWeakQuestions(
  userId?: string | null
): Promise<{ weakQuestions: WeakQuestionItem[] }> {
  if (!userId) return { weakQuestions: [] };
  const res = await fetch(`/api/revision-vault/weak-questions?userId=${userId}`);
  const data = await res.json();
  return { weakQuestions: data.weakQuestions || [] };
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

export async function apiGetAdminStats(): Promise<{ stats: AdminStats }> {
  const res = await fetch('/api/admin/stats');
  const data = await res.json();
  return { stats: data.stats };
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

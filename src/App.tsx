import React, { useEffect, useState } from 'react';
import {
  apiAskAIDoubt,
  apiGetBookmarkedQuestions,
  apiGetCatalogue,
  apiGetCompanies,
  apiGetLeaderboard,
  apiGetMegaEvents,
  apiGetNotifications,
  apiGetTestById,
  apiGetTests,
  apiGetUserAttempts,
  apiGetUserProfile,
  apiGetWeakQuestions,
  apiMarkAllNotificationsRead,
  apiMarkNotificationRead,
  apiSubmitAttempt,
  apiToggleBookmark,
  apiUpdateUserProfile,
  apiLogTestVisit,
  apiLogTestStart,
} from './api';
import { ActiveTestEngine } from './components/ActiveTestEngine';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { DashboardHome } from './components/DashboardHome';
import { LandingPage } from './components/LandingPage';
import { LeaderboardView } from './components/LeaderboardView';
import { Navbar } from './components/Navbar';
import { RevisionVaultView } from './components/RevisionVaultView';
import { ScratchpadModal } from './components/ScratchpadModal';
import { TestHub } from './components/TestHub';
import { TestResultModal } from './components/TestResultModal';
import { UserProfileModal } from './components/UserProfileModal';
import {
  AIDoubtResponse,
  AppNotification,
  BookmarkedItem,
  CompanyInfo,
  LeaderboardEntry,
  MegaEvent,
  NavTab,
  Question,
  QuestionResponse,
  TestAttempt,
  TestMode,
  TestSeries,
  UserProfile,
  WeakQuestionItem,
} from './types';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [loading, setLoading] = useState(true);

  // User State
  const [userId, setUserId] = useState<string | null>(() => localStorage.getItem('firstround_uid') || null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Data Collections
  const [tests, setTests] = useState<TestSeries[]>([]);
  // catalogueTests: ONLY the 15 cat_ blueprints — used exclusively by Explore Tests (TestHub).
  // tests: full legacy + catalogue array — used by Home recommendations (unchanged).
  const [catalogueTests, setCatalogueTests] = useState<TestSeries[]>([]);
  const [companies, setCompanies] = useState<CompanyInfo[]>([]);
  const [events, setEvents] = useState<MegaEvent[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [weakQuestions, setWeakQuestions] = useState<WeakQuestionItem[]>([]);
  const [bookmarkedItems, setBookmarkedItems] = useState<BookmarkedItem[]>([]);
  const [userAttempts, setUserAttempts] = useState<TestAttempt[]>([]);

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState<number>(0);
  const [readNotificationIds, setReadNotificationIds] = useState<string[]>([]);

  // Active Test Taking Engine
  const [activeTest, setActiveTest] = useState<(TestSeries & { questions: Question[] }) | null>(null);
  const [activeTestMode, setActiveTestMode] = useState<TestMode>('exam');

  // Modals
  const [latestAttemptReport, setLatestAttemptReport] = useState<TestAttempt | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'register' | 'login'>('register');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);

  // Initial Load
  useEffect(() => {
    loadAllData();
  }, [userId]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [
        testsRes,
        catalogueRes,
        companiesRes,
        eventsRes,
        leaderboardRes,
        userRes,
        weakRes,
        bookmarksRes,
        attemptsRes,
        notifRes,
      ] = await Promise.all([
        apiGetTests(),
        apiGetCatalogue(),
        apiGetCompanies(),
        apiGetMegaEvents(),
        apiGetLeaderboard(),
        apiGetUserProfile(userId),
        apiGetWeakQuestions(userId),
        apiGetBookmarkedQuestions(userId),
        apiGetUserAttempts(userId),
        apiGetNotifications(userId),
      ]);

      setTests(testsRes.tests || []);
      setCatalogueTests(catalogueRes.tests || []);
      setCompanies(companiesRes.companies || []);
      setEvents(eventsRes.events || []);
      setLeaderboard(leaderboardRes.leaderboard || []);
      if (userRes?.user) {
        setCurrentUser(userRes.user);
        if (userRes.user.id && userRes.user.id !== userId) {
          localStorage.setItem('firstround_uid', userRes.user.id);
          setUserId(userRes.user.id);
        }
      } else {
        setCurrentUser(null);
      }
      setWeakQuestions(weakRes.weakQuestions || []);
      setBookmarkedItems(bookmarksRes.bookmarks || []);
      setUserAttempts(attemptsRes.attempts || []);
      setNotifications(notifRes.notifications || []);
      setUnreadNotificationCount(notifRes.unreadCount ?? 0);
      setReadNotificationIds(notifRes.readIds || []);
    } catch (err) {
      console.error('Error loading placement data:', err);
    } finally {
      setLoading(false);
    }
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  const handleMarkNotificationRead = async (id: string) => {
    if (!userId) return;
    try {
      await apiMarkNotificationRead(userId, id);
      setReadNotificationIds((prev) => Array.from(new Set([...prev, id])));
      setUnreadNotificationCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark notification read:', err);
    }
  };

  const handleMarkAllNotificationsRead = async () => {
    if (!userId) return;
    try {
      await apiMarkAllNotificationsRead(userId);
      setReadNotificationIds((prev) =>
        Array.from(new Set([...prev, ...notifications.map((n) => n.id)]))
      );
      setUnreadNotificationCount(0);
    } catch (err) {
      console.error('Failed to mark all notifications read:', err);
    }
  };

  const handleNotificationClick = async (notif: AppNotification) => {
    if (userId && !readNotificationIds.includes(notif.id)) {
      handleMarkNotificationRead(notif.id);
    }

    const actionType = notif.actionType;
    const testId = notif.actionTestId || notif.actionTargetId;

    if (actionType === 'OPEN_TEST' || testId) {
      if (!testId) {
        showToast('This content is no longer available.');
        return;
      }
      const targetTest = tests.find((t) => t.id === testId);
      if (targetTest) {
        handleStartTest(targetTest, 'exam');
      } else {
        try {
          const res = await apiGetTestById(testId);
          if (res?.test) {
            handleStartTest(res.test, 'exam');
          } else {
            showToast('This content is no longer available.');
          }
        } catch {
          showToast('This content is no longer available.');
        }
      }
      return;
    }

    if (actionType === 'OPEN_LEADERBOARD' || notif.actionTab === 'leaderboard') {
      setActiveTab('leaderboard');
      return;
    }

    if (actionType === 'OPEN_REVISION' || notif.actionTab === 'vault') {
      setActiveTab('vault');
      return;
    }

    if (actionType === 'OPEN_PROFILE') {
      setIsProfileModalOpen(true);
      return;
    }

    if (actionType === 'OPEN_ANNOUNCEMENT' || notif.actionTab === 'home') {
      setActiveTab('home');
      return;
    }

    if (notif.actionTab === 'tests') {
      setActiveTab('tests');
      return;
    }

    if (notif.actionTab === 'admin') {
      setActiveTab('admin');
      return;
    }

    if (notif.actionUrl) {
      if (notif.actionUrl.startsWith('/tests') || notif.actionUrl === 'tests') {
        setActiveTab('tests');
      } else if (notif.actionUrl.startsWith('/vault') || notif.actionUrl === 'vault') {
        setActiveTab('vault');
      } else if (notif.actionUrl.startsWith('/leaderboard') || notif.actionUrl === 'leaderboard') {
        setActiveTab('leaderboard');
      } else {
        setActiveTab('home');
      }
    }
  };

  const handleSwitchUser = (user: UserProfile) => {
    localStorage.setItem('firstround_uid', user.id);
    setUserId(user.id);
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    setActiveTab('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('firstround_uid');
    sessionStorage.removeItem('firstround_testhub_category');
    setUserId(null);
    setCurrentUser(null);
    setUserAttempts([]);
    setWeakQuestions([]);
    setBookmarkedItems([]);
    setIsAuthModalOpen(false);
    setActiveTab('home');
  };

  const handleStartTest = async (test: TestSeries, mode: TestMode = 'exam') => {
    if (!currentUser || !userId) {
      setAuthModalMode('register');
      setIsAuthModalOpen(true);
      return;
    }
    try {
      if (mode === 'practice') {
        localStorage.removeItem(`firstround_progress_${userId}_${test.id}_practice`);
        const codingPrefix = `coding_state:${userId}:${test.id || 'practice'}_practice:`;
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith(codingPrefix)) {
            localStorage.removeItem(key);
            i--;
          }
        }
      }
      apiLogTestVisit(userId, test.id, mode).catch(console.error);
      const data = await apiGetTestById(test.id);
      setActiveTest(data.test);
      setActiveTestMode(mode);
    } catch (err) {
      console.error('Failed to fetch test questions:', err);
    }
  };

  const handleStartCustomRevisionQuiz = (questions: Question[]) => {
    if (!currentUser || !userId) {
      setAuthModalMode('register');
      setIsAuthModalOpen(true);
      return;
    }
    const customTest: TestSeries & { questions: Question[] } = {
      id: `custom-revision-${Date.now()}`,
      title: 'Revision Vault Custom Mock Quiz',
      description: 'Handcrafted challenge from your previously incorrect and bookmarked questions.',
      category: 'Full Mock',
      difficulty: 'Medium',
      totalQuestions: questions.length,
      durationMinutes: Math.max(5, questions.length * 2),
      passingPercentage: 70,
      tags: ['Revision', 'Weak-Areas', 'Custom'],
      attemptsCount: 0,
      questions,
    };
    setActiveTest(customTest);
    setActiveTestMode('practice');
  };

  const handleSubmitTest = async (responses: QuestionResponse[], timeTakenSeconds: number) => {
    if (!activeTest || !userId) return;

    try {
      const testInstanceId = `instance_${activeTest.id}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const result = await apiSubmitAttempt({
        testId: activeTest.id,
        testInstanceId,
        userId,
        responses,
        timeTakenSeconds,
      });

      // Clear in-progress progress state from local storage on successful submit
      try {
        const storageKeySuffix = activeTestMode === 'practice' ? '_practice' : '';
        localStorage.removeItem(`firstround_progress_${userId}_${activeTest.id}${storageKeySuffix}`);
      } catch {}

      // Exit active test engine and open comprehensive report
      setActiveTest(null);
      setLatestAttemptReport(result.attempt);

      // Refresh user stats, leaderboard, and weak questions
      await loadAllData();
    } catch (err) {
      console.error('Error submitting test attempt:', err);
    }
  };

  const handleToggleBookmark = async (questionId: string): Promise<boolean> => {
    if (!currentUser || !userId) {
      setAuthModalMode('register');
      setIsAuthModalOpen(true);
      return false;
    }
    try {
      const res = await apiToggleBookmark(userId, questionId);
      const bookmarksRes = await apiGetBookmarkedQuestions(userId);
      setBookmarkedItems(bookmarksRes.bookmarks || []);
      return res.bookmarked;
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);
      return false;
    }
  };

  const handleAskAIDoubt = async (payload: {
    question: Question;
    userSelectedOption?: string | null;
    studentQuestion?: string;
  }): Promise<AIDoubtResponse> => {
    return await apiAskAIDoubt(payload);
  };

  const handleUpdateUser = async (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const res = await apiUpdateUserProfile(currentUser.id, data);
    setCurrentUser(res.user);
    const lbRes = await apiGetLeaderboard();
    setLeaderboard(lbRes.leaderboard || []);
  };

  // If in active test taking mode, render the proctored test engine full screen
  if (activeTest) {
    const bookmarkedSet = new Set(bookmarkedItems.map((b) => b.questionId));
    return (
      <ActiveTestEngine
        test={activeTest}
        mode={activeTestMode}
        userId={userId}
        onExit={() => setActiveTest(null)}
        onSubmit={handleSubmitTest}
        onToggleBookmark={handleToggleBookmark}
        initialBookmarkedIds={bookmarkedSet}
        onOpenScratchpad={() => setIsScratchpadOpen(true)}
      />
    );
  }

  // 1. Unauthenticated Visitor Flow: Render Public Landing Page
  if (!loading && (!currentUser || !userId)) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans'] antialiased no-scrollbar">
        <LandingPage
          onGetStarted={() => {
            setAuthModalMode('register');
            setIsAuthModalOpen(true);
          }}
          onLogin={() => {
            setAuthModalMode('login');
            setIsAuthModalOpen(true);
          }}
          tests={tests}
          companies={companies}
        />

        {/* Public Access Auth Modal */}
        {isAuthModalOpen && (
          <AuthModal
            onClose={() => setIsAuthModalOpen(false)}
            onSelectUser={handleSwitchUser}
            onSuccess={handleSwitchUser}
            currentUserId={currentUser?.id}
            initialMode={authModalMode}
          />
        )}
      </div>
    );
  }

  // 2. Authenticated Candidate Flow: Render Main Placement Application
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans'] antialiased selection:bg-amber-300 selection:text-slate-900">
      {/* Top Main Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentUser={currentUser}
        onOpenAuthModal={() => {
          setAuthModalMode('login');
          setIsAuthModalOpen(true);
        }}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenScratchpad={() => setIsScratchpadOpen(true)}
        onLogout={handleLogout}
        notifications={notifications}
        unreadNotificationCount={unreadNotificationCount}
        readNotificationIds={readNotificationIds}
        onMarkNotificationRead={handleMarkNotificationRead}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        onNotificationClick={handleNotificationClick}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-10 h-10 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin mx-auto"></div>
            <p className="text-sm font-semibold text-slate-600">
              Calibrating FirstRound Aptitude Question Bank...
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'home' && (
              <DashboardHome
                currentUser={currentUser}
                tests={catalogueTests}
                weakQuestions={weakQuestions}
                bookmarkedItems={bookmarkedItems}
                userAttempts={userAttempts}
                leaderboard={leaderboard}
                onStartTest={handleStartTest}
                onNavigateTab={setActiveTab}
                onOpenScratchpad={() => setIsScratchpadOpen(true)}
                onOpenProfile={() => setIsProfileModalOpen(true)}
                onViewAttemptReport={(attempt) => setLatestAttemptReport(attempt)}
              />
            )}

            {activeTab === 'tests' && (
              <TestHub
                tests={catalogueTests}
                companies={companies}
                currentUser={currentUser}
                userAttempts={userAttempts}
                weakQuestions={weakQuestions}
                onStartTest={handleStartTest}
                onNavigateTab={setActiveTab}
              />
            )}

            {activeTab === 'vault' && (
              <RevisionVaultView
                weakQuestions={weakQuestions}
                bookmarkedItems={bookmarkedItems}
                onRemoveBookmark={handleToggleBookmark}
                onStartCustomQuiz={handleStartCustomRevisionQuiz}
                onAskAI={handleAskAIDoubt}
              />
            )}

            {activeTab === 'leaderboard' && (
              <LeaderboardView leaderboard={leaderboard} currentUserId={currentUser?.id} />
            )}

            {activeTab === 'admin' && (
              <AdminPanel
                tests={tests}
                onRefreshTests={async () => {
                  const res = await apiGetTests();
                  setTests(res.tests || []);
                }}
              />
            )}
          </>
        )}
      </main>

      {/* Auth & Candidate Switcher Modal */}
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onSelectUser={handleSwitchUser}
          onSuccess={handleSwitchUser}
          currentUserId={currentUser?.id}
          initialMode={authModalMode}
        />
      )}

      {/* Candidate Profile Modal */}
      {isProfileModalOpen && currentUser && (
        <UserProfileModal
          user={currentUser}
          attempts={userAttempts}
          onClose={() => setIsProfileModalOpen(false)}
          onUpdateUser={handleUpdateUser}
          onViewAttemptReport={(attempt) => {
            setIsProfileModalOpen(false);
            setLatestAttemptReport(attempt);
          }}
        />
      )}

      {/* Floating Placement Toolkit Modal */}
      {isScratchpadOpen && (
        <ScratchpadModal
          userId={currentUser?.id || userId}
          onClose={() => setIsScratchpadOpen(false)}
        />
      )}

      {/* Comprehensive Test Result Modal */}
      {latestAttemptReport && (
        <TestResultModal
          attempt={latestAttemptReport}
          onClose={() => setLatestAttemptReport(null)}
          onRetake={async () => {
            const currentAttempt = latestAttemptReport;
            setLatestAttemptReport(null);
            const foundTest = tests.find((t) => t.id === currentAttempt.testId);
            if (foundTest) {
              await handleStartTest(foundTest, 'exam');
            }
          }}
          onAskAI={handleAskAIDoubt}
        />
      )}
      {/* Toast Feedback Alert */}
      {toastMessage && (
        <div
          id="app-toast-alert"
          className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white text-xs ml-2"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

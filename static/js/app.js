/**
 * FirstRound - Corporate Campus Placement Aptitude & Competition Portal
 * Interactive Frontend Controller & Mandatory Auth Gateway
 */

// State Store
const state = {
  currentUser: JSON.parse(localStorage.getItem('firstround_user') || 'null'),
  authToken: localStorage.getItem('firstround_token') || null,
  currentView: 'home', // home, leaderboard, test-engine, diagnostic, admin
  authGateMode: 'signin', // 'signin' or 'register'
  tests: [],
  companies: [],
  topics: [],
  activeFilter: 'ALL',
  searchQuery: '',
  
  // Test Execution State
  selectedTestForSetup: null,
  testMode: 'EXAM', // 'PRACTICE' or 'EXAM'
  practiceTimerSeconds: 0, // 0 = No Timer, 60 = 1m, 120 = 2m, 180 = 3m
  activeTest: null,
  currentQuestionIndex: 0,
  userResponses: {}, // { [questionId]: { selected_option: 'A', time_spent: 12, is_review: false } }
  practiceRevealed: {}, // { [questionId]: true }
  examTimerInterval: null,
  examSecondsRemaining: 0,
  totalExamSeconds: 0,
  questionTimerInterval: null,
  questionSecondsRemaining: 0,
  questionTimerLimit: 0,
  testStartTime: null,
  questionStartTime: null,
  
  // Diagnostic State
  diagnosticReport: null,
  solutionFilter: 'ALL', // ALL, CORRECT, INCORRECT, UNANSWERED
  
  // Test Integrity & Anti-Cheating State
  tabSwitchCount: 0,
  integrityFlag: false,
  submissionReason: 'Normal Submission',

  // Leaderboard & Profiles
  leaderboard: [],
  currentUserRank: null,
  activeProfileModalUser: null,
  
  // Growth, Retention & Vault State
  userBookmarks: new Set(),
  vaultSubTab: 'starred', // 'starred' or 'weak'
  vaultQuestions: [],
  
  // Live Mega Drive Events
  megaEvents: [],
  activeMegaEventId: null,
  megaCountdownInterval: null,

  // Admin State
  adminStats: null,
  adminMembers: [],
  adminActiveTab: 'overview',
};

// API Client
const api = {
  async loginOrRegister(data) {
    const res = await fetch('/api/auth/login-or-register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async fetchTests(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/tests/?${query}`);
    return res.json();
  },

  async fetchTestDetail(testId) {
    const res = await fetch(`/api/tests/${testId}/`);
    return res.json();
  },

  async submitTest(testId, payload) {
    const res = await fetch(`/api/tests/${testId}/submit/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async fetchLeaderboard(userId = null) {
    const url = userId ? `/api/leaderboard/?user_id=${userId}` : '/api/leaderboard/';
    const res = await fetch(url);
    return res.json();
  },

  async fetchAdminStats(userId) {
    const res = await fetch(`/api/admin/stats/?user_id=${userId}`);
    return res.json();
  },

  async fetchAdminMembers(userId) {
    const res = await fetch(`/api/admin/members/?user_id=${userId}`);
    return res.json();
  },

  async createAdminTest(payload) {
    const res = await fetch('/api/admin/tests/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async deleteAdminTest(testId, userId) {
    const res = await fetch(`/api/admin/tests/${testId}/`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    });
    return res.json();
  },

  async addAdminQuestion(payload) {
    const res = await fetch('/api/admin/questions/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async fetchUserProfile(userId) {
    const res = await fetch(`/api/auth/profile/${userId}/`);
    return res.json();
  },

  async uploadBulkCSV(formData) {
    const res = await fetch('/api/admin/questions/bulk-csv/', {
      method: 'POST',
      body: formData
    });
    return res.json();
  },

  async generateTestFromFile(formData) {
    const res = await fetch('/api/admin/tests/generate-from-file/', {
      method: 'POST',
      body: formData
    });
    return res.json();
  },

  async toggleBookmark(userId, questionId) {
    const res = await fetch('/api/bookmarks/toggle/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, question_id: questionId })
    });
    return res.json();
  },

  async fetchBookmarks(userId) {
    const res = await fetch(`/api/bookmarks/?user_id=${userId}`);
    return res.json();
  },

  async fetchWeakQuestions(userId) {
    const res = await fetch(`/api/revision-vault/weak-questions/?user_id=${userId}`);
    return res.json();
  },

  async fetchMegaEvents() {
    const res = await fetch('/api/mega-events/');
    return res.json();
  },

  async createMegaEvent(payload) {
    const res = await fetch('/api/mega-events/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async fetchMegaEventLeaderboard(eventId) {
    const res = await fetch(`/api/mega-events/${eventId}/leaderboard/`);
    return res.json();
  }
};

// ==========================================
// SESSION PERSISTENCE & ANTI-CRASH ENGINE
// ==========================================
function saveActiveSession() {
  if (!state.activeTest || state.currentView !== 'test-engine') return;
  const sessionData = {
    testId: state.activeTest.id,
    testMode: state.testMode,
    practiceTimerSeconds: state.practiceTimerSeconds,
    currentQuestionIndex: state.currentQuestionIndex,
    userResponses: state.userResponses,
    practiceRevealed: state.practiceRevealed,
    examSecondsRemaining: state.examSecondsRemaining,
    totalExamSeconds: state.totalExamSeconds,
    testStartTime: state.testStartTime,
    tabSwitchCount: state.tabSwitchCount || 0,
    integrityFlag: state.integrityFlag || false,
    submissionReason: state.submissionReason || 'Normal Submission',
    savedAt: Date.now()
  };
  localStorage.setItem('firstround_active_session', JSON.stringify(sessionData));
}

function clearActiveSession() {
  localStorage.removeItem('firstround_active_session');
}

async function checkAndRestoreActiveSession() {
  const saved = localStorage.getItem('firstround_active_session');
  if (!saved) return;

  try {
    const session = JSON.parse(saved);
    if (!session || !session.testId) return;

    // Check if session is under 4 hours old
    if (Date.now() - session.savedAt > 4 * 60 * 60 * 1000) {
      clearActiveSession();
      return;
    }

    const fullTest = await api.fetchTestDetail(session.testId);
    if (!fullTest || !fullTest.questions || fullTest.questions.length === 0) {
      clearActiveSession();
      return;
    }

    state.activeTest = fullTest;
    state.testMode = session.testMode || 'EXAM';
    state.practiceTimerSeconds = session.practiceTimerSeconds || 0;
    state.currentQuestionIndex = session.currentQuestionIndex || 0;
    state.userResponses = session.userResponses || {};
    state.practiceRevealed = session.practiceRevealed || {};
    state.totalExamSeconds = session.totalExamSeconds || (fullTest.questions.length * 60);
    state.examSecondsRemaining = session.examSecondsRemaining || state.totalExamSeconds;
    state.testStartTime = session.testStartTime || Date.now();
    state.questionStartTime = Date.now();
    state.tabSwitchCount = session.tabSwitchCount || 0;
    state.integrityFlag = session.integrityFlag || false;
    state.submissionReason = session.submissionReason || 'Normal Submission';

    if (state.testMode === 'EXAM') {
      startExamTimer();
    } else {
      state.questionTimerLimit = state.practiceTimerSeconds;
      state.questionSecondsRemaining = state.practiceTimerSeconds;
      startPracticeQuestionTimer();
    }

    switchView('test-engine');
    renderQuestionEngine();

    const tabBadge = document.getElementById('engine-tab-switch-badge');
    if (tabBadge && state.testMode === 'EXAM' && state.tabSwitchCount > 0) {
      tabBadge.classList.remove('hidden');
      tabBadge.textContent = `⚠️ Tab Switch: ${state.tabSwitchCount}/2`;
    }

    showToast('Ongoing test session restored smoothly!', 'info');
  } catch (err) {
    console.error('Error restoring active session:', err);
    clearActiveSession();
  }
}

// UI Notification Toast
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const isErr = type === 'error';
  toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl border bg-white shadow-xl transition-all transform duration-300 translate-y-2 opacity-0 animate-fade-in ${
    isErr 
      ? 'border-[#EF4444] text-[#991B1B] shadow-red-100' 
      : 'border-[#10B981] text-[#065F46] shadow-emerald-100'
  }`;

  const icon = isErr
    ? `<svg class="w-5 h-5 text-[#EF4444] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    : `<svg class="w-5 h-5 text-[#10B981] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;

  toast.innerHTML = `
    ${icon}
    <span class="text-xs font-bold">${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', '-translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Mandatory Auth Gateway Controller
function checkAuthGate() {
  const authGate = document.getElementById('view-auth-gate');
  const mainApp = document.getElementById('main-app-container');

  if (!state.currentUser) {
    if (authGate) authGate.classList.remove('hidden');
    if (mainApp) mainApp.classList.add('hidden');
  } else {
    if (authGate) authGate.classList.add('hidden');
    if (mainApp) mainApp.classList.remove('hidden');
    updateAuthUI();
  }
}

function setAuthGateMode(mode) {
  state.authGateMode = mode;
  const tabSignIn = document.getElementById('gate-tab-signin');
  const tabRegister = document.getElementById('gate-tab-register');
  const fieldName = document.getElementById('gate-field-name');
  const fieldCollege = document.getElementById('gate-field-college');
  const submitBtn = document.getElementById('gate-submit-btn');

  if (mode === 'register') {
    tabRegister.className = 'py-2.5 rounded-xl transition-all bg-[#003057] text-white shadow-sm';
    tabSignIn.className = 'py-2.5 rounded-xl transition-all text-[#64748B] hover:text-[#003057]';
    fieldName.classList.remove('hidden');
    fieldCollege.classList.remove('hidden');
    submitBtn.innerHTML = `
      <span>Register & Enter Portal</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    `;
  } else {
    tabSignIn.className = 'py-2.5 rounded-xl transition-all bg-[#003057] text-white shadow-sm';
    tabRegister.className = 'py-2.5 rounded-xl transition-all text-[#64748B] hover:text-[#003057]';
    fieldName.classList.add('hidden');
    fieldCollege.classList.add('hidden');
    submitBtn.innerHTML = `
      <span>Sign In to Placement Portal</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    `;
  }
}

async function handleGateAuthSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value.trim();
  const password = form.password.value.trim();
  const full_name = form.full_name ? form.full_name.value.trim() : '';
  const college = form.college ? form.college.value.trim() : '';

  const submitBtn = document.getElementById('gate-submit-btn');
  const originalHTML = submitBtn ? submitBtn.innerHTML : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Connecting to Portal...</span>`;
  }

  try {
    const res = await api.loginOrRegister({ email, password, full_name, college });
    if (res.error) {
      showToast(res.error, 'error');
      return;
    }

    state.currentUser = res.user;
    state.authToken = res.token;
    localStorage.setItem('firstround_user', JSON.stringify(res.user));
    localStorage.setItem('firstround_token', res.token);

    checkAuthGate();
    showToast(res.message || 'Signed in successfully!', 'success');
    loadTestsCatalog().then(() => {
      loadMegaEvents();
    });
    loadLeaderboard();
    loadUserBookmarks();
  } catch (err) {
    console.error('Auth error:', err);
    showToast('Authentication failed. Please check your credentials.', 'error');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHTML;
    }
  }
}

function handleLogout() {
  localStorage.removeItem('firstround_user');
  localStorage.removeItem('firstround_token');
  state.currentUser = null;
  state.authToken = null;
  checkAuthGate();
  showToast('Signed out successfully.', 'info');
}

// Router & View Switcher
function switchView(viewName) {
  if (state.currentView === 'test-engine' && viewName !== 'test-engine' && viewName !== 'diagnostic') {
    if (!confirm('Are you sure you want to exit the current test? Your current progress will be lost.')) {
      return;
    }
    clearInterval(state.examTimerInterval);
    clearInterval(state.questionTimerInterval);
  }

  state.currentView = viewName;
  
  document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));

  const target = document.getElementById(`view-${viewName}`);
  if (target) {
    target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.dataset.view === viewName) {
      link.classList.add('text-[#FFC412]', 'border-b-2', 'border-[#FFC412]');
      link.classList.remove('text-[#CBD5E1]');
    } else {
      link.classList.remove('text-[#FFC412]', 'border-b-2', 'border-[#FFC412]');
      link.classList.add('text-[#CBD5E1]');
    }
  });

  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    if (btn.dataset.mobileView === viewName) {
      btn.classList.add('text-[#FFC412]');
      btn.classList.remove('text-[#CBD5E1]');
    } else {
      btn.classList.remove('text-[#FFC412]');
      btn.classList.add('text-[#CBD5E1]');
    }
  });

  if (viewName === 'leaderboard') {
    loadLeaderboard();
  } else if (viewName === 'admin') {
    const user = state.currentUser;
    const isAdmin = user && (user.is_staff || user.is_superuser || user.email === 'aadi@gmail.com');
    if (!isAdmin) {
      showToast('Unauthorized. Super Admin access required.', 'error');
      switchView('home');
      return;
    }
    loadAdminDashboard();
  } else if (viewName === 'vault') {
    loadRevisionVault();
  } else if (viewName === 'home') {
    renderTestsGrid();
    loadMegaEvents();
  }
}

function updateAuthUI() {
  const user = state.currentUser;
  const userNameEl = document.getElementById('header-user-name');
  const userPointsEl = document.getElementById('header-user-points');
  const adminNav = document.getElementById('nav-admin-link');
  const mobileAdminNav = document.getElementById('mobile-nav-admin');
  const stickyBanner = document.getElementById('sticky-leaderboard-banner');
  const bannerRank = document.getElementById('banner-user-rank');
  const bannerPoints = document.getElementById('banner-user-points');
  const bannerName = document.getElementById('banner-user-name');

  if (user) {
    if (userNameEl) userNameEl.textContent = user.full_name.split(' ')[0];
    if (userPointsEl) userPointsEl.textContent = `${user.total_points || 0} pts`;
    
    const isAdmin = user.is_staff || user.is_superuser || user.email === 'aadi@gmail.com';
    if (adminNav) {
      if (isAdmin) {
        adminNav.classList.remove('hidden');
        if (mobileAdminNav) mobileAdminNav.classList.remove('hidden');
      } else {
        adminNav.classList.add('hidden');
        if (mobileAdminNav) mobileAdminNav.classList.add('hidden');
      }
    }

    if (stickyBanner) {
      stickyBanner.classList.remove('hidden');
      if (bannerName) bannerName.textContent = user.full_name;
      if (bannerPoints) bannerPoints.textContent = `${user.total_points || 0} pts`;
      if (bannerRank) bannerRank.textContent = user.rank ? `#${user.rank}` : '#--';
    }
  }
}

// Tests Catalog Loader
async function loadTestsCatalog() {
  try {
    const data = await api.fetchTests();
    state.tests = data.tests || [];
    state.companies = data.available_companies || [];
    state.topics = data.available_topics || [];
    renderFilterButtons();
    renderTestsGrid();
  } catch (err) {
    console.error('Error loading tests:', err);
    showToast('Failed to load test series.', 'error');
  }
}

function renderFilterButtons() {
  const container = document.getElementById('test-filters-container');
  if (!container) return;

  const countAll = state.tests.length;
  const countCompany = state.tests.filter(t => t.test_type === 'COMPANY').length;
  const countTopic = state.tests.filter(t => t.test_type === 'TOPIC').length;
  const countOther = state.tests.filter(t => t.test_type === 'OTHER').length;

  const tabs = [
    { key: 'ALL', label: 'All Tests', count: countAll, icon: '⚡' },
    { key: 'COMPANY', label: 'Company Test Series (PYQs)', count: countCompany, icon: '🏢' },
    { key: 'TOPIC', label: 'Topic-Wise Tests', count: countTopic, icon: '📚' },
    { key: 'OTHER', label: 'Other Tests (Pattern Mocks)', count: countOther, icon: '🎯' }
  ];

  container.innerHTML = tabs.map(t => `
    <button 
      class="filter-btn px-4 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
        state.activeFilter === t.key
          ? 'bg-[#003057] text-[#FFC412] border-[#003057] shadow-md ring-2 ring-[#3781C2]/30'
          : 'bg-white text-[#64748B] border-[#CBD5E1] hover:border-[#3781C2] hover:text-[#003057]'
      }"
      onclick="setFilter('${t.key}')"
    >
      <span>${t.icon}</span>
      <span>${t.label}</span>
      <span class="px-2 py-0.5 rounded-full text-[10px] font-black ${
        state.activeFilter === t.key ? 'bg-[#FFC412] text-[#00223E]' : 'bg-[#F1F5F9] text-[#64748B]'
      }">
        ${t.count}
      </span>
    </button>
  `).join('');
}

function setFilter(key) {
  state.activeFilter = key;
  renderFilterButtons();
  renderTestsGrid();
}

function renderTestsGrid() {
  const grid = document.getElementById('tests-grid');
  if (!grid) return;

  let filtered = state.tests;

  if (state.activeFilter === 'COMPANY') {
    filtered = filtered.filter(t => t.test_type === 'COMPANY');
  } else if (state.activeFilter === 'TOPIC') {
    filtered = filtered.filter(t => t.test_type === 'TOPIC');
  } else if (state.activeFilter === 'OTHER') {
    filtered = filtered.filter(t => t.test_type === 'OTHER');
  }

  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase();
    filtered = filtered.filter(t => 
      t.title.toLowerCase().includes(q) || 
      t.company_name.toLowerCase().includes(q) || 
      t.description.toLowerCase().includes(q) ||
      t.topic_category.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center card-surface rounded-2xl p-8 border border-[#E2E8F0]">
        <svg class="w-16 h-16 mx-auto text-[#94A3B8] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h3 class="text-xl font-bold text-[#003057] mb-2 font-heading">No Tests Found</h3>
        <p class="text-[#64748B] text-sm">No test matches your selected category or search query.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(t => {
    let badgeText = `${t.company_name} ${t.year}`;
    let badgeColor = 'bg-[#EBF4FB] text-[#3781C2] border-[#3781C2]/25';

    if (t.test_type === 'COMPANY') {
      badgeText = `Real ${t.company_name} ${t.year}`;
      badgeColor = 'bg-[#EBF4FB] text-[#003057] border-[#3781C2]/40 font-black';
    } else if (t.test_type === 'TOPIC') {
      badgeText = `Topic: ${t.topic_category}`;
      badgeColor = 'bg-[#FFF9E6] text-[#946C00] border-[#FFE899] font-black';
    } else if (t.test_type === 'OTHER') {
      badgeText = `AI Mock: ${t.topic_category}`;
      badgeColor = 'bg-[#F3E8FF] text-[#6B21A8] border-[#E9D5FF] font-black';
    }

    return `
      <div class="card-surface card-surface-hover rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group border border-[#E2E8F0]">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider border ${badgeColor}">
              [${badgeText}]
            </span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F4EA] text-[#0D652D] border border-[#A7F3D0]">
              100% Free
            </span>
          </div>

          <h3 class="text-base font-bold text-[#003057] font-heading group-hover:text-[#3781C2] transition-colors line-clamp-2 mb-2">
            ${t.title}
          </h3>

          <p class="text-xs text-[#64748B] line-clamp-2 mb-4 leading-relaxed">
            ${t.description || 'Authentic placement pattern test with step-by-step formulas and speed shortcuts.'}
          </p>
        </div>

        <div class="pt-4 border-t border-[#E2E8F0] flex items-center justify-between mt-auto">
          <div class="flex items-center gap-1.5 text-xs text-[#64748B] font-semibold">
            <svg class="w-4 h-4 text-[#3781C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>${t.duration_minutes}m • 25 Unique Qs</span>
          </div>

          <button 
            onclick="openTestSetupModal(${t.id})"
            class="px-4 py-2 rounded-xl text-xs font-black bg-[#FFC412] text-[#00223E] hover:bg-[#E5AF0E] transition-all flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95"
          >
            <span>Start Test</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Setup Modal Handler
function openTestSetupModal(testId) {
  const test = state.tests.find(t => t.id === testId);
  if (!test) return;

  state.selectedTestForSetup = test;

  const modal = document.getElementById('test-setup-modal');
  const titleEl = document.getElementById('modal-test-title');
  const metaEl = document.getElementById('modal-test-meta');

  if (titleEl) titleEl.textContent = test.title;
  if (metaEl) metaEl.textContent = `${test.company_name} ${test.year} • ${test.question_count || 25} Questions • Zero Duplication Guaranteed • 100% Free`;

  selectSetupMode('EXAM');
  selectPracticeTimer(0);

  modal.classList.remove('hidden');
}

function closeTestSetupModal() {
  const modal = document.getElementById('test-setup-modal');
  if (modal) modal.classList.add('hidden');
}

function selectSetupMode(mode) {
  state.testMode = mode;
  const btnPractice = document.getElementById('btn-mode-practice');
  const btnExam = document.getElementById('btn-mode-exam');
  const practiceOptions = document.getElementById('practice-timer-options');

  if (mode === 'PRACTICE') {
    btnPractice.classList.add('border-2', 'border-[#3781C2]', 'bg-[#EBF4FB]');
    btnPractice.classList.remove('border-[#E2E8F0]', 'bg-[#F8FAFC]');
    btnExam.classList.remove('border-2', 'border-[#3781C2]', 'bg-[#EBF4FB]');
    btnExam.classList.add('border-[#E2E8F0]', 'bg-[#F8FAFC]');
    practiceOptions.classList.remove('hidden');
  } else {
    btnExam.classList.add('border-2', 'border-[#3781C2]', 'bg-[#EBF4FB]');
    btnExam.classList.remove('border-[#E2E8F0]', 'bg-[#F8FAFC]');
    btnPractice.classList.remove('border-2', 'border-[#3781C2]', 'bg-[#EBF4FB]');
    btnPractice.classList.add('border-[#E2E8F0]', 'bg-[#F8FAFC]');
    practiceOptions.classList.add('hidden');
  }
}

function selectPracticeTimer(seconds) {
  state.practiceTimerSeconds = seconds;
  document.querySelectorAll('.practice-timer-btn').forEach(btn => {
    if (parseInt(btn.dataset.seconds) === seconds) {
      btn.classList.add('border-[#3781C2]', 'bg-[#3781C2]', 'text-white');
      btn.classList.remove('border-[#CBD5E1]', 'bg-white', 'text-[#64748B]');
    } else {
      btn.classList.remove('border-[#3781C2]', 'bg-[#3781C2]', 'text-white');
      btn.classList.add('border-[#CBD5E1]', 'bg-white', 'text-[#64748B]');
    }
  });
}

// Start Test Execution
async function launchSelectedTest() {
  if (!state.selectedTestForSetup) return;

  const testId = state.selectedTestForSetup.id;
  closeTestSetupModal();

  try {
    showToast('Loading full question bank...', 'info');
    const fullTest = await api.fetchTestDetail(testId);
    if (!fullTest || !fullTest.questions || fullTest.questions.length === 0) {
      showToast('Could not load test questions.', 'error');
      return;
    }

    state.activeTest = fullTest;
    state.currentQuestionIndex = 0;
    state.userResponses = {};
    state.practiceRevealed = {};
    state.testStartTime = Date.now();
    state.questionStartTime = Date.now();

    // Reset Test Integrity State
    state.tabSwitchCount = 0;
    state.integrityFlag = false;
    state.submissionReason = 'Normal Submission';

    const tabBadge = document.getElementById('engine-tab-switch-badge');
    if (tabBadge) {
      tabBadge.classList.add('hidden');
      tabBadge.textContent = '⚠️ Tab Switch: 0/2';
    }

    if (state.testMode === 'EXAM') {
      state.totalExamSeconds = (fullTest.questions.length || 25) * 60;
      state.examSecondsRemaining = state.totalExamSeconds;
      startExamTimer();
    } else {
      state.questionTimerLimit = state.practiceTimerSeconds;
      state.questionSecondsRemaining = state.practiceTimerSeconds;
      startPracticeQuestionTimer();
    }

    saveActiveSession();
    switchView('test-engine');
    renderQuestionEngine();
  } catch (err) {
    console.error('Error starting test:', err);
    showToast('Failed to initialize test engine.', 'error');
  }
}

// Timers
function startExamTimer() {
  clearInterval(state.examTimerInterval);
  const timerDisplay = document.getElementById('engine-timer-display');
  const timerContainer = document.getElementById('engine-timer-container');

  state.examTimerInterval = setInterval(() => {
    state.examSecondsRemaining--;

    if (timerDisplay) {
      const mins = Math.floor(state.examSecondsRemaining / 60);
      const secs = state.examSecondsRemaining % 60;
      timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    if (state.examSecondsRemaining <= 120 && timerContainer) {
      timerContainer.classList.add('danger-timer-pulse', 'border-[#EF4444]', 'text-[#EF4444]', 'bg-[#FEE2E2]');
      timerContainer.classList.remove('border-[#CBD5E1]', 'text-[#003057]', 'bg-[#F8FAFC]');
    }

    if (state.examSecondsRemaining <= 0) {
      clearInterval(state.examTimerInterval);
      showToast('Time expired! Submitting test automatically...', 'error');
      submitCurrentTest(true);
    }
  }, 1000);
}

function startPracticeQuestionTimer() {
  clearInterval(state.questionTimerInterval);
  const timerDisplay = document.getElementById('engine-timer-display');
  const timerContainer = document.getElementById('engine-timer-container');

  if (state.practiceTimerSeconds === 0) {
    if (timerDisplay) timerDisplay.textContent = 'No Timer (Practice)';
    if (timerContainer) timerContainer.classList.remove('danger-timer-pulse', 'border-[#EF4444]', 'text-[#EF4444]');
    return;
  }

  state.questionSecondsRemaining = state.practiceTimerSeconds;
  state.questionTimerInterval = setInterval(() => {
    state.questionSecondsRemaining--;
    if (timerDisplay) {
      const mins = Math.floor(state.questionSecondsRemaining / 60);
      const secs = state.questionSecondsRemaining % 60;
      timerDisplay.textContent = `Q-Timer: ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    if (state.questionSecondsRemaining <= 15 && timerContainer) {
      timerContainer.classList.add('danger-timer-pulse', 'border-[#EF4444]', 'text-[#EF4444]');
    }

    if (state.questionSecondsRemaining <= 0) {
      clearInterval(state.questionTimerInterval);
      const q = state.activeTest.questions[state.currentQuestionIndex];
      if (q && !state.practiceRevealed[q.id]) {
        state.practiceRevealed[q.id] = true;
        renderQuestionEngine();
        showToast('Question time limit reached! Solution revealed.', 'info');
      }
    }
  }, 1000);
}

// Rich Markdown & Code Snippet Formatter
function formatRichText(raw) {
  if (!raw) return '';
  let escaped = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Convert ```code``` blocks
  escaped = escaped.replace(/```([a-zA-Z]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<div class="my-3 rounded-xl overflow-hidden border border-[#334155] shadow-sm"><div class="bg-[#0F172A] px-3 py-1 text-[10px] font-mono text-[#94A3B8] font-bold uppercase border-b border-[#334155] flex items-center justify-between"><span>${lang || 'CODE'}</span><span class="text-[#38BDF8]">Dry-Run Snippet</span></div><pre class="bg-[#1E293B] text-[#38BDF8] p-4 text-xs font-mono overflow-x-auto leading-relaxed whitespace-pre"><code>${code.trim()}</code></pre></div>`;
  });

  // Convert `inline code`
  escaped = escaped.replace(/`([^`]+)`/g, '<code class="bg-[#F1F5F9] text-[#003057] px-1.5 py-0.5 rounded font-mono text-[11px] border border-[#CBD5E1] font-bold">$1</code>');

  // Convert \n to <br> outside <pre>
  const parts = escaped.split(/(<div[\s\S]*?<\/div>)/g);
  return parts.map(p => {
    if (p.startsWith('<div')) return p;
    return p.replace(/\n/g, '<br>');
  }).join('');
}

// Question Rendering Engine
function renderQuestionEngine() {
  if (!state.activeTest || !state.activeTest.questions) return;

  const questions = state.activeTest.questions;
  const currentQ = questions[state.currentQuestionIndex];
  const isPractice = state.testMode === 'PRACTICE';

  const testTitleEl = document.getElementById('engine-test-title');
  const modeBadgeEl = document.getElementById('engine-mode-badge');
  const questionCountEl = document.getElementById('engine-question-counter');

  if (testTitleEl) testTitleEl.textContent = state.activeTest.title;
  if (modeBadgeEl) {
    modeBadgeEl.textContent = isPractice ? 'Practice Mode (Instant Solutions)' : 'Exam Simulation (Timer Active)';
    modeBadgeEl.className = isPractice ? 'px-3 py-1 rounded-full text-xs font-bold bg-[#E6F4EA] text-[#0D652D]' : 'px-3 py-1 rounded-full text-xs font-bold bg-[#FEE2E2] text-[#DC2626]';
  }
  if (questionCountEl) questionCountEl.textContent = `Question ${state.currentQuestionIndex + 1} of ${questions.length}`;

  const qTopicEl = document.getElementById('engine-q-topic');
  const qTagEl = document.getElementById('engine-q-tag');
  const qTextEl = document.getElementById('engine-q-text');

  if (qTopicEl) qTopicEl.textContent = currentQ.topic;
  if (qTagEl) qTagEl.textContent = currentQ.company_tag || `[${state.activeTest.company_name} ${state.activeTest.year}]`;
  if (qTextEl) qTextEl.innerHTML = formatRichText(currentQ.question_text);

  // Sync Question Bookmark Button
  const bookmarkIcon = document.getElementById('engine-bookmark-icon');
  const bookmarkText = document.getElementById('engine-bookmark-text');
  const isBookmarked = state.userBookmarks && state.userBookmarks.has(currentQ.id);

  if (bookmarkIcon && bookmarkText) {
    if (isBookmarked) {
      bookmarkIcon.className = 'w-4 h-4 text-[#FFC412] fill-current';
      bookmarkText.textContent = 'Saved ⭐';
      bookmarkText.className = 'text-[11px] font-bold text-[#946C00] hidden sm:inline';
    } else {
      bookmarkIcon.className = 'w-4 h-4 text-[#CBD5E1]';
      bookmarkText.textContent = 'Star';
      bookmarkText.className = 'text-[11px] font-bold text-[#64748B] hidden sm:inline';
    }
  }

  const optionsContainer = document.getElementById('engine-options-container');
  const userResp = state.userResponses[currentQ.id] || { selected_option: '', is_review: false };
  const isRevealed = isPractice && state.practiceRevealed[currentQ.id];

  const options = [
    { key: 'A', text: currentQ.option_a },
    { key: 'B', text: currentQ.option_b },
    { key: 'C', text: currentQ.option_c },
    { key: 'D', text: currentQ.option_d },
  ];

  optionsContainer.innerHTML = options.map(opt => {
    let stateClass = 'option-btn';
    let icon = `<span class="w-7 h-7 rounded-lg border border-[#CBD5E1] flex items-center justify-center font-bold text-xs shrink-0 text-[#64748B] bg-[#F8FAFC]">${opt.key}</span>`;

    if (isPractice && isRevealed) {
      if (opt.key === currentQ.correct_option) {
        stateClass += ' correct';
        icon = `<span class="w-7 h-7 rounded-lg bg-[#10B981] text-white flex items-center justify-center font-bold text-xs shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></span>`;
      } else if (opt.key === userResp.selected_option && userResp.selected_option !== currentQ.correct_option) {
        stateClass += ' wrong';
        icon = `<span class="w-7 h-7 rounded-lg bg-[#EF4444] text-white flex items-center justify-center font-bold text-xs shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg></span>`;
      }
    } else {
      if (userResp.selected_option === opt.key) {
        stateClass += ' selected';
        icon = `<span class="w-7 h-7 rounded-lg bg-[#3781C2] text-white flex items-center justify-center font-bold text-xs shrink-0">${opt.key}</span>`;
      }
    }

    return `
      <button 
        class="w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all duration-200 ${stateClass}"
        onclick="handleOptionSelect('${opt.key}')"
        ${isPractice && isRevealed ? 'disabled' : ''}
      >
        ${icon}
        <span class="text-sm font-semibold text-[#00223E]">${opt.text}</span>
      </button>
    `;
  }).join('');

  const practiceSolContainer = document.getElementById('engine-practice-solution');
  if (isPractice && isRevealed) {
    practiceSolContainer.classList.remove('hidden');
    const isCorrect = userResp.selected_option === currentQ.correct_option;
    practiceSolContainer.innerHTML = `
      <div class="p-5 rounded-2xl border ${isCorrect ? 'bg-[#E6F4EA] border-[#A7F3D0]' : 'bg-[#FEE2E2] border-[#FECACA]'} animate-fade-in space-y-3">
        <div class="flex items-center gap-2">
          ${isCorrect 
            ? `<svg class="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span class="font-extrabold text-[#065F46] text-sm">Correct Answer: Option ${currentQ.correct_option}</span>`
            : `<svg class="w-5 h-5 text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span class="font-extrabold text-[#991B1B] text-sm">Incorrect. Correct Answer is Option ${currentQ.correct_option}</span>`
          }
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-[#475569] mb-1.5 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-[#3781C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Step-by-Step Mathematical & Logical Solution:
          </h4>
          <div class="text-xs text-[#00223E] whitespace-pre-line leading-relaxed bg-white p-3.5 rounded-xl border border-[#CBD5E1] font-mono shadow-inner">
            ${currentQ.step_by_step_solution}
          </div>
        </div>

        ${currentQ.shortcut_formula ? `
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-[#946C00] mb-1 flex items-center gap-1.5">
              ⚡ Placement Speed Shortcut / Key Formula:
            </h4>
            <div class="text-xs text-[#7A5800] bg-[#FFF9E6] p-3 rounded-xl border border-[#FFE899] font-bold font-mono">
              ${currentQ.shortcut_formula}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  } else {
    practiceSolContainer.classList.add('hidden');
  }

  const btnPrev = document.getElementById('engine-btn-prev');
  const btnNext = document.getElementById('engine-btn-next');
  const btnReview = document.getElementById('engine-btn-review');

  if (btnPrev) btnPrev.disabled = state.currentQuestionIndex === 0;
  if (btnNext) {
    const isLast = state.currentQuestionIndex === questions.length - 1;
    btnNext.textContent = isLast ? (isPractice ? 'Finish Practice' : 'Submit Exam') : 'Next Question';
    btnNext.className = isLast 
      ? 'px-5 py-2.5 rounded-xl text-xs font-bold bg-[#10B981] text-white hover:bg-[#059669] transition-all shadow-sm'
      : 'px-5 py-2.5 rounded-xl text-xs font-bold bg-[#3781C2] text-white hover:bg-[#2A6AA4] transition-all shadow-sm';
  }

  if (btnReview) {
    if (isPractice) {
      btnReview.classList.add('hidden');
    } else {
      btnReview.classList.remove('hidden');
      btnReview.textContent = userResp.is_review ? 'Unmark Review' : 'Mark for Review';
    }
  }

  renderQuestionPalette();
}

function handleOptionSelect(optionKey) {
  const currentQ = state.activeTest.questions[state.currentQuestionIndex];
  if (!currentQ) return;

  const now = Date.now();
  const timeSpent = Math.round((now - state.questionStartTime) / 1000);

  if (!state.userResponses[currentQ.id]) {
    state.userResponses[currentQ.id] = { selected_option: optionKey, time_spent: timeSpent, is_review: false };
  } else {
    state.userResponses[currentQ.id].selected_option = optionKey;
    state.userResponses[currentQ.id].time_spent += timeSpent;
  }

  state.questionStartTime = Date.now();

  if (state.testMode === 'PRACTICE') {
    state.practiceRevealed[currentQ.id] = true;
    clearInterval(state.questionTimerInterval);
  }

  saveActiveSession();
  renderQuestionEngine();
}

function clearOptionSelect() {
  const currentQ = state.activeTest.questions[state.currentQuestionIndex];
  if (!currentQ || state.testMode === 'PRACTICE') return;

  if (state.userResponses[currentQ.id]) {
    state.userResponses[currentQ.id].selected_option = '';
  }
  saveActiveSession();
  renderQuestionEngine();
}

function toggleReview() {
  const currentQ = state.activeTest.questions[state.currentQuestionIndex];
  if (!currentQ || state.testMode === 'PRACTICE') return;

  if (!state.userResponses[currentQ.id]) {
    state.userResponses[currentQ.id] = { selected_option: '', time_spent: 0, is_review: true };
  } else {
    state.userResponses[currentQ.id].is_review = !state.userResponses[currentQ.id].is_review;
  }
  saveActiveSession();
  renderQuestionEngine();
}

function nextQuestion() {
  const questions = state.activeTest.questions;
  if (state.currentQuestionIndex < questions.length - 1) {
    state.currentQuestionIndex++;
    state.questionStartTime = Date.now();
    if (state.testMode === 'PRACTICE') {
      startPracticeQuestionTimer();
    }
    saveActiveSession();
    renderQuestionEngine();
  } else {
    submitCurrentTest();
  }
}

function prevQuestion() {
  if (state.currentQuestionIndex > 0) {
    state.currentQuestionIndex--;
    state.questionStartTime = Date.now();
    if (state.testMode === 'PRACTICE') {
      startPracticeQuestionTimer();
    }
    saveActiveSession();
    renderQuestionEngine();
  }
}

function jumpToQuestion(index) {
  if (index >= 0 && index < state.activeTest.questions.length) {
    state.currentQuestionIndex = index;
    state.questionStartTime = Date.now();
    if (state.testMode === 'PRACTICE') {
      startPracticeQuestionTimer();
    }
    saveActiveSession();
    renderQuestionEngine();
  }
}

function renderQuestionPalette() {
  const palette = document.getElementById('engine-palette-grid');
  if (!palette || !state.activeTest) return;

  const questions = state.activeTest.questions;
  palette.innerHTML = questions.map((q, idx) => {
    const isCurrent = idx === state.currentQuestionIndex;
    const resp = state.userResponses[q.id];
    let bubbleClass = 'unanswered';

    if (resp && resp.selected_option) {
      bubbleClass = 'answered';
    } else if (resp && resp.is_review) {
      bubbleClass = 'review';
    }

    if (isCurrent) {
      bubbleClass += ' current';
    }

    return `
      <button 
        class="palette-bubble ${bubbleClass}"
        onclick="jumpToQuestion(${idx})"
      >
        ${idx + 1}
      </button>
    `;
  }).join('');
}

// Submission & Diagnostic Engine
async function submitCurrentTest(isAuto = false) {
  if (!isAuto && !confirm('Are you sure you want to submit your test and generate your diagnostic report?')) {
    return;
  }

  clearInterval(state.examTimerInterval);
  clearInterval(state.questionTimerInterval);
  clearActiveSession();

  const totalTimeSeconds = Math.round((Date.now() - state.testStartTime) / 1000);
  
  const responsesArray = Object.keys(state.userResponses).map(qId => ({
    question_id: parseInt(qId),
    selected_option: state.userResponses[qId].selected_option || '',
    time_spent_seconds: state.userResponses[qId].time_spent || 0
  }));

  const payload = {
    user_id: state.currentUser ? state.currentUser.id : null,
    mode: state.testMode,
    timer_per_question: state.practiceTimerSeconds,
    time_taken_seconds: totalTimeSeconds,
    tab_switches_count: state.tabSwitchCount || 0,
    integrity_flag: state.integrityFlag || false,
    submission_reason: state.submissionReason || 'Normal Submission',
    mega_event_id: state.activeMegaEventId || null,
    responses: responsesArray
  };

  try {
    showToast('Evaluating performance...', 'info');
    const report = await api.submitTest(state.activeTest.id, payload);
    state.diagnosticReport = report;
    
    // Refresh user profile stats dynamically
    if (state.currentUser) {
      const res = await api.fetchLeaderboard(state.currentUser.id);
      if (res.current_user_rank) {
        state.currentUser.total_points = res.current_user_rank.total_points;
        state.currentUser.total_tests = res.current_user_rank.total_tests;
        state.currentUser.accuracy_percentage = res.current_user_rank.accuracy_percentage;
        state.currentUser.rank = res.current_user_rank.rank;
        localStorage.setItem('firstround_user', JSON.stringify(state.currentUser));
        updateAuthUI();
      }
    }

    switchView('diagnostic');
    renderDiagnosticReport();
  } catch (err) {
    console.error('Error submitting test:', err);
    showToast('Failed to submit test.', 'error');
  }
}

// Diagnostic View Renderer
function renderDiagnosticReport() {
  const data = state.diagnosticReport;
  if (!data) return;

  // Integrity Alert Banner
  const integrityAlert = document.getElementById('diag-integrity-alert');
  const integrityReason = document.getElementById('diag-integrity-reason');
  if (integrityAlert) {
    if (data.integrity_flag || (data.tab_switches_count && data.tab_switches_count >= 2)) {
      integrityAlert.classList.remove('hidden');
      if (integrityReason) {
        integrityReason.textContent = data.submission_reason || `Multiple tab switches (${data.tab_switches_count} violations) were detected during Exam Simulation.`;
      }
    } else {
      integrityAlert.classList.add('hidden');
    }
  }

  document.getElementById('diag-test-title').textContent = data.test_title;
  document.getElementById('diag-company-tag').textContent = `[${data.company_name} ${data.year}]`;
  document.getElementById('diag-score-display').textContent = `${data.score} / ${data.total_questions}`;
  document.getElementById('diag-accuracy-display').textContent = `${data.accuracy}%`;
  document.getElementById('diag-points-earned').textContent = `+${data.points_earned} Points`;
  
  const mins = Math.floor(data.time_taken_seconds / 60);
  const secs = data.time_taken_seconds % 60;
  document.getElementById('diag-time-taken').textContent = `${mins}m ${secs}s`;
  document.getElementById('diag-avg-speed').textContent = `${data.average_speed_seconds}s / Question`;

  // Strengths List (Accuracy >= 80%)
  const strengthsContainer = document.getElementById('diag-strengths-container');
  if (strengthsContainer) {
    if (data.strengths && data.strengths.length > 0) {
      strengthsContainer.innerHTML = data.strengths.map(s => `
        <div class="p-4 rounded-xl bg-[#E6F4EA] border border-[#A7F3D0] flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-[#10B981] text-white flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <h5 class="text-sm font-bold text-[#003057]">${s.topic}</h5>
              <p class="text-xs text-[#065F46] font-semibold">${s.badge} • ${s.correct}/${s.total} Solved</p>
            </div>
          </div>
          <span class="text-base font-black text-[#10B981] font-heading">${s.accuracy}%</span>
        </div>
      `).join('');
    } else {
      strengthsContainer.innerHTML = `
        <p class="text-xs text-[#64748B] italic p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
          No topics achieved $\ge$ 80% accuracy in this run. Review key shortcuts and practice regularly.
        </p>
      `;
    }
  }

  // Weaknesses List (Accuracy < 60%)
  const weaknessesContainer = document.getElementById('diag-weaknesses-container');
  if (weaknessesContainer) {
    if (data.weaknesses && data.weaknesses.length > 0) {
      weaknessesContainer.innerHTML = data.weaknesses.map(w => `
        <div class="p-4 rounded-xl bg-[#FEE2E2] border border-[#FECACA]">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EF4444] text-white">
                ${w.badge}
              </span>
              <h5 class="text-sm font-bold text-[#003057]">${w.topic}</h5>
            </div>
            <span class="text-base font-black text-[#EF4444] font-heading">${w.accuracy}%</span>
          </div>
          <p class="text-xs text-[#475569] leading-relaxed bg-white p-3 rounded-lg border border-[#E2E8F0]">
            <strong class="text-[#003057]">Actionable Recommendation:</strong> ${w.recommendation}
          </p>
        </div>
      `).join('');
    } else {
      weaknessesContainer.innerHTML = `
        <p class="text-xs text-[#065F46] p-4 bg-[#E6F4EA] rounded-xl border border-[#A7F3D0] font-semibold">
          🎉 Outstanding! You scored above 60% across all tested topics.
        </p>
      `;
    }
  }

  renderDiagnosticSolutionsAccordion();
}

function setSolutionFilter(filterKey) {
  state.solutionFilter = filterKey;
  document.querySelectorAll('.sol-filter-btn').forEach(btn => {
    if (btn.dataset.filter === filterKey) {
      btn.classList.add('bg-[#3781C2]', 'text-white');
      btn.classList.remove('text-[#64748B]');
    } else {
      btn.classList.remove('bg-[#3781C2]', 'text-white');
      btn.classList.add('text-[#64748B]');
    }
  });
  renderDiagnosticSolutionsAccordion();
}

function renderDiagnosticSolutionsAccordion() {
  const container = document.getElementById('diag-solutions-accordion');
  if (!container || !state.diagnosticReport) return;

  let solutions = state.diagnosticReport.detailed_solutions || [];

  if (state.solutionFilter === 'CORRECT') {
    solutions = solutions.filter(s => s.is_correct);
  } else if (state.solutionFilter === 'INCORRECT') {
    solutions = solutions.filter(s => !s.is_correct && s.selected_option !== '');
  } else if (state.solutionFilter === 'UNANSWERED') {
    solutions = solutions.filter(s => s.selected_option === '');
  }

  container.innerHTML = solutions.map((item, index) => {
    const isCorrect = item.is_correct;
    const isUnanswered = item.selected_option === '';
    const isStarred = state.userBookmarks && state.userBookmarks.has(item.question_id);
    
    let statusBadge = `<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-[#E6F4EA] text-[#0D652D] border border-[#A7F3D0]">Correct (+10 pts)</span>`;
    if (isUnanswered) {
      statusBadge = `<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1]">Unanswered (0 pts)</span>`;
    } else if (!isCorrect) {
      statusBadge = `<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]">Incorrect (-2 pts)</span>`;
    }

    return `
      <details class="card-surface rounded-xl border border-[#E2E8F0] overflow-hidden group">
        <summary class="p-4 cursor-pointer flex items-center justify-between gap-4 hover:bg-[#F8FAFC] transition-colors list-none select-none">
          <div class="flex items-center gap-3">
            <span class="w-7 h-7 rounded-lg bg-[#003057] text-white flex items-center justify-center font-bold text-xs shrink-0">
              Q${index + 1}
            </span>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs text-[#3781C2] font-bold">${item.topic}</span>
                <span class="text-xs text-[#64748B] font-semibold">${item.company_tag || ''}</span>
              </div>
              <p class="text-xs font-semibold text-[#00223E] line-clamp-1">${item.question_text}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            <button 
              type="button" 
              onclick="event.stopPropagation(); toggleQuestionBookmark(${item.question_id})" 
              title="Save to Revision Vault"
              class="p-1.5 rounded-lg border border-[#CBD5E1] hover:border-[#FFC412] hover:bg-[#FFF9E6] text-xs font-bold transition-all flex items-center gap-1"
            >
              <svg class="w-4 h-4 ${isStarred ? 'text-[#FFC412] fill-current' : 'text-[#CBD5E1]'}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            </button>
            ${statusBadge}
            <svg class="w-4 h-4 text-[#64748B] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </summary>

        <div class="p-5 border-t border-[#E2E8F0] bg-[#F8FAFC] space-y-4">
          <div class="p-3.5 rounded-lg bg-white border border-[#E2E8F0] text-xs text-[#00223E] font-medium leading-relaxed shadow-sm">
            ${formatRichText(item.question_text)}
          </div>

          <!-- Options Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div class="p-3 rounded-lg border ${item.correct_option === 'A' ? 'border-[#10B981] bg-[#E6F4EA] text-[#065F46] font-bold' : item.selected_option === 'A' ? 'border-[#EF4444] bg-[#FEE2E2] text-[#991B1B] font-bold' : 'border-[#E2E8F0] bg-white text-[#475569]'}">
              <strong>(A)</strong> ${item.option_a}
            </div>
            <div class="p-3 rounded-lg border ${item.correct_option === 'B' ? 'border-[#10B981] bg-[#E6F4EA] text-[#065F46] font-bold' : item.selected_option === 'B' ? 'border-[#EF4444] bg-[#FEE2E2] text-[#991B1B] font-bold' : 'border-[#E2E8F0] bg-white text-[#475569]'}">
              <strong>(B)</strong> ${item.option_b}
            </div>
            <div class="p-3 rounded-lg border ${item.correct_option === 'C' ? 'border-[#10B981] bg-[#E6F4EA] text-[#065F46] font-bold' : item.selected_option === 'C' ? 'border-[#EF4444] bg-[#FEE2E2] text-[#991B1B] font-bold' : 'border-[#E2E8F0] bg-white text-[#475569]'}">
              <strong>(C)</strong> ${item.option_c}
            </div>
            <div class="p-3 rounded-lg border ${item.correct_option === 'D' ? 'border-[#10B981] bg-[#E6F4EA] text-[#065F46] font-bold' : item.selected_option === 'D' ? 'border-[#EF4444] bg-[#FEE2E2] text-[#991B1B] font-bold' : 'border-[#E2E8F0] bg-white text-[#475569]'}">
              <strong>(D)</strong> ${item.option_d}
            </div>
          </div>

          <!-- Step-by-Step Solution Breakdown -->
          <div>
            <h5 class="text-xs font-bold uppercase tracking-wider text-[#003057] mb-2 flex items-center gap-1.5">
              <svg class="w-4 h-4 text-[#3781C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Step-by-Step Mathematical Solution:
            </h5>
            <div class="text-xs text-[#00223E] whitespace-pre-line leading-relaxed bg-white p-3.5 rounded-lg border border-[#CBD5E1] font-mono shadow-sm">
              ${formatRichText(item.step_by_step_solution)}
            </div>
          </div>

          <!-- Shortcut Formula -->
          ${item.shortcut_formula ? `
            <div>
              <h5 class="text-xs font-bold uppercase tracking-wider text-[#946C00] mb-1.5">⚡ Placement Formula & Speed Shortcut:</h5>
              <div class="text-xs text-[#7A5800] bg-[#FFF9E6] p-3 rounded-lg border border-[#FFE899] font-bold font-mono">
                ${item.shortcut_formula}
              </div>
            </div>
          ` : ''}
        </div>
      </details>
    `;
  }).join('');
}

// ==========================================
// VIRAL GROWTH: SOCIAL SHARE & SCORECARD PNG
// ==========================================
function shareOnWhatsApp() {
  const report = state.diagnosticReport;
  if (!report) {
    showToast('No diagnostic report available to share.', 'error');
    return;
  }
  const user = state.currentUser;
  const rankStr = user && user.rank ? user.rank : '1';
  const siteUrl = window.location.origin || 'http://127.0.0.1:8000';

  const shareMessage = `🎯 I just scored ${report.score}/${report.total_questions} (${report.accuracy}%) on the ${report.test_title} Placement Mock Test on FirstRound! My Rank: #${rankStr}. Think you can beat my score? Test yourself here: ${siteUrl}`;
  
  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
  window.open(waUrl, '_blank');
}

async function downloadScorecardImage() {
  const report = state.diagnosticReport;
  if (!report) {
    showToast('No diagnostic report found to generate image.', 'error');
    return;
  }

  showToast('Generating official scorecard image...', 'info');

  const user = state.currentUser;
  const nameEl = document.getElementById('card-student-name');
  const testEl = document.getElementById('card-test-name');
  const scoreEl = document.getElementById('card-score');
  const accEl = document.getElementById('card-accuracy');
  const ptsEl = document.getElementById('card-points');
  const dateEl = document.getElementById('card-date');

  if (nameEl) nameEl.textContent = user ? user.full_name : 'Candidate';
  if (testEl) testEl.textContent = `${report.test_title} [${report.company_name} ${report.year}]`;
  if (scoreEl) scoreEl.textContent = `${report.score} / ${report.total_questions}`;
  if (accEl) accEl.textContent = `${report.accuracy}%`;
  if (ptsEl) ptsEl.textContent = `+${report.points_earned} Pts`;
  if (dateEl) {
    const d = new Date();
    dateEl.textContent = `Date: ${d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`;
  }

  const renderNode = document.getElementById('scorecard-render-node');
  if (!renderNode) return;

  try {
    if (typeof html2canvas === 'undefined') {
      showToast('Image renderer loading, please try again.', 'error');
      return;
    }
    const canvas = await html2canvas(renderNode, {
      scale: 2,
      backgroundColor: '#F4F7F6',
      useCORS: true
    });

    const link = document.createElement('a');
    const compName = (report.company_name || 'test').toLowerCase().replace(/\s+/g, '_');
    link.download = `firstround_scorecard_${compName}_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Scorecard image downloaded successfully! 🏆', 'success');
  } catch (err) {
    console.error('Error generating scorecard image:', err);
    showToast('Failed to generate scorecard image.', 'error');
  }
}

// ==========================================
// RETENTION: REVISION VAULT & BOOKMARKS
// ==========================================
async function loadUserBookmarks() {
  if (!state.currentUser) return;
  try {
    const res = await api.fetchBookmarks(state.currentUser.id);
    if (res.bookmarks) {
      state.userBookmarks = new Set(res.bookmarks.map(b => b.question.id));
    }
  } catch (err) {
    console.error('Error fetching bookmarks:', err);
  }
}

async function toggleCurrentQuestionBookmark() {
  if (!state.currentUser || !state.activeTest || !state.activeTest.questions) return;
  const currentQ = state.activeTest.questions[state.currentQuestionIndex];
  if (!currentQ) return;

  try {
    const res = await api.toggleBookmark(state.currentUser.id, currentQ.id);
    if (res.bookmarked) {
      state.userBookmarks.add(currentQ.id);
      showToast('Question saved to Revision Vault! ⭐', 'success');
    } else {
      state.userBookmarks.delete(currentQ.id);
      showToast('Question removed from Revision Vault.', 'info');
    }
    renderQuestionEngine();
  } catch (err) {
    showToast('Failed to update bookmark.', 'error');
  }
}

async function toggleQuestionBookmark(questionId) {
  if (!state.currentUser) return;
  try {
    const res = await api.toggleBookmark(state.currentUser.id, questionId);
    if (res.bookmarked) {
      state.userBookmarks.add(questionId);
      showToast('Question saved to Revision Vault! ⭐', 'success');
    } else {
      state.userBookmarks.delete(questionId);
      showToast('Question removed from Revision Vault.', 'info');
    }
    if (state.currentView === 'vault') {
      loadRevisionVault();
    } else if (state.currentView === 'diagnostic') {
      renderDiagnosticSolutionsAccordion();
    }
  } catch (err) {
    showToast('Failed to update bookmark.', 'error');
  }
}

async function loadRevisionVault() {
  if (!state.currentUser) return;
  
  try {
    const [starredRes, weakRes] = await Promise.all([
      api.fetchBookmarks(state.currentUser.id),
      api.fetchWeakQuestions(state.currentUser.id)
    ]);

    const starredList = (starredRes.bookmarks || []).map(b => ({
      ...b.question,
      test_title: b.test_title,
      test_id: b.test_id,
      bookmark_id: b.id
    }));

    const weakList = weakRes.weak_questions || [];

    const countStarred = document.getElementById('vault-count-starred');
    const countWeak = document.getElementById('vault-count-weak');
    const badgeStarred = document.getElementById('vault-badge-starred');
    const badgeWeak = document.getElementById('vault-badge-weak');

    if (countStarred) countStarred.textContent = starredList.length;
    if (countWeak) countWeak.textContent = weakList.length;
    if (badgeStarred) badgeStarred.textContent = starredList.length;
    if (badgeWeak) badgeWeak.textContent = weakList.length;

    state.vaultQuestions = {
      starred: starredList,
      weak: weakList
    };

    renderRevisionVault();
  } catch (err) {
    console.error('Error loading revision vault:', err);
    showToast('Failed to load Revision Vault.', 'error');
  }
}

function switchVaultSubTab(subTab) {
  state.vaultSubTab = subTab;
  const tabStarred = document.getElementById('vault-tab-starred');
  const tabWeak = document.getElementById('vault-tab-weak');

  if (subTab === 'starred') {
    tabStarred.className = 'px-5 py-2.5 rounded-xl font-bold text-xs bg-[#003057] text-white transition-all shadow-sm flex items-center gap-2';
    tabWeak.className = 'px-5 py-2.5 rounded-xl font-bold text-xs bg-white text-[#64748B] hover:bg-[#F1F5F9] border border-[#CBD5E1] transition-all flex items-center gap-2';
  } else {
    tabWeak.className = 'px-5 py-2.5 rounded-xl font-bold text-xs bg-[#003057] text-white transition-all shadow-sm flex items-center gap-2';
    tabStarred.className = 'px-5 py-2.5 rounded-xl font-bold text-xs bg-white text-[#64748B] hover:bg-[#F1F5F9] border border-[#CBD5E1] transition-all flex items-center gap-2';
  }

  renderRevisionVault();
}

function renderRevisionVault() {
  const container = document.getElementById('vault-questions-container');
  if (!container || !state.vaultQuestions) return;

  const currentList = state.vaultQuestions[state.vaultSubTab] || [];

  if (currentList.length === 0) {
    container.innerHTML = `
      <div class="card-surface rounded-2xl p-12 text-center border border-[#E2E8F0] space-y-3">
        <div class="w-12 h-12 rounded-2xl bg-[#F8FAFC] text-[#3781C2] mx-auto flex items-center justify-center font-bold text-xl border border-[#CBD5E1]">
          ${state.vaultSubTab === 'starred' ? '⭐' : '🎯'}
        </div>
        <h4 class="text-base font-bold text-[#003057] font-heading">
          ${state.vaultSubTab === 'starred' ? 'No Starred Questions Yet' : 'No Weak Area Questions Found'}
        </h4>
        <p class="text-xs text-[#64748B] max-w-md mx-auto">
          ${state.vaultSubTab === 'starred' 
            ? 'Click the Star/Bookmark icon on any practice or solution question to add it to your personal Revision Vault.'
            : 'Questions you answer incorrectly during full exams or practice tests will appear here automatically for rapid review.'}
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = currentList.map((q) => {
    const isStarred = state.userBookmarks && state.userBookmarks.has(q.id);

    return `
      <div class="card-surface rounded-2xl p-6 border border-[#E2E8F0] space-y-4 shadow-sm hover:border-[#3781C2]/40 transition-all">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#EBF4FB] text-[#3781C2] border border-[#BFDBFE]">
              ${q.topic || 'General Aptitude'}
            </span>
            <span class="text-xs font-mono font-bold text-[#003057] bg-[#F1F5F9] px-2 py-0.5 rounded">
              ${q.company_tag || `[${q.test_title || 'Mock Test'}]`}
            </span>
            ${state.vaultSubTab === 'weak' ? `<span class="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-[#FEE2E2] text-[#EF4444] border border-[#FECACA]">Previous Error</span>` : ''}
          </div>

          <div class="flex items-center gap-2">
            <button onclick="toggleQuestionBookmark(${q.id})" class="px-3 py-1.5 rounded-lg border border-[#CBD5E1] hover:border-[#FFC412] hover:bg-[#FFF9E6] text-xs font-bold transition-all flex items-center gap-1.5">
              <svg class="w-4 h-4 ${isStarred ? 'text-[#FFC412] fill-current' : 'text-[#CBD5E1]'}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <span>${isStarred ? 'Saved' : 'Star'}</span>
            </button>
            <button onclick="openReattemptModal(${q.id})" class="px-3.5 py-1.5 rounded-lg font-black text-xs bg-[#FFC412] text-[#00223E] hover:bg-[#E5AF0E] transition-all flex items-center gap-1 shadow-sm">
              <span>Re-attempt</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
        </div>

        <div class="text-xs sm:text-sm font-semibold text-[#00223E] leading-relaxed">
          ${formatRichText(q.question_text)}
        </div>

        <details class="text-xs">
          <summary class="cursor-pointer text-[#3781C2] font-bold hover:underline select-none py-1 flex items-center gap-1">
            <span>View Step-by-Step Proof & Formula</span>
          </summary>
          <div class="mt-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
            <div class="font-semibold text-[#065F46] bg-[#E6F4EA] p-2 rounded border border-[#A7F3D0]">
              Correct Option: Option ${q.correct_option}
            </div>
            <div class="text-[#00223E] leading-relaxed font-medium">
              ${formatRichText(q.step_by_step_solution)}
            </div>
            ${q.shortcut_formula ? `
              <div class="p-2.5 rounded-lg bg-[#FFF9E6] border border-[#FFE899] text-[#946C00] font-mono text-[11px] font-bold">
                Formula: ${q.shortcut_formula}
              </div>
            ` : ''}
          </div>
        </details>
      </div>
    `;
  }).join('');
}

// Re-attempt Question Practice Modal Logic
let currentReattemptQuestion = null;

function openReattemptModal(questionId) {
  let q = null;
  if (state.vaultQuestions) {
    q = (state.vaultQuestions.starred || []).find(item => item.id === questionId) ||
        (state.vaultQuestions.weak || []).find(item => item.id === questionId);
  }
  if (!q && state.activeTest && state.activeTest.questions) {
    q = state.activeTest.questions.find(item => item.id === questionId);
  }
  if (!q) return;

  currentReattemptQuestion = q;

  const modal = document.getElementById('reattempt-modal');
  const topicEl = document.getElementById('reattempt-q-topic');
  const textEl = document.getElementById('reattempt-q-text');
  const optsContainer = document.getElementById('reattempt-options-container');
  const solBox = document.getElementById('reattempt-solution-box');

  if (topicEl) topicEl.textContent = `${q.topic} • ${q.company_tag || ''}`;
  if (textEl) textEl.innerHTML = formatRichText(q.question_text);
  if (solBox) solBox.classList.add('hidden');

  const options = [
    { key: 'A', text: q.option_a },
    { key: 'B', text: q.option_b },
    { key: 'C', text: q.option_c },
    { key: 'D', text: q.option_d },
  ];

  optsContainer.innerHTML = options.map(opt => `
    <button 
      class="w-full text-left p-3.5 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#3781C2] hover:bg-[#F8FAFC] flex items-center gap-3 transition-all font-medium text-xs text-[#00223E] reattempt-opt-btn"
      onclick="handleReattemptOption('${opt.key}')"
    >
      <span class="w-6 h-6 rounded-lg bg-[#F1F5F9] text-[#64748B] font-bold text-xs flex items-center justify-center shrink-0 border border-[#CBD5E1]">${opt.key}</span>
      <span>${opt.text}</span>
    </button>
  `).join('');

  if (modal) modal.classList.remove('hidden');
}

function handleReattemptOption(selectedKey) {
  const q = currentReattemptQuestion;
  if (!q) return;

  const solBox = document.getElementById('reattempt-solution-box');
  const buttons = document.querySelectorAll('.reattempt-opt-btn');

  buttons.forEach(btn => {
    btn.disabled = true;
    const key = btn.querySelector('span').textContent.trim();
    if (key === q.correct_option) {
      btn.className = 'w-full text-left p-3.5 rounded-xl border-2 border-[#10B981] bg-[#E6F4EA] flex items-center gap-3 font-bold text-xs text-[#065F46]';
    } else if (key === selectedKey && selectedKey !== q.correct_option) {
      btn.className = 'w-full text-left p-3.5 rounded-xl border-2 border-[#EF4444] bg-[#FEE2E2] flex items-center gap-3 font-bold text-xs text-[#991B1B]';
    }
  });

  if (solBox) {
    solBox.classList.remove('hidden');
    const isCorrect = selectedKey === q.correct_option;
    solBox.innerHTML = `
      <div class="font-bold ${isCorrect ? 'text-[#10B981]' : 'text-[#EF4444]'} flex items-center gap-1.5 text-xs">
        <span>${isCorrect ? '✓ Correct Answer!' : '✗ Incorrect choice.'}</span>
      </div>
      <p class="text-[#00223E] leading-relaxed mt-1">${formatRichText(q.step_by_step_solution)}</p>
      ${q.shortcut_formula ? `<div class="p-2 rounded bg-[#FFF9E6] border border-[#FFE899] text-[#946C00] font-mono text-[11px] mt-2 font-bold">Formula: ${q.shortcut_formula}</div>` : ''}
    `;
  }
}

function closeReattemptModal() {
  const modal = document.getElementById('reattempt-modal');
  if (modal) modal.classList.add('hidden');
  currentReattemptQuestion = null;
}

// ==========================================
// LIVE MEGA CONTESTS ARENA ENGINE
// ==========================================
async function loadMegaEvents() {
  try {
    const res = await api.fetchMegaEvents();
    state.megaEvents = res.mega_events || [];
    renderMegaEventBanner();
  } catch (err) {
    console.error('Error fetching mega events:', err);
  }
}

function renderMegaEventBanner() {
  const container = document.getElementById('hero-mega-event-container');
  if (!container) return;

  if (!state.megaEvents || state.megaEvents.length === 0) {
    container.classList.add('hidden');
    clearInterval(state.megaCountdownInterval);
    return;
  }

  const liveOrUpcoming = state.megaEvents.find(e => e.status === 'LIVE' || e.status === 'UPCOMING') || state.megaEvents[0];
  if (!liveOrUpcoming) {
    container.classList.add('hidden');
    return;
  }

  container.classList.remove('hidden');

  const isLive = liveOrUpcoming.status === 'LIVE';
  const isEnded = liveOrUpcoming.status === 'ENDED';

  container.innerHTML = `
    <div class="relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-2 border-[#FFC412]/50 ${isLive ? 'bg-gradient-to-r from-[#991B1B] via-[#7F1D1D] to-[#003057]' : 'bg-gradient-to-r from-[#003057] via-[#0A4778] to-[#1E3A8A]'}">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${isLive ? 'bg-[#EF4444] text-white animate-pulse' : 'bg-[#FFC412] text-[#00223E]'}">
              ${isLive ? '🔴 LIVE ARENA IN PROGRESS' : isEnded ? '🏁 CONTEST CONCLUDED' : '🔥 SCHEDULED MEGA DRIVE'}
            </span>
            <span class="text-xs text-[#CBD5E1] font-semibold">${liveOrUpcoming.company_tag}</span>
          </div>

          <h3 class="text-xl sm:text-3xl font-black font-heading text-white">
            ${liveOrUpcoming.title}
          </h3>

          <p class="text-xs text-[#E2E8F0] max-w-xl">
            ${liveOrUpcoming.description || 'Compete with engineering candidates across India in this timed mega placement drive.'}
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-4 shrink-0">
          <div class="text-center bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
            <div class="text-[10px] text-[#CBD5E1] font-bold uppercase tracking-wider">${isLive ? 'Arena Closes In' : isEnded ? 'Status' : 'Starts In'}</div>
            <div id="mega-countdown-timer" class="text-xl sm:text-2xl font-black font-mono text-[#FFC412] mt-0.5">
              ${isEnded ? 'ENDED' : '00:00:00'}
            </div>
          </div>

          ${isLive ? `
            <button onclick="launchMegaEventArena(${liveOrUpcoming.id}, ${liveOrUpcoming.test_series})" class="px-6 py-3.5 rounded-2xl font-black text-xs bg-[#FFC412] text-[#00223E] hover:bg-[#E5AF0E] transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2 animate-bounce">
              <span>ENTER ARENA NOW</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </button>
          ` : isEnded ? `
            <button onclick="switchView('leaderboard')" class="px-5 py-3 rounded-2xl font-bold text-xs bg-white text-[#003057] hover:bg-[#F1F5F9] transition-all">
              View Ranks
            </button>
          ` : `
            <button class="px-5 py-3 rounded-2xl font-bold text-xs bg-white/20 text-white border border-white/30 cursor-not-allowed">
              Registrations Open
            </button>
          `}
        </div>
      </div>
    </div>
  `;

  // Start live countdown timer
  clearInterval(state.megaCountdownInterval);
  const targetTime = new Date(isLive ? liveOrUpcoming.end_datetime : liveOrUpcoming.start_datetime).getTime();

  state.megaCountdownInterval = setInterval(() => {
    const diff = targetTime - Date.now();
    const timerEl = document.getElementById('mega-countdown-timer');
    if (!timerEl) return;

    if (diff <= 0) {
      clearInterval(state.megaCountdownInterval);
      loadMegaEvents();
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    timerEl.textContent = d > 0 ? `${d}d ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}` : `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }, 1000);
}

async function launchMegaEventArena(eventId, testSeriesId) {
  state.activeMegaEventId = eventId;
  const test = state.tests.find(t => t.id === testSeriesId);
  if (!test) {
    showToast('Target mega test series loading...', 'info');
  }
  state.selectedTestForSetup = test || { id: testSeriesId };
  selectSetupMode('EXAM');
  await launchSelectedTest();
}

async function handleScheduleMegaContest(e) {
  e.preventDefault();
  const form = e.target;
  
  const payload = {
    user_id: state.currentUser ? state.currentUser.id : null,
    title: form.title.value.trim(),
    test_series_id: form.test_series_id.value,
    start_datetime: form.start_datetime.value,
    end_datetime: form.end_datetime.value,
    duration_minutes: parseInt(form.duration_minutes.value || 30),
    banner_tag: form.banner_tag.value.trim(),
    company_tag: form.company_tag.value.trim()
  };

  try {
    const res = await api.createMegaEvent(payload);
    if (res.error) {
      showToast(res.error, 'error');
      return;
    }
    showToast(res.message || 'Mega Drive Contest scheduled successfully!', 'success');
    form.reset();
    await loadMegaEvents();
    loadAdminDashboard();
  } catch (err) {
    showToast('Network error scheduling mega drive.', 'error');
  }
}

// Live Leaderboard & Profile Modal
async function loadLeaderboard() {
  const userId = state.currentUser ? state.currentUser.id : null;
  try {
    const data = await api.fetchLeaderboard(userId);
    state.leaderboard = data.leaderboard || [];
    state.currentUserRank = data.current_user_rank;
    renderLeaderboardTable();
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    showToast('Failed to load live leaderboard.', 'error');
  }
}

function renderLeaderboardTable() {
  const tbody = document.getElementById('leaderboard-tbody');
  if (!tbody) return;

  const currentUserId = state.currentUser ? state.currentUser.id : null;

  if (state.leaderboard.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="py-16 text-center text-[#64748B]">
          <div class="w-14 h-14 mx-auto mb-3 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] flex items-center justify-center text-[#94A3B8]">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h4 class="text-sm font-bold text-[#003057] mb-1 font-heading">No Placement Test Attempts Recorded Yet</h4>
          <p class="text-xs text-[#64748B] max-w-sm mx-auto mb-4">Be the first candidate to solve a test series and claim Rank #1 on the platform leaderboard!</p>
          <button onclick="switchView('home')" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#FFC412] text-[#00223E] hover:bg-[#E5AF0E] transition-all shadow-sm">
            Take a Test Now
          </button>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = state.leaderboard.map((item) => {
    const isMe = currentUserId && item.id === currentUserId;
    let rankBadge = `#${item.rank}`;
    if (item.rank === 1) rankBadge = `🥇 #1`;
    else if (item.rank === 2) rankBadge = `🥈 #2`;
    else if (item.rank === 3) rankBadge = `🥉 #3`;

    return `
      <tr 
        class="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] cursor-pointer transition-all duration-150 ${isMe ? 'bg-[#EBF4FB] border-l-4 border-l-[#3781C2]' : ''}"
        onclick="openProfileModal('${item.id}')"
      >
        <td class="px-6 py-4 font-black text-sm font-heading ${item.rank <= 3 ? 'text-[#003057]' : 'text-[#64748B]'}">
          ${rankBadge}
        </td>
        <td class="px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-[#003057] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
              ${item.full_name.charAt(0)}
            </div>
            <div>
              <div class="font-bold text-sm text-[#00223E] hover:text-[#3781C2] flex items-center gap-2">
                ${item.full_name}
                ${isMe ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#3781C2] text-white">YOU</span>` : ''}
              </div>
              <div class="text-xs text-[#64748B] line-clamp-1">${item.college || 'Campus Aspirant'}</div>
            </div>
          </div>
        </td>
        <td class="px-6 py-4 text-center text-xs font-semibold text-[#64748B] hidden sm:table-cell">
          ${item.total_tests || 0}
        </td>
        <td class="px-6 py-4 text-center text-xs font-semibold text-[#003057] hidden md:table-cell">
          ${item.accuracy_percentage || 0}%
        </td>
        <td class="px-6 py-4 text-right">
          <span class="font-black text-sm text-[#946C00] font-heading bg-[#FFF9E6] px-3 py-1.5 rounded-lg border border-[#FFE899]">
            ${item.total_points || 0} pts
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

// State Persistence Engine (Anti-Crash & Refresh Protection)
function saveActiveSession() {
  if (!state.activeTest || state.currentView !== 'test-engine') return;
  const session = {
    testId: state.activeTest.id,
    testMode: state.testMode,
    currentQuestionIndex: state.currentQuestionIndex,
    userResponses: state.userResponses,
    practiceRevealed: state.practiceRevealed,
    examSecondsRemaining: state.examSecondsRemaining,
    questionSecondsRemaining: state.questionSecondsRemaining,
    totalExamSeconds: state.totalExamSeconds,
    practiceTimerSeconds: state.practiceTimerSeconds,
    testStartTime: state.testStartTime,
    questionStartTime: state.questionStartTime,
    savedAt: Date.now()
  };
  localStorage.setItem('firstround_active_session', JSON.stringify(session));
}

function clearActiveSession() {
  localStorage.removeItem('firstround_active_session');
}

async function checkAndRestoreActiveSession() {
  const saved = localStorage.getItem('firstround_active_session');
  if (!saved || !state.currentUser) return;

  try {
    const session = JSON.parse(saved);
    if (!session || !session.testId) return;

    const elapsedSecs = Math.floor((Date.now() - (session.savedAt || Date.now())) / 1000);
    const fullTest = await api.fetchTestDetail(session.testId);
    if (!fullTest || !fullTest.questions || fullTest.questions.length === 0) {
      clearActiveSession();
      return;
    }

    state.activeTest = fullTest;
    state.testMode = session.testMode || 'EXAM';
    state.currentQuestionIndex = Math.min(session.currentQuestionIndex || 0, fullTest.questions.length - 1);
    state.userResponses = session.userResponses || {};
    state.practiceRevealed = session.practiceRevealed || {};
    state.practiceTimerSeconds = session.practiceTimerSeconds || 0;
    state.totalExamSeconds = session.totalExamSeconds || (fullTest.questions.length * 60);
    state.testStartTime = session.testStartTime || Date.now();
    state.questionStartTime = Date.now();

    if (state.testMode === 'EXAM') {
      state.examSecondsRemaining = Math.max(10, (session.examSecondsRemaining || state.totalExamSeconds) - elapsedSecs);
      startExamTimer();
    } else {
      state.questionSecondsRemaining = Math.max(5, (session.questionSecondsRemaining || session.practiceTimerSeconds) - elapsedSecs);
      startPracticeQuestionTimer();
    }

    switchView('test-engine');
    renderQuestionEngine();
    showToast('Ongoing test session restored smoothly!', 'success');
  } catch (err) {
    console.error('Error restoring active session:', err);
    clearActiveSession();
  }
}

// Profile Modal
async function openProfileModal(userId) {
  const modal = document.getElementById('student-profile-modal');
  if (!modal) return;

  try {
    const data = await api.fetchUserProfile(userId);
    const candidate = data.user;
    if (!candidate) return;

    document.getElementById('modal-profile-name').textContent = candidate.full_name;
    document.getElementById('modal-profile-college').textContent = candidate.college || 'University Candidate';
    document.getElementById('modal-profile-rank').textContent = candidate.rank ? `#${candidate.rank}` : '#--';
    document.getElementById('modal-profile-points').textContent = `${candidate.total_points || 0} Points`;
    document.getElementById('modal-profile-tests').textContent = `${candidate.total_tests || 0} Tests`;
    document.getElementById('modal-profile-correct').textContent = `${candidate.total_correct || 0} Correct`;
    document.getElementById('modal-profile-accuracy').textContent = `${candidate.accuracy_percentage || 0}%`;

    modal.classList.remove('hidden');
  } catch (err) {
    console.error('Error opening profile:', err);
    showToast('Failed to load student profile.', 'error');
  }
}

function closeProfileModal() {
  const modal = document.getElementById('student-profile-modal');
  if (modal) modal.classList.add('hidden');
}

// Admin Dashboard Management
async function loadAdminDashboard() {
  if (!state.currentUser || !state.currentUser.is_staff) {
    showToast('Unauthorized access to Admin Dashboard.', 'error');
    switchView('home');
    return;
  }

  try {
    const stats = await api.fetchAdminStats(state.currentUser.id);
    state.adminStats = stats;
    renderAdminStats();

    const members = await api.fetchAdminMembers(state.currentUser.id);
    state.adminMembers = members.members || [];
    renderAdminMembersTable();
    populateAdminTestSelect();
  } catch (err) {
    console.error('Error loading admin panel:', err);
    showToast('Failed to load admin metrics.', 'error');
  }
}

function renderAdminStats() {
  const stats = state.adminStats;
  if (!stats) return;

  document.getElementById('admin-stat-students').textContent = stats.total_students || 0;
  document.getElementById('admin-stat-tests').textContent = stats.total_tests || 0;
  document.getElementById('admin-stat-questions').textContent = stats.total_questions || 0;
  document.getElementById('admin-stat-attempts').textContent = stats.total_attempts || 0;
  document.getElementById('admin-stat-acc').textContent = `${stats.avg_platform_accuracy || 0}%`;
}

function renderAdminMembersTable() {
  const tbody = document.getElementById('admin-members-tbody');
  if (!tbody) return;

  tbody.innerHTML = state.adminMembers.map((m, idx) => `
    <tr class="border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
      <td class="px-4 py-3 text-xs text-[#64748B]">#${idx + 1}</td>
      <td class="px-4 py-3">
        <div class="font-bold text-xs text-[#003057]">${m.full_name}</div>
        <div class="text-[11px] text-[#64748B] font-mono">${m.email}</div>
      </td>
      <td class="px-4 py-3 text-xs text-[#64748B]">${m.college || '--'}</td>
      <td class="px-4 py-3 text-center text-xs font-semibold text-[#64748B]">${m.total_tests || 0}</td>
      <td class="px-4 py-3 text-center text-xs font-semibold text-[#003057]">${m.accuracy_percentage || 0}%</td>
      <td class="px-4 py-3 text-right font-black text-xs text-[#946C00]">${m.total_points || 0} pts</td>
      <td class="px-4 py-3 text-center">
        ${m.is_staff ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FEE2E2] text-[#EF4444] border border-[#FECACA]">ADMIN</span>` : `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EBF4FB] text-[#3781C2] border border-[#BFDBFE]">STUDENT</span>`}
      </td>
    </tr>
  `).join('');
}

function populateAdminTestSelect() {
  const selectQ = document.getElementById('admin-q-test-select');
  const selectCSV = document.getElementById('admin-csv-test-select');

  const optionsHTML = state.tests.map(t => `
    <option value="${t.id}">${t.title} (${t.company_name} ${t.year}) [${t.total_questions || 25} Qs]</option>
  `).join('');

  if (selectQ) selectQ.innerHTML = optionsHTML;
  if (selectCSV) selectCSV.innerHTML = optionsHTML;
}

async function handleCreateTestAdmin(e) {
  e.preventDefault();
  const form = e.target;
  const payload = {
    user_id: state.currentUser.id,
    title: form.title.value.trim(),
    company_name: form.company_name.value.trim(),
    year: form.year.value.trim(),
    test_type: form.test_type.value,
    topic_category: form.topic_category.value.trim(),
    description: form.description.value.trim(),
    duration_minutes: parseInt(form.duration_minutes.value) || 25
  };

  try {
    const res = await api.createAdminTest(payload);
    showToast('Test series created successfully!', 'success');
    form.reset();
    await loadTestsCatalog();
    loadAdminDashboard();
  } catch (err) {
    showToast('Failed to create test series.', 'error');
  }
}

async function handleAddQuestionAdmin(e) {
  e.preventDefault();
  const form = e.target;
  const payload = {
    user_id: state.currentUser.id,
    test_id: parseInt(form.test_id.value),
    topic: form.topic.value.trim(),
    company_tag: form.company_tag.value.trim(),
    year_tag: form.year_tag.value.trim(),
    question_text: form.question_text.value.trim(),
    option_a: form.option_a.value.trim(),
    option_b: form.option_b.value.trim(),
    option_c: form.option_c.value.trim(),
    option_d: form.option_d.value.trim(),
    correct_option: form.correct_option.value,
    step_by_step_solution: form.step_by_step_solution.value.trim(),
    shortcut_formula: form.shortcut_formula.value.trim()
  };

  try {
    const res = await api.addAdminQuestion(payload);
    showToast('Question added to test series!', 'success');
    form.reset();
    populateAdminTestSelect();
    loadAdminDashboard();
  } catch (err) {
    showToast('Failed to add question.', 'error');
  }
}

async function handleBulkCSVSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  formData.append('user_id', state.currentUser.id);

  const statusLabel = document.getElementById('admin-csv-status-label');
  const logsContainer = document.getElementById('admin-csv-logs-container');
  const logsList = document.getElementById('admin-csv-logs-list');
  const summaryBadge = document.getElementById('admin-csv-summary-badge');

  if (statusLabel) statusLabel.textContent = 'Importing questions...';

  try {
    const res = await api.uploadBulkCSV(formData);
    if (res.error) {
      showToast(res.error, 'error');
      if (statusLabel) statusLabel.textContent = 'Import failed.';
      return;
    }

    showToast(res.message, 'success');
    if (statusLabel) statusLabel.textContent = `Imported: ${res.imported_count}, Skipped: ${res.skipped_count}`;

    if (logsContainer && logsList) {
      logsContainer.classList.remove('hidden');
      if (summaryBadge) summaryBadge.textContent = `${res.imported_count} Added / ${res.skipped_count} Skipped`;
      logsList.innerHTML = (res.logs && res.logs.length > 0)
        ? res.logs.map(l => `<div>• ${l}</div>`).join('')
        : '<div class="text-[#10B981]">All question rows passed validation and were successfully inserted!</div>';
    }

    form.reset();
    await loadTestsCatalog();
    loadAdminDashboard();
  } catch (err) {
    console.error('Error importing CSV:', err);
    showToast('Network error importing CSV.', 'error');
    if (statusLabel) statusLabel.textContent = 'Network error.';
  }
}

function downloadSampleCSV() {
  const sampleCSV = `test_id,topic,question_text,option_a,option_b,option_c,option_d,correct_option,step_by_step_solution,shortcut_formula
1,Time & Work,"A can do a piece of work in 10 days and B in 15 days. Working together, in how many days will they finish?","6 days","8 days","5 days","7.5 days","A","Total work = LCM(10, 15) = 30 units. Eff A = 3, Eff B = 2. Time = 30 / (3+2) = 6 days.","(A * B) / (A + B)"
1,Percentages,"If price of a commodity increases by 25%, by what percentage must consumption decrease to keep expenditure constant?","20%","25%","15%","18%","A","Expenditure = Price * Consumption. Reduction% = [r / (100 + r)] * 100 = [25 / 125] * 100 = 20%.","[r / (100 + r)] * 100"`;

  const blob = new Blob([sampleCSV], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'firstround_question_import_sample.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function handleGenerateTestFromFile(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  formData.append('user_id', state.currentUser.id);

  const statusLabel = document.getElementById('admin-file-gen-status');
  const submitBtn = document.getElementById('admin-file-gen-submit-btn');
  const logsContainer = document.getElementById('admin-file-gen-logs-container');
  const logsList = document.getElementById('admin-file-gen-logs-list');
  const summaryBadge = document.getElementById('admin-file-gen-summary-badge');

  if (statusLabel) statusLabel.textContent = 'Parsing file & generating test series...';
  if (submitBtn) submitBtn.disabled = true;

  try {
    const res = await api.generateTestFromFile(formData);
    if (res.error) {
      showToast(res.error, 'error');
      if (statusLabel) statusLabel.textContent = 'Generation failed.';
      return;
    }

    showToast(res.message, 'success');
    if (statusLabel) statusLabel.textContent = `Generated: ${res.imported_count} Questions.`;

    if (logsContainer && logsList) {
      logsContainer.classList.remove('hidden');
      if (summaryBadge) summaryBadge.textContent = `${res.imported_count} Questions Extracted`;
      logsList.innerHTML = (res.logs && res.logs.length > 0)
        ? res.logs.map(l => `<div>• ${l}</div>`).join('')
        : '<div class="text-[#10B981]">Test series created and published to student dashboard!</div>';
    }

    form.reset();
    const fileLabel = document.getElementById('admin-file-gen-selected-name');
    if (fileLabel) fileLabel.textContent = 'Supports MS Word standard placement questions (Q1, A, B, C, D, Answer, Explanation) and CSV format';

    await loadTestsCatalog();
    loadAdminDashboard();
  } catch (err) {
    console.error('Error generating test from file:', err);
    showToast('Network error while generating test from file.', 'error');
    if (statusLabel) statusLabel.textContent = 'Network error.';
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
}

// ==========================================
// TEST INTEGRITY & ANTI-CHEATING ENGINE
// ==========================================
let lastTabSwitchTimestamp = 0;

function handleTabSwitchOrBlur(triggerSource) {
  // Only monitor during Exam Simulation Mode in active test engine
  if (state.currentView !== 'test-engine' || state.testMode !== 'EXAM' || !state.activeTest) {
    return;
  }

  const now = Date.now();
  // Debounce multiple concurrent events (visibilitychange + window blur) within 1500ms
  if (now - lastTabSwitchTimestamp < 1500) {
    return;
  }
  lastTabSwitchTimestamp = now;

  state.tabSwitchCount = (state.tabSwitchCount || 0) + 1;
  saveActiveSession();

  const tabBadge = document.getElementById('engine-tab-switch-badge');
  if (tabBadge) {
    tabBadge.classList.remove('hidden');
    tabBadge.textContent = `⚠️ Tab Switch: ${state.tabSwitchCount}/2`;
  }

  if (state.tabSwitchCount === 1) {
    showToast('⚠️ Warning: Tab switch detected (1/2). Switching tabs or minimizing again will auto-submit the exam!', 'error');
  } else if (state.tabSwitchCount >= 2) {
    state.integrityFlag = true;
    state.submissionReason = 'Submitted with integrity flags (Multiple tab switches detected)';
    showToast('🚨 Maximum tab switches exceeded! Submitting test automatically with integrity flags...', 'error');
    submitCurrentTest(true);
  }
}

// 1. Tab visibility change detector
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    handleTabSwitchOrBlur('visibilitychange');
  }
});

// 2. Window blur detector
window.addEventListener('blur', () => {
  handleTabSwitchOrBlur('blur');
});

// 3. Disable Right-Click (Inspect Element / Context Menu) during active test
document.addEventListener('contextmenu', (e) => {
  if (state.currentView === 'test-engine') {
    e.preventDefault();
    showToast('Right-click is disabled during placement tests.', 'error');
  }
});

// 4. Disable Copy & Cut during active test
document.addEventListener('copy', (e) => {
  if (state.currentView === 'test-engine') {
    e.preventDefault();
    showToast('Copying question content is prohibited during placement tests.', 'error');
  }
});

document.addEventListener('cut', (e) => {
  if (state.currentView === 'test-engine') {
    e.preventDefault();
  }
});

// 5. Disable Inspection and DevTools Shortcuts during active test
document.addEventListener('keydown', (e) => {
  if (state.currentView === 'test-engine') {
    // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+C
    const isCtrlOrMeta = e.ctrlKey || e.metaKey;
    const isShift = e.shiftKey;
    const key = e.key ? e.key.toLowerCase() : '';

    if (
      e.key === 'F12' ||
      (isCtrlOrMeta && isShift && (key === 'i' || key === 'j' || key === 'c')) ||
      (isCtrlOrMeta && (key === 'u' || key === 'c' || key === 's' || key === 'p'))
    ) {
      e.preventDefault();
      showToast('Keyboard shortcuts are disabled during test for integrity.', 'error');
    }
  }
});

function populateAdminTestSelect() {
  const selectQ = document.getElementById('admin-q-test-select');
  const selectCSV = document.getElementById('admin-csv-test-select');
  const selectMega = document.getElementById('admin-mega-test-select');

  const optionsHTML = state.tests.map(t => `
    <option value="${t.id}">${t.title} (${t.company_name} ${t.year}) [${t.total_questions || 25} Qs]</option>
  `).join('');

  if (selectQ) selectQ.innerHTML = optionsHTML;
  if (selectCSV) selectCSV.innerHTML = optionsHTML;
  if (selectMega) selectMega.innerHTML = optionsHTML;
}

// Global Initialization
window.addEventListener('DOMContentLoaded', () => {
  checkAuthGate();
  
  if (state.currentUser) {
    loadTestsCatalog().then(() => {
      checkAndRestoreActiveSession();
      loadMegaEvents();
    });
    loadLeaderboard();
    loadUserBookmarks();
  }

  const gateForm = document.getElementById('gate-auth-form');
  if (gateForm) gateForm.addEventListener('submit', handleGateAuthSubmit);

  const searchInput = document.getElementById('test-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderTestsGrid();
    });
  }

  const fileGenForm = document.getElementById('admin-generate-file-form');
  if (fileGenForm) fileGenForm.addEventListener('submit', handleGenerateTestFromFile);

  const fileGenInput = document.getElementById('admin-file-gen-input');
  if (fileGenInput) {
    fileGenInput.addEventListener('change', (e) => {
      const fileLabel = document.getElementById('admin-file-gen-selected-name');
      if (fileLabel && e.target.files && e.target.files.length > 0) {
        fileLabel.innerHTML = `Selected File: <strong class="text-[#003057]">${e.target.files[0].name}</strong> (${Math.round(e.target.files[0].size / 1024)} KB)`;
      }
    });
  }

  const testForm = document.getElementById('admin-create-test-form');
  if (testForm) testForm.addEventListener('submit', handleCreateTestAdmin);

  const qForm = document.getElementById('admin-add-question-form');
  if (qForm) qForm.addEventListener('submit', handleAddQuestionAdmin);

  const csvForm = document.getElementById('admin-bulk-csv-form');
  if (csvForm) csvForm.addEventListener('submit', handleBulkCSVSubmit);

  const megaForm = document.getElementById('admin-schedule-mega-form');
  if (megaForm) megaForm.addEventListener('submit', handleScheduleMegaContest);
});

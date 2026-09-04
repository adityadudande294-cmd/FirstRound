import React, { useEffect, useState } from 'react';
import {
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  GraduationCap,
  Mail,
  ShieldCheck,
  Sparkles,
  User as UserIcon,
  X,
  Zap,
} from 'lucide-react';
import { User } from '../types';
import { TARGET_COMPANIES, TARGET_ROLES } from './UserProfileModal';

export interface AuthModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSuccess?: (user: User) => void;
  onSelectUser?: (user: User) => void;
  currentUserId?: string;
  initialMode?: 'register' | 'login';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen = true,
  onClose,
  onSuccess,
  onSelectUser,
  currentUserId,
  initialMode = 'register',
}) => {
  const [activeTab, setActiveTab] = useState<'register' | 'login'>(initialMode);
  const [liveUsers, setLiveUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [targetCompany, setTargetCompany] = useState('TCS');
  const [targetRole, setTargetRole] = useState('Software Developer');
  const [loading, setLoading] = useState(false);
  const [fetchingUsers, setFetchingUsers] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (isOpen) {
      fetchLiveUsers();
    }
  }, [isOpen]);

  const fetchLiveUsers = async () => {
    try {
      setFetchingUsers(true);
      const res = await fetch('/api/users');
      const data = await res.json();
      if (data.users) {
        setLiveUsers(data.users);
      }
    } catch (err) {
      console.error('Failed to fetch live users:', err);
    } finally {
      setFetchingUsers(false);
    }
  };

  if (isOpen === false) return null;

  const handleCompleteAuth = (user: User) => {
    if (onSelectUser) onSelectUser(user);
    if (onSuccess) onSuccess(user);
    onClose();
  };

  const handleSelectLiveUser = async (selectedUser: User) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login-or-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: selectedUser.email,
          name: selectedUser.name,
          college: selectedUser.college,
          targetCompany: selectedUser.targetCompany,
          targetRole: selectedUser.targetRole,
          role: selectedUser.role,
        }),
      });
      const data = await res.json();
      if (data.user) {
        handleCompleteAuth(data.user);
      } else {
        throw new Error(data.error || 'Failed to authenticate');
      }
    } catch (err: any) {
      setError(err.message || 'Error signing in');
    } finally {
      setLoading(false);
    }
  };

  const handleDirectEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address to sign in.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login-or-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });
      const data = await res.json();
      if (data.user) {
        handleCompleteAuth(data.user);
      } else {
        throw new Error(data.error || 'User not found. Please register.');
      }
    } catch (err: any) {
      setError(err.message || 'Error signing in');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) {
      setError('Please provide your full name and valid email address.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login-or-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          college: college.trim(),
          targetCompany: targetCompany.trim(),
          targetRole: targetRole.trim(),
          role: email.toLowerCase() === 'aadi@gmail.com' ? 'admin' : 'student',
        }),
      });
      const data = await res.json();
      if (data.user) {
        handleCompleteAuth(data.user);
      } else {
        throw new Error(data.error || 'Failed to create candidate profile');
      }
    } catch (err: any) {
      setError(err.message || 'Error registering profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in"
    >
      <div
        id="auth-modal"
        className="bg-white border border-slate-200 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden text-slate-900 my-8"
      >
        {/* Header */}
        <div className="p-6 bg-primary border-b border-primary-dark text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-['Outfit'] text-white">FirstRound Candidate Access</h2>
              <p className="text-xs text-slate-300">Sign in to start practicing placement assessments</p>
            </div>
          </div>
          <button
            id="close-auth-modal-btn"
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold">
          <button
            onClick={() => {
              setActiveTab('register');
              setError(null);
            }}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              activeTab === 'register'
                ? 'border-amber-400 bg-white text-primary'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Register New Candidate
          </button>
          <button
            onClick={() => {
              setActiveTab('login');
              setError(null);
            }}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              activeTab === 'login'
                ? 'border-amber-400 bg-white text-primary'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In / Switch Profile
          </button>
        </div>

        <div className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-semibold">
              {error}
            </div>
          )}

          {activeTab === 'register' ? (
            /* Registration Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="register-name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Pawan Khot"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-primary shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="register-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. pawankhot9@gmail.com"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-primary shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    College / University
                  </label>
                  <input
                    id="register-college-input"
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. PICT Pune"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-primary shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Company
                  </label>
                  <select
                    id="register-target-company-select"
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-primary shadow-xs"
                  >
                    {TARGET_COMPANIES.map((comp) => (
                      <option key={comp} value={comp}>
                        {comp}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Role (Optional)
                </label>
                <select
                  id="register-target-role-select"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-primary shadow-xs"
                >
                  <option value="">Select target role...</option>
                  {TARGET_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <button
                id="submit-register-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 mt-2"
              >
                {loading ? 'Creating Candidate Profile...' : 'Register Profile & Enter FirstRound'}
              </button>
            </form>
          ) : (
            /* Sign In / Switch Profile Form */
            <div className="space-y-5">
              {/* Quick Profile Select */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Existing Candidates:</span>
                  <span className="text-[11px] text-slate-500 font-normal">
                    {fetchingUsers ? 'Fetching candidates...' : `${liveUsers.length} profile(s)`}
                  </span>
                </div>

                {liveUsers.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-52 overflow-y-auto pr-1">
                    {liveUsers.map((user) => {
                      const isCurrent = currentUserId === user.id;
                      return (
                        <button
                          key={user.id}
                          onClick={() => handleSelectLiveUser(user)}
                          disabled={loading}
                          className={`p-3 rounded-2xl border text-left transition-all relative ${
                            isCurrent
                              ? 'bg-amber-50/80 border-amber-400 shadow-xs'
                              : 'bg-white hover:bg-slate-50 border-slate-200'
                          }`}
                        >
                          {isCurrent && (
                            <span className="absolute top-2.5 right-2.5 text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                              Active
                            </span>
                          )}
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary text-amber-400 font-extrabold text-xs flex items-center justify-center shrink-0">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0 pr-6">
                              <div className="flex items-center gap-1.5">
                                <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                                {user.role === 'admin' && (
                                  <span className="px-1.5 py-0.2 bg-purple-100 text-purple-800 text-[9px] font-extrabold rounded">
                                    Admin
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 truncate">
                                {user.college || 'College not added'}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                            <span className="text-slate-600 font-medium truncate max-w-[110px]">
                              {user.targetCompany || 'Placement Prep'}
                            </span>
                            <span className="text-emerald-700 font-bold">
                              {user.averageAccuracy || 0}% Acc
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center">
                    <p className="text-xs text-slate-600 font-medium">No candidate accounts created yet.</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Switch to "Register New Candidate" above to create your profile.
                    </p>
                  </div>
                )}
              </div>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full"></div>
                <span className="bg-white px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider absolute">
                  Or Sign In by Email
                </span>
              </div>

              <form onSubmit={handleDirectEmailLogin} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Registered Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. pawankhot9@gmail.com"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-primary shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Checking Account...' : 'Sign In with Email'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

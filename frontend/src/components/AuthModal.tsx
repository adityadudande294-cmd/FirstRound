import React, { useEffect, useState } from 'react';
import {
  Lock,
  Mail,
  User as UserIcon,
  GraduationCap,
  Sparkles,
  Zap,
  X,
  ArrowRight,
  KeyRound
} from 'lucide-react';
import { User } from '../types';
import { apiLogin, apiRegister } from '../api';

export interface AuthModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSuccess?: (user: User, redirectHint?: string) => void;
  onSelectUser?: (user: User, redirectHint?: string) => void;
  currentUserId?: string;
  initialMode?: 'register' | 'login';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen = true,
  onClose,
  onSuccess,
  onSelectUser,
  currentUserId,
  initialMode = 'login',
}) => {
  const [activeTab, setActiveTab] = useState<'register' | 'login'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [college, setCollege] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(initialMode);
    setError(null);
  }, [initialMode, isOpen]);

  if (isOpen === false) return null;

  const handleCompleteAuth = (user: User, redirectHint?: string) => {
    if (onSelectUser) onSelectUser(user, redirectHint);
    if (onSuccess) onSuccess(user, redirectHint);
    onClose();
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please provide both your registered email and password.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await apiLogin({
        email: email.trim(),
        password: password,
      });
      if (res && res.user) {
        handleCompleteAuth(res.user, res.redirect);
      } else {
        throw new Error('Authentication returned an invalid response.');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password || !fullName.trim()) {
      setError('Please provide your full name, valid email, and secure password.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await apiRegister({
        email: email.trim(),
        password: password,
        fullName: fullName.trim(),
        college: college.trim(),
      });
      if (res && res.user) {
        handleCompleteAuth(res.user, 'home');
      } else {
        throw new Error('Registration failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. An account with this email may already exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md p-4 flex items-center justify-center animate-in fade-in duration-200"
    >
      <div
        id="auth-modal"
        className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden text-slate-900 my-8 animate-in zoom-in-95 duration-200"
      >
        {/* Modal Brand Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-['Outfit'] tracking-tight text-white flex items-center gap-2">
                FirstRound Access
                <span className="text-[10px] font-extrabold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                  Unified Auth
                </span>
              </h2>
              <p className="text-xs text-slate-400">Campus Placement Mock Assessment & Administration</p>
            </div>
          </div>
          <button
            id="close-auth-modal-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold">
          <button
            onClick={() => {
              setActiveTab('login');
              setError(null);
            }}
            className={`flex-1 py-3.5 text-center transition-colors border-b-2 flex items-center justify-center gap-2 ${
              activeTab === 'login'
                ? 'border-amber-500 bg-white text-slate-900 shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            Sign In
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
              setError(null);
            }}
            className={`flex-1 py-3.5 text-center transition-colors border-b-2 flex items-center justify-center gap-2 ${
              activeTab === 'register'
                ? 'border-amber-500 bg-white text-slate-900 shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <UserIcon className="w-3.5 h-3.5" />
            Create Student Account
          </button>
        </div>

        <div className="p-6 space-y-5">
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 font-semibold flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
              <span>{error}</span>
            </div>
          )}

          {activeTab === 'login' ? (
            /* Sign In Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="login-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="login-password-input"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your account password"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-xs"
                  />
                </div>
              </div>

              <button
                id="submit-login-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    Authenticating...
                  </span>
                ) : (
                  <>
                    <span>Sign In to FirstRound</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Registration Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="register-name-input"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aditya Dudande"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="register-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. aditya@college.edu"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Create Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="register-password-input"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 4 characters"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  College / Institution Name
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="register-college-input"
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. Pune Institute of Computer Technology"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-xs"
                  />
                </div>
              </div>

              <button
                id="submit-register-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-950/20 border-t-slate-950 rounded-full animate-spin"></span>
                    Creating Account...
                  </span>
                ) : (
                  <>
                    <span>Create Student Account</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

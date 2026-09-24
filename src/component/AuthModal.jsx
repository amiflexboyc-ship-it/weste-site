import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  HeartHandshake
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { login, signup, resetPassword } = useAuth();
  const { showToast } = useToast();

  const [mode, setMode] = useState(initialMode); // 'login' | 'signup' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Wildlife Enthusiast');
  const [rememberMe, setRememberMe] = useState(true);

  // Sync mode with prop when opened
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMessage('');
      setSuccessMessage('');
      setShowPassword(false);
    }
  }, [isOpen, initialMode]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Calculate password strength
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'bg-slate-700' };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 2) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (score <= 4) return { score: 2, label: 'Good', color: 'bg-amber-500' };
    return { score: 3, label: 'Strong & Secure', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);

  // Handle 1-click Demo Account login
  const handleQuickDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const loggedUser = await login(email, password, rememberMe);
        showToast(`Welcome back, ${loggedUser.name}!`, 'success');
        onClose();
      } else if (mode === 'signup') {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match. Please re-enter your password.');
        }
        const newUser = await signup({ name, email, password, role });
        showToast(`Account created successfully! Welcome to WESTE, ${newUser.name}.`, 'success');
        onClose();
      } else if (mode === 'forgot') {
        await resetPassword(email, password);
        setSuccessMessage('Password reset successfully! You can now sign in with your new password.');
        showToast('Password updated successfully. Please log in.', 'success');
        setTimeout(() => {
          setMode('login');
          setSuccessMessage('');
        }, 1800);
      }
    } catch (err) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Dark blur backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-200">
        {/* Glow Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 mb-3 shadow-inner">
              {mode === 'signup' ? (
                <Sparkles className="w-7 h-7 text-indigo-400" />
              ) : mode === 'forgot' ? (
                <ShieldCheck className="w-7 h-7 text-blue-400" />
              ) : (
                <HeartHandshake className="w-7 h-7 text-blue-400" />
              )}
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">
              {mode === 'login' && 'Welcome Back'}
              {mode === 'signup' && 'Create Your Account'}
              {mode === 'forgot' && 'Reset Your Password'}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {mode === 'login' && 'Sign in to access your animal favorites, adoptions, and care reports.'}
              {mode === 'signup' && 'Join our animal rescue and wildlife conservation community.'}
              {mode === 'forgot' && 'Enter your email and create a new secure password.'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          {mode !== 'forgot' && (
            <div className="flex bg-slate-800/80 p-1 rounded-2xl mb-6 border border-slate-700/60">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage('');
                }}
                className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  mode === 'login'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage('');
                }}
                className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  mode === 'signup'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          {/* Error Alert Box */}
          {errorMessage && (
            <div className="flex items-start gap-3 p-3.5 mb-5 rounded-xl bg-rose-950/70 border border-rose-600/40 text-rose-200 text-sm animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">{errorMessage}</div>
            </div>
          )}

          {/* Success Alert Box */}
          {successMessage && (
            <div className="flex items-start gap-3 p-3.5 mb-5 rounded-xl bg-emerald-950/70 border border-emerald-600/40 text-emerald-200 text-sm animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1">{successMessage}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name (Sign Up only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Lin"
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>
            </div>

            {/* Role selection (Sign up only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                  Community Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                >
                  <option value="Wildlife Enthusiast">Wildlife Enthusiast</option>
                  <option value="Animal Adopter">Animal Adopter</option>
                  <option value="Sanctuary Volunteer">Sanctuary Volunteer</option>
                  <option value="Veterinary Partner">Veterinary Partner</option>
                </select>
              </div>
            )}

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">
                  {mode === 'forgot' ? 'New Password' : 'Password'}
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setErrorMessage('');
                    }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline transition"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'forgot' ? 'Enter new password' : '••••••••'}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl py-2.5 pl-10 pr-11 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength meter (Sign Up & Reset) */}
              {(mode === 'signup' || mode === 'forgot') && password.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Strength:</span>
                    <span className="font-medium text-slate-200">{strength.label}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 h-1.5">
                    <div
                      className={`h-full rounded-full transition-colors ${
                        strength.score >= 1 ? strength.color : 'bg-slate-700'
                      }`}
                    />
                    <div
                      className={`h-full rounded-full transition-colors ${
                        strength.score >= 2 ? strength.color : 'bg-slate-700'
                      }`}
                    />
                    <div
                      className={`h-full rounded-full transition-colors ${
                        strength.score >= 3 ? strength.color : 'bg-slate-700'
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password (Sign up only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>
            )}

            {/* Remember Me (Login only) */}
            {mode === 'login' && (
              <div className="flex items-center justify-between text-sm pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                  />
                  <span>Remember my device</span>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-900/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition transform active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>
                    {mode === 'login' && 'Sign In to Account'}
                    {mode === 'signup' && 'Create Account'}
                    {mode === 'forgot' && 'Save New Password'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Back to login option if in forgot mode */}
          {mode === 'forgot' && (
            <div className="text-center mt-5">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage('');
                }}
                className="text-xs text-slate-400 hover:text-white underline transition"
              >
                Back to Sign In
              </button>
            </div>
          )}

          {/* Quick Demo Logins Section */}
          {mode === 'login' && (
            <div className="mt-6 pt-5 border-t border-slate-800 text-center">
              <p className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-3">
                Quick 1-Click Demo Accounts
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('sarah@animals.org', 'AnimalCare2026!')}
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 text-left transition flex flex-col"
                >
                  <span className="font-semibold text-blue-400 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 inline" /> Sarah (Care)
                  </span>
                  <span className="text-[11px] text-slate-400 truncate">sarah@animals.org</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('alex@weste.org', 'WildSafe123!')}
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 text-left transition flex flex-col"
                >
                  <span className="font-semibold text-indigo-400 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 inline" /> Alex (Adopter)
                  </span>
                  <span className="text-[11px] text-slate-400 truncate">alex@weste.org</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

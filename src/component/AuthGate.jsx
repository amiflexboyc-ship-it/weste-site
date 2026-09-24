import React, { useState } from 'react';
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Heart,
  ChevronRight,
  Check
} from 'lucide-react';
import { FaRecycle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const AuthGate = () => {
  const { login, signup, resetPassword } = useAuth();
  const { showToast } = useToast();

  const [mode, setMode] = useState('signup'); // Default to 'signup' as requested
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Wildlife Enthusiast');
  const [rememberMe, setRememberMe] = useState(true);

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

  const handleQuickDemo = (demoEmail, demoPass) => {
    setMode('login');
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
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match. Please re-enter your password.');
        }
        const newUser = await signup({ name, email, password, role });
        showToast(
          `🎉 Account created successfully! Welcome to WESTE Animals, ${newUser.name}.`,
          'success'
        );
      } else if (mode === 'login') {
        const loggedUser = await login(email, password, rememberMe);
        showToast(`Welcome back, ${loggedUser.name}! Access granted.`, 'success');
      } else if (mode === 'forgot') {
        await resetPassword(email, password);
        setSuccessMessage('Password reset successfully! Please sign in with your new password.');
        showToast('Password updated successfully. Please log in.', 'success');
        setTimeout(() => {
          setMode('login');
          setSuccessMessage('');
        }, 1800);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Notice */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
            <FaRecycle className="text-lg text-blue-400" />
          </div>
          <span className="text-xl font-black text-white tracking-wider">
            WESTE <span className="text-blue-500">ANIMALS</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          <span>Restricted Portal • Sign Up Required to Access</span>
        </div>
      </header>

      {/* Main Split Section */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row items-center justify-center gap-12 z-10">
        {/* Left Side: Brand Story & Mission */}
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Member-Only Sanctuary & Wildlife Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
            Create an Account to Access <span className="text-blue-500">WESTE Animals</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            To ensure the safety of our rescue animals and maintain verified adoption records, visitors must create an account or sign in to browse our catalog, save favorites, and coordinate adoptions.
          </p>

          {/* Value Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-lg mx-auto lg:mx-0">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-left">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">14+ Animal Rescues</h4>
                <p className="text-xs text-slate-400">Dogs, cats, wild species, birds, and marine rescues.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-left">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Instant Adoptions</h4>
                <p className="text-xs text-slate-400">Personalized dashboard tracking your saved and adopted animals.</p>
              </div>
            </div>
          </div>

          {/* Quick Demo Logins Banner */}
          <div className="pt-2">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Or Try Instant 1-Click Demo Login:
            </p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <button
                type="button"
                onClick={() => handleQuickDemo('sarah@animals.org', 'AnimalCare2026!')}
                className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-blue-400 flex items-center gap-1.5 transition"
              >
                <span>Demo Caretaker (Sarah)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('alex@weste.org', 'WildSafe123!')}
                className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-indigo-400 flex items-center gap-1.5 transition"
              >
                <span>Demo Adopter (Alex)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: The Access Card */}
        <div className="lg:w-1/2 w-full max-w-md">
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-t-3xl" />

            {/* Mode Switcher */}
            <div className="flex bg-slate-800/90 p-1 rounded-2xl mb-6 border border-slate-700/70">
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 ${
                  mode === 'signup'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign Up (New User)
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 ${
                  mode === 'login'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In (Existing)
              </button>
            </div>

            {/* Title Header */}
            <div className="mb-5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {mode === 'signup' && (
                  <>
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    <span>Create Your Member Account</span>
                  </>
                )}
                {mode === 'login' && (
                  <>
                    <Lock className="w-5 h-5 text-blue-400" />
                    <span>Sign In to Your Account</span>
                  </>
                )}
                {mode === 'forgot' && (
                  <>
                    <ShieldCheck className="w-5 h-5 text-purple-400" />
                    <span>Reset Your Password</span>
                  </>
                )}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {mode === 'signup' && 'Fill out your info to unlock full access to the WESTE platform.'}
                {mode === 'login' && 'Enter your credentials to continue into the website.'}
                {mode === 'forgot' && 'Enter your email and a new password.'}
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-start gap-2.5 p-3 mb-4 rounded-xl bg-rose-950/80 border border-rose-700/60 text-rose-200 text-xs animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1">{errorMessage}</div>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="flex items-start gap-2.5 p-3 mb-4 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 text-xs animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex-1">{successMessage}</div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Name (Sign up only) */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jordan River"
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              {/* Community Role (Sign up only) */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                    Community Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition"
                  >
                    <option value="Wildlife Enthusiast">Wildlife Enthusiast</option>
                    <option value="Animal Adopter">Animal Adopter</option>
                    <option value="Sanctuary Volunteer">Sanctuary Volunteer</option>
                    <option value="Veterinary Partner">Veterinary Partner</option>
                  </select>
                </div>
              )}

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    {mode === 'forgot' ? 'New Password' : 'Password'} <span className="text-rose-500">*</span>
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-xs text-indigo-400 hover:text-indigo-300 underline"
                    >
                      Forgot?
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
                    placeholder="••••••••"
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl py-2.5 pl-10 pr-10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Strength Meter */}
                {(mode === 'signup' || mode === 'forgot') && password.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Strength:</span>
                      <span className="font-semibold text-slate-200">{strength.label}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 h-1.5">
                      <div className={`h-full rounded-full ${strength.score >= 1 ? strength.color : 'bg-slate-700'}`} />
                      <div className={`h-full rounded-full ${strength.score >= 2 ? strength.color : 'bg-slate-700'}`} />
                      <div className={`h-full rounded-full ${strength.score >= 3 ? strength.color : 'bg-slate-700'}`} />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password (Sign up only) */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>
                </div>
              )}

              {/* Remember me (Login only) */}
              {mode === 'login' && (
                <div className="flex items-center text-xs text-slate-300 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Remember my device</span>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold text-sm shadow-xl shadow-indigo-950/50 flex items-center justify-center gap-2 transition transform active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Unlocking portal...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {mode === 'signup' && 'Sign Up & Enter Website'}
                      {mode === 'login' && 'Sign In & Enter Website'}
                      {mode === 'forgot' && 'Save & Back to Login'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Back to sign in if in forgot mode */}
            {mode === 'forgot' && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Back to Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <footer className="py-4 border-t border-slate-900 text-center text-xs text-slate-500 z-10">
        © {new Date().getFullYear()} WESTE Animals & Wildlife Sanctuary. Certified 501(c)(3) Non-Profit.
      </footer>
    </div>
  );
};

export default AuthGate;

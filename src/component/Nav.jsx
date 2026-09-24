import React, { useState, useRef, useEffect } from 'react';
import {
  Heart,
  ShoppingBag,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { FaRecycle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

function Nav({ onOpenAuth, onOpenProfile, onOpenAiSupport }) {
  const { user, isAuthenticated, logout } = useAuth();
  const { showToast } = useToast();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    showToast('Signed out successfully.', 'info');
  };

  const favoritesCount = user?.favorites?.length || 0;
  const adoptionsCount = user?.adoptions?.length || 0;

  return (
    <nav className="bg-slate-900 text-white shadow-xl border-b border-blue-900/60 sticky top-0 z-40 backdrop-blur-md bg-slate-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center group">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
              <FaRecycle className="text-xl text-blue-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <span className="text-2xl font-black tracking-wider text-white">
              WESTE <span className="text-blue-500">ANIMALS</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-blue-400 transition-colors">
            Home
          </a>
          <a href="#about" className="hover:text-blue-400 transition-colors">
            About Us
          </a>
          <a href="#animals" className="hover:text-blue-400 transition-colors">
            Adopt Animals
          </a>
          <a href="#contact" className="hover:text-blue-400 transition-colors">
            Contact
          </a>
          <button
            onClick={onOpenAiSupport}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600/30 to-indigo-600/30 hover:from-blue-600/50 hover:to-indigo-600/50 text-indigo-300 hover:text-white border border-indigo-500/40 text-xs font-semibold transition shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>AI Care Assistant</span>
          </button>
        </div>

        {/* Right Section: Auth State & Actions */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            /* Logged Out Controls */
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-4 py-2 text-sm font-semibold rounded-full border border-blue-400/60 text-white hover:bg-blue-600/20 hover:border-blue-300 transition duration-200"
              >
                Login
              </button>

              <button
                onClick={() => onOpenAuth('signup')}
                className="px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-900/40 hover:shadow-indigo-900/60 transition duration-200 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
            </div>
          ) : (
            /* Logged In Controls */
            <div className="flex items-center gap-3">
              {/* Quick Favorites Pill */}
              <button
                onClick={() => onOpenProfile('favorites')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-xs font-medium text-slate-300 transition"
                title="View saved favorites"
              >
                <Heart className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
                <span>{favoritesCount}</span>
              </button>

              {/* Quick Adoptions Pill */}
              <button
                onClick={() => onOpenProfile('adoptions')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-xs font-medium text-slate-300 transition"
                title="View adoptions & orders"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" />
                <span>{adoptionsCount}</span>
              </button>

              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-2 rounded-full bg-slate-800/90 border border-slate-700 hover:border-slate-500 text-left transition"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-indigo-400/50 bg-slate-700"
                  />
                  <div className="hidden md:block pr-1 text-left leading-tight">
                    <p className="text-xs font-semibold text-white max-w-[110px] truncate">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-indigo-300 font-medium truncate max-w-[110px]">
                      {user.role}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 pr-0.5" />
                </button>

                {/* Dropdown Menu Modal */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-3 border-b border-slate-800">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-bold text-white truncate">{user.name}</p>
                      <p className="text-xs text-indigo-400 truncate mt-0.5">{user.email}</p>
                    </div>

                    <div className="py-1 text-sm text-slate-300">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onOpenProfile();
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-slate-800 flex items-center gap-2.5 transition text-slate-200"
                      >
                        <User className="w-4 h-4 text-indigo-400" />
                        <span>My Profile & Settings</span>
                      </button>

                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onOpenProfile('favorites');
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-slate-800 flex items-center justify-between transition text-slate-200"
                      >
                        <div className="flex items-center gap-2.5">
                          <Heart className="w-4 h-4 text-rose-400" />
                          <span>Saved Favorites</span>
                        </div>
                        <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-400">
                          {favoritesCount}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onOpenProfile('adoptions');
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-slate-800 flex items-center justify-between transition text-slate-200"
                      >
                        <div className="flex items-center gap-2.5">
                          <ShoppingBag className="w-4 h-4 text-emerald-400" />
                          <span>Adoptions & History</span>
                        </div>
                        <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-400">
                          {adoptionsCount}
                        </span>
                      </button>
                    </div>

                    <div className="pt-1 mt-1 border-t border-slate-800">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 flex items-center gap-2.5 transition text-sm font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900/95 px-4 pt-3 pb-5 space-y-2 text-sm animate-in slide-in-from-top duration-200">
          <a
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-blue-400 transition"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-blue-400 transition"
          >
            About Us
          </a>
          <a
            href="#animals"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-blue-400 transition"
          >
            Adopt Animals
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-blue-400 transition"
          >
            Contact
          </a>

          {!isAuthenticated ? (
            <div className="pt-3 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="flex-1 py-2 text-center rounded-xl border border-slate-700 text-white font-medium"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signup');
                }}
                className="flex-1 py-2 text-center rounded-xl bg-blue-600 text-white font-medium"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full" />
                <span className="text-sm font-semibold">{user.name}</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="text-xs text-rose-400 hover:text-rose-300"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Nav;

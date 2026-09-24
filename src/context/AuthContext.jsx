import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_USERS_KEY = 'weste_animal_users';
const STORAGE_SESSION_KEY = 'weste_active_session';

// Helper: Secure SHA-256 hash using the native browser Web Crypto API
async function hashPassword(plainText) {
  if (!window.crypto || !window.crypto.subtle) {
    // Fallback simple hash if subtle crypto is unavailable
    let hash = 0;
    for (let i = 0; i < plainText.length; i++) {
      const char = plainText.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return `hash_${Math.abs(hash)}`;
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Initial seed accounts for quick testing & demonstration
const DEFAULT_SEED_USERS = [
  {
    id: 'usr_sarah_01',
    name: 'Sarah Jenkins',
    email: 'sarah@animals.org',
    // SHA-256 for 'AnimalCare2026!'
    passwordHash: '8b7d9bfd4dfec79f5819ba714578b660ce9437293e3c0ee0fa6c88880e6ae76a',
    role: 'Senior Wildlife Caretaker',
    bio: 'Dedicated to wildlife preservation, animal rescue, and sanctuary rehabilitation since 2018.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    favorites: ['The beauty dog in bush', 'The beauty elephant in town'],
    adoptions: [
      {
        id: 'adopt_101',
        name: 'The beauty dog in bush',
        price: '200$',
        date: '2026-03-15',
        status: 'Adopted'
      }
    ],
    createdAt: '2026-01-10T10:00:00.000Z'
  },
  {
    id: 'usr_alex_02',
    name: 'Alex Rivera',
    email: 'alex@weste.org',
    // SHA-256 for 'WildSafe123!'
    passwordHash: '8392576b5dcf66579fc98c0b5c10649ae510427303f27f88e5d3c8c2eef2687a',
    role: 'Adoption Specialist',
    bio: 'Passionate about matching rescue animals with loving forever homes.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    favorites: ['The beauty lion in the bush'],
    adoptions: [],
    createdAt: '2026-02-01T14:30:00.000Z'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize DB and restore existing session on mount
  useEffect(() => {
    try {
      // 1. Ensure user database exists
      const existingDb = localStorage.getItem(STORAGE_USERS_KEY);
      if (!existingDb) {
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEFAULT_SEED_USERS));
      }

      // 2. Restore active session from localStorage or sessionStorage
      const sessionStr =
        localStorage.getItem(STORAGE_SESSION_KEY) || sessionStorage.getItem(STORAGE_SESSION_KEY);

      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        // Verify user still exists in DB
        const users = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '[]');
        const matchedUser = users.find((u) => u.id === session.userId);
        if (matchedUser) {
          // Do not keep passwordHash in user state
          const { passwordHash, ...safeUserData } = matchedUser;
          setUser(safeUserData);
        } else {
          localStorage.removeItem(STORAGE_SESSION_KEY);
          sessionStorage.removeItem(STORAGE_SESSION_KEY);
        }
      }
    } catch (err) {
      console.error('Failed to initialize auth state:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Helper to persist user updates to localStorage DB
  const saveUserToDb = (updatedUser, hash = null) => {
    try {
      const users = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '[]');
      const index = users.findIndex((u) => u.id === updatedUser.id);
      if (index !== -1) {
        users[index] = {
          ...users[index],
          ...updatedUser,
          ...(hash ? { passwordHash: hash } : {})
        };
      } else {
        users.push({
          ...updatedUser,
          passwordHash: hash
        });
      }
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    } catch (err) {
      console.error('Failed to save to local DB:', err);
    }
  };

  // Sign In function
  const login = async (email, password, rememberMe = true) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      throw new Error('Please provide both email and password.');
    }

    // Small realistic latency for real-world feel
    await new Promise((r) => setTimeout(r, 450));

    const users = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '[]');
    const foundUser = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!foundUser) {
      throw new Error('No account found with this email. Please check your spelling or sign up.');
    }

    const inputHash = await hashPassword(cleanPass);
    if (foundUser.passwordHash !== inputHash) {
      throw new Error('Incorrect password. Please verify and try again.');
    }

    const { passwordHash, ...safeUser } = foundUser;
    setUser(safeUser);

    const sessionPayload = {
      userId: safeUser.id,
      token: `weste_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      createdAt: new Date().toISOString()
    };

    if (rememberMe) {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionPayload));
      sessionStorage.removeItem(STORAGE_SESSION_KEY);
    } else {
      sessionStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionPayload));
      localStorage.removeItem(STORAGE_SESSION_KEY);
    }

    return safeUser;
  };

  // Sign Up / Registration function
  const signup = async ({ name, email, password, role = 'Animal Lover' }) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanName || cleanName.length < 2) {
      throw new Error('Please enter your full name (at least 2 characters).');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      throw new Error('Please enter a valid email address.');
    }

    if (cleanPass.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    await new Promise((r) => setTimeout(r, 500));

    const users = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '[]');
    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      throw new Error('An account with this email address already exists. Please log in instead.');
    }

    const passwordHash = await hashPassword(cleanPass);
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Generate cute SVG avatar or placeholder based on initials
    const initials = cleanName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const newUserRecord = {
      id: userId,
      name: cleanName,
      email: cleanEmail,
      role: role || 'Wildlife Enthusiast',
      bio: `Joined WESTE animal community on ${new Date().toLocaleDateString()}.`,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}&backgroundColor=2563eb,4f46e5,06b6d4`,
      favorites: [],
      adoptions: [],
      createdAt: new Date().toISOString()
    };

    saveUserToDb(newUserRecord, passwordHash);

    const { passwordHash: _, ...safeUser } = { ...newUserRecord, passwordHash };
    setUser(safeUser);

    const sessionPayload = {
      userId: safeUser.id,
      token: `weste_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionPayload));

    return safeUser;
  };

  // Password reset function
  const resetPassword = async (email, newPassword) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = newPassword.trim();

    if (!cleanEmail) {
      throw new Error('Please enter your account email.');
    }
    if (cleanPass.length < 6) {
      throw new Error('New password must be at least 6 characters long.');
    }

    await new Promise((r) => setTimeout(r, 450));

    const users = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '[]');
    const targetUser = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!targetUser) {
      throw new Error('No registered account was found with this email.');
    }

    const newHash = await hashPassword(cleanPass);
    saveUserToDb(targetUser, newHash);

    return true;
  };

  // Sign out function
  const logout = () => {
    localStorage.removeItem(STORAGE_SESSION_KEY);
    sessionStorage.removeItem(STORAGE_SESSION_KEY);
    setUser(null);
  };

  // Update profile
  const updateProfile = ({ name, bio, role }) => {
    if (!user) return;
    const updated = {
      ...user,
      ...(name ? { name: name.trim() } : {}),
      ...(bio !== undefined ? { bio: bio.trim() } : {}),
      ...(role ? { role: role.trim() } : {})
    };
    setUser(updated);
    saveUserToDb(updated);
  };

  // Toggle favorite animal
  const toggleFavorite = (animalName) => {
    if (!user) {
      return { requiresAuth: true };
    }

    const currentFavorites = user.favorites || [];
    const exists = currentFavorites.includes(animalName);
    const updatedFavorites = exists
      ? currentFavorites.filter((name) => name !== animalName)
      : [...currentFavorites, animalName];

    const updatedUser = {
      ...user,
      favorites: updatedFavorites
    };

    setUser(updatedUser);
    saveUserToDb(updatedUser);

    return {
      requiresAuth: false,
      isFavorite: !exists,
      animalName
    };
  };

  // Adopt animal
  const adoptAnimal = (animal) => {
    if (!user) {
      return { requiresAuth: true };
    }

    const newAdoption = {
      id: `adopt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: animal.name,
      price: animal.price,
      img: animal.img,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      status: 'Confirmed'
    };

    const updatedUser = {
      ...user,
      adoptions: [newAdoption, ...(user.adoptions || [])]
    };

    setUser(updatedUser);
    saveUserToDb(updatedUser);

    return {
      requiresAuth: false,
      success: true,
      adoption: newAdoption
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        resetPassword,
        updateProfile,
        toggleFavorite,
        adoptAnimal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import React, { useState } from 'react';
import Nav from './component/Nav';
import Hero from './component/Hero';
import SuccessStories from './component/SuccessStories';
import DonationSection from './component/DonationSection';
import About from './component/About';
import Footer from './component/Footer';
import AuthGate from './component/AuthGate';
import AuthModal from './component/AuthModal';
import UserProfileModal from './component/UserProfileModal';
import AnimalDetailModal from './component/AnimalDetailModal';
import AIAssistantWidget from './component/AIAssistantWidget';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

const MainContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenProfile = () => {
    setProfileModalOpen(true);
  };

  // If restoring auth session from localStorage on initial render, show sleek loader
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mb-4" />
        <p className="text-sm text-slate-400 font-medium">Verifying member access...</p>
      </div>
    );
  }

  // ENFORCE GATE: If user is not signed in, show mandatory Sign Up / Authentication Gate!
  if (!isAuthenticated) {
    return (
      <>
        <AuthGate />
        {/* AI Support also accessible to answer visitor inquiries */}
        <AIAssistantWidget onOpenProfile={handleOpenProfile} />
      </>
    );
  }

  // Once authenticated, grant complete access to the website
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Navigation */}
      <Nav
        onOpenAuth={handleOpenAuth}
        onOpenProfile={handleOpenProfile}
        onOpenAiSupport={() => setAiAssistantOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero
          onOpenAuth={handleOpenAuth}
          onSelectAnimal={(animal) => setSelectedAnimal(animal)}
        />
        <SuccessStories />
        <DonationSection />
        <About />
      </main>

      {/* Complete Footer with Contact */}
      <Footer />

      {/* Interactive Animal Detail Profile & Certificate Modal */}
      <AnimalDetailModal
        animal={selectedAnimal}
        isOpen={!!selectedAnimal}
        onClose={() => setSelectedAnimal(null)}
        onAdoptSuccess={() => {}}
      />

      {/* User Profile & Account Settings Modal */}
      <UserProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      {/* Auth Modal for internal triggers if needed */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* WESTE AI Care & Adoption Specialist Backend Assistant */}
      <AIAssistantWidget
        isOpen={aiAssistantOpen}
        onToggleOpen={setAiAssistantOpen}
        onOpenProfile={handleOpenProfile}
      />
    </div>
  );
};

const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
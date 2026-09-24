import React, { useState } from 'react';
import {
  X,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Calendar,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  FileText,
  UserCheck,
  Check,
  Stethoscope,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const AnimalDetailModal = ({ animal, isOpen, onClose, onAdoptSuccess }) => {
  const { user, isAuthenticated, toggleFavorite, adoptAnimal } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('about'); // 'about' | 'medical' | 'story'
  const [isAdopting, setIsAdopting] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState(null);

  if (!isOpen || !animal) return null;

  const favorited = user?.favorites?.includes(animal.name) || false;
  const isAdopted = user?.adoptions?.some((item) => item.name === animal.name) || false;

  const handleFavorite = () => {
    if (!isAuthenticated) {
      showToast('Please sign in to save animals to your favorites.', 'warning');
      return;
    }
    const res = toggleFavorite(animal.name);
    if (res.isFavorite) {
      showToast(`Saved "${animal.name}" to your favorites!`, 'success');
    } else {
      showToast(`Removed "${animal.name}" from your favorites.`, 'info');
    }
  };

  const handleAdopt = async () => {
    if (!isAuthenticated) {
      showToast('Please sign in or create an account to adopt.', 'warning');
      return;
    }

    setIsAdopting(true);
    await new Promise((r) => setTimeout(r, 600));

    const certId = `WESTE-${Math.floor(100000 + Math.random() * 900000)}`;
    const adoptionPayload = {
      ...animal,
      certificateId: certId,
      adopterName: user.name,
      adoptionDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    adoptAnimal(adoptionPayload);
    setCertificateData(adoptionPayload);
    setIsAdopting(false);
    setShowCertificate(true);

    showToast(`🎉 Congratulations! You have officially adopted ${animal.name}!`, 'success');
    if (onAdoptSuccess) onAdoptSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-200">
        {/* Glow Top Accent */}
        <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!showCertificate ? (
          /* ================= Main Profile View ================= */
          <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
            {/* Top Layout: Photo + Core Info */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start pb-6 border-b border-slate-800">
              {/* Photo */}
              <div className="sm:col-span-5 relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/60 shadow-lg">
                <img
                  src={animal.img}
                  alt={animal.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-slate-950/85 backdrop-blur text-blue-300 border border-slate-700">
                  {animal.category}
                </span>
              </div>

              {/* Title & Metadata */}
              <div className="sm:col-span-7 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {animal.name}
                    </h2>
                    <p className="text-xs text-indigo-400 font-semibold mt-0.5">
                      Sanctuary ID: #WST-{animal.id}084 • {animal.age}
                    </p>
                  </div>
                  <button
                    onClick={handleFavorite}
                    className={`p-2.5 rounded-full border transition transform active:scale-90 ${
                      favorited
                        ? 'bg-rose-500/20 border-rose-500 text-rose-500'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                    title={favorited ? 'Remove favorite' : 'Add to favorites'}
                  >
                    <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-600/40 text-emerald-300 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {animal.status}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-blue-950/70 border border-blue-600/40 text-blue-300 font-medium">
                    Fee: {animal.price}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed pt-1">
                  {animal.description}
                </p>

                {/* Quick Attributes Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Microchip</span>
                    <span className="text-white font-medium">985-1410-092</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Vaccines</span>
                    <span className="text-emerald-400 font-medium">Up to Date (2026)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-800 mt-6 gap-6 text-sm">
              <button
                onClick={() => setActiveTab('about')}
                className={`pb-3 font-semibold transition border-b-2 ${
                  activeTab === 'about'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Personality & Traits
              </button>
              <button
                onClick={() => setActiveTab('medical')}
                className={`pb-3 font-semibold transition border-b-2 ${
                  activeTab === 'medical'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Medical Dossier
              </button>
              <button
                onClick={() => setActiveTab('story')}
                className={`pb-3 font-semibold transition border-b-2 ${
                  activeTab === 'story'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Rescue Story
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-6 min-h-[160px]">
              {activeTab === 'about' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                      <span className="text-slate-400 block text-[10px]">Good With Kids</span>
                      <span className="font-bold text-emerald-400">Yes (Friendly)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                      <span className="text-slate-400 block text-[10px]">Energy Level</span>
                      <span className="font-bold text-amber-400">Moderate</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                      <span className="text-slate-400 block text-[10px]">House Trained</span>
                      <span className="font-bold text-emerald-400">Certified</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                      <span className="text-slate-400 block text-[10px]">Lifestyle</span>
                      <span className="font-bold text-blue-400">Home or Yard</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
                    {animal.name} has undergone our comprehensive behavioral evaluation. Highly affectionate, responds smoothly to positive reinforcement, and thrives on daily human connection.
                  </p>
                </div>
              )}

              {activeTab === 'medical' && (
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                    <span className="text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Rabies, DHPP & Bordetella
                    </span>
                    <span className="text-emerald-400 font-semibold">Administered</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                    <span className="text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Spay / Neuter Surgery
                    </span>
                    <span className="text-emerald-400 font-semibold">Complete</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                    <span className="text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cardiac & Blood Panel Screening
                    </span>
                    <span className="text-emerald-400 font-semibold">Clear & Healthy</span>
                  </div>
                </div>
              )}

              {activeTab === 'story' && (
                <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
                  <p>
                    {animal.name} was rescued by WESTE rescue rangers after being found in distress. Through our 24/7 rehabilitation ward, nutritious meal plans, and physical therapy, they made a complete recovery.
                  </p>
                  <p>
                    Today, {animal.name} is ready to bring warmth, joy, and companionship to a committed adopter.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Adoption Fee</span>
                <span className="text-2xl font-black text-indigo-400">{animal.price}</span>
                <span className="text-[11px] text-slate-500 ml-2">(Includes 30-Day Health Support)</span>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={handleAdopt}
                  disabled={isAdopting || isAdopted}
                  className="flex-1 sm:flex-none px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-950/60 flex items-center justify-center gap-2 transition transform active:scale-95 disabled:opacity-50"
                >
                  {isAdopting ? (
                    <span>Issuing Adoption...</span>
                  ) : isAdopted ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Already Adopted by You</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Complete Official Adoption</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ================= Official Adoption Certificate ================= */
          <div className="p-6 sm:p-10 text-center animate-in zoom-in-95 duration-200">
            <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-950 border-4 border-amber-500/50 shadow-2xl relative">
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-400" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-400" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-400" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-400" />

              <div className="inline-flex p-3 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 mb-3">
                <Award className="w-8 h-8" />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 block">
                WESTE Sanctuary & Animal Rescue
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-wide mt-1">
                Official Certificate of Adoption
              </h3>

              <p className="text-xs text-slate-400 mt-2">
                This certifies that on <strong className="text-white">{certificateData?.adoptionDate}</strong>,
              </p>

              <h4 className="text-xl font-extrabold text-blue-400 my-2">
                {certificateData?.adopterName}
              </h4>

              <p className="text-xs text-slate-300">
                has officially adopted and pledged lifelong loving care to:
              </p>

              <div className="my-4 inline-flex items-center gap-3 p-2.5 pr-5 rounded-full bg-slate-900 border border-slate-700">
                <img
                  src={animal.img}
                  alt={animal.name}
                  className="w-12 h-12 rounded-full object-cover border border-amber-400/50"
                />
                <div className="text-left">
                  <span className="text-sm font-bold text-white block">{animal.name}</span>
                  <span className="text-[10px] text-emerald-400">Verified Rescue • ID: {certificateData?.certificateId}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Sanctuary Seal: Validated</span>
                <span>Dr. Elena Rostova, DVM</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <FileText className="w-4 h-4" /> Print Certificate
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalDetailModal;

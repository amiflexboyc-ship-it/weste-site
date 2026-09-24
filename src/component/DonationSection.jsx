import React, { useState } from 'react';
import { Heart, ShieldCheck, Sparkles, Check, ArrowRight, Lock } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const DonationSection = () => {
  const { showToast } = useToast();

  const [frequency, setFrequency] = useState('monthly'); // 'once' | 'monthly'
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const amounts = [15, 25, 50, 100];

  const getImpactDescription = (amount) => {
    if (amount <= 15) return 'Provides high-protein nutritious meal packs for 2 rescue dogs for a week.';
    if (amount <= 25) return 'Funds 2 weeks of formula and emergency pediatric bottle-feeding for orphaned wildlife.';
    if (amount <= 50) return 'Covers complete core vaccination (DHPP, Rabies) & microchip for an incoming rescue.';
    return 'Subsidizes critical emergency orthopedic veterinary surgery or anti-poaching wildlife patrols.';
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

    if (!finalAmount || finalAmount <= 0) {
      showToast('Please select or enter a donation amount.', 'warning');
      return;
    }

    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsProcessing(false);

    showToast(
      `💖 Thank you so much! Your ${frequency === 'monthly' ? 'monthly' : 'one-time'} contribution of $${finalAmount} will directly feed and heal sanctuary animals.`,
      'success'
    );

    setCustomAmount('');
  };

  return (
    <section className="py-20 bg-slate-950 border-t border-slate-800 text-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Certified 501(c)(3) Tax-Deductible</span>
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Sponsor an Animal, <span className="text-emerald-400">Save a Life Today</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              100% of community contributions go directly towards veterinary triage, sanctuary shelter, and nutrition for vulnerable animals.
            </p>
          </div>

          {/* Frequency Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-800/90 p-1 rounded-2xl border border-slate-700/80 flex w-64">
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                  frequency === 'monthly'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly Hero
              </button>
              <button
                type="button"
                onClick={() => setFrequency('once')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                  frequency === 'once'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                One-Time Gift
              </button>
            </div>
          </div>

          {/* Amount Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 max-w-xl mx-auto">
            {amounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  setSelectedAmount(amt);
                  setCustomAmount('');
                }}
                className={`py-3.5 px-4 rounded-2xl border font-bold text-base transition-all duration-200 ${
                  selectedAmount === amt && !customAmount
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-950/40 scale-105'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="max-w-xs mx-auto mb-6">
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                type="number"
                min="1"
                placeholder="Or enter custom amount..."
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl py-2.5 pl-8 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition text-center"
              />
            </div>
          </div>

          {/* Dynamic Impact Statement Card */}
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-slate-800/70 border border-slate-700 text-center mb-8">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Your Direct Impact</p>
            <p className="text-sm font-semibold text-emerald-300 mt-1">
              {getImpactDescription(customAmount ? parseFloat(customAmount) : selectedAmount)}
            </p>
          </div>

          {/* Submit Button */}
          <div className="max-w-md mx-auto text-center">
            <button
              onClick={handleDonate}
              disabled={isProcessing}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2 transition transform active:scale-95 disabled:opacity-50"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>
                {isProcessing
                  ? 'Processing Support...'
                  : `Donate $${customAmount || selectedAmount} ${frequency === 'monthly' ? '/ Month' : 'Now'}`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 mt-4">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-500" /> 256-Bit Encrypted
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Cancel Anytime
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;

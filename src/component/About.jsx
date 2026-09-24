import React, { useState } from 'react';
import {
  Shield,
  Heart,
  Sparkles,
  Award,
  Users,
  Activity,
  Trees,
  CheckCircle2,
  ArrowRight,
  Stethoscope,
  Compass,
  Smile
} from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission'); // 'mission' | 'values' | 'team'

  const stats = [
    { number: '1,250+', label: 'Rescued Animals Rehomed', icon: Heart, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { number: '350', label: 'Acres of Wild Sanctuary', icon: Trees, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { number: '100%', label: 'No-Kill Lifetime Care', icon: Shield, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { number: '24/7', label: 'Emergency Veterinary Triage', icon: Stethoscope, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ];

  const pillars = [
    {
      icon: Shield,
      title: 'Habitat & Wildlife Preservation',
      description:
        'Securing open natural acreage, wildlife migration corridors, and anti-poaching patrol support for vulnerable species across diverse ecosystems.',
      color: 'from-blue-600 to-cyan-600',
      badge: 'Conservation'
    },
    {
      icon: Stethoscope,
      title: 'Emergency Medical Rehabilitation',
      description:
        'Equipped with full veterinary surgery, round-the-clock neonatal nursing, and prosthetic physical therapy for injured and traumatized rescues.',
      color: 'from-amber-500 to-orange-600',
      badge: 'Veterinary'
    },
    {
      icon: Heart,
      title: 'Ethical Lifetime Adoptions',
      description:
        'Thorough home-check vetting, microchipping, behavior training, and lifetime return policies ensuring every animal finds their true forever family.',
      color: 'from-rose-500 to-pink-600',
      badge: 'Adoption'
    },
    {
      icon: Users,
      title: 'Humane Community Education',
      description:
        'Hosting youth wildlife camps, veterinary internships, and school tours to inspire compassionate animal guardianship for future generations.',
      color: 'from-indigo-600 to-purple-600',
      badge: 'Outreach'
    }
  ];

  const team = [
    {
      name: 'Dr. Elena Rostova',
      role: 'Chief Veterinary Surgeon',
      exp: '14+ years experience',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80',
      bio: 'Specialist in wildlife trauma surgery and domestic companion rehabilitation.'
    },
    {
      name: 'Marcus Vance',
      role: 'Sanctuary Operations Director',
      exp: '11+ years experience',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      bio: 'Oversees 350 acres of sanctuary land, herd integration, and wild habitats.'
    },
    {
      name: 'Sarah Jenkins',
      role: 'Senior Caretaker & Rehoming Lead',
      exp: '8+ years experience',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
      bio: 'Passionate foster coordinator who has facilitated over 600 successful adoptions.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white border-t border-slate-800/80 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================= Header Title ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Origin & Conservation Mission</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Protecting Every Life, <span className="text-blue-500">From Wild to Home</span>
          </h2>

          <p className="text-slate-300 mt-5 text-base sm:text-lg leading-relaxed">
            WESTE Wildlife & Animal Care was founded on one timeless belief: every animal deserves dignity, safety, and a voice. From rescuing domestic companions in need to safeguarding endangered species in certified wild reserves, our sanctuary never turns an animal away.
          </p>
        </div>

        {/* ================= Impact Statistics Grid ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/20 text-center flex flex-col items-center justify-center group"
              >
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= Story Showcase Dual Column ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 group">
              <img
                src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&auto=format&fit=crop&q=80"
                alt="Sanctuary caregiver with rescued dogs"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Overlay Quote Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md">
                <p className="text-xs sm:text-sm italic text-slate-200">
                  "Seeing a wounded or abandoned creature heal and finally wag its tail in a safe loving home is the greatest work on Earth."
                </p>
                <span className="block text-[11px] font-semibold text-blue-400 mt-1.5">
                  — The WESTE Sanctuary Pledge
                </span>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -top-5 -right-5 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white">Certified No-Kill</p>
                <p className="text-[10px] text-slate-400">100% Lifetime Protection</p>
              </div>
            </div>
          </div>

          {/* Right Column: Mission Narrative & Checkpoints */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Who We Are & What We Do
            </span>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              A Dedicated Haven Where Second Chances Begin
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Founded over eight years ago, WESTE began as a small regional rescue for abandoned pets. Today, our 350-acre preserve provides sanctuary to domestic dogs and cats, rescued farm animals, and sponsored wild species recovering from habitat disruption.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-sm text-slate-300">
                  <strong className="text-white font-semibold">Strict No-Kill Policy:</strong> Every animal remains in our care for as long as needed until their perfect match is found.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-sm text-slate-300">
                  <strong className="text-white font-semibold">Comprehensive Healthcare:</strong> Every rescue receives vaccination, spay/neuter, bloodwork, and dental treatment before adoption.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-sm text-slate-300">
                  <strong className="text-white font-semibold">Open Wilderness Acres:</strong> Wild species and rescued livestock live in spacious pastures with natural water streams and specialized care.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="#animals"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-900/40 flex items-center gap-2 transition transform active:scale-95"
              >
                <span>Browse Rescue Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition"
              >
                Volunteer With Us
              </a>
            </div>
          </div>
        </div>

        {/* ================= Core Pillars of Care ================= */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Our 4 Pillars
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              How We Champion Animal Welfare
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Our holistic methodology covers rescue, medical rehabilitation, social training, and lifelong sanctuary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/30 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pillar.color} text-white flex items-center justify-center shadow-md`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {pillar.badge}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                      {pillar.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs font-semibold text-indigo-400 group cursor-pointer hover:text-indigo-300">
                    <span>Learn standard</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= Meet the Care Team ================= */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Meet Our Specialists
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              The Dedicated Hearts Behind the Sanctuary
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              From veterinary surgeons to animal behaviorists, meet the certified specialists on duty 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="group rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-950/40"
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/90 backdrop-blur text-indigo-300 border border-indigo-500/30">
                    {member.exp}
                  </span>
                </div>

                {/* Member Details */}
                <div className="p-6">
                  <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs font-semibold text-blue-400 mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
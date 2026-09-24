import React, { useState } from 'react';
import { Heart, Star, Sparkles, Quote, ArrowRight, ShieldCheck } from 'lucide-react';

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      title: 'From Abandoned Trail Pup to Certified Therapy Dog',
      animalName: 'Barnaby (Golden Retriever Mix)',
      adopter: 'The Mitchell Family',
      rating: 5,
      date: 'Adopted 6 months ago',
      beforeImg: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=80',
      afterImg: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&auto=format&fit=crop&q=80',
      quote:
        'When we first met Barnaby at the WESTE sanctuary, he was timid and nervous. Within weeks of love and the sanctuary’s training guide, he blossomed into the gentlest therapy companion for our daughter.'
    },
    {
      id: 2,
      title: 'A Warm Sunroom for a Rescued Siamese Beauty',
      animalName: 'Cleo (Blue-Point Siamese)',
      adopter: 'Marcus & Jessica L.',
      rating: 5,
      date: 'Adopted 3 months ago',
      beforeImg: 'https://images.unsplash.com/photo-1513360309081-38f076278f1e?w=500&auto=format&fit=crop&q=80',
      afterImg: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=80',
      quote:
        'The WESTE adoption coordinators made the medical history and transition so effortless. Cleo purrs constantly and now rules our living room couch with absolute royalty!'
    },
    {
      id: 3,
      title: 'Rehabilitating a Loggerhead Sea Turtle to the Wild',
      animalName: 'Tide (Pacific Green Sea Turtle)',
      adopter: 'Coastal Marine Conservancy',
      rating: 5,
      date: 'Released Last Month',
      beforeImg: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&auto=format&fit=crop&q=80',
      afterImg: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?w=500&auto=format&fit=crop&q=80',
      quote:
        'Through WESTE wildlife sponsorships, Tide received 9 months of shell healing and was satellite tagged before swimming safely back into open Pacific ocean waters.'
    }
  ];

  return (
    <section className="py-20 bg-slate-900/60 border-t border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Happy Tails Community</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Lives Forever Changed <span className="text-rose-400">By Love</span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            Real stories of transformation, resilience, and unconditional love from families who opened their homes to our rescue animals.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="rounded-3xl bg-slate-800/80 border border-slate-700/80 p-6 flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-950/30 group"
            >
              <div>
                {/* Images side-by-side or before/after */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-slate-950">
                  <img
                    src={story.afterImg}
                    alt={story.animalName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-950/85 backdrop-blur text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Rehomed & Thriving
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-2">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs text-slate-400 ml-2 font-medium">{story.date}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {story.title}
                </h3>
                <p className="text-xs font-semibold text-blue-400 mt-0.5">
                  {story.animalName} • Adopted by {story.adopter}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 italic mt-4 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                  "{story.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <span>Verified WESTE Adopter</span>
                <span className="text-emerald-400 font-semibold">100% Happy Tail</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;

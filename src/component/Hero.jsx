import React, { useState } from 'react';
import {
  Heart,
  Search,
  ShoppingBag,
  Sparkles,
  Check,
  Tag,
  ShieldCheck,
  Filter
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Hero = ({ onOpenAuth, onSelectAnimal }) => {
  const { user, isAuthenticated, toggleFavorite, adoptAnimal } = useAuth();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const animals = [
    {
      id: 1,
      category: 'Dogs',
      img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
      name: 'The beauty dog in bush',
      price: '$200',
      age: '2 yrs • Male',
      status: 'Vaccinated & Microchipped',
      description: 'Friendly golden retriever mix rescued from wilderness trails. Loves humans and outdoor walks.'
    },
    {
      id: 2,
      category: 'Cats',
      img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
      name: 'The beauty cat in town',
      price: '$150',
      age: '1 yr • Female',
      status: 'Spayed & Dewormed',
      description: 'Gentle domestic tabby cat looking for a warm, quiet indoor home with plenty of cuddles.'
    },
    {
      id: 3,
      category: 'Wild Animals',
      img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&auto=format&fit=crop&q=80',
      name: 'The beauty elephant in town',
      price: '$200',
      age: 'Sanctuary Calf',
      status: 'Protected Species',
      description: 'Sanctuary sponsored orphan elephant calf rehabilitation and 24/7 milk formula support.'
    },
    {
      id: 4,
      category: 'Wild Animals',
      img: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=600&auto=format&fit=crop&q=80',
      name: 'The beauty gorilla in town',
      price: '$200',
      age: 'Protected Reserve',
      status: 'Endangered Care',
      description: 'Protected mountain gorilla habitat conservation sponsorship and anti-poaching patrol unit.'
    },
    {
      id: 5,
      category: 'Farm Animals',
      img: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?w=600&auto=format&fit=crop&q=80',
      name: 'The beauty goat in town',
      price: '$120',
      age: '1.5 yrs • Male',
      status: 'Health Certified',
      description: 'Sweet sanctuary pygmy goat enjoying open grassy pastures, apple treats, and friendly head scratches.'
    },
    {
      id: 6,
      category: 'Wild Animals',
      img: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=600&auto=format&fit=crop&q=80',
      name: 'The beauty lion in the bush',
      price: '$250',
      age: 'Alpha Pride',
      status: 'Sanctuary Reserve',
      description: 'Majestic savannah lion reserve protection program providing veterinary checkups and secure acreage.'
    },
    {
      id: 7,
      category: 'Dogs',
      img: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&auto=format&fit=crop&q=80',
      name: 'The arctic siberian husky',
      price: '$220',
      age: '3 yrs • Male',
      status: 'Vaccinated & Trained',
      description: 'Rescued snow dog with piercing blue eyes. Extremely loyal, playful, and great with active families.'
    },
    {
      id: 8,
      category: 'Cats',
      img: 'https://images.unsplash.com/photo-1513360309081-38f076278f1e?w=600&auto=format&fit=crop&q=80',
      name: 'The royal siamese cat',
      price: '$180',
      age: '8 mos • Female',
      status: 'Full Vet Check',
      description: 'Affectionate and vocal blue-point Siamese cat who loves resting in sunny spots and chasing string toys.'
    },
    {
      id: 9,
      category: 'Birds',
      img: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&auto=format&fit=crop&q=80',
      name: 'The scarlet rescue macaw',
      price: '$190',
      age: 'Sanctuary Aviary',
      status: 'Rehabilitated',
      description: 'Vibrant tropical parrot rescued from illegal trade. Thriving in open sanctuary flight gardens.'
    },
    {
      id: 10,
      category: 'Birds',
      img: 'https://images.unsplash.com/photo-1518992028580-6d97bdca06c3?w=600&auto=format&fit=crop&q=80',
      name: 'The gentle barn owl',
      price: '$160',
      age: 'Raptor Center',
      status: 'Protected Raptor',
      description: 'Rehabilitated nocturnal barn owl featured in our wildlife conservation education initiative.'
    },
    {
      id: 11,
      category: 'Marine',
      img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
      name: 'The ocean sea turtle',
      price: '$175',
      age: 'Coastal Nursery',
      status: 'Tag & Release',
      description: 'Rescued juvenile green sea turtle receiving shell rehabilitation and satellite track monitoring.'
    },
    {
      id: 12,
      category: 'Wild Animals',
      img: 'https://images.unsplash.com/photo-1549480017-d76466a4b7e8?w=600&auto=format&fit=crop&q=80',
      name: 'The endangered red panda',
      price: '$260',
      age: 'Alpine Sanctuary',
      status: 'Global Conservation',
      description: 'Rare mountain red panda conservation sponsorship funding bamboo replanting and ranger monitoring.'
    },
    {
      id: 13,
      category: 'Marine',
      img: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=600&auto=format&fit=crop&q=80',
      name: 'The playful river otter',
      price: '$185',
      age: 'Freshwater Haven',
      status: 'Veterinary Cleared',
      description: 'A charming river otter rescued from flooded banks, now swimming happily in our clean stream habitats.'
    },
    {
      id: 14,
      category: 'Farm Animals',
      img: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=600&auto=format&fit=crop&q=80',
      name: 'The fluffy highland calf',
      price: '$210',
      age: '10 mos • Female',
      status: 'Sanctuary Resident',
      description: 'Gentle Scottish highland calf with soft ginger coat, rescued from industrial farm neglect.'
    }
  ];

  const categories = ['All', 'Dogs', 'Cats', 'Wild Animals', 'Birds', 'Farm Animals', 'Marine'];

  // Filter animals by search and category
  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || animal.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleToggleFavorite = (animal) => {
    if (!isAuthenticated) {
      showToast('Please sign in to save animals to your favorites list.', 'warning');
      onOpenAuth('login');
      return;
    }

    const result = toggleFavorite(animal.name);
    if (result.isFavorite) {
      showToast(`Saved "${animal.name}" to your favorites!`, 'success');
    } else {
      showToast(`Removed "${animal.name}" from your favorites.`, 'info');
    }
  };

  const handleAdopt = (animal) => {
    if (!isAuthenticated) {
      showToast('Please sign in or create an account to adopt or sponsor.', 'warning');
      onOpenAuth('login');
      return;
    }

    adoptAnimal(animal);
    showToast(
      `🎉 Adoption submitted for ${animal.name}! View it in your account profile.`,
      'success'
    );
  };

  const isFavorite = (animalName) => {
    return user?.favorites?.includes(animalName) || false;
  };

  const isAdopted = (animalName) => {
    return user?.adoptions?.some((item) => item.name === animalName) || false;
  };

  return (
    <div className="w-full bg-slate-900 text-white min-h-screen" id="animals">
      {/* Hero Header Section */}
      <div className="px-4 text-center py-16 sm:py-20 flex flex-col items-center justify-center max-w-4xl mx-auto">
        {/* User personalized greeting */}
        {isAuthenticated ? (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4 animate-in fade-in">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Welcome back, {user.name}! Explore today's wildlife rescues.</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Certified No-Kill Wildlife & Pet Sanctuaries</span>
          </div>
        )}

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mt-2 text-white">
          Search & Adopt <span className="text-blue-500">Animals</span>
        </h1>
        <p className="text-slate-400 mt-4 max-w-2xl text-sm sm:text-base leading-relaxed">
          Find your companion, sponsor global wildlife conservation, and give rescued animals a secure, loving tomorrow. All animals are vaccinated and health certified.
        </p>

        {/* Live Search Bar */}
        <div className="mt-8 flex items-center bg-slate-800/90 border border-slate-700 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/30 rounded-full h-14 max-w-xl w-full px-4 shadow-xl transition-all">
          <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-white text-sm w-full placeholder-slate-500"
            placeholder="Search by animal name, breed, or tag (e.g. dog, husky, owl, turtle)..."
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-full bg-slate-700/60 mr-2 transition"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => {
              if (!searchQuery.trim()) {
                showToast('Type an animal keyword to search.', 'info');
              }
            }}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-full h-10 px-5 transition shrink-0 shadow-md"
          >
            Search
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <div className="hidden sm:flex items-center gap-1 text-xs text-slate-500 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-semibold scale-105'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Animal Cards Catalog */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Available Animal Rescues & Sponsorships</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {filteredAnimals.length} Available
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select an animal to save to your personal dashboard or submit an instant adoption application.
            </p>
          </div>

          {!isAuthenticated && (
            <button
              onClick={() => onOpenAuth('signup')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 self-start sm:self-auto bg-indigo-950/40 px-3 py-1.5 rounded-xl border border-indigo-800/50 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create account for 1-click adoption</span>
            </button>
          )}
        </div>

        {filteredAnimals.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/40 rounded-3xl border border-slate-800">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-slate-300">No animals match "{searchQuery}"</h4>
            <p className="text-sm text-slate-500 mt-1">
              Try searching with another keyword or resetting the filter category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg transition"
            >
              View All Animals
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAnimals.map((animal) => {
              const favorited = isFavorite(animal.name);
              const adopted = isAdopted(animal.name);

              return (
                <div
                  key={animal.id}
                  className="group relative flex flex-col bg-slate-800/70 border border-slate-700/80 hover:border-indigo-500/60 rounded-3xl p-4 sm:p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-950/50 hover:-translate-y-1"
                >
                  {/* Category Pill & Favorite Heart */}
                  <div className="flex items-center justify-between mb-3 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-900/90 border border-slate-700 text-slate-300 backdrop-blur-md">
                      {animal.category}
                    </span>
                    <button
                      onClick={() => handleToggleFavorite(animal)}
                      className={`p-2 rounded-full border transition transform active:scale-90 ${
                        favorited
                          ? 'bg-rose-500/20 border-rose-500 text-rose-500 shadow-md shadow-rose-900/40'
                          : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
                      }`}
                      aria-label="Save to favorites"
                      title={favorited ? 'Remove from favorites' : 'Save to favorites'}
                    >
                      <Heart
                        className={`w-4 h-4 ${favorited ? 'fill-rose-500' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Animal Image */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-4 bg-slate-950 shadow-inner">
                    <img
                      src={animal.img}
                      alt={animal.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    {/* Status pill overlay */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px]">
                      <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur text-emerald-300 border border-emerald-500/30 font-medium">
                        ✓ {animal.status}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur text-slate-300 border border-slate-700/60">
                        {animal.age}
                      </span>
                    </div>
                  </div>

                  {/* Title & Info */}
                  <div className="flex-1 flex flex-col">
                    <h4
                      onClick={() => onSelectAnimal && onSelectAnimal(animal)}
                      className="font-bold text-base text-white hover:text-indigo-300 transition-colors line-clamp-1 cursor-pointer"
                    >
                      {animal.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed flex-1">
                      {animal.description}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700/60">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                          Adoption Fee
                        </span>
                        <span className="text-lg font-black text-indigo-400">
                          {animal.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectAnimal && onSelectAnimal(animal)}
                          className="py-2 px-3 rounded-xl text-xs font-semibold bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                        >
                          Meet
                        </button>

                        <button
                          onClick={() => handleAdopt(animal)}
                          className={`py-2 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition transform active:scale-95 shadow-md ${
                            adopted
                              ? 'bg-emerald-600/20 border border-emerald-500 text-emerald-300 hover:bg-emerald-600/30'
                              : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white'
                          }`}
                        >
                          {adopted ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Adopted</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Adopt</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
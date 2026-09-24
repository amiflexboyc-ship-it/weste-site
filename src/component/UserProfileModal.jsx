import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Calendar,
  Heart,
  ShoppingBag,
  LogOut,
  Edit2,
  Check,
  Shield,
  Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const UserProfileModal = ({ isOpen, onClose }) => {
  const { user, logout, updateProfile, toggleFavorite } = useAuth();
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [activeTab, setActiveTab] = useState('favorites'); // 'favorites' | 'adoptions'

  if (!isOpen || !user) return null;

  const handleStartEdit = () => {
    setEditName(user.name);
    setEditBio(user.bio || '');
    setIsEditing(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editName.trim()) {
      showToast('Name cannot be empty', 'error');
      return;
    }
    updateProfile({ name: editName, bio: editBio });
    setIsEditing(false);
    showToast('Profile updated successfully!', 'success');
  };

  const handleLogout = () => {
    logout();
    onClose();
    showToast('You have been logged out safely.', 'info');
  };

  const handleRemoveFavorite = (animalName) => {
    toggleFavorite(animalName);
    showToast(`Removed "${animalName}" from favorites.`, 'info');
  };

  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      })
    : 'Recently';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Dark blur backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-200">
        {/* Glow Accent Header */}
        <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* User Profile Header Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-slate-800">
            {/* Avatar */}
            <div className="relative group">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-lg shadow-indigo-900/30 bg-slate-800"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-slate-900" />
            </div>

            {/* User Meta */}
            <div className="flex-1 text-center sm:text-left">
              {!isEditing ? (
                <>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {user.role}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    {user.email}
                  </p>
                  <p className="text-sm text-slate-300 mt-2 italic bg-slate-800/40 p-2.5 rounded-xl border border-slate-800">
                    "{user.bio || 'Wildlife enthusiast and animal advocate.'}"
                  </p>

                  <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" /> Member since {formattedDate}
                    </span>
                    <button
                      onClick={handleStartEdit}
                      className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition"
                    >
                      <Edit2 className="w-3 h-3" /> Edit Profile
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSaveEdit} className="space-y-3 w-full">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Bio</label>
                    <textarea
                      rows={2}
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/50 hover:text-rose-400 text-slate-400 border border-slate-700 hover:border-rose-800/60 transition flex items-center gap-1.5 text-xs font-medium"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>

          {/* Activity Section Tabs */}
          <div className="mt-6">
            <div className="flex border-b border-slate-800 gap-6">
              <button
                onClick={() => setActiveTab('favorites')}
                className={`pb-3 text-sm font-semibold flex items-center gap-2 transition border-b-2 ${
                  activeTab === 'favorites'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Saved Favorites ({user.favorites ? user.favorites.length : 0})</span>
              </button>
              <button
                onClick={() => setActiveTab('adoptions')}
                className={`pb-3 text-sm font-semibold flex items-center gap-2 transition border-b-2 ${
                  activeTab === 'adoptions'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Adoptions & Orders ({user.adoptions ? user.adoptions.length : 0})</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="pt-4 max-h-64 overflow-y-auto pr-1">
              {activeTab === 'favorites' && (
                <div>
                  {(!user.favorites || user.favorites.length === 0) ? (
                    <div className="text-center py-8 text-slate-500 text-sm">
                      <Heart className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                      <p>You haven't added any favorite animals yet.</p>
                      <p className="text-xs text-slate-600 mt-1">
                        Click the heart icon on any animal card to save it here!
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {user.favorites.map((animalName, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                            <span className="text-sm font-medium text-slate-200">{animalName}</span>
                          </div>
                          <button
                            onClick={() => handleRemoveFavorite(animalName)}
                            className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-700 transition"
                            title="Remove favorite"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'adoptions' && (
                <div>
                  {(!user.adoptions || user.adoptions.length === 0) ? (
                    <div className="text-center py-8 text-slate-500 text-sm">
                      <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                      <p>No adoptions or purchases yet.</p>
                      <p className="text-xs text-slate-600 mt-1">
                        Browse the animal gallery and click "Adopt / Buy" to start an adoption.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {user.adoptions.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60"
                        >
                          <div className="flex items-center gap-3">
                            {item.img && (
                              <img
                                src={item.img}
                                alt={item.name}
                                className="w-10 h-10 rounded-lg object-cover border border-slate-700"
                              />
                            )}
                            <div>
                              <div className="text-sm font-medium text-white">{item.name}</div>
                              <div className="text-xs text-slate-400">Date: {item.date}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-emerald-400">{item.price}</div>
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                              {item.status || 'Active'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;

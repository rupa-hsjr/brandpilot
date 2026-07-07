'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Briefcase, 
  MapPin, 
  Target, 
  Sparkles, 
  Edit3, 
  Linkedin, 
  Twitter, 
  Youtube,
  Save,
  Check
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>({
    profession: 'AI Solutions Architect & Tech Creator',
    industry: 'Technology / AI',
    niche: 'Explainable AI, LLM Agents & Tech Career Growth',
    targetAudience: 'Software Engineers, CTOs, Tech Product Managers',
    goals: 'Establish thought leadership, build audience, grow newsletter subscribers',
    preferredTone: 'Professional, educational, slightly witty',
    brandScore: 82,
    bio: 'Building developer tools in public. Explaining LLMs, AI agents, and production architectures simply.'
  });

  const [userName, setUserName] = useState('Alex Mercer');
  const [editName, setEditName] = useState('Alex Mercer');
  const [isEditing, setIsEditing] = useState(false);
  const [profession, setProfession] = useState(profile.profession);
  const [industry, setIndustry] = useState(profile.industry);
  const [goals, setGoals] = useState(profile.goals);
  const [bio, setBio] = useState(profile.bio);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        const u = JSON.parse(stored);
        if (u.name) {
          setUserName(u.name);
          setEditName(u.name);
        }
      }
    } catch {}

    async function loadProfile() {
      try {
        const res = await fetch('/api/profile');
        const data = await res.json();
        if (data.profile) {
          setProfile(data.profile);
          setProfession(data.profile.profession);
          setIndustry(data.profile.industry);
          setGoals(data.profile.goals);
          setBio(data.profile.brandSummary || data.profile.goals);
        }
      } catch {}
    }
    loadProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    
    // Save to local storage for dynamic sync
    try {
      const stored = localStorage.getItem('user');
      const u = stored ? JSON.parse(stored) : {};
      u.name = editName;
      localStorage.setItem('user', JSON.stringify(u));
      setUserName(editName);
    } catch {}

    setProfile({
      ...profile,
      profession,
      industry,
      goals,
      bio
    });
    setIsEditing(false);
    setTimeout(() => {
      setSaved(false);
      window.location.reload(); // reload to sync global navbar state
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-xs md:text-sm max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          Personal Brand Profile <User className="w-6 h-6 text-violet-400" />
        </h1>
        <p className="text-zinc-500 text-xs mt-1 font-medium">Verify your market positioning credentials and brand scorecard details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Card Summary */}
        <div className="p-6 rounded-2xl glass-panel text-center space-y-6 flex flex-col items-center">
          {/* Photo Slot */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-white text-3xl shadow-xl shadow-violet-500/20">
              {userName.substring(0, 2).toUpperCase()}
            </div>
            <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
              <Edit3 className="w-5 h-5 text-white" />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg text-white">{userName}</h3>
            <span className="text-xs text-violet-400 font-semibold">{profile.profession}</span>
          </div>

          {/* Score widget */}
          <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-900 w-full flex justify-between items-center text-left">
            <div>
              <span className="font-semibold text-zinc-400 text-xs">AI Brand Score</span>
              <span className="text-[10px] text-zinc-500 block mt-0.5">Top positioning bracket</span>
            </div>
            <span className="text-2xl font-black text-violet-400 bg-violet-950/40 px-3 py-1.5 rounded-lg border border-violet-900/30">
              {profile.brandScore}/100
            </span>
          </div>

          {/* Connected platforms */}
          <div className="w-full space-y-2 text-left">
            <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] block">Connected Channels</span>
            <div className="flex gap-2">
              <div className="p-2 rounded-lg bg-zinc-900 text-violet-400 border border-zinc-800"><Linkedin className="w-4 h-4" /></div>
              <div className="p-2 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800"><Twitter className="w-4 h-4" /></div>
              <div className="p-2 rounded-lg bg-zinc-900 text-rose-400 border border-zinc-800 opacity-40"><Youtube className="w-4 h-4" /></div>
            </div>
          </div>
        </div>

        {/* Edit Form / Bio Details */}
        <div className="lg:col-span-2 p-6 rounded-2xl glass-panel">
          <div className="flex justify-between items-center pb-4 border-b border-zinc-900 mb-6">
            <h3 className="font-bold text-sm text-zinc-200">Brand Positioning details</h3>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 py-1.5 px-3 rounded-lg border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          {saved && (
            <p className="text-xs text-emerald-400 font-semibold mb-4 flex items-center gap-1">
              <Check className="w-4 h-4" /> Profile saved successfully!
            </p>
          )}

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-2">Display Name</label>
                  <input 
                    type="text" 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl py-3 px-3 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-2">Profession</label>
                  <input 
                    type="text" 
                    value={profession} 
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl py-3 px-3 text-xs text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-2">Industry</label>
                  <input 
                    type="text" 
                    value={industry} 
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl py-3 px-3 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-2">Core Branding Goals</label>
                  <input 
                    type="text" 
                    value={goals} 
                    onChange={(e) => setGoals(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl py-3 px-3 text-xs text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-2">Bio / Overview</label>
                <textarea 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full bg-zinc-900 border border-zinc-850 rounded-xl py-3 px-3 text-xs text-white resize-none"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="py-2.5 px-4 bg-zinc-900 text-zinc-400 hover:text-white rounded-xl border border-zinc-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="py-2.5 px-5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-5 text-xs text-zinc-300">
              <div>
                <span className="font-bold text-zinc-500 uppercase tracking-wider text-[10px] block">Bio / Summary</span>
                <p className="mt-1.5 leading-relaxed text-zinc-300 bg-zinc-900/40 p-3 rounded-xl border border-zinc-900">{profile.bio}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-bold text-zinc-500 uppercase tracking-wider text-[10px] block">Profession</span>
                  <span className="mt-1 font-semibold text-zinc-200 block">{profile.profession}</span>
                </div>
                <div>
                  <span className="font-bold text-zinc-500 uppercase tracking-wider text-[10px] block">Industry</span>
                  <span className="mt-1 font-semibold text-zinc-200 block">{profile.industry}</span>
                </div>
              </div>
              <div>
                <span className="font-bold text-zinc-500 uppercase tracking-wider text-[10px] block">Goals</span>
                <p className="mt-1 text-zinc-200 leading-relaxed font-semibold">{profile.goals}</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Eye, 
  Calendar, 
  ArrowUpRight, 
  ArrowRight,
  RefreshCw,
  Plus,
  CheckSquare,
  Clock,
  ListTodo,
  TrendingDown,
  ThumbsUp
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>({ brandScore: 82 });
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const profRes = await fetch('/api/profile');
        const profData = await profRes.json();
        if (profData.profile) setProfile(profData.profile);

        const anRes = await fetch('/api/analytics');
        const anData = await anRes.json();
        setAnalytics(anData.analytics || []);
        setTrendData(anData.engagementTrend || []);

        const calRes = await fetch('/api/calendar');
        const calData = await calRes.json();
        setUpcomingEvents((calData.events || []).slice(0, 3));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const stats = [
    { title: "AI Brand Score", value: `${profile.brandScore || 82}/100`, change: "Post twice this week to improve your score.", icon: Sparkles, color: "text-violet-400 bg-violet-950/40" },
    { title: "Content Quality Score", value: "85/100", change: "Top 10% in tech niche", icon: ThumbsUp, color: "text-emerald-400 bg-emerald-950/40" },
    { title: "Best Posting Time", value: "Tue 8:30 AM", change: "LinkedIn optimal window", icon: Clock, color: "text-blue-400 bg-blue-950/40" },
    { title: "Weekly AI Suggestion", value: "Create X Thread", change: "Trending topic: Agentic UI", icon: Sparkles, color: "text-fuchsia-400 bg-fuchsia-950/40" }
  ];

  const aiSuggestions = [
    { text: "Generate one LinkedIn post", action: "/dashboard/generator" },
    { text: "Reply to comments on recent X thread", action: "#" },
    { text: "Schedule tomorrow's content calendar slot", action: "/dashboard/calendar" }
  ];

  const recentActivities = [
    { title: "Post published successfully", time: "2 hours ago", platform: "linkedin" },
    { title: "Analytics dashboard synced", time: "4 hours ago", platform: "system" },
    { title: "New event added to calendar", time: "1 day ago", platform: "calendar" }
  ];

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse p-4">
        <div className="h-8 bg-zinc-900 rounded-lg w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-28 bg-zinc-900 rounded-2xl" />)}
        </div>
        <div className="h-80 bg-zinc-900 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-xs md:text-sm">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Brand Engine Dashboard</h1>
          <p className="text-zinc-500 text-xs mt-1">Real-time audience monitoring and AI content scheduling</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Refresh Data</span>
        </button>
      </div>

      {/* Stats / AI features Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl glass-panel relative overflow-hidden group hover:border-zinc-700/60 transition-all duration-300 flex flex-col justify-between min-h-[120px]">
              <div className="flex justify-between items-start">
                <span className="text-zinc-400 text-xs font-semibold">{s.title}</span>
                <div className={`p-2.5 rounded-xl ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-extrabold text-white">{s.value}</h3>
                <span className="text-[10px] text-zinc-400 mt-1 block">
                  {s.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Chart Section */}
      <div className="p-6 rounded-2xl glass-panel border border-zinc-800/80">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-bold text-sm text-zinc-200">Engagement & Reach Performance</h3>
            <p className="text-zinc-500 text-[10px]">Weekly metrics summary across platforms</p>
          </div>
        </div>
        <div className="h-64 md:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="name" stroke="#71717a" fontSize={10} />
              <YAxis stroke="#71717a" fontSize={10} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }} 
                labelStyle={{ fontSize: '10px', color: '#a1a1aa' }}
              />
              <Area type="monotone" dataKey="Reach" stroke="#7c3aed" fillOpacity={1} fill="url(#colorReach)" strokeWidth={2} />
              <Area type="monotone" dataKey="Engagement" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEngagement)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Widget 1: Today's AI Suggestions */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="font-bold text-sm text-zinc-200 flex items-center gap-1.5">
            <ListTodo className="w-4 h-4 text-violet-400" />
            Today's AI Suggestions
          </h3>
          <div className="space-y-2.5">
            {aiSuggestions.map((s, idx) => (
              <div 
                key={idx} 
                onClick={() => s.action !== '#' && router.push(s.action)}
                className="p-3 bg-zinc-900/60 hover:bg-zinc-800/40 rounded-xl border border-zinc-900 transition-all cursor-pointer flex items-center gap-2.5"
              >
                <CheckSquare className="w-4.5 h-4.5 text-violet-400 flex-shrink-0" />
                <span className="text-zinc-300 font-medium">{s.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 2: Today's Schedule & Events */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="font-bold text-sm text-zinc-200 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-400" />
            Today's Schedule & Events
          </h3>
          {upcomingEvents.length === 0 ? (
            <p className="text-zinc-500 text-xs py-4 text-center">No events scheduled for today.</p>
          ) : (
            <div className="space-y-2.5">
              {upcomingEvents.map(e => (
                <div key={e.id} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-900 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-zinc-200 block">{e.title}</span>
                    <span className="text-[10px] text-zinc-500 block mt-0.5 capitalize">{e.type}</span>
                  </div>
                  <button 
                    onClick={() => router.push('/dashboard/calendar')}
                    className="p-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Widget 3: Recent Activity */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="font-bold text-sm text-zinc-200 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-400" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivities.map((act, idx) => (
              <div key={idx} className="flex justify-between items-start text-xs border-b border-zinc-900 pb-2 last:border-0 last:pb-0">
                <div>
                  <span className="text-zinc-300 block font-medium">{act.title}</span>
                  <span className="text-[10px] text-zinc-500 block mt-0.5 capitalize">{act.platform}</span>
                </div>
                <span className="text-[10px] text-zinc-500">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

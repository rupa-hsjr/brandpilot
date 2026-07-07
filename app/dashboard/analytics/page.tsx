'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Flame, 
  HelpCircle,
  Clock,
  Compass,
  ThumbsUp,
  LineChart,
  Calendar
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

export default function AnalyticsPage() {
  const [platformData, setPlatformData] = useState<any[]>([]);
  const [bestTimes, setBestTimes] = useState<any[]>([]);
  const [topPosts, setTopPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/analytics');
        const data = await res.json();
        setPlatformData(data.platformComparison || []);
        setBestTimes(data.bestTimes?.linkedin || []);
        setTopPosts(data.topPosts || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const metricCards = [
    { title: "Best Performing Platform", value: "LinkedIn", desc: "65% engagement index", icon: Compass, color: "text-violet-400 bg-violet-950/40" },
    { title: "Best Posting Time", value: "Tue 8:30 AM", desc: "LinkedIn peak window", icon: Clock, color: "text-blue-400 bg-blue-950/40" },
    { title: "Weekly Growth Card", value: "+4.2% Reach", desc: "+1,200 impressions", icon: TrendingUp, color: "text-emerald-400 bg-emerald-950/40" },
    { title: "Monthly Growth Card", value: "+12% Followers", desc: "+1,500 new followers", icon: ThumbsUp, color: "text-fuchsia-400 bg-fuchsia-950/40" }
  ];

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse p-4">
        <div className="h-8 bg-zinc-900 rounded-lg w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-28 bg-zinc-900 rounded-2xl" />)}
        </div>
        <div className="h-64 bg-zinc-900 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-xs md:text-sm">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          Engagement Analytics <BarChart3 className="w-6 h-6 text-violet-400" />
        </h1>
        <p className="text-zinc-500 text-xs mt-1">Cross-platform analytics breakdowns and AI-suggested posting times</p>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((c, idx) => {
          const Icon = c.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl glass-panel relative overflow-hidden flex flex-col justify-between min-h-[120px]">
              <div className="flex justify-between items-start">
                <span className="text-zinc-400 text-xs font-semibold">{c.title}</span>
                <div className={`p-2.5 rounded-xl ${c.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-extrabold text-white">{c.value}</h3>
                <span className="text-[10px] text-zinc-500 block mt-1">{c.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Platform Comparison */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <div>
            <h3 className="font-bold text-sm text-zinc-200">Platform Performance Comparison</h3>
            <p className="text-zinc-500 text-[10px]">Average monthly engagement index</p>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="platform" stroke="#71717a" fontSize={10} />
                <YAxis stroke="#71717a" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }}
                />
                <Bar dataKey="Engagement" radius={[8, 8, 0, 0]}>
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || '#7c3aed'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Optimal Posting Hours Grid */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <div>
            <h3 className="font-bold text-sm text-zinc-200 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-violet-400" />
              Best Posting Times
            </h3>
            <p className="text-zinc-500 text-[10px]">AI-calculated optimal posting periods based on weekly algorithms</p>
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {bestTimes.map((t, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-600/10 text-violet-400 flex items-center justify-center font-bold">
                    {t.day}
                  </div>
                  <div>
                    <span className="font-bold text-zinc-200 block">{t.time}</span>
                    <span className="text-[10px] text-zinc-500">Peak visibility window</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400">{t.score}% Success</span>
                  <span className="text-[9px] text-zinc-500 block mt-0.5">Reach score</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Posts Table */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <div>
          <h3 className="font-bold text-sm text-zinc-200">Top Content Card</h3>
          <p className="text-zinc-500 text-[10px]">Successful posts ranked by engagement and reach</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-[10px] text-zinc-400 uppercase tracking-wider">
                <th className="py-3 px-4">Post Title / Hook</th>
                <th className="py-3 px-4">Platform</th>
                <th className="py-3 px-4">Reach</th>
                <th className="py-3 px-4">Engagement</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-xs">
              {topPosts.map((post) => (
                <tr key={post.id} className="hover:bg-zinc-900/40 transition-colors">
                  <td className="py-3 px-4 font-medium text-zinc-200 max-w-xs truncate">{post.title}</td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      {post.platform}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-zinc-300 font-semibold">{post.reach.toLocaleString()}</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">{post.engagement}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-800/20 text-[10px] font-bold">
                      {post.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

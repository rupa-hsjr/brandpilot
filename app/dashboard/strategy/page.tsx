'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, HelpCircle, CheckCircle2, MessageSquare, Compass, RefreshCw, Clock, Users, Target } from 'lucide-react';

export default function StrategyPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  async function loadReports() {
    setLoading(true);
    try {
      const res = await fetch('/api/strategy');
      const data = await res.json();
      setReports(data.reports || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  const handleGenerateReport = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'weekly',
          contentStrategy: "Expand your posting presence into short X threads. We notice high market interest in 'Autonomous Multi-Agent design pattern breakdowns'. Leverage code blocks.",
          growthSuggestions: "Participate in Tech Twitter spaces. Reply to 10 industry creators within 15 minutes of their posting to borrow their audience reach algorithmically.",
          trendingTopics: "LangGraph workflows, Next.js Middleware security, Developer Advocacy careers",
          postingTimeSuggest: "LinkedIn: Wed 9:00 AM | X: Thu 1:30 PM"
        })
      });
      if (res.ok) {
        await loadReports();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse p-4">
        <div className="h-8 bg-zinc-900 rounded-lg w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5].map(i => <div key={i} className="h-44 bg-zinc-900 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  const latestReport = reports[0] || {
    contentStrategy: "Focus on detailed 'how-to' carousel guides for LinkedIn. Share bite-sized technical tips weekly.",
    growthSuggestions: "Join 2 industry Twitter spaces and write summary threads afterwards. Engage with 5 peers daily.",
    trendingTopics: "Next.js 15, AI Agents, Tailwind v4",
    postingTimeSuggest: "LinkedIn: Tue 8:30 AM | X: Wed 12:00 PM"
  };

  const cards = [
    {
      title: "Weekly Recommendation",
      desc: latestReport.contentStrategy,
      icon: Sparkles,
      color: "text-violet-400 bg-violet-950/30 border-violet-900/40"
    },
    {
      title: "Best Posting Time",
      desc: latestReport.postingTimeSuggest,
      icon: Clock,
      color: "text-blue-400 bg-blue-950/30 border-blue-900/40"
    },
    {
      title: "Content Suggestion",
      desc: `Trending tags to use: ${latestReport.trendingTopics}. Create 1 in-depth breakdown post.`,
      icon: Compass,
      color: "text-emerald-400 bg-emerald-950/30 border-emerald-900/40"
    },
    {
      title: "Audience Insight",
      desc: "Your core audience engagement spikes during early morning hours. Industry peers are actively commenting on engineering logs.",
      icon: Users,
      color: "text-fuchsia-400 bg-fuchsia-950/30 border-fuchsia-900/40"
    },
    {
      title: "Next Week Goal",
      desc: "Increase LinkedIn post frequency to 3x weekly and reply to at least 15 comments to push algorithmic reach index.",
      icon: Target,
      color: "text-amber-400 bg-amber-950/30 border-amber-900/40"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-xs md:text-sm">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            AI Growth Strategy <Sparkles className="w-6 h-6 text-violet-400" />
          </h1>
          <p className="text-zinc-500 text-xs mt-1">Get customized brand positions, trending topics, and optimization guides weekly</p>
        </div>
        <button
          onClick={handleGenerateReport}
          disabled={generating}
          className="flex items-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 text-white font-semibold transition-colors"
        >
          {generating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>Request AI Analysis</span>
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, idx) => {
          const Icon = c.icon;
          return (
            <div key={idx} className={`p-6 rounded-2xl border glass-panel flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-colors`}>
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-zinc-200">{c.title}</h3>
                <div className={`p-2 rounded-lg ${c.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-zinc-400 leading-relaxed text-xs">
                {c.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

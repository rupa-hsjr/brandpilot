'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  ChevronRight, 
  BarChart3, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Flame, 
  Maximize2,
  Cpu,
  MessageSquare,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = [
    {
      icon: Cpu,
      title: "AI Profile Analysis",
      desc: "Instant breakdown of your industry niche, tone of voice alignment, and actionable feedback to maximize audience traction."
    },
    {
      icon: Sparkles,
      title: "AI Content Generation",
      desc: "Generate LinkedIn posts, X threads, YouTube scripts, and hooks optimized for high reach and click-through rates."
    },
    {
      icon: Calendar,
      title: "Calendar Intelligence",
      desc: "Turn launching events, webinars, and daily activities into direct post suggestions contextually preconfigured by AI."
    },
    {
      icon: BarChart3,
      title: "Engagement Analytics",
      desc: "Stunning charts, post performance heatmaps, and algorithms that suggest your ultimate posting times for every platform."
    },
    {
      icon: Users,
      title: "Social Queue Scheduling",
      desc: "Craft drafts and scheduled posts, and monitor the automated queue to execute publishing hands-free."
    },
    {
      icon: Flame,
      title: "AI Growth Strategy",
      desc: "Receive weekly reports analyzing brand score trends, rising industry trends, and personalized engagement advice."
    }
  ];

  const workflowSteps = [
    { step: "01", title: "Analyze Brand Profile", desc: "Share your target industry, profession, niche, and goals to generate your initial Brand Score." },
    { step: "02", title: "Generate & Schedule", desc: "Input topics or link custom calendar events. The AI drafts ready-to-post drafts for all your channels." },
    { step: "03", title: "Scale engagement", desc: "Track performance graphs, auto-publish scheduled items, and optimize using AI weekly intelligence report recommendations." }
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "$0",
      desc: "Perfect for testing the AI brand engine.",
      features: ["5 AI Post generations / month", "Basic Profile Analysis", "1 Social profile connected", "Standard Calendar Planner"],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Pro Pilot",
      price: "$29",
      desc: "For content creators and tech leaders.",
      features: ["Unlimited AI generations", "Deep Profile Analytics & Recommendations", "Connect up to 5 profiles", "Full AI Calendar Integration", "Weekly AI Strategy Reports", "AI Chat Coach Assistant"],
      cta: "Go Pro",
      popular: true
    },
    {
      name: "Brand Executive",
      price: "$89",
      desc: "For agencies and executive branding.",
      features: ["Everything in Pro", "Unlimited connected profiles", "Team collaboration space", "Advanced API keys integration", "Custom Brand Score formulas", "Priority human & AI support"],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    { q: "How does the Brand Score work?", a: "Our AI Profile analyzer scans your input parameters (niche, frequency, platform, audience) and matches them against top performing profiles to score your current branding clarity out of 100." },
    { q: "Can I connect my real social media accounts?", a: "Yes! You can authorize and link LinkedIn, X, and YouTube accounts via secure official API logins. For testing and hackathon modes, we provide a complete publishing queue simulation." },
    { q: "Is the generated content customizable?", a: "Absolutely. You can request tone shifts (witty, corporate, educational), length modifications, generate hooks, CTA inclusions, or custom thread variations in one-click." }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-950/25 blur-[150px] pointer-events-none" />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 glass-panel-heavy border-b border-zinc-800/80 px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600">
            <Globe className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            BrandPilot AI
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#workflow" className="hover:text-white transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="text-xs font-semibold px-4 py-2 hover:text-white text-zinc-300 transition-colors">
            Sign In
          </Link>
          <Link href="/register" className="text-xs font-semibold px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/15 transition-all duration-200">
            Get Started
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative px-6 pt-20 pb-24 md:pt-32 md:pb-36 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Animated tag */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-950/40 border border-violet-800/60 text-xs text-violet-300 font-medium mb-6 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Personal Brand Growth, Powered by Generative AI</span>
        </motion.div>

        {/* Hero Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl"
        >
          Build Your Personal Brand <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent animate-gradient">
            with Next-Gen AI
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-zinc-400 text-base md:text-lg max-w-2xl mt-6 leading-relaxed"
        >
          Optimize your profile positioning, design calendar strategies, schedule high-engagement posts, and receive weekly personalized growth reports automatically.
        </motion.p>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10"
        >
          <button 
            onClick={() => router.push('/register')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-violet-500/25 transition-all duration-200 hover:scale-[1.02]"
          >
            <span>Launch Brand Engine</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <a 
            href="#features"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-sm transition-all duration-200"
          >
            Explore Features
          </a>
        </motion.div>

        {/* Floating Mockup Card Preview */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 md:mt-20 w-full max-w-5xl rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-2 md:p-3 shadow-2xl relative overflow-hidden backdrop-blur-md"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 to-indigo-600/5 pointer-events-none" />
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
            alt="BrandPilot AI Dashboard mockup preview"
            className="w-full h-auto rounded-xl opacity-80 border border-zinc-800"
          />
        </motion.div>
      </section>

      {/* FEATURES SECTION (Bento Grid) */}
      <section id="features" className="px-6 py-20 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to pilot your voice</h2>
          <p className="text-zinc-400 text-sm mt-3">From automated calendars to detailed brand score analytics, we cover the full creator stack.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div 
                key={i} 
                className="p-6 rounded-2xl glass-panel hover:bg-zinc-900/40 hover:border-zinc-700/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="p-3 rounded-xl bg-violet-600/10 text-violet-400 w-fit mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-lg text-zinc-100">{f.title}</h3>
                  <p className="text-zinc-400 text-xs mt-2 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="workflow" className="px-6 py-20 max-w-7xl mx-auto border-t border-zinc-900 bg-zinc-950/40">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
          <p className="text-zinc-400 text-sm mt-3">Go from blank slate to high engagement brand in three steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workflowSteps.map((s, idx) => (
            <div key={idx} className="relative p-6 rounded-2xl border border-zinc-900 bg-zinc-900/20 backdrop-blur-md">
              <span className="text-5xl font-black text-violet-500/10 absolute top-4 right-4">{s.step}</span>
              <h3 className="font-bold text-lg text-zinc-100 mt-2">{s.title}</h3>
              <p className="text-zinc-400 text-xs mt-3 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-6 py-20 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Flexible pricing for creators</h2>
          <p className="text-zinc-400 text-sm mt-3">Simple plans built for founders, developers, and creators.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((p, idx) => (
            <div 
              key={idx}
              className={`p-8 rounded-2xl flex flex-col justify-between relative transition-all duration-300
                ${p.popular 
                  ? 'bg-zinc-900/60 border-2 border-violet-500 shadow-2xl scale-[1.03] md:translate-y-[-4px]' 
                  : 'bg-zinc-900/20 border border-zinc-900'
                }
              `}
            >
              {p.popular && (
                <span className="absolute top-0 right-1/2 translate-x-1/2 translate-y-[-50%] px-3 py-1 rounded-full bg-violet-600 text-[10px] uppercase font-bold tracking-widest text-white shadow-lg shadow-violet-500/20">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="font-bold text-xl text-zinc-100">{p.name}</h3>
                <p className="text-zinc-400 text-xs mt-1.5">{p.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{p.price}</span>
                  <span className="text-zinc-400 text-xs">/month</span>
                </div>
                <ul className="mt-8 space-y-3.5 text-xs text-zinc-300">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-violet-400 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => router.push('/register')}
                className={`w-full py-3.5 rounded-xl font-semibold text-xs mt-8 transition-colors ${
                  p.popular 
                    ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/10' 
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="px-6 py-20 max-w-4xl mx-auto border-t border-zinc-900">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="border-b border-zinc-900 pb-4">
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full flex justify-between items-center text-left py-2 font-medium text-sm text-zinc-100 hover:text-white"
              >
                <span>{f.q}</span>
                <span className="text-violet-400 text-lg">{activeFaq === i ? '−' : '+'}</span>
              </button>
              {activeFaq === i && (
                <p className="text-xs text-zinc-400 leading-relaxed mt-2 pl-1 animate-in fade-in-50 duration-200">
                  {f.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-violet-600">
              <Globe className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-sm tracking-tight text-zinc-100">
              BrandPilot AI
            </span>
          </div>
          <p className="text-zinc-500 text-xs">
            © 2026 BrandPilot AI. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-zinc-500">
            <a href="#" className="hover:text-zinc-300">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

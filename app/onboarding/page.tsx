'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [profession, setProfession] = useState('');
  const [industry, setIndustry] = useState('');
  const [niche, setNiche] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [goals, setGoals] = useState('');
  const [postingFrequency, setPostingFrequency] = useState('3 times a week');
  const [preferredTone, setPreferredTone] = useState('professional');

  // AI Result State
  const [aiReport, setAiReport] = useState<any>(null);

  const togglePlatform = (p: string) => {
    if (platforms.includes(p)) {
      setPlatforms(platforms.filter(x => x !== p));
    } else {
      setPlatforms([...platforms, p]);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profession,
          industry,
          niche,
          targetAudience,
          platforms,
          goals,
          postingFrequency,
          preferredTone
        })
      });
      const data = await res.json();
      if (res.ok) {
        setAiReport(data.aiAnalysis);
        setStep(4); // Move to AI review card screen
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main wizard container */}
      <div className="w-full max-w-xl rounded-2xl glass-panel-heavy p-8 border border-zinc-800 shadow-2xl relative z-10">
        
        {/* Step indicator */}
        {step < 4 && (
          <div className="flex justify-between items-center mb-8 border-b border-zinc-900 pb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">Step {step} of 3</span>
            <div className="flex gap-1">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`w-8 h-1.5 rounded-full transition-all duration-300 ${s <= step ? 'bg-violet-600' : 'bg-zinc-800'}`} 
                />
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: Basic positioning */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-3 duration-300">
            <div>
              <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                Let's configure your profession <Sparkles className="w-5 h-5 text-violet-400" />
              </h2>
              <p className="text-zinc-500 text-xs mt-1">Specify what you do and your target industry space</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Profession / Title</label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="e.g. AI Solutions Engineer, Creator, Writer"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-violet-500 placeholder-zinc-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Target Industry</label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. Technology, Digital Marketing, SaaS"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-violet-500 placeholder-zinc-600 transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Niche & Audience */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-3 duration-300">
            <div>
              <h2 className="text-xl font-bold text-zinc-100">Define niche & target audience</h2>
              <p className="text-zinc-500 text-xs mt-1">Hone in on your voice positioning for maximum impact</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Content Niche / Focus</label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. Explainable AI, Remote Developer productivity tips"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-violet-500 placeholder-zinc-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Target Audience Persona</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Tech Founders, CTOs, Junior Developers"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-violet-500 placeholder-zinc-600 transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Tone & Platforms */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-3 duration-300">
            <div>
              <h2 className="text-xl font-bold text-zinc-100">Goals, Platforms & Style</h2>
              <p className="text-zinc-500 text-xs mt-1">Configure publishing destinations and branding tone</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2.5">Target Platforms</label>
                <div className="flex gap-2 flex-wrap">
                  {['LinkedIn', 'X / Twitter', 'YouTube', 'Instagram', 'Facebook'].map(p => {
                    const id = p.toLowerCase().split(' ')[0];
                    const selected = platforms.includes(id);
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => togglePlatform(id)}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          selected 
                            ? 'bg-violet-600/20 border-violet-500 text-white shadow-md' 
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Preferred Tone of Voice</label>
                <select
                  value={preferredTone}
                  onChange={(e) => setPreferredTone(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="professional">Professional / Educational</option>
                  <option value="witty">Witty / Conversational</option>
                  <option value="bold">Bold / Disruptive</option>
                  <option value="technical">Highly Technical / Detailed</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Primary Branding Goal</label>
                <input
                  type="text"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="e.g. Build audience, land consulting clients, share open-source work"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-violet-500 placeholder-zinc-600 transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: AI Assessment Analysis Results Screen */}
        {step === 4 && aiReport && (
          <div className="space-y-6 animate-in zoom-in-95 duration-400 text-xs">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-violet-600/10 text-violet-400 flex items-center justify-center mx-auto mb-3 border border-violet-500/20">
                <Sparkles className="w-8 h-8 animate-spin" />
              </div>
              <h2 className="text-xl font-bold text-white">AI Profile Summary Generated</h2>
              <p className="text-zinc-400 text-xs mt-1">Here is your customized initial brand diagnosis</p>
            </div>

            {/* Score box */}
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-zinc-200">AI Brand Score</h4>
                <p className="text-zinc-500 mt-0.5 text-[10px]">Based on market positioning data</p>
              </div>
              <div className="text-3xl font-black text-violet-400 bg-violet-950/40 px-4 py-2 rounded-xl border border-violet-800/40">
                {aiReport.brandScore}/100
              </div>
            </div>

            {/* Brand Summary */}
            <div className="space-y-2">
              <span className="font-bold uppercase tracking-wider text-zinc-400">Diagnosis Summary</span>
              <p className="p-3 bg-zinc-900/60 rounded-xl text-zinc-300 leading-relaxed border border-zinc-900">
                {aiReport.brandSummary}
              </p>
            </div>

            {/* Recommendations */}
            <div className="space-y-2">
              <span className="font-bold uppercase tracking-wider text-zinc-400">Immediate Strategy Actions</span>
              <ul className="space-y-2">
                {aiReport.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="flex gap-2 items-start text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => router.push('/dashboard')}
              className="w-full flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold transition-all"
            >
              <span>Enter Workspace Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Action Buttons */}
        {step < 4 && (
          <div className="mt-8 flex justify-between pt-4 border-t border-zinc-900">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 py-2.5 px-4 rounded-xl hover:bg-zinc-900/50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={handleNext}
              disabled={loading}
              className="flex items-center gap-1.5 py-3.5 px-6 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 text-white font-semibold text-xs transition-colors"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>{step === 3 ? 'Generate Profile' : 'Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Calendar, 
  Trash2,
  FileText, 
  ArrowRight,
  RefreshCw,
  X
} from 'lucide-react';

export default function GeneratorPage() {
  const [platform, setPlatform] = useState('linkedin');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Result States
  const [generatedPost, setGeneratedPost] = useState<any>(null);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('09:00');
  const [schedulerStatus, setSchedulerStatus] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    setLoading(true);
    setGeneratedPost(null);
    setSchedulerStatus('');

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate', platform, topic, tone, length })
      });
      const data = await res.json();
      if (res.ok) {
        setGeneratedPost(data.post);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedPost) return;
    navigator.clipboard.writeText(generatedPost.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setTopic('');
    setGeneratedPost(null);
    setSchedulerStatus('');
  };

  const handleSchedule = async (status: 'DRAFT' | 'SCHEDULED') => {
    if (!generatedPost) return;
    setLoading(true);
    setSchedulerStatus('');

    try {
      const scheduledFor = status === 'SCHEDULED' 
        ? `${scheduledDate}T${scheduledTime}:00` 
        : null;

      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          body: generatedPost.body,
          platform: generatedPost.platform,
          status,
          scheduledFor
        })
      });
      if (res.ok) {
        setSchedulerStatus(status === 'SCHEDULED' ? 'Post scheduled successfully!' : 'Saved to drafts.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-xs md:text-sm">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          AI Content Studio <Sparkles className="w-6 h-6 text-violet-400" />
        </h1>
        <p className="text-zinc-500 text-xs mt-1">Design copy, test tone variations, and schedule to publishing queues instantly</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left Settings */}
        <div className="lg:col-span-2 p-6 rounded-2xl glass-panel space-y-6">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Publish Platform</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'LinkedIn', value: 'linkedin' },
                  { name: 'X / Twitter', value: 'x' },
                  { name: 'Instagram', value: 'instagram' },
                  { name: 'YouTube', value: 'youtube' }
                ].map(p => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPlatform(p.value)}
                    className={`py-2 px-1 rounded-xl border text-[10px] font-bold text-center transition-all ${
                      platform === p.value 
                        ? 'bg-violet-600/20 border-violet-500 text-white' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-300'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Topic prompt</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="What should the post be about?..."
                rows={4}
                required
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-violet-500 placeholder-zinc-600 transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Preferred Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-3 text-xs text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="motivational">Motivational</option>
                  <option value="educational">Educational</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Post Length</label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-3 text-xs text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleClear}
                className="flex-1 py-3 bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 rounded-xl text-xs text-zinc-300 font-semibold transition-colors flex items-center justify-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] flex items-center justify-center gap-1.5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 text-white font-bold transition-all"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Generate</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-3 space-y-6">
          {!generatedPost && !loading ? (
            <div className="rounded-2xl border-2 border-dashed border-zinc-850 p-12 text-center text-zinc-500 flex flex-col items-center justify-center h-full min-h-[300px]">
              <FileText className="w-10 h-10 text-zinc-650 mb-3" />
              <h4 className="font-bold text-zinc-400">Content Studio Preview</h4>
              <p className="text-xs text-zinc-500 max-w-xs mt-1.5 leading-relaxed">Select options on the left and click Generate to run AI draft compilations</p>
            </div>
          ) : loading ? (
            <div className="p-6 rounded-2xl glass-panel space-y-4 min-h-[220px] flex flex-col justify-center items-center">
              <RefreshCw className="w-8 h-8 text-violet-500 animate-spin" />
              <span className="text-xs text-zinc-500 mt-2 font-semibold">AI is generating your draft...</span>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Draft card */}
              <div className="p-6 rounded-2xl glass-panel space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-zinc-900">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400 px-2 py-0.5 rounded bg-violet-950/40 border border-violet-800/30">
                    {generatedPost.platform}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-lg border border-zinc-800 hover:bg-zinc-800 text-zinc-450 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
                <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-900/60 leading-relaxed text-zinc-200 font-mono text-xs whitespace-pre-line">
                  {generatedPost.body}
                </div>
              </div>

              {/* Schedule options */}
              <div className="p-6 rounded-2xl glass-panel space-y-4">
                <h4 className="font-bold text-zinc-300 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  Publish Scheduler
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-2">Publish Date</label>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-3 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-2">Publish Time</label>
                    <input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-3 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                {schedulerStatus && (
                  <p className="text-xs text-emerald-450 font-semibold">{schedulerStatus}</p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => handleSchedule('DRAFT')}
                    className="flex-1 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold transition-colors"
                  >
                    Save Draft
                  </button>
                  <button
                    onClick={() => handleSchedule('SCHEDULED')}
                    disabled={!scheduledDate}
                    className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Schedule</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

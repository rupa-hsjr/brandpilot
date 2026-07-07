'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar as CalendarIcon,
  Plus,
  Sparkles,
  MapPin,
  Video,
  AlertCircle,
  ArrowUpRight,
  Clock,
  LayoutGrid
} from 'lucide-react';

export default function CalendarPage() {
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Event Form State
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('meeting');
  const [eventDesc, setEventDesc] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function loadData() {
      try {
        const evRes = await fetch('/api/calendar');
        const evData = await evRes.json();
        setEvents(evData.events || []);

        const postsRes = await fetch('/api/content');
        const postsData = await postsRes.json();
        setPosts(postsData.contents || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAddEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !eventDate) return;
    setLoading(true);

    try {
      const res = await fetch('/api/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: eventTitle,
          type: eventType,
          description: eventDesc,
          startAt: `${eventDate}T10:00:00`,
          endAt: `${eventDate}T11:00:00`
        })
      });
      const data = await res.json();
      if (res.ok) {
        setEvents([...events, data.event]);
        setEventTitle('');
        setEventDesc('');
        setShowAddEvent(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case 'launch': return 'text-violet-400 bg-violet-950/40 border-violet-800/40';
      case 'webinar': return 'text-blue-400 bg-blue-950/40 border-blue-800/40';
      case 'hackathon': return 'text-amber-400 bg-amber-950/40 border-amber-800/40';
      case 'meeting': return 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40';
      default: return 'text-zinc-400 bg-zinc-900 border-zinc-800';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-xs md:text-sm">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            Calendar & Planner <CalendarIcon className="w-6 h-6 text-violet-400" />
          </h1>
          <p className="text-zinc-500 text-xs mt-1">Plan launches, Webinars, and generate smart contextual posts</p>
        </div>
        <button
          onClick={() => setShowAddEvent(!showAddEvent)}
          className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Calendar List view & event creator */}
        <div className="lg:col-span-2 space-y-6">
          {showAddEvent && (
            <form onSubmit={handleAddEventSubmit} className="p-6 rounded-2xl glass-panel space-y-4 animate-in slide-in-from-top-3">
              <h3 className="font-bold text-sm text-zinc-200">Add Calendar Event</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-2">Event Title</label>
                  <input
                    type="text"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="e.g. BrandPilot Launch, Code Webinar"
                    required
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-3 text-xs text-white focus:outline-none placeholder-zinc-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-2">Type</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-3 text-xs text-white focus:outline-none"
                    >
                      <option value="meeting">Meeting</option>
                      <option value="webinar">Webinar</option>
                      <option value="hackathon">Hackathon</option>
                      <option value="launch">Product Launch</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-2">Date</label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      required
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-3 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-2">Description</label>
                  <textarea
                    value={eventDesc}
                    onChange={(e) => setEventDesc(e.target.value)}
                    placeholder="Provide details about this milestone..."
                    rows={2}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-3 text-xs text-white focus:outline-none placeholder-zinc-600 resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddEvent(false)}
                  className="py-2.5 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all"
                >
                  Save Event
                </button>
              </div>
            </form>
          )}

          {/* Events Lists */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="font-bold text-sm text-zinc-200">Scheduled Milestones</h3>
            {events.length === 0 ? (
              <p className="text-zinc-500 text-xs py-4 text-center">No events found. Click 'Add Event' to create milestones.</p>
            ) : (
              <div className="space-y-3.5">
                {events.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => setSelectedEvent(selectedEvent?.id === e.id ? null : e)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedEvent?.id === e.id
                        ? 'border-violet-500/80 bg-violet-950/10'
                        : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700/60'
                      }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold border tracking-wider ${getEventBadgeColor(e.type)}`}>
                          {e.type}
                        </span>
                        <h4 className="font-bold text-zinc-200 mt-2 text-sm">{e.title}</h4>
                        {e.description && <p className="text-zinc-400 text-xs mt-1 leading-relaxed">{e.description}</p>}
                      </div>
                      <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {mounted ? new Date(e.startAt).toLocaleDateString() : ''}
                      </span>
                    </div>

                    {/* AI intelligence helper nested inside active event card */}
                    {selectedEvent?.id === e.id && e.suggestedIdea && (
                      <div className="mt-4 pt-3 border-t border-zinc-800/80 space-y-2.5 animate-in fade-in duration-200">
                        <div className="p-3 bg-violet-950/20 border border-violet-800/20 rounded-xl">
                          <span className="text-[9px] font-bold text-violet-400 uppercase tracking-widest flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            AI Content Hook Idea
                          </span>
                          <p className="text-zinc-300 text-xs mt-1 leading-relaxed">{e.suggestedIdea}</p>
                        </div>
                        <button
                          onClick={() => router.push('/dashboard/generator')}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs shadow-md transition-all duration-200"
                        >
                          <span>Generate Linked Post</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Publishing Queue */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="font-bold text-sm text-zinc-200 flex items-center gap-1.5">
            <LayoutGrid className="w-4 h-4 text-violet-400" />
            Social Queue
          </h3>
          {posts.length === 0 ? (
            <p className="text-zinc-500 text-xs py-4 text-center">No posts in queue yet.</p>
          ) : (
            <div className="space-y-3.5">
              {posts.map((p) => (
                <div key={p.id} className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">
                      {p.platform}
                    </span>
                    <span className={`text-[9px] uppercase font-bold ${p.status === 'PUBLISHED'
                        ? 'text-emerald-400'
                        : p.status === 'SCHEDULED'
                          ? 'text-violet-400 font-medium'
                          : 'text-zinc-500'
                      }`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-xs line-clamp-3 leading-relaxed font-mono">
                    {p.body}
                  </p>
                  {p.scheduledFor && (
                    <span className="text-[9px] text-zinc-500 block pt-1.5 border-t border-zinc-800">
                      Scheduled: {mounted ? new Date(p.scheduledFor).toLocaleString() : ''}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

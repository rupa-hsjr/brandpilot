'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Linkedin, 
  Twitter, 
  Youtube, 
  ShieldAlert, 
  Save, 
  Check, 
  HelpCircle,
  Key
} from 'lucide-react';

export default function SettingsPage() {
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [emailUpcoming, setEmailUpcoming] = useState(true);
  const [emailWeeklyReport, setEmailWeeklyReport] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  // Sync theme changes with document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      // Inject light-mode styles dynamically
      root.style.colorScheme = 'light';
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync language selection
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Social account simulation states
  const [connections, setConnections] = useState<any[]>([
    { id: '1', platform: 'linkedin', username: 'alex-mercer-tech', isConnected: true },
    { id: '2', platform: 'x', username: 'alex_mercer_ai', isConnected: true },
    { id: '3', platform: 'youtube', username: 'Alex Mercer AI', isConnected: false }
  ]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleConnection = (id: string) => {
    setConnections(connections.map(conn => {
      if (conn.id === id) {
        return { 
          ...conn, 
          isConnected: !conn.isConnected,
          username: conn.isConnected ? '' : `${conn.platform === 'linkedin' ? 'alex-mercer' : 'alex_mercer'}_connected`
        };
      }
      return conn;
    }));
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin': return <Linkedin className="w-5 h-5 text-[#0A66C2]" />;
      case 'x': return <Twitter className="w-5 h-5 text-white" />;
      case 'youtube': return <Youtube className="w-5 h-5 text-[#FF0000]" />;
      default: return <SettingsIcon className="w-5 h-5 text-zinc-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-xs md:text-sm">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          Settings & Integrations <SettingsIcon className="w-6 h-6 text-violet-400" />
        </h1>
        <p className="text-zinc-500 text-xs mt-1">Connect API keys, link social channels, and customize theme configurations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left: General Settings Form */}
        <form onSubmit={handleSaveSettings} className="lg:col-span-3 space-y-6">
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="font-bold text-sm text-zinc-200">System Preferences</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-2">Workspace Theme</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-3 text-xs text-white focus:outline-none"
                >
                  <option value="dark">Dark Theme (Default)</option>
                  <option value="light">Light Theme</option>
                </select>
              </div>
              <div>
                <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-2">System Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-3 text-xs text-white focus:outline-none"
                >
                  <option value="en">English (US)</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>
            </div>
          </div>

          {/* API Keys Configuration */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="font-bold text-sm text-zinc-200 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-violet-400" />
              API Key Configurations
            </h3>
            <div>
              <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-2">Custom OpenAI / Gemini Token</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-••••••••••••••••••••••••"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-violet-500 placeholder-zinc-700"
              />
              <span className="text-[10px] text-zinc-500 block mt-1.5">Optional. Leave empty to use BrandPilot base generation algorithms.</span>
            </div>
          </div>

          {/* Email Notifications */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="font-bold text-sm text-zinc-200">Email Notifications</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailUpcoming}
                  onChange={(e) => setEmailUpcoming(e.target.checked)}
                  className="rounded bg-zinc-900 border-zinc-800 text-violet-600 focus:ring-violet-500 w-4 h-4"
                />
                <span className="text-zinc-300">Email reminders for upcoming scheduled posts</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailWeeklyReport}
                  onChange={(e) => setEmailWeeklyReport(e.target.checked)}
                  className="rounded bg-zinc-900 border-zinc-800 text-violet-600 focus:ring-violet-500 w-4 h-4"
                />
                <span className="text-zinc-300">Deliver Weekly AI Growth Strategy analysis directly</span>
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center">
            {saved && (
              <span className="text-emerald-400 font-semibold text-xs flex items-center gap-1">
                <Check className="w-4 h-4" /> Settings updated successfully
              </span>
            )}
            <button
              type="submit"
              className="ml-auto flex items-center gap-1.5 py-3.5 px-6 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </form>

        {/* Right: Social Channels & Danger Zone */}
        <div className="lg:col-span-2 space-y-6">
          {/* Social Channels connections */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="font-bold text-sm text-zinc-200">Social Connections</h3>
            <div className="space-y-3.5">
              {connections.map((conn) => (
                <div key={conn.id} className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                      {getPlatformIcon(conn.platform)}
                    </div>
                    <div>
                      <span className="font-bold text-zinc-200 block capitalize">{conn.platform}</span>
                      <span className="text-[10px] text-zinc-500">
                        {conn.isConnected ? `@${conn.username}` : 'Not connected'}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleConnection(conn.id)}
                    className={`py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase transition-colors border ${
                      conn.isConnected 
                        ? 'border-zinc-800 hover:bg-zinc-800 text-rose-400' 
                        : 'bg-violet-600 hover:bg-violet-500 border-violet-500 text-white'
                    }`}
                  >
                    {conn.isConnected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="p-6 rounded-2xl glass-panel border border-rose-900/40 space-y-4">
            <h3 className="font-bold text-sm text-rose-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4.5 h-4.5" />
              Danger Zone
            </h3>
            <p className="text-zinc-500 text-[10px] leading-relaxed">
              Once you delete your account, all profile metrics, content planner drafts, and scheduled posts history will be permanently wiped.
            </p>
            <button
              onClick={() => {
                if (confirm("Are you absolutely sure you want to delete your BrandPilot AI account? This action is irreversible.")) {
                  localStorage.clear();
                  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  window.location.href = "/";
                }
              }}
              type="button"
              className="w-full py-3 rounded-xl border border-rose-900 hover:bg-rose-950/20 text-rose-400 font-semibold text-xs transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

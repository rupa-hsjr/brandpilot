'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { useRouter } from 'next/navigation';
import { 
  Bell, 
  Sun, 
  Moon, 
  Sparkles, 
  User, 
  Check, 
  AlertCircle 
} from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [userName, setUserName] = useState('Alex Mercer');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: '1', title: 'AI Assistant', message: 'Content generated successfully.', type: 'ai', read: false },
    { id: '2', title: 'Scheduler', message: 'Post scheduled successfully.', type: 'success', read: false },
    { id: '3', title: 'User Profile', message: 'Profile updated successfully.', type: 'success', read: true },
    { id: '4', title: 'Strategy Diagnostics', message: 'Weekly report available.', type: 'ai', read: true }
  ]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        setUserName(u.name || u.email);
      } catch {}
    }
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 h-16 w-full glass-panel-heavy border-b border-zinc-800/80 px-6 flex items-center justify-between">
      {/* Search / Title Area */}
      <div className="flex items-center gap-2">
        <h2 className="text-zinc-100 font-semibold tracking-wide text-sm hidden md:block">
          Welcome back, <span className="text-violet-400 font-bold">{userName}</span>
        </h2>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Quick Gen Action */}
        <button 
          onClick={() => router.push('/dashboard/generator')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-xs shadow-md shadow-violet-500/10 transition-all duration-200 hover:scale-[1.02]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Gen</span>
        </button>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-zinc-800 hover:bg-zinc-800/50 text-zinc-400 hover:text-white transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notification Center */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg border border-zinc-800 hover:bg-zinc-800/50 text-zinc-400 hover:text-white transition-colors relative"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 animate-ping" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 rounded-xl bg-zinc-950 border border-zinc-800/80 shadow-2xl p-4 z-50">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Notifications</span>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-[10px] text-violet-400 hover:underline">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="mt-3 space-y-2.5 max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-xs text-zinc-500 text-center py-4">No notifications yet.</p>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className={`p-2 rounded-lg text-xs transition-colors ${n.read ? 'opacity-60 bg-transparent' : 'bg-zinc-900/60'}`}>
                      <div className="flex justify-between font-semibold text-zinc-200">
                        <span>{n.title}</span>
                        {n.type === 'ai' && <Sparkles className="w-3 h-3 text-violet-400" />}
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 rounded-full border border-zinc-800 hover:bg-zinc-800/50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm">
              {userName.substring(0,2).toUpperCase()}
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 rounded-xl bg-zinc-950 border border-zinc-800/80 shadow-2xl p-2 z-50 text-xs">
              <button 
                onClick={() => { setShowProfileMenu(false); router.push('/dashboard/profile'); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors"
              >
                My Profile Card
              </button>
              <button 
                onClick={() => { setShowProfileMenu(false); router.push('/dashboard/settings'); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors"
              >
                System Settings
              </button>
              <button 
                onClick={() => { setShowProfileMenu(false); router.push('/dashboard/admin'); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors"
              >
                Admin Panel
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

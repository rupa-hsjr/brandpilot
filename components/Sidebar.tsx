'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Sparkles, 
  Calendar, 
  BarChart3, 
  TrendingUp, 
  Settings, 
  UserCog, 
  LogOut,
  Compass,
  Menu,
  X,
  User
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Profile Card', icon: User, path: '/dashboard/profile' },
    { name: 'AI Generator', icon: Sparkles, path: '/dashboard/generator' },
    { name: 'Calendar Planner', icon: Calendar, path: '/dashboard/calendar' },
    { name: 'Engagement Analytics', icon: BarChart3, path: '/dashboard/analytics' },
    { name: 'Growth Strategy', icon: TrendingUp, path: '/dashboard/strategy' },
    { name: 'Settings & Connections', icon: Settings, path: '/dashboard/settings' },
    { name: 'Admin Panel', icon: UserCog, path: '/dashboard/admin' },
  ];

  const handleLogout = async () => {
    // Clear cookie / session details
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white md:hidden hover:bg-zinc-800 transition-colors"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-45 w-64 glass-panel border-r border-zinc-800/80 p-5 flex flex-col justify-between
        transition-transform duration-300 ease-in-out md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Logo / Brand Header */}
          <div className="flex items-center gap-3 py-6 px-2">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20">
              <Compass className="text-white w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                BrandPilot AI
              </h1>
              <span className="text-xs text-violet-400/80 font-medium tracking-widest uppercase">
                Brand Engine
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="mt-8 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-violet-600/20 to-indigo-600/10 text-white border-l-2 border-violet-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-violet-400' : 'text-zinc-400 group-hover:text-white'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="space-y-4 pt-6 border-t border-zinc-800/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}

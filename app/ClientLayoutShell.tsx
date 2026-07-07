'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import AssistantChatbot from '@/components/AssistantChatbot';

export default function ClientLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDashboardRoute = pathname?.startsWith('/dashboard');

  if (isDashboardRoute) {
    return (
      <div className="min-h-screen flex bg-zinc-950 text-white">
        {/* Navigation Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        {/* Main Work Area */}
        <div className="flex-1 flex flex-col md:pl-64 min-w-0 transition-all duration-300">
          <Navbar />
          
          <main className="flex-1 p-6 md:p-8 bg-radial-gradient">
            {children}
          </main>
        </div>

        {/* AI Floating Chat Assistant */}
        <AssistantChatbot />
      </div>
    );
  }

  // Auth or Landing Pages Layout
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-violet-600/30 selection:text-violet-200">
      {children}
    </div>
  );
}

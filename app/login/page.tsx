'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    localStorage.setItem('user', JSON.stringify({
      id: 'demo-user-id',
      email: 'demo@brandpilot.ai',
      name: 'Alex Mercer',
      role: 'user'
    }));
    // Put placeholder token in cookies for local development convenience
    document.cookie = "token=demo-token; path=/;";
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md rounded-2xl glass-panel-heavy p-8 border border-zinc-800 shadow-2xl relative z-10 animate-in fade-in-50 zoom-in-95 duration-300">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 w-fit mb-3">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-bold text-xl text-zinc-100">Sign in to BrandPilot AI</h1>
          <p className="text-zinc-400 text-xs mt-1.5">Enter details or launch instant demo workspace</p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-violet-500 placeholder-zinc-600 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider">Password</label>
              <Link href="/forgot-password" className="text-xs text-violet-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-violet-500 placeholder-zinc-600 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 text-white font-semibold text-xs shadow-lg shadow-violet-500/10 transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800" /></div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest"><span className="bg-zinc-950 px-3 text-zinc-500">Or</span></div>
        </div>

        <button
          onClick={handleDemoLogin}
          type="button"
          className="w-full py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-xs transition-colors"
        >
          Access Demo Environment
        </button>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Don't have an account?{' '}
          <Link href="/register" className="text-violet-400 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

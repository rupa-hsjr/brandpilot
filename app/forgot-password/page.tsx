'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Mail, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md rounded-2xl glass-panel-heavy p-8 border border-zinc-800 shadow-2xl relative z-10 animate-in fade-in-50 zoom-in-95 duration-300">
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 w-fit mb-3">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-bold text-xl text-zinc-100">Forgot Password</h1>
          <p className="text-zinc-400 text-xs mt-1.5 text-center">We will send you a recovery email to reset your account password</p>
        </div>

        {!submitted ? (
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

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors mt-2"
            >
              Send Recovery Email
            </button>
          </form>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400 w-fit mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-zinc-200">Check your inbox</h3>
              <p className="text-xs text-zinc-500 mt-2">
                We've sent a password reset link to <span className="text-zinc-300 font-medium">{email}</span>.
              </p>
            </div>
          </div>
        )}

        <Link href="/login" className="flex items-center justify-center gap-1.5 mt-6 text-xs text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to login</span>
        </Link>
      </div>
    </div>
  );
}

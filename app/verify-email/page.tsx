'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, ShieldCheck, ArrowRight } from 'lucide-react';

export default function VerifyEmailPage() {
  const [verified, setVerified] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md rounded-2xl glass-panel-heavy p-8 border border-zinc-800 shadow-2xl relative z-10 animate-in fade-in-50 zoom-in-95 duration-300">
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 w-fit mb-3">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-bold text-xl text-zinc-100">Verify Email Address</h1>
          <p className="text-zinc-400 text-xs mt-1.5 text-center">Confirm your email to complete setting up your brand studio</p>
        </div>

        {!verified ? (
          <div className="space-y-5 text-center py-2">
            <p className="text-xs text-zinc-400 leading-relaxed">
              We sent a verification link to your registered email address. Click the link inside the email or hit below to verify instantly.
            </p>
            <button
              onClick={() => setVerified(true)}
              className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors"
            >
              Verify Instantly
            </button>
          </div>
        ) : (
          <div className="text-center py-4 space-y-6">
            <div className="p-3.5 rounded-full bg-emerald-500/10 text-emerald-400 w-fit mx-auto animate-bounce">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-zinc-200">Email Verified Successfully</h3>
              <p className="text-xs text-zinc-500 mt-2">
                Your email has been confirmed. You are ready to complete your onboarding configuration!
              </p>
            </div>
            <Link
              href="/onboarding"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-violet-500/10"
            >
              <span>Go to Onboarding Wizard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

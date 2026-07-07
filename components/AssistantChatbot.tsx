'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Sparkles, RefreshCw } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AssistantChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I am your BrandPilot AI assistant. Ask me to write posts, optimize tags, or brainstorm strategy ideas!" }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent, presetMessage?: string) => {
    if (e) e.preventDefault();
    const textToSend = presetMessage || input;
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Direct call to simulate or API Route
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, history: messages })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      // Fallback response simulation
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "Here is an AI Strategy recommendation: Focus on 'How-to' content this week. I can generate a 3-part thread for you if you'd like. Just ask me to 'write a thread about software engineering'." 
        }]);
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  const prompts = [
    "What should I post today?",
    "Generate 5 LinkedIn ideas",
    "Best tags for tech growth",
    "Rewrite this professionally"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center p-4 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-xl shadow-violet-500/20 hover:scale-105 transition-all duration-200"
          title="Open AI Assistant"
        >
          <MessageSquare className="w-6 h-6 animate-pulse" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="w-[360px] h-[500px] rounded-2xl glass-panel-heavy border border-zinc-800/80 shadow-2xl flex flex-col overflow-hidden animate-in fade-in-50 slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-zinc-950 to-zinc-900 px-4 py-3 flex items-center justify-between border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-violet-600/20 text-violet-400">
                <Bot className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-zinc-100 flex items-center gap-1">
                  BrandPilot Coach <Sparkles className="w-3 h-3 text-violet-400" />
                </h4>
                <span className="text-[10px] text-zinc-400">Always active</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-violet-600/10 text-violet-400 flex items-center justify-center flex-shrink-0 text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div className={`p-3 rounded-2xl text-xs max-w-[78%] leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-violet-600 text-white rounded-tr-none' 
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-line">{m.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-full bg-violet-600/10 text-violet-400 flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-3 rounded-2xl text-xs bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-tl-none flex items-center gap-2">
                  <span>Drafting strategy...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-2 border-t border-zinc-900 bg-zinc-950/40 flex gap-1.5 overflow-x-auto scrollbar-none">
            {prompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(undefined, p)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800/80 hover:bg-zinc-800/50 text-[10px] text-zinc-300 transition-colors flex-shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input form */}
          <form onSubmit={handleSend} className="p-3 border-t border-zinc-900 bg-zinc-950 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500 placeholder-zinc-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

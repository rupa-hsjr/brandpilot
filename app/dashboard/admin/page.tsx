'use client';

import React, { useState } from 'react';
import { 
  UserCog, 
  Activity, 
  Database, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  FileText
} from 'lucide-react';

export default function AdminPage() {
  const [users, setUsers] = useState([
    { id: 'u1', name: 'Alex Mercer', email: 'demo@brandpilot.ai', status: 'Active', postsCount: 12, joined: 'July 2026' },
    { id: 'u2', name: 'Sarah Jenkins', email: 'sarah.j@techstart.io', status: 'Active', postsCount: 34, joined: 'June 2026' },
    { id: 'u3', name: 'Marcus Vance', email: 'marcus@cloudops.com', status: 'Inactive', postsCount: 0, joined: 'May 2026' }
  ]);

  const systemHealth = [
    { name: 'Core Engine API', status: 'Healthy', latency: '42ms', icon: Activity, color: 'text-emerald-400 bg-emerald-950/40' },
    { name: 'SQLite / Postgres', status: 'Connected', latency: '3ms', icon: Database, color: 'text-emerald-400 bg-emerald-950/40' },
    { name: 'AI Generation Queue', status: 'Optimal', latency: '320ms', icon: UserCog, color: 'text-emerald-400 bg-emerald-950/40' }
  ];

  const adminStats = [
    { title: 'Global Platform Users', value: '1,420', change: '+18% monthly', icon: Users },
    { title: 'Total Generated Posts', value: '42,500', change: '+29% weekly', icon: FileText },
    { title: 'Successful Publishes', value: '38,120', change: '99.4% rate', icon: TrendingUp }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-xs md:text-sm">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          Admin Control Center <UserCog className="w-6 h-6 text-violet-400" />
        </h1>
        <p className="text-zinc-500 text-xs mt-1">Monitor system metrics, evaluate active accounts, and assess database nodes</p>
      </div>

      {/* Global Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adminStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl glass-panel relative overflow-hidden">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 font-semibold">{stat.title}</span>
                <div className="p-2 rounded-xl bg-violet-950/40 text-violet-400">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-extrabold text-white">{stat.value}</h3>
                <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* System Health */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <h3 className="font-bold text-sm text-zinc-200">System Infrastructure Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {systemHealth.map((health, idx) => {
            const Icon = health.icon;
            return (
              <div key={idx} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${health.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-zinc-200 block">{health.name}</span>
                    <span className="text-[9px] text-zinc-500">Latency: {health.latency}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {health.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accounts List */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <h3 className="font-bold text-sm text-zinc-200">Platform Accounts Management</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-[10px] text-zinc-400 uppercase tracking-wider">
                <th className="py-3 px-4">User Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4">Generated Posts</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-xs">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-900/40 transition-colors">
                  <td className="py-3 px-4 font-medium text-zinc-200">{user.name}</td>
                  <td className="py-3 px-4 text-zinc-400">{user.email}</td>
                  <td className="py-3 px-4 text-zinc-400">{user.joined}</td>
                  <td className="py-3 px-4 text-zinc-300 font-semibold">{user.postsCount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      user.status === 'Active' 
                        ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/20' 
                        : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

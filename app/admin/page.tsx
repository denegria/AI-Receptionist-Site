'use client';

import React from 'react';
import { TenantTable } from '@/dashboard/components/admin/TenantTable';
import { RevenueChart } from '@/dashboard/components/admin/RevenueChart';
import { Activity, Users, CreditCard, ShieldAlert, Download, Search, Terminal, Database, Server, Cpu } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans text-xs p-4 selection:bg-indigo-500/30">
      <div className="max-w-[1600px] mx-auto space-y-4">
        {/* Top Navigation / Header */}
        <header className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 border-r border-slate-800 pr-6">
              <div className="w-7 h-7 bg-indigo-600 rounded flex items-center justify-center font-black text-white italic shadow-[0_0_15px_rgba(79,70,229,0.4)]">
                A
              </div>
              <h1 className="text-sm font-black text-white tracking-widest uppercase italic">OpenClaw Admin</h1>
            </div>
            
            <nav className="flex gap-4">
              <button className="text-indigo-400 font-bold uppercase tracking-widest border-b-2 border-indigo-500 pb-0.5 px-1">Overview</button>
              <button className="text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest px-1">Infrastructure</button>
              <button className="text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest px-1">Security</button>
              <button className="text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest px-1">Billing</button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded px-3 py-1 text-slate-500">
              <Terminal size={12} />
              <span className="font-mono text-[10px]">v2.4.0-stable</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden cursor-pointer hover:border-indigo-500 transition-colors">
              <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-[10px] font-bold">JD</div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Sidebar / Left Column */}
          <div className="lg:col-span-3 space-y-4">
            {/* System Health Component */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Cluster Health</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"></span>
                  <span className="text-[10px] text-emerald-500 font-bold uppercase">Healthy</span>
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Cpu size={12} />
                      <span className="text-[10px] uppercase font-bold tracking-wider">Processor Pool</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">24.2%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-indigo-500 h-full w-[24.2%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Server size={12} />
                      <span className="text-[10px] uppercase font-bold tracking-wider">Memory Allocation</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">62.8%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-amber-500 h-full w-[62.8%] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Database size={12} />
                      <span className="text-[10px] uppercase font-bold tracking-wider">Storage I/O</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">12.1%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-emerald-500 h-full w-[12.1%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500 uppercase tracking-widest font-bold">API Status</span>
                  <span className="text-emerald-500 font-mono">OPERATIONAL</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500 uppercase tracking-widest font-bold">Worker Nodes</span>
                  <span className="text-white font-mono">12 / 12 Active</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500 uppercase tracking-widest font-bold">Inbound Traffic</span>
                  <span className="text-white font-mono">4.2 GB/s</span>
                </div>
              </div>

              <button className="w-full mt-8 py-2.5 bg-slate-950 border border-slate-800 rounded text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
                Full System Report
              </button>
            </div>

            {/* Quick Actions Component */}
            <div className="bg-indigo-900/10 border border-indigo-500/20 rounded-lg p-4">
              <h3 className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em] mb-4">Emergency Protocol</h3>
              <div className="space-y-2">
                <button className="w-full py-2 bg-rose-950/40 border border-rose-900/50 rounded text-[9px] font-bold uppercase tracking-widest text-rose-400 hover:bg-rose-900 transition-colors flex items-center justify-center gap-2">
                  <ShieldAlert size={12} /> LOCK_SYSTEM_NOW
                </button>
                <button className="w-full py-2 bg-slate-900 border border-slate-800 rounded text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:bg-slate-800 transition-colors">
                  Purge Cache Clusters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content / Right Column */}
          <div className="lg:col-span-9 space-y-4">
            {/* Stats High Density Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Active Tenants', value: '1,248', change: '+2.4%', icon: Users, color: 'text-indigo-400' },
                { label: 'Network Load', value: '42.8k', sub: 'req/s', change: 'Stable', icon: Activity, color: 'text-emerald-400' },
                { label: 'MoM Revenue', value: '$835.2k', change: '+14%', icon: CreditCard, color: 'text-amber-400' },
                { label: 'Security Threats', value: '0', sub: 'active', change: 'Safe', icon: ShieldAlert, color: 'text-rose-400' },
              ].map((stat, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-lg shadow-xl hover:border-slate-700 transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <stat.icon className={stat.color} size={18} />
                    <span className={`text-[10px] font-black ${stat.change.includes('+') ? 'text-emerald-500' : 'text-slate-500'} uppercase tracking-tighter`}>{stat.change}</span>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-white tracking-tighter font-mono">{stat.value}</span>
                      {stat.sub && <span className="text-[10px] text-slate-500 font-bold uppercase">{stat.sub}</span>}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1 opacity-60 group-hover:opacity-100 transition-opacity">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Middle Section: Table and Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <div className="xl:col-span-8">
                <TenantTable />
              </div>
              <div className="xl:col-span-4 space-y-4">
                <RevenueChart />
                
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 shadow-xl">
                  <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
                    <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Deployment Log</h3>
                    <button className="text-[9px] text-indigo-400 font-bold hover:underline">Clear</button>
                  </div>
                  <div className="space-y-3 font-mono text-[9px]">
                    <div className="flex gap-2 text-emerald-500">
                      <span className="opacity-50">[09:22:14]</span>
                      <span>SUCCESS: API-NODE-4 DEPLOYED</span>
                    </div>
                    <div className="flex gap-2 text-slate-400">
                      <span className="opacity-50">[09:21:05]</span>
                      <span>INFO: CACHE PURGE INITIATED (manual)</span>
                    </div>
                    <div className="flex gap-2 text-amber-500">
                      <span className="opacity-50">[09:18:42]</span>
                      <span>WARN: HIGH LATENCY US-EAST-1</span>
                    </div>
                    <div className="flex gap-2 text-slate-400 border-l-2 border-indigo-500/30 pl-2">
                      <span className="opacity-50">[09:15:22]</span>
                      <span>SYS: AUTO-SCALING TRIGGERED [+2]</span>
                    </div>
                    <div className="flex gap-2 text-rose-400">
                      <span className="opacity-50">[09:12:01]</span>
                      <span>FAIL: DB-READ-REPLICA-2 TIMEOUT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Footer info */}
        <footer className="pt-6 pb-2 border-t border-slate-900 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="text-[9px] text-slate-600 font-black uppercase tracking-[0.3em]">OpenClaw Operations © 2026</span>
            <div className="flex gap-4">
              <span className="text-[9px] text-slate-700 font-mono">TZ: UTC-0</span>
              <span className="text-[9px] text-slate-700 font-mono">REGION: GLOBAL-1</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">PostgreSQL: 12ms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Redis: 2ms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Storage: 82% Full</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { MoreHorizontal, Search, User, CheckCircle, XCircle, Clock } from 'lucide-react';

const mockTenants = [
  { id: '1', name: 'Acme Corp', industry: 'Retail', status: 'Active', plan: 'Enterprise', revenue: '$12,400', usage: '85%' },
  { id: '2', name: 'Globex', industry: 'Tech', status: 'Active', plan: 'Pro', revenue: '$4,200', usage: '62%' },
  { id: '3', name: 'Soylent Corp', industry: 'Healthcare', status: 'Pending', plan: 'Enterprise', revenue: '$0', usage: '0%' },
  { id: '4', name: 'Initech', industry: 'Finance', status: 'Active', plan: 'Basic', revenue: '$1,200', usage: '45%' },
  { id: '5', name: 'Umbrella Corp', industry: 'Biotech', status: 'Suspended', plan: 'Enterprise', revenue: '$0', usage: '12%' },
  { id: '6', name: 'Massive Dynamic', industry: 'Defense', status: 'Active', plan: 'Enterprise', revenue: '$25,000', usage: '92%' },
  { id: '7', name: 'Hooli', industry: 'Tech', status: 'Active', plan: 'Pro', revenue: '$5,500', usage: '78%' },
];

export function TenantTable() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden text-slate-300 shadow-xl">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Tenants / Clients</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <input 
              type="text" 
              placeholder="Search tenants..." 
              className="bg-slate-950 border border-slate-800 rounded px-8 py-1 text-xs focus:outline-none focus:border-indigo-500 w-48 transition-all"
            />
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors shadow-lg shadow-indigo-900/20">
            Add Tenant
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-950/50 border-b border-slate-800">
              <th className="px-4 py-2 font-medium text-slate-500 uppercase tracking-tighter">Name</th>
              <th className="px-4 py-2 font-medium text-slate-500 uppercase tracking-tighter">Industry</th>
              <th className="px-4 py-2 font-medium text-slate-500 uppercase tracking-tighter">Plan</th>
              <th className="px-4 py-2 font-medium text-slate-500 uppercase tracking-tighter">Revenue</th>
              <th className="px-4 py-2 font-medium text-slate-500 uppercase tracking-tighter">Usage</th>
              <th className="px-4 py-2 font-medium text-slate-500 uppercase tracking-tighter">Status</th>
              <th className="px-4 py-2 font-medium text-slate-500"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {mockTenants.map((tenant) => (
              <tr key={tenant.id} className="hover:bg-slate-800/30 transition-colors group">
                <td className="px-4 py-2 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                    <User size={12} className="text-slate-400" />
                  </div>
                  <span className="font-medium text-slate-200">{tenant.name}</span>
                </td>
                <td className="px-4 py-2 text-slate-400">{tenant.industry}</td>
                <td className="px-4 py-2">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    tenant.plan === 'Enterprise' ? 'bg-purple-900/30 text-purple-400 border border-purple-800/50' :
                    tenant.plan === 'Pro' ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50' :
                    'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {tenant.plan}
                  </span>
                </td>
                <td className="px-4 py-2 text-slate-200 font-mono tracking-tighter">{tenant.revenue}</td>
                <td className="px-4 py-2">
                  <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-full rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" 
                      style={{ width: tenant.usage }}
                    ></div>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-1.5">
                    {tenant.status === 'Active' && <CheckCircle size={10} className="text-emerald-500" />}
                    {tenant.status === 'Suspended' && <XCircle size={10} className="text-rose-500" />}
                    {tenant.status === 'Pending' && <Clock size={10} className="text-amber-500" />}
                    <span className={
                      tenant.status === 'Active' ? 'text-emerald-500' :
                      tenant.status === 'Suspended' ? 'text-rose-500' :
                      'text-amber-500'
                    }>
                      {tenant.status}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2 text-right">
                  <button className="text-slate-600 hover:text-slate-300 transition-colors">
                    <MoreHorizontal size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-2 bg-slate-950/50 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest px-4">
        <span>Showing 7 of 42 tenants</span>
        <div className="flex gap-1">
          <button className="px-2 py-0.5 border border-slate-800 rounded hover:bg-slate-800 transition-colors">Prev</button>
          <button className="px-2 py-0.5 border border-slate-800 rounded hover:bg-slate-800 transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}

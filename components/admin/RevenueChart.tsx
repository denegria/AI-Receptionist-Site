'use client';

import React from 'react';

const data = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
  { month: 'Jul', revenue: 72000 },
  { month: 'Aug', revenue: 69000 },
  { month: 'Sep', revenue: 81000 },
  { month: 'Oct', revenue: 88000 },
  { month: 'Nov', revenue: 95000 },
  { month: 'Dec', revenue: 102000 },
];

export function RevenueChart() {
  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 text-slate-300 shadow-xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Revenue Growth</h2>
          <p className="text-xl font-bold text-white font-mono tracking-tighter">
            $835,200 <span className="text-[10px] font-bold text-emerald-500 ml-1 border border-emerald-900/50 bg-emerald-900/10 px-1 rounded uppercase tracking-widest">+14.2%</span>
          </p>
        </div>
        <select className="bg-slate-950 border border-slate-800 rounded text-[10px] px-2 py-1 outline-none text-slate-400 font-mono uppercase tracking-widest cursor-pointer hover:border-slate-700 transition-colors">
          <option>Yearly (2025)</option>
          <option>Monthly</option>
        </select>
      </div>

      <div className="h-40 flex items-end gap-1 px-2 border-l border-b border-slate-800/50">
        {data.map((item) => {
          const height = (item.revenue / maxRevenue) * 100;
          return (
            <div key={item.month} className="flex-1 flex flex-col items-center group relative h-full justify-end">
              <div 
                className="w-full bg-indigo-500/10 group-hover:bg-indigo-500/30 border-t border-indigo-500/50 transition-all rounded-t-sm"
                style={{ height: `${height}%` }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] px-1.5 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-slate-700 font-mono shadow-2xl pointer-events-none">
                  VAL: ${(item.revenue / 1000).toFixed(1)}k
                </div>
              </div>
              <span className="text-[9px] text-slate-600 mt-2 font-mono uppercase">{item.month}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="bg-slate-950/50 p-2 rounded border border-slate-800/50">
          <div className="text-[8px] text-slate-500 uppercase tracking-widest mb-1">Avg/Month</div>
          <div className="text-xs font-bold text-slate-200 font-mono">$69.6k</div>
        </div>
        <div className="bg-slate-950/50 p-2 rounded border border-slate-800/50">
          <div className="text-[8px] text-slate-500 uppercase tracking-widest mb-1">Peak</div>
          <div className="text-xs font-bold text-slate-200 font-mono">$102k</div>
        </div>
        <div className="bg-slate-950/50 p-2 rounded border border-slate-800/50">
          <div className="text-[8px] text-slate-500 uppercase tracking-widest mb-1">LTM Growth</div>
          <div className="text-xs font-bold text-emerald-400 font-mono">+28%</div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: string;
}

export const StatCard = ({ title, value, change, trend, icon: Icon, color }: StatCardProps) => {
  const iconColorMap: Record<string, string> = {
    'bg-blue-500': 'text-blue-600',
    'bg-indigo-500': 'text-indigo-600',
    'bg-purple-500': 'text-purple-600',
    'bg-amber-500': 'text-amber-600',
  };

  const iconColor = iconColorMap[color] || 'text-slate-600';

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10 ${iconColor}`}>
          <Icon size={24} />
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {change}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
      </div>
    </div>
  );
};

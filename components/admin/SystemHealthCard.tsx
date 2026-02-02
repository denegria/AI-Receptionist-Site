import React from 'react';
import { Activity, CheckCircle, AlertCircle } from 'lucide-react';

interface SystemHealthCardProps {
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  latency: string;
}

export const SystemHealthCard = ({ status, uptime, latency }: SystemHealthCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'healthy':
        return 'text-emerald-500 bg-emerald-500/10';
      case 'degraded':
        return 'text-amber-500 bg-amber-500/10';
      case 'down':
        return 'text-rose-500 bg-rose-500/10';
      default:
        return 'text-slate-500 bg-slate-500/10';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5" />;
      case 'degraded':
        return <Activity className="w-5 h-5" />;
      case 'down':
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500">System Health</h3>
        <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor()}`}>
          {getStatusIcon()}
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-2xl font-bold text-slate-900">{uptime}</p>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Uptime</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-900">{latency}</p>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Latency</p>
        </div>
      </div>
    </div>
  );
};

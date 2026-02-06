import React from 'react';
import { Users, PhoneCall, DollarSign, Activity } from 'lucide-react';
import { SystemHealthCard } from '@/components/admin/SystemHealthCard';
import { ActivityFeed } from '@/components/admin/ActivityFeed';
import { supabase } from '@/lib/supabase';
import { checkAdminAccess } from '@/lib/admin-allowlist';

export const dynamic = 'force-dynamic';

const AdminDashboardPage = async () => {
  // Defense-in-depth: check admin access server-side
  await checkAdminAccess();

  // Fetch Total Clients
  const { count: totalClients } = await supabase
    .from('clients')
    .select('*', { count: 'exact', head: true });

  // Fetch Active Calls Today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { count: activeCalls } = await supabase
    .from('call_logs')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', today.toISOString());

  // Calculate Revenue - Mocking based on client count since tiers aren't in schema yet
  // Using $249 as a baseline
  const revenueValue = (totalClients || 0) * 249;

  const stats = [
    { label: 'Total Clients', value: totalClients?.toString() || '0', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Calls Today', value: activeCalls?.toString() || '0', icon: PhoneCall, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Revenue', value: `$${revenueValue.toLocaleString()}`, icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'System Health', value: '99.9%', icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Overview</h1>
        <p className="text-slate-500 text-sm">Monitor system performance and client activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Infrastructure Status</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SystemHealthCard status="healthy" uptime="99.98%" latency="45ms" />
              <SystemHealthCard status="healthy" uptime="100%" latency="22ms" />
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Recent Growth</h2>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                +12% this month
              </span>
            </div>
            <div className="h-64 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400">
              [Growth Analytics Chart Placeholder]
            </div>
          </section>
        </div>

        <div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

import React from 'react';
import { Phone, Voicemail, Clock, CalendarCheck, TrendingUp, ArrowRight } from 'lucide-react';
import { MetricCard } from '@/components/ui/MetricCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  // Placeholder data
  const metrics = [
    {
      label: 'Total Calls',
      value: '124',
      icon: Phone,
      trend: { value: 12, isPositive: true },
      iconClassName: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Voicemails',
      value: '18',
      icon: Voicemail,
      trend: { value: 5, isPositive: false },
      iconClassName: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'Avg Duration',
      value: '4m 32s',
      icon: Clock,
      description: 'Stable vs last week',
      iconClassName: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Appointments',
      value: '42',
      icon: CalendarCheck,
      trend: { value: 8, isPositive: true },
      iconClassName: 'bg-indigo-50 text-indigo-600',
    },
  ];

  const recentCalls = [
    { id: 1, caller: 'John Smith', time: '2 hours ago', status: 'Booked', type: 'HVAC Repair' },
    { id: 2, caller: 'Sarah Johnson', time: '4 hours ago', status: 'Inquiry', type: 'Maintenance' },
    { id: 3, caller: 'Michael Brown', time: 'Yesterday', status: 'Booked', type: 'Installation' },
    { id: 4, caller: 'Emily Davis', time: 'Yesterday', status: 'Voicemail', type: 'Quote' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your AI assistant.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <MetricCard key={idx} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Link 
              href="/dashboard/calls" 
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {recentCalls.map((call) => (
                <div key={call.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{call.caller}</p>
                      <p className="text-xs text-slate-500">{call.type} • {call.time}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "text-xs font-medium px-2.5 py-1 rounded-full",
                    call.status === 'Booked' ? "bg-emerald-100 text-emerald-700" :
                    call.status === 'Voicemail' ? "bg-amber-100 text-amber-700" :
                    "bg-blue-100 text-blue-700"
                  )}>
                    {call.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats/Insight */}
        <Card>
          <CardHeader>
            <CardTitle>Assistant Insight</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900">Conversion is up!</p>
                <p className="text-xs text-blue-700 mt-1">
                  Your AI assistant booked 15% more appointments this week compared to last.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Top Intents</h4>
              <div className="space-y-3">
                {[
                  { label: 'Repair Request', value: 45, color: 'bg-blue-500' },
                  { label: 'Maintenance Inquiry', value: 30, color: 'bg-emerald-500' },
                  { label: 'New System Quote', value: 25, color: 'bg-indigo-500' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">{item.label}</span>
                      <span className="font-semibold text-slate-900">{item.value}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full", item.color)} 
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

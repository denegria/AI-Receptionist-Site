import React from 'react';
import { BarChart3, PieChart, LineChart, TrendingUp, Users, Clock, Calendar } from 'lucide-react';
import { MetricCard } from '@/components/ui/MetricCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function AnalyticsPage() {
  const metrics = [
    {
      label: 'Calls This Week',
      value: '248',
      icon: TrendingUp,
      trend: { value: 18, isPositive: true },
      iconClassName: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Avg Response Time',
      value: '1.2s',
      icon: Clock,
      trend: { value: 5, isPositive: true },
      iconClassName: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Booking Rate',
      value: '34%',
      icon: Users,
      trend: { value: 2, isPositive: false },
      iconClassName: 'bg-indigo-50 text-indigo-600',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-500 mt-1">Deep dive into your AI assistant's performance and call patterns.</p>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-700">Last 30 Days</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, idx) => (
          <MetricCard key={idx} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Call Volume Chart Placeholder */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <LineChart className="w-5 h-5 text-slate-400" />
              <CardTitle>Call Volume</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <BarChart3 className="w-12 h-12 text-slate-200 mb-3" />
              <p className="text-slate-400 font-medium">Chart Coming Soon</p>
              <p className="text-slate-300 text-xs mt-1">Connecting to Supabase data...</p>
            </div>
            
            <div className="mt-6 flex items-center justify-around">
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase font-semibold">Total Incoming</p>
                <p className="text-xl font-bold text-slate-900">1,204</p>
              </div>
              <div className="w-px h-8 bg-slate-100" />
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase font-semibold">Handled by AI</p>
                <p className="text-xl font-bold text-slate-900">1,180</p>
              </div>
              <div className="w-px h-8 bg-slate-100" />
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase font-semibold">Hand-offs</p>
                <p className="text-xl font-bold text-slate-900">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Intent Distribution Placeholder */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-slate-400" />
              <CardTitle>Intent Distribution</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <div className="w-32 h-32 rounded-full border-8 border-slate-100 border-t-blue-500 border-l-emerald-500 border-r-indigo-500 flex items-center justify-center">
                 <span className="text-slate-200 font-medium">Charts</span>
              </div>
              <p className="text-slate-400 font-medium mt-4">Intent Breakdown Coming Soon</p>
            </div>
            
            <div className="mt-6 space-y-3">
              {[
                { label: 'Service Request', value: 52, color: 'bg-blue-500' },
                { label: 'Status Update', value: 24, color: 'bg-emerald-500' },
                { label: 'Billing/General', value: 18, color: 'bg-indigo-500' },
                { label: 'Other', value: 6, color: 'bg-slate-300' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm text-slate-600">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { CallLogTable } from '@/dashboard/components/dashboard/CallLogTable';
import { AudioPlayer } from '@/dashboard/components/dashboard/AudioPlayer';
import { AppointmentList } from '@/dashboard/components/dashboard/AppointmentList';
import { StatCard } from '@/dashboard/components/dashboard/StatCard';
import { Phone, CalendarCheck, Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Client Dashboard</h1>
            <p className="text-slate-500 mt-1">Welcome back, here's what's happening today.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold shadow-sm hover:bg-slate-50 transition-all">
              Reports
            </button>
            <button className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2">
              <Zap size={18} /> Upgrade Pro
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Calls" 
            value="1,284" 
            change="+12%" 
            trend="up" 
            icon={Phone} 
            color="bg-blue-500"
          />
          <StatCard 
            title="Appointments" 
            value="42" 
            change="+8%" 
            trend="up" 
            icon={CalendarCheck} 
            color="bg-indigo-500"
          />
          <StatCard 
            title="Avg. Duration" 
            value="3m 12s" 
            change="-2%" 
            trend="down" 
            icon={Clock} 
            color="bg-purple-500"
          />
          <StatCard 
            title="AI Savings" 
            value="$4,250" 
            change="+24%" 
            trend="up" 
            icon={Zap} 
            color="bg-amber-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CallLogTable />
          </div>
          <div className="space-y-8">
            <AudioPlayer />
            <AppointmentList />
          </div>
        </div>
      </div>
    </div>
  );
}

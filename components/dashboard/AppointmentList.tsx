'use client';

import React from 'react';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_APPOINTMENTS = [
  { id: '1', name: 'John Doe', service: 'Full Grooming', time: 'Tomorrow, 2:00 PM', status: 'confirmed' },
  { id: '2', name: 'Sarah Smith', service: 'Nail Trim', time: 'Feb 7, 11:30 AM', status: 'pending' },
  { id: '3', name: 'Mike Johnson', service: 'Bath & Brush', time: 'Feb 8, 4:00 PM', status: 'confirmed' },
];

export const AppointmentList = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">Upcoming Appointments</h2>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
          Schedule
        </button>
      </div>
      <div className="p-2">
        <div className="flex flex-col gap-1">
          {MOCK_APPOINTMENTS.map((apt, idx) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-2xl hover:bg-slate-50 transition-all group cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{apt.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Calendar size={12} /> {apt.time.split(',')[0]}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock size={12} /> {apt.time.split(',')[1]}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {apt.status}
                </span>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="p-4 bg-slate-50/50 text-center">
        <p className="text-xs text-slate-400">Total of 12 appointments this week</p>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { PhoneIncoming, PhoneOutgoing, Play, FileText, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_CALLS = [
  { id: '1', type: 'incoming', caller: '(555) 123-4567', time: '10:30 AM', duration: '2:15', status: 'completed' },
  { id: '2', type: 'outgoing', caller: '(555) 987-6543', time: '9:15 AM', duration: '1:45', status: 'completed' },
  { id: '3', type: 'incoming', caller: '(555) 456-7890', time: 'Yesterday', duration: '5:10', status: 'completed' },
  { id: '4', type: 'incoming', caller: '(555) 222-3333', time: 'Yesterday', duration: '0:45', status: 'missed' },
];

export const CallLogTable = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">Recent Calls</h2>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Caller</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_CALLS.map((call, idx) => (
              <motion.tr 
                key={call.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-slate-50/80 transition-colors group"
              >
                <td className="px-6 py-4">
                  {call.type === 'incoming' ? (
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                      <PhoneIncoming size={16} />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <PhoneOutgoing size={16} />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-slate-700">{call.caller}</span>
                </td>
                <td className="px-6 py-4 text-slate-500 text-sm">{call.time}</td>
                <td className="px-6 py-4 text-slate-500 text-sm">{call.duration}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all text-slate-600 hover:text-indigo-600">
                      <Play size={16} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all text-slate-600 hover:text-indigo-600">
                      <FileText size={16} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all text-slate-600 hover:text-indigo-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

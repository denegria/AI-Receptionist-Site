'use client';

import React from 'react';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { Clock } from 'lucide-react';

export const StepHours = () => {
  const { data, updateHours } = useOnboardingStore();

  const handleToggle = () => {
    updateHours({ monFriOnly: !data.businessHours.monFriOnly });
  };

  const handleTimeChange = (key: 'startTime' | 'endTime', value: string) => {
    updateHours({ [key]: value });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          When are you open?
        </h1>
        <p className="text-slate-500">
          Your AI dispatcher needs to know when to handle calls as "after-hours".
        </p>
      </div>

      <div className="space-y-6 max-w-[400px] mx-auto bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
          <div className="space-y-0.5">
            <div className="text-sm font-semibold text-slate-900">Monday - Friday Only</div>
            <div className="text-xs text-slate-500">Auto-close on weekends</div>
          </div>
          <button
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
              data.businessHours.monFriOnly ? 'bg-indigo-600' : 'bg-slate-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                data.businessHours.monFriOnly ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Open At</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="time"
                value={data.businessHours.startTime}
                onChange={(e) => handleTimeChange('startTime', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-600 transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Close At</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="time"
                value={data.businessHours.endTime}
                onChange={(e) => handleTimeChange('endTime', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-600 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

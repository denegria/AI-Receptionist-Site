'use client';

import React from 'react';
import { useOnboardingStore } from '@/store/useOnboardingStore';

export const StepBusinessInfo = () => {
  const { data, updateData } = useOnboardingStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Tell us about your business
        </h1>
        <p className="text-slate-500">
          This helps us customize your automated dispatcher.
        </p>
      </div>

      <div className="space-y-4 max-w-[400px] mx-auto">
        <div className="space-y-2">
          <label htmlFor="businessName" className="text-sm font-medium leading-none text-slate-700">
            What's your company called?
          </label>
          <input
            id="businessName"
            type="text"
            placeholder="e.g., Alpine Heating & Cooling"
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={data.businessName}
            onChange={(e) => updateData({ businessName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="timezone" className="text-sm font-medium leading-none text-slate-700">
            Your Local Timezone
          </label>
          <select
            id="timezone"
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-indigo-300"
            value={data.timezone}
            onChange={(e) => updateData({ timezone: e.target.value })}
          >
            <optgroup label="North America">
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Phoenix">Mountain Time (no DST)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="America/Anchorage">Alaska Time (AKT)</option>
              <option value="Pacific/Honolulu">Hawaii Time (HST)</option>
            </optgroup>
            <optgroup label="Europe">
              <option value="Europe/London">London (GMT/BST)</option>
              <option value="Europe/Paris">Paris (CET/CEST)</option>
            </optgroup>
          </select>

        </div>
      </div>
    </div>
  );
};

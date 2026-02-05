'use client';

import React, { useState, useEffect } from 'react';
import { useOnboardingStore } from '@/dashboard/store/useOnboardingStore';
import { Search, Check } from 'lucide-react';

interface TwilioNumber {
  phoneNumber: string;
  friendlyName: string;
  locality: string;
  region: string;
}

export const StepNumberSelection = () => {
  const { data, updateData } = useOnboardingStore();
  const [areaCode, setAreaCode] = useState('');
  const [numbers, setNumbers] = useState<TwilioNumber[]>([]);
  const [loading, setLoading] = useState(false);

  const searchNumbers = async () => {
    if (!areaCode || areaCode.length < 3) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/twilio/search-numbers?areaCode=${areaCode}`);
      const result = await res.json();
      setNumbers(result.numbers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (areaCode.length === 3) {
      searchNumbers();
    }
  }, [areaCode]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Pick your business number
        </h1>
        <p className="text-slate-500">
          Search by area code to find a local presence for your customers.
        </p>
      </div>

      <div className="max-w-[500px] mx-auto space-y-4">
        <div className="relative">
          <label htmlFor="areaCode" className="text-sm font-medium text-slate-700 block mb-2">
            Enter Area Code
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              id="areaCode"
              type="text"
              maxLength={3}
              placeholder="e.g., 212"
              className="flex h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 py-2 text-base ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
              value={areaCode}
              onChange={(e) => setAreaCode(e.target.value.replace(/\D/g, ''))}
            />
          </div>
        </div>

        <div className="border rounded-2xl overflow-hidden bg-slate-50/50">
          <div className="max-h-[300px] overflow-y-auto divide-y divide-slate-100">
            {loading ? (
              <div className="p-8 text-center text-slate-400 animate-pulse">Searching numbers...</div>
            ) : numbers.length > 0 ? (
              numbers.map((n) => (
                <button
                  key={n.phoneNumber}
                  onClick={() => updateData({ selectedNumber: n.phoneNumber })}
                  className={`w-full flex items-center justify-between p-4 transition-all hover:bg-white ${
                    data.selectedNumber === n.phoneNumber ? 'bg-white ring-2 ring-inset ring-indigo-600' : ''
                  }`}
                >
                  <div className="text-left">
                    <div className="font-semibold text-slate-900 text-lg">{n.friendlyName}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">
                      {n.locality}, {n.region}
                    </div>
                  </div>
                  {data.selectedNumber === n.phoneNumber && (
                    <div className="bg-indigo-600 rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </button>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400">
                {areaCode.length === 3 ? "No numbers found for this area code." : "Search for an area code to see available numbers."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

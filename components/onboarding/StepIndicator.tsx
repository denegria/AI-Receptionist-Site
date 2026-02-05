'use client';

import React from 'react';
import { useOnboardingStore } from '@/store/useOnboardingStore';

export const StepIndicator = () => {
  const { step } = useOnboardingStore();
  const totalSteps = 7;

  return (
    <div className="flex gap-2 w-full max-w-sm mx-auto">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
            i + 1 <= step ? 'bg-indigo-600' : 'bg-slate-200'
          }`}
        />
      ))}
    </div>
  );
};

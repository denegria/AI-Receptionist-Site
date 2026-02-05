'use client';

import React from 'react';
import { useOnboardingStore } from '@/dashboard/store/useOnboardingStore';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export const StepNavigation = () => {
  const { step, nextStep, prevStep, data } = useOnboardingStore();

  if (step === 7) return null; // Provisioning step handles its own navigation

  const canContinue = () => {
    if (step === 1) return data.businessName.length > 0;
    if (step === 4) return !!data.selectedNumber;
    if (step === 5) return !!data.planId;
    return true;
  };

  return (
    <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-100">
      <button
        onClick={prevStep}
        disabled={step === 1}
        className={`flex items-center gap-2 text-sm font-bold tracking-tight transition-all ${
          step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <ArrowLeft className="h-4 w-4" />
        Go Back
      </button>

      <button
        onClick={nextStep}
        disabled={!canContinue()}
        className={`flex items-center gap-2 bg-indigo-600 text-white font-bold py-3 px-8 rounded-2xl shadow-xl shadow-indigo-200 transition-all hover:bg-indigo-700 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:grayscale`}
      >
        {step === 6 ? 'Start My Subscription' : 'Continue'}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};


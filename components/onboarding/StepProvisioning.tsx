'use client';

import React, { useState, useEffect } from 'react';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { CheckCircle2, Loader2, PartyPopper } from 'lucide-react';

interface ProvisionState {
  reservingNumber: 'pending' | 'loading' | 'success';
  configuringAI: 'pending' | 'loading' | 'success';
  finalizingDashboard: 'pending' | 'loading' | 'success';
}

export const StepProvisioning = () => {
  const { data } = useOnboardingStore();
  const [state, setState] = useState<ProvisionState>({
    reservingNumber: 'pending',
    configuringAI: 'pending',
    finalizingDashboard: 'pending',
  });

  const runProvisioning = async () => {
    // 1. Reserving Number
    setState((s) => ({ ...s, reservingNumber: 'loading' }));
    try {
      await fetch('/api/onboarding/provision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'mock_user_id', // In real app, from auth
          phoneNumber: data.selectedNumber,
          businessName: data.businessName,
          timezone: data.timezone,
          planId: data.planId,
          businessHours: data.businessHours,
          knowledgeBase: data.knowledgeBase,
        }),
      });
      setState((s) => ({ ...s, reservingNumber: 'success' }));
    } catch (e) {
      console.error(e);
    }


    // 2. Configuring AI
    setState((s) => ({ ...s, configuringAI: 'loading' }));
    await new Promise((r) => setTimeout(r, 1500)); // Simulate work
    setState((s) => ({ ...s, configuringAI: 'success' }));

    // 3. Finalizing
    setState((s) => ({ ...s, finalizingDashboard: 'loading' }));
    await new Promise((r) => setTimeout(r, 1000)); // Simulate work
    setState((s) => ({ ...s, finalizingDashboard: 'success' }));
  };

  useEffect(() => {
    runProvisioning();
  }, []);

  const allSuccess = state.reservingNumber === 'success' && 
                     state.configuringAI === 'success' && 
                     state.finalizingDashboard === 'success';

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-md mx-auto">
      <div className="space-y-2 text-center">
        {allSuccess ? (
          <>
            <div className="mx-auto bg-green-100 text-green-600 rounded-full h-16 w-16 flex items-center justify-center mb-4 animate-bounce">
              <PartyPopper className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              You're ready to go!
            </h1>
          </>
        ) : (
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Setting things up...
          </h1>
        )}
      </div>

      <div className="space-y-4">
        <ProvisionItem
          label="Reserving your new number..."
          status={state.reservingNumber}
        />
        <ProvisionItem
          label="Configuring your AI dispatcher..."
          status={state.configuringAI}
        />
        <ProvisionItem
          label="Finalizing your dashboard..."
          status={state.finalizingDashboard}
        />
      </div>

      {allSuccess && (
        <div className="pt-4 flex justify-center">
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="bg-indigo-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all hover:scale-105"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

const ProvisionItem = ({ label, status }: { label: string; status: 'pending' | 'loading' | 'success' }) => {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
      status === 'success' ? 'bg-green-50/50 border-green-100' : 'bg-white border-slate-100'
    }`}>
      {status === 'loading' ? (
        <Loader2 className="h-5 w-5 text-indigo-600 animate-spin" />
      ) : status === 'success' ? (
        <CheckCircle2 className="h-5 w-5 text-green-600" />
      ) : (
        <div className="h-5 w-5 rounded-full border-2 border-slate-200" />
      )}
      <span className={`text-sm font-medium ${
        status === 'success' ? 'text-green-700' : status === 'loading' ? 'text-indigo-900' : 'text-slate-400'
      }`}>
        {label}
      </span>
    </div>
  );
};

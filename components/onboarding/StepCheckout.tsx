'use client';

import React, { useState } from 'react';
import { useOnboardingStore } from '@/dashboard/store/useOnboardingStore';
import { CreditCard, Lock } from 'lucide-react';

export const StepCheckout = () => {
  const { data } = useOnboardingStore();
  const [isProcessing, setIsProcessing] = useState(false);

  // In a real app, this would use @stripe/react-stripe-js
  const handleCheckout = async () => {
    setIsProcessing(true);
    // Mocking the checkout process
    setTimeout(() => {
      setIsProcessing(false);
      // In reality, this would be handled by StepNavigation's nextStep after successful payment
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Complete Setup
        </h1>
        <p className="text-slate-500">
          You won't be charged until your number is active.
        </p>
      </div>

      <div className="max-w-[450px] mx-auto bg-white p-8 rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/50">
        <div className="mb-8 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Selected Plan</p>
            <p className="font-bold text-slate-900">{data.planId === 'price_pro' ? 'Pro Plan' : data.planId === 'price_starter' ? 'Starter Plan' : 'Enterprise Plan'}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total</p>
            <p className="font-bold text-slate-900 text-xl">{data.planId === 'price_pro' ? '$99' : data.planId === 'price_starter' ? '$49' : '$249'}<span className="text-sm font-normal text-slate-500">/mo</span></p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Card Information</label>
            <div className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-slate-400" />
              <div className="flex-1 text-slate-400 text-sm italic">
                {/* This is where CardElement would go */}
                4242 4242 4242 4242
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Expiry</label>
              <div className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 flex items-center text-slate-400 text-sm">
                MM / YY
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">CVC</label>
              <div className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 flex items-center text-slate-400 text-sm">
                123
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-xs">
          <Lock className="h-3 w-3" />
          Securely processed by Stripe
        </div>
      </div>
    </div>
  );
};

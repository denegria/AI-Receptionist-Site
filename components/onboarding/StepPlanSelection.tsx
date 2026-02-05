'use client';

import React from 'react';
import { useOnboardingStore } from '@/dashboard/store/useOnboardingStore';
import { CheckCircle2 } from 'lucide-react';

const plans = [
  {
    id: 'price_starter',
    name: 'Starter',
    price: '$49',
    features: ['500 Minutes', 'Basic Dispatch'],
    description: 'Perfect for getting started.',
  },
  {
    id: 'price_pro',
    name: 'Pro',
    price: '$99',
    features: ['Unlimited Minutes', 'AI Scheduling'],
    description: 'The standard for growth.',
    popular: true,
  },
  {
    id: 'price_enterprise',
    name: 'Enterprise',
    price: '$249',
    features: ['Multi-region support', 'Custom Integrations'],
    description: 'For large-scale operations.',
  },
];

export const StepPlanSelection = () => {
  const { data, updateData } = useOnboardingStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Choose your growth path
        </h1>
        <p className="text-slate-500">
          Select the plan that best fits your current volume.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => updateData({ planId: plan.id })}
            className={`relative flex flex-col text-left p-6 rounded-3xl border-2 transition-all duration-300 ${
              data.planId === plan.id
                ? 'border-indigo-600 bg-white shadow-xl scale-105 z-10'
                : 'border-slate-100 bg-slate-50/50 hover:border-slate-200'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                Most Popular
              </span>
            )}
            <div className="mb-4">
              <h3 className="font-bold text-lg text-slate-900">{plan.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{plan.description}</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-black text-slate-900">{plan.price}</span>
              <span className="text-slate-500 text-sm">/mo</span>
            </div>
            <div className="space-y-3 mt-auto">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                  {feature}
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

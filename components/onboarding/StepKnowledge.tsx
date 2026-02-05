'use client';

import React from 'react';
import { useOnboardingStore } from '@/dashboard/store/useOnboardingStore';
import { BrainCircuit } from 'lucide-react';

export const StepKnowledge = () => {
  const { data, updateData } = useOnboardingStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          The "Brain" of your AI
        </h1>
        <p className="text-slate-500">
          Paste your business FAQs, pricing, or service details here.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <div className="relative">
          <div className="absolute top-4 left-4">
            <BrainCircuit className="h-6 w-6 text-indigo-500 opacity-20" />
          </div>
          <textarea
            placeholder="Example: We offer $99 tune-ups. Our main service area is Seattle. Emergency calls after 9 PM have a $50 surcharge..."
            className="w-full h-64 p-6 pl-12 bg-white rounded-3xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all text-slate-700 placeholder:text-slate-400 resize-none"
            value={data.knowledgeBase}
            onChange={(e) => updateData({ knowledgeBase: e.target.value })}
          />
        </div>
        
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex gap-3">
          <div className="text-amber-600 text-lg">💡</div>
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>Pro Tip:</strong> The more detail you provide, the better your AI can handle complex customer questions without bothering you.
          </p>
        </div>
      </div>
    </div>
  );
};

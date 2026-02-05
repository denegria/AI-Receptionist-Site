'use client';

import { useOnboardingStore } from '@/store/useOnboardingStore';
import { motion } from 'framer-motion';

export default function OnboardingPage() {
  const { step } = useOnboardingStore();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          {step === 1 && "Tell us about your business"}
          {step === 2 && "When are you open?"}
          {step === 3 && "Train your AI Receptionist"}
          {step === 4 && "Choose a Phone Number"}
          {step === 5 && "Select a Plan"}
          {step === 6 && "Checkout"}
          {step === 7 && "Setting up..."}
        </h1>
        
        {/* Placeholder for Steps */}
        <div className="py-8 text-center text-slate-500">
          Step {step} Content Coming Soon...
        </div>

        {/* Navigation Placeholder */}
        <div className="flex justify-between mt-8">
            <button className="text-slate-400">Back</button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">Continue</button>
        </div>
      </div>
    </div>
  );
}

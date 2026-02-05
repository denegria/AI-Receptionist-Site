'use client';

import React from 'react';
import { useOnboardingStore } from '@/dashboard/store/useOnboardingStore';
import { StepIndicator } from './StepIndicator';
import { StepBusinessInfo } from './StepBusinessInfo';
import { StepHours } from './StepHours';
import { StepKnowledge } from './StepKnowledge';
import { StepNumberSelection } from './StepNumberSelection';
import { StepPlanSelection } from './StepPlanSelection';
import { StepCheckout } from './StepCheckout';
import { StepProvisioning } from './StepProvisioning';
import { StepNavigation } from './StepNavigation';
import { AnimatePresence, motion } from 'framer-motion';

export const OnboardingLayout = () => {
  const { step } = useOnboardingStore();

  const renderStep = () => {
    switch (step) {
      case 1: return <StepBusinessInfo />;
      case 2: return <StepHours />;
      case 3: return <StepKnowledge />;
      case 4: return <StepNumberSelection />;
      case 5: return <StepPlanSelection />;
      case 6: return <StepCheckout />;
      case 7: return <StepProvisioning />;
      default: return <StepBusinessInfo />;
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 p-8 md:p-16 relative overflow-hidden">
        {/* Decorative Gradient */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-20" />
        
        <div className="mb-12">
          <StepIndicator />
        </div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        <StepNavigation />
      </div>
      
      <p className="mt-8 text-slate-400 text-sm">
        Need help? <a href="#" className="underline hover:text-indigo-600">Contact Support</a>
      </p>
    </div>
  );
};

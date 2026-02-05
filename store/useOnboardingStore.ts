import { create } from 'zustand';

interface OnboardingState {
  step: number;
  businessName: string;
  firstName: string;
  lastName: string;
  timezone: string;
  businessHours: {
    enabled: boolean; // Simple Mon-Fri toggle
    start: string;
    end: string;
  };
  knowledgeBase: string;
  selectedNumber: string | null;
  planId: 'starter' | 'pro' | 'enterprise';
  
  setStep: (step: number) => void;
  setBusinessInfo: (info: { businessName: string; firstName: string; lastName: string; timezone: string }) => void;
  setBusinessHours: (hours: { enabled: boolean; start: string; end: string }) => void;
  setKnowledgeBase: (kb: string) => void;
  setSelectedNumber: (num: string) => void;
  setPlanId: (id: 'starter' | 'pro' | 'enterprise') => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step: 1,
  businessName: '',
  firstName: '',
  lastName: '',
  timezone: 'America/New_York',
  businessHours: { enabled: true, start: '09:00', end: '17:00' },
  knowledgeBase: '',
  selectedNumber: null,
  planId: 'pro',

  setStep: (step) => set({ step }),
  setBusinessInfo: (info) => set((state) => ({ ...state, ...info })),
  setBusinessHours: (hours) => set({ businessHours: hours }),
  setKnowledgeBase: (kb) => set({ knowledgeBase: kb }),
  setSelectedNumber: (num) => set({ selectedNumber: num }),
  setPlanId: (id) => set({ planId: id }),
}));

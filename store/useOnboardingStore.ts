import { create } from 'zustand';

export interface BusinessHours {
  monFriOnly: boolean;
  startTime: string;
  endTime: string;
}

interface OnboardingData {
  businessName: string;
  businessDescription: string;
  timezone: string;
  businessHours: BusinessHours;
  knowledgeBase: string;
  selectedNumber: string | null;
  planId: string | null;
  stripePaymentId: string | null;
}

interface OnboardingStore {
  step: number;
  data: OnboardingData;
  setStep: (step: number) => void;
  updateData: (fields: Partial<OnboardingData>) => void;
  updateHours: (hours: Partial<BusinessHours>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  step: 1,
  data: {
    businessName: '',
    businessDescription: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    businessHours: {
      monFriOnly: true,
      startTime: '09:00',
      endTime: '17:00',
    },
    knowledgeBase: '',
    selectedNumber: null,
    planId: 'price_pro',
    stripePaymentId: null,
  },
  setStep: (step) => set({ step }),
  updateData: (fields) =>
    set((state) => ({
      data: { ...state.data, ...fields },
    })),
  updateHours: (hours) =>
    set((state) => ({
      data: {
        ...state.data,
        businessHours: { ...state.data.businessHours, ...hours },
      },
    })),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
}));

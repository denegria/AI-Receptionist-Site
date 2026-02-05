import { OnboardingLayout } from '@/dashboard/components/onboarding/OnboardingLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Setup Your Business | Dispatcher AI',
  description: 'Complete your onboarding to start automating your communication.',
};

export default function OnboardingPage() {
  return <OnboardingLayout />;
}

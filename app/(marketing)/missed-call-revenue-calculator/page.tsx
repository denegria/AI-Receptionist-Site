import React from 'react';
import { Metadata } from 'next';
import MissedCallCalculatorClient from './client';

const CANONICAL_URL =
  'https://ai-receptionist-site.vercel.app/missed-call-revenue-calculator';

export const metadata: Metadata = {
  title: 'Missed Call Revenue Loss Calculator for Contractors',
  description:
    'Estimate revenue and profit lost to missed calls in HVAC, plumbing, and electrical. Use your real call volume, booking rate, ticket size, and gross margin.',
  keywords:
    'missed call revenue calculator, how much do missed calls cost, missed calls HVAC, missed calls plumbing, missed calls electrician',
  openGraph: {
    title: 'Missed Call Revenue Loss Calculator (Trades)',
    description:
      "Estimate what missed calls are costing you each month — revenue and profit — using your own numbers.",
    url: CANONICAL_URL,
    type: 'website',
  },
  alternates: {
    canonical: CANONICAL_URL,
  },
};

// FAQ structured data for SEO (Walter pack; no hard guarantees)
const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What counts as a “missed call”?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any inbound call that doesn\'t reach a real booking conversation—no live answer, sent to voicemail, abandoned while on hold, or answered too late to schedule the job.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this calculator only for HVAC companies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. It\'s built for any service business where speed matters: HVAC, plumbing, electrical, handyman, garage door, roofing, pest control, and similar trades.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I estimate my missed call rate if I’m not tracking it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Start with your phone system or call tracking: total inbound calls vs. answered calls. If you don\'t have clean data, use a conservative guess, then revise after you pull a week or two of logs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What booking rate should I use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use your real close/booking rate if you know it. If you\'re unsure, pick a conservative number. The goal is a realistic range—not an inflated projection.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does gross margin matter in the results?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Revenue is vanity; profit is what pays your team and grows the business. Gross margin helps translate missed booked jobs into actual impact on the bottom line.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do missed calls matter if my techs are already booked out?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Missed calls still reduce higher-value opportunities (emergencies, replacements, commercial work), and they can create gaps later when today\'s calls should have been next week\'s schedule.',
      },
    },
    {
      '@type': 'Question',
      name: 'What about after-hours and weekend calls?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Those are often the highest-intent calls. The calculator is especially useful if you see spikes after 5pm, during lunch, weekends, or when you\'re on job sites and can\'t answer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can an AI receptionist actually book jobs, or does it just take messages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Depending on your setup, it can capture details, qualify the request, and schedule or hand off to your team—based on your rules. The right flow depends on your trade, emergency handling, and dispatch preferences.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will this calculator tell me exactly how much money I’ll recover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. It estimates what you’re losing based on your inputs and can show a conservative recovery scenario. Actual results depend on call quality, dispatch capacity, pricing, and how your booking process is set up.',
      },
    },
    {
      '@type': 'Question',
      name: 'What’s the fastest way to reduce missed-call losses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ensure calls are answered live (including after-hours), capture job details consistently, and route every lead to the right next step (book now, urgent dispatch, or next-day scheduling).',
      },
    },
  ],
};

export default function MissedCallCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <MissedCallCalculatorClient />
    </>
  );
}

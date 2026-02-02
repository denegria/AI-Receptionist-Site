"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    id: "basic",
    name: "Starter",
    price: "$49",
    description: "Perfect for small businesses starting with AI.",
    features: [
      "AI Voice Answering",
      "Email Notifications",
      "50 Calls per month",
      "Standard Support",
    ],
  },
  {
    id: "pro",
    name: "Professional",
    price: "$149",
    description: "Advanced features for growing companies.",
    features: [
      "Everything in Starter",
      "Calendar Integration",
      "SMS Notifications",
      "Unlimited Calls",
      "Priority Support",
    ],
    popular: true,
  },
];

export default function PlanSelectionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedPlan) {
      // Save plan to session storage for the flow
      sessionStorage.setItem("onboarding_plan", selectedPlan);
      router.push("/onboarding/payment");
    }
  };

  return (
    <div className="max-w-4xl w-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose your plan</h1>
        <p className="text-white/60">Select the plan that works best for your business. You won't be charged until after your 14-day trial.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`
              relative p-8 rounded-2xl border-2 transition-all cursor-pointer
              ${selectedPlan === plan.id 
                ? "border-blue-500 bg-blue-500/5 ring-4 ring-blue-500/20" 
                : "border-white/10 bg-white/5 hover:border-white/20"}
            `}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </span>
            )}
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="text-white/60 text-sm mt-2">{plan.description}</p>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-white/40">/month</span>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-blue-500" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className={`
              w-full py-3 rounded-lg text-center font-bold transition-colors
              ${selectedPlan === plan.id ? "bg-blue-600 text-white" : "bg-white/10 text-white/60"}
            `}>
              {selectedPlan === plan.id ? "Selected" : "Choose Plan"}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button
          disabled={!selectedPlan}
          onClick={handleContinue}
          className={`
            px-12 py-4 rounded-full font-bold text-lg transition-all
            ${selectedPlan 
              ? "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20" 
              : "bg-white/10 text-white/40 cursor-not-allowed"}
          `}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}

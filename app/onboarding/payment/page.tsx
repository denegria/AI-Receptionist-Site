"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);

    const { error: submitError } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/onboarding/number`,
      },
    });

    if (submitError) {
      setError(submitError.message || "An error occurred");
      setProcessing(false);
    } else {
      // confirmSetup handles redirect if successful
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        disabled={!stripe || processing}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all disabled:opacity-50"
      >
        {processing ? "Processing..." : "Secure Payment Method"}
      </button>
      <p className="text-center text-xs text-white/40">
        Your card will not be charged today. 14-day free trial starts now.
      </p>
    </form>
  );
}

export default function PaymentPage() {
  const { user } = useUser();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      // Create SetupIntent on mount
      fetch(`/api/proxy/onboarding/setup-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.primaryEmailAddress?.emailAddress,
          businessName: user.fullName || "HVAC Business",
          clientId: user.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [user]);

  if (!clientSecret) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p>Initializing secure checkout...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">Add payment method</h1>
        <p className="text-white/60">We require a payment method to prevent spam. You can cancel anytime during your 14-day trial.</p>
      </div>

      <div className="bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl">
        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night' } }}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}

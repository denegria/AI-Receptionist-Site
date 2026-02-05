import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type SetupIntentRequestBody = {
  customerId?: string;
  // Optional override; defaults to ["card"]
  paymentMethodTypes?: string[];
  // Optional metadata (string map)
  metadata?: Record<string, string>;
};

/**
 * Creates a Stripe SetupIntent via Stripe's REST API.
 *
 * Env:
 * - STRIPE_SECRET_KEY
 */
export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: "Missing STRIPE_SECRET_KEY" },
      { status: 500 }
    );
  }

  let body: SetupIntentRequestBody | null = null;
  try {
    body = (await req.json()) as SetupIntentRequestBody;
  } catch {
    body = null;
  }

  const paymentMethodTypes = body?.paymentMethodTypes?.length
    ? body.paymentMethodTypes
    : ["card"];

  const form = new URLSearchParams();
  for (const [idx, t] of paymentMethodTypes.entries()) {
    form.set(`payment_method_types[${idx}]`, t);
  }

  if (body?.customerId) form.set("customer", body.customerId);

  if (body?.metadata) {
    for (const [k, v] of Object.entries(body.metadata)) {
      form.set(`metadata[${k}]`, v);
    }
  }

  const res = await fetch("https://api.stripe.com/v1/setup_intents", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  const json = (await res.json().catch(() => null)) as any;

  if (!res.ok) {
    return NextResponse.json(
      {
        error: "Stripe API error",
        status: res.status,
        details: json?.error ?? json,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    setupIntentId: json.id as string,
    clientSecret: json.client_secret as string,
    status: json.status as string,
  });
}

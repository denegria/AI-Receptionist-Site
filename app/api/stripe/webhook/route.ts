import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

function timingSafeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

function verifyStripeSignature(opts: {
  payload: string;
  header: string | null;
  secret: string;
  toleranceSeconds?: number;
}): { ok: true; timestamp: number } | { ok: false; reason: string } {
  const { payload, header, secret, toleranceSeconds = 300 } = opts;

  if (!header) return { ok: false, reason: "Missing Stripe-Signature header" };

  // Stripe-Signature: t=...,v1=...,v1=...
  const parts = header.split(",").map((p) => p.trim());
  const tPart = parts.find((p) => p.startsWith("t="));
  const v1Parts = parts.filter((p) => p.startsWith("v1="));
  if (!tPart || v1Parts.length === 0) {
    return { ok: false, reason: "Malformed Stripe-Signature header" };
  }

  const timestamp = Number(tPart.slice(2));
  if (!Number.isFinite(timestamp)) {
    return { ok: false, reason: "Invalid timestamp in Stripe-Signature" };
  }

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > toleranceSeconds) {
    return { ok: false, reason: "Timestamp outside tolerance" };
  }

  const signedPayload = `${timestamp}.${payload}`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(signedPayload, "utf8")
    .digest("hex");

  const matches = v1Parts.some((p) => timingSafeEqual(p.slice(3), expected));
  if (!matches) return { ok: false, reason: "Signature mismatch" };

  return { ok: true, timestamp };
}

/**
 * Stripe webhook endpoint (REST-only verification).
 *
 * Env:
 * - STRIPE_WEBHOOK_SECRET
 */
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET" },
      { status: 500 }
    );
  }

  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  const verified = verifyStripeSignature({ payload, header: sig, secret });
  if (!verified.ok) {
    return NextResponse.json(
      { error: "Invalid signature", reason: verified.reason },
      { status: 400 }
    );
  }

  let event: any;
  try {
    event = JSON.parse(payload);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Minimal event handling (extend as needed)
  // eslint-disable-next-line no-console
  console.log("Stripe webhook:", {
    id: event?.id,
    type: event?.type,
    created: event?.created,
  });

  switch (event?.type) {
    case "setup_intent.succeeded":
    case "setup_intent.setup_failed":
    case "payment_method.attached":
      // TODO: persist to DB / notify app
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

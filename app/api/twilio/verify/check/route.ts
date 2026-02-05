import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type CheckVerifyBody = {
  to: string; // E.164
  code: string;
};

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

/**
 * Checks a Twilio Verify verification code.
 *
 * Env:
 * - TWILIO_ACCOUNT_SID
 * - TWILIO_AUTH_TOKEN
 * - TWILIO_VERIFY_SERVICE_SID
 */
export async function POST(req: NextRequest) {
  let body: CheckVerifyBody;
  try {
    body = (await req.json()) as CheckVerifyBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body?.to || !body?.code) {
    return NextResponse.json(
      { error: "Missing 'to' or 'code'" },
      { status: 400 }
    );
  }

  let accountSid: string;
  let authToken: string;
  let serviceSid: string;
  try {
    accountSid = requireEnv("TWILIO_ACCOUNT_SID");
    authToken = requireEnv("TWILIO_AUTH_TOKEN");
    serviceSid = requireEnv("TWILIO_VERIFY_SERVICE_SID");
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }

  const form = new URLSearchParams();
  form.set("To", body.to);
  form.set("Code", body.code);

  const basic = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
  const url = `https://verify.twilio.com/v2/Services/${serviceSid}/VerificationCheck`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  const data = (await res.json().catch(() => null)) as any;
  if (!res.ok) {
    return NextResponse.json(
      { error: "Twilio API error", status: res.status, details: data },
      { status: 502 }
    );
  }

  return NextResponse.json({
    sid: data.sid as string,
    status: data.status as string,
    valid: data.status === "approved",
    to: data.to as string,
  });
}

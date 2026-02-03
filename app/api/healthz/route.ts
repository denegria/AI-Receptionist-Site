import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const flyApiUrl = process.env.FLY_API_URL;
  if (!flyApiUrl) {
    return NextResponse.json(
      { ok: false },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);

  try {
    const res = await fetch(`${flyApiUrl.replace(/\/$/, "")}/healthz`, {
      method: "GET",
      // Do not forward any client headers/cookies/auth.
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
      signal: controller.signal,
    });

    // Treat any non-2xx as unhealthy.
    if (!res.ok) {
      return NextResponse.json(
        { ok: false },
        {
          status: 503,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    // Optionally validate body shape, but keep minimal.
    return NextResponse.json(
      { ok: true },
      {
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch {
    return NextResponse.json(
      { ok: false },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } finally {
    clearTimeout(timeout);
  }
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxy(req, await params);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxy(req, await params);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxy(req, await params);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxy(req, await params);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxy(req, await params);
}

async function handleProxy(
  req: NextRequest,
  { path }: { path: string[] }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  
  // We prepend 'api' because the frontend calls /api/proxy/onboarding/...
  // but the backend expects /api/onboarding/...
  const targetPath = path[0] === 'api' ? path.join("/") : `api/${path.join("/")}`;
  
  const searchParams = req.nextUrl.searchParams.toString();
  const url = `${baseUrl}/${targetPath}${searchParams ? `?${searchParams}` : ""}`;

  const headers = new Headers();
  headers.set("x-api-key", process.env.ADMIN_API_KEY || "");
  headers.set("Content-Type", "application/json");

  try {
    const fetchOptions: RequestInit = {
      method: req.method,
      headers,
    };

    if (["POST", "PUT", "PATCH"].includes(req.method)) {
      const body = await req.json().catch(() => null);
      if (body) {
        fetchOptions.body = JSON.stringify(body);
      }
    }

    const response = await fetch(url, fetchOptions);
    
    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } else {
      const text = await response.text();
      return new NextResponse(text, { 
        status: response.status,
        headers: { "Content-Type": contentType || "text/plain" }
      });
    }
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

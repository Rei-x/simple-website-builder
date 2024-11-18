import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { env } from "./env";

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const hostname = req.headers.get("host") || "";

  // Extract the potential subdomain from the URL

  const subdomains = hostname.split(".");

  if (subdomains.length <= env.NEXT_PUBLIC_FRONTEND_DOMAIN.split(".").length) {
    return NextResponse.next();
  }

  const subdomain = subdomains[0];

  return NextResponse.rewrite(new URL(`/preview/${subdomain}`, req.url));
}

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

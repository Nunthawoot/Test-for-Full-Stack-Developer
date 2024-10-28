import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/signin" && request.cookies.has("userAuth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname === "/" && !request.cookies.has("userAuth")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/api/posts"],
};

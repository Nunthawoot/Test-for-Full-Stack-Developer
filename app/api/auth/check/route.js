// app/api/auth/check/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  const token = request.cookies.get("userAuth");

  if (token) {
    return NextResponse.json({ isAuthenticated: true });
  }

  return NextResponse.json({ isAuthenticated: false });
}

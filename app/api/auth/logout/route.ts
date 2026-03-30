// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  
  // Clear the token cookie
  response.cookies.set('balaji_token', '', {
    path: '/',
    expires: new Date(0),
  });

  return response;
}
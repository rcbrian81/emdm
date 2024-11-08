// src/middleware.js

import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("Middleware Triggered");
  const sessionId = request.cookies.get("session_id");
  console.log("Session ID from Cookie:", sessionId);

  if (!sessionId) {
    console.log("No sessionID Found");
    const loginUrl = new URL("/admin_login", request.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/admin/:path*"], // Adjust to match your protected routes
};

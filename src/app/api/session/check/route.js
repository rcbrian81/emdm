// src/app/api/session/check/route.js

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    // Check if the session_id cookie already exists
    const sessionIdCookie = request.cookies.get("session_id");

    if (sessionIdCookie) {
      const session = await prisma.session.findUnique({
        where: { id: sessionIdCookie.value },
      });

      // If a valid session is found and not expired, return early
      if (session && session.expiresAt > new Date()) {
        return NextResponse.json({ message: "Session already exists" });
      }
    }

    // If no valid session exists, create a new session
    const sessionId = await createSession(null, false);

    // Set a new session cookie
    const response = NextResponse.json({ message: "Session started" });
    response.cookies.set("session_id", sessionId, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // Cookie expires in 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error checking or starting session:", error);
    return NextResponse.json(
      { error: "Failed to check or start session" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const cookie = request.cookies.get("session_id");
    const sessionId = cookie.value;

    if (!sessionId) {
      return NextResponse.json({ isAuthenticated: false });
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    const isAuthenticated =
      session && session.isAuthenticated && session.expiresAt > new Date();

    return NextResponse.json({ isAuthenticated });
  } catch (error) {
    console.error("Error in session check:", error); // Log the error to see what’s going wrong
    return NextResponse.json(
      { isAuthenticated: false, error: "Failed to fetch session data" },
      { status: 500 }
    );
  }
}

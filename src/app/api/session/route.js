import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";

export async function POST(request) {
  console.log("=POST===============");
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
      maxAge: 60 * 60 * 24, // Cookie expires in 1 day
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

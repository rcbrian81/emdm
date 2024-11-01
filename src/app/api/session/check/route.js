// src/app/api/session/check/route.js

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

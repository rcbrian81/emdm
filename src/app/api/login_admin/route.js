// src/app/api/login/route.js

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";

export async function POST(request) {
  console.log("=POST=========================");
  const { username, password } = await request.json();
  console.log(username + " " + password);

  // Find the admin user in the database
  const admin = await prisma.admin.findUnique({
    where: { username },
  });
  console.log(admin.password);

  if (!admin) {
    console.log("problem");
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, admin.password);
  console.log(isPasswordValid);

  if (!isPasswordValid) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }

  const sessionId = await createSession(admin.id, true);
  console.log("Session Created");
  // Authentication successful
  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set("session_id", sessionId, {
    httpOnly: true,
    maxAge: 60 * 60, // 1 hour
  });
  console.log("Cookie Set");
  return response;
}

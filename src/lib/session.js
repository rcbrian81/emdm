// src/lib/session.js
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function createSession(userId, isAuthenticated) {
  console.log("Creating New Session");
  const sessionId = uuidv4();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1-hour expiration
  console.log(userId);
  console.log(isAuthenticated);
  const newSession = await prisma.session.create({
    data: {
      id: sessionId,
      userId: userId,
      cartItems: JSON.stringify([]),
      isAuthenticated: isAuthenticated,
      createdAt: new Date(),
      expiresAt,
    },
  });

  return sessionId;
}

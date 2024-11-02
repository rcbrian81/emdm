import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust path as necessary

export async function POST(request) {
  try {
    const { cartItems, sessionId } = await request.json();

    // Validate cart data
    if (!cartItems || !sessionId) {
      return NextResponse.json({ error: "Invalid cart data" }, { status: 400 });
    }

    // Update each item in the cart within the session (pseudo-code)
    for (const item of cartItems) {
      await prisma.cartItem.upsert({
        where: { sessionId_itemId: { sessionId, itemId: item.id } },
        update: { quantity: item.quantity },
        create: {
          sessionId,
          itemId: item.id,
          quantity: item.quantity,
        },
      });
    }

    return NextResponse.json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json({ error: "Error updating cart" }, { status: 500 });
  }
}

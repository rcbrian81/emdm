import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust the path if necessary

export async function POST(request) {
  try {
    // Parse request body to get updated cart items
    const { cartItems } = await request.json();

    // Iterate over each cart item in the request to update the database
    for (const item of cartItems) {
      await prisma.cartItem.update({
        where: { id: item.id },
        data: { quantity: item.quantity },
      });
    }

    return NextResponse.json({ message: "Cart items updated successfully" });
  } catch (error) {
    console.error("Error updating cart items:", error);
    return NextResponse.json(
      { error: "Failed to update cart items" },
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json(null, {
    headers: {
      Allow: "POST",
    },
  });
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust path as necessary
import { getSession } from "@/lib/session"; // Adjust path as necessary

export async function POST(request) {
  // NEED: check if session exist and is valid before adding to cart
  // make @/lib/check utility to check if session exist
  // if theres no valid session then create one
  console.log("=POST Cart===============");
  try {
    const { foodID, quantity } = await request.json(); // Parse request body

    // Get the session (ensure session management is implemented in your app)
    // const session = await getSession(request);

    const cookie = request.cookies.get("session_id");
    const sessionId = cookie?.value;
    console.log(sessionId);

    if (!sessionId) {
      return NextResponse.json(
        { error: "No valid session found" },
        { status: 401 }
      );
    }

    // Check if there's an existing cart item with the same sessionId and menuItemId
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        sessionId: sessionId,
        menuItemId: foodID,
      },
    });
    console.log("=Existing Cart Item=");
    console.log(existingCartItem);
    if (existingCartItem) {
      // Update the quantity of the existing cart item
      await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
      return NextResponse.json({ message: "Quantity updated in cart" });
    } else {
      // Update cart items in the database (creating a new cart item if none exists)
      await prisma.cartItem.create({
        data: {
          sessionId: sessionId,
          menuItemId: foodID,
          quantity: quantity,
        },
      });
      return NextResponse.json({ message: "Item added to cart" });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
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

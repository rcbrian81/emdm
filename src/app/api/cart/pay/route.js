// /api/checkout/route.js
import prisma from "@/lib/prisma"; // Adjust path as needed
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  console.log("=POST Pay===========");
  try {
    const sessionCookie = cookies().get("session_id");
    const sessionId = sessionCookie?.value;
    console.log(`Session ID: ${sessionId}`);
    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Retrieve cart items based on sessionId
    const cartItems = await prisma.cartItem.findMany({
      where: { sessionId },
      include: {
        menuItem: true, // Assuming menuItem has the price field
      },
    });
    console.log(`Cart Items: ${cartItems}`);
    console.log(JSON.stringify(cartItems));
    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty or session not found" },
        { status: 404 }
      );
    }

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
      const itemPrice = item.menuItem.price || 0;
      const itemTotal = item.quantity * itemPrice;
      return total + itemTotal;
    }, 0);
    console.log(`Total Price: ${totalPrice}`);
    // Create the order with status 'pending' and store cart items as JSON
    const order = await prisma.order.create({
      data: {
        sessionId,
        totalPrice,
        status: "pending",
        cartItems: JSON.stringify(cartItems), // Store cart items as JSON
      },
    });

    // Delete the old cart items for the session, effectively clearing the cart
    await prisma.cartItem.deleteMany({
      where: { sessionId },
    });
    console.log(`charing for ${totalPrice}`);

    const paid = true;

    if (paid) {
      // Update the order's status to 'paid'
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "paid" },
      });
      console.log(`Order ${order.id} status updated to paid`);
    }

    return NextResponse.json({ message: "Checkout successful" });
    //return NextResponse.json({ message: "Checkout successful", order });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Error during checkout" },
      { status: 500 }
    );
  }
}

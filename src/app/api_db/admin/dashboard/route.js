// src/app/api_db/admin/dashboard/route.js
import prisma from "@/lib/prisma"; // Adjust path as needed
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Retrieve all orders with the status 'paid'
    const paidOrders = await prisma.order.findMany({
      where: { status: "paid" },
      select: {
        sessionId: true,
        name: true, // Include 'name' in the selection
        totalPrice: true,
        cartItems: true,
      },
    });

    // Process and format data to send only the required information
    const formattedOrders = paidOrders.map((order) => ({
      id: order.sessionId,
      name: order.name,
      totalPrice: order.totalPrice,
      items: JSON.parse(order.cartItems).map((cartItem) => ({
        name: cartItem.menuItem.name,
        quantity: cartItem.quantity,
      })),
    }));

    console.log(formattedOrders);
    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: "Error retrieving paid orders" },
      { status: 500 }
    );
  }
}

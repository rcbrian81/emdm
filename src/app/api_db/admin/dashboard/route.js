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
    const response = NextResponse.json(formattedOrders);
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: "Error retrieving paid orders" },
      { status: 500 }
    );
  }
}

// src/app/api_db/admin/dashboard/route.js
import prisma from "@/lib/prisma"; // Adjust path as needed
import { NextResponse } from "next/server";

export async function GET() {
  console.log("=GET Dashboard/All");
  try {
    // Retrieve all orders with the status 'paid'
    const allOrders = await prisma.order.findMany({
      select: {
        id: true,
        sessionId: true,
        name: true, // Include 'name' in the selection
        totalPrice: true,
        cartItems: true,
        createdAt: true,
        status: true,
      },
    });

    // Process and format data to send only the required information
    const formattedOrders = allOrders.map((order) => ({
      id: order.id,
      sessionId: order.sessionId,
      name: order.name,
      totalPrice: order.totalPrice,
      createdAt: order.createdAt,
      status: order.status,
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
      { error: "Error retrieving orders" },
      { status: 500 }
    );
  }
}

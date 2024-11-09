// src/app/api_db/admin/dashboard/route.js
import prisma from "@/lib/prisma"; // Adjust path as needed
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Retrieve all orders with the status 'paid'
    const paidOrders = await prisma.order.findMany({
      where: { OR: [{ status: "paid" }, { status: "prepping" }] },
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
    const formattedOrders = paidOrders.map((order) => ({
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
      { error: "Error retrieving paid orders" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  console.log("=POST Dashboard====================");
  try {
    const { id } = await request.json(); // Parse JSON from the request
    console.log(`Order ID: ${id}`);
    // Find the current order by ID
    const order = await prisma.order.findUnique({
      where: { id: id },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    console.log(`Order Found: \n ${order}`);
    console.log(`Current Status: \n ${order.status}`);

    // Determine the next status
    let newStatus;
    if (order.status === "paid") {
      newStatus = "prepping";
    } else if (order.status === "prepping") {
      newStatus = "out";
    } else {
      return NextResponse.json(
        { error: "Invalid status transition" },
        { status: 400 }
      );
    }
    console.log(`Current Status: \n ${order.status}`);
    console.log(`New Status: \n ${newStatus}`);

    // Update the order with the new status
    const updatedOrder = await prisma.order.update({
      where: { id: id },
      data: { status: newStatus },
    });
    console.log("Finished.");
    return NextResponse.json(newStatus, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 }
    );
  }
}

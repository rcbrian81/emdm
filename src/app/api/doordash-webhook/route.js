// src/app/api/doordash-webhook/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const event = await request.json();
    // Process the event, update order status, etc.
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

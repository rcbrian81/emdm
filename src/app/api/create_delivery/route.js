// src/app/api/create-delivery/route.js
import { NextResponse } from "next/server";
import doordashClient from "../../../lib/doordashClient";

export async function POST(request) {
  try {
    const deliveryDetails = await request.json();
    const delivery = await doordashClient.createDelivery(deliveryDetails);
    return NextResponse.json(delivery);
  } catch (error) {
    console.error("Error creating delivery:", error);
    return NextResponse.json(
      { error: "Failed to create delivery" },
      { status: 500 }
    );
  }
}

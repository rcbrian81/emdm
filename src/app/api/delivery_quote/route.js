// src/app/api/delivery-quote/route.js
import { NextResponse } from "next/server";
import doordashClient from "@/lib/doordashClient";

export async function POST(request) {
  console.log("=POST DELIVERY QUOTE==========");
  try {
    const deliveryDetails = await request.json();
    const quote = await doordashClient.deliveryQuote(deliveryDetails);
    console.log(quote);
    return NextResponse.json(quote);
  } catch (error) {
    console.error("Error fetching delivery quote:", error);
    return NextResponse.json(
      { error: "Failed to fetch delivery quote" },
      { status: 500 }
    );
  }
}

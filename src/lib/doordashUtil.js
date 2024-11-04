// src/app/api/delivery-quote/route.js
import { NextResponse } from "next/server";
import doordashClient from "@/lib/doordashClient";

export async function doordashQuote(deliveryDetails) {
  console.log("=POST DELIVERY QUOTE==========");
  try {
    const quote = await doordashClient.deliveryQuote(deliveryDetails);
    console.log(quote);
    return quote;
  } catch (error) {
    console.error("Error fetching delivery quote:", error);
  }
}

export async function doordashCreate(deliveryDetails) {
  try {
    const delivery = await doordashClient.createDelivery(deliveryDetails);
    return delivery;
  } catch (error) {
    console.error("Error creating delivery:", error);
  }
}

// src/app/api/webhook/route.js
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { doordashCreate } from "@/lib/doordashUtil";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

export async function POST(request) {
  console.log("=POST Webhook==============");
  const sig = request.headers.get("stripe-signature");

  let event;
  try {
    const body = await request.text(); // Read the raw request body
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response("Webhook Error", { status: 400 });
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Event Data Object:", event.data.object);
    const dropoff_address = session.metadata.dropoff_address;
    const dropoff_phone_number = session.metadata.dropoff_phone_number;
    const sessionId = session.client_reference_id;
    const sessionId2 = session.metadata.sessionId;
    console.log(dropoff_address);
    console.log(dropoff_phone_number);
    console.log(sessionId);
    console.log(sessionId2);

    const customerEmail = session.customer_details.email;
    console.log("Customer Email:", customerEmail);

    const deliveryDetails = JSON.stringify({
      external_delivery_id: `order_${Date.now()}`, // Generate a unique ID
      pickup_address: "2936 oceanside blvd,  oceanside, CA 92054, USA",
      pickup_phone_number: "7608282465",
      dropoff_address: dropoff_address,
      dropoff_phone_number: dropoff_phone_number,
    });

    const delivery = await doordashCreate(deliveryDetails);
    console.log(delivery);
    // Retrieve the session ID from your system

    // Here, you can update your database to mark the order as paid
    // await prisma.session.update({
    //   where: { id: sessionId },
    //   data: { isPaid: true }, // Update the payment status in your database
    // });

    console.log("Payment successful for session:", sessionId);

    // TODO: Trigger delivery creation logic here
  }

  return new Response("Success", { status: 200 });
}

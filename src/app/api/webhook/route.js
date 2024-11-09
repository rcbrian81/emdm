// src/app/api/webhook/route.js
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { doordashCreate } from "@/lib/doordashUtil";
const sendEmail = require("@/lib/emails");

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
    const deliveryQuote = session.metadata.deliveryQuote;
    const name = session.metadata.name;
    console.log(name);

    const foodPrice = session.amount_subtotal - deliveryQuote;
    console.log("$$$$$");
    console.log(foodPrice);

    console.log(dropoff_address);
    console.log(dropoff_phone_number);
    console.log(sessionId);
    console.log(sessionId2);

    const customerEmail = session.customer_details.email;
    console.log("Customer Email:", customerEmail);

    const uniqueIdentifier = sessionId.slice(0, 4); // First 5 characters of sessionId
    const contactName = `${name} - ${uniqueIdentifier}`;

    const deliveryDetails = JSON.stringify({
      external_delivery_id: `order_${Date.now()}`, // Generate a unique ID
      pickup_business_name: "El Mundo De Mariscos",
      pickup_reference_tag: `${name} - ${uniqueIdentifier}`,
      pickup_address: "2936 oceanside blvd,  oceanside, CA 92054, USA",
      pickup_phone_number: "7608282465",
      dropoff_address: dropoff_address,
      dropoff_phone_number: dropoff_phone_number,
      dropoff_contact_given_name: contactName,
      merchant_name: "El Mundo De Mariscos",
    });

    const delivery = await doordashCreate(deliveryDetails);
    console.log(delivery);
    const deliveryFee = delivery.data.fee;

    // Retrieve the session ID from your system

    // Here, you can update your database to mark the order as paid
    // await prisma.session.update({
    //   where: { id: sessionId },
    //   data: { isPaid: true }, // Update the payment status in your database
    // });

    console.log("Payment successful for session:", sessionId);

    const cartItems = await prisma.cartItem.findMany({
      where: { sessionId },
      include: {
        menuItem: true, // Assuming menuItem has the price field
      },
    });
    const totalPrice = parseFloat(foodPrice) / 100;
    const order = await prisma.order.create({
      data: {
        sessionId,
        name,
        totalPrice,
        status: "paid",
        cartItems: JSON.stringify(cartItems), // Store cart items as JSON
      },
    });
    console.log("Order created:", order);
    if (delivery.data.fee) {
      const email = "elmundodemariscos@gmail.com";
      const subject = `NEW ORDER: ${uniqueIdentifier} - ${name}`;

      // Generate a message with item names and quantities
      const itemDetails = cartItems
        .map((item) => `- ${item.menuItem.name} (Quantity: ${item.quantity})`)
        .join("\n");

      const message = `${name} - ${uniqueIdentifier}\nItems:\n${itemDetails}
      \nCustomer Info:\n${dropoff_address}\n${dropoff_phone_number}`;

      try {
        // Parses the request body in Next.js 14
        await sendEmail(email, subject, message);
        console.log("sucessfully sent email");
      } catch (error) {
        console.log(error);
        console.log("Error sending email");
      }
    }

    // Create the order with status 'pending' and store cart items as JSON

    await prisma.cartItem.deleteMany({
      where: { sessionId },
    });
    console.log(`charing for ${foodPrice}`);

    const paid = true;

    // TODO: Trigger delivery creation logic here
  }

  return new Response("Success", { status: 200 });
}

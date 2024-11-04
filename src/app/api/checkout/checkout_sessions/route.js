import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { doordashQuote } from "@/lib/doordashUtil";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

export async function POST(request) {
  console.log("=POST Checkout_Sessions=================");
  try {
    const cookie = request.cookies.get("session_id");
    const sessionId = cookie?.value;
    const { dropoff_address, dropoff_phone_number } = await request.json();
    console.log(dropoff_address);
    console.log(dropoff_phone_number);

    const deliveryDetails = JSON.stringify({
      external_delivery_id: `order_${Date.now()}`, // Generate a unique ID
      pickup_address: "2936 oceanside blvd,  oceanside, CA 92054, USA",
      pickup_phone_number: "7608282465",
      dropoff_address: dropoff_address,
      dropoff_phone_number: dropoff_phone_number,
    });
    const quoteObject = await doordashQuote(deliveryDetails);
    const deliveryFee = quoteObject.data.fee;
    console.log(deliveryFee);
    console.log("LlllllLLLLLLLLLLLLLLLLLLLLLLL");
    // Retrieve the session and associated cart items from the database
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        cartItems: {
          include: {
            menuItem: true, // Include menu item details to get the name and price
          },
        },
      },
    });

    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxx");

    if (!session || session.cartItems.length === 0) {
      return NextResponse.json(
        { error: "No items in the cart or session not found" },
        { status: 400 }
      );
    }

    // Calculate the total price and prepare line items for Stripe
    const lineItems = session.cartItems.map((cartItem) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: cartItem.menuItem.name,
        },
        unit_amount: cartItem.menuItem.price * 100, // Stripe expects amount in cents
      },
      quantity: cartItem.quantity,
    }));
    const deliveryLineItem = {
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: deliveryFee, // Set this to the delivery fee amount in cents (e.g., $5.00 = 500 cents)
      },
      quantity: 1,
    };

    // Add the delivery fee to the lineItems array
    lineItems.push(deliveryLineItem);
    console.log(lineItems);
    // Create the Stripe session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success`,
      cancel_url: `${request.headers.get("origin")}/cart`,
      client_reference_id: sessionId,
      metadata: {
        sessionId: sessionId, // Your own session ID
        dropoff_address: dropoff_address, // User’s address
        dropoff_phone_number: dropoff_phone_number, // User’s phone number
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

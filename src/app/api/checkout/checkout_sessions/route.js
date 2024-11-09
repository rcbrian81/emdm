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
    const { dropoff_address, dropoff_phone_number, name, tip } =
      await request.json();
    console.log(dropoff_address);
    console.log(dropoff_phone_number);
    console.log(name);

    const deliveryDetails = JSON.stringify({
      external_delivery_id: `order_${Date.now()}`, // Generate a unique ID,
      pickup_address: "2936 oceanside blvd, oceanside, CA 92054, USA",
      pickup_phone_number: "7608282465",
      dropoff_address: dropoff_address,
      dropoff_phone_number: dropoff_phone_number,
      tip: tip,
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

    // Prepare line items for Stripe
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

    // Add the delivery fee as a line item
    const deliveryLineItem = {
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: deliveryFee, // Set this to the delivery fee amount in cents
      },
      quantity: 1,
    };
    lineItems.push(deliveryLineItem);
    if (tip > 0) {
      const deliveryTipLineItem = {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Driver's Tip",
          },
          unit_amount: tip, // Set this to the delivery fee amount in cents
        },
        quantity: 1,
      };
      lineItems.push(deliveryTipLineItem);
    }

    console.log(lineItems);

    // Create the Stripe session with totalPriceWithoutDelivery in metadata
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success`,
      cancel_url: `${request.headers.get("origin")}/cart`,
      client_reference_id: sessionId,
      metadata: {
        sessionId: sessionId,
        dropoff_address: dropoff_address,
        dropoff_phone_number: dropoff_phone_number,
        deliveryQuote: deliveryFee, // Store total price without delivery
        name: name,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

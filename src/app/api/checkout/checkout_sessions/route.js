import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

export async function POST(request) {
  console.log("=POST Checkout_Sessions=================");
  try {
    const cookie = request.cookies.get("session_id");
    const sessionId = cookie?.value;
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
    console.log(lineItems);
    // Create the Stripe session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success`,
      cancel_url: `${request.headers.get("origin")}/cart`,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

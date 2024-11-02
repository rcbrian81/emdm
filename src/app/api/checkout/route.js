import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET(request) {
  console.log("=GET Checkout============");
  const sessionCookie = cookies().get("session_id");
  const sessionId = sessionCookie?.value;
  console.log(sessionCookie);
  console.log(sessionId);

  if (!sessionId) {
    return new Response(JSON.stringify({ error: "No session found" }), {
      status: 401,
    });
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    select: { cartItems: true },
  });

  if (!session || !session.cartItems) {
    return new Response(JSON.stringify({ error: "Cart is empty" }), {
      status: 404,
    });
  }

  // Fetch the complete cart items with price from menuItem table
  const cartItems = await Promise.all(
    session.cartItems.map(async (item) => {
      const menuItem = await prisma.menuItem.findUnique({
        where: { id: item.menuItemId },
        select: { price: true, name: true },
      });
      return {
        ...item,
        price: menuItem?.price || 0, // Assign a default if price is missing
        name: menuItem?.name || "Unknown Item", // Optional: include name
      };
    })
  );

  // Calculate the total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  console.log("Final cart items with price:", cartItems);
  console.log("Total price:", totalPrice);

  return new Response(JSON.stringify({ cartItems, totalPrice }), {
    status: 200,
  });
}

import prisma from "@/lib/prisma";
import { checkAuthentication } from "@/lib/session";

export async function GET(Request) {
  try {
    const sessionId = Request.cookies.get("session_id")?.value;
    if (!(await checkAuthentication(sessionId))) {
      return new Response(JSON.stringify({ error: "Unauthorized access." }), {
        status: 401,
      });
    }

    console.log("starting clean up");
    await prisma.CartItem.deleteMany({});
    console.log("deleted cart items");
    await prisma.Order.deleteMany({});
    console.log("deleted orders");
    const delteSessions = await prisma.session.deleteMany({});
    console.log(delteSessions);
    console.log("deleted sessions");

    return new Response(
      JSON.stringify({
        message: "All Sessions, CartItems, & Orders cleared/",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error completing burte clean up:", error);
    return new Response(
      JSON.stringify({ error: "Error: Failed to complete." }),
      {
        status: 500,
      }
    );
  }
}

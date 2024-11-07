import prisma from "@/lib/prisma";

export async function GET(req, res) {
  try {
    // Find expired sessions
    const expiredSessions = await prisma.session.findMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    // Delete associated data for each expired session
    for (const session of expiredSessions) {
      // Delete cart items related to the expired session
      await prisma.cartItem.deleteMany({
        where: { sessionId: session.id },
      });

      // Delete the expired session itself
      await prisma.session.delete({
        where: { id: session.id },
      });
    }

    return new Response(
      JSON.stringify({
        message: "Expired sessions and associated cart items cleaned up.",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error cleaning up sessions:", error);
    return new Response(
      JSON.stringify({ error: "Failed to clean up expired sessions." }),
      {
        status: 500,
      }
    );
  }
}

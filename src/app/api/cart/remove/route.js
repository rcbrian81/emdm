import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust the path if necessary

export async function DELETE(request) {
  try {
    const { itemId } = await request.json(); // Get the cart item ID from the request body

    // Delete the cart item from the database using the provided ID
    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    return NextResponse.json({
      message: "Item removed from cart successfully",
    });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return NextResponse.json(
      { error: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json(null, {
    headers: {
      Allow: "DELETE",
    },
  });
}

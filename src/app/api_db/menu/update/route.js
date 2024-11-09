// src/app/api/menu/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const { id, price, description } = await request.json();

  try {
    const updatedItem = await prisma.menuItem.update({
      where: { id: parseInt(id) },
      data: { price, description },
    });
    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error("Error updating menu item:", error);
    return NextResponse.json(
      { error: "Failed to update menu item" },
      { status: 500 }
    );
  }
}

import prisma from "@/lib/prisma";

export async function GET() {
  console.log("Database URL:", process.env.DATABASE_URL);
  try {
    // Fetch all menu items from the database
    const menuItems = await prisma.menuItem.findMany();
    return new Response(JSON.stringify(menuItems), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
//for a POST request we should verify authentication/autority again before completing the request.
export async function POST(req) {
  console.log("=POST Request=============");

  const body = await req.json();
  console.log(body);
  const { name, description, price, category } = body;
  const newItem = await prisma.menuItem.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      category,
    },
  });

  console.log("new item created");
  return new Response(JSON.stringify(newItem), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE(req) {
  try {
    const { ids } = await req.json(); // Parse the request body to get the list of IDs

    if (!Array.isArray(ids) || ids.length === 0) {
      return new Response("No items selected for deletion", { status: 400 });
    }

    // Delete the menu items from the database
    await prisma.menuItem.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    console.log("Items deleted successfully");
    return new Response("Items deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting menu items:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

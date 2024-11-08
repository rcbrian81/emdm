const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Seed MenuItem data with categories
  await prisma.menuItem.createMany({
    data: [
      {
        name: "Carne Asada Taco",
        description: "Delicious beef tacos",
        price: 8,
        category: "Taco",
      },
      {
        name: "Adobada Taco",
        description: "Delicious beef tacos",
        price: 4,
        category: "Taco",
      },
      {
        name: "Carnitas Taco",
        description: "Delicious beef tacos",
        price: 4,
        category: "Taco",
      },
      {
        name: "Breakfeast Burrito",
        description: "Hearty chicken burrito",
        price: 12,
        category: "Burrito",
      },
      {
        name: "California Burrito",
        description: "Hearty chicken burrito",
        price: 12,
        category: "Burrito",
      },
      {
        name: "Carne Asada Burrito",
        description: "Hearty chicken burrito",
        price: 12,
        category: "Burrito",
      },
      {
        name: "Carne Asada Quesadilla",
        description: "Cheesy quesadilla with guacamole",
        price: 10,
        category: "Quesadilla",
      },
      {
        name: "Chicken Quesadilla",
        description: "Cheesy quesadilla with guacamole",
        price: 10,
        category: "Quesadilla",
      },
      {
        name: "Shrimp Quesadilla",
        description: "Cheesy quesadilla with guacamole",
        price: 10,
        category: "Quesadilla",
      },
    ],
  });

  // Seed Admin data with a hashed password
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.admin.create({
    data: {
      username: "admin",
      password: hashedPassword,
    },
  });
}

main()
  .then(() => {
    console.log("Seeding completed.");
  })
  .catch((e) => {
    console.error("Seeding error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

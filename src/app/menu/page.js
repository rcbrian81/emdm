"use client";
import NavBar from "../components/NavBar";
import CategorySection from "../components/CategorySection";
import ActionBar from "../components/ActionBar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
/*
export const metadata = {
  title: "El Mundo De Mariscos Mexican Food Menu in Oceanside ",
  description:
    "Discover the best Mexican food in Oceanside, CA, at El Mundo de Mariscos...",
  author: "El Mundo de Mariscos",
  canonical: "https://mundodemariscos.com/menu",
  openGraph: {
    title: "El Mundo De Mariscos - Best Mexican Food in Oceanside",
    description:
      "Discover the best micheladas in Oceanside, CA, at El Mundo de Mariscos.",
    image: "",
    url: "https://mundodemariscos.com/menu",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "El Mundo De Mariscos - Best Mexican Food in Oceanside",
    description:
      "Discover the Mexican Food in Oceanside, CA, at El Mundo de Mariscos.",
    image: "",
  },
};
*/
export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState({});
  const [cart, setCart] = useState([]); // Cart state

  useEffect(() => {
    console.log("starting effect");
    const startSession = async () => {
      try {
        console.log("Attempting to start Session");
        await fetch("/api/session", { method: "POST" }); // Adjust the API endpoint as needed
      } catch (error) {
        console.error("Failed to start session:", error);
      }
    };

    startSession();

    const fetchMenuItems = async () => {
      try {
        const response = await fetch("/api_db/menu");
        if (response.ok) {
          const data = await response.json();
          // Group items by category
          const groupedItems = data.reduce((acc, item) => {
            if (!acc[item.category]) acc[item.category] = [];
            acc[item.category].push(item);
            return acc;
          }, {});
          setCategories(groupedItems);
        } else {
          console.error("Failed to fetch menu items");
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenuItems();
  }, []);

  const addToCart = async (foodID, quantity) => {
    // Update local cart state
    setCart((prevCart) => [...prevCart, { foodID, quantity }]);

    // Make an API request to update the cart in the session
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ foodID, quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      console.log("Added to cart:", { foodID, quantity });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Distribute categories evenly across two columns
  const categoryKeys = Object.keys(categories);
  const half = Math.ceil(categoryKeys.length / 2);
  const column1 = categoryKeys.slice(0, half);
  const column2 = categoryKeys.slice(half);

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{
        backgroundImage: "url('images/background8.webp')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <NavBar colors="bg-white text-black" />
      <div className="container text-black mx-auto px-4 py-8 bg-white shadow-xl rounded-lg border border-gray-200 mt-12">
        <h1 className="text-5xl font-bold text-center mb-8">Our Menu</h1>
        <a
          href="/cart"
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Go to Cart
        </a>

        {/* Grid for two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-12">
            {column1.map((category) => (
              <CategorySection
                key={category}
                title={category}
                items={categories[category]}
                onAddToCart={addToCart}
              />
            ))}
          </div>
          {/* Right Column */}
          <div className="space-y-12">
            {column2.map((category) => (
              <CategorySection
                key={category}
                title={category}
                items={categories[category]}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </div>
      <ActionBar />
      <Footer />
    </div>
  );
}

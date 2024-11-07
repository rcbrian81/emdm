"use client";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import CategorySection from "../components/CategorySection";
import ActionBar from "../components/ActionBar";
import Footer from "../components/Footer";

export default function Menu() {
  // Sample data for each category
  //for git
  const cockteles = [
    {
      name: "Campechana",
      price: "",
      description: "",
    },
    {
      name: "Cocktel de Mariscos",
      price: "",
      description: "",
    },
    {
      name: "Cocktel Camaron",
      price: "",
      description: "",
    },
    {
      name: "Cocktel Mixto",
      price: "",
      description: "",
    },
  ];

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
          setLoading(false); // Set loading to false after items are fetched
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
    setCart((prevCart) => [...prevCart, { foodID, quantity }]);

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

      {/* Floating Go to Cart Button */}
      <a
        href="/cart"
        className="fixed top-8 right-8 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
      >
        Go to Cart
      </a>

      <div className=" container text-black mx-auto px-4 py-8 bg-white shadow-xl rounded-lg border border-gray-200 mt-12 ">
        <h1 className="text-5xl font-bold text-center mb-8">Our Menu</h1>

        {/* Show loading message if items are still loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-1/2 text-center border border-black">
            <svg
              className="animate-spin h-12 w-12 text-blue-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4.709z"
              ></path>
            </svg>
            <p className="text-2xl font-semibold text-gray-700 animate-pulse">
              Loading menu...
            </p>
          </div>
        ) : (
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
        )}
      </div>

      <ActionBar />
      <Footer />
    </div>
  );
}

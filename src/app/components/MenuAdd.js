"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted with:", { name, description, price, category });

    try {
      const response = await fetch("/api_db/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price, category }),
      });
      if (response.ok) {
        const result = await response.json();
        setResponseMessage(result.message || "Item added successfully!");
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
      } else {
        setResponseMessage("Form submission failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseMessage("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-black">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg lg:max-w-2xl mx-4 lg:mx-0 lg:p-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Add New Item
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
        {responseMessage && (
          <p
            className={`mt-6 text-center font-medium ${
              responseMessage === "Item added successfully!"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
}

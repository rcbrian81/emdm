"use client";

import { useEffect, useState } from "react";
export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log("Form submitted with:", { name, description, price });

    try {
      const response = await fetch("/api_db/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          category,
        }), // Send form data as JSON
      });
      if (response.ok) {
        const result = await response.json();
        setResponseMessage(result.message);
        setName(""); // Reset the name field
        setDescription(""); // Reset the email field
        setPrice("");
      } else {
        setResponseMessage("Form submission failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseMessage("An error occurred while submitting the form.");
    }

    setName(""); // Reset the name field
    setDescription(""); // Reset the email field
    setPrice("");
  };
  return (
    <div className="bg-black">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="text-black"
            />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="text-black"
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="text-black"
            />
          </label>
        </div>
        <div>
          <label>
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="text-black"
            />
          </label>
        </div>

        <button className="bg-blue-400" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

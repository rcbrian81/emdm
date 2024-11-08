import { useState } from "react";

export default function MenuItem({
  name,
  price,
  description,
  imageUrl,
  onAddToCart,
  foodID,
}) {
  // Quantity state
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false); // New state to track feedback

  // Handle increment and decrement of quantity
  const handleIncrement = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const handleDecrement = () =>
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));

  // Handle direct input change for quantity
  const handleQuantityInputChange = (event) => {
    const value = Math.max(1, parseInt(event.target.value) || 1); // Ensure at least 1
    setQuantity(value);
  };

  // Handle add to cart with feedback
  const handleAddToCart = () => {
    onAddToCart(foodID, quantity); // Call the add to cart function

    // Provide feedback
    setAdded(true);
    setTimeout(() => setAdded(false), 1500); // Reset feedback after 1.5 seconds
  };

  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 flex flex-col md:flex-row items-start md:items-center">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="w-32 h-32 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
        />
      )}
      <div className="flex-1">
        <h3 className="text-2xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <span className="text-xl font-bold">{price}</span>

        {/* Quantity input with plus and minus buttons */}
        <div className="flex items-center mt-4">
          <label className="mr-2">Quantity:</label>
          <button
            onClick={handleDecrement}
            className="px-2 py-1 bg-gray-200 rounded"
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityInputChange}
            className="mx-2 w-16 text-center border rounded"
            min="1"
          />
          <button
            onClick={handleIncrement}
            className="px-2 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>

        {/* Add to Cart button with feedback */}
        <button
          onClick={handleAddToCart}
          className={`mt-4 px-4 py-2 rounded ${
            added ? "bg-green-500" : "bg-blue-500"
          } text-white transition duration-300 ease-in-out`}
          disabled={added} // Disable button briefly when showing feedback
        >
          {added ? "Added!" : "Add to Cart"}
        </button>

        <p>Food Item ID: {foodID}</p>
      </div>
    </div>
  );
}

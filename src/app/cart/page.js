"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    try {
      const response = await fetch("/api/checkout");
      if (!response.ok) throw new Error("Failed to load cart");

      const data = await response.json();
      setCartItems(data.cartItems);
      setTotalPrice(data.totalPrice);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleQuantityChange(itemId, delta) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + delta } : item
      )
    );
  }

  async function handleRemove(itemId) {
    try {
      const response = await fetch("/api/cart/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
      if (!response.ok) throw new Error("Failed to remove item");

      // Remove the item from the local state after successful deletion
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSaveUpdates() {
    try {
      const response = await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),
      });
      if (!response.ok) throw new Error("Failed to save updates");

      // Re-fetch cart after saving updates, if needed
      fetchCart();
    } catch (err) {
      setError(err.message);
    }
  }

  function calculateTotalPrice(items) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  const handleCheckout = async () => {
    //setLoading(true);
    console.log("Checking Out Clicked");

    try {
      const response = await fetch("/api/checkout/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { url } = await response.json();

      window.location.href = url; // Redirect to Stripe Checkout page
    } catch (error) {
      console.error("Error redirecting to checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  // async function handleCheckout() {
  //   //await handleSaveUpdates();

  //   try {
  //     const response = await fetch("/api/cart/pay", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ cartItems }),
  //     });
  //     if (!response.ok) throw new Error("Failed to Pay");

  //     //fetchCart(); // Re-fetch cart if you want to reset it
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // }

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(cartItems));
  }, [cartItems]);

  if (loading) return <p className="text-center mt-4">Loading your cart...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-4">Error: {error}</p>;

  return (
    <div className="checkout-page max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg text-black">
      <h1 className="text-2xl font-semibold text-center mb-6">Your Cart</h1>
      <div className="cart-items space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div
              key={index}
              className="cart-item flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div>
                <p className="text-lg font-medium">{item.name}</p>
                <p className="text-gray-500">
                  Price per unit: ${item.price.toFixed(2)}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">
                  Item Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  className="text-red-500 mt-2 hover:underline"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>

      {/* Save Updates Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleSaveUpdates}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save Updates
        </button>
      </div>

      {/* Total and Pay Button */}
      <div className="total mt-8 p-4 bg-gray-100 rounded-lg text-center">
        <h2 className="text-xl font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </h2>
        <button
          onClick={handleCheckout}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go To Checkout
        </button>
      </div>
    </div>
  );
}

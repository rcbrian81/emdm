"use client";

import { useEffect, useState } from "react";
import DeliveryForm from "../components/DeliveryForm.js";
import CartManager from "../components/CartManager";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryQuote, setDeliveryQuote] = useState(null);
  const [loading, setLoading] = useState(true); // Initial loading for cart
  const [checkoutLoading, setCheckoutLoading] = useState(false); // Loading for checkout redirect
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState(""); // New state for customer name

  const [pickupAddress, setPickupAddress] = useState("");
  const [pickupPhone, setPickupPhone] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [dropoffPhone, setDropoffPhone] = useState("");
  const [deliveryDetailsSubmitted, setDeliveryDetailsSubmitted] =
    useState(false);

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

  async function fetchDeliveryQuote() {
    setQuoteLoading(true);
    try {
      const response = await fetch("/api/delivery_quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          external_delivery_id: `order_${Date.now()}`,
          pickup_address: "2936 oceanside blvd,  oceanside, CA 92054, USA",
          pickup_phone_number: "7608282465",
          dropoff_address: dropoffAddress,
          dropoff_phone_number: dropoffPhone,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch delivery quote");

      const data = await response.json();
      const deliveryFee = data.data.fee / 100;
      setDeliveryQuote(deliveryFee);
      setTotalPrice((prevTotal) => prevTotal + deliveryFee);
      setDeliveryDetailsSubmitted(true);
    } catch (err) {
      alert("Error in getting quote. Please try again.");
    } finally {
      setQuoteLoading(false);
    }
  }

  function handleDeliveryDetailsSubmit(e) {
    e.preventDefault();
    fetchDeliveryQuote();
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

      fetchCart();
    } catch (err) {
      setError(err.message);
    }
  }

  function calculateTotalPrice(items) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  const handleCheckout = async () => {
    setCheckoutLoading(true); // Set loading state for checkout
    try {
      const response = await fetch("/api/checkout/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name, // Include the name in the checkout session
          dropoff_address: dropoffAddress,
          dropoff_phone_number: dropoffPhone,
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error redirecting to checkout:", error);
      setError("Failed to redirect to checkout. Please try again.");
    } finally {
      setCheckoutLoading(false); // Clear loading state after redirect or error
    }
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(cartItems));
  }, [cartItems]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin mb-4"></div>
          <p className="text-2xl font-semibold">Loading your cart...</p>
        </div>
      </div>
    );

  if (error)
    return <p className="text-center text-red-500 mt-4">Error: {error}</p>;

  return (
    <div className="checkout-page max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg text-black">
      <h1 className="text-2xl font-semibold text-center mb-6">Your Cart</h1>

      <CartManager
        cartItems={cartItems}
        handleQuantityChange={handleQuantityChange}
        handleRemove={handleRemove}
        handleSaveUpdates={handleSaveUpdates}
      />

      {!deliveryDetailsSubmitted && (
        <DeliveryForm
          dropoffAddress={dropoffAddress}
          dropoffPhone={dropoffPhone}
          setDropoffAddress={setDropoffAddress}
          setDropoffPhone={setDropoffPhone}
          handleDeliveryDetailsSubmit={handleDeliveryDetailsSubmit}
        />
      )}
      <label>Name for order:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mt-2 border rounded"
        required
      />
      <div className="total mt-8 p-4 bg-gray-100 rounded-lg text-center">
        {quoteLoading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
            <p className="text-lg font-semibold text-gray-700">
              Calculating Delivery Fee...
            </p>
          </div>
        ) : (
          deliveryQuote && (
            <p className="text-lg text-gray-600">
              Estimated Delivery Fee: ${deliveryQuote.toFixed(2)}
            </p>
          )
        )}

        <h2 className="text-xl font-semibold">
          Total:{" "}
          {quoteLoading ? (
            <div className="flex justify-center items-center space-x-2">
              <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
              <p className="text-lg font-semibold text-gray-700">
                Calculating...
              </p>
            </div>
          ) : (
            `$${totalPrice.toFixed(2)}`
          )}
        </h2>

        {!deliveryDetailsSubmitted && (
          <div>
            <p className="font-bold">+ delivery</p>
            <p>
              Please submit Delivery Info & view delivery quote before
              continuing to checkout.
            </p>
          </div>
        )}

        <button
          onClick={handleCheckout}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-500 w-full"
          disabled={!deliveryQuote || checkoutLoading || !name} // Disable if name is empty
        >
          {checkoutLoading ? "Redirecting..." : "Go To Checkout"}
        </button>
      </div>

      {checkoutLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin mb-4"></div>
            <p className="text-2xl font-semibold text-white">
              Loading Payment Page...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

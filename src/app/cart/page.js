"use client";

import { useEffect, useState } from "react";
import DeliveryForm from "../components/DeliveryForm.js";
//NEED: Address that is sent to server is the one that was used for the quote not the current text in the input!
//TLDR: Address can't change from the one that was used for Quote.
export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryQuote, setDeliveryQuote] = useState(null); // New state for delivery quote
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New state variables for delivery information
  const [pickupAddress, setPickupAddress] = useState("");
  const [pickupPhone, setPickupPhone] = useState("");

  const [dropoffAddress, setDropoffAddress] = useState("");
  const [dropoffPhone, setDropoffPhone] = useState("");
  const [deliveryDetailsSubmitted, setDeliveryDetailsSubmitted] =
    useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  // Fetches cart details on page load
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

  // Fetches delivery quote based on inputted delivery details
  // Fetches delivery quote based on inputted delivery details
  async function fetchDeliveryQuote() {
    //handleSaveUpdates();
    try {
      const response = await fetch("/api/delivery_quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          external_delivery_id: `order_${Date.now()}`, // Generate a unique ID
          pickup_address: "2936 oceanside blvd,  oceanside, CA 92054, USA",
          pickup_phone_number: "7608282465",
          dropoff_address: dropoffAddress,
          dropoff_phone_number: dropoffPhone,
          items: cartItems, // Pass cart items for context if needed
        }),
      });

      console.log(response);
      if (!response.ok) throw new Error("Failed to fetch delivery quote");
      const data = await response.json(); // Parse JSON response only once
      // Example of accessing a field in the response
      const deliveryFee = data.data.fee / 100;
      console.log(deliveryFee);
      //setDeliveryQuote(data.data.fee);
      // Set the delivery quote data in the state
      setDeliveryQuote(deliveryFee); // Assuming `estimated_fee` is the field for delivery cost
      setTotalPrice((prevTotal) => prevTotal + deliveryFee);
    } catch (err) {
      setError(err.message);
    }
  }

  // Handles form submission for delivery details
  function handleDeliveryDetailsSubmit(e) {
    e.preventDefault();
    setDeliveryDetailsSubmitted(true);

    fetchDeliveryQuote(); // Fetch quote only after form submission
    console.log(deliveryDetailsSubmitted);
  }

  // Handles quantity change for an item in the cart
  function handleQuantityChange(itemId, delta) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + delta } : item
      )
    );
  }

  // Removes an item from the cart
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

  // Saves updates to the cart items on the server
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

  // Calculates the total price based on items and their quantities
  function calculateTotalPrice(items) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Redirects to checkout page
  const handleCheckout = async () => {
    console.log("Checking Out Clicked");

    try {
      const response = await fetch("/api/checkout/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dropoff_address: dropoffAddress,
          dropoff_phone_number: dropoffPhone,
        }),
      });

      const { url } = await response.json();

      window.location.href = url; // Redirect to Stripe Checkout page
    } catch (error) {
      console.error("Error redirecting to checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  // Updates total price whenever cart items change
  useEffect(() => {
    setTotalPrice(calculateTotalPrice(cartItems));
  }, [cartItems]);

  if (loading)
    return (
      <p className="text-center mt-4 text-bold text-2xl">
        Loading your cart...
      </p>
    );
  if (error)
    return <p className="text-center text-red-500 mt-4">Error: {error}</p>;

  return (
    <div className="checkout-page max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg text-black">
      <h1 className="text-2xl font-semibold text-center mb-6">Your Cart</h1>

      {/* Display cart items and total */}
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

      {!deliveryDetailsSubmitted && (
        // HTML B: Rendered if deliveryDetailsSubmitted is true
        <form
          onSubmit={handleDeliveryDetailsSubmit}
          className="space-y-4 mb-6 mt-6"
        >
          <h2 className="text-center text-bold text-2xl">
            Delivery Information
          </h2>
          <div>
            <label className="block text-gray-700">Dropoff Address</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={dropoffAddress}
              onChange={(e) => setDropoffAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Dropoff Phone Number</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border rounded"
              value={dropoffPhone}
              onChange={(e) => setDropoffPhone(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Get Delivery Quote
          </button>
        </form>
      )}
      {/* Total, Delivery Fee, and Pay Button */}
      <div className="total mt-8 p-4 bg-gray-100 rounded-lg text-center">
        {deliveryQuote && (
          <p className="text-lg text-gray-600">
            Estimated Delivery Fee: ${deliveryQuote.toFixed(2)}
          </p>
        )}
        <h2 className="text-xl font-semibold">
          Total: ${totalPrice.toFixed(2)}
          {!deliveryDetailsSubmitted && <p>+ Devlivery</p>}
          {!deliveryDetailsSubmitted && <p>+ taxes</p>}
          {!deliveryDetailsSubmitted && (
            <p>
              Please submit Delivery Info & view delivery quote before
              continuing to checkout.
            </p>
          )}
        </h2>

        <button
          onClick={handleCheckout}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={!deliveryQuote} // Disable until quote is available
        >
          Go To Checkout
        </button>
      </div>
    </div>
  );
}

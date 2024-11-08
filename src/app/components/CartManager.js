// CartManager.js

import { useState } from "react";
import CartItem from "./CartItem"; // Adjust the path as necessary

export default function CartManager({
  cartItems,
  handleQuantityChange,
  handleRemove,
  handleSaveUpdates,
}) {
  const [hasChanges, setHasChanges] = useState(false);

  return (
    <div className="cart-items space-y-4">
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <CartItem
            key={index}
            item={item}
            handleQuantityChange={(id, amount) => {
              handleQuantityChange(id, amount);
              setHasChanges(true); // Mark as changed on quantity change
            }}
            handleRemove={(id) => {
              handleRemove(id);
              setHasChanges(true); // Mark as changed on remove
            }}
            setHasChanges={setHasChanges}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
      {/* Save Updates Button */}
      {hasChanges && (
        <div className="text-center mt-6">
          <p className="text-center text-sm text-gray-600">
            For help or to customize: Call us at{" "}
            <a href="tel:+17602317355" className="text-blue-500 underline">
              (760) 231-7355
            </a>
            .
          </p>
          <button
            onClick={() => {
              handleSaveUpdates();
              setHasChanges(false); // Reset after saving
            }}
            className="px-4 py-2 mt-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save Updates
          </button>
        </div>
      )}
    </div>
  );
}

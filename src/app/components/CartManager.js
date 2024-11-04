// CartManager.js

import CartItem from "./CartItem"; // Adjust the path as necessary

export default function CartManager({
  cartItems,
  handleQuantityChange,
  handleRemove,
  handleSaveUpdates,
}) {
  return (
    <div className="cart-items space-y-4">
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <CartItem
            key={index}
            item={item}
            handleQuantityChange={handleQuantityChange}
            handleRemove={handleRemove}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
      {/* Save Updates Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleSaveUpdates}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save Updates
        </button>
      </div>
    </div>
  );
}

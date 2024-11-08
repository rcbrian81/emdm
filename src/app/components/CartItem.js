// CartItem.js

export default function CartItem({ item, handleQuantityChange, handleRemove }) {
  return (
    <div className="cart-item flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
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
  );
}

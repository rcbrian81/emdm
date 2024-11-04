export function CartSummary({ totalPrice, deliveryQuote, onCheckout }) {
  return (
    <div className="total mt-8 p-4 bg-gray-100 rounded-lg text-center">
      <h2 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h2>
      {deliveryQuote && (
        <p className="text-lg text-gray-600">
          Estimated Delivery Fee: ${deliveryQuote.toFixed(2)}
        </p>
      )}
      <button
        onClick={onCheckout}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={!deliveryQuote}
      >
        Go To Checkout
      </button>
    </div>
  );
}

// DeliveryForm.js

export default function DeliveryForm({
  dropoffAddress,
  dropoffPhone,
  setDropoffAddress,
  setDropoffPhone,
  handleDeliveryDetailsSubmit,
}) {
  return (
    <form
      onSubmit={handleDeliveryDetailsSubmit}
      className="space-y-4 mb-6 mt-6"
    >
      <h2 className="text-center text-bold text-2xl">Delivery Information</h2>
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
  );
}

// DeliveryForm.js

import { useState } from "react";

export default function DeliveryForm({
  dropoffAddress,
  dropoffPhone,
  setDropoffAddress,
  setDropoffPhone,
  handleDeliveryDetailsSubmit,
}) {
  const [formattedPhone, setFormattedPhone] = useState("");

  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    let formatted = "";

    if (input.length > 0) formatted += "(";
    if (input.length > 3) formatted += input.slice(0, 3) + ") ";
    else formatted += input.slice(0, 3);
    if (input.length > 6) formatted += input.slice(3, 6) + "-";
    else formatted += input.slice(3, 6);
    formatted += input.slice(6, 10);

    setFormattedPhone(formatted);
    setDropoffPhone(input); // Only store numeric values
  };

  return (
    <form
      onSubmit={handleDeliveryDetailsSubmit}
      className="space-y-4 mb-6 mt-6"
    >
      <h2 className="text-center text-bold text-2xl">Delivery Information</h2>

      <div>
        <label className="block text-gray-700">Dropoff Address</label>
        <p className="text-sm text-gray-500 mb-1">
          Street Address, City, State, ZIP Code.
        </p>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded"
          value={dropoffAddress}
          onChange={(e) => setDropoffAddress(e.target.value)}
          //placeholder="Street Address, City, State, ZIP Code"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Dropoff Phone Number</label>
        <input
          type="tel"
          className="w-full px-3 py-2 border rounded"
          value={formattedPhone}
          onChange={handlePhoneChange}
          //placeholder="(555) 555-5555"
          maxLength="14"
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

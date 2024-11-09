"use client";
// src/app/dashboard.js
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [paidOrders, setPaidOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmedOrders, setConfirmedOrders] = useState({});
  const [dataDisplay, setDataDisplay] = useState(null);
  const [pollingMins, setPollingMins] = useState(2);

  useEffect(() => {
    console.log("Dashboard useEffect running");
    async function fetchPaidOrders() {
      try {
        const response = await fetch("/api_db/admin/dashboard");
        if (!response.ok) {
          throw new Error("Failed to fetch paid orders");
        }
        const data = await response.json();
        setPaidOrders(data);
        console.log(data);
        setDataDisplay(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPaidOrders();
    const interval = setInterval(fetchPaidOrders, pollingMins * 60000); // 120000 ms = 2 minutes

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleUpdate = async (order) => {
    // Update the confirmed orders in state
    setConfirmedOrders((prevState) => ({
      ...prevState,
      [order.id]: true,
    }));

    try {
      const response = await fetch("/api_db/admin/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: order.id, // Make sure `orderId` is defined
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Parse the JSON response
      const updatedStatus = await response.json();
      console.log("Order status updated:", updatedStatus);
      setPaidOrders((prevOrders) =>
        prevOrders.map((o) => {
          // If this is the order we updated, change its status to the new status
          if (o.id === order.id) {
            return { ...o, status: updatedStatus }; // New object with updated status
          }
          // If it's not the correct order, keep it as is
          return o;
        })
      );

      // Optionally, update any state based on the response, e.g., to reflect the status update
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }
  function handleDelete(order) {
    console.log(order.id);
    handleUpdate(order);
    setPaidOrders(
      (prevOrders) => prevOrders.filter((o) => o.id !== order.id) // Keep orders that don’t match the deleted order
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Kitchen Dashboard
        </h1>
        {paidOrders.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="w-1/6 px-4 py-2 border-b bg-gray-50 font-medium text-gray-600">
                  Date-Time
                </th>
                <th className="w-1/6 px-4 py-2 border-b bg-gray-50 font-medium text-gray-600">
                  Session ID
                </th>
                <th className="w-1/6 px-4 py-2 border-b bg-gray-50 font-medium text-gray-600">
                  Order Name
                </th>
                <th className="w-1/6 px-4 py-2 border-b bg-gray-50 font-medium text-gray-600">
                  Total Price
                </th>
                <th className="w-3/6 px-4 py-2 border-b bg-gray-50 font-medium text-gray-600">
                  Items
                </th>
                <th className="w-1/6 px-4 py-2 border-b bg-gray-50 font-medium text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paidOrders.map((order, idx) => (
                <tr
                  key={order.id}
                  className={`${
                    order.status == "prepping"
                      ? "bg-white"
                      : "bg-red-500 animate-pulse border-8 border-yellow-200"
                  }`}
                >
                  <td className="px-4 py-3 border-b text-gray-700">
                    {/* Convert and display createdAt in local time */}
                    {new Date(order.createdAt).toLocaleString("en-US", {
                      timeZone: "America/Los_Angeles", // Set to your desired time zone
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-700">
                    {order.sessionId}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-700">
                    {order.name}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-700">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-700">
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="flex-1 font-medium text-gray-800">
                            {item.name}
                          </span>
                          <span className="text-sm font-semibold text-white bg-blue-500 rounded-full px-3 py-1 w-20 text-center">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 border-b text-gray-700">
                    {order.status == "paid" ? (
                      <button
                        onClick={() => handleUpdate(order)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      >
                        Confirm
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this order?"
                            )
                          ) {
                            handleDelete(order);
                          }
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600">No paid orders available</p>
        )}
        <a
          href="/admin/dashboard/all"
          className="px-6 py-2 text-white bg-blue-700 hover:bg-blue-400 rounded-lg transition duration-200 shadow-md"
        >
          All History
        </a>
      </div>
    </div>
  );
}

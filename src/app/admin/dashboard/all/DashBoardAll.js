"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardAll() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Dashboard useEffect running");
    async function fetchOrders() {
      try {
        const response = await fetch("/api_db/admin/dashboard/all");
        if (!response.ok) {
          throw new Error("Failed to fetch all orders");
        }
        const data = await response.json();
        setOrders(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-black p-6">
      {/* Reminder Banner */}
      <div className="mb-4 p-4 bg-yellow-200 text-center rounded-lg text-gray-800">
        <p className="mb-2 font-semibold">
          This page shows all historical orders and is not the live dashboard.{" "}
        </p>
        <Link
          href="/admin/dashboard"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Go to the Real Dashboard for Live Updates
        </Link>
      </div>

      {/* Order Table */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          ALL ORDERS
        </h1>
        <a
          href="/admin/dashboard"
          className="px-6 py-2 text-white bg-blue-700 hover:bg-blue-400 rounded-lg transition duration-200 shadow-md"
        >
          RETURN to Kitchen Dashboard
        </a>
        {orders.length > 0 ? (
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
              {orders.map((order, idx) => (
                <tr key={order.id} className="bg-white">
                  <td className="px-4 py-3 border-b text-gray-700">
                    {new Date(order.createdAt).toLocaleString("en-US", {
                      timeZone: "America/Los_Angeles",
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
                  <td className="px-4 py-3 border-b text-gray-700"></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600">No orders available</p>
        )}
        <a
          href="/admin/dashboard"
          className="px-6 py-2 text-white bg-blue-700 hover:bg-blue-400 rounded-lg transition duration-200 shadow-md"
        >
          RETURN to Kitchen Dashboard
        </a>
      </div>
    </div>
  );
}

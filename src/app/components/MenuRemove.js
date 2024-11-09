"use client";
import { useEffect, useState } from "react";

export default function MenuRemove() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editedPrice, setEditedPrice] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api_db/menu");
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data);
      } else {
        console.error("Failed to fetch menu items");
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSelectedItems = async () => {
    try {
      const response = await fetch("/api_db/menu", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedItemIds }),
      });
      if (response.ok) {
        fetchMenuItems();
        setSelectedItemIds([]);
      } else {
        console.error("Failed to delete selected items");
      }
    } catch (error) {
      console.error("Error deleting selected items:", error);
    }
  };

  const updateMenuItem = async (id) => {
    try {
      const response = await fetch(`/api_db/menu/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          price: parseFloat(editedPrice),
          description: editedDescription,
        }),
      });
      if (response.ok) {
        fetchMenuItems();
        setEditItemId(null);
      } else {
        console.error("Failed to update menu item");
      }
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const toggleSelection = (id) => {
    setSelectedItemIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Menu Items</h1>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={fetchMenuItems}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
        >
          Refresh
        </button>
        <button
          onClick={deleteSelectedItems}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
          disabled={selectedItemIds.length === 0}
        >
          Delete Selected
        </button>
      </div>
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        Object.keys(groupedItems).map((category) => (
          <div key={category} className="w-full max-w-3xl mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
              {category}
            </h2>
            <ul className="space-y-4">
              {groupedItems[category].map((item) => (
                <li
                  key={item.id}
                  className={`flex items-center justify-between p-4 border rounded-lg shadow-sm transition duration-200 ${
                    selectedItemIds.includes(item.id)
                      ? "bg-yellow-100 border-yellow-300"
                      : "bg-white border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedItemIds.includes(item.id)}
                      onChange={() => toggleSelection(item.id)}
                      className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {item.name}
                      </h3>
                      {editItemId === item.id ? (
                        <div className="flex items-center space-x-4 mt-2">
                          <input
                            type="number"
                            value={editedPrice}
                            onChange={(e) => setEditedPrice(e.target.value)}
                            placeholder="Price"
                            className="border border-gray-300 rounded px-3 py-1 w-24 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            value={editedDescription}
                            onChange={(e) =>
                              setEditedDescription(e.target.value)
                            }
                            placeholder="Description"
                            className="border border-gray-300 rounded px-3 py-1 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => updateMenuItem(item.id)}
                            className="bg-green-500 text-white px-4 py-1 rounded-lg shadow-md transition duration-200 hover:bg-green-600"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => setEditItemId(null)}
                            className="text-red-500 px-2 py-1"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-4 mt-2">
                          <p className="text-gray-600">
                            Price: ${item.price.toFixed(2)}
                          </p>
                          <p className="text-gray-600">
                            Description: {item.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {editItemId !== item.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditItemId(item.id);
                        setEditedPrice(item.price);
                        setEditedDescription(item.description);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md transition duration-200 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

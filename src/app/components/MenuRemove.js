"use client";
import { useEffect, useState } from "react";

export default function MenuRemove() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItemIds, setSelectedItemIds] = useState([]);

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
  //vefiry authentication and authority before delete.
  const deleteSelectedItems = async () => {
    try {
      const response = await fetch("/api_db/menu", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedItemIds }), // Send the selected IDs
      });

      if (response.ok) {
        // Refresh the menu items after deletion
        fetchMenuItems();
        // Clear the selected items
        setSelectedItemIds([]);
      } else {
        console.error("Failed to delete selected items");
      }
    } catch (error) {
      console.error("Error deleting selected items:", error);
    }
  };

  // Fetch menu items when the component is mounted
  useEffect(() => {
    fetchMenuItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const toggleSelection = (id) => {
    setSelectedItemIds(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((itemId) => itemId !== id) // Deselect if already selected
          : [...prevSelected, id] // Select if not already selected
    );
  };

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  if (loading) {
    return <div>Loading...</div>;
  }

  const selevtedEventHandler = () => {
    setSelected();
  };
  return (
    <div>
      <h1>Menu Items</h1>
      <button
        onClick={fetchMenuItems}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Refresh
      </button>
      <button
        onClick={deleteSelectedItems}
        className="bg-red-500 text-white px-4 py-2 rounded ml-2"
        disabled={selectedItemIds.length === 0} // Disable if no items are selected
      >
        Delete Selected
      </button>
      {Object.keys(groupedItems).map((category) => (
        <div key={category}>
          <h2 className="text-xl font-bold mt-4">{category}</h2>
          <ul>
            {groupedItems[category].map((item) => (
              <li
                key={item.id}
                onClick={() => toggleSelection(item.id)} // Toggle selection
                className={`flex felx-row p-4 my-2 border rounded cursor-pointer ${
                  selectedItemIds.includes(item.id)
                    ? "bg-yellow-200 text-black"
                    : ""
                }`} // Highlight if selected
              >
                <input
                  type="checkbox"
                  checked={selectedItemIds.includes(item.id)}
                  onChange={() => toggleSelection(item.id)}
                  className="mr-2"
                />
                <h3>
                  {item.name} (ID: {item.id})
                </h3>
                <p className="pl-5">Price: ${item.price.toFixed(2)}</p>
                <p className="pl-5">Description: ${item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

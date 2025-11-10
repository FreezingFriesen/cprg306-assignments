"use client";
import { useState } from "react";
import Item from "./item";

// ItemList component to display and sort a list of items
export default function ItemList({ items = [], onItemSelect = () => {} }) {
  const [sortBy, setSortBy] = useState("name");

  // make a copy before sorting to avoid mutating the prop
  const sortedItems = [...items].sort((a, b) => {
    
    if (sortBy === "name") {
      return (a.name || "").localeCompare(b.name || "");
    } else if (sortBy === "category") {
      return (a.category || "").localeCompare(b.category || "");
    }
    return 0;
  });

  // Render the sorted item list with sorting controls
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 rounded ${
            sortBy === "name"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 hover:bg-gray-400 text-black"
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`px-4 py-2 rounded ${
            sortBy === "category"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 hover:bg-gray-400 text-black"
          }`}
        >
          Sort by Category
        </button>
      </div>

      <ul className="flex flex-col items-center">
        {sortedItems.map((item) => (
          <Item
            key={item.id ?? item.name ?? Math.random().toString(36).slice(2, 9)}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
            onSelect={() => onItemSelect(item)}
          />
        ))}
      </ul>
    </div>
  );
}

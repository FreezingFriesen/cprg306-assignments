"use client";
import Item from "./item";
import { useState } from "react";
import itemsData from "./items.json";

// ItemList component to display and sort items
export default function ItemList() {
  const [items, setItems] = useState(itemsData);
  const [sortBy, setSortBy] = useState("name");


  // Create a sorted copy of the items array
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

    // Render the sorted items
    return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 rounded ${ sortBy === "name" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-black"}`}>
          Sort by Name
        </button>
        <button 
          onClick={() => setSortBy("category")} 
          className={`px-4 py-2 rounded ${sortBy === "category" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 hover:bg-gray-400 text-black"}`}>
          Sort by Category
        </button>
      </div>
      <ul className="flex flex-col items-center">
        {sortedItems.map((item, index) => (
          <Item
            key={index}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
          />
        ))}
      </ul>
    </div>

  );
}
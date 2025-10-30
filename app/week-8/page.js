"use client";
import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

// Main Page component to display the shopping list and add new items
export default function Page() {
  // State variable for the list of items
  const [items, setItems] = useState(itemsData);

  // Handler function to add a new item to the list
  function handleAddItem(item) {
    // create a new item object with a unique id
    const newItem = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      name: item.name,
      quantity: item.quantity,
      category: item.category,
    };

    // update the items state to include the new item
    setItems((prev) => [newItem, ...prev]);
  }

  // Render the main page with NewItem and ItemList components
  return (
    <main className="flex flex-col items-center">
      <h1 className="font-serif italic text-4xl mb-3">Shopping List</h1>

      {/* wrapper controls vertical spacing between NewItem and ItemList */}
      <div className="flex flex-col items-center gap-8 w-full max-w-3xl">
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} />
      </div>
    </main>
  );
}
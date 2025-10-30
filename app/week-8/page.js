"use client";
import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";
import MealIdeas from "./meal-ideas"; // import the new component

// Main Page component to display the shopping list and add new items
export default function Page() {
  // State variable for the list of items
  const [items, setItems] = useState(itemsData);

  // new state: name of the selected item (for meal ideas)
  const [selectedItemName, setSelectedItemName] = useState("");

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

  // New event handler: called when an item in the list is clicked
  function handleItemSelect(item) {
    // item.name can be like "chicken breasts, 1 kg 🍗"
    // remove size/extra info after the first comma
    let cleaned = (item.name || "").split(",")[0].trim();

    // remove common emoji/unicode pictographs so the API query is clean
    // This regex targets many emoji ranges; it uses the 'u' (unicode) flag.
    cleaned = cleaned.replace(
      /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
      ""
    ).trim();

    // optional: remove leftover non-letter characters (except spaces, hyphens, apostrophes)
    cleaned = cleaned.replace(/[^a-zA-Z0-9\s'-]/g, "").trim();

    // update selectedItemName state
    setSelectedItemName(cleaned);

    function handleItemSelect(item) {
      // ...existing cleaning code...
      console.log("handleItemSelect cleaned:", cleaned);
      setSelectedItemName(cleaned);
    }
  }
  // Render the main page with NewItem and ItemList components
  return (
    <main className="flex flex-col items-center p-6">
      <h1 className="font-serif italic text-4xl mb-3">Shopping List</h1>

      {/* layout: left = controls + list, right = meal ideas */}
      <div className="flex gap-8 w-full max-w-5xl">
        {/* left column: add item + list */}
        <div className="flex-1 flex flex-col items-center gap-8">
          <NewItem onAddItem={handleAddItem} />
          {/* pass the selection handler so ItemList can notify us */}
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        {/* right column: meal ideas based on selected item */}
        <div className="w-96">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
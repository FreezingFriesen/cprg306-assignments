"use client";
import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../../../contexts/AuthContext";
import Link from "next/link";
import React from "react";


// Main Page component to display the shopping list and add new items
export default function Page() {
  // Get user and authentication functions from context
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  // Call hooks unconditionally so hook order never changes
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  // If not signed in, return early (hooks already called above)
  if (!user) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-6 gap-6">
        <h1 className="text-3xl font-bold">Please sign in</h1>
        <p className="text-center">You must be signed in to access the shopping list.</p>
        <div>
          <button
            type="button"
            onClick={() => gitHubSignIn && gitHubSignIn()}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign In with GitHub
          </button>

          <Link
            href="/week-9/"
            className="ml-4 px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Back to Week 9
          </Link>
        </div>
      </main>
    );
  }

  // Handler function to add a new item to the list
  function handleAddItem(item) {
    const newItem = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      name: item.name,
      quantity: item.quantity,
      category: item.category,
    };
    setItems((prev) => [newItem, ...prev]);
  }

  // New event handler: called when an item in the list is clicked
  function handleItemSelect(item) {
    // item.name can be like "chicken breasts, 1 kg 🍗"
    // remove size/extra info after the first comma
    let cleaned = (item.name || "").split(",")[0].trim();

    // remove common emoji/unicode pictographs so the API query is clean
    cleaned = cleaned
      .replace(
        /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
        ""
      )
      .trim();

    // optional: remove leftover non-letter characters (except spaces, hyphens, apostrophes)
    cleaned = cleaned.replace(/[^a-zA-Z0-9\s'-]/g, "").trim();

    console.log("handleItemSelect cleaned:", cleaned);
    setSelectedItemName(cleaned);
  }

  // Render the main page with NewItem and ItemList components
  return (
    <main className="flex flex-col items-center p-6">
      <h1 className="font-serif italic text-4xl mb-4">Shopping List</h1>

      <div className="flex gap-8 w-full max-w-5xl">
        <div className="flex-1 flex flex-col items-center gap-8">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        <div className="w-96">
          <MealIdeas ingredient={selectedItemName} />
        </div>

        <div>
          <button
            type="button"
            onClick={() => firebaseSignOut && firebaseSignOut()}
            className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
            >
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}
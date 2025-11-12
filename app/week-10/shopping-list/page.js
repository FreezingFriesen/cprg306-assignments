"use client";

import React, { useState, useEffect } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../../../contexts/AuthContext";
import Link from "next/link";
import { getItems, addItem, deleteItem } from "../_services/shopping_list_services";

// Main Page component to display the shopping list and add new items
export default function Page() {
  // Get user and authentication functions from context
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  // Call hooks unconditionally so hook order never changes
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  // Get the shopping list
  async function loadItems() {
    if (!user || !user.uid) {
      setItems([]);
      return;
    }

    try {
      const fetched = await getItems(user.uid);
      setItems(fetched || []);
    } catch (err) {
      console.error("Failed to load items:", err);
      setItems([]);
    }
  }

  // Add the useEffect hook to load items when the component mounts or when the user changes
  useEffect(() => {
    loadItems();
  }, [user?.uid]);

  // Handle adding an item
  async function handleAddItem(item) {
    if (!user || !user.uid) {
      console.warn("No user, cannot add item");
      return;
    }

    // Prepare object to save
    const itemToSave = {
      name: item.name,
      quantity: item.quantity,
      category: item.category,
    };

    try {
      // addItem returns the new document id
      const newId = await addItem(user.uid, itemToSave);

      // build the item as it should appear in UI (include id)
      const newItem = {
        id:
          newId ??
          Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
        ...itemToSave,
      };

      // update local state immutably
      setItems((prev) => [newItem, ...prev]);
    } catch (err) {
      console.error("Failed to add item:", err);
    }
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

    cleaned = cleaned.replace(/[^a-zA-Z0-9\s'-]/g, "").trim();

    console.log("handleItemSelect cleaned:", cleaned);
    setSelectedItemName(cleaned);
  }

    // Handle deleting an item
  async function handleDeleteItem(itemId) {
    if (!user || !user.uid) {
      console.warn("No user, cannot delete item");
      return;
    }

    // Optionally confirm with the user
    if (!confirm("Delete this item?")) return;

    const ok = await deleteItem(user.uid, itemId);
    if (ok) {
      // remove from local state
      setItems((prev) => prev.filter((i) => i.id !== itemId));
    } else {
      // optional: show an error message
      console.error("Could not delete item");
    }
  }

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
            href="/week-10"
            className="ml-4 px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Back to Week 10
          </Link>
        </div>
      </main>
    );
  }

  // Render the main page with NewItem and ItemList components
  return (
    <main className="flex flex-col items-center p-6">
      <h1 className="font-serif italic text-4xl mb-4">Shopping List</h1>

      
      <div className="flex gap-8 w-full max-w-5xl">
        <div className="flex-1 flex flex-col items-center gap-8">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} onItemDelete={handleDeleteItem} />
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
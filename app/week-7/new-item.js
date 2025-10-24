"use client";
import { useState } from "react";

// NewItem component to add a new item to the list
export default function NewItem( { onAddItem } ) {
  // State variables for form fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("produce");
  const [quantity, setQuantity] = useState(1);


  // Handler function to decrement quantity
  function decrement() {
  if (quantity > 1) {
    setQuantity(quantity - 1);
  }
}

// Handler function to increment quantity
  function increment() {
  if (quantity < 20) {
    setQuantity(quantity + 1);
  } 
}

// Handler function for form submission
  function handleSubmit(event) {
    event.preventDefault();

    // create a random string id
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

    // create the new item object
    const item = { id, name, quantity, category };

    // send the item to the parent if a handler was provided
    if (typeof onAddItem === "function") {
      onAddItem(item);
    }

    // for debugging purposes, log the new item
    console.log("New item submitted:", item);

    // reset the form fields
    setName("");
    setCategory("produce");
    setQuantity(1);
  }

  // Render the form for adding a new item
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold" style={{ marginBottom: "15px" }}>Add New Item</h1>

        {/* Name Field */}
        <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Item name" className="mb-2 p-2 border rounded" />

        {/* Quantity Field */}
        <p style={{ marginTop: "10px" }}>Quantity: {quantity}</p>
        <div className="flex flex-row items-center" style={{ padding: "4px", gap: "8px" }}>
          <button type="button" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={decrement}>Decrease</button>
          <button type="button" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={increment}>Increase</button>
        </div>
        <p>Range: 1 - 20</p>

        {/* Category Field */}
        <select value={category} onChange={e => setCategory(e.target.value)} className="border rounded bg-gray-700 text-white" style={{ marginTop: "10px", padding: "8px" }}>
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600" style={{ marginTop: "15px" }}>
          Add Item
        </button>
      </div>
    </form>
  );
}


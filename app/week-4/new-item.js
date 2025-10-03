"use client";
import { useState } from "react";

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);


  function decrement() {
  if (quantity > 1) {
    setQuantity(quantity - 1);
  }
}

  function increment() {
  if (quantity < 20) {
    setQuantity(quantity + 1);
  } 
}

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">Add New Item</h1>
      <p>Quantity: {quantity}</p>
      <div className="flex flex-row items-center" style={{ padding: "8px", gap: "12px" }}>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={decrement}>Decrease</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={increment}>Increase</button>
      </div>
      <p>Range: 1 - 20</p>

    </div>
  );
}


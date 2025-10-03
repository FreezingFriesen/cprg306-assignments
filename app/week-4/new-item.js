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
    <div>
      <p>Quantity: {quantity}</p>
      <button onClick={decrement}>Decrease</button>
      <button onClick={increment}>Increase</button>
    </div>
  );
}


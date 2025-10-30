import React from "react";

// Item component to display individual item details
export default function Item({
  name,
  quantity,
  category,
}) {
  // Render the item details
  return (
    <li className="p-4 mb-2 bg-gray-600 rounded shadow flex w-fit">
      <span className="font-serif text-white">
        {name} - {quantity} - {category}
      </span>
    </li>
  );
}
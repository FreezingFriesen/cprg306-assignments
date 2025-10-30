import React from "react";

// Item component to display individual item details
export default function Item({
  name,
  quantity,
  category,
  onSelect, // new prop
}) {
  // Render the item details
  return (
    <li
      className="p-4 mb-2 bg-gray-600 rounded shadow flex w-fit cursor-pointer hover:bg-gray-700"
      onClick={() => onSelect && onSelect({ name, quantity, category })}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect && onSelect({ name, quantity, category });
        }
      }}
    >
      <span className="font-serif text-white">
        {name} - {quantity} - {category}
      </span>
    </li>
  );
}
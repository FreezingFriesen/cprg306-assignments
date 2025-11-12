import React from "react";


// Item component to display individual item details
export default function Item({
  name,
  quantity,
  category,
  onSelect, // new prop
  onDelete, // new prop
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

      {/* Delete button (stopPropagation so clicking it doesn't also trigger onSelect) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete && onDelete();
        }}
        className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
        aria-label={`Delete ${name}`}
      >
        Delete
      </button>
    </li>
  );
}
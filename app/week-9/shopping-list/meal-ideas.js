"use client";
import { useState, useEffect } from "react";

// Helper function to fetch meal ideas from TheMealDB API
async function fetchMealIdeas(ingredient) {
  // Return early if no ingredient is provided
  if (!ingredient) return [];

  // Construct the API URL with the given ingredient
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
    ingredient
  )}`;

  // Fetch data from the API
  try {
    // Await the fetch response
    const res = await fetch(url);

    // Handle non-OK responses
    if (!res.ok) {
      console.error("Meal API error", res.status);
      return [];
    }

    // Parse the JSON data
    const data = await res.json();
    if (!data.meals) return []; // no meals found

    // Map the meals to a simpler format
    return data.meals.map((m) => ({
      id: m.idMeal,
      name: m.strMeal,
      thumb: m.strMealThumb,
    }));
  } 
  
  // Catch and log any errors during fetch
  catch (err) {
    console.error("Fetch failed", err);
    return [];
  }
}

// MealIdeas component to suggest meal ideas based on an ingredient
export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]); // state holds fetched meal ideas

  // Function to load meal ideas based on the current ingredient
  async function loadMealIdeas() {
    // return early if no ingredient is provided
    if (!ingredient) return [];
    // fetch meal ideas from the API
    return await fetchMealIdeas(ingredient);
  }

  // Effect to fetch meal ideas when the ingredient changes
  useEffect(() => {
    let cancelled = false;

    // run performs the async fetch and updates state if the component is still mounted
    async function run() {
      if (!ingredient) {
        // clear meals when there's no ingredient
        setMeals([]);
        return;
      }
      const results = await loadMealIdeas();
      if (!cancelled) setMeals(results);
    }

    run();

    // cleanup to avoid setting state after unmount
    return () => {
      cancelled = true;
    };
  }, [ingredient]); // loadMealIdeas is stable here because it doesn't depend on changing closures

  // Render the meal ideas
  return (
    <section className="p-4">
      <h2 className="text-xl font-bold mb-2">Meal ideas for: {ingredient || "—"}</h2>

{/* Meal ideas list */}
      {meals.length === 0 ? (
        // Show message if no meal ideas are found
        <p className="text-sm text-gray-500">No ideas yet.</p>
      ) : (
        // List of meal ideas
        <ul className="list-disc pl-5">
          {meals.map((meal) => (
            <li key={meal.id}>{meal.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
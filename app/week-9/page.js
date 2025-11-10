import ItemList from "./item-list";

export default function Page() {
  return (
    <main>
      <h1 className="font-serif font-style: italic text-2xl flex flex-col items-center p-4">Shopping List</h1>
      <ItemList />
    </main>
  );
}
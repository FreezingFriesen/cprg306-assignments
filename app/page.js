import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center p-4 gap-4">
      <h1>CPRG 306: Web Development 2 - Assignments</h1>
      <div className="flex flex-col justify-center items-center bg-gray-700 text-white rounded max-w-md p-4 gap-3">
        <h2 className="hover:underline">
          <Link href="/week-2">Week 2</Link>
        </h2>
        <h2 className="hover:underline">
          <Link href="/week-3">Week 3</Link>
        </h2>
        <h2 className="hover:underline">
          <Link href="/week-4">Week 4</Link>
        </h2>
        <h2 className="hover:underline">
          <Link href="/week-5">Week 5</Link>
        </h2>
        <h2 className="hover:underline">
          <Link href="/week-6">Week 6</Link>
        </h2>
        <h2 className="hover:underline">
          <Link href="/week-7">Week 7</Link>
        </h2>
        <h2 className="hover:underline">
          <Link href="/week-8">Week 8</Link>
        </h2>
        <h2 className="hover:underline">
          <Link href="/week-9">Week 9</Link>
        </h2>
        <h2 className="hover:underline">
          <Link href="/week-10">Week 10</Link>
        </h2>
      </div>
    </main>
  );
}
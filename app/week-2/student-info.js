import Link from "next/link";

export default function StudentInfo() {
  return (
    <main>
      <h2>
        Name: Levi Friesen
      </h2>
      <h2>
        Repository:{" "}
        <Link href="https://github.com/FreezingFriesen/cprg306-assignments" target="_blank">
          https://github.com/FreezingFriesen/cprg306-assignments
        </Link>
      </h2>
    </main>
  );
}
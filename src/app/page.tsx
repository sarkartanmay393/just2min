import Link from "next/link";
import HabitList from "./components/habit-list";

export default function HomePage() {
  return (
    <main className="py-2 px-4 bg-blue-50 min-h-screen">
      <HabitList />
    </main>
  );
}

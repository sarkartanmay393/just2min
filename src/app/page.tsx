import HabitList from "./components/habit-list";
import Addtionals from "./additionals";

export default function HomePage() {
  return (
    <main className="py-2 px-4 bg-blue-50 min-h-screen">
      <Addtionals />
      <HabitList />
    </main>
  );
}

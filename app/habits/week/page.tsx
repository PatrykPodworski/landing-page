import Week from "@/components/Month/Week";
import WeekSelector from "./WeekSelector";

const WeekPage = () => {
  return (
    <div className="text-white">
      <WeekSelector />
      <div className="grid gap-2 grid-cols-[auto_auto]">
        <h2>Habit name</h2>
        <Week />
        <h2>Habit name</h2>
        <Week />
        <h2>Habit name</h2>
        <Week />
        <h2>Habit name</h2>
        <Week />
      </div>
    </div>
  );
};

export default WeekPage;

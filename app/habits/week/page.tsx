"use client";

import { Week } from "@/components";
import WeekSelector from "./WeekSelector";
import useWeekSelector from "./WeekSelector/useWeekSelector";

const WeekPage = () => {
  const { weekYear, handleNextWeek, handlePreviousWeek } = useWeekSelector();

  return (
    <div className="text-white">
      <WeekSelector
        weekYear={weekYear}
        onNextWeek={handleNextWeek}
        onPreviousWeek={handlePreviousWeek}
      />
      <div className="grid gap-x-4 gap-y-2 grid-cols-[auto_auto] items-baseline">
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
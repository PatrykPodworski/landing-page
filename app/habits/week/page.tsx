"use client";

import { Week } from "@/components";
import WeekSelector from "./WeekSelector";
import useWeekSelector from "./WeekSelector/useWeekSelector";

const LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

// TODO: Weekly Page: Get the data
const WeekPage = () => {
  const {
    weekYear,
    handleNextWeek,
    handlePreviousWeek,
    handleTodayWeek,
    isCurrent,
  } = useWeekSelector();
  return (
    <div className="text-white">
      <WeekSelector
        weekYear={weekYear}
        onNextWeek={handleNextWeek}
        onPreviousWeek={handlePreviousWeek}
        onTodayClick={handleTodayWeek}
        showToday={!isCurrent}
      />
      <div className="grid gap-x-4 gap-y-2 grid-cols-[auto_auto] items-baseline">
        <h2>Habit name</h2>
        <Week labels={LABELS} />
        <h2>Habit name</h2>
        <Week labels={LABELS} />
        <h2>Habit name</h2>
        <Week labels={LABELS} />
        <h2>Habit name</h2>
        <Week labels={LABELS} />
      </div>
    </div>
  );
};

export default WeekPage;

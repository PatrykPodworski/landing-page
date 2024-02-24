"use client";

import { getWeek, getYear } from "date-fns";
import { useState } from "react";
import { Week } from "@/components";
import WeekSelector, { WeekYear } from "./WeekSelector";

const WeekPage = () => {
  const currentWeekYear = getCurrentWeekYear();
  const [weekYear, setWeekYear] = useState<WeekYear>(currentWeekYear);
  const handleNextWeek = () => {
    setWeekYear((x) => ({
      week: x.week + 1,
      year: x.year,
    }));
  };
  const handlePreviousWeek = () => {
    setWeekYear((x) => ({
      week: x.week - 1,
      year: x.year,
    }));
  };

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

const getCurrentWeekYear = () => {
  const now = new Date();
  return {
    week: getWeek(now),
    year: getYear(now),
  };
};

export default WeekPage;

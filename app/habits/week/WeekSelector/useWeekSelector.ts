"use client";

import { useState } from "react";
import { getWeek, getYear } from "date-fns";
import WeekYear from "./WeekYear";

const WEEKS_IN_YEAR = 52;

const useWeekSelector = (initial?: WeekYear) => {
  const current = getCurrentWeekYear();
  const [weekYear, setWeekYear] = useState<WeekYear>(initial ?? current);

  const handleNextWeek = () => {
    setWeekYear((x) => ({
      week: x.week + 1 > WEEKS_IN_YEAR ? 1 : x.week + 1,
      year: x.week + 1 > WEEKS_IN_YEAR ? x.year + 1 : x.year,
    }));
  };

  const handlePreviousWeek = () => {
    setWeekYear((x) => ({
      week: x.week - 1 < 1 ? WEEKS_IN_YEAR : x.week - 1,
      year: x.week - 1 < 1 ? x.year - 1 : x.year,
    }));
  };

  const handleTodayWeek = () => {
    setWeekYear(current);
  };

  const isCurrent =
    weekYear.week === current.week && weekYear.year === current.year;

  return {
    weekYear,
    handleNextWeek,
    handlePreviousWeek,
    handleTodayWeek,
    isCurrent,
  };
};

const getCurrentWeekYear = () => {
  const now = new Date();
  return {
    week: getWeek(now, { weekStartsOn: 1 }),
    year: getYear(now),
  };
};

export default useWeekSelector;

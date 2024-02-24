"use client";

import { useState } from "react";
import { getWeek, getYear } from "date-fns";
import { WeekYear } from ".";

const WEEKS_IN_YEAR = 52;

const useWeekSelector = (initial?: WeekYear) => {
  const [weekYear, setWeekYear] = useState<WeekYear>(
    initial ?? getCurrentWeekYear()
  );

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

  return {
    weekYear,
    handleNextWeek,
    handlePreviousWeek,
  };
};

const getCurrentWeekYear = () => {
  const now = new Date();
  return {
    week: getWeek(now),
    year: getYear(now),
  };
};

export default useWeekSelector;

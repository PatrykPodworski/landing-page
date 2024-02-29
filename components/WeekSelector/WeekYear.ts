import { endOfWeek } from "date-fns";

interface WeekYear {
  week: number;
  year: number;
}

export const toDateRange = ({ week, year }: WeekYear) => {
  const weekStart = new Date(year, 0, 1 + (week - 1) * 7);
  const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

  return [weekStart, weekEnd] as const;
};

export default WeekYear;

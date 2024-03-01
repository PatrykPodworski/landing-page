import { Fragment } from "react";
import { DayStatus, Week } from "@/components";
import WeekYear, { toDateRange } from "@/components/WeekSelector/WeekYear";
import getHabits from "@/lib/habits/getHabits";
import { Habit } from "@/models";

const LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

// TODO: Weekly Page: Skeleton
// TODO: Weekly Page: Support multi year and month weeks
const WeeklyHabitList = async ({ userId, weekYear }: WeeklyHabitListProps) => {
  const [weekStart] = toDateRange(weekYear);
  const habits = await getHabits({
    userId,
    ...weekYear,
  });
  const habitDays = habits.map((x) => mapToDays(x, weekStart.getDate()));

  return (
    <div className="grid gap-x-4 gap-y-2 grid-cols-[auto_auto] items-baseline">
      {habitDays.map((habit) => (
        <Fragment key={habit.id}>
          <h2>{habit.name}</h2>
          <Week labels={LABELS} days={habit.days} />
        </Fragment>
      ))}
    </div>
  );
};

type WeeklyHabitListProps = {
  userId: string;
  weekYear: WeekYear;
};

// TODO: Refactor: Try to reuse other
const mapToDays = (habit: Habit, firstDayOfTheWeek: number) => {
  const days: DayStatus[] = Array(7).fill("missed");
  habit.dates.forEach((date) => {
    days[date.day - firstDayOfTheWeek] = "completed";
  });

  const currentDay = new Date().getDate();
  if (days[currentDay - firstDayOfTheWeek] !== "completed") {
    days[currentDay - firstDayOfTheWeek] = "active";
  }

  return {
    days,
    name: habit.name,
    id: habit.id,
  };
};

export default WeeklyHabitList;

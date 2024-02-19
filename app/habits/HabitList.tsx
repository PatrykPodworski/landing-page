import { getDaysInMonth } from "date-fns/getDaysInMonth";
import { startOfMonth } from "date-fns";
import getHabits from "@/lib/habits/getHabits";
import HabitMonth from "./HabitMonth";
import DayStatus from "@/components/Month/DayStatus";
import Habit from "@/models/Habit";

const HabitList = async ({ userId }: HabitListProps) => {
  const daysInMonth = getDaysInMonth(new Date());
  const firstDayOfTheMonth = startOfMonth(new Date()).getUTCDay();

  const currentMonth = new Date().getUTCMonth();
  const currentYear = new Date().getUTCFullYear();
  const habits = await getHabits(userId, currentMonth, currentYear);
  const habitDays = habits.map((x) => mapToDays(x, daysInMonth));

  return (
    <div className="flex flex-wrap max-w-5xl gap-10 justify-center">
      {habitDays.map((habit) => (
        <HabitMonth
          key={habit.name}
          name={habit.name}
          days={habit.days}
          numberOfCompleted={habit.numberOfCompleted}
          habitId={habit.id}
          numberOfDays={daysInMonth}
          startDay={firstDayOfTheMonth}
          userId={userId}
        />
      ))}
    </div>
  );
};

type HabitListProps = {
  userId?: string;
};

const mapToDays = (habit: Habit, numberOfDays: number) => {
  const days: DayStatus[] = Array(numberOfDays).fill("missed");
  habit.dates.forEach((date) => {
    days[date.day - 1] = "completed";
  });

  const currentDay = new Date().getDate();
  if (days[currentDay - 1] !== "completed") {
    days[currentDay - 1] = "active";
  }

  return {
    days,
    name: habit.name,
    numberOfCompleted: habit.dates.length,
    id: habit.id,
  };
};

export default HabitList;

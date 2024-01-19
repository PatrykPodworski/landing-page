import DayStatus from "@/components/Month/DayStatus";
import Habit from "@/models/Habit";
import HabitMonth from "./HabitMonth";
import getHabits from "../lib/habits/getHabits";

const JANUARY_DAYS = 31;

const Home = async ({ searchParams }: HomeProps) => {
  const secret =
    typeof searchParams.secret === "string" ? searchParams.secret : undefined;

  const habits = await getHabits(secret);
  const habitDays = habits.map(mapToDays);

  return (
    <div className="flex flex-wrap max-w-5xl gap-10 justify-center">
      {habitDays.map((habit) => (
        <HabitMonth
          key={habit.name}
          name={habit.name}
          days={habit.days}
          numberOfCompleted={habit.numberOfCompleted}
          numberOfDays={JANUARY_DAYS}
        />
      ))}
    </div>
  );
};

type HomeProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default Home;

const mapToDays = (habit: Habit) => {
  const days: DayStatus[] = Array(31).fill("missed");
  habit.dates.forEach((date) => {
    days[date.day - 1] = "completed";
  });

  const currentDay = new Date().getDate();
  if (days[currentDay - 1] !== "completed") {
    days[currentDay - 1] = "active";
  }

  return { days, name: habit.name, numberOfCompleted: habit.dates.length };
};

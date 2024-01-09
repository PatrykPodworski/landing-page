import DayStatus from "@/components/Month/DayStatus";
import Habit from "@/models/Habit";
import HabitMonth from "./HabitMonth";

const JANUARY_DAYS = 31;

const Home = async ({ searchParams }: HomeProps) => {
  const url = new URL("http://localhost:3000/api/habits");
  url.searchParams.set(
    "secret",
    typeof searchParams.secret === "string" ? searchParams.secret : ""
  );

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const habits: Habit[] = await response.json();
  const habitDays = habits.map(mapToDays);

  return (
    <>
      <div className="flex flex-wrap max-w-5xl gap-10 justify-center">
        {habitDays.map((habit) => (
          <HabitMonth
            key={habit.name}
            name={habit.name}
            days={habit.days}
            numberOfDays={JANUARY_DAYS}
          />
        ))}
      </div>
    </>
  );
};

type HomeProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default Home;

//TODO: spread doubles
const mapToDays = (habit: Habit) => {
  const days: DayStatus[] = Array(31).fill("missed");
  habit.dates.forEach((date) => {
    days[date.day - 1] = "completed";
  });

  const currentDay = new Date().getDate();
  if (days[currentDay - 1] !== "completed") {
    days[currentDay - 1] = "active";
  }

  return { days, name: habit.name };
};

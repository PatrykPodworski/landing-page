import { getDaysInMonth, startOfMonth } from "date-fns";
import HabitMonthSkeleton from "./HabitMonthSkeleton";

const HabitListSkeleton = () => {
  const daysInMonth = getDaysInMonth(new Date());
  const firstDayOfTheMonth = startOfMonth(new Date()).getUTCDay();

  return (
    <div className="flex flex-wrap max-w-5xl gap-10 justify-center">
      {Array(9)
        .fill(0)
        .map((_, index) => (
          <HabitMonthSkeleton
            key={index}
            numberOfDays={daysInMonth}
            startDay={firstDayOfTheMonth}
          />
        ))}
    </div>
  );
};

export default HabitListSkeleton;

import { MonthSkeleton } from "@/components/Month/MonthSkeleton";
import { HabitMonthProps } from "./HabitMonth";

const HabitMonthSkeleton = ({
  numberOfDays,
  startDay,
}: Pick<HabitMonthProps, "numberOfDays" | "startDay">) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h3 className="h-6 w-40 animate-pulse bg-gray-700 rounded" />
      <MonthSkeleton numberOfDays={numberOfDays} startDay={startDay} />
    </div>
  );
};

export default HabitMonthSkeleton;

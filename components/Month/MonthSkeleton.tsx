import { WeekSkeleton } from "./WeekSkeleton";
import { MonthProps } from "./Month";
import { getEndDay, getNumberOfWeeks } from "./utils";

export const MonthSkeleton = ({
  startDay = 0,
  numberOfDays,
}: Omit<MonthProps, "days">) => {
  const numberOfWeeks = getNumberOfWeeks(startDay, numberOfDays);
  const endDay = getEndDay(startDay, numberOfDays);

  return (
    <div className="flex flex-col gap-2">
      {Array.from(Array(numberOfWeeks)).map((_, index) => {
        return (
          <WeekSkeleton
            key={index}
            startDay={index === 0 ? startDay : 0}
            endDay={index === numberOfWeeks - 1 ? endDay : undefined}
          />
        );
      })}
    </div>
  );
};

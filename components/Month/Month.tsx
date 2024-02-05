"use client";

import DayStatus from "./DayStatus";
import Week from "./Week";
import { getNumberOfWeeks, getEndDay } from "./utils";

const Month = ({
  startDay = 0,
  numberOfDays,
  days,
  onDayClick,
}: MonthProps) => {
  const numberOfWeeks = getNumberOfWeeks(startDay, numberOfDays);
  const endDay = getEndDay(startDay, numberOfDays);

  if (days && days.length !== numberOfDays) {
    throw new Error(
      "The number of days must match the number of days in the month"
    );
  }

  const getWeekDays = (weekIndex: number) => {
    if (!days) {
      return;
    }
    if (weekIndex == 0) {
      return days.slice(0, 7 - startDay);
    }

    const start = weekIndex * 7 - startDay;
    const end = start + 7;
    return days.slice(start, end);
  };

  return (
    <div className="flex flex-col gap-2">
      {Array.from(Array(numberOfWeeks)).map((_, index) => {
        return (
          <Week
            key={index}
            startDay={index === 0 ? startDay : 0}
            endDay={index === numberOfWeeks - 1 ? endDay : undefined}
            weekIndex={index}
            offset={startDay}
            days={getWeekDays(index)}
            onDayClick={onDayClick}
          />
        );
      })}
    </div>
  );
};

export type MonthProps = {
  numberOfDays: number;
  startDay?: number;
  days?: DayStatus[];
  onDayClick?: () => void;
};

export default Month;

"use client";

import DayStatus from "@/components/Month/DayStatus";
import Month from "@/components/Month/Month";

// TODO: Add streaks view
// TODO: Add weekly view
const HabitMonth = ({
  habitId,
  name,
  days,
  numberOfCompleted,
  numberOfDays,
  startDay,
}: HabitMonthProps) => {
  const handleClick = (day: number) => {
    console.log(habitId, day);
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-white">
        {name} ({numberOfCompleted})
      </h3>
      <Month
        numberOfDays={numberOfDays}
        days={days}
        startDay={startDay}
        onDayClick={handleClick}
      />
    </div>
  );
};

export type HabitMonthProps = {
  habitId: string;
  name: string;
  days: DayStatus[];
  numberOfCompleted: number;
  numberOfDays: number;
  startDay: number;
};

export default HabitMonth;

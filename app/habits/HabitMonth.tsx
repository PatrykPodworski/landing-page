"use client";

import { useOptimistic } from "react";
import { Month, DayStatus } from "@/components";
import completeHabit from "@/lib/habits/completeHabit";

// TODO: Feature: Add streaks view
// TODO: Feature: Add weekly view
// TODO: Feature: Routines
// TODO: Feature: Yearly view
// TODO: Feature: Sync only user defined habits
const HabitMonth = ({
  habitId,
  name,
  days,
  numberOfCompleted,
  numberOfDays,
  startDay,
  userId,
}: HabitMonthProps) => {
  const [optimisticDays, optimisticCompleteHabit] = useOptimistic(
    days,
    (state, day: number) => [
      ...state.slice(0, day),
      "completed" as const,
      ...state.slice(day + 1),
    ]
  );

  const handleClick = async (day: number) => {
    optimisticCompleteHabit(day);
    await completeHabit(habitId, name, userId);
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-white">
        {name} ({numberOfCompleted})
      </h3>
      <Month
        numberOfDays={numberOfDays}
        days={optimisticDays}
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
  userId?: string;
};

export default HabitMonth;

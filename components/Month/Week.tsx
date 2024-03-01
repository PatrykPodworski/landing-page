"use client";

import Day from "./Day";
import DayStatus from "./DayStatus";

const Week = ({
  startDay = 0,
  endDay = 6,
  weekIndex = 0,
  offset = 0,
  days,
  onDayClick,
  labels,
}: WeekProps) => {
  if (startDay > endDay) {
    throw new Error("startDay must be less than or equal to endDay");
  }

  // TODO: Refactor: Apply new label in month view
  return (
    <div className="flex gap-2" data-testid="week">
      {Array(7)
        .fill(0)
        .map((_, index) => (
          <Day
            onClick={onDayClick}
            key={index}
            invisible={index < startDay || index > endDay}
            index={weekIndex * 7 + index - offset}
            status={days && days[weekIndex === 0 ? index - offset : index]}
            label={
              labels
                ? labels[index]
                : (weekIndex * 7 + index - offset + 1).toLocaleString()
            }
          />
        ))}
    </div>
  );
};

export type WeekProps = {
  startDay?: number;
  endDay?: number;
  weekIndex?: number;
  offset?: number;
  days?: DayStatus[];
  onDayClick?: (day: number) => void;
  labels?: string[];
};

export default Week;

import { WeekProps } from "./Week";
import { DaySkeleton } from "./DaySkeleton";

export const WeekSkeleton = ({
  startDay = 0,
  endDay = 6,
}: Pick<WeekProps, "startDay" | "endDay">) => (
  <div className="flex gap-2" data-testid="week-skeleton">
    {Array(7)
      .fill(0)
      .map((_, index) => (
        <DaySkeleton
          key={index}
          invisible={index < startDay || index > endDay}
        />
      ))}
  </div>
);

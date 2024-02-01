import clsx from "clsx";
import { DayProps } from "./Day";

export const DaySkeleton = ({ invisible }: Pick<DayProps, "invisible">) => (
  <div
    data-testid="day-skeleton"
    className={clsx(
      "w-8 h-8 rounded-lg bg-gray-700 animate-pulse",
      invisible && "invisible"
    )}
  ></div>
);

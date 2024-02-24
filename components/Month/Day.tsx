"use client";

import clsx from "clsx";
import DayStatus from "./DayStatus";

const Day = ({
  invisible,
  index,
  status = "missed",
  onClick,
  label,
}: DayProps) => (
  <div
    data-testid="day"
    className={clsx(
      `w-8 h-8 rounded-lg flex justify-center items-center transition-colors`,
      getDayStatusClass(status),
      invisible && "invisible"
    )}
    onClick={status === "active" && onClick ? () => onClick(index) : undefined}
  >
    {!invisible && label}
  </div>
);

const getDayStatusClass = (status: DayStatus) => {
  switch (status) {
    case "active":
      return "cursor-pointer border border-rose-500 hover:bg-rose-700 hover:border-rose-700 active:bg-rose-900 active:border-rose-900 text-rose-100";
    case "completed":
      return "cursor-default bg-rose-700 text-rose-100";
    case "skipped":
    case "missed":
      return " cursor-default border border-neutral-800 text-neutral-700";
  }
};

export type DayProps = {
  index: number;
  label: string;
  invisible?: boolean;
  status?: DayStatus;
  onClick?: (day: number) => void;
};

export default Day;

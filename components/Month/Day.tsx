import clsx from "clsx";
import DayStatus from "./DayStatus";

const Day = ({ invisible, index, status = "missed" }: DayProps) => {
  return (
    <div
      data-testid="day"
      className={clsx(
        `w-8 h-8 rounded-lg flex justify-center items-center transition-colors`,
        getDayStatusClass(status),
        invisible && "invisible"
      )}
    >
      {!invisible && index + 1}
    </div>
  );
};

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
  invisible?: boolean;
  index: number;
  status?: DayStatus;
};
export default Day;

import { format } from "date-fns";
import { toDateRange } from "./WeekYear";

// TODO: Weekly Page: Week change animation
const WeekLabel = ({ week, year, showToday, onTodayClick }: WeekLabelProps) => {
  const label = getLabel(week, year);
  return (
    <div className="flex gap-3 items-center">
      <h1 className="text-neutral-100 text-lg">{label}</h1>
      <small
        className="rounded px-2 bg-neutral-300 font-medium 
        text-neutral-950 text-sm"
      >
        Week {week}
      </small>
      {showToday && (
        <button
          className="rounded px-2 font-medium border-neutral-300 border 
            text-sm cursor-pointer hover:bg-[#ffffff1f] transition-all 
            duration-300"
          onClick={onTodayClick}
        >
          Today
        </button>
      )}
    </div>
  );
};

const getLabel = (week: number, year: number) => {
  const [weekStart, weekEnd] = toDateRange({ week, year });
  const isSameMonth = weekStart.getMonth() === weekEnd.getMonth();
  const isSameYear = weekStart.getFullYear() === weekEnd.getFullYear();

  if (isSameMonth) {
    return `${format(weekStart, "MMMM")} ${format(weekStart, "yyyy")}`;
  }
  if (isSameYear) {
    return `${format(weekStart, "MMM")} - ${format(weekEnd, "MMM")} ${format(
      weekStart,
      "yyyy"
    )}`;
  }

  return `${format(weekStart, "MMM yyyy")} - ${format(weekEnd, "MMM yyyy")}`;
};

type WeekLabelProps = {
  week: number;
  year: number;
  showToday?: boolean;
  onTodayClick?: () => void;
};

export default WeekLabel;

import { endOfWeek, format, startOfWeek } from "date-fns";
import { IconButton } from "@/components";
import { ChevronLeft, ChevronRight } from "@/icons";

const WeekSelector = ({
  weekYear,
  onNextWeek,
  onPreviousWeek,
}: WeekSelectorProps) => {
  return (
    <div className="flex w-full justify-between items-center mb-4">
      <IconButton onClick={onPreviousWeek}>
        <ChevronLeft />
      </IconButton>
      <WeekLabel weekYear={weekYear} />
      <IconButton onClick={onNextWeek}>
        <ChevronRight />
      </IconButton>
    </div>
  );
};

type WeekSelectorProps = {
  weekYear: WeekYear;
  onNextWeek: () => void;
  onPreviousWeek: () => void;
};

export type WeekYear = {
  week: number;
  year: number;
};

// TODO: Weekly Page: Support dual year weeks
// TODO: Weekly Page: Loop the weeks
const WeekLabel = ({ weekYear: { week, year } }: WeekLabelProps) => {
  const monthLabel = getWeekDates(week, year);
  return (
    <div className="flex gap-3 items-baseline ">
      <h1 className="text-neutral-100 text-lg">
        {monthLabel} {year}
      </h1>
      <small className="rounded px-2 bg-neutral-300 font-medium text-neutral-950 text-sm">
        Week {week}
      </small>
    </div>
  );
};

const getWeekDates = (week: number, year: number) => {
  const date = new Date(year, 0, 1 + (week - 1) * 7);
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
  const isSameMonth = weekStart.getMonth() === weekEnd.getMonth();
  if (isSameMonth) {
    return format(weekStart, "MMMM");
  }

  return `${format(weekStart, "MMM")} - ${format(weekEnd, "MMM")}`;
};

type WeekLabelProps = {
  weekYear: WeekYear;
};

export default WeekSelector;

import { IconButton } from "@/components";
import { ChevronLeft, ChevronRight } from "@/icons";

const WeekSelector = ({
  weekYear,
  onNextWeek,
  onPreviousWeek,
}: WeekSelectorProps) => {
  return (
    <div className="flex w-full justify-between mb-6">
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

// TODO: Weekly Page: Support dual month weeks
const WeekLabel = ({ weekYear: { week, year } }: WeekLabelProps) => {
  return (
    <div className="flex gap-3 items-baseline ">
      <h1 className="text-neutral-100 text-lg">February {year}</h1>
      <small className="rounded px-2 bg-neutral-300 font-medium text-neutral-950 text-sm">
        Week {week}
      </small>
    </div>
  );
};

type WeekLabelProps = {
  weekYear: WeekYear;
};

export default WeekSelector;

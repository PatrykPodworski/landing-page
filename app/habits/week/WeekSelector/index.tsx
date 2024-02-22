import Button from "@/components/Button";
import { ChevronLeft, ChevronRight } from "@/icons";

// TODO: Make the buttons prettier
const WeekSelector = ({
  weekYear,
  onNextWeek,
  onPreviousWeek,
}: WeekSelectorProps) => {
  return (
    <div className="flex w-full justify-between mb-6">
      <Button onClick={onPreviousWeek}>
        <ChevronLeft />
      </Button>
      <WeekLabel weekYear={weekYear} />
      <Button onClick={onNextWeek}>
        <ChevronRight />
      </Button>
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

// TODO: Support dual month weeks
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

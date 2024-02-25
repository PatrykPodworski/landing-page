import { IconButton } from "@/components";
import { ChevronLeft, ChevronRight } from "@/icons";
import WeekYear from "./WeekYear";
import WeekLabel from "./WeekLabel";

const WeekSelector = ({
  weekYear,
  onNextWeek,
  onPreviousWeek,
  onTodayClick,
  showToday,
}: WeekSelectorProps) => {
  return (
    <div className="flex w-full justify-between items-center mb-4">
      <IconButton onClick={onPreviousWeek}>
        <ChevronLeft />
      </IconButton>
      <WeekLabel
        {...weekYear}
        showToday={showToday}
        onTodayClick={onTodayClick}
      />
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
  showToday?: boolean;
  onTodayClick: () => void;
};

export default WeekSelector;

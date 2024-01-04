import Day from "./Day";

const Week = ({
  activeDay,
  startDay = 0,
  endDay = 6,
  weekIndex = 0,
  offset = 0,
}: Props) => {
  if (startDay > endDay) {
    throw new Error("startDay must be less than or equal to endDay");
  }
  if (activeDay !== undefined && (activeDay < startDay || activeDay > endDay)) {
    throw new Error("activeDay must be between startDay and endDay");
  }
  return (
    <div className="flex gap-2" data-testid="week">
      {Array(7)
        .fill(0)
        .map((_, index) => (
          <Day
            key={index}
            invisible={index < startDay || index > endDay}
            disabled={!activeDay || index < activeDay}
            index={weekIndex * 7 + index - offset}
          />
        ))}
    </div>
  );
};

type Props = {
  startDay?: number;
  endDay?: number;
  activeDay?: number;
  weekIndex?: number;
  offset?: number;
};

export default Week;

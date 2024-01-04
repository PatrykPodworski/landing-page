import Day from "./Day";
import DayStatus from "./DayStatus";

const Week = ({
  startDay = 0,
  endDay = 6,
  weekIndex = 0,
  offset = 0,
  days,
}: Props) => {
  if (startDay > endDay) {
    throw new Error("startDay must be less than or equal to endDay");
  }

  return (
    <div className="flex gap-2" data-testid="week">
      {Array(7)
        .fill(0)
        .map((_, index) => (
          <Day
            key={index}
            invisible={index < startDay || index > endDay}
            index={weekIndex * 7 + index - offset}
            status={days && days[weekIndex === 0 ? index - offset : index]}
          />
        ))}
    </div>
  );
};

type Props = {
  startDay?: number;
  endDay?: number;
  weekIndex?: number;
  offset?: number;
  days?: DayStatus[];
};

export default Week;

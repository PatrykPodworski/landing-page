import Day from "./Day";

const Week = ({ startDay = 0, endDay = 6, activeDay }: Props) => {
  console.log(startDay, endDay, activeDay);
  if (startDay > endDay) {
    throw new Error("startDay must be less than or equal to endDay");
  }
  if (activeDay !== undefined && (activeDay < startDay || activeDay > endDay)) {
    throw new Error("activeDay must be between startDay and endDay");
  }
  return (
    <div className="flex gap-2">
      {Array(7)
        .fill(0)
        .map((_, index) => (
          <Day
            key={index}
            hidden={index < startDay || index > endDay}
            disabled={!activeDay || index < activeDay}
          />
        ))}
    </div>
  );
};

type Props = {
  startDay?: number;
  endDay?: number;
  activeDay?: number;
};

export default Week;

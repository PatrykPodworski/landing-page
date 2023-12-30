import Day from "./Day";

const Week = ({ startDay = 0, endDay = 6, activeDay = 0 }: Props) => (
  <div className="flex gap-2">
    {Array(7)
      .fill(0)
      .map((_, index) => (
        <Day
          key={index}
          hidden={index < startDay || index > endDay}
          disabled={index < activeDay}
        />
      ))}
  </div>
);

type Props = {
  startDay?: number;
  endDay?: number;
  activeDay?: number;
};

export default Week;

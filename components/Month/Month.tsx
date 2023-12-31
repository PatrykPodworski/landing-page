import Week from "./Week";

//TODO: Test this component
const Month = ({ startDay = 0, numberOfDays, activeDay = 0 }: Props) => {
  const offset = startDay;
  const numberOfWeeks = Math.ceil((offset + numberOfDays) / 7);
  const endDay = (numberOfDays + offset - 1) % 7;

  const activeWeek = Math.floor((activeDay + offset) / 7);
  const activeWeekDay = (activeDay + offset) % 7;
  const getActiveDay = (week: number) => {
    switch (true) {
      case week < activeWeek:
        return undefined;
      case week === activeWeek:
        return activeWeekDay;
      default:
        return undefined;
    }
  };

  return (
    <div className="m-4 p-4 flex flex-col gap-2">
      {Array.from(Array(numberOfWeeks)).map((_, index) => (
        <Week
          key={index}
          startDay={index === 0 ? startDay : 0}
          endDay={index === numberOfWeeks - 1 ? endDay : undefined}
          activeDay={getActiveDay(index)}
        />
      ))}
    </div>
  );
};

type Props = {
  startDay?: number;
  numberOfDays: number;
  activeDay?: number;
};

export default Month;

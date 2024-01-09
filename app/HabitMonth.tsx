import DayStatus from "@/components/Month/DayStatus";
import Month from "@/components/Month/Month";

const HabitMonth = ({ name, days, numberOfDays }: HabitMonthProps) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-white">{name}</h3>
      <Month numberOfDays={numberOfDays} days={days} />
    </div>
  );
};
type HabitMonthProps = {
  name: string;
  days: DayStatus[];
  numberOfDays: number;
};

export default HabitMonth;

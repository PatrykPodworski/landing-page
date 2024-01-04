import DayStatus from "@/components/Month/DayStatus";
import Month from "@/components/Month/Month";

export default function Home() {
  const decemberLength = 31;
  const decemberDays: DayStatus[] = Array(decemberLength).fill("skipped");
  decemberDays.fill("completed", 28, 31);

  const januaryLength = 31;
  const januaryDays: DayStatus[] = Array(januaryLength).fill("skipped");
  januaryDays.fill("completed", 0, 3);
  januaryDays[2] = "missed";
  const currentDay = new Date().getDay();
  januaryDays[currentDay - 1] = "active";

  return (
    <>
      <p className="text-white text-xl text">Hello, I&apos;m Patryk</p>
      <Month numberOfDays={31} startDay={4} days={decemberDays} />
      <Month numberOfDays={31} days={januaryDays} />
    </>
  );
}

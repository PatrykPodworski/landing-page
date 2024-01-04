import Month from "@/components/Month/Month";

export default function Home() {
  return (
    <>
      <p className="text-white text-xl text">Hello, I&apos;m Patryk</p>
      <Month numberOfDays={31} startDay={4} activeDay={28} />
      <Month numberOfDays={31} activeDay={0} />
    </>
  );
}

import Month from "@/components/Month/Month";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <p className="text-white text-xl text">Hello, I&apos;m Patryk</p>
      <Month numberOfDays={31} startDay={4} activeDay={29} />
    </main>
  );
}

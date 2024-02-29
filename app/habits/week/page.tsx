"use client";

import { WeekSelector } from "@/components";
import useWeekSelector from "@/components/WeekSelector/useWeekSelector";
import WeeklyHabitList from "./WeeklyHabitList";

// TODO: Weekly Page: Get the data
// TODO: Refactor: Generic searchParams type
const WeekPage = ({ searchParams }: WeekPageProps) => {
  const {
    weekYear,
    handleNextWeek,
    handlePreviousWeek,
    handleTodayWeek,
    isCurrent,
  } = useWeekSelector();

  const userId =
    typeof searchParams.userId === "string" ? searchParams.userId : "";

  return (
    <div className="text-white">
      <WeekSelector
        weekYear={weekYear}
        onNextWeek={handleNextWeek}
        onPreviousWeek={handlePreviousWeek}
        onTodayClick={handleTodayWeek}
        showToday={!isCurrent}
      />
      <WeeklyHabitList userId={userId} weekYear={weekYear} />
    </div>
  );
};

type WeekPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default WeekPage;

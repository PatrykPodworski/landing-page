import { Suspense } from "react";
import HabitList from "./HabitList";
import HabitListSkeleton from "./HabitListSkeleton";

const Habits = async ({ searchParams }: HabitsProps) => {
  const userId =
    typeof searchParams.userId === "string" ? searchParams.userId : undefined;

  return (
    <Suspense fallback={<HabitListSkeleton />}>
      <HabitList userId={userId} />
    </Suspense>
  );
};

type HabitsProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default Habits;

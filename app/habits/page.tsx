import { Suspense } from "react";
import HabitList from "./HabitList";
import HabitListSkeleton from "./HabitListSkeleton";

const Habits = async ({ searchParams }: HabitsProps) => {
  const resolvedSearchParams = await searchParams;
  const userId =
    typeof resolvedSearchParams.userId === "string"
      ? resolvedSearchParams.userId
      : undefined;

  return (
    <Suspense fallback={<HabitListSkeleton />}>
      <HabitList userId={userId} />
    </Suspense>
  );
};

type HabitsProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default Habits;

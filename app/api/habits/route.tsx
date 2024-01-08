import { NextResponse } from "next/server";
import getTodoistCompletedItems from "./getTodoistCompletedItems";
import withEnvErrorHandling from "@/utils/withEnvErrorHandling";

const getHandler = async () => {
  const items = await getTodoistCompletedItems();

  const habits: Habit[] = items.map((item) => ({
    id: item.id,
    name: item.content,
    date: item.completed_at,
  }));

  const groupedHabits = habits.reduce<Record<string, Habit[]>>((acc, habit) => {
    const key = habit.name;
    acc[key] = [...(acc[key] || []), habit];

    return acc;
  }, {});

  return NextResponse.json(groupedHabits);
};

export const GET = withEnvErrorHandling(getHandler);

type Habit = {
  id: string;
  name: string;
  date: Date;
};

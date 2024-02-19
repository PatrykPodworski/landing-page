import { HabitItemDbo } from "@/lib/db/HabitItem";
import { CompletedItem } from "@/models";

const mapToCompletedItem = (item: HabitItemDbo): CompletedItem => {
  const parsedSource: unknown = JSON.parse(item.Source);
  const habitId = getTaskId(item.HabitId, parsedSource);

  return {
    id: item.Id,
    habitId: habitId,
    name: item.HabitName,
    date: new Date(item.Date),
    day: item.Day,
    source: item.Source,
  };
};

const getTaskId = (habitId: string | undefined, source: unknown) => {
  if (habitId) {
    return habitId;
  }

  if (hasTaskId(source)) {
    return source.task_id;
  }

  throw new Error("Missing the habitId");
};

const hasTaskId = (source: unknown): source is { task_id: string } => {
  return !!(
    typeof source === "object" &&
    source &&
    "task_id" in source &&
    typeof source.task_id === "string"
  );
};

export default mapToCompletedItem;

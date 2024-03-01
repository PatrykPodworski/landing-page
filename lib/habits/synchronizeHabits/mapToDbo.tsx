import { addHours } from "date-fns/addHours";
import { getWeek } from "date-fns";
import { ResponseItem } from "@/lib/todoist/fetchCompletedItems";
import { HabitItemDbo } from "@/lib/db/HabitItem";

const mapToDbo = (item: ResponseItem, userId: string): HabitItemDbo => ({
  UserId: userId,
  Id: item.id,
  HabitId: item.task_id,
  HabitName: item.content,
  Source: JSON.stringify(item),
  ...getHabitItemDateAttributes(item.completed_at),
});

export const getHabitItemDateAttributes = (completedDate: Date) => {
  // TODO: Business logic: Consider handling it more gracefully
  const adjustedDate = addHours(completedDate, -3);
  return {
    Date: completedDate.toISOString(),
    Day: adjustedDate.getUTCDate(),
    Month: adjustedDate.getUTCMonth(),
    Year: adjustedDate.getUTCFullYear(),
    Week: getWeek(adjustedDate, { weekStartsOn: 1 }),
  };
};

export default mapToDbo;

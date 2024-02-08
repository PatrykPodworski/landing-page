import { addHours } from "date-fns/addHours";
import { ResponseItem } from "@/lib/todoist/fetchCompletedItems";
import { HabitItemDbo } from "@/lib/db/HabitItem";

const mapToDbo = (item: ResponseItem, userId: string): HabitItemDbo => ({
  UserId: userId,
  Id: item.id,
  HabitName: item.content,
  Source: JSON.stringify(item),
  ...getHabitItemDateAttributes(item.completed_at),
});

export const getHabitItemDateAttributes = (completedDate: Date) => {
  const adjustedDate = addHours(completedDate, -3);
  return {
    Date: completedDate.toISOString(),
    Day: adjustedDate.getUTCDate(),
    Month: adjustedDate.getUTCMonth() + 1,
    Year: adjustedDate.getUTCFullYear(),
  };
};

export default mapToDbo;

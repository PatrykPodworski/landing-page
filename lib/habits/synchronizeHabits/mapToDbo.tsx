import { addHours } from "date-fns/addHours";
import { ResponseItem } from "@/lib/todoist/fetchCompletedItems";
import { HabitItemDbo } from "@/lib/db/HabitItem";

const mapToDbo = (item: ResponseItem, userId: string): HabitItemDbo => {
  const adjustedDate = addHours(item.completed_at, -3);
  return {
    UserId: userId,
    Id: item.id,
    HabitName: item.content,
    Date: item.completed_at.toISOString(),
    Day: adjustedDate.getUTCDate(),
    Source: JSON.stringify(item),
    Month: adjustedDate.getUTCMonth() + 1,
    Year: adjustedDate.getUTCFullYear(),
  };
};

export default mapToDbo;

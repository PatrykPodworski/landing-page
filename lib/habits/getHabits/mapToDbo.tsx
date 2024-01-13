import { addHours } from "date-fns/addHours";
import { ResponseItem } from "@/lib/todoist/fetchCompletedItems";
import { HabitItemDbo } from "@/lib/db/HabitItem";

const mapToDbo = (item: ResponseItem, userId: string): HabitItemDbo => ({
  UserId: userId,
  Id: item.id,
  HabitName: item.content,
  Date: item.completed_at.toISOString(),
  Day: addHours(item.completed_at, -3).getUTCDate(),
  Source: JSON.stringify(item),
});

export default mapToDbo;

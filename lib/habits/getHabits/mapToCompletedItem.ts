import { HabitItemDbo } from "@/lib/db/HabitItem";
import { CompletedItem } from "@/models";

const mapToCompletedItem = (item: HabitItemDbo): CompletedItem => {
  const parsedSource: unknown = JSON.parse(item.Source);

  return {
    id: item.Id,
    habitId: item.HabitId,
    name: item.HabitName,
    date: new Date(item.Date),
    day: item.Day,
    source: item.Source,
  };
};

export default mapToCompletedItem;

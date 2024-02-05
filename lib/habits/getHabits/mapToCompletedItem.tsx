import { HabitItemDbo } from "@/lib/db/HabitItem";
import { CompletedItem } from "@/models";

const mapToCompletedItem = (item: HabitItemDbo): CompletedItem => {
  // TODO: Add habitId to the table
  const parsedSource = JSON.parse(item.Source);

  return {
    id: item.Id,
    habitId: parsedSource.task_id,
    name: item.HabitName,
    date: new Date(item.Date),
    day: item.Day,
    source: item.Source,
  };
};

export default mapToCompletedItem;

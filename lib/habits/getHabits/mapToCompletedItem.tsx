import { HabitItemDbo } from "@/lib/db/HabitItem";
import { CompletedItem } from "@/models";

const mapToCompletedItem = (item: HabitItemDbo): CompletedItem => ({
  id: item.Id,
  name: item.HabitName,
  date: new Date(item.Date),
  day: item.Day,
  source: item.Source,
});

export default mapToCompletedItem;

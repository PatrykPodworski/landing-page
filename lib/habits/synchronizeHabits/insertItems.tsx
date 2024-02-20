import { HabitItemDbo, putItem, querySingle } from "@/lib/db/HabitItem";

const insertItems = async (items: HabitItemDbo[]) => {
  for (const item of items) {
    await insertItem(item);
  }
};

const insertItem = async (item: HabitItemDbo) => {
  const queriedItem = await querySingle({
    habitId: item.HabitId,
    userId: item.UserId,
    day: item.Day,
    month: item.Month,
    year: item.Year,
  });

  if (!queriedItem) {
    await putItem(item);
    return;
  }

  if (queriedItem.Source === "{}") {
    const updatedItem = { ...queriedItem, Source: item.Source };
    await putItem(updatedItem);
  }
};

export default insertItems;

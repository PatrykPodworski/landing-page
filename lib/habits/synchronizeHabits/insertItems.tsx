import { HabitItemDbo, insertIfNotExists } from "@/lib/db/HabitItem";

const insertItems = async (items: HabitItemDbo[]) => {
  for (const item of items) {
    await insertIfNotExists(item);
  }
};

export default insertItems;

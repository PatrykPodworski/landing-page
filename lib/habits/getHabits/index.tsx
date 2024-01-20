import getEnv from "@/utils/getEnv";
import mapToCompletedItem from "./mapToCompletedItem";
import groupItems from "./groupItems";
import { queryByUserId } from "@/lib/db/HabitItem";

const getHabits = async (inputUserId: string | undefined) => {
  const userId = getEnv("USER_ID");
  const showRealData = userId === inputUserId;

  const itemsFromDb = await queryByUserId(userId);
  const completedItems = itemsFromDb.map(mapToCompletedItem);
  const habits = groupItems(completedItems, showRealData);

  return habits;
};

export default getHabits;

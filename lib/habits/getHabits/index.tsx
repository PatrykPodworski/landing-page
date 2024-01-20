import validateAccess from "./validateAccess";
import getEnv from "@/utils/getEnv";
import mapToCompletedItem from "./mapToCompletedItem";
import groupItems from "./groupItems";
import { queryByUserId } from "@/lib/db/HabitItem";

export const getHabits = async (secret: string | undefined) => {
  const userId = getEnv("USER_ID");
  const showRealData = validateAccess(secret);

  const itemsFromDb = await queryByUserId(userId);
  const completedItems = itemsFromDb.map(mapToCompletedItem);
  const habits = groupItems(completedItems, showRealData);

  return habits;
};

export default getHabits;

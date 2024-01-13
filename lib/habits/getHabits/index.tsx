// TODO: Consider enabling import/no-internal-modules rule
import fetchCompletedItems from "@/lib/todoist/fetchCompletedItems";
import insertItems from "@/lib/habits/getHabits/insertItems";
import validateAccess from "./validateAccess";
import mapToDbo from "./mapToDbo";
import getEnv from "@/utils/getEnv";
import mapToCompletedItem from "./mapToCompletedItem";
import groupItems from "./groupItems";
import { queryByUserId } from "@/lib/db/HabitItem";

export const getHabits = async (secret: string | undefined) => {
  const userId = getEnv("USER_ID");
  const showRealData = validateAccess(secret);

  // TODO: Sync data asynchronously
  const items = await fetchCompletedItems();
  const dboItems = items.map((x) => mapToDbo(x, userId));
  await insertItems(dboItems);

  const itemsFromDb = await queryByUserId(userId);
  const completedItems = itemsFromDb.map(mapToCompletedItem);
  const habits = groupItems(completedItems, showRealData);

  return habits;
};

export default getHabits;

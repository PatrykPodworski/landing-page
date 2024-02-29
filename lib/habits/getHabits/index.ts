import getEnv from "@/utils/getEnv";
import { queryByUserId } from "@/lib/db/HabitItem";
import { QueryByUserIdParams } from "@/lib/db/HabitItem/queryByUserId";
import mapToCompletedItem from "./mapToCompletedItem";
import groupItems from "./groupItems";

const getHabits = async (params: QueryByUserIdParams) => {
  const userId = getEnv("USER_ID");
  const showRealData = validateUser(params.userId);

  // TODO: Refactor: use userId from params
  const itemsFromDb = await queryByUserId({ ...params, userId });
  const completedItems = itemsFromDb.map(mapToCompletedItem);
  const habits = groupItems(completedItems, showRealData);

  return habits;
};

export default getHabits;

const validateUser = (userIdToValidate: string | undefined) => {
  const userId = getEnv("USER_ID");
  return userId === userIdToValidate;
};

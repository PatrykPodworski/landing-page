import getEnv from "@/utils/getEnv";
import {
  QueryByUserIdParams,
  QueryByWeekParams,
  queryByUserId,
  queryByWeek,
} from "@/lib/db/HabitItem";
import mapToCompletedItem from "./mapToCompletedItem";
import groupItems from "./groupItems";

const getHabits = async (params: QueryByUserIdParams | QueryByWeekParams) => {
  const userId = getEnv("USER_ID");
  const showRealData = validateUser(params.userId);

  // TODO: Refactor: use userId from params
  const itemsFromDb = await getItemsFromDb({ ...params, userId });
  const completedItems = itemsFromDb.map(mapToCompletedItem);
  const habits = groupItems(completedItems, showRealData);

  return habits;
};

export default getHabits;

const getItemsFromDb = async (
  params: QueryByUserIdParams | QueryByWeekParams
) => {
  if ("week" in params) {
    return queryByWeek(params);
  }
  return queryByUserId(params);
};

const validateUser = (userIdToValidate: string | undefined) => {
  const userId = getEnv("USER_ID");
  return userId === userIdToValidate;
};

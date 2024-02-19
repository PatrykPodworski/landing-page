import getEnv from "@/utils/getEnv";
import fetchCompletedItems from "@/lib/todoist/fetchCompletedItems";
import mapToDbo from "./mapToDbo";
import insertItems from "./insertItems";

// TODO: When an item exists, update source instead of skipping
const synchronizeHabits = async (since: Date) => {
  const userId = getEnv("USER_ID");

  const items = await fetchCompletedItems(since);
  const dboItems = items.map((x) => mapToDbo(x, userId));
  await insertItems(dboItems);
};

export default synchronizeHabits;

import getEnv from "@/utils/getEnv";
import fetchCompletedItems from "@/lib/todoist/fetchCompletedItems";
import mapToDbo from "./mapToDbo";
import insertItems from "./insertItems";

const synchronizeHabits = async () => {
  const userId = getEnv("USER_ID");

  const items = await fetchCompletedItems();
  const dboItems = items.map((x) => mapToDbo(x, userId));
  await insertItems(dboItems);
};

export default synchronizeHabits;

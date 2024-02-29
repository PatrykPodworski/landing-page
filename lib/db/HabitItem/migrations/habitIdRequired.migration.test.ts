import getEnv from "@/utils/getEnv";
import { queryByUserId } from "..";
import putItem from "../putItem";

it.skip("migrate habitId to required", async () => {
  const userId = getEnv("USER_ID");
  const habitItemsWithIds = await queryByUserId({
    userId,
    month: 1,
    year: 2024,
  });

  const habitIds = habitItemsWithIds.reduce<Map<string, string>>(
    (acc, item) => {
      if (!item.HabitId) {
        return acc;
      }
      if (acc.has(item.HabitName)) {
        return acc;
      }

      return acc.set(item.HabitName, item.HabitId);
    },
    new Map<string, string>()
  );

  const habitItems = await queryByUserId({ userId, month: 0, year: 2024 });
  const habitItemsToUpdate = habitItems.filter((x) => !x.HabitId);
  for (const item of habitItemsToUpdate) {
    const habitId = habitIds.get(item.HabitName);
    if (!habitId) {
      throw new Error(`Missing habitId for habit ${item.HabitName}`);
    }
    item.HabitId = habitId;
    await putItem(item);
  }
}, 10000);

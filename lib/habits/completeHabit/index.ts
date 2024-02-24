"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { HabitItemDbo, insertIfNotExists } from "@/lib/db/HabitItem";
import completeItem from "@/lib/todoist/completeItem";
import getEnv from "@/utils/getEnv";
import { getHabitItemDateAttributes } from "../synchronizeHabits/mapToDbo";

const completeHabit = async (
  habitId: string,
  habitName: string,
  inputUserId?: string
) => {
  const userId = getEnv("USER_ID");
  const hasTodoistIntegration = userId === inputUserId;

  if (!inputUserId) {
    throw new Error("User ID is required");
  }

  if (hasTodoistIntegration) {
    await completeItem(habitId);
  }

  const date = new Date();
  const item: HabitItemDbo = {
    UserId: inputUserId,
    Id: randomUUID(),
    HabitName: habitName,
    HabitId: habitId,
    Source: JSON.stringify({}),
    ...getHabitItemDateAttributes(date),
  };

  await insertIfNotExists(item);
  revalidatePath("/habits");
};

export default completeHabit;

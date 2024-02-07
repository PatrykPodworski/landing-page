"use server";

import getEnv from "@/utils/getEnv";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

const completeHabit = async (habitId: string, inputUserId?: string) => {
  const userId = getEnv("USER_ID");
  const hasTodoistIntegration = userId === inputUserId;

  if (!hasTodoistIntegration) {
    // TODO: Handle no integration
    return;
  }

  await completeItem(habitId);
};

export default completeHabit;

// TODO: Move to lib/todoist
// TODO: Synchronize the data
const completeItem = async (itemId: string) => {
  const token = getEnv("TODOIST_TOKEN");

  const body = {
    commands: [
      {
        type: "item_update_date_complete",
        uuid: randomUUID(),
        args: {
          id: itemId,
        },
      },
    ],
  };

  const response = await fetch("https://api.todoist.com/sync/v9/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to complete item");
  }

  revalidatePath("/habits");
};

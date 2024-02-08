import { randomUUID } from "crypto";
import getEnv from "@/utils/getEnv";

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
};

export default completeItem;

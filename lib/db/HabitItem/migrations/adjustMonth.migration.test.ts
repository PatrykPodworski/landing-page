import getEnv from "@/utils/getEnv";
import { queryByUserId } from "..";
import putItem from "../putItem";

it.skip("adjust month", async () => {
  const userId = getEnv("USER_ID");
  const habitItems = await queryByUserId(userId, 0, 2024);

  for (const item of habitItems) {
    const date = new Date(item.Date);
    const month = date.getUTCMonth();
    item.Month = month;

    await putItem(item);
  }
}, 10000);

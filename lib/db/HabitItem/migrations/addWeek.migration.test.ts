import { getWeek } from "date-fns";
import getEnv from "@/utils/getEnv";
import { queryByUserId } from "..";
import putItem from "../putItem";

it("add week", async () => {
  const userId = getEnv("USER_ID");
  const habitItems = await queryByUserId({ userId, month: 1, year: 2024 });

  for (const item of habitItems) {
    const date = new Date(item.Year, item.Month, item.Day);
    const week = getWeek(date, { weekStartsOn: 1 });
    item.Week = week;

    await putItem(item);
  }
}, 10000);

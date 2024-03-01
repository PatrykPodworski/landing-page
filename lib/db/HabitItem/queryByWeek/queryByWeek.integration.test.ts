import getEnv from "@/utils/getEnv";
import queryByWeek from ".";

it("should return habit items for the week", async () => {
  const userId = getEnv("TEST_USER_ID");
  const week = 1;
  const year = 2024;
  const items = await queryByWeek({ userId, week, year });
  expect(items.every((x) => x.UserId === userId)).toBeTruthy();
  expect(items.every((x) => x.Week === week)).toBeTruthy();
  expect(items.every((x) => x.Year === year)).toBeTruthy();
});

import getEnv from "@/utils/getEnv";
import queryByUserId from ".";

it("should return all user's habit items for a single month", async () => {
  const userId = getEnv("TEST_USER_ID");
  const month = 0;
  const year = 2024;
  const items = await queryByUserId(userId, month, year);
  expect(items.every((x) => x.Month === month)).toBeTruthy();
  expect(items.every((x) => x.Year === year)).toBeTruthy();
});

it("should return all user's habit items between given days", async () => {
  const userId = getEnv("TEST_USER_ID");
  const month = 0;
  const year = 2024;
  const startDay = 1;
  const endDay = 7;

  const items = await queryByUserId(userId, 0, 2024, startDay, endDay);

  expect(items.every((x) => x.UserId === userId)).toBeTruthy();
  expect(items.every((x) => x.Month === month)).toBeTruthy();
  expect(items.every((x) => x.Year === year)).toBeTruthy();
  const sortedDays = items.map((x) => x.Day).sort((a, b) => a - b);
  expect(sortedDays.at(0)).toBe(startDay);
  expect(sortedDays.at(-1)).toBe(endDay);
});

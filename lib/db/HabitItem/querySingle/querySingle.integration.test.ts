import querySingle from "@/lib/db/HabitItem/querySingle";
import QuerySingleParams from "@/lib/db/HabitItem/querySingle/QuerySingleParams";
import getEnv from "@/utils/getEnv";

const getMockParams = () => {
  const userId = getEnv("TEST_USER_ID");
  const habitId = getEnv("TEST_HABIT_ID");

  const params: QuerySingleParams = {
    userId,
    habitId,
    year: 2024,
    month: 1,
    day: 1,
  };

  return params;
};

it("should return a single habit item", async () => {
  const mockParams = getMockParams();
  const item = await querySingle(mockParams);
  expect(item).toBeDefined();
});

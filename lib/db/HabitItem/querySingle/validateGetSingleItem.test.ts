import { validateGetSingleItem } from "@/lib/db/HabitItem/querySingle";
import { HabitItemDbo } from "..";

const getMockItems = (count: number) => {
  const items: HabitItemDbo[] = Array.from({ length: count }, (_, i) => ({
    Id: `id${i}`,
    UserId: "userId",
    HabitName: "habitName",
    HabitId: "habitId",
    Source: "source",
    Date: "date",
    Day: 1,
    Month: 1,
    Year: 2024,
  }));

  return items;
};

it("should return a single habit item", async () => {
  const items = getMockItems(1);
  const result = validateGetSingleItem(items);
  expect(result.Id).toEqual(items[0].Id);
});

it("throws when more than one item found", () => {
  const items = getMockItems(2);
  expect(() => validateGetSingleItem(items)).toThrow(
    "More than one item found"
  );
});

it("throws when item not found", () => {
  const items = getMockItems(0);
  expect(() => validateGetSingleItem(items)).toThrow("Item not found");
});

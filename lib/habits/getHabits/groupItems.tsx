import Habit from "@/models/Habit";
import { CompletedItem } from "@/models";

const groupItems = (completedItems: CompletedItem[], showRealData: boolean) => {
  const groupedItems = completedItems.reduce<Record<string, CompletedItem[]>>(
    (acc, item) => {
      const key = item.name;
      acc[key] = [...(acc[key] || []), item];

      return acc;
    },
    {}
  );

  const habits: Habit[] = Object.entries(groupedItems).map(
    ([key, value], index) => {
      return {
        name: showRealData ? key : fakeNames[index],
        dates: value,
      };
    }
  );

  return habits;
};

const fakeNames = [
  "Read 20 pages",
  "No coffee",
  "Write",
  "No sugar",
  "Meditate",
  "No social media",
  "Exercise",
  "No video games",
  "No junk food",
];

export default groupItems;

import { addHours } from "date-fns/addHours";
import Habit, { CompletedItem } from "@/models/Habit";
import fetchCompletedItems from "@/lib/todoist/fetchCompletedItems";
import insertItems from "@/lib/db/insertItems";
import validateAccess from "./validateAccess";

// TODO: Serve items from the database
export const getHabits = async (secret: string | undefined) => {
  const showRealData = validateAccess(secret);
  const items = await fetchCompletedItems();
  const mappedItems = mapItems(items);
  await insertItems(mappedItems);
  const habits = groupItems(mappedItems, showRealData);

  return habits;
};

type ResponseItem = Awaited<ReturnType<typeof fetchCompletedItems>>;
const mapItems = (items: ResponseItem) => {
  const completedItems: CompletedItem[] = items.map((item) => ({
    id: item.id,
    name: item.content,
    date: item.completed_at,
    day: addHours(item.completed_at, -3).getUTCDate(),
    source: JSON.stringify(item),
  }));

  return completedItems;
};

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

export default getHabits;

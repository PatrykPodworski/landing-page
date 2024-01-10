import { NextRequest, NextResponse } from "next/server";
import getTodoistCompletedItems, { Item } from "./getTodoistCompletedItems";
import withEnvErrorHandling from "@/utils/withEnvErrorHandling";
import Habit, { CompletedItem } from "@/models/Habit";
import getEnv from "@/utils/getEnv";
import { addHours } from "date-fns/addHours";

const getHandler = async (request: NextRequest) => {
  console.log("getHandler");
  const showRealData = isSecretValid(request);
  const items = await getTodoistCompletedItems();
  const habits = groupAndMapItems(items, showRealData);

  return NextResponse.json(habits);
};

export const GET = withEnvErrorHandling(getHandler);

const isSecretValid = (request: NextRequest) => {
  const secret = request.nextUrl.searchParams.get("secret");
  const habitsSecret = getEnv("HABITS_SECRET");
  return secret === habitsSecret;
};

const groupAndMapItems = (items: Item[], showRealData: boolean) => {
  const completedItems = items.map((item) => ({
    id: item.id,
    name: item.content,
    date: item.completed_at,
    day: addHours(item.completed_at, -3).getUTCDate(),
  }));

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

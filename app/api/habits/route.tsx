import synchronizeHabits from "@/lib/habits/synchronizeHabits";
import { NextResponse } from "next/server";

// TODO: Add authentication
export const PUT = async () => {
  await synchronizeHabits();
  return new NextResponse();
};

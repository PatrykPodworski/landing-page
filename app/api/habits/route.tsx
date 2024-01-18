import synchronizeHabits from "@/lib/habits/synchronizeHabits";
import { NextResponse } from "next/server";

// TODO: Add authentication
export const PUT = async () => {
  try {
    await synchronizeHabits();
    return new NextResponse();
  } catch (error) {
    return new NextResponse(null, { status: 429 });
  }
};

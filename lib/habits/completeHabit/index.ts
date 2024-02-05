"use server";

import getEnv from "@/utils/getEnv";

const completeHabit = async (habitId: string, inputUserId?: string) => {
  const userId = getEnv("USER_ID");
  const hasTodoistIntegration = userId === inputUserId;

  if (!hasTodoistIntegration) {
    // TODO: Handle no integration
    return;
  }

  console.log("Completing habit", habitId, userId);
};

export default completeHabit;

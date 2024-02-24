import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import synchronizeHabits from "@/lib/habits/synchronizeHabits";
import getEnv from "@/utils/getEnv";
import getHeader from "@/utils/getHeader";
import withErrorHandling from "@/utils/withErrorHandling";

const postHandler = async (request: NextRequest) => {
  const isRequestValid = await validateRequest(request);
  if (!isRequestValid) {
    return new NextResponse(null, { status: 401 });
  }

  await synchronizeHabits(getToday());
  return new NextResponse();
};

export const POST = withErrorHandling(postHandler);

const getToday = () => {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

const validateRequest = async (request: NextRequest) => {
  const clientSecret = getEnv("TODOIST_CLIENT_SECRET");
  const header = getHeader("X-Todoist-Hmac-SHA256", request.headers);

  const body = await request.json();

  const hmac = createHmac("sha256", clientSecret)
    .update(JSON.stringify(body))
    .digest("base64");

  return hmac === header;
};

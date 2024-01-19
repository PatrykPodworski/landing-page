import synchronizeHabits from "@/lib/habits/synchronizeHabits";
import getEnv from "@/utils/getEnv";
import withEnvErrorHandling from "@/utils/withEnvErrorHandling";
import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const postHandler = async (request: NextRequest) => {
  const clientSecret = getEnv("TODOIST_CLIENT_SECRET");

  // TODO: Handle like getEnv
  const header = request.headers.get("X-Todoist-Hmac-SHA256");
  if (!header) {
    return new NextResponse(null, { status: 401 });
  }

  const body = await request.json();

  const hmac = createHmac("sha256", clientSecret)
    .update(JSON.stringify(body))
    .digest("base64");

  if (hmac !== header) {
    return new NextResponse(null, { status: 401 });
  }

  // TODO: Add today's date (UTC)
  await synchronizeHabits();
  return new NextResponse();
};

export const POST = withEnvErrorHandling(postHandler);

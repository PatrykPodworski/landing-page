import { NextRequest, NextResponse } from "next/server";
import getEnv from "@/utils/getEnv";
import withErrorHandling from "@/utils/withErrorHandling";

const DAILY_LIMIT = 5;
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const POST = withErrorHandling(async (request: NextRequest) => {
  const { message, userId } = await request.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  if (!userId || typeof userId !== "string" || !UUID_REGEX.test(userId)) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const pat = getEnv("AIRTABLE_PAT");
  const baseId = getEnv("AIRTABLE_BASE_ID");
  const tableId = getEnv("AIRTABLE_TABLE_ID");

  const today = new Date().toISOString().split("T")[0];

  const countParams = new URLSearchParams({
    filterByFormula: `{user-id}="${userId}"`,
    maxRecords: String(DAILY_LIMIT),
    "fields[]": "created-at",
    "sort[0][field]": "created-at",
    "sort[0][direction]": "desc",
  });

  const countResponse = await fetch(
    `https://api.airtable.com/v0/${baseId}/${tableId}?${countParams}`,
    { headers: { Authorization: `Bearer ${pat}` } }
  );

  if (!countResponse.ok) {
    const error = await countResponse.text();
    console.error("[message] count query failed:", error);
    return NextResponse.json(
      { error: `AirTable error: ${error}` },
      { status: 500 }
    );
  }

  const { records } = await countResponse.json();
  const todayCount = records.filter(
    (r: { fields: { "created-at"?: string } }) =>
      r.fields["created-at"]?.startsWith(today)
  ).length;

  if (todayCount >= DAILY_LIMIT) {
    return NextResponse.json(
      { error: "Daily message limit reached" },
      { status: 429 }
    );
  }

  const response = await fetch(
    `https://api.airtable.com/v0/${baseId}/${tableId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pat}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields: { Message: message, "user-id": userId } }],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("[message] insert failed:", error);
    return NextResponse.json(
      { error: `AirTable error: ${error}` },
      { status: response.status }
    );
  }

  return NextResponse.json(await response.json());
});

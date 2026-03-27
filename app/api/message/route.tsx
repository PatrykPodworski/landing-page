import { NextRequest, NextResponse } from "next/server";
import getEnv from "@/utils/getEnv";
import withErrorHandling from "@/utils/withErrorHandling";

const DAILY_LIMIT = 5;
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const POST = withErrorHandling(async (request: NextRequest) => {
  const { message, userId } = await request.json();
  console.log("[message] userId:", userId, "message length:", message?.length);

  if (!message || typeof message !== "string") {
    console.log("[message] rejected: missing message");
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  if (!userId || typeof userId !== "string" || !UUID_REGEX.test(userId)) {
    console.log("[message] rejected: invalid userId");
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const pat = getEnv("AIRTABLE_PAT");
  const baseId = getEnv("AIRTABLE_BASE_ID");
  const tableId = getEnv("AIRTABLE_TABLE_ID");

  const today = new Date().toISOString().split("T")[0];
  console.log("[message] today:", today);

  const countParams = new URLSearchParams({
    filterByFormula: `{user-id}="${userId}"`,
    maxRecords: String(DAILY_LIMIT),
    "fields[]": "created-at",
    "sort[0][field]": "created-at",
    "sort[0][direction]": "desc",
  });
  const countUrl = `https://api.airtable.com/v0/${baseId}/${tableId}?${countParams}`;
  console.log("[message] count query:", countUrl.replace(pat, "[PAT]"));

  const countResponse = await fetch(countUrl, {
    headers: { Authorization: `Bearer ${pat}` },
  });

  console.log("[message] count response status:", countResponse.status);

  if (!countResponse.ok) {
    const error = await countResponse.text();
    console.log("[message] count query failed:", error);
    return NextResponse.json(
      { error: `AirTable error: ${error}` },
      { status: 500 }
    );
  }

  const countData = await countResponse.json();
  console.log("[message] records returned:", JSON.stringify(countData.records));

  const todayCount = countData.records.filter(
    (r: { fields: { "created-at"?: string } }) =>
      r.fields["created-at"]?.startsWith(today)
  ).length;
  console.log("[message] todayCount:", todayCount);

  if (todayCount >= DAILY_LIMIT) {
    console.log("[message] limit reached, rejecting");
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

  console.log("[message] insert response status:", response.status);

  if (!response.ok) {
    const error = await response.text();
    console.log("[message] insert failed:", error);
    return NextResponse.json(
      { error: `AirTable error: ${error}` },
      { status: response.status }
    );
  }

  const data = await response.json();
  console.log("[message] insert success, record id:", data.records?.[0]?.id);
  return NextResponse.json(data);
});

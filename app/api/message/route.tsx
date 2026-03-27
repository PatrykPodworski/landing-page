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

  const filterFormula = `AND({user-id}="${userId}",IS_SAME(CREATED_TIME(),TODAY(),'day'))`;
  const countUrl = `https://api.airtable.com/v0/${baseId}/${tableId}?filterByFormula=${encodeURIComponent(filterFormula)}&fields[]=user-id`;

  const countResponse = await fetch(countUrl, {
    headers: { Authorization: `Bearer ${pat}` },
  });

  if (countResponse.ok) {
    const countData = await countResponse.json();
    if (countData.records && countData.records.length >= DAILY_LIMIT) {
      return NextResponse.json(
        { error: "Daily message limit reached" },
        { status: 429 }
      );
    }
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
    return NextResponse.json(
      { error: `AirTable error: ${error}` },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
});

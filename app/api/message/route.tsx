import { NextRequest, NextResponse } from "next/server";
import getEnv from "@/utils/getEnv";
import withErrorHandling from "@/utils/withErrorHandling";

export const POST = withErrorHandling(async (request: NextRequest) => {
  const { message } = await request.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const pat = getEnv("AIRTABLE_PAT");
  const baseId = getEnv("AIRTABLE_BASE_ID");
  const tableId = getEnv("AIRTABLE_TABLE_ID");

  const response = await fetch(
    `https://api.airtable.com/v0/${baseId}/${tableId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pat}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields: { Message: message } }],
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

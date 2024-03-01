import crypto from "crypto";
import { insertIfNotExists } from "..";

it.skip("playground", async () => {
  await insertIfNotExists({
    UserId: "",
    Id: crypto.randomUUID(),
    HabitId: "",
    HabitName: "Learn something technical",
    Year: 2024,
    Month: 2,
    Day: 18,
    Week: 7,
    Date: new Date().toISOString(),
    Source: "{}",
  });
});

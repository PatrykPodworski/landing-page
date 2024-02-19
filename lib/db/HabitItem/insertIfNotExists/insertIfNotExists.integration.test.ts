import { insertIfNotExists } from "..";
import crypto from "crypto";

it.skip("playground", async () => {
  await insertIfNotExists({
    UserId: "",
    Id: crypto.randomUUID(),
    HabitId: "",
    HabitName: "Learn something technical",
    Year: 2024,
    Month: 2,
    Day: 18,
    Date: new Date().toISOString(),
    Source: "{}",
  });
});

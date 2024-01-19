import { InferType, number, object, string } from "yup";

export const HabitItemDbo = object({
  UserId: string().required(),
  Id: string().required(),
  HabitName: string().required(),
  Date: string().required(),
  Day: number().required(),
  Source: string().required(),
});

export type HabitItemDbo = InferType<typeof HabitItemDbo>;

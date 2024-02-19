import { InferType, number, object, string } from "yup";

export const HabitItemDbo = object({
  UserId: string().required(),
  Id: string().required(),
  HabitId: string().required(),
  HabitName: string().required(),
  Date: string().required(),
  Day: number().min(1).max(31).required(),
  Month: number().min(0).max(11).required(),
  Year: number().required(),
  Source: string().required(),
});

export type HabitItemDbo = InferType<typeof HabitItemDbo>;

import { InferType, array, date, number, object, string } from "yup";

const CompletedItem = object({
  id: string().required(),
  name: string().required(),
  date: date().required(),
  day: number().required(),
  source: string().required(),
});

export type CompletedItem = InferType<typeof CompletedItem>;

const Habit = object({
  name: string().required(),
  dates: array(CompletedItem).required(),
});

type Habit = InferType<typeof Habit>;

export default Habit;

import { InferType, date, number, object, string } from "yup";

const CompletedItem = object({
  id: string().required(),
  habitId: string().required(),
  name: string().required(),
  date: date().required(),
  day: number().required(),
  source: string().required(),
});

type CompletedItem = InferType<typeof CompletedItem>;

export default CompletedItem;

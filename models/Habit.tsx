import { InferType, array, object, string } from "yup";
import CompletedItem from "./CompletedItem";

const Habit = object({
  name: string().required(),
  dates: array(CompletedItem).required(),
});

type Habit = InferType<typeof Habit>;

export default Habit;

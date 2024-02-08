import { QueryCommandOutput } from "@aws-sdk/lib-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { array } from "yup";
import { HabitItemDbo } from "../HabitItemDbo";

const serializeQueryResponse = async (response: QueryCommandOutput) => {
  const items = response.Items?.map((x) => unmarshall(x)) ?? [];

  const validated = await array(HabitItemDbo).validate([...items]);
  return validated ?? [];
};

export default serializeQueryResponse;

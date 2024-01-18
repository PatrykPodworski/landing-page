import dynamoDbDocumentClient from "../../dynamoDbDocumentClient";
import getCommand from "./getCommand";
import { HabitItemDbo } from "../HabitItemDbo";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { array } from "yup";

const queryByUserId = async (userId: string) => {
  const command = getCommand(userId);
  const response = await dynamoDbDocumentClient.send(command);
  const items = response.Items?.map((x) => unmarshall(x)) ?? [];

  const validated = await array(HabitItemDbo).validate([...items]);
  return validated ?? [];
};

export default queryByUserId;

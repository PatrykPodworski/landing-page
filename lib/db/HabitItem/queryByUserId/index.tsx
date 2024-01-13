import dynamoDbDocumentClient from "../../dynamoDbDocumentClient";
import getCommand from "./getCommand";
import HabitItemDbo from "../HabitItemDbo";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const queryByUserId = async (userId: string) => {
  const command = getCommand(userId);
  const response = await dynamoDbDocumentClient.send(command);
  const items = response.Items?.map((x) => unmarshall(x)) ?? [];

  // TODO: Validate type
  return items as HabitItemDbo[];
};

export default queryByUserId;

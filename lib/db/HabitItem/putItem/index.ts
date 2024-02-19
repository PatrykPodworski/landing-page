import dynamoDbDocumentClient from "../../dynamoDbDocumentClient";
import { marshall } from "@aws-sdk/util-dynamodb";
import { HabitItemDbo } from "../HabitItemDbo";
import { getCommand } from "./getCommand";

const putItem = async (dbo: HabitItemDbo) => {
  const item = marshall<HabitItemDbo>(dbo);
  const command = getCommand(item);
  await dynamoDbDocumentClient.send(command);
};

export default putItem;

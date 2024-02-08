import { ConditionalCheckFailedException } from "@aws-sdk/client-dynamodb";
import dynamoDbDocumentClient from "../../dynamoDbDocumentClient";
import { marshall } from "@aws-sdk/util-dynamodb";
import { HabitItemDbo } from "../HabitItemDbo";
import { getCommand } from "./getCommand";

// TODO: Validate existence based on habitId and date
// Because of DynamoDB's limitations, we have to:
// 1. get the item,
// 2. validate it,
// 3. decide if we should insert the new item or not.
const insertIfNotExists = async (dbo: HabitItemDbo) => {
  try {
    const item = marshall<HabitItemDbo>(dbo);
    const command = getCommand(item);
    await dynamoDbDocumentClient.send(command);
  } catch (error) {
    if (error instanceof ConditionalCheckFailedException) {
      // Item already exists
      return;
    }
    throw error;
  }
};

export default insertIfNotExists;

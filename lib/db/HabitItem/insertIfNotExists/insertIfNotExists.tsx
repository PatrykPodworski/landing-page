import { ConditionalCheckFailedException } from "@aws-sdk/client-dynamodb";
import dynamoDbDocumentClient from "../../dynamoDbDocumentClient";
import { marshall } from "@aws-sdk/util-dynamodb";
import HabitItemDbo from "../HabitItemDbo";
import { getCommand } from "./getCommand";

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

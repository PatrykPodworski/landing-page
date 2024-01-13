import { CompletedItem } from "@/models/Habit";
import getEnv from "@/utils/getEnv";
import {
  ConditionalCheckFailedException,
  PutItemCommand,
  PutItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import dynamoDbDocumentClient from "./dynamoDbDocumentClient";
import { marshall } from "@aws-sdk/util-dynamodb";
import HabitItemDbo from "./models/HabitItemDbo";

const insertItems = async (items: CompletedItem[]) => {
  const tableName = getEnv("TABLE_NAME");
  const userId = getEnv("USER_ID");

  for (const item of items) {
    await insertIfNotExists(item, tableName, userId);
  }
};

const insertIfNotExists = async (
  item: CompletedItem,
  tableName: string,
  userId: string
) => {
  try {
    const itemToPut = marshall<HabitItemDbo>({
      UserId: userId,
      Id: item.id,
      HabitName: item.name,
      Date: item.date.toISOString(),
      Day: item.day,
      Source: item.source,
    });

    const input: PutItemCommandInput = {
      TableName: tableName,
      Item: itemToPut,
      ConditionExpression: "attribute_not_exists(Id)",
    };

    await dynamoDbDocumentClient.send(new PutItemCommand(input));
  } catch (error) {
    if (error instanceof ConditionalCheckFailedException) {
      return;
    }
    throw error;
  }
};

export default insertItems;

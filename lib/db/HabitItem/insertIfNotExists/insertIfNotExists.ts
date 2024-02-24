import { ConditionalCheckFailedException } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import dynamoDbDocumentClient from "../../dynamoDbDocumentClient";
import { HabitItemDbo } from "../HabitItemDbo";
import querySingle from "../querySingle";
import QuerySingleParams from "../querySingle/QuerySingleParams";
import { getCommand } from "./getCommand";

const insertIfNotExists = async (dbo: HabitItemDbo) => {
  const existingItem = await getExistingItem(dbo);
  const alreadyExists = areEqual(dbo, existingItem);
  if (!alreadyExists) {
    await insert(dbo);
  }
};

const getExistingItem = async (dbo: HabitItemDbo) => {
  const params: QuerySingleParams = {
    userId: dbo.UserId,
    habitId: dbo.HabitId,
    day: dbo.Day,
    month: dbo.Month,
    year: dbo.Year,
  };

  const item = await querySingle(params);
  return item;
};

const areEqual = (a?: HabitItemDbo, b?: HabitItemDbo) => {
  if (!a || !b) {
    return false;
  }

  return (
    a.HabitId === b.HabitId &&
    a.UserId === b.UserId &&
    a.Day === b.Day &&
    a.Month === b.Month &&
    a.Year === b.Year
  );
};

const insert = async (dbo: HabitItemDbo) => {
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

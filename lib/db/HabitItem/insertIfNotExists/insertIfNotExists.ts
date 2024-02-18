import { ConditionalCheckFailedException } from "@aws-sdk/client-dynamodb";
import dynamoDbDocumentClient from "../../dynamoDbDocumentClient";
import { marshall } from "@aws-sdk/util-dynamodb";
import { HabitItemDbo } from "../HabitItemDbo";
import { getCommand } from "./getCommand";
import querySingle from "../querySingle";
import QuerySingleParams from "../querySingle/QuerySingleParams";

const insertIfNotExists = async (dbo: HabitItemDbo) => {
  const existingItem = await getExistingItem(dbo);
  const alreadyExists = areEqual(dbo, existingItem);
  if (!alreadyExists) {
    await insert(dbo);
  }
};

const getExistingItem = async (dbo: HabitItemDbo) => {
  if (!dbo.HabitId) {
    throw new Error("HabitId is required");
  }

  const params: QuerySingleParams = {
    userId: dbo.UserId,
    habitId: dbo.HabitId,
    day: dbo.Day,
    month: dbo.Month - 1,
    year: dbo.Year,
  };

  const item = await querySingle(params);
  return item;
};

const areEqual = (a?: HabitItemDbo, b?: HabitItemDbo) => {
  if (!a || !b) {
    return false;
  }

  if (!a.HabitId || !b.HabitId) {
    throw new Error("HabitId is required");
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

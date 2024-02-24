import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import getEnv from "@/utils/getEnv";
import dynamoDbDocumentClient from "../../dynamoDbDocumentClient";

// This is a one-time migration script to migrate all items to the new schema
const migrateItems = async (items: Record<string, any>[]) => {
  const itemsToMigrate = items.filter((x) => x.Year !== 2024);

  if (itemsToMigrate.length === 0) {
    return;
  }

  const tableName = getEnv("TABLE_NAME");

  for (const item of itemsToMigrate) {
    const command = new UpdateItemCommand({
      ExpressionAttributeNames: {
        "#M": "Month",
        "#Y": "Year",
      },
      ExpressionAttributeValues: {
        ":m": {
          N: "1",
        },
        ":y": {
          N: "2024",
        },
      },
      TableName: tableName,
      UpdateExpression: "SET #M = :m, #Y = :y",
      Key: {
        UserId: {
          S: item.UserId,
        },
        Id: {
          S: item.Id,
        },
      },
    });

    await dynamoDbDocumentClient.send(command);
  }
};

export default migrateItems;

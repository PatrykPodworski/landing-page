import { AttributeValue, PutItemCommand } from "@aws-sdk/client-dynamodb";
import getEnv from "@/utils/getEnv";

export const getCommand = (item: Record<string, AttributeValue>) => {
  const tableName = getEnv("TABLE_NAME");
  return new PutItemCommand({
    TableName: tableName,
    Item: item,
  });
};

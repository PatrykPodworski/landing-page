import getEnv from "@/utils/getEnv";
import { QueryCommand } from "@aws-sdk/client-dynamodb";

const getCommand = (userId: string) => {
  const tableName = getEnv("TABLE_NAME");

  return new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: "UserId = :UserId",
    ExpressionAttributeValues: {
      ":UserId": {
        S: userId,
      },
    },
  });
};

export default getCommand;

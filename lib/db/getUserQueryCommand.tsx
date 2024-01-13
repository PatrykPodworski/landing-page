import getEnv from "@/utils/getEnv";
import { QueryCommand } from "@aws-sdk/client-dynamodb";

// TODO: Validate and use it or remove it
const getUserQueryCommand = (userId: string) => {
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

export default getUserQueryCommand;

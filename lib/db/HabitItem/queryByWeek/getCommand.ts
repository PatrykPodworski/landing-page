import { QueryCommand } from "@aws-sdk/client-dynamodb";
import getEnv from "@/utils/getEnv";

const getCommand = (userId: string, week: number, year: number) => {
  const tableName = getEnv("TABLE_NAME");

  return new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: "#UserId = :UserId",
    FilterExpression: "#Week = :Week AND #Year = :Year",
    ExpressionAttributeNames: {
      "#UserId": "UserId",
      "#Week": "Week",
      "#Year": "Year",
    },
    ExpressionAttributeValues: {
      ":UserId": {
        S: userId,
      },
      ":Week": {
        N: week.toString(),
      },
      ":Year": {
        N: year.toString(),
      },
    },
  });
};

export default getCommand;

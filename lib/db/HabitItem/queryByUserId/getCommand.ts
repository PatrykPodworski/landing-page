import { QueryCommand } from "@aws-sdk/client-dynamodb";
import getEnv from "@/utils/getEnv";

const getCommand = (userId: string, month: number, year: number) => {
  const tableName = getEnv("TABLE_NAME");

  return new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: "#UserId = :UserId",
    FilterExpression: "#Month = :Month AND #Year = :Year",
    ExpressionAttributeNames: {
      "#UserId": "UserId",
      "#Month": "Month",
      "#Year": "Year",
    },
    ExpressionAttributeValues: {
      ":UserId": {
        S: userId,
      },
      ":Month": {
        N: month.toString(),
      },
      ":Year": {
        N: year.toString(),
      },
    },
  });
};

export default getCommand;

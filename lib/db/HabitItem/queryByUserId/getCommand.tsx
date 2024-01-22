import getEnv from "@/utils/getEnv";
import { QueryCommand } from "@aws-sdk/client-dynamodb";

// TODO: Add index for Month and Year
const getCommand = (
  userId: string,
  currentMonth: number,
  currentYear: number
) => {
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
        N: (currentMonth + 1).toString(),
      },
      ":Year": {
        N: currentYear.toString(),
      },
    },
  });
};

export default getCommand;

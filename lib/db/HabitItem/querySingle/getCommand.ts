import { QueryCommand } from "@aws-sdk/client-dynamodb";
import QuerySingleParams from "./QuerySingleParams";
import getEnv from "@/utils/getEnv";

// TODO: Add index for Year, Month, Day and HabitId
const getCommand = ({
  userId,
  habitId,
  year,
  month,
  day,
}: QuerySingleParams) => {
  const tableName = getEnv("TABLE_NAME");

  return new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: "#UserId = :UserId",
    FilterExpression:
      "#HabitId = :HabitId AND #Year = :Year AND #Month = :Month AND #Day = :Day",
    ExpressionAttributeNames: {
      "#UserId": "UserId",
      "#HabitId": "HabitId",
      "#Year": "Year",
      "#Month": "Month",
      "#Day": "Day",
    },
    ExpressionAttributeValues: {
      ":UserId": {
        S: userId,
      },
      ":HabitId": {
        S: habitId,
      },
      ":Year": {
        N: year.toString(),
      },
      ":Month": {
        N: month.toString(),
      },
      ":Day": {
        N: day.toString(),
      },
    },
  });
};

export default getCommand;

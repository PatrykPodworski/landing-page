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

// TODO: Refactor: Builder pattern
export const whereDayBetween = (
  query: QueryCommand,
  startDay: number,
  endDay: number
) => {
  const filterExpression =
    query.input.FilterExpression + " AND #Day BETWEEN :StartDay AND :EndDay";
  const expressionAttributeNames = {
    ...query.input.ExpressionAttributeNames,
    "#Day": "Day",
  };
  const expressionAttributeValues = {
    ...query.input.ExpressionAttributeValues,
    ":StartDay": { N: startDay.toString() },
    ":EndDay": { N: endDay.toString() },
  };

  return new QueryCommand({
    ...query.input,
    FilterExpression: filterExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
  });
};

export default getCommand;

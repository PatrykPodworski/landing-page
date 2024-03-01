import dynamoDbDocumentClient from "../../dynamoDbDocumentClient";
import serializeQueryResponse from "../utils/serializeQueryResponse";
import getCommand from "./getCommand";

const queryByWeek = async ({ userId, week, year }: QueryByWeekParams) => {
  const command = getCommand(userId, week, year);
  const response = await dynamoDbDocumentClient.send(command);
  const items = await serializeQueryResponse(response);

  return items;
};

type QueryByWeekParams = {
  userId: string;
  week: number;
  year: number;
};

export default queryByWeek;

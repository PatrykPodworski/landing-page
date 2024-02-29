import dynamoDbDocumentClient from "../../dynamoDbDocumentClient";
import serializeQueryResponse from "../utils/serializeQueryResponse";
import getCommand, { whereDayBetween } from "./getCommand";

const queryByUserId = async ({
  userId,
  month,
  year,
  startDay,
  endDay,
}: QueryByUserIdParams) => {
  let command = getCommand(userId, month, year);
  if (startDay && endDay) {
    command = whereDayBetween(command, startDay, endDay);
  }

  const response = await dynamoDbDocumentClient.send(command);
  const items = await serializeQueryResponse(response);

  return items;
};

export type QueryByUserIdParams = {
  userId: string;
  month: number;
  year: number;
  startDay?: number;
  endDay?: number;
};

export default queryByUserId;

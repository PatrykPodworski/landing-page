import dynamoDbDocumentClient from "../../dynamoDbDocumentClient";
import serializeQueryResponse from "../utils/serializeQueryResponse";
import getCommand, { whereDayBetween } from "./getCommand";

const queryByUserId = async (
  userId: string,
  currentMonth: number,
  currentYear: number,
  startDay?: number,
  endDay?: number
) => {
  let command = getCommand(userId, currentMonth, currentYear);
  if (startDay && endDay) {
    command = whereDayBetween(command, startDay, endDay);
  }

  const response = await dynamoDbDocumentClient.send(command);
  const items = await serializeQueryResponse(response);

  return items;
};

export default queryByUserId;

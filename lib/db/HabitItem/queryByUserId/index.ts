import dynamoDbDocumentClient from "../../dynamoDbDocumentClient";
import getCommand from "./getCommand";
import serializeQueryResponse from "../utils/serializeQueryResponse";

const queryByUserId = async (
  userId: string,
  currentMonth: number,
  currentYear: number
) => {
  const command = getCommand(userId, currentMonth, currentYear);
  const response = await dynamoDbDocumentClient.send(command);
  const items = await serializeQueryResponse(response);

  return items;
};

export default queryByUserId;

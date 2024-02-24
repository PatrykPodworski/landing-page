import dynamoDbDocumentClient from "../../dynamoDbDocumentClient";
import serializeQueryResponse from "../utils/serializeQueryResponse";
import getCommand from "./getCommand";

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

import dynamoDbDocumentClient from "../../dynamoDbDocumentClient";
import serializeQueryResponse from "../utils/serializeQueryResponse";
import QuerySingleParams from "./QuerySingleParams";
import getCommand from "./getCommand";

const querySingle = async (params: QuerySingleParams) => {
  const command = getCommand(params);
  const response = await dynamoDbDocumentClient.send(command);
  const items = await serializeQueryResponse(response);

  return items.at(0);
};

export default querySingle;

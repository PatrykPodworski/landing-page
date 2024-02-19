import { HabitItemDbo } from "..";
import dynamoDbDocumentClient from "../../dynamoDbDocumentClient";
import serializeQueryResponse from "../utils/serializeQueryResponse";
import QuerySingleParams from "./QuerySingleParams";
import getCommand from "./getCommand";

const getItemsFromDb = async (params: QuerySingleParams) => {
  const command = getCommand(params);
  const response = await dynamoDbDocumentClient.send(command);
  const items = await serializeQueryResponse(response);

  return items;
};

export const validateGetSingleItem = (items: HabitItemDbo[]) => {
  if (items.length > 1) {
    throw new Error("More than one item found");
  }

  const item = items.at(0);

  return item;
};

const querySingle = async (params: QuerySingleParams) => {
  const items = await getItemsFromDb(params);
  var item = validateGetSingleItem(items);

  return item;
};

export default querySingle;

import { InferType, array, date, object, string } from "yup";
import getEnv from "@/utils/getEnv";

const GET_ITEMS_URL = `https://api.todoist.com/sync/v9/completed/get_all`;

const getTodoistCompletedItems = async (): Promise<Item[]> => {
  const token = getEnv("TODOIST_TOKEN");
  const projectId = getEnv("TODOIST_PROJECT_ID");

  const url = new URL(GET_ITEMS_URL);
  url.searchParams.append("project_id", projectId);
  url.searchParams.append("limit", "200");

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { items } = await responseSchema.validate(await response.json(), {
    stripUnknown: true,
  });

  return items;
};

const responseItem = object({
  id: string().required(),
  content: string().required(),
  completed_at: date().required(),
});

const responseSchema = object({
  items: array(responseItem).required(),
});

export type Item = InferType<typeof responseItem>;

export default getTodoistCompletedItems;

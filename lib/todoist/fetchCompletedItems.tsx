import { InferType, array, date, object, string } from "yup";
import getEnv from "@/utils/getEnv";

const GET_ITEMS_URL = `https://api.todoist.com/sync/v9/completed/get_all`;

const fetchCompletedItems = async (since: Date) => {
  const token = getEnv("TODOIST_TOKEN");
  const projectId = getEnv("TODOIST_PROJECT_ID");

  const url = getUrl(projectId, since);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const { items } = await responseSchema.validate(await response.json());
  return items;
};

const getUrl = (projectId: string, since: Date) => {
  const url = new URL(GET_ITEMS_URL);
  url.searchParams.append("project_id", projectId);
  url.searchParams.append("limit", "200");
  url.searchParams.append("since", since.toISOString());

  return url;
};

const responseItem = object({
  id: string().required(),
  content: string().required(),
  completed_at: date().required(),
});

const responseSchema = object({
  items: array(responseItem).required(),
});

export type ResponseItem = InferType<typeof responseItem>;

export default fetchCompletedItems;

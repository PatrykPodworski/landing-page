const getEnv = (name: Env) => {
  const env = process.env[name];

  if (!env) {
    throw new MissingEnvError(`Missing ${name} environment variable`);
  }

  return env;
};

type Env =
  | "GA_MEASUREMENT_ID"
  | "TODOIST_TOKEN"
  | "TODOIST_PROJECT_ID"
  | "TODOIST_CLIENT_SECRET"
  | "TABLE_NAME"
  | "TEST_HABIT_ID"
  | "TEST_USER_ID"
  //temp
  | "USER_ID";

export class MissingEnvError extends Error {}

export default getEnv;

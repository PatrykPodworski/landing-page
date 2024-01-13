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
  //temp
  | "HABITS_SECRET"
  | "TABLE_NAME"
  | "USER_ID";

export class MissingEnvError extends Error {}

export default getEnv;

const getEnv = (name: Env) => {
  const env = process.env[name];

  if (!env) {
    throw new MissingEnvError(`Missing ${name} environment variable`);
  }

  return env;
};

type Env =
  | "PROTOCOL"
  | "VERCEL_URL"
  | "GA_MEASUREMENT_ID"
  | "TODOIST_TOKEN"
  | "TODOIST_PROJECT_ID"
  | "HABITS_SECRET";

export class MissingEnvError extends Error {}

export default getEnv;

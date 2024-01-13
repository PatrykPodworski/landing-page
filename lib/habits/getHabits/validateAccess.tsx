import getEnv from "@/utils/getEnv";

// TODO: Replace with userId
const validateAccess = (secret: string | undefined) => {
  const habitsSecret = getEnv("HABITS_SECRET");
  return secret === habitsSecret;
};

export default validateAccess;

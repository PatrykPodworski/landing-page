import { NextRequest, NextResponse } from "next/server";
import { MissingEnvError } from "./getEnv";

// TODO: Move to a middleware
const withEnvErrorHandling = <T,>(
  handler: (request: NextRequest) => Promise<T>
) => {
  return async (request: NextRequest) => {
    try {
      return await handler(request);
    } catch (error) {
      if (error instanceof MissingEnvError) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
  };
};

export default withEnvErrorHandling;

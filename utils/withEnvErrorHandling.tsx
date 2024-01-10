import { NextRequest, NextResponse } from "next/server";
import { MissingEnvError } from "./getEnv";

// TODO: Move to a middleware
const withEnvErrorHandling = <T,>(
  handler: (request: NextRequest) => Promise<NextResponse<T>>
) => {
  return async (request: NextRequest) => {
    try {
      return await handler(request);
    } catch (error) {
      if (error instanceof MissingEnvError) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      throw error;
    }
  };
};

export default withEnvErrorHandling;

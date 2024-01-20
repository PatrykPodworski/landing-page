import { NextRequest, NextResponse } from "next/server";
import { MissingEnvError } from "./getEnv";
import { MissingHeaderError } from "./getHeader";

const withErrorHandling = <T,>(
  handler: (request: NextRequest) => Promise<NextResponse<T>>
) => {
  return async (request: NextRequest) => {
    try {
      return await handler(request);
    } catch (error) {
      return errorHandler(error);
    }
  };
};

const errorHandler = (error: unknown) => {
  if (error instanceof MissingEnvError) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (error instanceof MissingHeaderError) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  throw error;
};

export default withErrorHandling;

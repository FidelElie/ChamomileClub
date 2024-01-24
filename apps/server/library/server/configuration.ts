import { NextApiResponse } from "next";

import { HttpException, NotFoundException } from "./exceptions";
import type { ApiRequest } from "./types";

export const handlerConfiguration = {
  onNoMatch: (_: ApiRequest) => {
    throw new NotFoundException("Route not found");
  },
  onError: (error: unknown, _: ApiRequest, res: NextApiResponse) => {
    const isStandardError = error instanceof Error;
    const isHTTPException = error instanceof HttpException;

    res.status(isHTTPException ? error.status : 500).json({
      ...(isHTTPException
        ? {
          status: error.status,
          message: error.message,
          metadata: error.metadata,
        }
        : {}),
      ...((process.env.NODE_ENV === "development" && isStandardError)
        ? {
          stack: error.stack,
        }
        : {}),
    });
  },
};

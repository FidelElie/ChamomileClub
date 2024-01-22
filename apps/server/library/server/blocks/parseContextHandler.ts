import { IncomingHttpHeaders } from "http";
import { NextApiResponse } from "next";

import { ApiRequest } from "../types";

// biome-ignore lint/suspicious/noExplicitAny: Will fix it in abit
export const parseContextHandler = (handler: ContextHandler<any>) => {
  return async <
    NextRequest extends ApiRequest = ApiRequest,
    NextResponse extends NextApiResponse = NextApiResponse,
  >(req: NextRequest, res: NextResponse) => {
    const { url, method, params, body, query, headers } = req;

    const result = await handler({ url, params, body, query, headers });

    res.status(method === "POST" ? 201 : 200).json(result);
  };
};

export type RequestEntities = {
  body?: unknown;
  params?: { [param: string]: string; };
  query?: { [query: string]: unknown; };
  headers?: IncomingHttpHeaders;
};

export type Context<T extends RequestEntities> = T & { url?: string; };

type ContextHandler<T extends RequestEntities> = (context: Context<T>) => unknown;

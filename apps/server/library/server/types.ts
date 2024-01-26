import { IncomingHttpHeaders } from "http";
import { NextApiRequest, NextApiResponse } from "next";

import { UserEntity } from "@thechamomileclub/api";

// Context Types
export type RequestEntities = {
  body?: unknown;
  params?: { [param: string]: string; };
  query?: { [query: string]: unknown; };
  headers?: IncomingHttpHeaders;
};

export type DefaultEntities = {
  body: unknown;
  params: { [param: string]: string; };
  query: { [query: string]: string | string[]; };
  headers: IncomingHttpHeaders;
};

export type ApiRequest<Entities extends RequestEntities = DefaultEntities> =
  & Omit<NextApiRequest, "body" | "query" | "headers">
  & Entities;

export type ApiRequestWithAuth<
  Entities extends RequestEntities = DefaultEntities,
> = ApiRequest<Entities> & {
  auth?: { session: string; user: UserEntity; };
};

export type Context<
  E extends RequestEntities = DefaultEntities,
  T extends ApiRequest = ApiRequest,
> = E & {
  url: T["url"];
  method: T["method"];
  $request: T;
};

// Middleware Types
export type Middleware<
  NextRequest extends ApiRequest = ApiRequest,
  NextResponse extends NextApiResponse = NextApiResponse,
> = (req: NextRequest, res: NextResponse, next: () => void) => unknown;

// Controller Types
export type ControllerOptions<
  NextRequest extends ApiRequest = ApiRequest,
  NextResponse extends NextApiResponse = NextApiResponse,
> = {
  middlewares?: Middleware<NextRequest, NextResponse>[];
};

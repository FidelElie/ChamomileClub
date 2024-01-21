import { IncomingHttpHeaders } from "http";
import { NextApiRequest } from "next";

import { UserEntity } from "@thechamomileclub/api";

import { RequestEntities } from "./blocks";

type DefaultEntities = {
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
  auth: { session: string; user: UserEntity; } | null;
};

import { NextApiRequest } from "next";
import { IncomingHttpHeaders } from "http";

import { UserEntity } from "@thechamomileclub/api";

export type RequestEntities = {
  body?: any;
  params?: { [param: string]: string };
  query?: { [query: string]: any };
  headers?: IncomingHttpHeaders;
};

type DefaultEntities = {
  body: any;
  params: { [param: string]: string };
  query: { [query: string]: string | string[] };
  headers: IncomingHttpHeaders;
};

export type ApiRequest<Entities extends RequestEntities = DefaultEntities> =
  Omit<NextApiRequest, "body" | "query" | "headers"> & Entities;

export type ApiRequestWithAuth<
  Entities extends RequestEntities = DefaultEntities,
> = ApiRequest<Entities> & {
  auth: { session: string; user: UserEntity } | null;
};

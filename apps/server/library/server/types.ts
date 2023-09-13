import { NextApiRequest } from "next";
import { IncomingHttpHeaders } from "http";

import { UserSchema } from "@thechamomileclub/api";

export type RequestEntities = {
	body?: any;
	params?: { [param: string]: string };
	query?: { [query: string]: string | string[] };
	headers?: IncomingHttpHeaders
}

type DefaultEntities = { body: any, params: {}, query: {}, headers: IncomingHttpHeaders }

export type ApiRequest<
	Entities extends RequestEntities = DefaultEntities
> = Omit<NextApiRequest, "body" | "query" | "headers"> & Entities;

export type ApiRequestWithAuth<
	Entities extends RequestEntities = DefaultEntities
> = ApiRequest<Entities> & {
	auth: { session: string; user: UserSchema } | null
}
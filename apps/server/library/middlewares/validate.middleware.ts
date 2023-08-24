import type { NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import type { ZodType } from "@thechamomileclub/api";
import { unprocessableEntityResponse, ApiRequest } from "../server";

export type RequestEntities = {
	body?: ZodType;
	query?: ZodType;
	params?: ZodType;
	headers?: ZodType;
}

export const validateRequestEntities = (entities: RequestEntities) => {
	const {
		body: validateBody,
		query: validateQuery,
		params: validateParams,
		headers: validateHeaders
	} = entities;

	const passThrough = { success: true, data: null };

	return (req: ApiRequest, res: NextApiResponse, next: NextHandler) => {
		const {
			body: contextBody,
			query: contextQuery,
			params: contextParams,
			headers: contextHeaders
		} = req;

		const body = validateBody ? validateBody.safeParse(contextBody) : passThrough;

		const query = validateQuery ? validateQuery.safeParse(contextQuery) : passThrough;

		const params = validateParams ? validateParams.safeParse(contextParams) : passThrough;

		const headers = validateHeaders ? validateHeaders.safeParse(contextHeaders) : passThrough;

		if (!body.success || !query.success || !params.success || !headers.success) {
			return unprocessableEntityResponse(res, "Body, query, params or headers are invalid");
		}

		if (body.data) { req.body = { ...(contextBody || {}), ...body.data } }

		if (query.data) { req.query = { ...contextQuery, ...query.data } }

		if (params.data) { req.params = { ...contextParams, ...params.data } }

		if (headers.data) { req.headers = { ...contextHeaders, ...headers.data } }

		next();
	}
}

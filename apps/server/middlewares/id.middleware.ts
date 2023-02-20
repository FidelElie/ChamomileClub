import { getXataClient, type User, type XataClient } from "@thechamomileclub/database";

import type { NextApiRequest, NextApiResponse } from "next";
import type { NextFunction } from "next-api-decorators";

type ExtendedNextApiRequest = NextApiRequest & { user: null | User }

export const identificationMiddleware = (injectClient?: XataClient) => {
	return async (req: ExtendedNextApiRequest, _: NextApiResponse, next: NextFunction) => {
		const client = injectClient ? injectClient : getXataClient();

		req.user = null;

		const authorizationHeader = req.headers["authorization"];

		if (authorizationHeader) {

		}

		next();
	}
}

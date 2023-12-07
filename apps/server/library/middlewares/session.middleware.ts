import type { NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import { z, SessionSchema, UserSchema } from "@thechamomileclub/api";
import { getXataClient } from "@thechamomileclub/database";

import { verifyToken } from "@/services";
import type { ApiRequestWithAuth } from "../server";

const { db } = getXataClient();

export const exposeSession = async (
	req: ApiRequestWithAuth,
	_: NextApiResponse,
	next: NextHandler
) => {
	const { authorization } = req.headers;

	if (!authorization) { return next(); }

	const token = authorization.replace("Bearer ", "");

	if (!token) { return next(); }

	const { decoded, error } = verifyToken<{ session: string }>(token);

	if (error) { return next(); }

	const sessionWithUserSchema = SessionSchema.merge(z.object({
		user: UserSchema
	}));

	const databaseSession = await db.sessions
		.filter({ id: decoded!.session, $notExists: "deletedAt" })
		.select(["*", "user.*"])
		.getFirst();

	const sessionResult = sessionWithUserSchema.safeParse(databaseSession);

	if (!sessionResult.success) {
		console.log(sessionResult.error);
		return next();
	}

	req.auth = { session: sessionResult.data.id, user: sessionResult.data.user }

	next();
}

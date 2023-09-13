import { NextApiResponse } from "next";

import { getXataClient } from "@thechamomileclub/database";
import {
	InferDTOs,
	KeySchema,
	SessionSchema,
	UserSchema,
	StartAuthProcessInterfaces,
	ValidateLoginCodeInterfaces,
	UpdateCurrentUserInterfaces
} from "@thechamomileclub/api";

import { generateRandomString, signToken, verifyToken } from "@/library/services";
import {
	ApiRequest,
	ApiRequestWithAuth,
	badRequestResponse,
	createdResponse,
	notFoundResponse,
	unauthorisedResponse,
	unprocessableEntityResponse,
} from "@/library/server";

const { db } = getXataClient();

/** GET /auth: Get current authenticated user */
export const getCurrentUser = (req: ApiRequestWithAuth, res: NextApiResponse) => {
	res.status(200).json({
		session: req.auth?.session || null,
		user: req.auth?.user || null
	});
}

/** POST /auth: Start Auth Process for creating login codes */
export const startAuthProcess = async (
	req: ApiRequest<InferDTOs<typeof StartAuthProcessInterfaces>>,
	res: NextApiResponse
) => {
	const { email } = req.body;

	const userWithEmail = await db.users.filter({ email }).getFirst();

	if (!userWithEmail) { return notFoundResponse(res, "User not found"); }

	const userResult = UserSchema.safeParse(userWithEmail);

	if (!userResult.success) { return unprocessableEntityResponse(res, "User invalid"); }

	const existingAccessKeys = await db.keys.filter({ user: userWithEmail.id }).getAll();

	await db.keys.delete(existingAccessKeys.map(key => key.id));

	const accessKey = await db.keys.create(
		{
			code: generateRandomString(6),
			user: { id: userResult.data.id },
			token: signToken({ id: userResult.data.id, email: userResult.data.email })
		} satisfies Pick<KeySchema, "code" | "user" | "token">
	);

	const payload = {
		keyId: accessKey.id,
		forename: userResult.data.forename
	} satisfies InferDTOs<typeof StartAuthProcessInterfaces>["response"];

	return createdResponse(res, payload);
}

/** PUT /auth: Validate login provided login and authenticate user */
export const validateLoginCode = async (
	req: ApiRequest<InferDTOs<typeof ValidateLoginCodeInterfaces>>,
	res: NextApiResponse
) => {
	const { keyId, code } = req.body;

	const correspondingKey = await db.keys.read(keyId);

	if (!correspondingKey) { return badRequestResponse(res, "Key not found"); }

	const { token, code: keyCode } = KeySchema.parse(correspondingKey);

	const { decoded, error } = verifyToken<Pick<UserSchema, "id" | "email">>(token!);

	if (error || keyCode !== code) { return unauthorisedResponse(res, "Invalid code"); }

	const newSession = await db.sessions.create(
		{ user: { id: decoded!.id } } satisfies Pick<SessionSchema, "user">
	);

	const sessionToken = signToken({ session: newSession.id });

	await db.keys.delete(keyId);

	const payload = {
		token: sessionToken
	} satisfies InferDTOs<typeof ValidateLoginCodeInterfaces>["response"];

	return createdResponse(res, payload);
}

/** PATCH /auth: Update authenticated user information  */
export const updateCurrentUser = async (
	req: ApiRequestWithAuth<InferDTOs<typeof UpdateCurrentUserInterfaces>>,
	res: NextApiResponse
) => {
	if (!req.auth) { return unauthorisedResponse(res, "No user auth"); }

	await db.users.update(req.auth.user.id, req.body);

	return res.status(204).end();
}

/** DELETE /auth Logout current authenticated user */
export const logoutUser = async (
	req: ApiRequestWithAuth,
	res: NextApiResponse
) => {
	if (!req.auth) { return badRequestResponse(res, "No session found"); }

	await db.sessions.update(req.auth.session, { deletedAt: new Date() });

	return res.status(204).end();
}

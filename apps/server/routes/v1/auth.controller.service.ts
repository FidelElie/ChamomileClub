import { NextApiRequest, NextApiResponse } from "next";

import { getXataClient } from "@thechamomileclub/database";
import {
	KeySchema,
	SessionSchema,
	UserSchema,
	StartAuthProcessInterfaces,
	ValidateLoginCodeInterfaces
} from "@thechamomileclub/api";

import type { RequestWithAuth } from "@/library/types";
import { generateRandomString, signToken, verifyToken } from "@/library/services";
import {
	BadRequestException,
	NotFoundException,
	UnauthorisedException,
} from "@/library/server";

const { db } = getXataClient();

/** Get current authenticated user */
export const getCurrentUser = async (req: RequestWithAuth, res: NextApiResponse) => {
	res.status(200).json({
		session: req.auth?.session || null,
		user: req.auth?.user || null
	});
}

/** Start Auth Process for creating login codes */
export const startAuthProcess = async (req: NextApiRequest, res: NextApiResponse) => {
	const { email } = StartAuthProcessInterfaces.body.parse(req.body);

	const userWithEmail = await db.users.filter({ email }).getFirst();

	if (!userWithEmail) { throw new NotFoundException("User not found"); }

	const existingAccessKeys = await db.keys.filter({ user: userWithEmail.id }).getAll();

	await db.keys.delete(existingAccessKeys.map(key => key.id));

	const accessKey = await db.keys.create(
		{
			code: generateRandomString(6),
			user: { id: userWithEmail.id },
			token: signToken({ id: userWithEmail.id, email: userWithEmail.email })
		} satisfies Pick<KeySchema, "code" | "user" | "token">
	);

	res.status(201).json({ keyId: accessKey.id, forename: userWithEmail.forename });
}

/** Validate login provided login and authenticate user */
export const validateLoginCode = async (req: NextApiRequest, res: NextApiResponse) => {
	const { keyId, code } = ValidateLoginCodeInterfaces.body.parse(req.body);

	const correspondingKey = await db.keys.read(keyId);

	if (!correspondingKey) { throw new BadRequestException("Key not found"); }

	const { token, code: keyCode } = KeySchema.parse(correspondingKey);

	const { decoded, error } = verifyToken<Pick<UserSchema, "id" | "email">>(token!);

	if (error || keyCode !== code) { throw new UnauthorisedException("Invalid token"); }

	const newSession = await db.sessions.create(
		{ user: { id: decoded!.id } } satisfies Pick<SessionSchema, "user">
	);

	const sessionToken = signToken({ session: newSession.id })

	res.status(201).json({ token: sessionToken });
}

/** Update authenticated user information  */
export const updateCurrentUser = async (req: RequestWithAuth, res: NextApiResponse) => {
	if (!req.auth) { return res.status(403).end(); }

	await db.users.updateOrThrow(req.auth.user.id, req.body);
}

/** Logout current authenticated user */
export const logoutUser = async (req: RequestWithAuth, res: NextApiResponse) => {
	if (!req.auth) { throw new BadRequestException("No session found"); }

	await db.sessions.delete(req.auth.session);

	return res.status(204).end();
}

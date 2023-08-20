import { NextApiRequest, NextApiResponse } from "next";

import { getXataClient } from "@thechamomileclub/database";
import {
	KeySchema,
	SessionSchema,
	UserSchema,
	StartAuthProcessInterfaces,
	ValidateLoginCodeInterfaces
} from "@thechamomileclub/api";

import { generateRandomString, signToken, verifyToken } from "@/library/services";

const { db } = getXataClient();

export const getCurrentUser = async (req: NextApiRequest, res: NextApiResponse) => {


	res.status(200).json(null);
}

export const startAuthProcess = async (req: NextApiRequest, res: NextApiResponse) => {
	const { email } = StartAuthProcessInterfaces.body.parse(req.body);

	const userWithEmail = await db.users.filter({ email }).getFirst();

	if (!userWithEmail) { return res.status(404).json({ code: "USER_NOT_FOUND" }); }

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

export const validateLoginCode = async (req: NextApiRequest, res: NextApiResponse) => {
	const { keyId, code } = ValidateLoginCodeInterfaces.body.parse(req.body);

	const correspondingKey = await db.keys.read(keyId);

	if (!correspondingKey) { throw new Error("Key not found"); }

	const { token, code: keyCode } = KeySchema.parse(correspondingKey);

	const { decoded, error } = verifyToken<Pick<UserSchema, "id" | "email">>(token!);

	if (error || keyCode !== code) { throw new Error("Invalid Token"); }

	const newSession = await db.sessions.create(
		{ user: { id: decoded!.id } } satisfies Pick<SessionSchema, "user">
	);

	res.status(201).json({ sessionId: newSession.id });
}

export const updateCurrentUser = async (req: NextApiRequest, res: NextApiResponse) => {

}

export const logoutUser = () => {

}

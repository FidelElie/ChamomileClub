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
}

export const startAuthProcess = async (req: NextApiRequest, res: NextApiResponse) => {
	const { email } = StartAuthProcessInterfaces.body.parse(req.body);

	const userWithEmail = await db.users.filter({ email }).getFirst();

	if (!userWithEmail) { return res.status(404).json({ code: "USER_NOT_FOUND" }); }

	const accessKey = await db.keys.create(
		{
			code: generateRandomString(6),
			user: { id: userWithEmail.id },
			token: signToken({ id: userWithEmail.id, email: userWithEmail.email, }, { expiresIn: 300 })
		} satisfies Pick<KeySchema, "code" | "user" | "token">
	);

	res.status(201).json({ keyId: accessKey.id });
}

export const validateLoginCode = async (req: NextApiRequest, res: NextApiResponse) => {
	const { keyId, code } = ValidateLoginCodeInterfaces.body.parse(req.body);

	const correspondingKey = await db.keys.filter({ id: keyId }).getFirst();

	if (!correspondingKey) { throw new Error("Key not found"); }

	const { token, code: keyCode } = KeySchema.parse(correspondingKey);

	const { decoded, error } = verifyToken<Pick<UserSchema, "id" | "email">>(token);

	if (error || keyCode !== code) { throw new Error("Invalid Token"); }

	const newSession = await db.sessions.create(
		{ user: { id: decoded!.id } } satisfies Pick<SessionSchema, "user">
	);

	res.status(201).json({ sessionId: newSession.id });
}

export const updateCurrentUser = async (req: NextApiRequest, res: NextApiResponse) => {

}

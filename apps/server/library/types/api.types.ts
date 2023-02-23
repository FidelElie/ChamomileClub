import type { NextApiRequest } from "next";

export type UserClaims = {
	id: string,
	email: string
}

export type ApiRequestWithUser = NextApiRequest & {
	user: UserClaims | null
};

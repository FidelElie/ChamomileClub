import { RoleNames } from "@thechamomileclub/database";

import type { NextApiRequest } from "next";

export type UserClaims = {
	id: string,
	email: string,
	roles: RoleNames[]
}

export type ApiRequestWithUser = NextApiRequest & {
	user: UserClaims | null
};

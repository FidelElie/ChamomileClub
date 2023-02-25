import { RolesSchemaType } from "@thechamomileclub/api";

import type { NextApiRequest } from "next";

export type UserClaims = {
	id: string,
	email: string,
	roles: RolesSchemaType[]
}

export type ApiRequestWithUser = NextApiRequest & {
	user: UserClaims | null
};

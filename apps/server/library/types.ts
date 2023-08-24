import type { NextApiRequest } from "next";

import type { UserSchema } from "@thechamomileclub/api";

export type RequestWithAuth = NextApiRequest & {
	auth: { session: string; user: UserSchema } | null
}

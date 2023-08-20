import { z } from "zod";

import { UserSchema } from "../schemas";

export const GetCurrentUserInterfaces = {
	response: z.union([UserSchema, z.literal(null)])
}

export const StartAuthProcessInterfaces = {
	body: z.object({ email: z.string().email() }),
	response: z.object({ keyId: z.string(), forename: z.string() })
}

export const ValidateLoginCodeInterfaces = {
	body: z.object({ keyId: z.string(), code: z.string() }),
	response: z.object({ sessionId: z.string() })
}

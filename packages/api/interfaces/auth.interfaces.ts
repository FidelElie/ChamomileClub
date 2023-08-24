import { z } from "zod";

import { UserSchema } from "../schemas";

export const GetCurrentUserInterfaces = {
	response: z.union([
		z.object({ session: z.string(), user: UserSchema }),
		z.object({ session: z.null(), user: z.null() })
	])
}

export const StartAuthProcessInterfaces = {
	body: z.object({ email: z.string().email() }),
	response: z.object({ keyId: z.string(), forename: z.string() })
}

export const ValidateLoginCodeInterfaces = {
	body: z.object({ keyId: z.string(), code: z.string() }),
	response: z.object({ token: z.string() })
}

export const UpdateCurrentUserInterfaces = {
	body: UserSchema.pick({ nickname: true, active: true }).partial(),
	response: z.void()
}

export const LogoutUserInterfaces = {
	response: z.void()
}

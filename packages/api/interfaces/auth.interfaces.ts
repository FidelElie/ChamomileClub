import { email, object, string } from "valibot";

export const StartAuthProcessInterfaces = {
	body: object({ email: string([email()]) }),
	response: object({ keyId: string() })
}

export const ValidateLoginCodeInterfaces = {
	body: object({ keyId: string(), code: string() }),
	response: object({ sessionId: string() })
}

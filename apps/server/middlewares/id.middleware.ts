import { AuthHelpers } from "@/library/utilities";
import type { ApiRequestWithUser, UserClaims } from "@/library/types/api.types";
import type { Middleware } from "@/library/types/router.types";

export const identificationMiddleware: Middleware<ApiRequestWithUser> = (req, _, next) => {
	req.user = null;

	const authorizationHeader = req.headers["authorization"];

	if (authorizationHeader) {
		const token = authorizationHeader.split(" ").at(-1);

		if (token) {
			AuthHelpers.verifyToken<UserClaims>(
				token,
				{ onSuccess: (decoded) => { req.user = decoded; } }
			);
		}
	}

	next();
}

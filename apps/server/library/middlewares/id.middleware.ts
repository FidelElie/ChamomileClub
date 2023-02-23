import type { ApiRequestWithUser, UserClaims } from "@/library/types/api.types";
import type { Middleware } from "@/library/types/router.types";

import { AuthService } from "@/services";

type CreateIdentificationMiddleware = (authService: AuthService) => Middleware<ApiRequestWithUser>

export const createIdentificationMiddleware: CreateIdentificationMiddleware = (
	authService
 ) => {
	return (req, _, next) => {
		req.user = null;

		const authorizationHeader = req.headers["authorization"];

		if (authorizationHeader) {
			const token = authorizationHeader.split(" ").at(-1);

			if (token) {
				authService.verifyToken<UserClaims>(
					token,
					{ onSuccess: (decoded) => { req.user = decoded; } }
				);
			}
		}

		next();
	}
}

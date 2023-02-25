import { parseCookies } from "nookies";

import type { ApiRequestWithUser, UserClaims } from "@/library/types/api.types";
import type { Middleware } from "@/library/types/router.types";

import { AuthService } from "@/services";

type CreateIdentificationMiddleware = (authService: AuthService) => Middleware<ApiRequestWithUser>

export const createIdentificationMiddleware: CreateIdentificationMiddleware = (authService) => {
	return (req, _, next) => {
		const cookies = parseCookies({ req });

		req.user = null;

		const accessToken = cookies["access-token"];

		if (accessToken) {
			if (accessToken) {
				authService.verifyToken<UserClaims>(
					accessToken,
					{ onSuccess: (decoded) => { req.user = decoded; } }
				);
			}
		}

		next();
	}
}

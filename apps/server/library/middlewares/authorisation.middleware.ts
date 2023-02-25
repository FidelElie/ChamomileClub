import type { RolesSchemaType } from "@thechamomileclub/api";
import { ForbiddenException, UnauthorizedException } from "next-api-decorators";

import { ApiRequestWithUser } from "../types/api.types";
import { Middleware } from "../types/router.types";

type CreateAuthorisationMiddleware = (role?: RolesSchemaType) => Middleware<ApiRequestWithUser>;

export const createAuthorizationMiddleware: CreateAuthorisationMiddleware = (role) => {
	return (req, _, next) => {
		if (!req.user) { throw new UnauthorizedException(); }

		const { roles } = req.user;

		if (role) {
			switch (role) {
				case "admin":
					ensureAuthorizationHierarchy(roles, role);
					break;
				case "founder":
					ensureAuthorizationHierarchy(roles, role, ["admin"]);
					break;
				case "editor":
					ensureAuthorizationHierarchy(roles, role, ["admin"]);
					break;
				case "team":
					ensureAuthorizationHierarchy(roles, role, ["admin", "founder"]);
					break;
				case "member":
					ensureAuthorizationHierarchy(roles, role, ["admin", "founder", "team"]);
					break;
				case "prospect":
					ensureAuthorizationHierarchy(roles, role, ["admin", "founder", "team", "member"]);
					break;
			}
		}

		next();
	}
}

const ensureAuthorizationHierarchy = (
	userRole: RolesSchemaType[],
	roleLevel: RolesSchemaType,
	higher?: RolesSchemaType[]
) => {
	const userHasRole = userRole.includes(roleLevel);
	const userHasHigherOrderRole = higher ? higher.some(role => userRole.includes(role)) : false;

	if (!userHasRole && !userHasHigherOrderRole) { throw new ForbiddenException(); }
}

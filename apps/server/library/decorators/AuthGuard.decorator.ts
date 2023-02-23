import { createMiddlewareDecorator } from "next-api-decorators";

import { RoleNames } from "@thechamomileclub/database";

import { createAuthorizationMiddleware } from "../middlewares/authorisation.middleware";

export const AuthGuard = (role: RoleNames) => createMiddlewareDecorator(
	createAuthorizationMiddleware(role)
)


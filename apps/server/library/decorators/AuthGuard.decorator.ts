import { createMiddlewareDecorator } from "next-api-decorators";

import { RolesSchemaType } from "@thechamomileclub/api";

import { createAuthorizationMiddleware } from "../middlewares/authorisation.middleware";

export const AuthGuard = (role: RolesSchemaType) => createMiddlewareDecorator(
	createAuthorizationMiddleware(role)
)


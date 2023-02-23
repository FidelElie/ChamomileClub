import { Get, Post } from "next-api-decorators";
import { autoInjectable } from "tsyringe";

import {
	AuthenticateBodySchema,
	type AuthenticateBody,
	StartLoginBodySchema,
	type StartLoginBody,
	VerifyLoginQuerySchema,
	type VerifyLoginQuery,
} from "@thechamomileclub/api";

import { Controller, User, ValidatedBody, ValidatedQuery } from "@/library/decorators";
import type { UserClaims } from "@/library/types/api.types";

import AuthControllerService from "./auth.controller.service";

const baseUrl = "/auth";

@autoInjectable()
@Controller(baseUrl)
export default class AuthController {
	constructor(private readonly authControllerService: AuthControllerService) {}

	@Get(baseUrl)
	async getCurrentUser(@User() user: UserClaims | null) {
		return await this.authControllerService.getCurrentUser(user);
	}

	@Post(baseUrl)
	async authenticate(@ValidatedBody(AuthenticateBodySchema)() body: AuthenticateBody) {
		return await this.authControllerService.authenticateUser(body);
	}

	@Post(`${baseUrl}/login`)
	async startLogin(@ValidatedBody(StartLoginBodySchema)() body: StartLoginBody) {
		return await this.authControllerService.sendLoginRequest(body);
	}

	@Get(`${baseUrl}/login`)
	async verifyLoginAttempt(@ValidatedQuery(VerifyLoginQuerySchema)() query: VerifyLoginQuery) {
		return await this.authControllerService.verifyLogin(query);
	}
}

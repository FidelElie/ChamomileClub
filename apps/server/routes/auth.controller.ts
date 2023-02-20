import { Get, Post } from "next-api-decorators";

import { getXataClient, XataClient } from "@thechamomileclub/database";
import {
	AuthenticateBodySchema,
	type AuthenticateBody,
	StartLoginBodySchema,
	type StartLoginBody,
	VerifyLoginQuerySchema,
	type VerifyLoginQuery,
} from "@thechamomileclub/api";

import { Controller, ValidatedBody, ValidatedQuery } from "@/library/core";

import { AuthService, EmailService, KeyService, UserService } from "@/services";

import AuthControllerService from "./auth.controller.service";

const baseUrl = "/auth";

@Controller(baseUrl)
export default class AuthController {
	authControllerService: AuthControllerService;

	constructor(injectClient: XataClient) {
		const client = injectClient || getXataClient();
		const userService = new UserService(client);
		const keyService = new KeyService(client);
		const authService = new AuthService();
		const emailService = new EmailService();

		const deps = { client, userService, authService, keyService, emailService };

		this.authControllerService = new AuthControllerService(deps);
	}

	@Get(baseUrl)
	async getCurrentUser() {
		return await this.authControllerService.getCurrentUser();
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

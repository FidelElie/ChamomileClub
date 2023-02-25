import {
	Get,
	Post,
	BadRequestException,
	ForbiddenException,
	InternalServerErrorException
} from "next-api-decorators";
import { autoInjectable } from "tsyringe";

import {
	AuthenticateBodySchema,
	type AuthenticateBody,
	StartLoginBodySchema,
	type StartLoginBody,
	VerifyLoginQuerySchema,
	type VerifyLoginQuery,
	UserSchemaType,
	AuthenticateResponseSchema,
	VerifyLoginResponseSchema,
} from "@thechamomileclub/api";

import { Controller, User, ValidatedBody, ValidatedQuery } from "@/library/decorators";
import type { UserClaims } from "@/library/types/api.types";
import { validateSchema } from "@/library/utilities";

import { AuthService, EmailService, KeyService, UserService } from "@/services";

const baseUrl = "/auth";

@autoInjectable()
@Controller(baseUrl)
export default class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly keyService: KeyService,
		private readonly emailService: EmailService
	) { }

	@Get(baseUrl)
	async getCurrentUser(@User() user: UserClaims | null): Promise<UserSchemaType | null > {
		if (!user) { return null; }

		const { id } = user;

		const userInformation = this.userService.getUserById(id);

		return userInformation;
	}

	@Post(baseUrl)
	async authenticate(@ValidatedBody(AuthenticateBodySchema)() body: AuthenticateBody) {
		const { id, code, user: userPayload } = body;
		await this.keyService.getKeyAndValidate(id, code);

		const user = await (
			userPayload ?
				this.userService.updateUserById(id, { ...userPayload, active: true }) :
				this.userService.getUserById(id)
		);

		if (!user) { throw new InternalServerErrorException("User was not found"); }

		const payload = { id: user.id, email: user.email, roles: user.roles }

		const accessToken = this.authService.signToken(payload, { expiresIn: "5m" });

		return validateSchema({ token: accessToken }, AuthenticateResponseSchema);
	}

	@Post(`${baseUrl}/login`)
	async startLoginRequest(@ValidatedBody(StartLoginBodySchema)() { email }: StartLoginBody) {
		const user = await this.userService.getUserByEmail(email);

		const challenge = this.authService.generateRandomString(25);

		const token = this.authService.signToken({ id: user.id, email }, { expiresIn: "10m" });

		const accessKey = await this.keyService.generateKey({ challenge, user: user.id, token });

		const magicLink = this.authService.generateAuthLink(accessKey);

		const { error } = await this.emailService.sendMagicLink({
			to: { name: user.forename, email: user.email },
			model: {
				name: user.forename,
				link: magicLink
			}
		});

		if (error) {
			await this.keyService.deleteInvalidatedKey(accessKey.id);
			throw new InternalServerErrorException("Error sending email");
		}

		return null;
	}

	@Get(`${baseUrl}/login`)
	async verifyLoginAttempt(@ValidatedQuery(VerifyLoginQuerySchema)() query: VerifyLoginQuery) {
		const { id, code } = query;

		if (!id || !code) { throw new BadRequestException("Missing id and code combination"); }

		const key = await this.keyService.getKeyAndValidate(id, code);

		const { decoded } = this.authService.verifyToken<{ id: string, email: string }>(
			key.token,
			{ error: new ForbiddenException("Access key has expired") }
		)

		const user = await this.userService.getUserById(decoded!.id);

		return validateSchema({
			id: user.id,
			state: user.active ? "login" : "registration",
			user: {
				forename: user.forename,
				surname: user.surname,
				email: user.email!,
				nickname: user.nickname,
				description: user.description
			}
		}, VerifyLoginResponseSchema)
	}
}

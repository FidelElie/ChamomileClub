import {
	BadRequestException,
	ForbiddenException,
	InternalServerErrorException
} from "next-api-decorators";
import { autoInjectable } from "tsyringe";

import {
	type AuthenticateBody,
	type AuthenticateResponse,
	AuthenticateResponseSchema,
	type StartLoginBody,
	type StartLoginResponse,
	type VerifyLoginQuery,
	type VerifyLoginResponse,
	VerifyLoginResponseSchema,
	UserSchemaType
} from "@thechamomileclub/api";

import type { UserClaims } from "@/library/types/api.types";

import { AuthService, EmailService, KeyService, UserService } from "@/services";

@autoInjectable()
export default class AuthControllerService {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly keyService: KeyService,
		private readonly emailService: EmailService
	) { }

	async getCurrentUser(payload: UserClaims | null): Promise<UserSchemaType | null> {
		if (!payload) { return null; }

		const { id } = payload;

		const user = this.userService.getUserById(id);

		return user;
	}

	async authenticateUser(body: AuthenticateBody): Promise<AuthenticateResponse> {
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

		return AuthenticateResponseSchema.parse({ token: accessToken });
	}

	async sendLoginRequest({ email }: StartLoginBody): Promise<StartLoginResponse> {
		const user = await this.userService.getUserByEmail(email);

		const challenge = this.authService.encryptString(this.authService.generateRandomString(25));

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

	async verifyLogin({ id, code }: VerifyLoginQuery) : Promise<VerifyLoginResponse> {
		if(!id || !code) { throw new BadRequestException("Missing id and code combination"); }

		const key = await this.keyService.getKeyAndValidate(id, this.authService.decryptString(code));

		const { decoded } = this.authService.verifyToken<{id: string, email: string}>(
			key.token,
			{ error: new ForbiddenException("Access key has expired") }
		)

		const user = await this.userService.getUserById(decoded!.id);

		return VerifyLoginResponseSchema.parse({
			id: user.id,
			state: user.active ? "login" : "registration",
			user: {
				forename: user.forename,
				surname: user.surname,
				email: user.email!,
				nickname: user.nickname,
				description: user.description
			}
		});
	}
}

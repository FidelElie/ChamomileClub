import {
	BadRequestException,
	ForbiddenException,
	InternalServerErrorException
} from "next-api-decorators";

import type { XataClient } from "@thechamomileclub/database";
import {
	AuthenticateBody,
	AuthenticateResponse,
	AuthenticateResponseSchema,
	StartLoginBody,
	StartLoginResponse,
	StartLoginResponseSchema,
	VerifyLoginQuery,
	VerifyLoginResponse,
	VerifyLoginResponseSchema
} from "@thechamomileclub/api";

import { AuthService, EmailService, KeyService, UserService } from "@/services";

export interface ControllerServiceDependants {
	client: XataClient,
	userService: UserService,
	authService: AuthService,
	keyService: KeyService,
	emailService: EmailService
}

export default class AuthControllerService {
	constructor(private readonly deps: ControllerServiceDependants) { }

	async getCurrentUser() {
		return "Hello User";
	}

	async authenticateUser(body: AuthenticateBody): Promise<AuthenticateResponse> {
		const { id, code, user: userPayload } = body;
		await this.deps.keyService.getKeyAndValidate(id, code);

		const user = await (
			userPayload ?
				this.deps.userService.updateUserById(id, userPayload) :
				this.deps.userService.getUserById(id)
		);

		if (!user) { throw new InternalServerErrorException("User was not found"); }

		const payload = { id: user.id, email: user.email }

		const accessToken = this.deps.authService.signToken(payload, { expiresIn: "5m" });

		return AuthenticateResponseSchema.parse({ token: accessToken });
	}

	async sendLoginRequest({ email }: StartLoginBody): Promise<StartLoginResponse> {
		const user = await this.deps.userService.getUserByEmail(email);

		const verifiedUser = StartLoginResponseSchema.parse(user);

		const challenge = this.deps.authService.generateRandomString(25);

		const token = this.deps.authService.signToken({ id: user.id, email }, { expiresIn: 5 * 60 });

		const accessKey = await this.deps.keyService.generateKey({ challenge, user: user.id, token });

		const magicLink = this.deps.authService.generateAuthLink(accessKey);

		const { error } = await this.deps.emailService.sendMagicLink({
			to: { email: verifiedUser.email!, name: verifiedUser.forename },
			model: {
				link: magicLink,
				name: verifiedUser.forename,
				email: verifiedUser.email!
			}
		});

		if (error) {
			await this.deps.keyService.deleteInvalidatedKey(accessKey.id);
			throw new InternalServerErrorException();
		}

		return verifiedUser;
	}

	async verifyLogin({ id, code }: VerifyLoginQuery) : Promise<VerifyLoginResponse> {
		if(!id || !code) { throw new BadRequestException("Missing id and code combination"); }

		const key = await this.deps.keyService.getKeyAndValidate(id, code);

		const { decoded } = this.deps.authService.verifyToken<{ id: string, email: string }>(
			key.token,
			{ error: new ForbiddenException(" Access key has expired") }
		);

		const user = await this.deps.userService.getUserById(decoded!.id);

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

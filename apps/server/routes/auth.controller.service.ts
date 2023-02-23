import {
	BadRequestException,
	ForbiddenException,
	InternalServerErrorException
} from "next-api-decorators";
import { autoInjectable } from "tsyringe";

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

import { AuthHelpers } from "@/library/utilities";

import { KeyService, UserService, DatabaseService } from "@/services";

@autoInjectable()
export default class AuthControllerService {
	constructor(
		private readonly databaseService: DatabaseService,
		private readonly userService: UserService,
		private readonly keyService: KeyService
	) { }

	async getCurrentUser() {
		return await this.databaseService.client.db.User.getAll();
	}

	async authenticateUser(body: AuthenticateBody): Promise<AuthenticateResponse> {
		const { id, code, user: userPayload } = body;
		await this.keyService.getKeyAndValidate(id, code);

		const user = await (
			userPayload ?
				this.userService.updateUserById(id, userPayload) :
				this.userService.getUserById(id)
		);

		if (!user) { throw new InternalServerErrorException("User was not found"); }

		const payload = { id: user.id, email: user.email }

		const accessToken = AuthHelpers.signToken(payload, { expiresIn: "5m" });

		return AuthenticateResponseSchema.parse({ token: accessToken });
	}

	async sendLoginRequest({ email }: StartLoginBody): Promise<StartLoginResponse> {
		const user = await this.userService.getUserByEmail(email);

		const verifiedUser = StartLoginResponseSchema.parse(user);

		const challenge = AuthHelpers.generateRandomString(25);

		const token = AuthHelpers.signToken({ id: user.id, email }, { expiresIn: 5 * 60 });

		const accessKey = await this.keyService.generateKey({ challenge, user: user.id, token });

		const magicLink = AuthHelpers.generateAuthLink(accessKey);

		return verifiedUser;
	}

	async verifyLogin({ id, code }: VerifyLoginQuery) : Promise<VerifyLoginResponse> {
		if(!id || !code) { throw new BadRequestException("Missing id and code combination"); }

		const key = await this.keyService.getKeyAndValidate(id, code);

		const { decoded } = AuthHelpers.verifyToken<{id: string, email: string}>(
			key.token,
			{ error: new ForbiddenException("Access key has expired")}
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

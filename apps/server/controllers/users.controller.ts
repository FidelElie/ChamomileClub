import { Get, Post } from "next-api-decorators";
import { autoInjectable } from "tsyringe";

import {
	CreateUsersBodySchema,
	UserSchema,
	type CreateUsersBody
} from "@thechamomileclub/api";

import { Controller, AuthGuard, ValidatedBody } from "@/library/decorators";

import { UserService, EmailService, KeyService, AuthService } from "../services";

const baseUrl = "/users";

@autoInjectable()
@Controller(baseUrl)
export default class UsersController {
	constructor(
		private readonly userService: UserService,
		private readonly authService: AuthService,
		private readonly keyService: KeyService,
		private readonly emailService: EmailService
	) { }

	@Get(baseUrl)
	@AuthGuard("founder")()
	async getUsers() {
		return [];
	}

	@Post(baseUrl)
	@AuthGuard("founder")()
	async createUsers(@ValidatedBody(CreateUsersBodySchema)() body: CreateUsersBody) {
		const newUsers = await this.userService.createUsers(body);

		await Promise.all(newUsers.map(async databaseUser => {
			const user = UserSchema.parse(databaseUser);

			const challenge = this.authService.generateRandomString(25);

			const tokenClaims = { id: user.id, email: user.email, roles: user.roles }

			const token = this.authService.signToken(tokenClaims, { expiresIn: "1w" });

			const accessKey = await this.keyService.generateKey({
				user: user.id,
				challenge,
				token
			});

			const invitationLink = this.authService.generateAuthLink(accessKey);

			return await this.emailService.sendMemberInvitation({
				to: { name: user.forename!, email: user.email! },
				model: {
					name: user.forename,
					link: invitationLink,
					roles: user.roles,
					active: user.active
				}
			});
		}));

		return newUsers;
	}
}

import { autoInjectable } from "tsyringe";

import {
	UserSchema,
	type CreateUsersBody
} from "@thechamomileclub/api";

import { UserService, EmailService, KeyService, AuthService } from "../services";

@autoInjectable()
export default class UserControllerService {
	constructor(
		private readonly userService: UserService,
		private readonly authService: AuthService,
		private readonly keyService: KeyService,
		private readonly emailService: EmailService
	) {}

	async getAppUsers() {
		return []
	}

	async createUsers(entries: CreateUsersBody) {
		const newUsers = await this.userService.createUsers(entries);

		newUsers.forEach(async databaseUser => {
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
					roles: user.roles
				}
			});
		})

		return newUsers;
	}
}

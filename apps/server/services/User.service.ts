import { NotFoundException } from "next-api-decorators";
import { autoInjectable } from "tsyringe";

import { type CreateUsersBody, UserSchema } from "@thechamomileclub/api";

import { DatabaseService } from "./Database.service";

@autoInjectable()
export class UserService {
	constructor(private readonly databaseService: DatabaseService) { }

	async getUserByEmail(email: string, error?: Error) {
		const user = await this.databaseService.client.db.User.filter({
			email: email.toLowerCase()
		}).getFirst();

		if (!user) { throw (error ? error : this.userNotFound()); }

		return UserSchema.parse(user);
	}

	async getUserById(id: string, error?: Error) {
		const user = await this.databaseService.client.db.User.filter({ id }).getFirst();

		if (!user) { throw (error ? error : this.userNotFound()) }

		return UserSchema.parse(user);
	}

	async updateUserById(id: string, payload: {}) {
		const updatedUser = await this.databaseService.client.db.User.update(id, {
			...payload,
			updated_at: this.databaseService.getServerTimestamp()
		});

		return UserSchema.parse(updatedUser);
	}

	async createUser(payload: CreateUsersBody[number]) {
		const newUser = await this.databaseService.client.db.User.create({
			...payload,
			created_at: this.databaseService.getServerTimestamp()
		});

		return UserSchema.parse(newUser);
	}

	async createUsers(payload: CreateUsersBody) {
		const currentTimestamp = this.databaseService.getServerTimestamp();

		const newUsers = await this.databaseService.client.db.User.create(payload.map(userPayload => ({
			...userPayload,
			created_at: currentTimestamp
		})));

		return newUsers.map(user => UserSchema.parse(user));
	}

	private userNotFound(message = "User not found") { return new NotFoundException(message); }
}

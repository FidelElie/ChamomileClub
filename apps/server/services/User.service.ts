import { NotFoundException } from "next-api-decorators";
import { autoInjectable } from "tsyringe";

import { CreateUsersBody } from "@thechamomileclub/api";

import { DatabaseService } from "./Database.service";

@autoInjectable()
export class UserService {
	constructor(private readonly databaseService: DatabaseService) { }

	async getUserByEmail(email: string, error?: Error) {
		const user = await this.databaseService.client.db.User.filter({ email }).getFirst();

		if (!user) { throw (error ? error : this.userNotFound()); }

		return user;
	}

	async getUserById(id: string, error?: Error) {
		const user = await this.databaseService.client.db.User.filter({ id }).getFirst();

		if (!user) { throw (error ? error : this.userNotFound()) }

		return user;
	}

	async updateUserById(id: string, payload: {}) {
		const updatedUser = await this.databaseService.client.db.User.update(id, {
			...payload,
			updated_at: this.databaseService.getServerTimestamp()
		});

		return updatedUser;
	}

	async createUser(payload: CreateUsersBody[number]) {
		return await this.databaseService.client.db.User.create({
			...payload,
			created_at: this.databaseService.getServerTimestamp()
		});
	}

	async createUsers(payload: CreateUsersBody) {
		const currentTimestamp = this.databaseService.getServerTimestamp();

		return await this.databaseService.client.db.User.create(payload.map(userPayload => ({
			...userPayload,
			created_at: currentTimestamp
		})));
	}

	private userNotFound(message = "User not found") {
		return new NotFoundException(message);
	}
}

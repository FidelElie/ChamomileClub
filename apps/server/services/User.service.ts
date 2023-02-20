import { NotFoundException } from "next-api-decorators";

import type { XataClient } from "@thechamomileclub/database";

export default class UserService {
	constructor(private readonly client: XataClient) { }

	async getUserByEmail(email: string, error?: Error) {
		const user = await this.client.db.User.filter({ email }).getFirst();

		if (!user) { throw (error ? error : this.userNotFound()); }

		return user;
	}

	async getUserById(id: string, error?: Error) {
		const user = await this.client.db.User.filter({ id }).getFirst();

		if (!user) { throw (error ? error : this.userNotFound()) }

		return user;
	}

	async updateUserById(id: string, payload: {}) {
		const updatedUser = this.client.db.User.update(id, {
			...payload,
			updated_at: new Date().toUTCString()
		});

		return updatedUser;
	}

	private userNotFound(message = "User not found") {
		return new NotFoundException(message);
	}
}

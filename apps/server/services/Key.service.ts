import type { XataClient } from "@thechamomileclub/database";
import { ForbiddenException } from "next-api-decorators";

export default class KeyService {
	constructor(private readonly client: XataClient) { }

	async generateKey(payload: { challenge: string, token: string, user: string }) {
		return await this.client.db.Key.create({
			...payload,
			created_at: new Date().toUTCString()
		})
	}

	async getKeyAndValidate(id: string, challenge: string) {
		const key = await this.client.db.Key.filter({ id, challenge }).getFirst();

		if (!key) { throw new ForbiddenException("Valid Access key was not found"); }

		return key;
	}

	async deleteInvalidatedKey(keyId: string) {
		return await this.client.db.Key.delete(keyId);
	}
}

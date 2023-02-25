import { ForbiddenException } from "next-api-decorators";
import { autoInjectable } from "tsyringe";

import { KeySchema } from "@thechamomileclub/api"

import { validateSchema } from "@/library/utilities";

import { DatabaseService } from "./Database.service";

@autoInjectable()
export class KeyService {
	constructor(private readonly databaseService: DatabaseService) { }

	async generateKey(payload: { challenge: string, token: string, user: string }) {
		const newKey = await this.databaseService.client.db.Key.create({
			...payload,
			created_at: this.databaseService.getServerTimestamp()
		});

		return validateSchema(newKey, KeySchema);
	}

	async getKeyAndValidate(id: string, challenge: string) {
		const key = await this.databaseService.client.db.Key.filter({ id, challenge }).getFirst();

		if (!key) { throw new ForbiddenException("Valid Access key was not found"); }

		return validateSchema(key, KeySchema);
	}

	async deleteInvalidatedKey(keyId: string) {
		return await this.databaseService.client.db.Key.delete(keyId);
	}
}

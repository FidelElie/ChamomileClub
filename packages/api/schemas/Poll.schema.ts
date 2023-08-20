import { Output, merge, object, string, withDefault, boolean } from "valibot";

import { BaseSchema } from "./Base.schema";

export const PollSchema = merge([
	BaseSchema,
	object({
			event: object({ id: string() }),
			createdBy: object({ id: string() }),
			expiresAt: object({ id: string() }),
			multipleVotesPerUser: withDefault(boolean(), false),
	})
]);

export type PollSchema = Output<typeof PollSchema>;

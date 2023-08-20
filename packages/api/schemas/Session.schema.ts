import { Output, coerce, merge, nullable, object, optional, string } from "valibot";

import { BaseSchema } from "./Base.schema";

export const SessionSchema = merge([
	BaseSchema,
	object({
		user: object({ id: string() }),
		deletedAt: optional(
			nullable(coerce(string(), (input) => (new Date(input as any)).toISOString()))
		)
	})
]);

export type SessionSchema = Output<typeof SessionSchema>;

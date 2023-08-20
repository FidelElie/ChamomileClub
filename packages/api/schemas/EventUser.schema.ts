import { Output, merge, object, string } from "valibot";

import { BaseSchema } from "./Base.schema";

export const EventUserSchema = merge([
	BaseSchema,
	object({
		user: object({ id: string() }),
		event: object({ id: string() }),
	})
]);

export type EventUserSchema = Output<typeof EventUserSchema>;

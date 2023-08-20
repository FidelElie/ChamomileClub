import { Output, coerce, enumType, merge, nullable, object, optional, string } from "valibot";

import { BaseSchema } from "./Base.schema";

export const EventStatuses = {
	SCHEDULED: "SCHEDULED",
	PENDING: "PENDING",
	CANCELLED: "CANCELLED"
} as const;

export const EventStatusEnum = enumType(["SCHEDULED", "PENDING", "CANCELLED"]);

export type EventStatusEnum = Output<typeof EventStatusEnum>;

export const EventSchema = merge([
	BaseSchema,
	object({
		name: optional(nullable(string())),
		owner: object({ id: string() }),
		date: optional(
			nullable(coerce(string(), (input) => (new Date(input as any)).toISOString()))
		),
		status: EventStatusEnum
	})
]);

export type EventSchema = Output<typeof EventSchema>;

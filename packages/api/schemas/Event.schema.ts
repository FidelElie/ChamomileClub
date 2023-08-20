import { z } from "zod";

import { BaseSchema } from "./Base.schema";

export const EventStatuses = {
	SCHEDULED: "SCHEDULED",
	PENDING: "PENDING",
	CANCELLED: "CANCELLED"
} as const;

export const EventStatusEnum = z.enum(["SCHEDULED", "PENDING", "CANCELLED"]);

export type EventStatusEnum = z.infer<typeof EventStatusEnum>;

export const EventSchema = BaseSchema.merge(
	z.object({
		name: z.string().nullish(),
		owner: z.object({ id: z.string() }),
		date: z.coerce.date().transform(date => date.toISOString()),
		status: EventStatusEnum
	})
)

export type EventSchema = z.infer<typeof EventSchema>;

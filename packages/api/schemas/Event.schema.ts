import { z } from "zod";

import { BaseSchema } from "./Base.schema";

export const EventStatuses = {
	SCHEDULED: "SCHEDULED",
	PENDING: "PENDING",
	CANCELLED: "CANCELLED"
} as const;

export const EventStatusEnum = z.enum([
	EventStatuses.SCHEDULED,
	EventStatuses.PENDING,
	EventStatuses.CANCELLED
]);

export type EventStatusEnum = z.infer<typeof EventStatusEnum>;

export const EventSchema = BaseSchema.merge(
	z.object({
		name: z.string().nullish(),
		description: z.string().nullish(),
		owner: z.object({ id: z.string() }),
		date: z.coerce.date(),
		status: EventStatusEnum,
		startDate: z.coerce.date().nullish(),
		endDate: z.coerce.date().nullish(),
		createdAt: z.coerce.date(),
	})
)

export type EventSchema = z.infer<typeof EventSchema>;

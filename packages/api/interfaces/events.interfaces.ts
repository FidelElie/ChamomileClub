import { z } from "zod";

import { EventSchema, EventStatusEnum, UserCreationFieldsSchema, UserSchema } from "../schemas";

import { PaginationQuery } from "../library";

export const FetchEventsInterfaces = {
	query: PaginationQuery.merge(
		z.object({
			start: z.coerce.date().transform(date => date.toISOString()).optional(),
			end: z.coerce.date().transform(date => date.toISOString()).optional(),
			userId: z.string().optional(),
			status: EventStatusEnum.optional()
		})
	).default({}),
	response: z.object({
		items: z.array(EventSchema.merge(z.object({ members: z.array(UserSchema) })))
	})
}

export const CreateEventsInterfaces = {
	body: z.object({
		entries: z.array(
			z.object({
				name: z.string(),
				members: z.array(UserSchema),
				invites: z.array(UserCreationFieldsSchema)
			})
		)
	}),
	response: z.object({
		items: z.array(EventSchema)
	})
}

export const EditEventInterfaces = {
	params: z.object({
		eventId: z.string()
	}),
	body: z.object({
		name: z.string().optional(),
		status: EventStatusEnum.optional()
	}),
	response: z.object({ item: EventSchema })
}

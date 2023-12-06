import { z } from "zod";

import { BaseSchema } from "./Base.schema";

export const PollTypes = {
	EVENT_DATE: "EVENT_DATE"
} as const;

export const PollTypesEnum = z.enum([PollTypes.EVENT_DATE]);

export const PollSchema = BaseSchema.merge(
	z.object({
		name: z.string(),
		type: PollTypesEnum,
		event: z.object({ id: z.string() }).nullish(),
		createdBy: z.object({ id: z.string() }),
		expiresAt: z.coerce.date().transform(date => date.toISOString()).nullish(),
		votesPerUser: z.number().int().default(1),
		createdAt: z.coerce.date().transform(date => date.toISOString()),
		updatedAt: z.coerce.date().transform(date => date.toISOString()).nullish()
	})
);

export type PollSchema = z.infer<typeof PollSchema>;

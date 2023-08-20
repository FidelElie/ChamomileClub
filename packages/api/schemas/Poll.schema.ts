import { z } from "zod";

import { BaseSchema } from "./Base.schema";

export const PollSchema = BaseSchema.merge(
	z.object({
		event: z.object({ id: z.string() }),
		createdBy: z.object({ id: z.string() }),
		expiresAt: z.coerce.date().transform(date => date.toISOString()),
		multipleVotesPerUser: z.boolean().default(false)
	})
);

export type PollSchema = z.infer<typeof PollSchema>;

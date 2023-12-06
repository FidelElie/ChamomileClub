import { z } from "zod";

import { BaseSchema } from "./Base.schema";

export const PollOptionSchema = BaseSchema.merge(
	z.object({
		name: z.string(),
		description: z.string().nullish(),
		poll: z.object({ id: z.string() }),
		votes: z.record(z.string(), z.string()),
		createdAt: z.coerce.date(),
		updatedAt: z.coerce.date().nullish()
	})
);

export type PollOptionSchema = z.infer<typeof PollOptionSchema>;

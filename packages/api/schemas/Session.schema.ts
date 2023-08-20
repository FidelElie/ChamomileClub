import { z } from "zod";

import { BaseSchema } from "./Base.schema";

export const SessionSchema = BaseSchema.merge(
	z.object({
		user: z.object({ id: z.string() }),
		deletedAt: z.coerce.date().transform(date => date.toISOString()).nullish()
	})
)

export type SessionSchema = z.infer<typeof SessionSchema>;

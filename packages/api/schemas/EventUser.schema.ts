import { z } from "zod";

import { BaseSchema } from "./Base.schema";

export const EventUserSchema = BaseSchema.merge(
	z.object({
		user: z.object({ id: z.string() }),
		event: z.object({ id: z.string() })
	})
)

export type EventUserSchema = z.infer<typeof EventUserSchema>;

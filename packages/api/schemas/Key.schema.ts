import { z } from "zod";

import { BaseSchema } from "./Base.schema";

export const KeySchema = BaseSchema.merge(
	z.object({
		id: z.string(),
		token: z.string(),
		code: z.string(),
		user: z.object({ id: z.string() })
	})
);

export type KeySchema = z.infer<typeof KeySchema>;

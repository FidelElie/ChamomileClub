import { z } from "zod";

export const KeySchema = z.object({
	id: z.string(),
	challenge: z.string(),
	created_at: z.date(),
	token: z.string(),
	user: z.string()
});

export type KeySchemaType = z.infer<typeof KeySchema>;

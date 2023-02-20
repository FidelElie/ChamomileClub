import { z } from "zod";

export const UserSchema = z.object({
	id: z.string().uuid(),
	email: z.string().email(),
	forename: z.string(),
	nickname: z.string().optional().nullable(),
	surname: z.string().optional().nullable(),
	description: z.string().nullable().optional(),
	created_at: z.date(),
	updated_at: z.date(),
	position: z.string(),
	active: z.boolean().optional(),
	deleted: z.boolean().optional()
});

export type UserSchemaType = z.infer<typeof UserSchema>;

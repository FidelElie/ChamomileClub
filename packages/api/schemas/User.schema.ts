import { z } from "zod";

import { Roles } from "@thechamomileclub/database";

export const UserSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	forename: z.string(),
	nickname: z.string().optional().nullable(),
	surname: z.string().optional().nullable(),
	description: z.string().nullable().optional(),
	created_at: z.date(),
	updated_at: z.date().nullable(),
	position: z.string().nullable(),
	active: z.boolean().optional(),
	deleted: z.boolean().optional(),
	roles: z.array(z.enum(Roles))
});

export type UserSchemaType = z.infer<typeof UserSchema>;

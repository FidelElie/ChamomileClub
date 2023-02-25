import { z } from "zod";

export const RolesSchema = z.enum(["admin", "founder", "editor", "team", "member", "prospect"]);

export type RolesSchemaType = z.infer<typeof RolesSchema>;

export const UserSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	forename: z.string(),
	nickname: z.string().optional().nullable(),
	surname: z.string().optional().nullable(),
	description: z.string().nullable().optional(),
	created_at: z.date(),
	updated_at: z.date().nullable(),
	position: z.string().nullable().optional(),
	active: z.boolean().optional(),
	deleted: z.boolean().optional(),
	roles: z.array(RolesSchema)
});

export type UserSchemaType = z.infer<typeof UserSchema>;



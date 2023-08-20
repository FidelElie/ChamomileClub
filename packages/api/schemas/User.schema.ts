import { z } from "zod";

import { BaseSchema } from "./Base.schema";

export const RolesEnum = z.enum(["admin", "founder", "editor", "team", "member", "prospect"]);

export type RolesEnum = z.infer<typeof RolesEnum>;

export const UserSchema = BaseSchema.merge(
	z.object({
		email: z.string().email(),
		forename: z.string(),
		surname: z.string().nullish(),
		nickname: z.string().nullish(),
		active: z.boolean().default(false),
		position: z.string().nullish(),
		description: z.string().nullish(),
		roles: z.array(RolesEnum)
	})
)

export type UserSchema = z.infer<typeof UserSchema>;

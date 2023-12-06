import { z } from "zod";

import { BaseSchema } from "./Base.schema";

export const UserRoles = {
	ADMIN: "ADMIN",
	FOUNDER: "FOUNDER",
	TEAM: "TEAM",
	MEMBER: "MEMBER",
	PROSPECT: "PROSPECT"
} as const;

export const RolesEnum = z.enum([
	UserRoles.ADMIN,
	UserRoles.FOUNDER,
	UserRoles.TEAM,
	UserRoles.MEMBER,
	UserRoles.PROSPECT
]);

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
		roles: z.array(RolesEnum),
		public: z.boolean().default(true),
		createdAt: z.coerce.date()
	})
);

export type UserSchema = z.infer<typeof UserSchema>;

export const UserCreationSchema = UserSchema.omit({ id: true });

export type UserCreationSchema = z.infer<typeof UserCreationSchema>;

export const UserCreationFieldsSchema = UserSchema.pick({
	email: true,
	forename: true,
	surname: true,
	description: true,
	roles: true
});

export type UserCreationFieldsSchema = z.infer<typeof UserCreationFieldsSchema>;

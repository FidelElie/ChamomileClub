import { z } from "zod";

import { UserSchema, type UserSchemaType } from "../schemas";

export const CreateUsersBodySchema = z.array(UserSchema.pick({
	forename: true,
	surname: true,
	email: true,
	nickname: true,
	description: true,
	roles: true
}));

export type CreateUsersBody = z.infer<typeof CreateUsersBodySchema>;

export const CreateUsersResponseSchema = z.array(UserSchema);

export type CreateUsersResponseSchema = UserSchemaType[];

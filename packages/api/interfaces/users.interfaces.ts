import { z } from "zod";

import { RolesEnum, UserSchema, UserCreationFieldsSchema } from "../schemas";
import { PaginationQuery } from "../library";

export const FetchUsersInterfaces = {
	query: PaginationQuery.merge(z.object({
		role:	z.union([RolesEnum, z.array(RolesEnum)]).optional()
	})),
	response: z.object({ items: z.array(UserSchema) })
}

export const CreateUsersInterfaces = {
	body: z.object({
		entries: z.array(UserCreationFieldsSchema)
	}),
	response: z.object({ items: z.array(UserSchema) })
}

export const EditUserInterfaces = {
	params: z.object({ userId: z.string() }),
	body: UserCreationFieldsSchema.partial(),
	response: z.object({ payload: UserSchema })
}

export const DeleteUserInterfaces = {
	params: z.object({ userId: z.string() }),
	response: z.object({ userId: z.string() })
}

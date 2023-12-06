import { z } from "zod";

import { RolesEnum, UserSchema } from "../schemas";
import { PaginationQuery } from "../library";

export const FetchUsersInterfaces = {
	query: PaginationQuery.merge(z.object({
		role:	z.union([RolesEnum, z.array(RolesEnum)]).optional()
	})),
	response: z.object({
		items: z.array(UserSchema)
	})
}

export const CreateUsersInterfaces = {
	body: z.object({
		entries: z.array(
			z.object({
				forename: z.string(),
				surname: z.string(),
				email: z.string().email(),
				role: RolesEnum.optional()
			})
		)
	}),
	response: z.object({ items: z.array(UserSchema) })
}

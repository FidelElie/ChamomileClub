import { z } from "zod";

import { UserRolesEnum, UserEntity, UserCreationFieldsEntity } from "../entities";
import { PaginationQuery } from "../library";

export const FetchUsersInterfaces = {
	query: PaginationQuery.merge(z.object({
		role:	z.union([UserRolesEnum, z.array(UserRolesEnum)]).optional()
	})),
	response: z.object({ items: z.array(UserEntity) })
}

export const CreateUsersInterfaces = {
	body: z.object({
		entries: z.array(UserCreationFieldsEntity)
	}),
	response: z.object({ items: z.array(UserEntity) })
}

export const EditUserInterfaces = {
	params: z.object({ userId: z.string() }),
	body: UserCreationFieldsEntity.partial(),
	response: z.object({ payload: UserEntity })
}

export const DeleteUserInterfaces = {
	params: z.object({ userId: z.string() }),
	response: z.object({ userId: z.string() })
}

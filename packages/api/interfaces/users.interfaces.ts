import { z } from "zod";

import { UserCreationEntity, UserEntity, UserRolesEnum } from "../entities";
import { PaginationQuery } from "../library";

export const FetchUsersInterfaces = {
  query: PaginationQuery.merge(
    z.object({
      search: z.string().optional(),
      role: z.union([UserRolesEnum, z.array(UserRolesEnum)]).optional(),
    }),
  ),
  response: z.object({ items: z.array(UserEntity) }),
};

export const CreateUsersInterfaces = {
  body: z.object({
    entries: z.array(UserCreationEntity),
  }),
  response: z.object({ items: z.array(UserEntity) }),
};

export const EditUserInterfaces = {
  params: z.object({ userId: z.string() }),
  body: UserCreationEntity.partial(),
  response: z.object({ payload: UserEntity }),
};

export const DeleteUserInterfaces = {
  params: z.object({ userId: z.string() }),
  response: z.object({ userId: z.string() }),
};

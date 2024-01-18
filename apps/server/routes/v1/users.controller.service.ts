import { NextApiResponse } from "next";

import {
  CreateUsersInterfaces,
  DeleteUserInterfaces,
  EditUserInterfaces,
  FetchUsersInterfaces,
  InferDTOs,
  UserEntity,
} from "@thechamomileclub/api";

import { dependencyMap } from "@/library/configs";
import type { ApiRequest } from "@/library/server";

type FetchUsersDTOs = InferDTOs<typeof FetchUsersInterfaces>;
type CreateUsersDTOs = InferDTOs<typeof CreateUsersInterfaces>;
type EditUserDTOs = InferDTOs<typeof EditUserInterfaces>;
type DeleteUserDTOs = InferDTOs<typeof DeleteUserInterfaces>;

const UsersControllerService = (serviceConfig: UserControllerServiceConfig) => {
  const { xataClient: { db }, userService } = serviceConfig;

  return {
    fetchUsers: async (
      req: ApiRequest<FetchUsersDTOs>,
      res: NextApiResponse,
    ) => {
      const { role, page, entries } = req.query;

      const users = await db.users
        .filter({
          ...(role ? { roles: { $includes: role } } : {}),
        })
        .getPaginated({
          ...(page || entries
            ? {
              pagination: {
                size: entries || 50,
                offset: entries || 50 * ((page || 1) - 1),
              },
            }
            : {}),
        });

      const validatedUsers = users.records.map((user) => UserEntity.parse(user));

      type FetchUsersDTOs = InferDTOs<typeof FetchUsersInterfaces>;

      res
        .status(200)
        .json({ items: validatedUsers } satisfies FetchUsersDTOs["response"]);
    },
    createUsers: async (
      req: ApiRequest<CreateUsersDTOs>,
      res: NextApiResponse,
    ) => {
      const { entries } = req.body;

      const newMembers = await userService.createAndInviteNewMembers(entries);

      res
        .status(201)
        .json({ items: newMembers } satisfies CreateUsersDTOs["response"]);
    },
    editUser: async (
      req: ApiRequest<EditUserDTOs>,
      res: NextApiResponse,
    ) => {
      const { userId } = req.params;

      const updatedUser = await db.users.update({ id: userId, ...req.body });

      const validatedUser = UserEntity.parse(updatedUser);

      res
        .status(200)
        .json({ payload: validatedUser } satisfies EditUserDTOs["response"]);
    },
    deleteUser: async (
      req: ApiRequest<DeleteUserDTOs>,
      res: NextApiResponse,
    ) => {
      const { userId } = req.params;

      await db.users.delete(userId);

      res.status(200).json({ userId } satisfies DeleteUserDTOs["response"]);
    },
  };
};

export const createUsersControllerService = (serviceConfig: UserControllerServiceConfig) => {
  return UsersControllerService(serviceConfig);
};

type UserControllerServiceConfig = Pick<typeof dependencyMap, "xataClient" | "userService">;

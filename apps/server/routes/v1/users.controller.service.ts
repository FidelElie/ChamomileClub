import {
  CreateUsersInterfaces,
  DeleteUserInterfaces,
  EditUserInterfaces,
  FetchUsersInterfaces,
  InferDTOs,
  UserEntity,
} from "@thechamomileclub/api";

import { dependencyMap } from "@/library/configs";
import type { Context } from "@/library/server";

type FetchUsersDTOs = InferDTOs<typeof FetchUsersInterfaces>;
type CreateUsersDTOs = InferDTOs<typeof CreateUsersInterfaces>;
type EditUserDTOs = InferDTOs<typeof EditUserInterfaces>;
type DeleteUserDTOs = InferDTOs<typeof DeleteUserInterfaces>;

const UsersControllerService = (serviceConfig: UserControllerServiceConfig) => {
  const { xataClient: { db }, UserService } = serviceConfig;

  return {
    /** */
    fetchUsers: async (context: Context<FetchUsersDTOs>) => {
      const { role, page, entries, search } = context.query;

      const users = await db.users
        .filter({
          ...(search
            ? {
              $any: [
                { forename: { $iContains: search } },
                { surname: { $iContains: search } },
                { email: { $iContains: search } },
              ],
            }
            : {}),
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

      return FetchUsersInterfaces.response.parse({ items: validatedUsers });
    },
    /** */
    createUsers: async (context: Context<CreateUsersDTOs>) => {
      const { entries } = context.body;

      const newMembers = await UserService.createAndInviteNewMembers(entries);

      return CreateUsersInterfaces.response.parse({ items: newMembers });
    },
    /** */
    editUser: async (context: Context<EditUserDTOs>) => {
      const { userId } = context.params;

      const updatedUser = await db.users.update({ id: userId, ...context.body });

      return EditUserInterfaces.response.parse({ payload: updatedUser });
    },
    /** */
    deleteUser: async (context: Context<DeleteUserDTOs>) => {
      const { userId } = context.params;

      await db.users.delete(userId);

      return DeleteUserInterfaces.response.parse({ userId });
    },
  };
};

export const createUsersControllerService = (serviceConfig: UserControllerServiceConfig) => {
  return UsersControllerService(serviceConfig);
};

type UserControllerServiceConfig = Pick<typeof dependencyMap, "xataClient" | "UserService">;

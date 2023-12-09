import {
  z,
  UserRoles,
  UserCreationEntity,
  UserCreationFieldsEntity,
  UserEntity,
} from "@thechamomileclub/api";
import { getXataClient } from "@thechamomileclub/database";

const { db } = getXataClient();

export const createAndInviteNewMembers = async (
  entries: UserCreationFieldsEntity[],
) => {
  const usersToCreate: UserCreationEntity[] = entries.map((entry) => ({
    forename: entry.forename,
    surname: entry.surname,
    email: entry.email,
    description: entry.description,
    // if role is not explicitly set then prospective member by default
    roles: entry.roles || [UserRoles.PROSPECT],
    active: false,
    public: true,
    createdAt: new Date(),
  }));

  const validatedEntries = z.array(UserCreationEntity).parse(usersToCreate);

  const newUsers = db.users.create(validatedEntries);

  return z.array(UserEntity).parse(newUsers);
};

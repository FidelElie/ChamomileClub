import { z, UserRoles, UserCreationSchema, UserCreationFieldsSchema } from "@thechamomileclub/api";
import { getXataClient } from "@thechamomileclub/database";

const { db } = getXataClient();

export const createAndInviteNewMembers = async (entries: UserCreationFieldsSchema[]) => {
	const usersToCreate: UserCreationSchema[] = entries.map(entry => ({
		forename: entry.forename,
		surname: entry.surname,
		email: entry.email,
		description: entry.description,
		// if role is not explicitly set then prospective member by default
		roles: entry.roles || [UserRoles.PROSPECT],
		active: false,
		public: true,
		createdAt: new Date()
	}))

	const validatedEntries = z.array(UserCreationSchema).parse(usersToCreate);

	return db.users.create(validatedEntries);
}

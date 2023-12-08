import { NextApiResponse } from "next"

import { getXataClient } from "@thechamomileclub/database";
import {
	CreateUsersInterfaces,
	DeleteUserInterfaces,
	EditUserInterfaces,
	FetchUsersInterfaces,
	InferDTOs,
	UserEntity
} from "@thechamomileclub/api";

import { ApiRequest } from "@/library/server";

import * as UserService from "@/services/User.service";

const { db } = getXataClient();

type FetchUsersDTOs = InferDTOs<typeof FetchUsersInterfaces>;

/** GET: Fetch users based on desired parameters */
export const fetchUsers = async (
	req: ApiRequest<FetchUsersDTOs>,
	res: NextApiResponse
) => {
	const { role, page, entries } = req.query;

	const users = await db.users.filter({
		...(role ? { roles: { $includes: role } } : {})
	}).getPaginated({
		...((page || entries) ? {
			pagination: {
				size: entries || 50,
				offset: (entries || 50 * ((page || 1) - 1))
			}
		} : {})
	});

	const validatedUsers = users.records.map(user => UserEntity.parse(user));

	res.status(200).json({ items: validatedUsers } satisfies FetchUsersDTOs["response"]);
}

type CreateUsersDTOs = InferDTOs<typeof CreateUsersInterfaces>;

/** Create and invite new users to the platform */
export const createUsers = async (
	req: ApiRequest<CreateUsersDTOs>,
	res: NextApiResponse
) => {
	const { entries } = req.body;

	const newMembers = await UserService.createAndInviteNewMembers(entries);

	res.status(201).json({ items: newMembers } satisfies CreateUsersDTOs["response"]);
}

type EditUserDTOs = InferDTOs<typeof EditUserInterfaces>;

export const editUser = async (
	req: ApiRequest<EditUserDTOs>,
	res: NextApiResponse
) => {
	const { userId } = req.params;

	const updatedUser = await db.users.update({ id: userId, ...req.body });

	const validatedUser = UserEntity.parse(updatedUser);

	res.status(200).json({ payload: validatedUser } satisfies EditUserDTOs["response"]);

}

type DeleteUserDTOs = InferDTOs<typeof DeleteUserInterfaces>;

export const deleteUser = async (
	req: ApiRequest<DeleteUserDTOs>,
	res: NextApiResponse
) => {
	const { userId } = req.params;

	await db.users.delete(userId);

	res.status(200).json({ userId } satisfies DeleteUserDTOs["response"]);
}

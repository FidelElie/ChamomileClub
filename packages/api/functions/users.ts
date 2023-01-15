import { useQuery } from "@tanstack/react-query";
import type { User } from "@chamomileclub/database";

import requests from "../requests";

export type GetUsersResponse<
	ItemsField extends unknown,
	ErrorField extends unknown
> =  { items: ItemsField[], error: ErrorField, path: string }

export const useGetUsers = () => useQuery<
	GetUsersResponse<User, null>,
	GetUsersResponse<never, string>
>(
	["users"],
	(async () => {
		const response: GetUsersResponse<User, null> = await requests.get("/api/users");

		return response;
	})
)

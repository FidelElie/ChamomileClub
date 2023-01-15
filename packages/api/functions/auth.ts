import { useMutation, useQuery } from "@tanstack/react-query";

import requests from "../requests";

export const useGetCurrentUser = () => useQuery(
	["user"],
	async () => {
		const response = await requests.get("/api/auth/user");

		return response;
	}
)

export const useLoginUserWithCredentials = () => useMutation(
	async (body: { email: string, password: string }) => {
		const response = await requests.post("/api/auth/login", body);

		return response;
	}
)

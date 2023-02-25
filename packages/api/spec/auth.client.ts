import { useQuery, useMutation } from "@tanstack/react-query";

import { requests } from "../requests";

import {
	GetCurrentUserResponseSchema,
	GetCurrentUserResponse,
	StartLoginResponseSchema,
	StartLoginBody,
	VerifyLoginQuery,
	VerifyLoginResponseSchema
} from "./auth.dtos";

export const useGetCurrentUser = (config?: {
	onSettled?: () => void,
	onSuccess?: (data: GetCurrentUserResponse) => void
}) => useQuery(
	["user"],
	async () => {
		const response = await requests.get("/api/auth");

		return GetCurrentUserResponseSchema.parse(response);
	},
	{
		refetchOnWindowFocus: false,
		...config
	}
)

export const useSendLoginRequest = (config?: {
	onSuccess?: () => void,
	onError?: () => void
}) => useMutation(
	async ({ email }: StartLoginBody) => {
		const response = await requests.post("/api/auth/login", { email });

		return StartLoginResponseSchema.parse(response);
	},
	config
)

export const useVerifyLogin = (config: VerifyLoginQuery) => useQuery(
	["user:login", config],
	async () => {
		const response = await requests.get(requests.url("/api/auth/login", config));

		return VerifyLoginResponseSchema.parse(response);
	}
)

import {
	useQuery,
	useMutation,
	GetCurrentUserInterfaces,
	StartAuthProcessInterfaces,
	ValidateLoginCodeInterfaces,
	UpdateCurrentUserInterfaces
} from "@thechamomileclub/api";

import { fetchClient } from "../client";

export const useGetCurrentUser = () => useQuery(
	["auth"],
	async () => {
		const response = await fetchClient.fetch("/v1/auth", { method: "GET" });

		return GetCurrentUserInterfaces.response.parse(response);
	}
);

export const useStartAuthProcess = () => useMutation({
	mutationFn: async (body: StartAuthProcessInterfaces["body"]) => {
		const validatedBody = StartAuthProcessInterfaces.body.parse(body);

		const response = await fetchClient.fetch(
			"/v1/auth",
			{ method: "POST", body: JSON.stringify(validatedBody) });

		return StartAuthProcessInterfaces.response.parse(response);
	}
});

export const useValidateLoginCode = (
	config?: { onSuccess?: (data: { token: string }) => void, onError?: (error: any) => void }
) => useMutation({
	mutationFn: async (body: ValidateLoginCodeInterfaces["body"]) => {
		const validatedBody = ValidateLoginCodeInterfaces.body.parse(body);

		const response = await fetchClient.fetch(
			"/v1/auth",
			{ method: "PUT", body: JSON.stringify(validatedBody) }
		)

		return ValidateLoginCodeInterfaces.response.parse(response);
	},
	...(config || {})
});

export const useUpdateCurrentUser = (
	config?: {
		onSuccess?: (data: string) => void,
		onError?: (error: any) => void,
		onMutate?: () => void,
	}
) => useMutation({
	mutationFn: async (body: UpdateCurrentUserInterfaces["body"]) => {
		const validatedBody = UpdateCurrentUserInterfaces.body.parse(body);

		const response = await fetchClient.fetch(
			"/v1/auth",
			{ method: "PATCH", body: JSON.stringify(validatedBody) }
		)

		return UpdateCurrentUserInterfaces.response.parse(response);
	},
	...(config || {})
});

export const useLogoutUser = (config?: { onSuccess?: () => void }) => useMutation({
	mutationFn: () => fetchClient.fetch("v1/auth", { method: "DELETE" }),
	...(config || {})
});

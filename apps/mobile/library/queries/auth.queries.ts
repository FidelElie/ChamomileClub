import {
	useQuery,
	useMutation,
	GetCurrentUserInterfaces,
	StartAuthProcessInterfaces,
	ValidateLoginCodeInterfaces,
	UpdateCurrentUserInterfaces
} from "@thechamomileclub/api";

import { axiosClient } from "../client";

export const useGetCurrentUser = () => useQuery(
	["auth"],
	async () => {
		const response = (await axiosClient.get("/v1/auth")).data;

		return GetCurrentUserInterfaces.response.parse(response);
	}
);

export const useStartAuthProcess = () => useMutation({
	mutationFn: async (body: StartAuthProcessInterfaces["body"]) => {
		const response = (await axiosClient.post("/v1/auth", body)).data;

		return StartAuthProcessInterfaces.response.parse(response);
	}
});

export const useValidateLoginCode = (
	config?: { onSuccess?: (data: { token: string }) => void, onError?: (error: any) => void }
) => useMutation({
	mutationFn: async (body: ValidateLoginCodeInterfaces["body"]) => {
		const response = (await axiosClient.put("/v1/auth", body)).data;

		return ValidateLoginCodeInterfaces.response.parse(response);
	},
	...(config || {})
});

export const useUpdateCurrentUser = (
	config?: { onSuccess?: (data: string) => void, onError?: (error: any) => void }
) => useMutation({
	mutationFn: async (body: UpdateCurrentUserInterfaces["body"]) => {
		const response = (await axiosClient.patch("/v1/auth", body)).data;

		return UpdateCurrentUserInterfaces.response.parse(response);
	},
	...(config || {})
});

export const useLogoutUser = (config?: { onSuccess?: () => void }) => useMutation({
	mutationFn: async () => axiosClient.delete("v1/auth"),
	...(config || {})
});

import {
	z,
	useQuery,
	useMutation,
	GetCurrentUserInterfaces,
	StartAuthProcessInterfaces,
	ValidateLoginCodeInterfaces,
} from "@thechamomileclub/api";

import { axiosClient } from "../client";

export const useGetCurrentUser = () => useQuery(
	["auth"],
	async () => {
		const response = (await axiosClient.get("/v1/auth")).data;

		return GetCurrentUserInterfaces.response.parse(response);
	}
)

export const useStartAuthProcess = () => useMutation({
	mutationFn: async (body: z.infer<typeof StartAuthProcessInterfaces.body>) => {
		const response = (await axiosClient.post("/v1/auth", body)).data;

		return StartAuthProcessInterfaces.response.parse(response);
	}
});

export const useValidateLoginCode = () => useMutation({
	mutationFn: async (body: z.infer<typeof ValidateLoginCodeInterfaces.body>) => {
		const response = (await axiosClient.put("/v1/auth", body)).data;

		return ValidateLoginCodeInterfaces.response.parse(response);
	}
});

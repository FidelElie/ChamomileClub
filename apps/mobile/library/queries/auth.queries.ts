import {
	useMutation,
	Input,
	StartAuthProcessInterfaces,
	ValidateLoginCodeInterfaces
} from "@thechamomileclub/api";

import { axiosClient } from "../client";

export const useStartAuthProcess = () => useMutation({
	mutationFn: async (body: Input<typeof StartAuthProcessInterfaces.body>) => {
		const response = (await axiosClient.post("/v1/auth", body)).data;

		console.log(response);

		return StartAuthProcessInterfaces.response.parse(response);
	}
});

export const useValidateLoginCode = () => useMutation({
	mutationFn: async (body: Input<typeof ValidateLoginCodeInterfaces.body>) => {
		const response = (await axiosClient.put("/v1/auth", body)).data;

		return ValidateLoginCodeInterfaces.response.parse(response);
	}
});

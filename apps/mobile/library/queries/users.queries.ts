import { FetchUsersInterfaces, InferDTOs, useQuery } from "@thechamomileclub/api";

import { fetchClient } from "../client";

export const useFetchUsers = (
	query: InferDTOs<typeof FetchUsersInterfaces>["query"],
) => useQuery({
	queryKey: ["users", query],
	queryFn: async () => {
		const queryParams = new URLSearchParams(query as any);

		const url = `/v1/users${queryParams.size ? `?${queryParams.toString()}` : ""}`

		const response = await fetchClient.fetch(url, { method: "GET" });

		return FetchUsersInterfaces.response.parse(response);
	}
});

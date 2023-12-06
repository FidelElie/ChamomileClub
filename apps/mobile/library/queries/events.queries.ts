import {
	InferDTOs,
	useQuery,
	useMutation,
	FetchEventsInterfaces,
	CreateEventsInterfaces,
	EditEventInterfaces
} from "@thechamomileclub/api";

import { fetchClient } from "../client";

export const useFetchEvents = (
	query: InferDTOs<typeof FetchEventsInterfaces>["query"]
) => useQuery(
	["user", query],
	async () => {
		const queryParams = new URLSearchParams(query as any);

		const url = `/v1/events${queryParams.size ? `?${queryParams.toString()}` : ""}`;

		const response = await fetchClient.fetch(url, { method: "GET" });

		return FetchEventsInterfaces.response.parse(response);
	}
);

export const useCreateEvents = () => useMutation(
	async(config: Omit<InferDTOs<typeof CreateEventsInterfaces>, "response">) => {
		const { body } = config;

		const url = `/v1/events`;

		const validatedBody = CreateEventsInterfaces.body.parse(body);

		const response = await fetchClient.fetch(url, {
			method: "POST",
			body: JSON.stringify(validatedBody)
		})

		return CreateEventsInterfaces.response.parse(response);
	}
);

export const useEditEvent = () => useMutation(
	async (config: Omit<InferDTOs<typeof EditEventInterfaces>, "response">) => {
		const { params, body } = config;

		const url = `/v1/events/${params.eventId}`;

		const validatedBody = EditEventInterfaces.response.parse(body);

		const response = await fetchClient.fetch(url, {
			method: "PATCH",
			body: JSON.stringify(validatedBody)
		});

		return EditEventInterfaces.response.parse(response)
	}
)

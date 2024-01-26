import {
  CreateEventsInterfaces,
  EditEventInterfaces,
  FetchEventsInterfaces,
  InferDTOs,
  useMutation,
  useQuery,
} from "@thechamomileclub/api";

import { RequestClient } from "../configs";

export const useFetchEvents = (
  query: InferDTOs<typeof FetchEventsInterfaces>["query"],
) => {
  return useQuery(
    {
      queryKey: ["user", query],
      queryFn: async () => {
        const queryParams = new URLSearchParams(query as unknown as URLSearchParams);

        const url = `/v1/events${queryParams.size ? `?${queryParams.toString()}` : ""}`;

        const response = await RequestClient.get(url);

        return FetchEventsInterfaces.response.parse(response.data);
      },
    },
  );
};

export const useCreateEvents = () => {
  return useMutation(
    {
      mutationFn: async (
        config: Omit<InferDTOs<typeof CreateEventsInterfaces["request"]>, "response">,
      ) => {
        const { body } = config;

        const url = "/v1/events";

        const validatedBody = CreateEventsInterfaces.request.body.parse(body);

        const response = await RequestClient.post(url, validatedBody);

        return CreateEventsInterfaces.responses[201].parse(response);
      },
    },
  );
};

export const useEditEvent = () => {
  return useMutation(
    {
      mutationFn: async (
        config: Omit<InferDTOs<typeof EditEventInterfaces>, "response">,
      ) => {
        const { params, body } = config;

        const url = `/v1/events/${params.eventId}`;

        const validatedBody = EditEventInterfaces.body.parse(body);

        const response = await RequestClient.patch(url, validatedBody);

        return EditEventInterfaces.response.parse(response);
      },
    },
  );
};

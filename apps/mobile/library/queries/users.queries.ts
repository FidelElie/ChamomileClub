import {
  CreateUsersInterfaces,
  DeleteUserInterfaces,
  EditUserInterfaces,
  FetchUsersInterfaces,
  InferDTOs,
  useMutation,
  useQuery,
} from "@thechamomileclub/api";

import { fetchClient } from "../client";

export const useFetchUsers = (
  query: InferDTOs<typeof FetchUsersInterfaces>["query"],
) =>
  useQuery({
    queryKey: ["users", query],
    queryFn: async () => {
      const queryParams = new URLSearchParams(query as unknown as URLSearchParams);

      const url = `/v1/users${queryParams.size ? `?${queryParams.toString()}` : ""}`;

      const response = await fetchClient.fetch(url, { method: "GET" });

      return FetchUsersInterfaces.response.parse(response);
    },
  });

export const useCreateUsers = () =>
  useMutation(async (context: InferDTOs<typeof CreateUsersInterfaces>) => {
    const { body } = context;

    const validatedBody = CreateUsersInterfaces.body.parse(body);

    const url = "/v1/users";

    const response = await fetchClient.fetch(url, {
      method: "POST",
      body: JSON.stringify(validatedBody),
    });

    return CreateUsersInterfaces.response.parse(response);
  });

export const useEditUser = () =>
  useMutation(async (context: InferDTOs<typeof EditUserInterfaces>) => {
    const {
      params: { userId },
      body,
    } = context;

    const validatedBody = EditUserInterfaces.body.parse(body);

    const url = `/v1/users/${userId}`;

    const response = await fetchClient.fetch(url, {
      method: "PATCH",
      body: JSON.stringify(validatedBody),
    });

    return EditUserInterfaces.response.parse(response);
  });

export const useDeleteUser = () =>
  useMutation(async (context: InferDTOs<typeof DeleteUserInterfaces>) => {
    const {
      params: { userId },
    } = context;

    const url = `/v1/users/${userId}`;

    const response = await fetchClient.fetch(url, { method: "DELETE" });

    return DeleteUserInterfaces.response.parse(response);
  });

import {
  CreateUsersInterfaces,
  DeleteUserInterfaces,
  EditUserInterfaces,
  FetchUsersInterfaces,
  InferDTOs,
  useMutation,
  useQuery,
} from "@thechamomileclub/api";

import { RequestClient } from "../configs";

export const useFetchUsers = (
  query: InferDTOs<typeof FetchUsersInterfaces>["query"],
  config?: { enabled?: boolean; },
) => {
  return useQuery(
    {
      queryKey: ["users", query],
      queryFn: async () => {
        console.log(query);
        const queryParams = new URLSearchParams(query as unknown as URLSearchParams);

        const url = `/v1/users${queryParams.size ? `?${queryParams.toString()}` : ""}`;

        console.log(url);

        const response = await RequestClient.get(url);

        return FetchUsersInterfaces.response.parse(response.data);
      },
      ...(config || {}),
    },
  );
};

export const useCreateUsers = () => {
  return useMutation(
    {
      mutationFn: async (context: InferDTOs<typeof CreateUsersInterfaces>) => {
        const { body } = context;

        const validatedBody = CreateUsersInterfaces.body.parse(body);

        const url = "/v1/users";

        const response = await RequestClient.post(url, validatedBody);

        return CreateUsersInterfaces.response.parse(response.data);
      },
    },
  );
};
export const useEditUser = () => {
  return useMutation(
    {
      mutationFn: async (context: InferDTOs<typeof EditUserInterfaces>) => {
        const {
          params: { userId },
          body,
        } = context;

        const validatedBody = EditUserInterfaces.body.parse(body);

        const url = `/v1/users/${userId}`;

        const response = await RequestClient.patch(url, validatedBody);

        return EditUserInterfaces.response.parse(response.data);
      },
    },
  );
};

export const useDeleteUser = () => {
  return useMutation(
    {
      mutationFn: async (context: InferDTOs<typeof DeleteUserInterfaces>) => {
        const {
          params: { userId },
        } = context;

        const url = `/v1/users/${userId}`;

        const response = await RequestClient.delete(url);

        return DeleteUserInterfaces.response.parse(response.data);
      },
    },
  );
};

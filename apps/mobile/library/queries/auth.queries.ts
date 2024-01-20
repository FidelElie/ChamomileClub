import {
  GetCurrentUserInterfaces,
  StartAuthProcessInterfaces,
  UpdateCurrentUserInterfaces,
  useMutation,
  useQuery,
  ValidateLoginCodeInterfaces,
} from "@thechamomileclub/api";

import { RequestClient } from "../configs";

export const useGetCurrentUser = () => {
  return useQuery(
    {
      queryKey: ["auth"],
      queryFn: async () => {
        const response = await RequestClient.get("/v1/auth");

        return GetCurrentUserInterfaces.response.parse(response.data);
      },
    },
  );
};

export const useStartAuthProcess = () => {
  return useMutation(
    {
      mutationFn: async (body: StartAuthProcessInterfaces["body"]) => {
        const validatedBody = StartAuthProcessInterfaces.body.parse(body);

        const response = await RequestClient.post("/v1/auth", validatedBody);

        return StartAuthProcessInterfaces.response.parse(response.data);
      },
    },
  );
};

export const useValidateLoginCode = (config?: {
  onSuccess?: (data: { token: string; }) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation(
    {
      mutationFn: async (body: ValidateLoginCodeInterfaces["body"]) => {
        const validatedBody = ValidateLoginCodeInterfaces.body.parse(body);

        const response = await RequestClient.put("/v1/auth", validatedBody);

        return ValidateLoginCodeInterfaces.response.parse(response.data);
      },
      ...(config || {}),
    },
  );
};

export const useUpdateCurrentUser = (config?: {
  onSuccess?: (data: string) => void;
  onError?: (error: unknown) => void;
  onMutate?: () => void;
}) => {
  return useMutation(
    {
      mutationFn: async (body: UpdateCurrentUserInterfaces["body"]) => {
        const validatedBody = UpdateCurrentUserInterfaces.body.parse(body);

        const response = await RequestClient.patch("/v1/auth", validatedBody);

        return UpdateCurrentUserInterfaces.response.parse(response.data);
      },
      ...(config || {}),
    },
  );
};

export const useLogoutUser = (config?: { onSuccess?: () => void; }) => {
  return useMutation(
    {
      mutationFn: () => RequestClient.delete("v1/auth"),
      ...(config || {}),
    },
  );
};

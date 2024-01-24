import { UnauthorisedException } from "./exceptions";
import { ApiRequestWithAuth, Context, RequestEntities } from "./types";

export const useAuth = <T extends Context<RequestEntities, ApiRequestWithAuth>>(
  context: T,
) => context.$request.auth;

export const useEnsureAuth = <T extends Context<RequestEntities, ApiRequestWithAuth>>(
  context: T,
  onError?: () => void,
) => {
  const { auth } = context.$request;

  if (!auth) {
    if (onError) { onError(); }

    throw new UnauthorisedException("Session not found");
  }

  return auth;
};

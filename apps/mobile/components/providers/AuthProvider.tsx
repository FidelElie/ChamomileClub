import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import type { UserEntity } from "@thechamomileclub/api";

import { AppConfig } from "../../library/configs";
import { useAsyncStorage } from "../../library/hooks";
import { useGetCurrentUser, useLogoutUser } from "../../library/queries";

import { SplashScreen } from "@/components/screens/SplashScreen";

const initialContext: AuthContextType = {
  session: null,
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  initialising: true,
  setInitialising: () => {},
};

const AuthContext = createContext(initialContext);

export const AuthProvider = ({ children, suspend }: AuthProviderProps) => {
  const [token, setToken] = useAsyncStorage(
    AppConfig.SESSION_STORAGE_KEY,
    initialContext.token,
  );
  const [initialising, setInitialising] = useState(initialContext.initialising);

  const currentUserQuery = useGetCurrentUser();
  const logoutUser = useLogoutUser({ onSuccess: () => setToken(null) });

  const isInitialising = initialising || !!suspend;

  const login = (token: string) => {
    setToken(token);
    currentUserQuery.refetch();
  };

  const logout = () => {
    logoutUser.mutate();
    currentUserQuery.refetch();
  };

  useEffect(() => {
    if (currentUserQuery.isFetched) {
      setInitialising(false);
    }
  }, [currentUserQuery]);

  return (
    <AuthContext.Provider
      value={{
        ...(currentUserQuery.isSuccess
          ? currentUserQuery.data
          : { session: null, user: null }),
        token: token || null,
        initialising: isInitialising,
        login,
        logout,
        setInitialising,
      }}
    >
      {children}
      <SplashScreen show={isInitialising} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return authContext;
};

export const useEnsureAuth = (): NonNullableKeys<AuthContextType> => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  if (!authContext.user || !authContext.session || !authContext.token) {
    authContext.setInitialising(true);
  }

  return authContext as NonNullableKeys<AuthContextType>;
};

type NonNullableKeys<T> = { [Param in keyof T]: NonNullable<T[Param]>; };

type AuthContextType = {
  session: string | null;
  user: UserEntity | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  initialising: boolean;
  setInitialising: (
    state: boolean | ((currentState: boolean) => boolean),
  ) => void;
};

export interface AuthProviderProps {
  suspend?: boolean;
  children: ReactNode;
}

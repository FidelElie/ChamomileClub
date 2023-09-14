import { ReactNode, createContext, useContext, useEffect } from "react";

import type { UserSchema } from "@thechamomileclub/api";

import { AppConfig } from "../configs";
import { useAsyncStorage } from "../hooks";
import { useGetCurrentUser, useLogoutUser } from "../queries";

import { SplashScreen } from "@/components/interfaces";

const initialContext: AuthContextType = {
	session: null,
	user: null,
	token: null,
	login: () => {},
	logout: () => {},
	initialising: true
}

const AuthContext = createContext(initialContext);

export const AuthProvider = ({ children, suspend }: AuthProviderProps) => {
	const [token, setToken] = useAsyncStorage<string | null>(AppConfig.SESSION_STORAGE_KEY, null);

	const currentUserQuery = useGetCurrentUser();
	const logoutUser = useLogoutUser({ onSuccess: () => setToken(null) });

	const initialising = !currentUserQuery.isFetched || !!suspend

	const login = (token: string) => { setToken(token); }

	const logout = async () => logoutUser.mutate();

	useEffect(() => { currentUserQuery.refetch(); }, [token]);

	return (
		<AuthContext.Provider
			value={{
				...(currentUserQuery.isSuccess ? currentUserQuery.data : { session: null, user: null }),
				token: token || null,
				initialising,
				login,
				logout,
			}}
		>
			{ children }
			<SplashScreen show={initialising || !!suspend}/>
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const authContext = useContext(AuthContext);

	if (!authContext) { throw new Error("useAuth must be used within AuthProvider"); }

	return authContext;
}

type AuthContextType = {
	session: string | null;
	user: UserSchema | null;
	token: string | null;
	login: (token: string) => void;
	logout: () => void;
	initialising: boolean;
}

export interface AuthProviderProps {
	suspend?: boolean;
	children: ReactNode;
}

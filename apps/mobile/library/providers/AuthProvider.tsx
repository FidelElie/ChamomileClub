import { ReactNode, createContext, useContext } from "react";

import type { UserSchema } from "@thechamomileclub/api";

import { useAsyncStorage } from "../hooks";
import { useGetCurrentUser } from "../queries";
import { AppConfig } from "../configs/app.config";

const initialContext: AuthContextType = {
	user: null,
	token: null,
	login: () => {},
	logout: () => {}
}

const AuthContext = createContext(initialContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [token, setToken] = useAsyncStorage<string | null>(AppConfig.SESSION_STORAGE_KEY, null);
	const currentUserQuery = useGetCurrentUser();

	const login = (token: string) => {  setToken(token); }

	const logout = () => { setToken(null); }

	return (
		<AuthContext.Provider value={{
			user: currentUserQuery.isSuccess ? currentUserQuery.data : null,
			token,
			login,
			logout
		}}>
			{ children }
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const authContext = useContext(AuthContext);

	if (!authContext) { throw new Error("useAuth must be used within AuthProvider"); }

	return authContext;
}

type AuthContextType = {
	user: UserSchema | null;
	token?: string | null;
	login: (token: string) => void;
	logout: () => void;
}

export interface AuthProviderProps {
	children: ReactNode;
}

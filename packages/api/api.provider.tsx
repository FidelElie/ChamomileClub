import { createContext, useContext, useState, type ReactNode } from "react";
import { QueryClientProvider, Hydrate, type QueryClient, useQueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useGetCurrentUser, GetCurrentUserResponse } from "./spec";

const initialContext: AuthContextType = {
	user: null,
	initialising: true,
	login: () => {},
	logout: () => {}
}

const AuthContext = createContext(initialContext);

export const ApiProvider = (props: ApiProvider) => {
	const { client, dehydratedState, children } = props;

	return (
		<QueryClientProvider client={client}>
			<Hydrate state={dehydratedState}>
				<AuthProvider>
					{ children }
					<ReactQueryDevtools position="bottom-right"/>
				</AuthProvider>
			</Hydrate>
		</QueryClientProvider>
	)
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState(initialContext.user);
	const [initialising, setInitialising] = useState(initialContext.initialising);

	const queryClient = useQueryClient();

	useGetCurrentUser({
		onSuccess: (data) => { setUser(data) },
		onSettled: () => { setInitialising(false); }
	});

	const login = (token: string) => {
		document.cookie = `access-token=${token}; path="/";`;
		queryClient.invalidateQueries(["user"]);
	}

	const logout = () => {
		document.cookie = `access-token=null; path="/"; maxAge=0`;
		queryClient.invalidateQueries(["user"]);
	}

	return (
		<AuthContext.Provider value={{ user, initialising, login, logout }}>
			{ children }
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) { throw new Error("useAuth needs to be used within ApiProvider"); }

	return context;
}

export interface ApiProvider {
	client: QueryClient,
	dehydratedState?: unknown,
	children: ReactNode
}

interface AuthContextType {
	user: GetCurrentUserResponse,
	initialising: boolean,
	login: (token: string) => void,
	logout: () => void
}

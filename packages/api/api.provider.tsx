import { createContext, useContext, useState, type ReactNode } from "react";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";

import { useGetCurrentUser, GetCurrentUserResponse } from "./spec";

const initialContext: AuthContextType = { user: null, initialising: true }

const AuthContext = createContext(initialContext);

export const ApiProvider = (props: ApiProvider) => {
	const { client, children } = props;

	return (
		<QueryClientProvider client={client}>
			<AuthProvider>
				{ children }
			</AuthProvider>
		</QueryClientProvider>
	)
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState(initialContext.user);
	const [initialising, setInitialising] = useState(initialContext.initialising);

	useGetCurrentUser({
		onSuccess: (data) => { setUser(data) },
		onSettled: () => { setInitialising(false); }
	});

	return (
		<AuthContext.Provider value={{ user, initialising }}>
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
	children: ReactNode
}

interface AuthContextType {
	user: GetCurrentUserResponse,
	initialising: boolean,
}

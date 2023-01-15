import { ReactNode, createContext } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useGetCurrentUser } from "./functions";

const defaultQueryOptions = { debug: true }

const APIProvider = (props: APIProviderProps) => {
	const { client, children, queryOptions = {} } = props;

	const { debug } = { ...defaultQueryOptions, ...queryOptions }

	return (
		<QueryClientProvider client={client}>
			<AuthProvider>
				{ children }
			</AuthProvider>
			{ debug !== false && <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/> }
		</QueryClientProvider>
	)
}

const AuthContext = createContext({});

const AuthProvider = (props: AuthProviderProps) => {
	const { children } = props;

	const currentUserQuery = useGetCurrentUser();

	return (
		<AuthContext.Provider value={props}>
			{ children }
		</AuthContext.Provider>
	)
}

interface APIProviderProps {
	client: QueryClient,
	children: ReactNode,
	queryOptions?: { debug?: boolean }
}

interface AuthProviderProps {
	children: ReactNode
}

export default APIProvider;

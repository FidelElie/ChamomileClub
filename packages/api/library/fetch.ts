export const createFetchClient = (config: FetchClientConfig) => {
	const { baseURL, interceptors } = config;

	const wrappedFetch = async (input: RequestInfo | URL, init?: RequestInit | undefined) => {
		const initConfig = interceptors?.request ? await interceptors.request(init) : init;

		const request = await fetch(input, { ...init, ...initConfig });

		if (request.status >= 400) {
			throw new Error(`Request Error with status code ${request.status}`);
		}

		if (request.status === 204) { return null; }

		return request.json();
	}

	return { baseURL, fetch: wrappedFetch };
}

export type FetchClientConfig = {
	baseURL?: string;
	interceptors?: {
		request: (init?: RequestInit) => RequestInit | Promise<RequestInit>,
	}
}

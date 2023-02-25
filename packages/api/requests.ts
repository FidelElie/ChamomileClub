export type RequestInput = RequestInfo | URL;

export type Method = (
	input: RequestInput,
	init?: Omit<RequestInit, "method">
) => Promise<any>

export type MethodWithBody = (
	input: RequestInput,
	body?: any,
	init?: Omit<RequestInit, "method" | "body">
) => Promise<any>;

const baseRequest = async (input: RequestInput, init: RequestInit = {}) => {
	const body = init.body ? JSON.stringify(init.body) : undefined;

	const response = await fetch(input, {
		...init,
		headers: {
			"Content-Type": "application/json",
			...(init.headers ? init.headers: {})
		},
		body
	});

	if (response.status === 204) { return null; }

	if (response.status >= 400) { throw new Error(""); }

	return await response.json();
}

const parseUrl = (route: RequestInput, queries: { [query: string]: string }) => {
	const queryEntries: [string, any][] = Object.entries(queries);

	const parsedQueries = queryEntries.map(entry => {
		const [key, value] = entry;

		if (Array.isArray(value)) {
			return [key, value.join(",")];
		} else if (typeof value === "object") {
			return [key, JSON.stringify(value)];
		} else {
			return [key, encodeURIComponent(value.toString(value))]
		}
	});

	const queryString = parsedQueries.map(query => query.join("=")).join("&");

	return `${route}${queryString ? `?${queryString}` : ""}`;
}

const getRequest: Method = (input, init = {}) => {
	return baseRequest(input, { ...init, method: "GET",  })
}

const postRequest: MethodWithBody = (input, body, init = {}) => {
	return baseRequest(input, { ...init, method: "POST", body });
}

const putRequest: MethodWithBody = (input, body, init = {}) => {
	return baseRequest(input, { ...init, method: "PUT", body });
}

const patchRequest: MethodWithBody = (input, body, init = {}) => {
	return baseRequest(input, { ...init, method: "PATCH", body });
}

const deleteRequest: Method = (input, init = {}) => {
	return baseRequest(input, { ...init, method: "DELETE" });
}

const requests = Object.assign(baseRequest, {
	get: getRequest,
	post: postRequest,
	put: putRequest,
	patch: patchRequest,
	delete: deleteRequest,
	url: parseUrl
});

export { requests }


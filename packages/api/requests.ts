const requests = {
	get: async (url: string) => {
		const request = await fetch(url, { method: "GET" });

		const response = await request.json();

		return response;
	},
	post: async (url: string, body: any = {}) => {
		const request = await fetch(url, { method: "POST", body: JSON.stringify(body) });

		const response = await request.json();

		return response;
	},
	patch: async (url: string, body: any) => {
		const request = await fetch(url, { method: "PATCH", body: JSON.stringify(body) });

		const response = await request.json();

		return response;
	},
	delete: async (url: string) => {
		const request = await fetch(url, { method: "DELETE" });

		const response = await request.json();

		return response;
	}
}

export default requests;

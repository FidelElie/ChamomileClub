import { Platform } from "react-native";

import { axios } from "@thechamomileclub/api";

const parseAxiosConfig = () => {
	if (process.env.NODE_ENV !== "development") { return { baseURL: process.env.EXPO_PUBLIC_API_URL }}

	const urlPrefix = Platform.OS === "ios" ? "http://localhost" : "http://127.0.0.1";

	return { baseURL: `${urlPrefix}:${process.env.EXPO_PUBLIC_PROXY_SERVER_PORT}` }
}

export const axiosClient = axios.create({ ...parseAxiosConfig() });

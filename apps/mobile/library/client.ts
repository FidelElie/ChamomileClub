import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { axios } from "@thechamomileclub/api";

import { AppConfig } from "./configs/app.config";

const parseAxiosConfig = () => {
	if (process.env.NODE_ENV !== "development") { return { baseURL: process.env.EXPO_PUBLIC_API_URL }}

	const urlPrefix = Platform.OS === "ios" ? "http://localhost" : "http://127.0.0.1";

	return { baseURL: `${urlPrefix}:${process.env.EXPO_PUBLIC_PROXY_SERVER_PORT}` }
}

export const axiosClient = axios.create({ ...parseAxiosConfig() });

axiosClient.interceptors.request.use(async (config) => {
	try {
		const value = await AsyncStorage.getItem(AppConfig.SESSION_STORAGE_KEY);

		console.log(value);

		if (value !== null) {
			const parsedValue = JSON.parse(value);

			if (parsedValue !== null) {
				config.headers['Authorization'] = 'Bearer ' + parsedValue;
			}
		}

		return config;
	} catch (error) {
		return config;
	}
});

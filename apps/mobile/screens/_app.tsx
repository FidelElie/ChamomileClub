import { useCallback, useEffect } from "react";
import { AppState } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
	QueryClientProvider,
	QueryClient,
	onlineManager,
	focusManager
} from "@thechamomileclub/api";

import { NotCourierSansFont, PollerOneFont } from "@/assets";

import { AuthProvider } from "@/library/providers";

import RootLayout from "./_layout";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync().catch(() => {});

const fonts = {
	"Not-Courier": NotCourierSansFont,
	"Poller-One": PollerOneFont
}

const queryClient = new QueryClient();

export default function App() {
	const [fontsLoaded, fontsError] = useFonts(fonts);

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontsError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontsError]);

	onlineManager.setEventListener(setOnline => {
		return NetInfo.addEventListener(state => setOnline(!!state.isConnected))
	});

	useEffect(() => {
		const subscription = AppState.addEventListener("change", (status) => {
			focusManager.setFocused(status === "active")
		});

		return () => subscription.remove();
	}, []);

	if (!fontsLoaded && !fontsError) { return null; }

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<NavigationContainer>
					<RootLayout  onLayoutRootView={onLayoutRootView}/>
				</NavigationContainer>
			</AuthProvider>
		</QueryClientProvider>
	);
}

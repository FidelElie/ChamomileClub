import { useCallback, useEffect } from "react";
import { AppState } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";

import {
	QueryClientProvider,
	QueryClient,
	onlineManager,
	focusManager
} from "@thechamomileclub/api";

import NotCourierFont from "@/assets/fonts/NotCourier-sans-Bold.ttf";
import PollerOne from "@/assets/fonts/PollerOne-Regular.ttf";

import { AuthProvider } from "@/library/providers";

import RootLayout from "./_layout";

SplashScreen.preventAutoHideAsync();

const fonts = {
	"Not-Courier": NotCourierFont,
	"Poller-One": PollerOne
}

const queryClient = new QueryClient();

export default function App() {
	const [fontsLoaded, fontError] = useFonts(fonts);

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	onlineManager.setEventListener(setOnline => {
		return NetInfo.addEventListener(state => setOnline(!!state.isConnected))
	});

	useEffect(() => {
		const subscription = AppState.addEventListener("change", (status) => {
			focusManager.setFocused(status === "active")
		});

		return () => subscription.remove();
	}, []);

	if (!fontsLoaded && !fontError) { return null; }

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<NavigationContainer>
					<RootLayout onLayoutRootView={onLayoutRootView} />
				</NavigationContainer>
			</AuthProvider>
		</QueryClientProvider>
	);
}

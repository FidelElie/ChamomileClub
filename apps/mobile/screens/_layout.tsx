import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./login";
import LandingScreen from "./landing";
import OneTimePasswordScreen from "./otp";

const Stack = createNativeStackNavigator();

export default function RootLayout ({ onLayoutRootView }: RootLayoutProps) {
	const user = null;

	return (
		<View className="h-full w-full bg-cream" onLayout={onLayoutRootView}>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{
					!user ? (
						<>
							<Stack.Screen name="Landing" component={LandingScreen} />
							<Stack.Screen name="Login" component={LoginScreen} />
							<Stack.Screen name="OTP" component={OneTimePasswordScreen} />
						</>
					) : (
						<>
						</>
					)
				}
			</Stack.Navigator>
		</View>
	)
}

export interface RootLayoutProps {
	onLayoutRootView: () => Promise<void>
}

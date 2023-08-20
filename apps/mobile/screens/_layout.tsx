import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Flex } from "@thechamomileclub/ui";

import { useAuth } from "@/library/providers";

import LoginScreen from "./login";
import LandingScreen from "./landing";
import OneTimePasswordScreen from "./otp";

const Stack = createNativeStackNavigator();

export default function RootLayout ({ onLayoutRootView }: RootLayoutProps) {
	const { user } = useAuth();

	return (
		<Flex className="h-full w-full bg-cream" onLayout={onLayoutRootView}>
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
		</Flex>
	)
}

export interface RootLayoutProps {
	onLayoutRootView: () => Promise<void>
}

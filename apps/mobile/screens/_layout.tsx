import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Flex } from "@thechamomileclub/ui";

import { useAuth } from "@/library/providers";
import type { RootStackParamList } from "./_types";

import LoginScreen from "./login";
import LandingScreen from "./landing";
import OneTimePasswordScreen from "./otp";

import BridgeScreen from "./bridge";
import HomeTabLayout from "./(home)/_layout";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout ({ onLayoutRootView }: RootLayoutProps) {
	const { user, initialising } = useAuth();

	return (
		<Flex className="h-full w-full bg-green" onLayout={onLayoutRootView}>
			{
				!initialising && (
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						{
							!user && (
								<Stack.Group>
									<Stack.Screen name="Landing" component={LandingScreen} />
									<Stack.Screen name="Login" component={LoginScreen} />
									<Stack.Screen name="OTP" component={OneTimePasswordScreen} />
								</Stack.Group>
							)
						}
						{
							(user && !user.active) && (
								<Stack.Screen name="Bridge" component={BridgeScreen} />
							)
						}
						{
							(user && user.active) && (
								<Stack.Group>
									<Stack.Screen name="HomeTabs" component={HomeTabLayout} />
								</Stack.Group>
							)
						}
					</Stack.Navigator>
				)
			}
		</Flex>
	)
}

export interface RootLayoutProps {
	onLayoutRootView: () => Promise<void>
}

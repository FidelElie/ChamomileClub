import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LandingStackParamList } from "./_types";

import { LandingLayout } from "@/components/interfaces";

import LoginScreen from "./login";
import LandingScreen from "./landing";
import OneTimePasswordScreen from "./otp";

const LandingStack = createNativeStackNavigator<LandingStackParamList>();

export default function LandingStackLayout() {
	return (
		<LandingLayout>
			<LandingStack.Navigator
				initialRouteName="Landing"
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: "rgba(0, 0, 0, 0)"},
					animation: "none"
				}}
			>
				<LandingStack.Screen name="Landing" component={LandingScreen} />
				<LandingStack.Screen name="Login" component={LoginScreen} />
				<LandingStack.Screen name="OTP" component={OneTimePasswordScreen} />
			</LandingStack.Navigator>
		</LandingLayout>
	)
}

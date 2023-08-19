import { Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";

import { LandingLayout, OneTimePasswordDisplay } from "../components/interfaces";

import type { RootStackNavigationProps } from "./_types";

const StyledPressable = styled(Pressable);

const OneTimePasswordScreen = () => {
	const navigation = useNavigation<RootStackNavigationProps>();

	const handleOTPVerification = async (code: string) => {
		try {
			console.log(code);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<LandingLayout>
			<View className="mb-6 space-y-2">
				<Text className="font-heading uppercase text-white text-center text-xl">
					Enter your code
				</Text>
				<Text className="text-cream font-body uppercase text-center">
					Please enter the one time password we have sent to your email.
				</Text>
			</View>
			<View className="space-y-3">
				<OneTimePasswordDisplay onSubmit={handleOTPVerification}/>
				<StyledPressable
					className="bg-cream px-5 rounded-lg py-2 active:opacity-50"
					onPressIn={() => navigation.navigate("Landing")}
				>
					<Text className="font-body text-center uppercase text-base text-black">
						Cancel
					</Text>
				</StyledPressable>
			</View>
		</LandingLayout>
	)
}

export default OneTimePasswordScreen;

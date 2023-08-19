import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import clsx from "clsx";
import { styled } from "nativewind";

import { LandingLayout } from "@/components/interfaces";

import type { RootStackNavigationProps } from "./_types";

const StyledPressable = styled(Pressable);

const LandingScreen = () => {
	const navigation = useNavigation<RootStackNavigationProps>();

	const [email, setEmail] = useState("");

	const handleSubmission = async () => {
		try {
			// console.log(email);
			navigation.navigate("OTP" , {
				keyId: ""
			});
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<LandingLayout>
			<View className="justify-center space-y-3">
				<Text className="uppercase text-center text-white font-heading text-lg">
					Enter Email Address
				</Text>
				<View className="px-5 py-2.5 justify-center border-0.5 rounded-lg border-cream mb-3">
					<TextInput
						className="font-body tracking-wide text-cream text-center"
						keyboardType="email-address"
						value={email.toUpperCase()}
						autoComplete="email"
						onChangeText={email => setEmail(email.toLowerCase())}
					/>
				</View>
			</View>
			<StyledPressable
				className={clsx(
					"bg-green px-5 rounded-lg py-2",
					"active:opacity-50",
					!email && "opacity-75"
				)}
				disabled={!email}
				onPressIn={handleSubmission}
			>
				<Text className="font-body uppercase text-white text-base text-center">Login</Text>
			</StyledPressable>
		</LandingLayout>
	)
}

export default LandingScreen;

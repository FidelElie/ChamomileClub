import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { StartAuthProcessInterfaces, safeParse } from "@thechamomileclub/api";

import { useStartAuthProcess } from "@/library/queries";

import { Button, Copy, Heading, TextField, Flex, TextFieldRef } from "@/components/core";

import { LandingLayout } from "@/components/interfaces";

import type { RootStackNavigationProps } from "./_types";

const LoginScreen = () => {
	const inputRef = useRef<TextFieldRef>(null);

	const navigation = useNavigation<RootStackNavigationProps>();

	const [email, setEmail] = useState("");

	const startAuthProcess = useStartAuthProcess();

	const validSubmission = safeParse(StartAuthProcessInterfaces.body, { email });

	const handleSubmission = async () => {
		try {
			const response = await startAuthProcess.mutateAsync({ email: email.toLowerCase() });

			navigation.navigate("OTP", { keyId: response.keyId });
		} catch (error: any) {
			if (!error.response) { console.error(error); }

			const { data } = error.response;
		}
	}

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<LandingLayout>
			<Flex className="justify-center mb-3">
				<Heading className="text-center mb-3">Email Address</Heading>
				<TextField
					ref={inputRef}
					placeholder="ENTER HERE"
					textAlign="center"
					keyboardType="email-address"
					value={email.toUpperCase()}
					autoComplete="email"
					onChangeText={setEmail}
				/>
			</Flex>
			<Flex className="space-y-3">
				<Button.Primary disabled={!validSubmission.success} onPressIn={handleSubmission}>
					<Copy>Continue</Copy>
				</Button.Primary>
				<Button.Secondary onPressIn={() => navigation.navigate("Landing")}>
					<Copy color="black">Back</Copy>
				</Button.Secondary>
			</Flex>
		</LandingLayout>
	)
}

export default LoginScreen;

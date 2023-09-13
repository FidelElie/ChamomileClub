import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { InferDTOs, StartAuthProcessInterfaces } from "@thechamomileclub/api";
import {
	Button,
	Copy,
	Heading,
	TextField,
	Flex,
	TextFieldRef,
	Show,
	Banner
} from "@thechamomileclub/ui";

import { useStartAuthProcess } from "@/library/queries";
import type { RootStackNavigationProps } from "./_types";

import { LandingLayout } from "@/components/interfaces";

type SubmissionErrors = null | StartAuthProcessInterfaces["404"] | StartAuthProcessInterfaces["422"]

const LoginScreen = () => {
	const inputRef = useRef<TextFieldRef>(null);

	const navigation = useNavigation<RootStackNavigationProps>();

	const [email, setEmail] = useState("");
	const [error, setError] = useState<SubmissionErrors>(null);

	const startAuthProcess = useStartAuthProcess();

	const validSubmission = StartAuthProcessInterfaces.body.safeParse({ email });

	const handleSubmission = async () => {
		setError(null);
		try {
			const response = await startAuthProcess.mutateAsync({ email: email.toLowerCase() });

			navigation.navigate("OTP", { keyId: response.keyId });
		} catch (error: any) {
			if (!error.response) { console.error(error); }

			const { data } = error.response;
			setError(data);
		}
	}

	useEffect(() => { inputRef.current?.focus(); }, []);

	return (
		<LandingLayout>
			<Flex className="justify-center mb-6">
				<Heading className="text-center mb-5">Email Address</Heading>
				<TextField
					ref={inputRef}
					placeholder="ENTER HERE"
					textAlign="center"
					keyboardType="email-address"
					value={email.toUpperCase()}
					autoComplete="email"
					onChangeText={text => setEmail(text)}
				/>
				<Show if={error}>
					{ error => (
						<Banner.Error className="mt-2">
							<Copy color="midnight-100" className="text-center text-sm opacity-90">
								{ error.status === 404 && "We Couldn't find your account" }
							</Copy>
						</Banner.Error>
					)}
				</Show>
			</Flex>
			<Flex className="space-y-3">
				<Button.Primary disabled={!validSubmission.success} onPressIn={handleSubmission}>
					<Copy>Continue</Copy>
				</Button.Primary>
				<Button.Secondary onPressIn={() => navigation.navigate("Landing")}>
					<Copy color="green">Back</Copy>
				</Button.Secondary>
			</Flex>
		</LandingLayout>
	)
}

export default LoginScreen;

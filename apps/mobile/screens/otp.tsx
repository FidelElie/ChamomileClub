import { useNavigation, useRoute } from "@react-navigation/native";

import { useValidateLoginCode } from "@/library/queries";

import type { RootStackNavigationProps, RootStackRouteProps } from "./_types";

import { Button, Copy, Heading, Flex } from "@/components/core";

import { LandingLayout } from "@/components/interfaces";

import { OneTimePasswordDisplay } from "@/components/screens/otp/OneTimePasswordDisplay";

const OneTimePasswordScreen = () => {
	const route = useRoute<RootStackRouteProps<"OTP">>();
	const navigation = useNavigation<RootStackNavigationProps>();

	const validateLoginCode = useValidateLoginCode();

	const handleOTPVerification = async (code: string) => {
		try {
			const response = await validateLoginCode.mutateAsync({
				keyId: route.params.keyId,
				code
			});
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<LandingLayout>
			<Flex.Column className="mb-6 space-y-2 items-center">
				<Heading size="xl">Enter your code</Heading>
				<Copy color="cream" className="text-center">
					Please enter the one time password we have sent to your email
				</Copy>
			</Flex.Column>
			<Flex.Column className="space-y-3">
				<OneTimePasswordDisplay
					onSubmit={handleOTPVerification}
					isSubmitting={validateLoginCode.isLoading}
				/>
				<Button.Secondary onPressIn={() => navigation.navigate("Login")}>
					<Copy color="black">Cancel</Copy>
				</Button.Secondary>
			</Flex.Column>
		</LandingLayout>
	)
}

export default OneTimePasswordScreen;

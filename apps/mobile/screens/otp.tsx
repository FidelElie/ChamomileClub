import { useNavigation, useRoute } from "@react-navigation/native";

import { Button, Copy, Heading, Flex } from "@thechamomileclub/ui";

import { useAuth } from "@/library/providers";
import { useValidateLoginCode } from "@/library/queries";

import type { RootStackNavigationProps, RootStackRouteProps } from "./_types";

import { LandingLayout } from "@/components/interfaces";

import { OneTimePasswordDisplay } from "@/components/screens/otp/OneTimePasswordDisplay";

const OneTimePasswordScreen = () => {
	const { params: { keyId } } = useRoute<RootStackRouteProps<"OTP">>();
	const navigation = useNavigation<RootStackNavigationProps>();

	const { login } = useAuth();

	const validateLoginCode = useValidateLoginCode({
		onSuccess: (response) => login(response.token)
	});

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
					onSubmit={(code) => validateLoginCode.mutate({ keyId, code })}
					isSubmitting={validateLoginCode.isLoading}
				/>
				<Button.Secondary onPressIn={() => navigation.navigate("Login")}>
					<Copy color="midnight">Cancel</Copy>
				</Button.Secondary>
			</Flex.Column>
		</LandingLayout>
	)
}

export default OneTimePasswordScreen;

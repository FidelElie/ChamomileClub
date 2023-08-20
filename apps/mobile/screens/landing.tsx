import { useNavigation } from "@react-navigation/native";

import { Button, Copy, Flex } from "@thechamomileclub/ui";

import { LandingLayout } from "@/components/interfaces";

import type { RootStackNavigationProps } from "./_types";

const LandingScreen = () => {
	const navigation = useNavigation<RootStackNavigationProps>();

	return (
		<LandingLayout className="pb-5 space-y-5" logo={{ flow: true }}>
			<Flex className="flex-grow">

			</Flex>
			<Button.Primary onPressIn={() => navigation.navigate("Login")}>
				<Copy>Member Login</Copy>
			</Button.Primary>
		</LandingLayout>
	)
}

export default LandingScreen;

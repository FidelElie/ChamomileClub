import { Image } from "react-native";
import { ResizeMode } from "expo-av";
import { StatusBar } from "expo-status-bar";

import { Button, Copy, Flex, Heading } from "@thechamomileclub/ui";

import { YellowAltLogo } from "@/assets";

import { useAuth } from "@/library/providers";

const HomeScreen = () => {
	const { user, logout } = useAuth();

	const determineTimeOfDay = () => {
		const currentHour = (new Date()).getHours();

		if (currentHour >= 0 && currentHour < 12) {
			return "Morning";
		} else if (currentHour >= 12 && currentHour < 18) {
			return "Afternoon";
		} else {
			return "Evening";
		}
	}

	return (
		<Flex className="bg-green h-full">
			<StatusBar style="light" />
			<Flex className="items-end px-10 pt-3" safe>
				<Flex className="h-20 w-20 mb-0.5">
					<Image
						source={YellowAltLogo}
						className="h-full w-full"
						alt="Logo"
						resizeMode={ResizeMode.CONTAIN}
					/>
				</Flex>
				<Copy size="base" className="mb-0.5">Good {determineTimeOfDay()},</Copy>
				<Heading size="2xl">{user?.forename} {user?.surname}</Heading>
				<Copy size="sm" color="yellow">{user?.roles}</Copy>
			</Flex>
			<Flex className="flex-grow items-center justify-center">
				<Button.Secondary onPressIn={logout}>
					<Copy color="green">Logout</Copy>
				</Button.Secondary>
			</Flex>
		</Flex>
	)
}

export default HomeScreen;

import { useAuth } from "@/library/providers";
import { Button, Copy, Flex } from "@thechamomileclub/ui";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

const HomeScreen = () => {
	const { user, logout } = useAuth();

	return (
		<Flex className="bg-green h-full">
			<Flex className="bg-cream w-full h-72">

			</Flex>
		</Flex>
	)
}

export default HomeScreen;

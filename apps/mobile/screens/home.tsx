import { useAuth } from "@/library/providers";
import { Button, Copy, Flex } from "@thechamomileclub/ui";

const HomeScreen = () => {
	const { user, logout } = useAuth();

	return (
		<Flex className="bg-cream h-full items-center justify-center">
			<Button.Primary onPressIn={logout}>
				<Copy>Logout</Copy></Button.Primary>
		</Flex>
	)
}

export default HomeScreen;

import { Button, Copy, Flex } from "@thechamomileclub/ui";

import { useAuth } from "@/library/providers";

const ProfileScreen = () => {
	const { user, logout } = useAuth();

	return (
		<Flex className="bg-green h-full justify-center items-center">
			<Button.Secondary onPressIn={logout}>
				<Copy color="green">Logout</Copy>
			</Button.Secondary>
		</Flex>
	)
}

export default ProfileScreen;

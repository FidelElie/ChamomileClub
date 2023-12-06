import { ComponentProps, useState } from "react";
import { ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Button, COLORS, Copy, Flex, Heading, twJoin } from "@thechamomileclub/ui";

import { useEnsureAuth } from "@/library/providers";

import { DisplayLayout, ToggleCardButton } from "@/components/interfaces";
import { AuthStackNavigationProps } from "../_types";

const ProfileScreen = () => {
	const { user, logout } = useEnsureAuth();
	const navigation = useNavigation<AuthStackNavigationProps>();

	const [toggled, setToggled] = useState(false);

	return (
		<DisplayLayout title="Profile" subtitle="Your space" safe>
			<ScrollView className="h-full">
				<Flex.Column className="items-center bg-midnight rounded-lg py-4 px-6">
					<Button className="w-20 h-20 rounded-full border border-white mb-2.5">
						<AntDesign name="download" color={COLORS["white"]} size={27} />
					</Button>
					<Heading className="-mb-0.5">{user.forename} {user.surname}</Heading>
					<Copy size="sm" className="mb-0.5">{user.email}</Copy>
					<Copy size="xs" color="yellow">{user.roles.join(", ")}</Copy>
					<Flex className="border-b border-white mt-3 mb-3 w-full" />
					<Flex.Row className="w-full">
						<Flex.Column className="items-center w-1/2 py-1">
							<Copy size="sm" className="mb-1">Events</Copy>
							<Heading color="yellow" size="xl">N/A</Heading>
						</Flex.Column>
						<Flex className="border-l border-white" />
						<Flex.Column className="items-center w-1/2 py-1">
							<Copy size="sm" className="mb-1">Hands Won</Copy>
							<Heading color="yellow" size="xl">N/A</Heading>
						</Flex.Column>
					</Flex.Row>
				</Flex.Column>
				<Heading className="mt-5 mb-3">Notifications</Heading>
				<ToggleCardButton
					title="Events"
					subtitle={"Get notified about new events, polls\nand reminders"}
					toggled={toggled}
					onToggle={(toggleState) => setToggled(!toggleState)}
				/>
				<Heading className="mt-5 mb-3">Account</Heading>
				<NavigationCardButton
					classes="mb-3"
					title="Edit profile"
					subtitle="Update your details"
					icon="edit"
					onPressIn={() => navigation.navigate("EditProfile")}
				/>
				<NavigationCardButton
					title="Logout"
					subtitle="Come back soon"
					icon="logout"
					onPressIn={logout}
				/>
			</ScrollView>
		</DisplayLayout>
	)
}

const NavigationCardButton = (props: NavigationCardButtonProps) => {
	const { classes, title, subtitle, icon, onPressIn } = props;

	return (
		<Button className={twJoin("bg-midnight rounded-lg py-4 px-6", classes)} onPressIn={onPressIn}>
			<Flex.Row className="w-full items-center">
				<AntDesign name={icon} color={COLORS["white"]} size={30} className="mr-3" />
				<Flex.Column className="flex-grow mx-5">
					<Heading>{title}</Heading>
					<Copy color="yellow" size="xs">{subtitle}</Copy>
				</Flex.Column>
				<AntDesign name="right" color={COLORS["white"]} size={15} />
			</Flex.Row>
		</Button>
	)
}

interface NavigationCardButtonProps {
	classes?: string;
	title: string;
	subtitle: string;
	icon: ComponentProps<typeof AntDesign>["name"];
	onPressIn: ComponentProps<typeof Button>["onPressIn"];
}

export default ProfileScreen;

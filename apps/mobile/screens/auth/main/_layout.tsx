import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { COLORS, Flex, Show } from "@thechamomileclub/ui";

import { useAuth } from "@/library/providers";
import type { MainTabParamList } from "./_types";

import HomeScreen from "./home";
import ProfileScreen from "./profile";
import EventsScreen from "./events";
import CatalogScreen from "./catalog";

import { TabBarButton } from "@/components/screens/main/TabBarButton";

const MainTabs = createBottomTabNavigator<MainTabParamList>();

const iconMap = {
	Home: "home",
	Events: "calendar",
	Catalog: "book",
	Profile: "user",
	Add: undefined
} as const;

export default function MainTabsLayout() {
	const { user } = useAuth();

	if (user?.roles.includes("PROSPECT")) { return null; }

	return (
		<MainTabs.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarStyle: styles.tabBar,
				tabBarIcon: ({ focused }) => {
					const iconProps = {
						size: 22,
						color: COLORS[focused ? "yellow" : "white"],
						name: iconMap[route.name]
					}

					return (
						<Flex.Column className="items-center justify-center">
							<Show if={iconProps.name}>
								<AntDesign {...iconProps} />
							</Show>
						</Flex.Column>
					)
				},
				tabBarActiveTintColor: COLORS["yellow"],
				tabBarInactiveTintColor: COLORS["white"],
				tabBarShowLabel: false
			})}
		>
			<MainTabs.Screen name="Home" component={HomeScreen} />
			<MainTabs.Screen name="Events" component={EventsScreen} />
			{
				!user?.roles.includes("PROSPECT") && (
					<MainTabs.Screen
						name="Add"
						component={EmptyTab}
						options={{ tabBarButton: TabBarButton }}
					/>
				)
			}
			<MainTabs.Screen name="Catalog" component={CatalogScreen} />
			<MainTabs.Screen name="Profile" component={ProfileScreen} />
		</MainTabs.Navigator>
	)
}

const EmptyTab = () => null;

const styles = StyleSheet.create({
	tabBar: {
		backgroundColor: COLORS["midnight"],
		borderTopWidth: 0,
		display: "flex",
		flexDirection: "row",
		paddingTop: 15,
		height: 90,
	},
	tabBarButtonIcon: {
		width: 20,
		height: 20
	}
})

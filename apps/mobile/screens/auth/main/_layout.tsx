import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { COLORS } from "@thechamomileclub/ui";

import type { MainTabParamList } from "./_types";

import DirectoryScreen from "./directory";
import HomeScreen from "./home";
import ProfileScreen from "./profile";

const MainTabs = createBottomTabNavigator<MainTabParamList>();

export default function MainTabsLayout() {
	return (
		<MainTabs.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
				tabBarStyle: { backgroundColor: COLORS["midnight"], borderTopWidth: 0 },
				tabBarActiveTintColor: COLORS["midnight"],
				tabBarInactiveTintColor: COLORS["white"],
			}}
		>
			<MainTabs.Screen name="Directory" component={DirectoryScreen} />
			<MainTabs.Screen name="Home" component={HomeScreen} />
			<MainTabs.Screen name="Profile" component={ProfileScreen} />
		</MainTabs.Navigator>
	)
}

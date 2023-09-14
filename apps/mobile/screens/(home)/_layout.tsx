import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { COLORS } from '@thechamomileclub/ui';

import type { HomeTabParamList } from './_types';

import DirectoryScreen from './directory';
import HomeScreen from './home';
import ProfileScreen from './profile';

const Tab = createBottomTabNavigator<HomeTabParamList>();

const HomeTabLayout = () => {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
				tabBarStyle: { position: "absolute" },
				tabBarActiveTintColor: COLORS["midnight"],
				tabBarInactiveTintColor: COLORS["white"],
			}}
		>
			<Tab.Screen name="Directory" component={DirectoryScreen} />
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
	)
}

// backgroundColor: COLORS["cream"], borderTopWidth: 0,

export default HomeTabLayout;

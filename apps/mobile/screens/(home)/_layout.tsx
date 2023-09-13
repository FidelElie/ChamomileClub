import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import type { HomeTabParamList } from './_types';

import HomeScreen from './home';

const Tab = createBottomTabNavigator<HomeTabParamList>();

const HomeTabLayout = () => {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen name="Home" component={HomeScreen} />
		</Tab.Navigator>
	)
}

export default HomeTabLayout;

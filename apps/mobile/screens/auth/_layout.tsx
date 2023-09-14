import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { AuthStackParamList } from './_types';

import MainTabsLayout from './main/_layout';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const HomeTabLayout = () => {
	return (
		<AuthStack.Navigator
			initialRouteName="MainTabs"
			screenOptions={{ headerShown: false }}
		>
			<AuthStack.Screen name="MainTabs" component={MainTabsLayout}/>
		</AuthStack.Navigator>
	)
}

export default HomeTabLayout;

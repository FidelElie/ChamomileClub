import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { AuthStackParamList } from "./_types";

import MainTabsLayout from "./main/_layout";
import EditProfileScreen from "./edit-profile";
import CreateEventScreen from "./create-event";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const HomeTabLayout = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="MainTabs" component={MainTabsLayout} />
      <AuthStack.Screen name="EditProfile" component={EditProfileScreen} />
      <AuthStack.Screen name="CreateEvent" component={CreateEventScreen} />
    </AuthStack.Navigator>
  );
};

export default HomeTabLayout;

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Flex } from "@thechamomileclub/ui";

import { useAuth } from "@/library/providers";
import type { RootStackParamList } from "./_types";

import HomeTabLayout from "./auth/_layout";
import LandingStackLayout from "./landing/_layout";
import OnboardingScreen from "./onboarding";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
  const { user } = useAuth();

  return (
    <Flex className="h-full w-full bg-green">
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!user && <RootStack.Screen name="LandingStack" component={LandingStackLayout} />}
        {!user?.active && <RootStack.Screen name="Onboarding" component={OnboardingScreen} />}
        {user?.active && (
          <RootStack.Group>
            <RootStack.Screen name="HomeTabs" component={HomeTabLayout} />
          </RootStack.Group>
        )}
      </RootStack.Navigator>
    </Flex>
  );
}

export interface RootLayoutProps {
  onLayoutRootView: () => Promise<void>;
}

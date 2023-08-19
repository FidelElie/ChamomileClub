import { useCallback } from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import RootLayout from "screens/_layout";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const user = null;

  const [fontsLoaded, fontError] = useFonts({
    "Not-Courier": require("./assets/fonts/NotCourier-sans-Bold.ttf"),
    "Poller-One": require("./assets/fonts/PollerOne-Regular.ttf")
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) { return null; }

  return (
    <NavigationContainer>
      <RootLayout onLayoutRootView={onLayoutRootView}/>
    </NavigationContainer>
  );
}

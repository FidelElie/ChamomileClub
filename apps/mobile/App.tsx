import { SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView className="w-full h-full justify-center items-center">
        <Text className='text-xl text-center'>Open up App.tsx to start working on your app!</Text>
      </SafeAreaView>
    </NavigationContainer>
  );
}

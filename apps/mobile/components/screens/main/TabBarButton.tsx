import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import { COLORS } from "@thechamomileclub/common";
import { Button, ButtonProps, Flex } from "@thechamomileclub/ui";

import type { AuthStackNavigationProps } from "screens/auth/_types";

import { useAuth } from "@/components/providers";

export const TabBarButton = () => {
  const { user } = useAuth();
  const navigation = useNavigation<AuthStackNavigationProps>();

  const onPressIn = () => {
    if (!user?.roles.includes("FOUNDER")) {
      return navigation.navigate("CreateEvent");
    }

    return navigation.navigate("CreateEvent");
  };

  return (
    <Button
      className="border-2 rounded-full border-white w-12 h-12 mx-5"
      onPressIn={onPressIn}
    >
      <Flex className="h-full w-full items-center justify-center">
        <AntDesign
          name="plus"
          style={styles.tabBarButtonIcon}
          size={20}
          color={COLORS.yellow}
        />
      </Flex>
    </Button>
  );
};

// const TabBarButtonDisplay = ({
//   onPressIn,
// }: {
//   onPressIn?: ButtonProps["onPressIn"];
// }) => (
//   <Button
//     className="border-2 rounded-full border-white w-12 h-12 mx-5"
//     onPressIn={onPressIn}
//   >
//     <Flex className="h-full w-full items-center justify-center">
//       <AntDesign
//         name="plus"
//         style={styles.tabBarButtonIcon}
//         size={20}
//         color={COLORS.yellow}
//       />
//     </Flex>
//   </Button>
// );

const styles = StyleSheet.create({
  tabBarButtonIcon: {
    width: 20,
    height: 20,
  },
});

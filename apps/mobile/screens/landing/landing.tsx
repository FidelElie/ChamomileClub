import { useNavigation } from "@react-navigation/native";

import { Button, Copy, Flex, Heading } from "@thechamomileclub/ui";

import type { LandingStackNavigationProps } from "./_types";

const LandingScreen = () => {
  const navigation = useNavigation<LandingStackNavigationProps>();

  return (
    <>
      <Flex className="flex-grow justify-center items-center w-full">
        <Heading size="3xl" color="chilli">
          Texas Hold'em
        </Heading>
        <Copy size="xl" className="my-1.5">
          Redefined for the
        </Copy>
        <Heading size="2xl">London Massive</Heading>
      </Flex>
      <Button.Primary onPressIn={() => navigation.navigate("Login")}>
        <Copy>Member Login</Copy>
      </Button.Primary>
    </>
  );
};

export default LandingScreen;

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { UserEntity } from "@thechamomileclub/api";
import { Button, COLORS, Copy, Flex, Heading, Show } from "@thechamomileclub/ui";

import { AuthStackNavigationProps } from "screens/auth/_types";

export const NoEventsPlaceholder = (props: NoEventsPlaceholderProps) => {
  const { user } = props;
  const navigation = useNavigation<AuthStackNavigationProps>();

  return (
    <Show
      if={!user?.roles.includes("PROSPECT")}
      else={<Copy>Hello World</Copy>}
    >
      <Button
        className="w-full px-0"
        onPressIn={() => navigation.navigate("CreateEvent")}
      >
        <Flex className="h-40 w-full bg-midnight rounded-lg px-4 py-2.5 justify-end">
          <Flex.Row className="justify-between items-end">
            <Flex.Column>
              <Heading size="base">No events yet</Heading>
              <Copy size="xs" color="yellow">
                Create One?
              </Copy>
            </Flex.Column>
            <Flex className="items-center justify-center border border-white rounded-full p-2">
              <AntDesign name="plus" size={15} color={COLORS.yellow} />
            </Flex>
          </Flex.Row>
        </Flex>
      </Button>
    </Show>
  );
};

export interface NoEventsPlaceholderProps {
  user: UserEntity | null;
}

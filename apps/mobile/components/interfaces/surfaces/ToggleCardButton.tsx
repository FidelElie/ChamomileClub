import { StyleProp } from "react-native";
import { twJoin } from "tailwind-merge";

import { Button, ButtonProps, Card, Copy, Flex, Heading, Show } from "@thechamomileclub/ui";

export const ToggleCardButton = (props: ToggleCardButtonProps) => {
  const { classes, title, subtitle, toggled, onToggle, style } = props;

  return (
    <Button
      className={twJoin("p-0", classes)}
      onPressIn={() => onToggle(toggled)}
      style={style}
    >
      <Card theme={toggled ? "solid" : "outline"}>
        <Flex.Row className="w-full">
          <Flex className="w-6 h-6 justify-center items-center border rounded-full border-white mr-2.5">
            <Show if={toggled}>
              <Flex className="w-4 h-4 rounded-full bg-yellow" />
            </Show>
          </Flex>
          <Flex.Column className="flex-grow">
            <Heading>{title}</Heading>
            <Show if={subtitle}>
              <Copy size="xs">{subtitle}</Copy>
            </Show>
          </Flex.Column>
        </Flex.Row>
      </Card>
    </Button>
  );
};

export interface ToggleCardButtonProps {
  classes?: string;
  title: string;
  subtitle?: string;
  toggled: boolean;
  onToggle: (currentToggledState: boolean) => void;
  style?: StyleProp<ButtonProps>;
}

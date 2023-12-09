import type { ReactNode } from "react";
import { AntDesign } from "@expo/vector-icons";

import {
  Button,
  COLORS,
  Copy,
  Flex,
  Heading,
  twJoin,
} from "@thechamomileclub/ui";

export const DisplayLayout = (props: DisplayLayoutProps) => {
  const { title, subtitle, safe, onBack, children } = props;

  return (
    <Flex className="bg-green h-full pt-5 px-6" safe={safe}>
      <Flex.Row
        className={twJoin(
          "items-center",
          onBack ? "justify-between" : "justify-end",
        )}
      >
        {onBack && (
          <Button
            className="border border-white rounded-full p-2.5"
            onPressIn={onBack}
          >
            <AntDesign name="left" color={COLORS["yellow"]} size={15} />
          </Button>
        )}
        <Flex.Column className="items-end">
          <Heading size="xl" numberOfLines={1}>
            {title}
          </Heading>
          <Copy size="sm" color="yellow">
            {subtitle}
          </Copy>
        </Flex.Column>
      </Flex.Row>
      <Flex className="border-b border-white my-4" />
      {children}
    </Flex>
  );
};

export interface DisplayLayoutProps {
  title: string;
  subtitle: string;
  safe?: boolean;
  onBack?: () => void;
  children: ReactNode;
}

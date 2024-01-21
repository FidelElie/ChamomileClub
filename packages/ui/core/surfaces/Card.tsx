import { styled } from "nativewind";
import { ComponentProps } from "react";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";

import { BACKGROUND_COLORS_MAP } from "../../constants";

const StyledView = styled(View);

export const Card = (props: CardProps) => {
  const {
    theme = "solid",
    color,
    className,
    children,
    ...viewProps
  } = props;

  return (
    <StyledView
      className={twMerge(
        "rounded-lg py-4 px-3 border",
        theme === "solid" && "bg-midnight border-midnight",
        theme === "outline" && "border border-white",
        className,
      )}
      {...viewProps}
    >
      {children}
    </StyledView>
  );
};

export interface CardProps extends ComponentProps<typeof View> {
  theme?: "solid" | "outline";
  color?: keyof typeof BACKGROUND_COLORS_MAP;
}

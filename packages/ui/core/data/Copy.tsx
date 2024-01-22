import { styled } from "nativewind";
import { ComponentProps, forwardRef } from "react";
import { Text } from "react-native";
import { twMerge } from "tailwind-merge";

import { TEXT_COLORS_MAP, TEXT_SIZES_MAP } from "../../constants";

const StyledText = styled(Text);

export const Copy = forwardRef<Text, CopyProps>((props, ref) => {
  const {
    className,
    color = "white",
    size = "base",
    children,
    ...textProps
  } = props;

  return (
    <StyledText
      className={twMerge(
        "font-body text-base uppercase",
        TEXT_COLORS_MAP[color],
        TEXT_SIZES_MAP[size],
        className,
      )}
      {...textProps}
      ref={ref}
    >
      {children}
    </StyledText>
  );
});

Copy.displayName = "Copy";

export interface CopyProps extends ComponentProps<typeof Text> {
  color?: keyof typeof TEXT_COLORS_MAP;
  size?: keyof typeof TEXT_SIZES_MAP;
}

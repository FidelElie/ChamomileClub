import { ComponentProps, forwardRef, useMemo } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { twMerge } from "tailwind-merge";

import { FLEX_DIRECTIONS_MAP } from "../../constants";

const BaseFlex = forwardRef<View, FlexProps>((props, ref) => {
  const {
    className,
    direction = "column",
    safe,
    children,
    ...viewProps
  } = props;

  const ViewComponent = safe ? SafeAreaView : View;

  const StyledView = useMemo(() => styled(ViewComponent), [ViewComponent]);

  return (
    <StyledView
      className={twMerge(FLEX_DIRECTIONS_MAP[direction], className)}
      {...viewProps}
      ref={ref}
    >
      {children}
    </StyledView>
  );
});

const Row = forwardRef<View, DirectedFlexProps>((props, ref) => {
  return <BaseFlex {...props} ref={ref} direction="row" />;
});

const Column = forwardRef<View, DirectedFlexProps>((props, ref) => {
  return <BaseFlex {...props} ref={ref} direction="column" />;
});

const RowReverse = forwardRef<View, DirectedFlexProps>((props, ref) => {
  return <BaseFlex {...props} ref={ref} direction="row-reverse" />;
});

const ColumnReverse = forwardRef<View, DirectedFlexProps>((props, ref) => {
  return <BaseFlex {...props} ref={ref} direction="column-reverse" />;
});

BaseFlex.displayName = "Flex";
Row.displayName = "Flex";
Column.displayName = "Flex";
RowReverse.displayName = "Flex";
ColumnReverse.displayName = "Flex";

export const Flex = Object.assign(BaseFlex, {
  Row,
  Column,
  RowReverse,
  ColumnReverse,
});

export interface FlexProps extends ComponentProps<typeof View> {
  direction?: keyof typeof FLEX_DIRECTIONS_MAP;
  safe?: boolean;
}

export type DirectedFlexProps = Omit<FlexProps, "direction">;

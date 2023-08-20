import { ComponentProps, forwardRef } from "react";
import { View } from "react-native";
import { styled } from "nativewind";
import { twMerge } from "tailwind-merge";

import { FLEX_DIRECTIONS_MAP } from "../../constants";

const StyledView = styled(View);

const BaseFlex = forwardRef<View, FlexProps>((props, ref) => {
	const { className, direction = "column", children, ...viewProps } = props;

	return (
		<StyledView
			className={twMerge(
				FLEX_DIRECTIONS_MAP[direction],
				className
			)}
			{...viewProps}
			ref={ref}
		>
			{ children }
		</StyledView>
	)
});

const Row = forwardRef<View, DirectedFlexProps>((props, ref) => {
	return <BaseFlex {...props} ref={ref} direction="row"/>
});

const Column = forwardRef<View, DirectedFlexProps>((props, ref) => {
	return <BaseFlex {...props} ref={ref} direction="column"/>
});

const RowReverse = forwardRef<View, DirectedFlexProps>((props, ref) => {
	return <BaseFlex {...props} ref={ref} direction="row-reverse"/>
});

const ColumnReverse = forwardRef<View, DirectedFlexProps>((props, ref) => {
	return <BaseFlex {...props} ref={ref} direction="column-reverse"/>
});



BaseFlex.displayName = "Flex";
Row.displayName = "Flex";
Column.displayName = "Flex";
RowReverse.displayName = "Flex";
ColumnReverse.displayName = "Flex";

export const Flex = Object.assign(
	BaseFlex,
	{
		Row,
		Column,
		RowReverse,
		ColumnReverse
	}
)

export interface FlexProps extends ComponentProps<typeof View> {
	direction?: keyof typeof FLEX_DIRECTIONS_MAP
}

export type DirectedFlexProps = Omit<FlexProps, "direction">;

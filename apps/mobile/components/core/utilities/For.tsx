import { styled } from "nativewind";
import type { ReactNode } from "react";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";

import { FLEX_DIRECTIONS_MAP } from "@/library/constants";

const StyledView = styled(View);

export const For = <T extends unknown>(props: ForProps<T>) => {
	const { className, direction = "column", each, else: _else = null, children } = props;

	const compiledClassName = twMerge(
		FLEX_DIRECTIONS_MAP[direction],
		className
	)

	const iterable = Array.from(each, (item, index) => children(item, index));

	if (!iterable.length) { return <StyledView className={compiledClassName}>{_else}</StyledView> }

	return <StyledView className={compiledClassName}>{iterable}</StyledView>
}

export interface ForProps<T> {
	className?: string;
	each: Iterable<T>;
	else?: ReactNode;
	direction?: keyof typeof FLEX_DIRECTIONS_MAP;
	children: (data: T, index: number) => ReactNode;
}

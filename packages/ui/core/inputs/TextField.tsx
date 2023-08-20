import { ComponentProps, forwardRef } from "react";
import { TextInput } from "react-native";
import { styled } from "nativewind";
import { twMerge } from "tailwind-merge";

import { COLORS } from "../../constants";

const StyledTextInput = styled(TextInput)

export const TextField = forwardRef<TextFieldRef, TextFieldProps>((props, ref) => {
	const { className, inputClassName, ...textInputProps } = props;

	return (
		<StyledTextInput
			className={twMerge(
				"border-0.5 rounded-lg border-cream h-10",
				"font-body tracking-wide text-cream",
				className
			)}
			placeholderTextColor={COLORS["midnight-100"]}
			{...textInputProps}
			ref={ref}
		/>
	)
});

TextField.displayName = "TextField";

export type TextFieldRef = TextInput

export interface TextFieldProps extends ComponentProps<typeof TextInput> {
	inputClassName?: string;
}

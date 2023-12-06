import { ComponentProps, forwardRef } from "react";
import { Pressable, View } from "react-native";
import { styled } from "nativewind";
import { twMerge } from "tailwind-merge";

const StyledPressable = styled(Pressable);

const BaseButton = forwardRef<View, ButtonProps>((props, ref) => {
	const { className, theme, disabled, children, ...pressableProps } = props;

	return (
		<StyledPressable
			className={twMerge(
				"px-5 rounded-lg py-2 items-center justify-center",
				"active:opacity-50",
				disabled && "opacity-75",
				theme === "PRIMARY" && "bg-green",
				theme === "SECONDARY" && "bg-white border-green",
				theme === "TERTIARY" && "bg-midnight",
				className
			)}
			disabled={disabled}
			{...pressableProps}
			ref={ref}
		>
			{children}
		</StyledPressable>
	)
});

const PrimaryButton = forwardRef<View, ThemedButtonProps>((props, ref) => {
	return <BaseButton {...props} ref={ref} theme="PRIMARY"/>
});

const SecondaryButton = forwardRef<View, ThemedButtonProps>((props, ref) => {
	return <BaseButton {...props} ref={ref} theme="SECONDARY"/>
});

const TertiaryButton = forwardRef<View, ThemedButtonProps>((props, ref) => {
	return <BaseButton {...props} ref={ref} theme="TERTIARY"/>
});

BaseButton.displayName = "Button";
PrimaryButton.displayName = "Button"
SecondaryButton.displayName = "Button"
TertiaryButton.displayName = "Button"

export const Button = Object.assign(
	BaseButton,
	{
		Primary: PrimaryButton,
		Secondary: SecondaryButton,
		Tertiary: TertiaryButton
	}
);

export interface  ButtonProps extends ComponentProps<typeof Pressable> {
	className?: string;
	theme?: "PRIMARY" | "SECONDARY" | "TERTIARY";
}

export type ThemedButtonProps = Omit<ButtonProps, "theme">;

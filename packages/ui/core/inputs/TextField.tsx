import { styled } from "nativewind";
import { ComponentProps, forwardRef } from "react";
import { TextInput } from "react-native";
import { twMerge } from "tailwind-merge";

const StyledTextInput = styled(TextInput);

export const TextField = forwardRef<TextFieldRef, TextFieldProps>(
  (props, ref) => {
    const { className, value, placeholder, inputClassName, ...textInputProps } = props;

    return (
      <StyledTextInput
        className={twMerge(
          "border-0.5 rounded-lg border-white h-10",
          "font-body tracking-wide text-white",
          className,
        )}
        textAlign="center"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={value?.toUpperCase() || ""}
        placeholder={placeholder?.toUpperCase() || ""}
        {...textInputProps}
        ref={ref}
      />
    );
  },
);

TextField.displayName = "TextField";

export type TextFieldRef = TextInput;

export interface TextFieldProps extends ComponentProps<typeof TextInput> {
  inputClassName?: string;
}

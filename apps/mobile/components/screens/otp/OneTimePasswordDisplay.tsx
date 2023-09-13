import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";

import { TextField, TextFieldRef, Button, Copy } from "@thechamomileclub/ui";

export const OneTimePasswordDisplay = (props: OneTimePasswordDisplayProps) => {
	const { className, onSubmit, length = 6, isSubmitting } = props;

	const inputRefs = useRef<InputRefs>((new Array(length)).fill(null));
	const [values, setValues] = useState<string[]>((new Array(length)).fill(""));

	const submitDisabled = values.some(value => !value) || !!isSubmitting;

	const onChangeCode = (index: number, text: string) => {
		if (text !== "" && !/[0-9]/.test(text)) { return; }

		const currentIndexValue = values[index];

		const newValue = text.replace(currentIndexValue, "");

		const normalisedValue = (!newValue && text !== "") ? currentIndexValue : newValue;

		setValues(
			currentValues => currentValues.map(
				(currentValue, currentValueIndex) => currentValueIndex === index ? normalisedValue : currentValue
			)
		);

		if (currentIndexValue !== normalisedValue) {
			const currentFocussedInputIndex = inputRefs.current.findIndex(input => input?.isFocused());

			const newIndex = currentFocussedInputIndex + 1;

			if (newIndex !== length) {
				inputRefs.current.find((_, inputIndex) => inputIndex === newIndex)?.focus();
			}
		}
	}

	const onDispatchSubmit = () => {
		if (!submitDisabled) { return onSubmit(values.join("") )}
	}

	useEffect(() => {
		const index = values.findIndex(value => !value)
		inputRefs.current[index]?.focus();
	}, [values]);

	return (
		<View className={twMerge("justify-context space-y-4", className)}>
			<View className="flex-row justify-center space-x-2">
				{
					values.map((value, valueIndex) => (
						<TextField
							key={valueIndex}
							className="font-body w-10"
							ref={(element) => { inputRefs.current[valueIndex] = element; }}
							value={value}
							placeholder="-"
							textAlign="center"
							onChangeText={text => onChangeCode(valueIndex, text)}
							keyboardType="number-pad"
							// maxLength={1}
						/>
					))
				}
			</View>
			<Button.Primary disabled={submitDisabled} onPressIn={onDispatchSubmit}>
				<Copy>Continue</Copy>
			</Button.Primary>
		</View>
	)
}

type InputRefs = (TextFieldRef | null)[];

export interface OneTimePasswordDisplayProps {
	className?: string;
	onSubmit: (code: string) => void;
	length?: number;
	isSubmitting?: boolean;
}

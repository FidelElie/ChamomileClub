import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";

import { For, TextField, TextFieldRef, Button, Copy } from "@/components/core";

export const OneTimePasswordDisplay = (props: OneTimePasswordDisplayProps) => {
	const { className, onSubmit, length = 6, isSubmitting } = props;

	const inputRefs = useRef<InputRefs>((new Array(length)).fill(null));
	const [values, setValues] = useState<string[]>((new Array(length)).fill(""));

	const submitDisabled = values.some(value => !value) || !!isSubmitting;

	const onChangeCode = (index: number, character: string) => {
		if (character !== "" && !/[0-9]/.test(character)) { return; }

		setValues(
			currentValues => currentValues.map(
				(currentValue, currentValueIndex) => currentValueIndex === index ? character : currentValue
			)
		);

		if (character) {
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
			<View className="flex-row justify-center">
				<For each={values} direction="row" className="space-x-2">
					{
						(value, valueIndex) => (
							<TextField
								key={valueIndex}
								className="font-body w-10"
								ref={(element) => { inputRefs.current[valueIndex] = element; }}
								value={value}
								textAlign="center"
								onChangeText={text => onChangeCode(valueIndex, text)}
								keyboardType="number-pad"
								maxLength={1}
							/>
						)
					}
				</For>
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

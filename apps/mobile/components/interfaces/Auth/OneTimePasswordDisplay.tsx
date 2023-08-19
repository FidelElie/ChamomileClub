import { useEffect, useRef, useState } from "react";
import { View, Pressable, Text, TextInput } from "react-native";
import { styled } from "nativewind";
import clsx from "clsx";

const StyledPressable = styled(Pressable);

export const OneTimePasswordDisplay = (props: OneTimePasswordDisplayProps) => {
	const { className, onSubmit, length = 6 } = props;

	const inputRefs = useRef<InputRefs>((new Array(length)).fill(null));
	const [values, setValues] = useState<string[]>((new Array(length)).fill(""));

	const submitDisabled = values.some(value => !value);

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
		<View className={clsx("justify-context space-y-4", className)}>
			<View className="flex-row space-x-2 justify-center">
				{
					values.map((value, valueIndex) => (
						<View
							key={valueIndex}
							className="h-10 w-9 justify-center items-center border-0.5 rounded-lg border-cream"
						>
							<TextInput
								className="font-body text-cream w-full h-full text-center"
								ref={(element) => { inputRefs.current[valueIndex] = element; }}
								value={value}
								onChangeText={text => onChangeCode(valueIndex, text)}
								keyboardType="number-pad"
								maxLength={1}
							/>
						</View>
					))
				}
			</View>
			<StyledPressable
				className={clsx(
					"bg-green px-5 rounded-lg py-2",
					"active:opacity-50",
					submitDisabled && "opacity-75"
				)}
				onPressIn={onDispatchSubmit}
				disabled={submitDisabled}
			>
				<Text className="font-body uppercase text-white text-base text-center">
					Continue
				</Text>
			</StyledPressable>
		</View>
	)
}

type InputRefs = (TextInput | null)[];

export interface OneTimePasswordDisplayProps {
	className?: string;
	onSubmit: (code: string) => void;
	length?: number;
}

import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Flex } from "../layouts/Flex";
import { Show } from "../utilities/Show";
import { Copy } from "../data/Copy";
import { Button, ButtonProps } from "./Button";

export const DateTimeField = (props: DateTimeFieldProps) => {
	const { className, theme = "PRIMARY", placeholder = "Select date", value } = props;

	const [display, setDisplay] = useState({ date: false, time: false });

	const editDisplay = (newDisplay: Partial<typeof display>) => setDisplay(
		currentDisplay => ({ ...currentDisplay, ...newDisplay })
	);

	const fieldTheming = {
		buttonTheme: theme,
		textColor: theme === "SECONDARY" ? "green" : "white"
	} as const;

	return (
		<Flex.Column className={className}>
			<Show if={!value}>
				<Button theme={fieldTheming.buttonTheme} onPressIn={() => editDisplay({ date: true })}>
					<Copy color={fieldTheming.textColor}>{placeholder}</Copy>
				</Button>
			</Show>

			{/* <Button theme={fieldTheming.buttonTheme} onPressIn={() => setShow(!show)} className="w-full">
				<Copy color={fieldTheming.textColor}>
					{ value ? `${value.toLocaleDateString()} ${value.toLocaleTimeString()}` : placeholder }
				</Copy>
			</Button> */}
			<Show if={display.date && value}>
				<DateTimePicker
					value={value!}
					mode="date"
					display="spinner"
				/>
			</Show>
			{/* <Show if={show}
			<Show if={show && value}>
				<DateTimePicker
					value={value!}
					mode="date"
					display="spinner"
				/>
				<DateTimePicker
					value={value!}
					mode="time"
					display="spinner"
				/>
			</Show> */}
		</Flex.Column>
	)
}

export interface DateTimeFieldProps {
	className?: string;
	theme?: ButtonProps["theme"];
	value?: Date | null;
	placeholder?: string;
	onChange?: (date: Date | null) => void;
}

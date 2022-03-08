import { ChangeEvent, ChangeEventHandler } from "react";

import { joinClasses } from "../../../library/utilities";

interface TextFieldProps {
	id: string,
	label: string,
	placeholder: string,
	className?: string,
	value?: string | readonly string[] | null,
	onChange?: Function,
	showLabel?: boolean,
	disabled: boolean,
}

const TextField = (props: TextFieldProps) => {
	const {
		id,
		label,
		placeholder,
		value,
		onChange,
		showLabel,
		disabled
	} = props;

	const dispatchOnChange: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent) => {
		if (!disabled && onChange) { onChange(event); }
	}

	return (
		<div className="TextField">
			<label htmlFor={id} className={joinClasses(!showLabel && "sr-only")}>
				{ label }
			</label>
			<input
				id={id}
				name={id}
				type="text"
				placeholder={placeholder}
				value={value !== null ? value : ""}
				onChange={dispatchOnChange}
				disabled={disabled}
			/>
		</div>
	)
}

export default TextField;
export type { TextFieldProps };

import classnames from "classnames";

const TextField = (props: TextFieldProps) => {
	const {
		class: _class,
		id,
		label,
		name,
		ref,
		value,
		onChange,
		disabled
	} = props;

	const dispatchOnChange = (value: string) => {
		if (onChange && !disabled) { onChange(value); }
	}

	return (
		<div
			class={classnames(_class)}
			aria-disabled={disabled}
		>
			<label for={id}>{ label }</label>
			<input
				id={id}
				name={name}
				value={value}
				aria-disabled={disabled}
				ref={ref}
				onChange={event => dispatchOnChange(event.currentTarget.value)}
				{...(ref ? { ref } : {})}
			/>
		</div>
	)
}

interface TextFieldProps {
	class?: string,
	id: string,
	label: string,
	value?: string,
	onChange?: (value: string) => void,
	name?: string,
	ref: HTMLInputElement,
	disabled?: boolean
}

export default TextField;
export type { TextFieldProps }
